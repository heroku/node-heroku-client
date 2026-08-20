import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Scope discovery to this package's own test/ dir. The release workflow
    // checks out heroku/npm-release-workflows into ./workflows-repo, and an
    // unanchored glob would pick up its vitest specs and run them without
    // that repo's deps installed.
    include: ['test/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['lib/**/*.js']
    }
  }
})
