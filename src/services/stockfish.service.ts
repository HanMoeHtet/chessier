// Load stockfish from /public/js/stockfish.js
const engine = new Worker('/js/stockfish.js');

export const post = (message: string) => {
  engine.postMessage(message);
};

export const watch = (cb: (message: string) => void) => {
  const listener = (event: MessageEvent) => cb(event.data);
  engine.addEventListener('message', listener);
  const unsubscribe = () => engine.removeEventListener('message', listener);
  return unsubscribe;
};

export const findBestMove = (fen = '', depth = 1) => {
  if (fen.length !== 0) {
    post(`position fen ${fen}`);
  } else {
    post('position startpos moves');
  }
  post(`go depth ${depth}`);
};

post('uci');
