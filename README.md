## Subscription Onboarding Flow

A Nuxt 3 implementation of a subscription onboarding flow with four interactive steps.

## Preview
🟢 https://stellar-crumble-77675e.netlify.app/

<b>NOTE</b>: Bypass email verification using <i><b>cheats@cheats.com</b></i>
<br>
<b>NOTE</b>: Bypass code verification using <i><b>cheats</b></i>

[<img src="https://github.com/user-attachments/assets/5397ba11-2b62-4990-bac7-382c36911e79" style="width: 180px;" />
](https://github.com/user-attachments/assets/5397ba11-2b62-4990-bac7-382c36911e79)
## Features

### Core Requirements
- Four-step onboarding flow:
  1. Connect Your Account (email input)
  2. Get Verified! (code verification)
  3. Choose your Plan (subscription)
  4. Success Confirmation
- Fully responsive flexbox design (portrait & landscape)
- Custom CSS (no frameworks used)
- Error handling and graceful fallbacks
- API integration with mock backend
- State management using Pinia
- Clean, page and component-based architecture

### Additional Features Implemented
- Resend code button with 30-second cooldown timer
- Multi-currency support (USD/EUR)
- Input validation with visual feedback
- Loading states for API calls
- Animated  success page

## Technical Decisions
- Vue 3 for reactive components
- Pinia for centralized state management
- Nuxt for server-side rendering and simplified file structure
- Figma for assets design

## Setup and Running the Application

### Prerequisites
- Node.js v21+
- npm v8+

### Installation

Switch to Node 21 or above before installing the project's dependencies.
```bash
nvm use 21 
```

```bash
npm i
```

### Development
http://localhost:3000/

```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Static Build
```bash
npm run generate
```
