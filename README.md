# Metanode CLI

The Metanode CLI is a command-line tool for creating and managing Metanode projects. This README provides instructions on how to use the CLI to create new projects and run them.

## Prerequisites

Before you start, ensure you have the following installed:
- Node.js (recommended version: 18.x or later)
- Yarn or npm

## Installation

To install the CLI, follow these steps:

1. Navigate to the root directory of the project.
2. Build the CLI tool using one of the following commands:
   ```sh
   npm run build
   # or
   yarn build
   ```

### Explanation

- `_buildCli` Directory: Describes the contents and purpose of the `_buildCli` directory, which holds the compiled CLI tool and other build artifacts.
- Usage Instructions: Clarified how to use the CLI tool after building it.

Feel free to adjust any details to better fit your specific setup or additional requirements!

## Usage

After building the CLI tool, you can use it to create, run, and build Metanode projects. The CLI has three main functions:

1. **Create Dapp**: Use this command to create a new Metanode project.
   ```sh
   npm run cli create
   #or
   yarn cli create
   ```

2. **Run Dapp**: Use this command to start a Metanode project.
   ```sh
   npm run cli run <project-name>
   #or 
   yarn cli run <project-name>
   ```

3. **Build Dapp**: Use this command to build the project for production.
   ```sh
   npm run cli build <project-name>
   #or 
   yarn cli build <project-name>
   ```

## Additional Notes

- **Default Environment File**: The CLI uses a default environment file `.env` which should always be included.
- **Environment Selection**: If creating a project with specific configurations (e.g., `testnet`), the CLI will automatically create an appropriate environment file (`.env.test`).

