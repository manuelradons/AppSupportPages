# App Support Pages

Support and privacy pages for apps by Manuel Radons. Hosted as a static website
on GitHub Pages at <https://manuelradons.github.io/AppSupportPages/>.

## Pages

| App | Support | Privacy | Languages |
| --- | --- | --- | --- |
| Overview | `/` | Website note on the overview | English, German |
| Chess Labyrinth | `/ChessLabyrinth/` | `/ChessLabyrinth/#en-privacy` | English, German, Spanish, French, Italian, Hindi, Japanese, Simplified Chinese, Russian |
| Chess Billiards | `/ChessBilliards/` | `/ChessBilliards/privacy.html` | English, German |

Paths are relative to the Pages base URL above, including `/AppSupportPages/`.
Use `#de-support` / `#en-support` for a specific support language, and
`#de-privacy` / `#en-privacy` for privacy. An app can pass its selected language
in these anchors. The new pages also accept `?lang=de` or `?lang=en`.

## Adding an app

1. Create a stable app directory with its support page, privacy page and assets.
2. Give the app its own design: CSS, typography, colours, imagery and layout.
   `assets/overview.css` styles only the neutral overview. It is not an app theme.
3. Add the app to both languages of the overview.
4. Audit the actual app's storage, permissions and third-party services before
   writing its privacy notice. Do not copy another app's advertising statements.
5. Keep contact details, policy date and all available translations consistent.
6. Verify links, language switching and narrow screens before publication.

New pages share only `assets/language.js`. Put translated content in articles
with `data-language="en"` or `"de"`, a matching `lang`, and a language-prefixed
ID such as `en-support`. Language links use `data-language-choice`. Matching
section IDs such as `en-website` and `de-website` preserve the reader's section
when switching languages. The script updates the document language, title and
description. No cookies or browser storage are used. Without JavaScript, both
translations remain readable and their anchor links still work.

Chess Labyrinth is an existing standalone page with its own design and language
script. Preserve its path and all existing fragment IDs, including German IDs
without language prefixes. Its contents were not changed by the Billiards addition.
The overview's Labyrinth icon is extracted from that page's existing favicon.
The Billiards icon and coordinate glyphs come from the game.

## Local preview and publication

No build step or package installation is needed. From this directory:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open <http://127.0.0.1:8080/>. Check English and German, explicit language links,
browser-language fallback, a phone viewport, and the pages without JavaScript.

GitHub Pages is already enabled for this repository. Keep the existing publishing
source; the added HTML and asset files can be served directly. The `.nojekyll`
file disables Jekyll processing for branch-based static publishing.

## Existing content

The Billiards policy and overview use the contact address supplied by the owner.
The existing Labyrinth page still contains its own draft notice and postal
address placeholders. That older page has not been edited as part of this addition.

Contact: <ch.jog.dev@gmail.com>.
