# SIMAS-FE — Project Structure Analysis for Architecture Improvement

## Project Overview

**SIMAS** (Sistem Informasi Manajemen Masjid) is a mosque management web application. Built with React 18 + TypeScript + Vite 8 + Tailwind CSS v4 + shadcn/ui.

- **State**: Early-to-mid development. Most features use mock data.
- **Current health**: ~5.4/10 — solid foundation but not production-ready.
- **Testing**: Vitest setup with 33 tests across 4 files (rbac, formatRupiah, cn, validate).
- **No real API integration yet** in most features (only auth, users, and articles have API hooks).

---

## Current Architecture Pattern: Pure Feature-Sliced

All pages live in self-contained feature modules under `src/`, each with `pages/`, `components/`, `hooks/`, and `types/` subdirectories:

```
src/activities/          # Mosque activities + Friday prayer schedule (2 pages, components, hooks, types)
src/articles/            # Admin article CRUD + public article pages (3 pages, 2 components, hooks, types)
src/audit-log/           # Audit log viewer (1 page, components, hooks, types)
src/campaigns/           # Donation campaigns (4 pages, 7 components, hooks, types)
src/cash/                # Cash management (1 page, components, hooks, types)
src/congregation/        # Congregation/jamaah management (1 page, 3 components, hooks, types)
src/congregation-detail/ # Single congregation detail (1 page, 8 components + skeleton/empty/error states)
src/congregation-import/ # Excel import for congregations (1 page, 7 components + services/)
src/dashboard/           # Admin dashboard (1 page, components, hooks, types)
src/donations/           # Donation incoming + verification (2 pages, components, hooks, types)
src/events/              # Event detail + public event list (2 pages, 8 components, hooks, utils/)
src/gallery/             # Admin + public gallery (2 pages, 7 components, hooks, types)
src/home/                # Public landing page (1 page, components, hooks, types)
src/inventory/           # Inventory CRUD (3 pages, components, hooks, types)
src/inventoryLoans/      # Inventory loan management (1 page, 3 components)
src/mosque-profile/      # Mosque profile settings (1 page, components, hooks, types)
src/mustahik/            # ZIS recipient management (1 page, 6 components)
src/prayer/              # Prayer schedule config + public prayer times (2 pages, components, hooks, types)
src/publicDonation/      # Public donation flow (4 inline page components)
src/reports/             # Reports page (1 page, components, hooks, types)
src/user-management/     # User management (1 page, components, hooks, types)
src/user-profile/        # User profile page (1 page, components, hooks, types)
src/zis/                 # ZIS management + distribution (2 pages, components, hooks, types)
```

---

## Directory Map

```
src/
├── App.tsx                          # Router with lazy-loaded routes
├── main.tsx                         # Entry point
├── index.css                        # 878 lines: Tailwind + custom component classes
├── activities/                      # Feature module
├── articles/                        # Feature module
├── audit-log/                       # Feature module
├── campaigns/                       # Feature module
├── cash/                            # Feature module
├── congregation/                    # Feature module
├── congregation-detail/             # Feature module
├── congregation-import/             # Feature module
├── dashboard/                       # Feature module
├── donations/                       # Feature module
├── events/                          # Feature module
├── gallery/                         # Feature module
├── home/                            # Feature module
├── inventory/                       # Feature module
├── inventoryLoans/                  # Feature module
├── mosque-profile/                  # Feature module
├── mustahik/                        # Feature module
├── prayer/                          # Feature module
├── publicDonation/                  # Feature module
├── reports/                         # Feature module
├── user-management/                 # Feature module
├── user-profile/                    # Feature module
├── zis/                             # Feature module
├── lib/                             # Core utilities (6 files)
│   ├── axios.ts                     # Axios instance + auth interceptor + 401 handler
│   ├── mask.ts                      # NIK masking utility
│   ├── rbac.ts                      # canAccess(role, resource) — 6 roles
│   ├── Seo.tsx                      # Helmet SEO component
│   ├── utils.ts                     # cn() (clsx + tailwind-merge)
│   └── validate.ts                  # Form validation helpers
├── stores/
│   └── useAuthStore.ts              # Zustand: auth state + sessionStorage persistence
├── test/                            # 4 test files, 33 tests
├── auth/                            # Feature module: login page + types
├── components/                      # Shared components
│   ├── ui/                          # 17 shadcn/ui primitives
│   ├── states/                      # EmptyState, ErrorState, PageSkeleton, TableSkeleton
│   ├── error/                       # AppErrorBoundary
│   ├── feedback/                    # ConfirmDialog
│   ├── providers/                   # AppProviders (React Query + Router + ErrorBoundary)
│   ├── DataTable.tsx                # Generic table with search/sort/pagination/CSV
│   ├── ProtectedRoute.tsx           # Auth + RBAC route guard
│   ├── ErrorBoundary.tsx            # Class-based error boundary
│   ├── NotificationBell.tsx         # SSE-based notification dropdown
│   └── kegiatan/, donation/, login/, articles/, userManage/  # Domain-specific shared components
├── layouts/
│   ├── AdminLayout.tsx              # Sidebar + topbar + RBAC-filtered menu
│   ├── AuthLayout.tsx               # Login page wrapper
│   └── PublicLayout.tsx             # Nav + footer wrapper
├── hooks/useUsers.ts               # Shared React Query hooks for user CRUD
├── types/                           # Shared types (adminUser, donation, event, kegiatan)
├── utils/formatRupiah.tsx
├── pages/error/                     # ErrorPage.tsx (3 error pages: 403, 404, 500)
└── data/                            # Mock seed data (dashboardData, donationSeed, etc.)
```

