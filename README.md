# gentle-browser-jev

A simple, measurable browser-agent laboratory inspired by TypeSafe JEV and Gentle AI. It separates the decision owners:

```text
Gentle: budgets, policy, state shaping, stop gates
JEV: typed action choice, confidence, probabilities
Browser: validated execution and observation
Dashboard: live trace, latency, tokens, errors, downloadable report
```

## Run with pnpm

```powershell
cd C:\Users\JorgeHaraDevs\gentle-browser-jev
pnpm install
pnpm test
pnpm start
```

Open <http://127.0.0.1:8899>.

Click **Run task** to execute the synthetic local browser flow. The panel streams events live and shows separate Gentle/JEV/browser timings, token counts, JEV calls, and tool calls. **Download report** downloads the latest JSON report.

## Real JEV

Set `TYPESAFE_API_KEY` only in the local process before starting the server. Without it, the lab uses a deterministic JEV-shaped fallback so tests remain offline. No key is committed. Real browser/device actions are intentionally not enabled in this first fixture milestone.

## Measurement contract

Every run records timestamped events for state construction, Gentle decisions, JEV decisions/errors, browser tool execution, observations, and final stop status. Reports are bounded JSON artifacts suitable for attaching to the repository. Compare JEV latency and token usage against the local fallback, and never claim savings without a controlled A/B run.
