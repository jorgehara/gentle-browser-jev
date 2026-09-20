# Testing log

## Real JEV run — 2026-09-20

Environment: local Windows PowerShell, `gentle-browser-jev` server on `127.0.0.1:8899`.

Goal:

```text
Find the search control
```

Observed dashboard metrics:

| Metric | Result |
|---|---:|
| JEV latency | 1016.1 ms |
| Gentle latency | 13.2 ms |
| Browser latency | 10.2 ms |
| Input tokens | 441 |
| Output tokens | 50 |
| JEV calls | 1 |
| Model | `jev-1.13.0` |
| Original decision | `click_search` |
| Confidence | `0.14` |
| Confidence threshold | `0.75` |
| Fallback | `yes` |
| Final status | `done` |

Decision trace:

```text
Gentle state_built
Gentle bounded_read_only_browser_loop
JEV low_confidence (0.14 < 0.75)
Gentle fallback -> click_search
Browser observe fixture
Browser result
Gentle run_finished
```

Interpretation: the real JEV request succeeded and consumed 491 reported tokens, but its confidence was too low for autonomous trust. Gentle correctly preserved authority, recorded the low-confidence event, applied the safe fallback, and completed the read-only fixture observation. The extra ~1 second is the current JEV network/model decision cost; the local Gentle/browser work remained ~23 ms combined.

This is an observational run, not a quality benchmark. More runs with fixed goals and a controlled fixture are required before changing the confidence threshold.

## Offline automated test

```powershell
pnpm test
```

Expected current result:

```text
1/1 test passed
```
