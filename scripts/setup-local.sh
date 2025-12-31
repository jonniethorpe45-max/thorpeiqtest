#!/bin/bash

# =============================================================================
# Thorpe IQ Test - Local Development Setup for macOS/Linux
# =============================================================================
# Run this after cloning the repository from GitHub
# 
# Prerequisites:
# - Git installed and repository cloned
# - Node.js and npm installed
#
# Usage: ./setup-local.sh
# =============================================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║           Thorpe IQ Test - Local Development Setup            ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check for Node.js
echo -e "${YELLOW}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed.${NC}"
    echo "Please install from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} found${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed.${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm ${NPM_VERSION} found${NC}"

# Install dependencies
echo -e "\n${BLUE}Installing dependencies...${NC}"
npm install

echo -e "\n${GREEN}╔═══════════════════════════════════════════════════════════════╗"
echo "║                    Setup Complete!                             ║"
echo "╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "You can now:"
echo "  1. Run 'npm run dev' to start the development server"
echo "  2. Run './scripts/build-ios.sh' to build for iOS (macOS only)"
echo ""
echo "To connect to GitHub:"
echo "  - This is done through Lovable's web interface"
echo "  - Go to your project in Lovable"
echo "  - Click GitHub → Connect to GitHub"
