# EVE working lanes

Three Claude sessions share this worktree (`story/chapter-3-design`). Files are the
source of truth; `SendMessage` is only the nudge.

| Session | Owns | Never touches |
|---|---|---|
| **EVE design overview** | Story and design docs (`docs/story/**`, `docs/design/**`, `docs/LANES.md`), intimate scene cards and the local writer run, art direction (`docs/art/EVE_STYLE_LOCK.md`), reviewing what plays, job handoffs. | `src/**`, tests, runtime bindings. |
| **EVE Code** | `src/**`, `tests/**`, `scripts/**`, `tools/**` code, save versioning, runtime art bindings, the build and QA suites. | Cards, story/art direction docs, generating images. |
| **EVE Art** | ZenCreator generation, `art/staging/**`, candidate review notes and records, the asset-id table in `EVE_STYLE_LOCK.md`. | `src/**`, runtime bindings, promoting to `art/production` without owner approval. |

Rules:

- Handoffs go in `docs/handoffs/<date>-<topic>.md`; the receiving session is messaged with a one-line summary pointing at the file.
- Only one session edits a given file. If a job needs a file in another lane, hand it over.
- No commits or pushes unless the owner asks in that session.
- Art follows [EVE_STYLE_LOCK.md](art/EVE_STYLE_LOCK.md); images stop at suggestive/implied. Explicit content is prose only, via [docs/story/intimate/README.md](story/intimate/README.md).
