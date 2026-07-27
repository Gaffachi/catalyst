# UI Design System: Catalyst

This design system defines the visual guidelines for Catalyst to ensure it feels premium, modern, accessible, and clean.

## 1. Color Palette

We use a curated palette with modern HSL variations to ensure contrast compliance and clean dark mode translation.

| Token | HSL / Hex Code | Tailwind Equivalent | Context / Purpose |
| :--- | :--- | :--- | :--- |
| **Primary (Brand)** | `hsl(222, 47%, 11%)` / `#0F172A` | `bg-slate-900` / `text-slate-900` | Header background, main headings, primary branding elements. |
| **Secondary** | `hsl(217, 91%, 60%)` / `#3B82F6` | `bg-blue-500` / `text-blue-500` | Information tags, active states, progress indicators. |
| **Accent (Catalyst)** | `hsl(24, 95%, 53%)` / `#F97316` | `bg-orange-500` | Dynamic buttons, call-to-actions, alerts. |
| **Neutral Dark** | `hsl(215, 28%, 17%)` / `#1E293B` | `bg-slate-800` | Text color for body, card borders, icons. |
| **Neutral Light** | `hsl(210, 40%, 98%)` / `#F8FAFC` | `bg-slate-50` | Page background, sub-layout panels, disabled items. |
| **Border / Slate** | `hsl(214, 32%, 91%)` / `#E2E8F0` | `border-slate-200` | Section divider lines, input field borders. |

---

## 2. Typography

The default typography is set to **Inter** or **Outfit** to provide a technical, academic-meets-corporate feel.

- **Headers**:
  - `h1`: 2.25rem (36px) | Bold | tracking-tight (Main dashboard headers, landing page title)
  - `h2`: 1.5rem (24px) | SemiBold (Section headers)
  - `h3`: 1.25rem (20px) | Medium (Sub-section / Card headings)
- **Body Text**:
  - Regular: 0.875rem (14px) or 1rem (16px) | Leading-relaxed | Slate-700
  - Small / Caption: 0.75rem (12px) | Slate-500

---

## 3. Spacing Grid

We adhere to a standard 8px grid system. Spacing should utilize standard Tailwind tokens:

- **Component Margins**: `space-y-4`, `space-y-8` (16px, 32px)
- **Internal Padding**: `p-4` (16px) for cards, `p-6` (24px) for larger layout containers.
- **Button Padding**: `px-4 py-2` (16px x 8px)

---

## 4. UI Elements

### 4.1 Buttons
- **Primary Action (Accent-based)**:
  - Styling: `bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-sm transition-all duration-200`
- **Secondary (Slate-based)**:
  - Styling: `bg-slate-900 hover:bg-slate-800 text-white rounded-md transition-all duration-200`
- **Ghost Outline**:
  - Styling: `border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md`

### 4.2 Cards
- Cards must use a clean, floating aesthetic:
  - Base: `bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden`
  - Header: Optional colored top-strip or icon badge.
  - Body: Padded with `p-6`.

### 4.3 Navigations
- **Top Header Navbar**: Glassmorphism look using backdrop-filter.
  - Base: `sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/60 z-50`
- **Dashboard Side Navigation**: Sidebar with slate navigation links.
  - Active: Accent indicator line or active HSL color highlights.
  - Inactive: Slate color with hover translations.
