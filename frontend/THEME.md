# Taskflow Design System & Theme Reference

## Stack
- **Angular Material** (outline form fields, dialogs, buttons, date-picker)
- **Vex** theme wrapper (`src/@vex/styles/`) with SCSS CSS-variable bridge
- **Tailwind CSS** (`tailwind.config.js`) extended with Vex's CSS variables via `withOpacityValue()`
- **Font:** Inter (via `--font` CSS variable)

---

## CSS Variables

All variables are declared in `src/@vex/styles/_var.scss` and resolved at runtime (supports light/dark switching).

| Variable | Usage |
|---|---|
| `--background-base` | Page / app background |
| `--background-foreground` | Card, widget, modal background |
| `--background-app-bar` | Top app-bar background |
| `--background-hover` | Row / list item hover state |
| `--foreground-divider` | Borders, dividers, hairlines |
| `--text-color` | Primary body text |
| `--text-secondary` | Secondary / supporting text |
| `--text-hint` | Placeholder, disabled, hint text |
| `--color-primary` | Brand primary (buttons, links, active states) |
| `--color-primary-contrast` | Text on primary-colored backgrounds |
| `--color-accent` | Accent / secondary action color |
| `--color-warn` | Error / warning color |
| `--border-radius` | Default border-radius for cards/widgets (`8px`) |
| `--button-border-radius` | Button border-radius |
| `--font` | Font family (Inter) |

---

## Semantic Palette (Fixed Colors)

These are not theme-aware — they have consistent meaning regardless of light/dark mode.

| Color | Hex | Meaning |
|---|---|---|
| Indigo | `#6366f1` | Default project / primary accent |
| Emerald | `#10b981` | Success, completed tasks |
| Amber | `#f59e0b` | Warning, at-risk |
| Rose | `#ef4444` | Error, overdue, off-track |
| Violet | `#8b5cf6` | Secondary accent |
| Cyan | `#06b6d4` | Info, miscellaneous |
| Orange | `#f97316` | Activity, notifications |
| Lime | `#84cc16` | Progress |
| Pink | `#ec4899` | Tags, labels |
| Blue | `#3b82f6` | Links, information |

---

## Component Conventions

### Dialogs / Modals
- Width: `560px` (task) / `580px` (project) passed to `MatDialog.open()`
- Structure: `mat-dialog-title` → `mat-dialog-content` → `mat-dialog-actions align="end"`
- `mat-dialog-content` uses `display: flex; flex-direction: column; gap: 4px; min-width: 480px+`
- Two-column rows wrapped in `.modal-row { display: flex; gap: 16px; }`

### Form Fields
- Always `appearance="outline"` on `mat-form-field`
- Reactive forms with `FormBuilder` + `Validators.required` on required fields
- `mat-error` inside every required field

### Buttons
- Primary action: `mat-raised-button color="primary"`
- Secondary / cancel: `mat-button`
- Small widget header buttons: `mat-button class="widget__create-btn"`

### Widgets (dashboard cards)
- `.widget` — `background: var(--background-foreground); border-radius: 8px`
- `.widget__header` — flex row, title left, action button right
- `.widget__title` — `font-size: 14px; font-weight: 600`

### Project Avatars
- Size: `32px` (tile) / `40px` (modal preview)
- `border-radius: 8px`
- `background: project.color` (hex from semantic palette above)
- Text: 2-letter initials, `color: #fff`, `font-weight: 700`

---

## Sidenav
- Background: `#2A2C2E` (hardcoded, does not follow theme)

---

## Breakpoints (Tailwind)

| Name | Min-width |
|---|---|
| `sm` | 600px |
| `md` | 960px |
| `lg` | 1280px |
| `xl` | 1440px |
