export type Slot = {
  name: string;
  type: 'string';
};

export type Intent = {
  name: string;
  description?: string;
  patterns: string[];
  slots?: Slot[];
};

export type Grammar = {
  version: number;
  locale: string;
  intents: Intent[];
  allowlist?: string[];
  hotword?: { enabled: boolean; words: string[] };
  logging?: { enabled: boolean; path: string };
};

export type IntentMatch = {
  intent: string;
  slots: Record<string, string>;
  pattern: string;
  score: number; // simple heuristic 0..1
};

export type MatchResult = IntentMatch | null;

export type ActionContext = {
  utterance: string;
  grammar: Grammar;
  match: IntentMatch;
};

export type ActionHandler = (ctx: ActionContext) => Promise<void> | void;

export type ActionHandlerMap = Record<string, ActionHandler>;

export type ActionBusOptions = {
  allowUnlisted?: boolean;
};

export type ActionBus = {
  dispatch: (utterance: string) => Promise<IntentMatch | null>;
  register: (intent: string, handler: ActionHandler) => void;
};
