# Codimir I/O

Mind → Voice → Action — Batteryless voice input for developers.

Codimir I/O is an open-source hardware, firmware, and software stack that lets you speak short commands into a batteryless NFC-powered device and have them trigger actions in your IDE, OS, or ticketing tools.

- Hardware: NFC-powered mic + supercap reference design
- Firmware: ULP VAD + ADPCM + NFC framing
- Host: Desktop daemon & CLI to receive and act
- SDK: TypeScript SDK with IDE adapters and ticketing integrations

## Why
Bridge intent → speech → action with minimal friction and maximal privacy. Focus on what you mean, not how to click it.

## Quickstart
- Hardware: see `hardware/`
- Firmware:
  ```bash
  cd firmware
  make flash
  ```
- Host CLI:
  ```bash
  cd host
  pnpm install && pnpm build
  pnpm start record --nfc | pnpm start action --profile=ide
  ```
- Speak: “Codimir: create ticket 'Fix 404 on checkout'”

## Repository Layout
- `hardware/` — PCB & enclosure (CERN-OHL-S-2.0)
- `firmware/` — MCU source (Apache-2.0)
- `host/` — Daemon & CLI (Apache-2.0)
- `sdk/` — TypeScript SDK & adapters (Apache-2.0)
- `examples/` — Demo workflows
- `docs/` — Documentation site
- `brand/` — Logos and guidelines

## License
- Software: Apache-2.0 (see `LICENSE`)
- Hardware: CERN-OHL-S-2.0 (see `LICENSE-HARDWARE`)
- Docs: CC BY 4.0 (see `LICENSE-DOCS`)

© 2025 Jobrayan, Inc. “Codimir” is a trademark of Jobrayan, Inc. See `TRADEMARKS.md`.
