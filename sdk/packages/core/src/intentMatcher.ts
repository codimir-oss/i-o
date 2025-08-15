import { Grammar, Intent, IntentMatch, MatchResult } from './types.js';

function patternToRegex(pattern: string, slots?: { name: string }[]): { regex: RegExp; slotNames: string[] } {
  // Replace <slot> with (.+) greedy capture; trim whitespace flexibility
  const slotRegex = /<([a-zA-Z0-9_\-]+)>/g;
  const slotNames: string[] = [];
  let rx = pattern.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape
  rx = rx.replace(slotRegex, (_m, name) => {
    slotNames.push(name);
    return '(.+?)';
  });
  // Allow flexible spaces
  rx = rx.replace(/\s+/g, '\\s+');
  const regex = new RegExp('^' + rx + '$', 'i');
  return { regex, slotNames };
}

function tryMatch(utterance: string, intent: Intent): IntentMatch | null {
  for (const pattern of intent.patterns) {
    const { regex, slotNames } = patternToRegex(pattern, intent.slots);
    const m = utterance.match(regex);
    if (m) {
      const slots: Record<string, string> = {};
      slotNames.forEach((n, i) => (slots[n] = m[i + 1].trim()))
      const score = Math.min(1, pattern.length / Math.max(utterance.length, 1));
      return { intent: intent.name, slots, pattern, score };
    }
  }
  return null;
}

export function matchUtterance(utteranceIn: string, grammar: Grammar): MatchResult {
  let utterance = utteranceIn.trim();

  // If hotword enabled, optionally strip a leading hotword token
  if (grammar.hotword?.enabled && grammar.hotword.words?.length) {
    for (const hw of grammar.hotword.words) {
      const re = new RegExp('^' + hw + '\\s*[:,]?\\s*', 'i');
      if (re.test(utterance)) {
        utterance = utterance.replace(re, '').trim();
        break;
      }
    }
  }

  let best: IntentMatch | null = null;
  for (const intent of grammar.intents) {
    const m = tryMatch(utterance, intent);
    if (!m) continue;
    if (!best || m.score > best.score) best = m;
  }
  return best;
}
