import fs from 'node:fs';

type LoggingCfg = { enabled?: boolean; path?: string } | undefined;

type LogEvent = 'no_match' | 'blocked' | 'no_handler' | 'executed' | 'error';

type RecordShape = {
  ts: string;
  event: LogEvent;
  data?: any;
};

export function getLogger(cfg: LoggingCfg) {
  const enabled = !!cfg?.enabled;
  const file = cfg?.path || '';
  return (event: LogEvent, data?: any) => {
    if (!enabled) return;
    const rec: RecordShape = { ts: new Date().toISOString(), event, data };
    const line = JSON.stringify(rec) + '\n';
    if (file) {
      try { fs.appendFileSync(file, line, 'utf8'); } catch {}
    } else {
      // fallback to stdout
      try { process.stdout.write(line); } catch {}
    }
  };
}
