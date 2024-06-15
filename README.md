## 🧡 Svelte Launch

> An sophisticated boiler-plate built for **simplicity**.

![Image](https://assets.solidjs.com/banner?type=Starter%20Kit&background=tiles&project=Solid%20Launch)

[Carlo](https://carlo.vercel.app/)'s starter for making a SvelteKit app with batteries included on stuff I like after experimenting for years.

This is handcrafted from my own research. This might not work for you, but it works for me. 🤓

### Benefits

- [x] 🐭 **Simple and minimal** - SvelteKit is the best JS framework for simplicty and getting the job done. Hands-down.
- [x] ⚡️ **Super-fast dev server** - way faster than NextJS thanks to Vite. You need to feel it to believe it! It can also literally build your app in seconds.
- [x] ☁️ **Selfhost-ready** - Crafted with simple hosting in mind that'll still probably scale to millions. Just spin up Docker container on a good'ol VPS without locking into serverless. DHH and Shayan influenced me on this. You can still host it on serverless tho. I think? lol
- [x] **🔋 Batteries-included** - took care of the hard stuff for you. A well-thought-out folder structure from years of making projects: a design system, components, utilities, hooks, constants, an adequate backend DDD-inspired sliced architecture that isn't overkill, dockerizing your app, and most importantly---perfectly-crafted those pesky config files.

### Tech Stack

- [x] **Bun** - Runtime and package manager. You can always switch to Node and PNPM if you wish.
- [x] **Svelte** - Frontend framework that I like. Pretty underrated, but awesome!
- [x] **SvelteKit** - Like NextJS, but for Svelte and Vite! Simpler and Faster!
- [x] **tRPC** - E2E typesafety without context switching. Just amazing DevX.
- [x] **Tailwind** - Styling the web has been pretty pleasant with it. I even use it on React Native for work. It's amazing.
- [x] **Prisma** - Great _migrations_ workflow, but I want to maximize perf.
- [x] **Kysely** - Great typesafe _query builder_ for SQL, minimally wraps around db connection.
- [x] **SQLite/LibSQL (Turso)** - Cheapest database, easy to use.
- [x] **Lucia** - Makes self-rolling auth easy.
- [ ] **SES or MimePost** - Emails
- [ ] **Backblaze** - Cheap blob object storage with an S3-compatible API.
- [ ] **Stripe, Payrex, or Xendit** - Accept payments.

> You can also easily swap the database if you want.
>
> - [ ] **Postgres** - powerful relational DB. (TBD)
> - [ ] **CockroachDB** - serverless database. (TBD)
> - [ ] **MongoDB** - cheap easy to use database. (TBD)

### QuickStart

I'll assume you don't want to change anything with this setup after cloning so let's get to work!

1. Copy the environment variables

   ```sh
   cp .env.example .env
   ```

2. Replace the `<absolute_url>` in the local database with:

   ```sh
   pwd # If it outputs: /User/Projects/svelte-launch

   # Replace the .env with:
   DATABASE_URL="file:/User/Projects/svelte-launch/local.db"
   ```

3. Generate

   ```sh
   bun db:generate # generates Kysely and Prisma client types.
   bun db:migrate # migrates your database.
   ```

4. Install deps and run dev

   ```sh
   bun install
   bun dev
   ```

### Useful Development Tips

I took care of the painstaking parts to help you develop easily on a SPA + SSR + backend paradigm. You can take take these practices to different projects as well.

1. Make use of the `code-snippets` I added. It'll help!
2. Check all typescript errors (`Cmd` + `Shift` + `B` > `tsc:watch tsconfig.json`).
3. Authentication Practices - I have these out-of-the-box for you so you won't have to build it.
   - Getting Current User `const { user } = useAuthContext()`
   - Login, Logout, Register `const { register, login, logout } = useAuthContext()`
   - Hydrating Current User `+data` + `initTRPCSSRClient`.
   - Protecting Routes (Client-Side) `<ProtectedRoute />`
   - Protecting Routes (SSR) `+guard`
4. Dataloading Practices - Also have these out-of-the-box for most usecases since they're tricky to do if you're clueless:
   - Tanstack Query (Client-only) - Use `trpc-client.ts`
   - Hydrated Tanstack Query (SSR) - Use `create-dehydrated-state.ts` + `trpc-ssr-client.ts`

### Backend Architecture

My backend architecture is inspired by DDD where I separate in layers, but I keep it pragmatic by not going too overkill with Entities, Domains, and Aggregates. I personally still like the anemic data-driven architecture for most of my apps since the
apps I make aren't too business-logic-heavy.

```sh
.
└── server/ # - root
    ├── dao/ # - data-access-objects
    │   └── *.dao.ts
    ├── modules/
    │   └── <module>/
    │       ├── services/
    │       │   └── *.service.ts # 1 service usecase
    │       └── <module>.controller.ts
    └── _app.ts # - root TRPC router.
```

- **`dao`** - abstracted away all queries here to interface with them as plain functions. It actually helps me mentally collocate db queries from service logic when I'm using them inside the service.
- **`modules`** - a vertical slice of each module-group. This just depends on how I feel about grouping them. You get better overtime.
- **`<module>.controller.ts`** - pretty much a group of http endpoints. I can put the DTOs/Validations for each endpoint here without context-switching.
- **`services`** - these are even smaller pieces of logic that can be used inside each endpoint. It's not necessary to use if the app isn't too big, but it helps.
- **`_app.ts`** - The root trpc router where the `AppRouter` type is exported.

### Deployment

> [!WARNING]
>
> Still in progress

Here are some guides on how to deploy.

- [ ] Kamal (self-host VPS - I recommend)
- [ ] Dokku (self-host VPS)
- [ ] Caprover (self-host VPS)
- [ ] Cloudflare (serverless + static)
- [ ] Vercel (serverless + static)
- [ ] Netlify (static)

### Future Plans

> I'll probably make a swapping guide soon. To replace to these:
>
> - Runtime: Bun -> Node
> - Package Manager: Bun -> PNPM
> - ORM: Prisma -> Drizzle
> - Database: SQLite -> PostgreSQL, CockroachDB, MongoDB

<!-- # create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment. -->
