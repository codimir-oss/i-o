# Quickstart (5 minutes)

1. Install host deps: `pnpm i` in `host/`.
2. Build firmware: `make` in `firmware/` (toolchain required).
3. Tap device to NFC reader, then run:
   ```bash
   pnpm --filter host start record --nfc | pnpm --filter host start action --profile=ide
   ```
4. Speak: "Codimir: open file main.ts"
