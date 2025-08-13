#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 ChiFere Cebu Firebase Setup\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists. This will overwrite it.\n');
}

// Firebase configuration template
const envTemplate = `# Firebase Configuration for ChiFere Cebu
# Generated on ${new Date().toISOString()}

VITE_FIREBASE_API_KEY={apiKey}
VITE_FIREBASE_AUTH_DOMAIN={authDomain}
VITE_FIREBASE_PROJECT_ID={projectId}
VITE_FIREBASE_STORAGE_BUCKET={storageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID={messagingSenderId}
VITE_FIREBASE_APP_ID={appId}
VITE_FIREBASE_MEASUREMENT_ID={measurementId}

# Optional: Analytics
VITE_ENABLE_ANALYTICS=true

# Optional: Performance Monitoring
VITE_ENABLE_PERFORMANCE=true

# Optional: App Check (for production)
# VITE_APP_CHECK_DEBUG_TOKEN=your_debug_token_here
`;

// Questions for Firebase configuration
const questions = [
  {
    name: 'apiKey',
    question: 'Enter your Firebase API Key: ',
    required: true
  },
  {
    name: 'authDomain',
    question: 'Enter your Firebase Auth Domain: ',
    required: true
  },
  {
    name: 'projectId',
    question: 'Enter your Firebase Project ID: ',
    required: true
  },
  {
    name: 'storageBucket',
    question: 'Enter your Firebase Storage Bucket: ',
    required: true
  },
  {
    name: 'messagingSenderId',
    question: 'Enter your Firebase Messaging Sender ID: ',
    required: true
  },
  {
    name: 'appId',
    question: 'Enter your Firebase App ID: ',
    required: true
  },
  {
    name: 'measurementId',
    question: 'Enter your Firebase Measurement ID (optional, press Enter to skip): ',
    required: false
  }
];

const answers = {};

// Function to ask questions sequentially
function askQuestion(index) {
  if (index >= questions.length) {
    // All questions answered, create .env file
    createEnvFile();
    return;
  }

  const question = questions[index];
  rl.question(question.question, (answer) => {
    if (question.required && !answer.trim()) {
      console.log('❌ This field is required. Please try again.\n');
      askQuestion(index);
      return;
    }

    answers[question.name] = answer.trim();
    askQuestion(index + 1);
  });
}

// Function to create .env file
function createEnvFile() {
  let envContent = envTemplate;
  
  // Replace placeholders with actual values
  Object.keys(answers).forEach(key => {
    const value = answers[key] || '';
    envContent = envContent.replace(`{${key}}`, value);
  });

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env file created successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Install dependencies: npm install');
    console.log('2. Start Firebase emulators: firebase emulators:start');
    console.log('3. Start development server: npm run dev');
    console.log('\n🔗 Firebase Console: https://console.firebase.google.com/');
    console.log('📚 Documentation: https://firebase.google.com/docs');
  } catch (error) {
    console.error('\n❌ Error creating .env file:', error.message);
  }

  rl.close();
}

// Start the setup process
console.log('Please provide your Firebase project configuration details.\n');
console.log('You can find these in your Firebase Console under Project Settings > General.\n');
askQuestion(0);


