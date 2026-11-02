#!/usr/bin/env node
// Harvest learnings entries from many repos, grouped by tag.
//
// Usage:
//   node harvest.mjs [--since YYYY-MM-DD] [--tag name] <repo dir> [<repo dir> …]
//
// Reads LEARNINGS.md, LESSONS.md, lessons.md, learnings.md and docs/lessons.md in
// each repo. Entries in the shared format (see templates/LEARNINGS.md) are
// parsed; files in older formats are reported so they can be converted.
// No dependencies; Node 18+.

import { readFileSync, existsSync, statSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const CANDIDATES = [
  "LEARNINGS.md",
  "LESSONS.md",
  "lessons.md",
  "learnings.md",
  "docs/lessons.md",
  "docs/LEARNINGS.md",
];

// ### 2026-11-02 · Short title   (also accepts "-" or "—" as separator)
const HEADING = /^###\s+(\d{4}-\d{2}-\d{2})\s*[·\-—]\s*(.+?)\s*$/;
const FIELD = /^\*\*(Trigger|Learning|Rule|Tags|Promoted):\*\*\s*(.*)$/;

function parseArgs(argv) {
  const opts = { since: null, tag: null, repos: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--since") opts.since = argv[++i];
    else if (a === "--tag") opts.tag = argv[++i]?.toLowerCase();
    else if (a === "-h" || a === "--help") opts.help = true;
    else opts.repos.push(a);
  }
  if (opts.since && !/^\d{4}-\d{2}-\d{2}$/.test(opts.since)) {
    throw new Error(`--since must be YYYY-MM-DD, got "${opts.since}"`);
  }
  return opts;
}

export function parseEntries(text) {
  const entries = [];
  let current = null;
  let field = null;
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    const h = line.match(HEADING);
    if (h) {
      current = { date: h[1], title: h[2], Trigger: "", Learning: "", Rule: "", Tags: "", Promoted: "" };
      entries.push(current);
      field = null;
      continue;
    }
    if (!current) continue;
    if (/^#{1,3}\s/.test(line)) { current = null; field = null; continue; }
    const f = line.match(FIELD);
    if (f) { field = f[1]; current[field] = f[2].trim(); continue; }
    if (field && line.trim()) current[field] += " " + line.trim();
    else if (!line.trim()) field = null;
  }
  return entries
    .filter((e) => e.Trigger || e.Rule || e.Tags)
    .map((e) => ({
      ...e,
      tags: e.Tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
    }));
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || opts.repos.length === 0) {
    console.log("Usage: node harvest.mjs [--since YYYY-MM-DD] [--tag name] <repo dir> …");
    process.exit(opts.help ? 0 : 1);
  }

  const byTag = new Map();
  const unparsed = [];
  let total = 0;

  for (const repoArg of opts.repos) {
    const repo = resolve(repoArg);
    const name = basename(repo);
    // Dedupe by inode: on case-insensitive disks LEARNINGS.md and learnings.md are one file.
    const seen = new Set();
    const files = CANDIDATES.map((c) => join(repo, c)).filter((f) => {
      if (!existsSync(f)) return false;
      const id = `${statSync(f).dev}:${statSync(f).ino}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
    if (files.length === 0) { unparsed.push(`${name}: no learnings file`); continue; }
    for (const file of files) {
      const entries = parseEntries(readFileSync(file, "utf8"));
      if (entries.length === 0) {
        unparsed.push(`${name}/${file.slice(repo.length + 1)}: no entries in the shared format`);
        continue;
      }
      for (const e of entries) {
        if (opts.since && e.date < opts.since) continue;
        const tags = e.tags.length ? e.tags : ["untagged"];
        if (opts.tag && !tags.includes(opts.tag)) continue;
        total++;
        for (const t of tags) {
          if (opts.tag && t !== opts.tag) continue;
          if (!byTag.has(t)) byTag.set(t, []);
          byTag.get(t).push({ repo: name, ...e });
        }
      }
    }
  }

  const head = [`# Harvested learnings`, ""];
  head.push(`${total} entr${total === 1 ? "y" : "ies"}` +
    (opts.since ? ` since ${opts.since}` : "") +
    (opts.tag ? ` tagged ${opts.tag}` : "") +
    ` from ${opts.repos.length} repo${opts.repos.length === 1 ? "" : "s"}.`);
  console.log(head.join("\n"));

  for (const tag of [...byTag.keys()].sort()) {
    const list = byTag.get(tag).sort((a, b) => b.date.localeCompare(a.date));
    console.log(`\n## ${tag} (${list.length})\n`);
    for (const e of list) {
      const flag = e.Promoted ? "" : "  ← promotion candidate";
      console.log(`- **${e.date} · ${e.title}** [${e.repo}]${flag}`);
      if (e.Rule) console.log(`  - Rule: ${e.Rule}`);
      if (e.Trigger) console.log(`  - Trigger: ${e.Trigger}`);
      if (e.Promoted) console.log(`  - Promoted: ${e.Promoted}`);
    }
  }

  if (unparsed.length) {
    console.log(`\n## Not harvested\n`);
    for (const u of unparsed) console.log(`- ${u}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("harvest.mjs")) {
  try { main(); } catch (err) { console.error(err.message); process.exit(1); }
}
