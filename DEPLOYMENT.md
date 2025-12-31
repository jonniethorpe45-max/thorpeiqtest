# Thorpe IQ Test - Mobile App Deployment Guide

Complete step-by-step instructions for building and submitting the Thorpe IQ Test app to Apple App Store and Google Play Store.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting the Code from GitHub](#getting-the-code-from-github)
3. [Local Setup](#local-setup)
4. [iOS Deployment (App Store)](#ios-deployment-app-store)
5. [Android Deployment (Play Store)](#android-deployment-play-store)
6. [Troubleshooting](#troubleshooting)
7. [Updating Your App](#updating-your-app)

---

## Prerequisites

### For Both Platforms
- **Node.js** (v18 or later) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **GitHub account** connected to Lovable

### For iOS (App Store)
- **macOS** (Monterey 12.0 or later)
- **Xcode 15+** - [Download from Mac App Store](https://apps.apple.com/app/xcode/id497799835)
- **Apple Developer Account** ($99/year) - [Enroll](https://developer.apple.com/programs/enroll/)
- **Apple ID** configured in Xcode

### For Android (Play Store)
- **Android Studio** (latest version) - [Download](https://developer.android.com/studio)
- **Java Development Kit (JDK) 17+**
- **Google Play Developer Account** ($25 one-time) - [Register](https://play.google.com/console/signup)

---

## Getting the Code from GitHub

### Step 1: Connect Lovable to GitHub
1. Open your project in [Lovable](https://lovable.dev)
2. Click **GitHub** in the top menu
3. Click **Connect to GitHub**
4. Authorize Lovable to access your GitHub account
5. Click **Create Repository** to push your code

### Step 2: Clone the Repository
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Navigate to the project
cd YOUR_REPO_NAME
```

---

## Local Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build the Web App
```bash
npm run build
```

### Step 3: Verify the Build
The `dist/` folder should be created with your compiled app.

---

## iOS Deployment (App Store)

### Phase 1: Configure iOS Platform

#### Step 1: Add iOS Platform
```bash
npx cap add ios
```

#### Step 2: Update iOS Dependencies
```bash
npx cap update ios
```

#### Step 3: Sync Project Files
```bash
npx cap sync ios
```

#### Step 4: Open in Xcode
```bash
npx cap open ios
```

### Phase 2: Configure Xcode Project

#### Step 1: Set Team & Signing
1. In Xcode, select **App** in the left sidebar
2. Go to **Signing & Capabilities** tab
3. Check **Automatically manage signing**
4. Select your **Team** (your Apple Developer account)

#### Step 2: Configure Bundle Identifier
1. In **General** tab, find **Bundle Identifier**
2. Set to: `app.lovable.c256e709f51540f3bad74bba421e29a4` (or your custom ID)
3. Ensure it matches your App Store Connect app

#### Step 3: Set Version & Build Numbers
1. **Version**: `1.0.0` (semantic versioning)
2. **Build**: `1` (increment for each upload)

#### Step 4: Configure App Icons
1. In Xcode, go to **Assets.xcassets** → **AppIcon**
2. Add icons in required sizes:
   - 20pt, 29pt, 40pt, 58pt, 60pt, 76pt, 80pt, 87pt, 120pt, 152pt, 167pt, 180pt, 1024pt

#### Step 5: Add Launch Screen (optional)
1. Open **LaunchScreen.storyboard**
2. Customize with your branding

### Phase 3: Create App in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - **Platform**: iOS
   - **Name**: Thorpe IQ Test
   - **Primary Language**: English
   - **Bundle ID**: Select from dropdown
   - **SKU**: `thorpe-iq-test-001`
   - **User Access**: Full Access

### Phase 4: Build & Archive

#### Step 1: Select Build Target
1. In Xcode, select **Any iOS Device (arm64)** as the target
2. NOT a simulator - must be a real device or "Any iOS Device"

#### Step 2: Create Archive
1. Go to **Product** → **Archive**
2. Wait for the build to complete (may take several minutes)

#### Step 3: Validate Archive
1. In the **Archives** window, select your build
2. Click **Validate App**
3. Fix any errors that appear

#### Step 4: Distribute to App Store
1. Click **Distribute App**
2. Select **App Store Connect**
3. Click **Upload**
4. Wait for processing (can take 15-30 minutes)

### Phase 5: Submit for Review

1. In App Store Connect, go to your app
2. Fill in required metadata:
   - **Description**: App description
   - **Keywords**: iq test, intelligence, brain training
   - **Support URL**: Your support website
   - **Screenshots**: Required for each device size
   - **App Preview** (optional): Video demonstration
3. Set **Pricing** (Free or Paid)
4. Complete **App Privacy** questionnaire
5. Select your build under **Build** section
6. Click **Submit for Review**

### App Store Review Timeline
- **First submission**: 24-48 hours typically
- **Updates**: Usually faster (12-24 hours)
- **Rejections**: Fix issues and resubmit

---

## Android Deployment (Play Store)

### Phase 1: Configure Android Platform

#### Step 1: Add Android Platform
```bash
npx cap add android
```

#### Step 2: Update Android Dependencies
```bash
npx cap update android
```

#### Step 3: Sync Project Files
```bash
npx cap sync android
```

#### Step 4: Open in Android Studio
```bash
npx cap open android
```

### Phase 2: Configure Android Project

#### Step 1: Wait for Gradle Sync
- Android Studio will automatically sync Gradle
- Wait for "Gradle sync finished" message

#### Step 2: Update App ID (if needed)
1. Open `android/app/build.gradle`
2. Find `applicationId`
3. Verify: `app.lovable.c256e709f51540f3bad74bba421e29a4`

#### Step 3: Set Version Numbers
In `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        versionCode 1        // Increment for each release
        versionName "1.0.0"  // User-visible version
    }
}
```

#### Step 4: Add App Icons
1. Right-click `app/res` → **New** → **Image Asset**
2. Select **Launcher Icons (Adaptive and Legacy)**
3. Upload your icon (1024x1024 recommended)
4. Click **Next** → **Finish**

### Phase 3: Create Signing Key

#### Step 1: Generate Keystore
```bash
keytool -genkey -v -keystore thorpe-iq-test.keystore -alias thorpe-iq-test -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted for:
- **Keystore password**: Create a strong password
- **Key password**: Can be same as keystore password
- **Name, Organization, etc.**: Your information

> ⚠️ **IMPORTANT**: Store your keystore file and passwords securely. You cannot update your app without them!

#### Step 2: Configure Signing in Gradle
Create `android/keystore.properties`:
```properties
storeFile=../thorpe-iq-test.keystore
storePassword=YOUR_STORE_PASSWORD
keyAlias=thorpe-iq-test
keyPassword=YOUR_KEY_PASSWORD
```

Update `android/app/build.gradle`:
```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

android {
    signingConfigs {
        release {
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Phase 4: Build Release Bundle

#### Option A: Using Android Studio (Recommended)
1. Go to **Build** → **Generate Signed Bundle / APK**
2. Select **Android App Bundle**
3. Click **Next**
4. Select your keystore or create new
5. Enter passwords
6. Select **release** build variant
7. Click **Finish**

The `.aab` file will be in `android/app/release/`

#### Option B: Using Command Line
```bash
cd android
./gradlew bundleRelease
```

### Phase 5: Create App in Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Click **Create app**
3. Fill in:
   - **App name**: Thorpe IQ Test
   - **Default language**: English
   - **App or game**: App
   - **Free or paid**: Your choice
4. Accept declarations and click **Create app**

### Phase 6: Complete Store Listing

#### Required Information:
1. **App details**
   - Short description (80 chars max)
   - Full description (4000 chars max)

2. **Graphics**
   - App icon: 512x512 PNG
   - Feature graphic: 1024x500 PNG
   - Screenshots: At least 2 per device type
     - Phone: 16:9 or 9:16 ratio
     - Tablet (7"): If supporting tablets
     - Tablet (10"): If supporting tablets

3. **Categorization**
   - Category: Education or Health & Fitness
   - Tags: Select relevant tags

### Phase 7: Complete App Content

1. **Privacy Policy**: Required - link to your policy
2. **Ads**: Declare if app contains ads
3. **App Access**: How to access app features
4. **Content Rating**: Complete questionnaire
5. **Target Audience**: Select age groups
6. **Data Safety**: Declare data collection practices

### Phase 8: Upload & Release

#### Step 1: Create Release
1. Go to **Release** → **Production**
2. Click **Create new release**

#### Step 2: Upload Bundle
1. Upload your `.aab` file
2. Wait for processing

#### Step 3: Review & Rollout
1. Add release notes
2. Click **Review release**
3. Address any warnings
4. Click **Start rollout to Production**

### Play Store Review Timeline
- **First submission**: 3-7 days typically
- **Updates**: Usually 1-3 days
- **Rejections**: Fix issues and resubmit

---

## Troubleshooting

### iOS Issues

#### "No signing certificate"
1. Open Xcode → **Preferences** → **Accounts**
2. Select your Apple ID
3. Click **Download Manual Profiles**

#### "Device not registered"
1. In App Store Connect, go to **Devices**
2. Add your device UDID
3. Regenerate provisioning profiles

#### Build fails with "Module not found"
```bash
cd ios
pod install
cd ..
npx cap sync ios
```

### Android Issues

#### "SDK location not found"
Create `android/local.properties`:
```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk   # macOS
sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk  # Windows
```

#### Gradle sync failed
1. Go to **File** → **Sync Project with Gradle Files**
2. If still failing: **File** → **Invalidate Caches / Restart**

#### "Keystore was tampered with"
- Ensure you're using the correct password
- Verify the keystore file isn't corrupted

### General Issues

#### Changes not appearing
```bash
npm run build
npx cap sync
```

#### Capacitor plugin issues
```bash
npx cap update
npm install @capacitor/core@latest @capacitor/ios@latest @capacitor/android@latest
```

---

## Updating Your App

### Step 1: Pull Latest Changes
```bash
git pull origin main
```

### Step 2: Install Any New Dependencies
```bash
npm install
```

### Step 3: Build & Sync
```bash
npm run build
npx cap sync
```

### Step 4: Update Version Numbers
- **iOS**: Increment Build number in Xcode
- **Android**: Increment `versionCode` in build.gradle

### Step 5: Build & Submit
Follow Phase 4-5 for iOS or Phase 4 & 8 for Android.

---

## Quick Reference Commands

```bash
# Full iOS build sequence
npm install && npm run build && npx cap sync ios && npx cap open ios

# Full Android build sequence  
npm install && npm run build && npx cap sync android && npx cap open android

# Or use the provided scripts
./scripts/build-ios.sh      # macOS only
./scripts/build-android.bat # Windows
```

---

## Support & Resources

- **Capacitor Documentation**: https://capacitorjs.com/docs
- **App Store Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Play Store Policies**: https://play.google.com/console/about/guides/
- **Lovable Documentation**: https://docs.lovable.dev

---

*Last updated: December 2024*
