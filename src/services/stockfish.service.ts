// Load stockfish from /public/js/stockfish.js
const engine = new Worker('/js/stockfish.js');

export const post = (message: string) => {
  engine.postMessage(message);
};

export const watch = (cb: (message: string) => void) => {
  engine.addEventListener('message', (event) => cb(event.data));
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
