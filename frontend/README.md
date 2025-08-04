# Name of the project

Aura App.

## Description

App for users management with Next.js and TypeScript.

## Technologies Used

This project is built with the following technologies and versions:

- **[Next.js](https://nextjs.org/)** `15.4.5` – React framework for production-grade web apps with server-side rendering and static site generation.
- **[React](https://reactjs.org/)** `19.1.0` – UI library for building user interfaces with components.
- **[TypeScript](https://www.typescriptlang.org/)** `^5` – Adds static typing to JavaScript, improving code quality and developer experience.
- **[next-auth](https://next-auth.js.org/)** `^4.24.11` – Authentication solution for Next.js apps supporting multiple providers.
- **[react-hook-form](https://react-hook-form.com/)** `^7.61.1` – Simple and performant form state management.
- **[zod](https://zod.dev/)** `^4.0.14` – Type-safe schema validation.
- **[dayjs](https://day.js.org/)** `^1.11.13` – Lightweight date library.
- **[react-toastify](https://fkhadra.github.io/react-toastify/introduction)** `^11.0.5` – Easy-to-use notifications for React.
- **[classnames](https://www.npmjs.com/package/classnames)** `^2.5.1` – Utility to conditionally join classNames.
- **[react-bootstrap-icons](https://github.com/ismamz/react-bootstrap-icons)** `^1.11.6` – Bootstrap icons as React components.
- **[sass](https://sass-lang.com/)** `^1.89.2` – CSS preprocessor for styling.

## Installation and Configuration

### Prerequisites

Before running the project, make sure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
- **[npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)** – package manager
- **[Git](https://git-scm.com/)** – version control system

### Installation steps

```bash
# Clone the repo
git clone https://github.com/CarlosFonseca75/aura-challenge.git

# Navigate to the backend folder
cd aura-challenge/frontend

# Install dependencies (use npm or pnpm)
pnpm install
```

### Env variables

```bash
# Make sure to fill in the `.env` file with the correct values. You can start by copying the example file:
cp .env.example .env
```

## Uso

### How to start the app

```bash
# Start the development app (use npm or pnpm)
pnpm run dev

# To run in production mode
pnpm run build
pnpm start
```

## Technical Decisions

### Structure

```
src/
├── app/              # Main app folder, pages, and routing (Next.js specific)
├── common/           # Shared types, enums, Zod schemas, and utilities used across the app
├── components/       # Reusable React UI components divided by page and common
├── constants/        # Application-wide constants (e.g., URL's to social media)
├── styles/           # Global styles, variables and mixins (SCSS/CSS)
├── utils/            # Helper functions (date, fetcher, etc.)
```

### Additional Libraries and Why

These supporting libraries enhance developer productivity, form handling, UI, validation, and notifications:

- **classnames** – Helps conditionally combine CSS class names for dynamic styling of components.
- **react-hook-form** – Simplifies form state management and validation in React with minimal re-renders.
- **@hookform/resolvers** – Integrates validation schemas like Zod with react-hook-form easily.
- **zod** – Provides type-safe schema validation for form inputs and other data.
- **react-toastify** – Enables easy and customizable toast notifications for user feedback.
- **react-bootstrap-icons** – Provides a set of SVG icons for use throughout the UI.
- **dayjs** – Lightweight date utility for formatting and manipulating dates in the UI.

## Future Improvements

### What I would add with more time

- **More robust login logic with refresh tokens** to ensure sessions remain active securely.
- **Lightweight animations** to make the app feel more dynamic and alive without overwhelming the user.
- **Light and dark mode** support for better user personalization.
- **Lang** to support multiple languages.
- **Sidebar navigation** that’s more scalable and flexible for future sections.
- **Better loaders and skeletons** for better user experience during data fetching.
- **Two-factor authentication (2FA)** to enhance login security via SMS, email, or other methods.
- **Deeper input sanitization** in forms to protect both frontend and backend.
- **Automated testing** unit, integration, and end-to-end with cypress to ensure code quality and prevent regressions.
- **More robust state management** (e.g., Zustand or Redux Toolkit) depending on the size and complexity of the app.
- **Improved SEO and accessibility** by ensuring the app is search-engine friendly and meets accessibility standards.
- **Performance optimization** with lazy loading, code splitting, and image optimization for faster load times. (useCallback, useMemo, debounce in case of text searches, etc)
- **Lighthouse checks** to keep an eye on performance, accessibility, best practices and SEO.
