# BaseNine (frontend)

A baseball site built around the Korean league — teams, players, fixtures and results, a standings table calculated from finished games, and a small shop.

This is only the React side. The Express/MongoDB API it talks to lives in a separate repo: [abdulazizbay/basenine](https://github.com/abdulazizbay/basenine).

The API needs to be running for the frontend to work.

I built this while studying, so the structure follows the patterns from the course projects fairly closely: a service class per resource, context + hook pairs for shared state, and screens that own their feature-specific data fetching.

## Tech stack

* React 19 + TypeScript
* Vite
* Tailwind CSS 4
* React Router 7
* Axios
* Sonner

## Running it

```bash
npm install
npm run dev
```

Create a `.env` file with the API address:

```env
VITE_API_URL=http://localhost:3002
```

That's the only environment variable needed.

Start the API first. Without it, requests will fail and the frontend will show error toasts instead of content.

Other scripts:

```bash
npm run build
npm run lint
npm run preview
```

`npm run build` typechecks the project and then creates the production build.

## What's in it

* **Teams** — browse, search, sort, follow a team, and see its squad, fixtures and recent results
* **Players** — list with filters, player details, and a position diagram
* **Games** — filter by status, team, venue or date range; finished games show the score
* **Standings** — league table calculated from finished games
* **Shop** — products, cart, checkout and order history
* **My Page** — profile settings, recently viewed teams and subscribed teams

Authentication uses a JWT stored in a cookie. The login/signup modal is global, so protected actions can call `openLogin()` when a user needs to sign in.

## Screenshots

Coming soon.

## Layout

```text
src/
  app/
    components/    UI primitives, header/footer, shared cards
    context/       AuthContext, AuthModalContext, CartContext
    hooks/         useAuth, useCart, useAuthModal, useClickOutside
    screens/       one folder per page
    services/      API service classes, one per resource

  lib/
    types/         shared interfaces
    enums/         mirrors of the backend enums
    data/          static lookup data
    utils/         small helpers
```

A few conventions worth knowing if you're looking around the code:

* Screens own feature-specific data fetching; grid and card components focus on rendering. For example, `Teams.tsx` fetches the teams while `TeamsGrid.tsx` receives them as props.
* Paginated API responses use `{ list, metaCounter }`. Pages get the total from `metaCounter[0]?.total`. Standings is the exception because the league table is returned as a plain array.
* Errors go through `getErrorMessage()` so the toast can show the message returned by the API, such as `"Wrong password, please try again"`, instead of always showing a generic error.
