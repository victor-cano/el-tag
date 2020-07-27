/**
 * Browser-env
 *
 * Simulates a global browser environment using jsdom. https://github.com/lukechilds/browser-env#browser-env
 *
 */

const browserEnv = require('browser-env');

browserEnv([
  'window',
  'document',
  'navigator',
  'HTMLElement',
  'DocumentFragment',
]);
