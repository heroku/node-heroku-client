# Testing Guide for node-heroku-client

This document describes the testing strategy for the node-heroku-client library, especially for verifying functionality after dependency upgrades.

## Test Structure

### 1. Original Test Suite (`test.js`)
- Basic functionality tests for all HTTP methods
- URL parsing tests  
- Error handling verification
- These tests ensure core functionality works

### 2. Comprehensive Test Suite (`test/comprehensive.test.js`)
- Extended test coverage for edge cases
- Authentication testing (token, auth string)
- Error handling for various HTTP status codes
- Custom headers and configuration options
- Pagination handling
- Retry mechanism testing
- JSON parsing edge cases
- Middleware functionality
- Timeout handling

### 3. Upgrade Verification Tests (`test/upgrade-verification.test.js`)
- Focused tests to verify critical functionality after dependency upgrades
- Tests integration points that could break with new dependency versions
- Validates that `tunnel-agent` and `is-retry-allowed` dependencies work correctly
- End-to-end app lifecycle testing
- User agent and version verification

## Running Tests

### Standard Test Suite
```bash
npm test
```
This runs the original test suite with coverage and linting.

### Comprehensive Tests Only
```bash
npm run test:comprehensive
```

### Upgrade Verification Tests Only
```bash
npm run test:upgrade
```

### Post-Upgrade Tests (Recommended)
```bash
npm run test:post-upgrade
```
This runs the most reliable test suite designed to work with older dependency versions.

### Full Post-Upgrade Verification
```bash
npm run verify-upgrade
```
This runs a comprehensive verification script that:
- Checks package versions
- Runs all test suites
- Performs security audit
- Generates coverage report
- Provides detailed success/failure reporting

## Pre-Upgrade Testing Strategy

Before performing a `yarn upgrade`:

1. **Baseline Testing**
   ```bash
   npm test
   npm run test:comprehensive
   npm run test:upgrade
   ```

2. **Document Current State**
   ```bash
   yarn audit > pre-upgrade.audit
   yarn list --depth=0 > pre-upgrade.packages
   ```

## Post-Upgrade Testing Strategy

After performing a `yarn upgrade`:

1. **Run Full Verification**
   ```bash
   npm run verify-upgrade
   ```

2. **Compare Audit Results**
   ```bash
   yarn audit > post-upgrade.audit
   # Compare with pre-upgrade.audit to see improvements
   ```

3. **Manual Smoke Tests** (if needed)
   - Test with a real Heroku token against staging environment
   - Verify no deprecation warnings in console output

## Test Coverage

The test suites cover:

- ✅ All HTTP methods (GET, POST, PUT, PATCH, DELETE)
- ✅ Authentication (token-based, auth string)
- ✅ Error handling (4xx, 5xx errors)
- ✅ Custom headers and configuration
- ✅ URL parsing and custom hosts
- ✅ Request/response body handling
- ✅ Pagination (automatic and partial)
- ✅ Retry logic and network error handling
- ✅ JSON parsing and malformed responses
- ✅ Timeout handling
- ✅ Middleware integration
- ✅ User agent setting
- ✅ Proxy configuration (tunnel-agent)
- ✅ Dependency integration points

## Key Integration Points to Watch

When upgrading dependencies, pay special attention to:

1. **AVA Testing Framework**
   - Test syntax changes
   - Assertion API changes
   - Async/await handling

2. **Nock HTTP Mocking**
   - Mock API changes
   - Header matching behavior
   - Response simulation

3. **Standard/ESLint**
   - New linting rules
   - Code style requirements

4. **NYC Coverage**
   - Coverage reporting format
   - Threshold configurations

5. **Debug Module**
   - Debug output format
   - Environment variable handling

## Troubleshooting Common Issues

### Tests Fail After Upgrade

1. **Check for breaking changes in test dependencies**
   ```bash
   # Check changelogs for major version bumps
   yarn info ava versions --json
   yarn info nock versions --json
   ```

2. **Update test syntax if needed**
   - AVA assertion methods may have changed
   - Async/await patterns may need updates

3. **Verify mock behavior**
   - Nock API may have changed
   - Header matching might be more strict

### Linting Errors After Upgrade

1. **Check Standard.js changes**
   ```bash
   npx standard --version
   ```

2. **Fix new linting rules**
   ```bash
   npx standard --fix
   ```

### Coverage Issues

1. **Check NYC configuration**
   - Verify coverage thresholds
   - Check file inclusion/exclusion patterns

## Adding New Tests

When adding new functionality to the library:

1. **Add to appropriate test file**
   - Basic functionality → `test.js`
   - Edge cases/comprehensive → `test/comprehensive.test.js`
   - Critical paths → `test/upgrade-verification.test.js`

2. **Follow existing patterns**
   - Use nock for HTTP mocking
   - Test both success and error cases
   - Include edge cases and malformed inputs

3. **Update this documentation**
   - Document new test scenarios
   - Update coverage checklist

## Continuous Integration

The tests are designed to work in CI environments:

- No external network dependencies (all mocked)
- Deterministic test execution
- Clear success/failure reporting
- Compatible with Node.js versions 10+

For Travis CI or similar, the `npm run verify-upgrade` command provides comprehensive verification suitable for deployment gates.
