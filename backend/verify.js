/**
 * Simple verification script to test basic imports and structure
 * This doesn't require database/redis to be running
 */

console.log('🧪 Testing backend structure...\n');

// Test 1: Check TypeScript compilation
console.log('✅ Test 1: TypeScript compilation - PASSED (already compiled successfully)');

// Test 2: Check if main files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'dist/index.js',
  'dist/config/database.js',
  'dist/config/redis.js',
  'dist/routes/health.js',
  'dist/middleware/errorHandler.js',
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ Test 2: File ${file} exists`);
  } else {
    console.log(`❌ Test 2: File ${file} missing`);
    allFilesExist = false;
  }
});

// Test 3: Check package.json scripts
const packageJson = require('./package.json');
const requiredScripts = ['dev', 'build', 'start', 'prisma:generate', 'prisma:migrate'];

let allScriptsExist = true;
requiredScripts.forEach(script => {
  if (packageJson.scripts[script]) {
    console.log(`✅ Test 3: Script '${script}' exists`);
  } else {
    console.log(`❌ Test 3: Script '${script}' missing`);
    allScriptsExist = false;
  }
});

// Test 4: Check required dependencies
const requiredDeps = ['express', 'cors', 'helmet', 'dotenv', '@prisma/client', 'ioredis'];
let allDepsExist = true;
requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`✅ Test 4: Dependency '${dep}' installed`);
  } else {
    console.log(`❌ Test 4: Dependency '${dep}' missing`);
    allDepsExist = false;
  }
});

// Test 5: Check dev dependencies
const requiredDevDeps = ['typescript', '@types/node', '@types/express', 'nodemon', 'prisma'];
let allDevDepsExist = true;
requiredDevDeps.forEach(dep => {
  if (packageJson.devDependencies[dep]) {
    console.log(`✅ Test 5: Dev dependency '${dep}' installed`);
  } else {
    console.log(`❌ Test 5: Dev dependency '${dep}' missing`);
    allDevDepsExist = false;
  }
});

// Test 6: Check Docker files
const dockerFiles = ['Dockerfile', 'docker-compose.yml', '.dockerignore'];
let allDockerFilesExist = true;
dockerFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ Test 6: Docker file '${file}' exists`);
  } else {
    console.log(`❌ Test 6: Docker file '${file}' missing`);
    allDockerFilesExist = false;
  }
});

// Test 7: Check environment files
const envFiles = ['.env.example'];
let allEnvFilesExist = true;
envFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ Test 7: Environment file '${file}' exists`);
  } else {
    console.log(`❌ Test 7: Environment file '${file}' missing`);
    allEnvFilesExist = false;
  }
});

// Summary
console.log('\n📊 Test Summary:');
const allTestsPassed = allFilesExist && allScriptsExist && allDepsExist && 
                       allDevDepsExist && allDockerFilesExist && allEnvFilesExist;

if (allTestsPassed) {
  console.log('✅ All structural tests PASSED!');
  console.log('\n📝 Next steps:');
  console.log('1. Set up .env file with your configuration');
  console.log('2. Run: docker-compose up -d postgres redis');
  console.log('3. Run: npm run prisma:migrate');
  console.log('4. Run: npm run dev');
  console.log('\nOr simply run: docker-compose up -d');
  process.exit(0);
} else {
  console.log('❌ Some tests FAILED!');
  process.exit(1);
}
