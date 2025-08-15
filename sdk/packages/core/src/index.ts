import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node:querystring';
import { Grammar, MatchResult, IntentMatch, ActionBus, ActionHandlerMap, ActionBusOptions } from './types.js';
import { matchUtterance } from './intentMatcher.js';
import { createActionBus } from './actionBus.js';

export function loadGrammarFromFile(filePath: string): Grammar {
  const text = fs.readFileSync(filePath, 'utf8');
  // simple YAML loader without dependency: tolerate JSON superset if needed later
  // Expect minimal YAML; for safety in MVP, support JSON as well.
  try {
    // Attempt a naive YAML-to-JSON using a tiny subset parser is out-of-scope; require JSON fallback
    // Developers can use .yml, but during runtime we recommend precompiled JSON.
    // For convenience, try a loose parse: if file looks like JSON, parse JSON; otherwise throw.
    const trimmed = text.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return JSON.parse(trimmed) as Grammar;
    }
  } catch (e) {
    // fall through
  }
  // Minimal parse of our provided grammar.yml is not implemented here to avoid extra deps.
  // Suggestion: convert grammar.yml to grammar.json during build.
  throw new Error('YAML parsing not implemented. Provide grammar as JSON for runtime, or add a YAML parser.');
}

export { matchUtterance };
export { createActionBus };
export type { Grammar, MatchResult, IntentMatch, ActionBus, ActionHandlerMap, ActionBusOptions } from './types.js';
