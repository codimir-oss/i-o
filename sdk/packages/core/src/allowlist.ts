import { ActionBusOptions, Grammar } from './types.js';

export function isAllowed(intent: string, grammar: Grammar, opts: ActionBusOptions = {}): boolean {
  const allow = grammar.allowlist || [];
  if (opts.allowUnlisted) return true;
  return allow.includes(intent);
}
