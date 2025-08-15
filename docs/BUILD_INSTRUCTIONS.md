# Build Instructions (Rev A — NFC Tap‑to‑Talk)

## 1) Hardware
- Open `hardware/` KiCad project. Route NFC coil near enclosure surface.
- BOM: NFC harvester IC, supercap (47–100 mF), LDO, MCU, analog MEMS mic, passives.
- Fabrication: JLCPCB/PCBWay; assembly with stencil + hot air for QFN.
- Enclosure: thin grill over mic; coil centered; add copper PTT pad.

## 2) Bring‑Up
- Verify harvesting: measure Vcap rise under phone/reader field.
- MCU blinky under NFC field only.
- Mic bias and AFE noise floor check.

## 3) Firmware
- Toolchain: `arm-none-eabi-gcc` + Make.
- Pipeline: field‑detect IRQ → PDM capture (8 kHz) → VAD gate → ADPCM encode → frame → NFC TX.
- CRC16 on each frame; retry if host NACKs.

## 4) Host
```bash
cd host
pnpm i && pnpm build
pnpm start record --nfc | pnpm start action --profile=ide
```
- NFC reader: PN532/ACR122U. Reassemble frames → WAV → SDK.

## 5) SDK
- Configure `grammar.yml` (verbs: open, create ticket, run tests, …)
- Enable allowlist + action log.

## 6) Demo Script
- Tap device → speak: "Codimir: new ticket 'Fix 404 on checkout'" → ticket created.
