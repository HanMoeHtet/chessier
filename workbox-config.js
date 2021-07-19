module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{json,ico,html,js,wasm,png,txt,css,jpeg}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'build/sw.js',
  cleanupOutdatedCaches: true,
};
