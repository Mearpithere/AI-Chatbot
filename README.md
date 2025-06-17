# 🤖 ChatBot - AI-Powered Chat Application

A modern, production-ready chatbot web application built with Next.js, featuring secure authentication, real-time messaging, and intelligent AI responses powered by Google Gemini.

![ChatBot Demo](https://via.placeholder.com/800x400/1f2937/ffffff?text=ChatBot+Demo)

## 🌟 Live Demo

**🔗 [Live Demo](https://your-deployed-url.vercel.app)** | **📧 [Assignment Email](mailto:zerocode.hiring@gmail.com)**

> **Note**: The live demo runs in fallback mode for security. To experience AI-powered responses, follow the setup instructions below.

## 🚀 Features

### ✨ Core Features
- **🔐 Secure Authentication**: JWT-based login and registration system
- **💬 Real-time Chat Interface**: Smooth messaging experience with auto-scroll and loading indicators
- **🤖 AI Integration**: Intelligent responses powered by Google Gemini AI (with smart fallback responses)
- **🌓 Automatic Dark Mode**: Respects system theme preferences
- **📱 Responsive Design**: Mobile-first design that works perfectly on all devices

### 🎁 Bonus Features
- **🎯 Prompt Templates**: 8 pre-built conversation starters across different categories
- **🔍 Message Search**: Search through chat history with sender filtering
- **🎤 Voice Input**: Speech-to-text input using Web Speech API
- **📥 Chat Export**: Export conversations as JSON files
- **⌨️ Input History**: Navigate previous messages with arrow keys
- **🔧 AI Status Monitor**: Real-time AI service status and configuration

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom dark mode
- **Authentication**: JWT with bcryptjs
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React
- **Code Quality**: ESLint, Prettier
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- **Node.js 18+** and npm
- **Google Gemini API key** (free from [Google AI Studio](https://makersuite.google.com)) - *Optional for basic functionality*

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/your-username/zerocode-fe-assignment.git
cd zerocode-fe-assignment
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# JWT Secret (change in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Google Gemini API Key (optional - for AI responses)
# GEMINI_API_KEY=your_gemini_api_key_here

# App Configuration
NEXT_PUBLIC_APP_NAME=ChatBot
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🤖 AI Integration Setup

The app works in **two modes**:

### 🔄 **Fallback Mode** (Default)
- ✅ **Works immediately** - no setup required
- ✅ **Intelligent responses** - context-aware fallback messages
- ✅ **Full functionality** - all features work except AI-powered responses

### 🚀 **AI-Powered Mode** (Recommended)

To enable Google Gemini AI responses:

#### Step 1: Get Free API Key
1. Visit [Google AI Studio](https://makersuite.google.com)
2. Sign in with your Google account
3. Click **"Get API Key"** → **"Create API Key"**
4. Copy your API key

#### Step 2: Configure Environment
Add your API key to `.env.local`:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

#### Step 3: Restart Application
```bash
npm run dev
```

#### Step 4: Verify AI Status
- Click the **🤖 Bot icon** in the header
- You should see "Google Gemini is connected and ready!"

### 🔍 **How to Check Current Mode**
- **AI Mode**: Responses are dynamic and contextual
- **Fallback Mode**: Responses include helpful fallback messages
- **Status Check**: Click the bot icon in the header anytime

## 📖 Usage Guide

### 🎯 **Getting Started**
1. **📝 Register**: Create a new account with any email/password
2. **🔑 Login**: Access the chat interface
3. **💬 Start Chatting**: Type messages or use voice input
4. **🎨 Explore Features**: Try all the bonus features below!

### 🎁 **Feature Guide**

#### **🎯 Prompt Templates**
- Click the **💬 message icon** in header
- Choose from 8 categories: General, Coding, Creative, Learning, Business, Personal
- Templates auto-fill the input box - just edit and send!

#### **🔍 Message Search**
- Click the **🔍 search icon** in header
- Search by content or filter by sender (You/AI)
- Highlights matching text in results

#### **🎤 Voice Input**
- Click the **🎤 microphone icon** in chat input
- Speak your message (works in supported browsers)
- Text appears automatically in the input box

#### **📥 Chat Export**
- Click the **📥 download icon** in header
- Downloads your conversation as a JSON file
- Includes timestamps and message metadata

#### **⌨️ Input History**
- Use **↑/↓ arrow keys** in empty input box
- Navigate through your previous messages
- Quick way to resend or edit previous inputs

#### **🤖 AI Status Monitor**
- Click the **🤖 bot icon** in header
- Check if AI is connected or in fallback mode
- Get setup instructions if needed

### 🎮 **Demo Credentials**
- **No special credentials needed** - register with any email/password
- **In-memory storage** - data resets on server restart (perfect for demo)
- **Instant setup** - no database configuration required

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   AI Service    │
│                 │    │                 │    │                 │
│ • React/Next.js │◄──►│ • Next.js API   │◄──►│ • Google Gemini │
│ • TypeScript    │    │ • JWT Auth      │    │ • Smart Fallback│
│ • Tailwind CSS  │    │ • Chat Routes   │    │ • Error Handling│
│ • Context API   │    │ • User Mgmt     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🔧 **Key Components**
- **🔐 Authentication**: JWT-based with bcrypt password hashing
- **💬 Chat System**: Real-time messaging with auto-scroll and loading states
- **🤖 AI Integration**: Google Gemini API with intelligent fallback system
- **📱 State Management**: React Context API for global state
- **🎨 UI Components**: Modular, reusable components with full TypeScript support
- **🌙 Theme System**: Automatic dark mode based on system preferences
- **🛡️ Error Handling**: Comprehensive error boundaries and graceful degradation

## 🧪 Development

### 📜 **Available Scripts**

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript checks
```

### 🔍 **Code Quality**
- **✅ ESLint**: Configured with Next.js and TypeScript rules
- **✅ Prettier**: Consistent code formatting across the project
- **✅ TypeScript**: Full type safety with strict mode
- **✅ Error Boundaries**: Graceful error handling and recovery
- **✅ Component Architecture**: Modular, reusable, and testable components

### 🔧 **Development Tips**
- **Hot Reload**: Changes reflect instantly during development
- **Type Safety**: TypeScript catches errors before runtime
- **Console Logs**: Check browser console for AI connection status
- **Responsive Testing**: Test on different screen sizes using browser dev tools

## 🚀 Deployment

### 🌐 **Deploy to Vercel** (Recommended)

1. **📤 Push to GitHub**: Ensure your code is in a GitHub repository
2. **🔗 Connect Vercel**: Visit [vercel.com](https://vercel.com) and import your repository
3. **⚙️ Environment Variables**: In Vercel dashboard, add:
   ```
   JWT_SECRET=your-production-jwt-secret
   GEMINI_API_KEY=your-gemini-api-key (optional)
   NEXT_PUBLIC_APP_NAME=ChatBot
   NEXT_PUBLIC_APP_VERSION=1.0.0
   ```
4. **🚀 Deploy**: Vercel will automatically build and deploy

### 🔒 **Security Note for Public Deployment**
- **✅ Safe to deploy without API key** - app works in fallback mode
- **✅ No sensitive data exposed** - API key is server-side only
- **✅ Graceful degradation** - users get intelligent fallback responses

### 🛠️ **Manual Deployment**

```bash
npm run build
npm run start
```

### 🌍 **Environment-Specific Behavior**
- **🔧 Development**: Full debugging and hot reload
- **🚀 Production**: Optimized build with error boundaries
- **☁️ Deployed**: Works with or without API key configuration

## ⚙️ Configuration

### 🎨 **Customization Options**

#### **🎯 Prompt Templates**
Edit `src/components/chat/PromptTemplates.tsx` to:
- Add new template categories
- Modify existing prompts
- Change template icons and descriptions

#### **🤖 Fallback Responses**
Edit `src/app/api/chat/route.ts` to:
- Customize fallback messages
- Add keyword-based responses
- Modify response personality

#### **🎨 Styling**
Edit `tailwind.config.js` to:
- Change color schemes
- Modify spacing and typography
- Add custom animations

#### **🔧 Environment Variables**
```env
# Required
JWT_SECRET=your-jwt-secret

# Optional - AI Integration
GEMINI_API_KEY=your-api-key

# Optional - App Branding
NEXT_PUBLIC_APP_NAME=Your App Name
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🎯 **Assignment Submission**

### 📋 **Evaluation Criteria Met**

#### **✅ Core Requirements (80%)**
- **🔐 Authentication**: JWT-based register/login flows
- **💬 Chat Interface**: Real-time messaging with auto-scroll, input history, loading indicators
- **🎨 Styling**: Tailwind CSS with automatic dark mode
- **🔧 Code Quality**: TypeScript, functional components, ESLint + Prettier

#### **🎁 Bonus Features (20%)**
- **🎯 Prompt Templates**: 8 categorized conversation starters
- **🔍 Message Search**: Search with filtering and highlighting
- **🎤 Voice Input**: Speech-to-text integration
- **📥 Chat Export**: JSON export functionality
- **⌨️ Input History**: Arrow key navigation
- **🤖 AI Status Monitor**: Real-time service monitoring

### 🏆 **Technical Highlights**
- **🛡️ Security-First**: API keys never exposed to client
- **🔄 Graceful Fallbacks**: Works perfectly without AI configuration
- **📱 Mobile-First**: Responsive design for all devices
- **🎨 Modern UI/UX**: Clean, intuitive interface
- **⚡ Performance**: Optimized builds and lazy loading
- **🧪 Production-Ready**: Error boundaries and robust error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org)** - The React framework for production
- **[Google Gemini](https://makersuite.google.com)** - AI-powered responses
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev)** - Beautiful & consistent icons
- **[Vercel](https://vercel.com)** - Deployment and hosting platform

## 📞 Support & Contact

### 🐛 **Issues & Bugs**
- Check the [Issues](https://github.com/your-username/zerocode-fe-assignment/issues) page
- Create a new issue with detailed information

### 🤖 **AI Setup Help**
- Visit [Google AI Studio](https://makersuite.google.com) for API documentation
- Check the AI Status monitor in the app header

### 📧 **Assignment Contact**
- **Email**: [zerocode.hiring@gmail.com](mailto:zerocode.hiring@gmail.com)
- **Subject**: ZeroCode Frontend Assignment - [Your Name]

---

## 🎉 **Ready for Review!**

This ChatBot application demonstrates modern React development practices, secure authentication, AI integration, and production-ready code quality. The app works perfectly in both AI-powered and fallback modes, ensuring a great user experience regardless of configuration.

**Built with ❤️ for the ZeroCode Frontend Assignment**
3. For Ollama setup help, visit [Ollama Documentation](https://github.com/ollama/ollama)

---

**Built with ❤️ from Arpit Shukla **
