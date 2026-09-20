import test from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { spawn } from "node:child_process";
let child;
test.before(async()=>{child=spawn(process.execPath,["server.mjs"],{cwd:new URL("..",import.meta.url),env:{...process.env,PORT:"8897"},stdio:"ignore"});await new Promise(r=>setTimeout(r,150));});
test.after(()=>child?.kill());
test("browser fixture greets the console and exposes readiness", async () => { let browser; try { browser=await chromium.launch({headless:true}); } catch (error) { test.skip(`Chromium unavailable: ${error.message}`); return; } const page=await browser.newPage(); const messages=[]; page.on("console", message => messages.push(message.text())); await page.goto("http://127.0.0.1:8897/fixture.html"); assert.equal(await page.evaluate(() => window.__gentleFixtureReady), true); assert.ok(messages.some(message => message.includes("hello from the browser console"))); await browser.close(); });
