# Authentication System

This project provides role‑based authentication using Auth.js, Prisma, and Neon (PostgreSQL) in a Next.js codebase with an existing working schema. The goal is to organize the `src` folder structure, integrate Auth.js (including Google OAuth), and ensure proper redirection to User and Admin dashboards.

## Getting Started

1. **Fork & Clone**

   ```bash
   git fork https://github.com/Foldinc/builderweb.git
   git clone https://github.com/<your-username>/builderweb.git
   cd builderweb
   ```
2. **Install Dependencies**

   ```bash
   npm install
   # or, if needed:
   npm install --force
   ```
3. **Environment Variables**

   * Copy `.env.example` to `.env`
   * Set the following:

     * `DATABASE_URL` for Neon
     * `NEXTAUTH_SECRET`
     * `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
4. **Run Locally**

   ```bash
   npm run dev
   ```

> **Note:** Use `git pull upstream main` to sync with the main repo. Create feature branches, push to your fork, and open a Pull Request (PR) before merging.

---

## Overview

* **Tech Stack:** Next.js App Router, Auth.js, Prisma, Neon
* **Auth Providers:** Email/Password & Google OAuth
* **Roles:** `User`, `Admin` (managed via the existing `role` field in the `User` schema)
* **Existing Code:** Prisma schema and database migrations are in place—no schema changes required.
* **Routing & API:** Utilize Next.js built‑in App Router and server actions; no separate REST endpoints needed.

## Folder Structure

```plaintext
src
  ├─ auth
  │    ├─ sign-in/page.tsx     # Sign-in page
  │    └─ sign-up/page.tsx     # Sign-up page
  ├─ app
       dashboard
  │    ├─ user/page.tsx        # User dashboard interface
  │    └─ admin/page.tsx       # Admin dashboard interface
  ├─ layout.tsx               # Root layout with SessionProvider
  ├─ middleware.ts            # Redirect logic based on role
  └─ lib
       ├─ auth.ts             # Auth.js configuration (providers, callbacks, session)
       └─ prisma.ts           # Prisma client instance
```

## Responsibilities

### Intern A: Folder Setup & Auth Integration

1. **Folder Structure**

   * Create and verify the above folders under `src`.
2. **Auth.js Configuration (`src/lib/auth.ts`)**

   * Configure NextAuth:

     * Add Google provider and Credentials provider.
     * Implement session callback to include the `role` field.
3. **Middleware (`src/middleware.ts`)**

   * Redirect unauthenticated requests to `/auth/sign-in`.
   * Redirect authenticated users based on `role`:

     * `/dashboard/admin` if `role === 'Admin'`
     * `/dashboard/user` if `role === 'User'`

### Intern B: Dashboard Pages & UI

1. **User Dashboard (`src/dashboard/user/page.tsx`)**

   * Show welcome message and user details (email, createdAt).
2. **Admin Dashboard (`src/dashboard/admin/page.tsx`)**

   * Fetch and list all users via Prisma (email and role).
   * Provide a “Promote to Admin” button for each `User`.
3. **Role Promotion Action**

   * Use Next.js server actions or server components to update the `role` field in the database.
4. **UI/UX**

   * Basic styling, form validation, and success/error notifications.

## Workflow & Git Practices

* **Upstream Sync:**

  ```bash
  git remote add upstream https://github.com/Foldinc/builderweb.git
  git pull upstream main
  ```
* **Feature Branches:**

  ```bash
  git checkout -b feature/auth-setup
  ```
* **Commit & Push:**

  ```bash
  git push origin feature/auth-setup
  ```
* **Pull Requests:** Open a PR against `main`, assign reviewers, and incorporate feedback before merging.

## Timeline

| Phase            | Timeline |
| ---------------- | -------- |
| Kickoff & Setup  | Day 1    |
| Implementation   | Days 2–4 |
| Testing & Buffer | Day 5    |
| Review & Handoff | Day 6    |

**Deadline:** Complete all tasks within **6 days** of assignment start.

## Deliverables

* Forked GitHub repo with feature branches under version control.
* Updated Next.js code in `src` with the required structure.
* Auth.js integration supporting Google OAuth and Credentials.
* Middleware redirections based on `role`.
* Functional User and Admin dashboards with role promotion.
* README documenting setup, workflow, and usage.

---

Reach out if you encounter any blockers or need clarification.
