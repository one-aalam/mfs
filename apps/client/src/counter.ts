import { INITIAL_STATE, log } from 'config';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server';

// Add the client
const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${import.meta.env.VITE_API_URL}/trpc`
        })
    ]
})


async function getServerData() {
  const received = await trpc.getInitialState.query()
  return received;
}

export function setupCounter(element: HTMLButtonElement) {
  let counter = INITIAL_STATE;
  log(`value from config: ${INITIAL_STATE}`);

  element.innerHTML = `loading...`;
  element.disabled = true;

  getServerData().then((resp) => {
    setCounter(resp);
    element.disabled = false;
  });

  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
}
