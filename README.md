# Simple Blogging Engine

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It was built as part of a frontend interview exercise to demonstrate how I approach real-world development tasks.

## What is this?

A simple blogging engine that allows users to:

- Display a list of existing articles
- View individual articles written in markdown
- Write new articles
- Write comments to existing articles
- Vote on article comments like on reddit

## Tech Stack

- React + Next.js (App router)
- TypeScript

- Styling:

  - TailwindCSS

- State Management:

  - Redux Toolkit

- Authentication:

  - Next-Auth

- API Handling:

  - RTK-Query

- Forms:

  - React-hook-form
  - Zod

  - Markdown support:
    - MDXEditor

- Testing:

  - Jest
  - React-Testing-Library
  - Playwright

- Tooling:
  - ESLint
  - Prettier?

## Getting started

1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Open [http://localhost:3000](localhost:3000) to view the app.

## What is done

- Login page containing a login form for credentials authentication via NextAuth
- Create article page with a form to create new articles (currently working without image, via redux-toolkit-queries)
- My articles page with a simple table of articles available to the logged in tenant

## Next Steps

- Write unit tests for zod validation of the custom image field. Use react-testing-library
- Handle errors with an error boundary.
- Make navigation header responsive (i.e. hide a dropdown behind a hamburger menu on mobile)
- Split article creation into two queries, one for article, one for its image (probably the image first, to get it's imageId to then add to the article creation request?)
- Add more plugins for MDXEditor
- Implement the rest of the features, starting with the protected ones (article editation, deletion), continue with the public ones
- Write UI tests for components with Storybook
- Write end to end tests with Playwright
- Unify page styling to have consistent headers and extract a page component to group repeated tailwind classes
- Add proper loading according to [https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming](NextJS docs) and connect it with Next-Auth session loading status?
