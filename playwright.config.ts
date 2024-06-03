import { defineConfig, devices } from '@playwright/test';
import { access } from 'fs';
import {TestOptions} from './test-options'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  //timeout: 10000,
  //globalTimeout : 60000,

  /*expect:{
    timeout:2000
  }*/
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //por defecto
  //reporter: 'html',
  
  //cuando se corra el proyecto genera una lista en la consola de los tests
  //reporter: 'list',

  //reporte json y junit  y allure - puede ser uno o mas...
  reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        /* we don't need to provide token because we already integrated with GitHub directly 
        with GitHub actions.But if you use GitLab, for example, or any other CI,
        you may need to provide a token.*/
        //token: "<YOUR-ARGOS-TOKEN>",
      },
    ],
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    ["allure-playwright"]
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'http://localhost:4200',
    globalSqlUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV ==='1' ? 'http://localhost:0001'
    : process.env.STAGING ==='1' ? 'http://localhost:0002'
    : 'http://localhost:4200',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    extraHTTPHeaders:{
      'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    }
    /*actionTimeout: 5000,
    navigationTimeout: 5000*/
  },
  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown.ts'),

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'regression',
      testIgnore: '2setupAndTeardown.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup']
    },

    ///33333333333 y 444444444
    {
      name: 'articleSetup',
      testMatch: '1newArticle.setup.ts',
      dependencies: ['setup'],
      teardown: 'articleCleanUp'
    },
    {
      name: 'likeCounter',
      testMatch: '2setupAndTeardown.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['articleSetup']
    },
    {
      name: 'articleCleanUp',
      testMatch: '3articleCleanUp.setup.ts'
    },

    {
      name: 'setup',
      testMatch: 'auth.setup.ts'
    },
    {
      name: 'likeCounterGlobal',
      testMatch: 'likesCounterGlobal.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' }
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup']
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],storageState: '.auth/user.json' },
      dependencies: ['setup']
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],storageState: '.auth/user.json' },
      dependencies: ['setup']
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: { 
        //...devices['iPhone 13 Pro'],
        viewport: {width: 414, height:800}
      },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  webServer:{
    command: 'npm run start',
    url:'http://localhost:4200'
  }
});
