/**
 * https://github.com/bitjson/typescript-starter/issues/221
 */

interface SymbolConstructor {
  readonly observable: symbol;
}
