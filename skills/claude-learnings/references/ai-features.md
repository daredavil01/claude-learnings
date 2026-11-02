# AI features

Three repos call language models (YF, PS, PW2). Each concluded that the model is
the least reliable layer and code must hold the rules.

Tags: `ai`

1. **A model id is configuration, never a constant.** [YF, PS] `gemini-2.5-flash`
   answered 404 for a new key, and the alternatives returned 503 for minutes. YF
   reads the id from the admin with a fallback; PS keeps its model ladder in a
   settings row.
2. **A prompt is not enforcement.** [PS] The rule a prompt stated was broken on the
   first call. Code enforces what it can and flags what it can detect; PS strips
   any link the archive did not supply.
3. **If the data can't answer, say so.** [PS, PW2] Quick answers are assembled from
   the archive, never generated, and the page labels which layer answered.
4. **Retrieval needs a similarity floor, and type filters must re-rank, not
   pre-filter.** [PS] Without a floor the semantic half always returns its nearest
   rows. Filtering by type before ranking returned eight confident, unrelated
   items.
5. **An LLM judge must know what retrieval missed.** [PS] Refusals of answerable
   questions scored "refused correctly" until an archive summary was added. 63 of
   98 self-reported confidences read 1.00; do not trust self-reported confidence.
6. **Exact text is typeset in code, never left to AI-generated pixels.** [BK]
7. **A synthetic voice should not borrow a real identity, and browser speech fails
   unevenly.** [PW2] The narrator speaks about the owner, never as the owner. Chrome
   cuts utterances after about 15 seconds, `onend` may never fire, Firefox can't
   listen, and Android re-sends earlier results.
8. **Answer in the question's language.** [PW2] The deep archive once answered an
   English question in Marathi. See `dates-and-languages.md` §11.
