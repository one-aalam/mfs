import { INITIAL_STATE, log } from 'config';

async function getServerData() {
  const resp = await fetch(import.meta.env.VITE_API_URL);
  const received = await resp.json();
  return received;
}

export function setupCounter(element: HTMLButtonElement) {
  let counter = INITIAL_STATE;
  log(`value from config: ${INITIAL_STATE}`);

  element.innerHTML = `loading...`;
  element.disabled = true;

  getServerData().then((resp) => {
    setCounter(parseInt(resp));
    element.disabled = false;
  });

  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
}
