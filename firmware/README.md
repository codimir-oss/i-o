# Firmware

- License: Apache-2.0
- Pipeline: PDM capture → VAD → ADPCM → frame (seq, ts, CRC) → NFC/backhaul

## Build
```bash
make
```

## TODO
- VAD integration
- ADPCM codec
- Frame format spec
