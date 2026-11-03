# Approved portfolio release — 2026-11-03

Public site: https://scarlet-sudo.github.io/xiaoxin-website/

The approved interaction-refine v4 is now the root entry. Runtime resources are self-contained under site/. GitHub Pages serves static files directly; no framework build is required. Experimental source folders are retained locally and are not part of this release.

Pre-release backup: codex/backup-before-collage-2026-11-03
Backup commit: 7294674a450d54a401b8f7e3938d9c14ba1adb79
Rollback: revert this release commit on main and push. The old assets remain available and unmodified.

Validation: packaged project-prefix URL tested locally, desktop visual checks, chapter navigation, looping IP and film, 02 reveal interaction, project orbit, segmented curve, Northstar live link, uploaded resume checksum. Narrow-screen browser verification remains incomplete.

The title font is a Hanyi Shoujin personal-preview resource, not an open-source commercial font licence. Body uses the visitor's KaiTi font fallback; project descriptions use FangSong bold.

## Independent chapter pages — 2026-11-03

Replaces continuous vertical chapters with actual routes: /character/, /capability/, /evidence/, /trajectory/, /contact/. Navigation includes a loading curtain, entry motion and browser-back restoration. Root remains the cover. Existing #chapter links redirect to the corresponding page.

Fixed the missing directory separator in runtime-generated animation URLs in both motion loaders. Verified the actual rendered image dimensions and playing state on all five chapter pages. Enlarged expanded capability descriptions to 20–27px, with expandable paper panels and larger flow text.

Immediate rollback point: codex/backup-before-pages-2026-11-03 (7d8625c2da6afef2b0904963f0f6e3ab1e4b4864).

Validation: six routes each contain one chapter, local navigation and browser back, IP image naturalWidth and playing state on 01/02/03/04/contact, film/orbit behavior, keyboard-opened card measured at 22.6px with complete explanation, runtime animation/poster URL existence and JavaScript syntax.
