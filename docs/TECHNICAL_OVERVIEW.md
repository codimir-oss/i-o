# Technical Overview

## Architecture
1. Input: MEMS mic + analog front end (low‑noise preamp, anti‑alias).
2. Energy: NFC harvester (13.56 MHz) → rectifier → supercap (10–100 mF) → LDO.
3. Compute: ULP MCU (PDM/I²S) → VAD → 4‑bit ADPCM @ 8 kHz.
4. Link: NFC load modulation (framed, CRC16). Variants: RF backscatter, sub‑GHz.
5. Host: NFC reader daemon → frame reassembly → WAV → SDK bus.
6. Actions: local grammar → IDE/OS/ticket adapters; optional cloud ASR for long dictation.

## Power Budget (targets)
- Mic + AFE: ≤ 120 µA@1.8–2.8V during capture window
- MCU active: ≤ 2–3 mA; deep sleep otherwise
- Session energy: ≤ 3–5 mJ per 2–3 s command

## Components (suggested)
- Mic: Knowles/TDK analog MEMS (low current)
- MCU: STM32U0 or nRF52 (PDM/I²S, low power)
- NFC: AMS AS3956 or ST25 family with energy harvesting
- Storage (opt.): 512 KB SPI NOR for retry
- Supercap: 47–100 mF (low ESR)
- LDO: ultra‑low‑IQ, low dropout

## Frame Format (draft)
- [SYNC][SEQ][LEN][TS][PAYLOAD][CRC16]
- Payload: ADPCM frames (e.g., 128B chunks)

## Security
- Signed frames (device key), rolling SEQ, host allowlist + visible action log.

## SDK Interfaces
- Input: WAV/PCM stream or framed payload
- Output: Action bus (openFile, runTests, createTicket, …)
- Config: YAML grammar, allowlist, audit log
