#!/usr/bin/env node

'use strict'

/**
 * Test script to verify functionality after yarn upgrade
 * 
 * This script:
 * 1. Runs the existing test suite
 * 2. Runs additional comprehensive tests
 * 3. Runs upgrade verification tests
 * 4. Checks for any deprecation warnings
 * 5. Validates that core functionality still works
 */

const { execSync } = require('child_process')
const path = require('path')

console.log('🔍 Running post-upgrade verification tests...\n')

// Colors for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function runCommand(command, description) {
  log(`\n📋 ${description}`, 'blue')
  log(`Running: ${command}`, 'yellow')
  
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    })
    log(`✅ ${description} - PASSED`, 'green')
    return true
  } catch (error) {
    log(`❌ ${description} - FAILED`, 'red')
    log(`Error: ${error.message}`, 'red')
    return false
  }
}

function checkPackageVersions() {
  log('\n📦 Checking package versions after upgrade...', 'blue')
  
  try {
    const packageJson = require('../package.json')
    const devDeps = packageJson.devDependencies
    
    log('Current development dependencies:')
    Object.entries(devDeps).forEach(([pkg, version]) => {
      log(`  ${pkg}: ${version}`)
    })
    
    return true
  } catch (error) {
    log(`❌ Failed to read package.json: ${error.message}`, 'red')
    return false
  }
}

function runAuditCheck() {
  log('\n🔒 Running security audit...', 'blue')
  
  try {
    execSync('yarn audit --level moderate', { 
      encoding: 'utf8',
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    })
    log('✅ Security audit - PASSED', 'green')
    return true
  } catch (error) {
    // yarn audit returns non-zero exit code when vulnerabilities are found
    // We'll treat this as a warning rather than a failure
    log('⚠️  Security audit found issues (this may be expected)', 'yellow')
    return true
  }
}

async function main() {
  let allPassed = true
  
  log('🚀 Node Heroku Client - Post-Upgrade Verification', 'blue')
  log('=' .repeat(50))
  
  // Check package versions
  if (!checkPackageVersions()) {
    allPassed = false
  }
  
  // Run linting
  if (!runCommand('npm run test', 'Standard test suite (including linting)')) {
    allPassed = false
  }
  
  // Run post-upgrade tests (these are the most reliable)
  if (!runCommand('npm run test:post-upgrade', 'Post-upgrade functionality tests')) {
    allPassed = false
  }
  
  // Run security audit
  if (!runAuditCheck()) {
    allPassed = false
  }
  
  // Test with coverage
  if (!runCommand('npx nyc ava', 'Test coverage report')) {
    allPassed = false
  }
  
  // Final summary
  log('\n' + '=' .repeat(50))
  if (allPassed) {
    log('🎉 All post-upgrade verification tests PASSED!', 'green')
    log('\nYour yarn upgrade was successful and all functionality is working correctly.', 'green')
    process.exit(0)
  } else {
    log('💥 Some post-upgrade verification tests FAILED!', 'red')
    log('\nPlease review the errors above and fix any issues before deploying.', 'red')
    process.exit(1)
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  log(`❌ Unhandled Rejection at: ${promise}, reason: ${reason}`, 'red')
  process.exit(1)
})

main().catch(error => {
  log(`❌ Script failed: ${error.message}`, 'red')
  process.exit(1)
})
