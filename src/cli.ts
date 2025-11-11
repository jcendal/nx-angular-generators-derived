#!/usr/bin/env node

import { execSync } from 'child_process';

/**
 * Extracts the last segment of a path
 * Example: "libs/shared/ui/toasts/src/lib/component-name" -> "component-name"
 */
function getLastPathSegment(path: string): string {
  const normalizedPath = path.replace(/\/$/, ''); // Remove trailing slash
  const segments = normalizedPath.split('/').filter(Boolean);
  return segments[segments.length - 1] || '';
}

/**
 * Joins paths using always forward slashes (for Nx compatibility)
 */
function joinPaths(...paths: string[]): string {
  return paths
    .filter(Boolean)
    .map((p) => p.replace(/\\/g, '/').replace(/\/$/, ''))
    .join('/');
}

/**
 * Escapes an argument for command line usage
 */
function escapeShellArg(arg: string): string {
  // If it contains spaces or special characters, wrap in quotes
  if (/[\s"'$`\\]/.test(arg)) {
    // Escape double quotes and backslashes
    return `"${arg.replace(/"/g, '\\"').replace(/\\/g, '\\\\')}"`;
  }
  return arg;
}

/**
 * Builds the Nx command to generate a component
 */
function buildNxCommand(
  generatorType: string,
  path: string,
  options: Record<string, string>
): string {
  const lastSegment = getLastPathSegment(path);
  const fullPath = joinPaths(path, lastSegment);

  // Use array to build command more safely
  const commandParts: string[] = [
    'npx',
    'nx',
    'g',
    `@nx/angular:${generatorType}`,
    escapeShellArg(fullPath),
    `--name=${escapeShellArg(lastSegment)}`,
  ];

  // Process additional options
  for (const [key, value] of Object.entries(options)) {
    if (key === 'module') {
      // Add .module.ts to module name
      commandParts.push(`--module=${escapeShellArg(value)}.module.ts`);
    } else {
      commandParts.push(`--${key}=${escapeShellArg(value)}`);
    }
  }

  return commandParts.join(' ');
}

/**
 * Parses command line arguments
 */
function parseArgs(args: string[]): {
  generatorType: string;
  path: string;
  options: Record<string, string>;
} {
  if (args.length < 2) {
    throw new Error(
      'Usage: npm run g <generator-type> <path> [--option=value]'
    );
  }

  const generatorType = args[0];
  const path = args[1];
  const options: Record<string, string> = {};

  // Process options (--key=value)
  for (let i = 2; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      if (key && value) {
        options[key] = value;
      }
    }
  }

  return { generatorType, path, options };
}

/**
 * Main CLI function
 */
function main() {
  try {
    // Get arguments (skip 'node' and script name)
    const args = process.argv.slice(2);

    if (args.length === 0) {
      console.error(
        'Usage: npm run g <generator-type> <path> [--option=value]'
      );
      console.error(
        'Example: npm run g component libs/shared/ui/toasts/src/lib/component-name --module=ui-toasts'
      );
      process.exit(1);
    }

    const { generatorType, path, options } = parseArgs(args);
    const nxCommand = buildNxCommand(generatorType, path, options);

    console.log(`Executing: ${nxCommand}`);
    // Execute command using shell to support npx correctly
    execSync(nxCommand, {
      stdio: 'inherit',
      shell: process.platform === 'win32' ? true : '/bin/sh',
    } as any);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error:', error);
    }
    process.exit(1);
  }
}

// Execute if this is the main file
// Check if running directly (not as imported module)
const isDirectExecution =
  (typeof require !== 'undefined' && require.main === module) ||
  (typeof process !== 'undefined' &&
    process.argv &&
    process.argv[1] &&
    process.argv[1].endsWith('cli.js'));

if (isDirectExecution) {
  main();
}

export { buildNxCommand, getLastPathSegment, parseArgs };
