# League Lens

This is a simple application to browse sports leagues.

## Table of Contents

- How to Run the App
- Component Architecture
- Main Dependencies
- AI Usage
- Future Considerations

## How to Run the App

Here are the steps to get the application running locally:

- **Install Dependencies:**

  ```bash
  npm install
  ```

- **Run in Development Mode:**

  ```bash
  npm run dev
  ```

  The app will be available at http://localhost:3000/

- **Build for Production:**

  ```bash
  npm run build
  ```

  This will create a production build in the `dist` folder.

- **Preview production build:**

  ```bash
  npm run preview
  ```

- **Run Tests:**
  ```bash
  npm run test
  ```

## Component Architecture

The application follows a component-based architecture, organized primarily within the `src/League` directory for core features and `src/components` for reusable UI elements.

Key components include:

- **`LeagueList`**: Displays a list of leagues, incorporating search and sport filtering. It utilizes `SearchInput`, `SportFilter`, and renders a list of `LeagueCard` components.
- **`LeagueDetails`**: Shows details for a specific league, including its badge and a list of seasons. It uses `SeasonCard` to display individual seasons.
- **`LeagueCard`**: A reusable component displaying a single league item in the `LeagueList`. Memoized for performance to prevent unnecessary re-renders, as many instances of this component are typically displayed.
- **`SeasonCard`**: A reusable component displaying a single season item in the `LeagueDetails`. Memoized for performance to prevent unnecessary re-renders, especially when viewing a league with many seasons.
- **`SearchInput`**: A generic input component with debounce functionality. Manages its own state, preventing rerender of parent component while user is typing in the search query.
- **`SportFilter`**: A dropdown component for filtering leagues by sport.

- **Image Loading Optimization**: Images which are out of viewport are loaded lazily. Loading animation is shown while images are loading.

Data fetching logic is separated into custom hooks (e.g., `useLeaguesQuery`, `useLeagueBadgeQuery`) using `@tanstack/react-query`.

## Main Dependencies

Key libraries and frameworks used in this project:

- `react` & `react-dom`:
  - **Component-Based**: Enables building complex UIs from small, isolated, and reusable pieces.
  - **Predictable Data Flow**: Unidirectional data flow makes it easier to understand and manage how data changes impact the application.
  - **Declarative Syntax**: Makes code more predictable and easier to debug by describing the desired UI state.
  - **Virtual DOM**: Improves performance by minimizing direct manipulation of the browser's DOM.
- `react-router`: Standard library for routing in React.
  - **Client-Side Routing**: Enables navigation without full page reloads for a faster UX.
  - **Declarative Routing**: Provides an intuitive way to manage navigation within React.
- `@tanstack/react-query`: Hooks for fetching, caching and updating asynchronous data in React.
  - Provides a declarative way to handle data, reducing clutter in components.
  - Improves performance through efficient caching and background updates.
- `axios`: A promise-based HTTP client.
  - It was chosen as an established library for quick start, compared to writing a warpper for `fetch`.
- `tailwindcss`: Used for CSS utility classes.
  - Could have used other libraries like `bootstrap`.
- `@headlessui/react`: unstyled and accessible UI component library.
  - Integrates well with Tailwind CSS.
  - It avoids CSS-in-JS for potentially better runtime performance.
  - Provides renderless components for flexibility.
- `@heroicons/react`: A set of free, MIT-licensed SVG icons.
- `jest`: Test runner and framework for react.
- `@testing-library/react`: Simple and complete React DOM testing utilities.
  - Focuses on testing component behavior from a user's perspective (querying the DOM).
  - Encourages more robust tests that are less likely to break due to refactoring, unlike Enzyme which often tests implementation details.
- `typescript`: A typed superset of JavaScript.
  - Adds static typing to JavaScript for improved code quality and maintainability.
  - Helps prevent trivial bugs by catching type-related errors during development.
  - Compiles to plain JavaScript.
- `vite`: A next generation frontend tooling.
  - **Quick Setup**: Offers templates for various frameworks, making it fast to get started.
  - **Rapid Development Server**: Supports Hot Module Replacement (HMR).
  - **Optimized Build**: Uses Rollup for a highly optimized production build.
  - **Extensible**: Highly configurable via plugins to support various frameworks and tools.

## AI Usage

This application was developed with assistance from a large language model AI (chatGPT), which contributed to various aspects of the project:

- **Initial Setup**: Helped establish the basic project structure and integrate core libraries, wrote the wrapper on axios.
- **UI/UX Refinements**: Suggested and implemented improvements to component styling and layout.
- **Testing**: Used for setting up the Jest testing environment, configuring TypeScript for tests, writing unit tests for `LeagueList`, and troubleshooting complex testing issues related to the DOM environment and mocking React Router hooks.
- **Code Quality**: Assisted in refactoring code, such as centralizing type definitions for better organization and maintainability.

## Future Considerations

Here are some potential future enhancements for the application:

- **Virtualization**: Implement list virtualization for large lists (e.g., in `LeagueList` or `LeagueDetails` seasons list) using libraries like `@tanstack/react-virtual` to render only visible items, significantly improving performance with large datasets.
- **State Management with Zustand**: Introduce a state management library like `zustand` for handling global client state. While `react-query` handles server state, `zustand` can simplify managing UI state that needs to be accessed by multiple components, avoiding prop drilling and making state changes more predictable.
