# 🖼️ embed

The embed widget that you can drop in to any website that's part of the webring, built with Svelte.

## Commands

All commands are run from the root of the project, from a terminal:

| Command       | Action                                      |
| :------------ | :------------------------------------------ |
| `bun install` | Installs dependencies                       |
| `bun dev`     | Starts local dev server at `localhost:5173` |
| `bun build`   | Build the widget and copy to `website`      |

## Components

**`pagering-link`** - link to open the webring

```
<pagering-ring theme="light|dark|system"></pagering-ring>
```

**`pagering-overlay`** - navigation widget _(created automatically)_

```
<pagering-overlay></pagering-overlay>
```
