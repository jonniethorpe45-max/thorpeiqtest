import jsPDF from 'jspdf';
import { TestResult, MODULES, ModuleType } from '@/types/questions';

interface PDFGeneratorOptions {
  result: TestResult;
  userName?: string;
}

const COLORS = {
  primary: [0, 188, 212] as [number, number, number],
  secondary: [255, 193, 7] as [number, number, number],
  dark: [15, 17, 21] as [number, number, number],
  text: [230, 230, 230] as [number, number, number],
  muted: [150, 150, 160] as [number, number, number],
  accent: [138, 43, 226] as [number, number, number],
};

const MODULE_COLORS: Record<ModuleType, [number, number, number]> = {
  pattern: [0, 188, 212],
  spatial: [138, 43, 226],
  memory: [255, 193, 7],
  speed: [76, 175, 80],
};

function getPerformanceLabel(score: number): string {
  if (score >= 130) return 'Exceptional';
  if (score >= 120) return 'Superior';
  if (score >= 110) return 'Above Average';
  if (score >= 90) return 'Average';
  if (score >= 80) return 'Below Average';
  return 'Needs Development';
}

function getStrengthsAndWeaknesses(result: TestResult): { strengths: string[]; improvements: string[] } {
  const sortedModules = [...result.moduleResults].sort((a, b) => b.percentageScore - a.percentageScore);
  
  const strengths: string[] = [];
  const improvements: string[] = [];

  sortedModules.forEach((mr, index) => {
    const moduleInfo = MODULES.find(m => m.id === mr.module);
    if (!moduleInfo) return;

    if (index < 2 && mr.percentageScore >= 60) {
      strengths.push(moduleInfo.name);
    }
    if (index >= 2 && mr.percentageScore < 70) {
      improvements.push(moduleInfo.name);
    }
  });

  return { strengths, improvements };
}

function drawHeader(doc: jsPDF, pageNum: number, totalPages: number) {
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Header line
  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.5);
  doc.line(20, 15, 190, 15);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.muted);
  doc.text('Thorpe IQ Assessment Report', 20, 287);
  doc.text(`Page ${pageNum} of ${totalPages}`, 190, 287, { align: 'right' });
}

function drawProgressBar(doc: jsPDF, x: number, y: number, width: number, height: number, value: number, color: [number, number, number]) {
  // Background
  doc.setFillColor(40, 40, 45);
  doc.roundedRect(x, y, width, height, 2, 2, 'F');
  
  // Fill
  const fillWidth = (value / 100) * width;
  doc.setFillColor(...color);
  doc.roundedRect(x, y, fillWidth, height, 2, 2, 'F');
}

