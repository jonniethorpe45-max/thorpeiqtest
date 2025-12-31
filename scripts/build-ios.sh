#!/bin/bash

# =============================================================================
# Thorpe IQ Test - iOS Build Script for App Store Submission
# =============================================================================
# This script automates the process of building the iOS app for App Store
# 
# Prerequisites:
# - macOS with Xcode installed
# - Node.js and npm installed
# - Git installed
# - Apple Developer account configured in Xcode
#
# Usage: ./build-ios.sh
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║          Thorpe IQ Test - iOS Build for App Store             ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check for required tools
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed. Please install it first.${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed. Please install Node.js which includes npm.${NC}"
    exit 1
fi

if ! command -v xcodebuild &> /dev/null; then
    echo -e "${RED}Error: Xcode is not installed. Please install it from the App Store.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites found${NC}"

# Step 1: Install dependencies
echo -e "\n${BLUE}Step 1: Installing dependencies...${NC}"
npm install

# Step 2: Build the web app
echo -e "\n${BLUE}Step 2: Building the web app...${NC}"
npm run build

# Step 3: Add iOS platform if not exists
echo -e "\n${BLUE}Step 3: Setting up iOS platform...${NC}"
if [ ! -d "ios" ]; then
    echo "Adding iOS platform..."
    npx cap add ios
else
    echo "iOS platform already exists"
fi

# Step 4: Update iOS dependencies
echo -e "\n${BLUE}Step 4: Updating iOS dependencies...${NC}"
npx cap update ios

# Step 5: Sync the project
echo -e "\n${BLUE}Step 5: Syncing Capacitor...${NC}"
npx cap sync ios

# Step 6: Open Xcode
echo -e "\n${BLUE}Step 6: Opening Xcode...${NC}"
echo -e "${YELLOW}"
echo "═══════════════════════════════════════════════════════════════"
echo "                    NEXT STEPS IN XCODE                        "
echo "═══════════════════════════════════════════════════════════════"
echo -e "${NC}"
echo "1. Select your Team in Signing & Capabilities"
echo "2. Update the Bundle Identifier if needed"
echo "3. Set the Version and Build numbers"
echo "4. Select 'Any iOS Device (arm64)' as the build target"
echo "5. Go to Product → Archive"
echo "6. Once archived, click 'Distribute App'"
echo "7. Choose 'App Store Connect' and follow the prompts"
echo ""
echo -e "${GREEN}Opening Xcode now...${NC}"

npx cap open ios

echo -e "\n${GREEN}╔═══════════════════════════════════════════════════════════════╗"
echo "║                    Build process complete!                      ║"
echo "╚═══════════════════════════════════════════════════════════════╝${NC}"
