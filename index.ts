import { tern } from './src/tern';
import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    await tern();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
