# Dates, time zones and languages

These sites serve readers in India (UTC+05:30), several in Marathi, Hindi or
Kannada. Time zones and scripts produced bugs in most of them.

Tags: `dates`, `i18n`

## Dates and time zones

1. **Count calendar days in the reader's zone; never compare dates through UTC
   strings.** [45D, VT] UTC strings put a 45-days reader on the wrong day for five
   and a half hours. VT showed today's birds as "yesterday" after 5:30 PM IST.
2. **A relative word in generated text is a claim about when it will be read.**
   [RF, LCC] RF's "Today's Plan" was false at the moment people post it, the night
   before. LCC's "Sends at 6:00 pm" read wrong at 9 pm. Check such screens after
   their time as well as before.
3. **Write dates unambiguously.** Agents read "09-08-2026" as 8 September; the fix
   was "9 August 2026".
4. **Anything that depends on the visitor's device or time zone renders after
   hydration.** Server and client must produce the same HTML first.
5. **Test by moving the clock, never by waiting.** See `verification.md` §15.

## Languages and scripts

6. **A locale is not a specification.** [YF, VT] `Intl` with `mr-IN` prints
   Devanagari digits. YF's requirement is Latin digits everywhere; VT wanted
   Devanagari digits on Marathi pages. Check what the formatter emits against
   each project's requirement (see `disagreements.md`).
7. **Review both language variants of a field together.** [YF] YF's prototype gave
   the founding year as 2010 in Marathi and 2016 in English, in the same
   sentence.
8. **Form size caps must count encoded bytes.** [LCC] URL-encoded Indic text costs
   about 9 characters per letter, so a 4 KB cap refused a 500-letter Hindi
   comment. The cap is now 16 KB.
9. **Test every language swap with pseudo-translations.** [LCC] Prefix each string
   (`हिं·`, `ಕನ·`, `मरा·`) and flag visible text without the prefix. Fallback text
   needs fallback dates, or a Marathi reader gets English words with Marathi
   dates.
10. **A second script's font is a content budget, not a CSS budget.** [YF, PS] YF's
    English pages carry 29,364 B of font only while no Devanagari glyphs appear in
    the content; re-measure when content changes. PS's card renderer (satori
    0.32) can't shape Devanagari conjuncts.
11. **Write narration for the ear separately.** [PW2] Years are spelled as spoken
    and sentences shortened, and the numbers still come from the data. The deep
    archive once answered an English question in Marathi.
12. **Keep encodings intact on Windows.** PowerShell mangles Marathi; use
    `python -X utf8`. See `agent-environment.md` §8.
