import './style.css';
import typescriptLogo from './typescript.svg';
import { setupCounter } from './counter';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="flex flex-row justify-center">
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
            <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
        </a>
        <a href="https://trpc.io/" target="_blank">
            <img src="/trpc.svg" class="logo tRPC" alt="tRPC logo" />
        </a>
    </div>
    <h1>Modern Full-stack</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs text-xl">
      Full-stack setup with Type-safety
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
