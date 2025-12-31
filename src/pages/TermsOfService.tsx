import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Brain className="w-6 h-6 text-primary" />
            <span className="font-semibold">Thorpe IQ Test</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the Thorpe IQ Test website and services ("Service"), you agree to be 
              bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do 
              not use our Service. We reserve the right to modify these Terms at any time, and your 
              continued use of the Service constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Thorpe IQ Test provides an online cognitive assessment tool designed to estimate 
              intelligence quotient (IQ) through a series of pattern recognition, spatial reasoning, 
              memory, and processing speed exercises. The Service includes both free and premium features.
            </p>
          </section>

          <section className="bg-card/50 border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-destructive">3. Important Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">THE THORPE IQ TEST IS PROVIDED FOR ENTERTAINMENT AND 
              EDUCATIONAL PURPOSES ONLY.</strong> The results of this test:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Are NOT a substitute for professional psychological evaluation</li>
              <li>Should NOT be used for clinical, medical, or diagnostic purposes</li>
              <li>Should NOT be used for employment, educational placement, or any professional decisions</li>
              <li>May NOT accurately reflect your true cognitive abilities</li>
              <li>Are estimates based on your performance on this specific test</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              For an accurate assessment of cognitive abilities, please consult a licensed psychologist 
              or qualified mental health professional who can administer standardized, validated IQ tests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">4. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Some features of our Service require you to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and complete information when creating your account</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">5. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated scripts, bots, or other means to access the Service</li>
              <li>Share test questions or answers with others</li>
              <li>Misrepresent your identity or affiliation</li>
              <li>Use the Service to harm, harass, or defraud others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, features, and functionality of the Service, including but not limited to 
              text, graphics, logos, test questions, algorithms, and software, are owned by Thorpe IQ 
              Test and are protected by copyright, trademark, and other intellectual property laws. 
              You may not reproduce, distribute, modify, or create derivative works without our 
              express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">7. Premium Services and Payments</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Certain features of our Service require payment. By purchasing premium services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>You agree to pay all applicable fees as described at the time of purchase</li>
              <li>All payments are processed securely through our third-party payment processors</li>
              <li>Refunds are provided in accordance with our refund policy</li>
              <li>We reserve the right to modify pricing with reasonable notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THORPE IQ TEST SHALL NOT BE LIABLE FOR ANY 
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT 
              LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE. 
              IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID FOR PREMIUM SERVICES 
              IN THE TWELVE MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">9. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF 
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT 
              WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">10. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold harmless Thorpe IQ Test, its officers, directors, 
              employees, and agents from any claims, damages, losses, or expenses arising from your 
              use of the Service, violation of these Terms, or infringement of any rights of another party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">11. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your access to the Service at any time, without prior notice 
              or liability, for any reason, including if you breach these Terms. Upon termination, your 
              right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">12. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, 
              without regard to conflict of law principles. Any disputes arising from these Terms 
              or the Service shall be resolved through binding arbitration or in the courts of 
              competent jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">13. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at 
              legal@thorpeiqtest.com.
            </p>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Thorpe IQ Test. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default TermsOfService;
