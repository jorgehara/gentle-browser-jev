import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
let child;
test.before(async()=>{child=spawn(process.execPath,["server.mjs"],{cwd:new URL("..",import.meta.url),env:{...process.env,PORT:"8898"},stdio:"ignore"});await new Promise(r=>setTimeout(r,150));});
test.after(()=>child?.kill());
test("runs a segmented Gentle/JEV/browser flow and reports metrics",async()=>{const r=await fetch("http://127.0.0.1:8898/api/run",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({goal:"Find the search control"})});const body=await r.json();assert.equal(body.status,"done");assert.ok(body.metrics.gentleMs>=0);assert.ok(body.metrics.jevMs>=0);assert.ok(body.metrics.browserMs>=0);assert.ok(body.metrics.toolCalls>=1);assert.ok(body.events.some(e=>e.type==="jev_decision"));});
