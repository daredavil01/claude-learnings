# The agent's own environment

Traps in how Claude runs commands, not in any project. They recur because no
project repo carries them to the next one, which makes them the clearest case for
a shared skill. OS-specific traps are marked.

Tags: `agent-env`

## Processes and network (all OS)

1. **Never `pkill -f` a pattern that appears in your own command.** [TLWR, ATF] It
   matches the shell running it and kills it (exit 144). Use `pkill -f "[v]ite"`
   or find the PID with `ps aux | grep [v]ite`.
2. **A hang with no output is a network trap, not a slow install.** npm sat silent
   for 15 minutes; the registry answered 503 in 5 seconds because it was listed in
   `no_proxy`. Test the transport (`curl -sSI <registry>`) before the tool.
3. **Behind TLS inspection, drive the installed browser; never weaken certificate
   checks.** Playwright's bundled Chromium rejected a corporate re-signing
   certificate.

## Git (all OS)

4. **Back files up before breaking them on purpose; never restore with
   `git checkout` while work is uncommitted.** [LCC] It restored the last commit
   and threw away a phase's edits to three files. Copy to a scratch path, or
   `git stash` deliberately.
5. **Read `git status` before `git add -A`.** An unset variable sent screenshots
   into a literal `undefined/` directory, which got staged.

## Editing files

6. **Write edit scripts with the Write tool and run them from a file, never
   through shell heredocs.** [LCC ×5] Heredocs with backticks and `${}` broke
   LCC's edit scripts in five separate phases. `cat > file` with no input hung
   until timeout. A Python-written `\b` became a backspace in a JavaScript regex.
7. **Use the Edit tool, not `sed -i`, while a file watcher runs.** *(Windows)*
   Vite on Windows missed `sed -i` rewrites and kept serving stale styles.
8. **Keep line endings and encodings.** *(Windows)* [LCC ×3] Python on Windows
   wrote CRLF and read cp1252, and `core.autocrlf` rewrote a seed until a
   derived-text test failed. PowerShell mangles Marathi. `python -I` ignores
   `PYTHONIOENCODING`; use `-X utf8`.
9. **Git Bash rewrites arguments that start with `/` into Windows paths.**
   *(Windows)* Set `MSYS_NO_PATHCONV=1`.

## Browser pane

10. **Treat the browser pane as an unreliable instrument.** Screenshots time out
    when the window is hidden or come back blank mid-scroll, emulation ignores
    scroll, and assets are cached. Read the DOM instead (`elementFromPoint`,
    scripted checks), and poll a health URL before driving a server that was just
    started.

## Claude Design

11. **DesignSync needs an interactive `/design-login` and reads only design-system
    projects.** [LH, DQ, TLWR] Unattended sessions should work from exported files
    in the repo. See `design-handoffs.md`.
