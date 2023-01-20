# Modern Full-stack

Boilerplate structure to help you work end-to-end, with Typescript. It's kinda "full-stack" as in a single project you have the BE code as well as the FE code, and you're concerned with managing the both.

```
mfs/
  client/
    src/main.ts
    index.html
    package.json
  server/
    src/index.ts
    package.json
```

## Core Technologies
- Node.js (BE)
- Vanilla JS(or TS) with Vite(BE) - BYOF

## Current State
The FE calls the BE API, direcly or relatively `/api/...` through proxying, and renders data from the BE



## Workflow issues/solution on major challenges
- Commands are run separately for apps - Now running through Turbo
- Duplicacy. Code isn't shared - Now shared in a Turborepo
- Config Duplicacy - Tsconfig shared across multiple apps, Eslint or Prettier


















## Solution

## Config re-use
// Current
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "resolveJsonModule": true,
    "allowJs": true,
    // "declaration": true
    "sourceMap": true,
    "outDir": "dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}

// base.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true
  },
  "exclude": ["node_modules"]
}

// Node
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node 14",
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["es2018"],
    "module": "commonjs",
    "target": "es2020",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

// Vite

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "Display": "Vite",
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "types": ["vite/client"],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": false,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  }
}

Inside App

// Vite
{
  "exclude": ["node_modules"],
  "extends": "tsconfig/vite.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}

// Node
{
  "compilerOptions": {
    "lib": ["ES2015"],
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "exclude": ["node_modules"],
  "extends": "tsconfig/base.json",
  "include": ["src"]
}