---

## Current Architecture Strengths

1. **Pure feature-sliced modules** — 27 feature modules, consistent `pages/`/`components/`/`hooks/`/`types/` structure
2. **No hybrid architecture** — all pages migrated from flat `src/pages/` to feature modules
2. **RBAC built-in** — route + UI-level permission checks with `canAccess()`
3. **Lazy loading** — all pages use `React.lazy()` + `Suspense`
4. **React Query** — TanStack Query ready for server state
5. **Zustand** — lightweight client state for auth
6. **shadcn/ui** — accessible, consistent UI primitives
7. **Validation utility** — reusable `validateForm()` pattern
8. **Error boundary** — both class-based (`ErrorBoundary`) and provider-level (`AppErrorBoundary`)
9. **SEO** — reusable `Seo` component with OG/Twitter cards

---

## Current Architecture Weaknesses & Pain Points

### Critical Issues

| Issue | Detail |
|-------|--------|
| **100% mock data** | All features use hardcoded `useState` data. Only auth, users, and articles have real API hooks. No backend integration. |
| **No API service layer** | API calls done directly in React Query hooks or inline. No service abstraction, no retry logic, no request cancellation. |
| **Monolithic pages** | `AdminCampaignManagementPage.tsx` (610 lines), `AuditLogPage.tsx` (610 lines), `index.css` (878 lines) |
| ~~**Mixed architecture**~~ | ✅ Resolved — all pages migrated to feature-sliced modules |
| **No error monitoring** | No Sentry or error tracking. SSE errors just log to console. |
| **JWT in sessionStorage** | Vulnerable to XSS. Should use httpOnly cookies. |

### Medium Issues

| Issue | Detail |
|-------|--------|
| **No loading/error/empty states** in most legacy pages | Only 3 feature modules have proper skeleton/error/empty components. Dashboard, ManajemenKas, DonasiMasuk, etc. have nothing. |
| **Duplicate route paths** | `/admin/jamaah` and `/admin/congregation` both render same component. `/admin/zis` and `/admin/zis/distribusi` overlap. |
| **SSE hardcoded to localhost:5000** | `NotificationBell.tsx` connects to `localhost:5000` directly — will fail in production. |
| **Inconsistent naming** | `jamaah` vs `congregation` for same concept (Events/ → events/ ✅ fixed) |
| **Dead code removed** | (already cleaned: 4 files + 2 stores deleted) |
| **No code splitting for admin routes** | Lazy loading exists at page level but no admin sub-route splitting. |

### Low Issues

| Issue | Detail |
|-------|--------|
| **Console logs** (removed from main.tsx and CongregationFormDialog) | ✅ Already cleaned |
| **Role type unification** (rbac.ts is now single source of truth) | ✅ Already done |
| **Form validation gaps** (ZisManagement, CongregationFormDialog, DonationForm) | ✅ Already fixed |
| **index.css too large** | 878 lines of `@layer components` classes that could be Tailwind utilities or extracted CSS |
| **No dark mode** | Theme store was removed (was unused). No dark mode implementation. |
| **`src/skeleton/` promoted to `src/components/`** | ✅ Consolidated — states/, error/, feedback/, providers/ now live under `src/components/`. Dead `canAccess.ts` removed. `mask.ts` moved to `src/lib/mask.ts`. |

