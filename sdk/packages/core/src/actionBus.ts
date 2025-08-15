import { ActionBus, ActionBusOptions, ActionContext, ActionHandlerMap, Grammar } from './types.js';
import { matchUtterance } from './intentMatcher.js';
import { isAllowed } from './allowlist.js';
import { getLogger } from './logger.js';

export function createActionBus(grammar: Grammar, handlers: ActionHandlerMap = {}, opts: ActionBusOptions = {}): ActionBus {
  const log = getLogger(grammar.logging);
  const table: ActionHandlerMap = { ...handlers };

  async function dispatch(utterance: string) {
    const match = matchUtterance(utterance, grammar);
    if (!match) {
      log('no_match', { utterance });
      return null;
    }

    if (!isAllowed(match.intent, grammar, opts)) {
      log('blocked', { intent: match.intent, utterance });
      return match; // matched but blocked by policy
    }

    const handler = table[match.intent];
    if (!handler) {
      log('no_handler', { intent: match.intent, utterance });
      return match;
    }

    try {
      const ctx: ActionContext = { utterance, grammar, match };
      await handler(ctx);
      log('executed', { intent: match.intent, slots: match.slots });
    } catch (err: any) {
      log('error', { intent: match.intent, message: String(err?.message || err) });
    }
    return match;
  }

  function register(intent: string, handler: (ctx: ActionContext) => any) {
    table[intent] = handler;
  }

  return { dispatch, register };
}
