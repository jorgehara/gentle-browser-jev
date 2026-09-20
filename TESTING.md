# Testing log

## Real JEV run — 2026-09-20

- JEV latency: 1016.1 ms
- Gentle latency: 13.2 ms
- Browser latency: 10.2 ms
- Input tokens: 441
- Output tokens: 50
- Model: `jev-1.13.0`
- Decision: `click_search`
- Confidence: `0.14`
- Threshold: `0.75`
- Fallback: yes

JEV worked, but Gentle correctly rejected the low-confidence decision and applied its safe fallback.

## Browser console greeting

Command:

```powershell
pnpm test
```

The Playwright test opens `/fixture.html`, captures browser console messages, and asserts both:

- `[gentle-browser-jev:fixture] hello from the browser console`
- `window.__gentleFixtureReady === true`

Observed result:

```text
2/2 tests passed
~3.1 seconds
```

The browser-console test uses a real headless Chromium process. It is not a simulated console log.

## Segmented workflow test

The second test verifies the Gentle/JEV/browser event flow and metrics report:

```text
Gentle state -> JEV decision -> browser tool -> browser result -> final status
```

It asserts that Gentle, JEV, and browser metrics are present and that the run finishes successfully.