---

## Key Architectural Decisions Needed

### 1. API Integration Strategy
Currently only `useUsers.ts` and `useArticles.ts` use React Query with real API calls. Every other feature uses `useState` with mock data.

**Decision needed**:
- Create a standardized API service layer (one `src/services/` per feature or one per resource)?
- Define API response envelope types globally?
- Add retry, cancellation, and error normalization in Axios instance?

### 2. Feature Module Migration
✅ **Completed** — All pages migrated from `src/pages/admin/`, `src/pages/public/`, and `src/pages/auth/` into feature-sliced modules. 27 total feature modules. `src/pages/` only contains `error/ErrorPage.tsx`.

**Remaining consideration**:
- Create `src/features/` umbrella for all feature modules?
- Standardize what goes in a feature module (always include services/?)?

### 3. State Management Architecture
Currently: Zustand (auth) + React Query (server state) + useState (everything else mock).

**Decision needed**:
- Add Zustand stores for UI state (sidebar, modals)?
- Per-feature Zustand slices for local feature state?
- React Query for all server data (yes, but needs structured hooks)?

### 4. Shared Components Organization
✅ **Completed** — `src/skeleton/` consolidated into `src/components/` (states/, error/, feedback/, providers/). `mask.ts` moved to `src/lib/mask.ts`. Dead `canAccess.ts` removed.

### 5. Routing Architecture
Current: Single `App.tsx` with all routes.

**Decision needed**:
- Extract admin routes to a separate `AdminRoutes.tsx`?
- Add nested route layouts?
- Handle 403/404/500 at router level vs component level?

### 6. Testing Strategy
Current: 4 test files (33 tests) for utilities only. Zero component tests.

**Decision needed**:
- Add component tests for DataTable, ProtectedRoute, ErrorBoundary?
- Add integration tests for auth flow?
- E2E tests (Cypress/Playwright)?

---

## Technology Stack (for reference)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI library |
| TypeScript | ~6.0.2 | Type safety |
| Vite | ^8.0.10 | Build tool |
| Tailwind CSS | ^4.2.4 | Styling |
| shadcn/ui | Radix Nova + Radix UI | Component primitives |
| TanStack React Query | ^5.100.7 | Server state |
| Zustand | ^5.0.12 | Client state |
| Axios | ^1.15.2 | HTTP client |
| React Router | ^6.30.3 | Routing |
| React Helmet Async | ^3.0.0 | SEO |
| Sonner | ^2.0.7 | Toast notifications |
| Lucide React | ^1.17.0 | Icons |
| Recharts | ^3.8.1 | Charts |
| Vitest | ^4.1.7 | Testing |
| Testing Library | React + jest-dom | Component tests |
| jsdom | ^29.1.1 | DOM environment |

---

## Current API Contract (for backend discussion)

The frontend expects:
- **Auth**: `POST /api/auth/login`, `POST /api/auth/register` — returns `{ success, data: { token, user } }`
- **Users**: `GET/POST/PUT/DELETE /api/users/:id` — CRUD for admin users
- **Articles**: `GET/POST/PUT/DELETE /api/articles/:id` — CRUD for articles
- **Rate limiting**: HTTP 429 handled via `isRateLimited()` helper
- **401 handling**: Auto-logout via Axios response interceptor
- **Token**: Sent as `Authorization: Bearer <token>` header

Other features (campaigns, congregation, donations, gallery, mustahik, inventory, events, etc.) have **no API integration yet** — their endpoints need to be defined.

---

## What Needs Architectural Attention Most

1. **API service layer standardization** — single pattern for all API calls
2. **Feature module migration** — convert remaining flat pages to feature-sliced modules
3. **Loading/error/empty state pattern** — enforce across all pages
4. **Component library consolidation** — merge `src/skeleton/` into `src/components/`
5. **Type consistency** — all API types co-located or in `src/types/`?
6. **Route organization** — split `App.tsx` into separate route files
7. **Testing infrastructure** — component test patterns, mocks, fixtures
