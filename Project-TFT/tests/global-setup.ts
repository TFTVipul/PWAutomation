import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  /*Enter USERNAME and PASSWORD below to run tests locally
  process.env.USERNAME = "";
  process.env.PASSWORD = "";
  */
}

export default globalSetup;