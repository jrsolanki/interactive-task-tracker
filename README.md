# Interactive Task Tracker

A polished single-page task app built as a **minor project for my Pregrad course**. Everything updates live as you use it — add a task, tick it off, filter the list — and your tasks are saved in the browser, so reloading the page keeps your list.

## Features

- **Add task** — type a task and press Enter or click Add Task (empty input shows a friendly error instead of adding a blank task)
- **Mark complete / incomplete** — tick a task's checkbox to strike it through; tick again to reopen it
- **Delete task** — ✕ button on every task
- **Clear completed** — removes all finished tasks at once
- **Filters** — All / Active / Completed, with the active filter highlighted
- **Live counts** — "X total · Y active · Z completed" updates on every change
- **localStorage persistence** — tasks survive a page reload or browser restart
- **Responsive** — the add form stacks on narrow screens; same indigo-and-white styling as minor project 1

## How to run

No install, no build step. Open the page:

```bash
# open index.html in any browser
```

Keep `style.css` and `script.js` in the same folder — the page loads its styling and behaviour from them.

## How it works (for the viva / demo)

- `script.js` keeps the tasks in a `tasks` array (the app's state) and re-renders the list from it on every change — that single `render()` function is what makes the page feel live.
- Each task is `{ id, text, done }`. The id (a timestamp) is how delete/toggle finds the right task.
- `localStorage` stores the array as JSON under the key `taskflow-tasks`; it is read once on load and written after every add, toggle, delete and clear.

## Tech used

- HTML5
- CSS3 (flexbox, gradients, transitions, media queries)
- Vanilla JavaScript (DOM rendering, event handling, localStorage) — no frameworks, no external images

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page structure: header, hero, tracker card, how-it-works, footer |
| `style.css` | All styling: layout, tracker card, filters, task items, responsive breakpoints |
| `script.js` | All behaviour: state, rendering, add/toggle/delete/filter/clear, localStorage |

---

Built by Jay Solanki — Computer Engineering student, Government Engineering College Rajkot.