export function generatePDFReport({ result, userName }: PDFGeneratorOptions): void {
  const doc = new jsPDF();
  const totalPages = 4;

  // ============ PAGE 1: Cover & Summary ============
  drawHeader(doc, 1, totalPages);
  
  // Title
  doc.setFontSize(32);
  doc.setTextColor(...COLORS.primary);
  doc.text('Thorpe IQ Assessment', 105, 50, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.muted);
  doc.text('Comprehensive Cognitive Report', 105, 62, { align: 'center' });
  
  if (userName) {
    doc.setFontSize(12);
    doc.setTextColor(...COLORS.text);
    doc.text(`Prepared for: ${userName}`, 105, 80, { align: 'center' });
  }
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.muted);
  doc.text(`Assessment Date: ${result.completedAt.toLocaleDateString()}`, 105, 92, { align: 'center' });
  
  // Main score box
  doc.setFillColor(25, 27, 32);
  doc.roundedRect(40, 110, 130, 70, 5, 5, 'F');
  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(1);
  doc.roundedRect(40, 110, 130, 70, 5, 5, 'S');
  
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.muted);
  doc.text('ESTIMATED IQ RANGE', 105, 128, { align: 'center' });
  
  doc.setFontSize(48);
  doc.setTextColor(...COLORS.primary);
  doc.text(`${result.iqRange.min}-${result.iqRange.max}`, 105, 155, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.secondary);
  doc.text(getPerformanceLabel(result.iqBase), 105, 172, { align: 'center' });
  
  // Percentile
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.text);
  doc.text(`You scored higher than ${result.percentile}% of the population`, 105, 200, { align: 'center' });
  
  // Quick stats
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.muted);
  doc.text('Key Metrics', 20, 225);
  doc.setDrawColor(...COLORS.muted);
  doc.line(20, 228, 70, 228);
  
  doc.setTextColor(...COLORS.text);
  doc.text(`Overall Score: ${Math.round(result.overallScore)}%`, 20, 240);
  doc.text(`Modules Completed: ${result.moduleResults.length}`, 20, 252);
  doc.text(`Performance Level: ${getPerformanceLabel(result.iqBase)}`, 20, 264);

  // ============ PAGE 2: Cognitive Profile ============
  doc.addPage();
  drawHeader(doc, 2, totalPages);
  
  doc.setFontSize(20);
  doc.setTextColor(...COLORS.primary);
  doc.text('Cognitive Profile', 20, 35);
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.muted);
  doc.text('Detailed breakdown of your performance across cognitive domains', 20, 45);
  
  let yPos = 65;
  
  result.moduleResults.forEach((moduleResult) => {
    const moduleInfo = MODULES.find(m => m.id === moduleResult.module);
    if (!moduleInfo) return;
    
    const color = MODULE_COLORS[moduleResult.module];
    
    // Module name
    doc.setFontSize(14);
    doc.setTextColor(...color);
    doc.text(moduleInfo.name, 20, yPos);
    
    // Score
    doc.setTextColor(...COLORS.text);
    doc.text(`${Math.round(moduleResult.percentageScore)}%`, 180, yPos, { align: 'right' });
    
    // Description
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.muted);
    doc.text(moduleInfo.description, 20, yPos + 8);
    
    // Progress bar
    drawProgressBar(doc, 20, yPos + 14, 170, 6, moduleResult.percentageScore, color);
    
    // Stats
    const correctCount = moduleResult.responses.filter(r => r.isCorrect).length;
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.muted);
    doc.text(`Correct: ${correctCount}/${moduleResult.responses.length}  |  Weight: ${Math.round(moduleInfo.weight * 100)}%`, 20, yPos + 28);
    
    yPos += 50;
  });
  
  // Comparison chart description
  yPos += 10;
  doc.setFillColor(25, 27, 32);
  doc.roundedRect(20, yPos, 170, 40, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.secondary);
  doc.text('Performance Summary', 30, yPos + 12);
  
  const avgScore = result.moduleResults.reduce((acc, mr) => acc + mr.percentageScore, 0) / result.moduleResults.length;
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.text);
  doc.text(`Average across all modules: ${Math.round(avgScore)}%`, 30, yPos + 24);
  doc.text(`Strongest area: ${MODULES.find(m => m.id === result.moduleResults.sort((a, b) => b.percentageScore - a.percentageScore)[0].module)?.name}`, 30, yPos + 34);

  // ============ PAGE 3: Strengths & Insights ============
  doc.addPage();
  drawHeader(doc, 3, totalPages);
  
  doc.setFontSize(20);
  doc.setTextColor(...COLORS.primary);
  doc.text('Strengths & Insights', 20, 35);
  
  const { strengths, improvements } = getStrengthsAndWeaknesses(result);
  
  // Strengths section
  doc.setFillColor(0, 60, 60);
  doc.roundedRect(20, 50, 170, 60, 3, 3, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.primary);
  doc.text('Your Cognitive Strengths', 30, 65);
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.text);
  if (strengths.length > 0) {
    strengths.forEach((strength, i) => {
      doc.text(`• ${strength}`, 35, 80 + (i * 12));
    });
  } else {
    doc.text('Continue practicing to develop your strengths!', 35, 80);
  }
  
  // Areas for improvement
  doc.setFillColor(60, 50, 20);
  doc.roundedRect(20, 120, 170, 60, 3, 3, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.secondary);
  doc.text('Areas for Development', 30, 135);
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.text);
  if (improvements.length > 0) {
    improvements.forEach((improvement, i) => {
      doc.text(`• ${improvement}`, 35, 150 + (i * 12));
    });
  } else {
    doc.text('Excellent performance across all areas!', 35, 150);
  }
  
  // Recommendations
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.accent);
  doc.text('Recommendations', 20, 200);
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.text);
  
  const recommendations = [
    'Practice pattern recognition puzzles to strengthen logical thinking',
    'Try spatial reasoning games and 3D visualization exercises',
    'Use memory techniques like mnemonics and spaced repetition',
    'Challenge yourself with timed cognitive exercises',
  ];
  
  recommendations.forEach((rec, i) => {
    doc.text(`${i + 1}. ${rec}`, 25, 215 + (i * 12));
  });

  // ============ PAGE 4: Population Comparison ============
  doc.addPage();
  drawHeader(doc, 4, totalPages);
  
  doc.setFontSize(20);
  doc.setTextColor(...COLORS.primary);
  doc.text('Population Comparison', 20, 35);
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.muted);
  doc.text('How your score compares to the general population', 20, 45);
  
  // Bell curve representation (simplified)
  doc.setFillColor(25, 27, 32);
  doc.roundedRect(20, 55, 170, 100, 5, 5, 'F');
  
  // IQ scale labels
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.muted);
  const iqLabels = [70, 85, 100, 115, 130];
  const xPositions = [35, 65, 105, 145, 175];
  
  iqLabels.forEach((iq, i) => {
    doc.text(iq.toString(), xPositions[i], 145);
  });
  
  // Draw simplified distribution bars
  const distributions = [
    { range: '70-85', percent: 14, x: 35 },
    { range: '85-100', percent: 34, x: 65 },
    { range: '100-115', percent: 34, x: 105 },
    { range: '115-130', percent: 14, x: 145 },
    { range: '130+', percent: 4, x: 175 },
  ];
  
  distributions.forEach((d) => {
    const barHeight = d.percent * 2;
    const isUserRange = result.iqBase >= parseInt(d.range) && result.iqBase < parseInt(d.range.split('-')[1] || '200');
    
    if (isUserRange) {
      doc.setFillColor(...COLORS.primary);
    } else {
      doc.setFillColor(60, 60, 65);
    }
    doc.roundedRect(d.x - 10, 130 - barHeight, 20, barHeight, 2, 2, 'F');
  });
  
  // Your position indicator
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.secondary);
  doc.text(`Your IQ: ${result.iqRange.min}-${result.iqRange.max}`, 105, 165, { align: 'center' });
  
  // Percentile explanation
  doc.setFillColor(25, 27, 32);
  doc.roundedRect(20, 180, 170, 50, 3, 3, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.primary);
  doc.text('What This Means', 30, 195);
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.text);
  doc.text(`You scored higher than ${result.percentile}% of people who take standardized`, 30, 210);
  doc.text('IQ assessments. This places you in the', 30, 222);
  doc.setTextColor(...COLORS.secondary);
  doc.text(`${getPerformanceLabel(result.iqBase)} range.`, 120, 222);
  
  // Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.muted);
  doc.text('Disclaimer: This assessment provides an estimate and should not be used for', 20, 250);
  doc.text('clinical, academic, or employment decisions. For a comprehensive evaluation,', 20, 258);
  doc.text('please consult a licensed psychologist or educational specialist.', 20, 266);
  
  // Save the PDF
  doc.save(`Thorpe-IQ-Report-${result.completedAt.toISOString().split('T')[0]}.pdf`);
}
