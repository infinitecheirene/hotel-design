This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Admin area & Laravel API integration

This project includes a simple admin interface under `/admin` used to manage Rooms, Bookings and Users.

How it works:

- The admin UI is under `app/admin` with client components in `components/admin/`.
- API calls are performed by the small axios client at `lib/api.ts` and helper functions in `lib/adminService.ts`.
- During development you'll need to point the client at your Laravel backend using the environment variable `NEXT_PUBLIC_API_BASE`.

Example (in `.env.local`):

```env
# URL of your Laravel backend (omit trailing slash)
NEXT_PUBLIC_API_BASE=https://your-laravel-backend.test/api
```

Endpoints expected by the admin client (Laravel side):

- POST /admin/login -> returns { token }
- GET /admin/dashboard -> returns { rooms, bookings, users }
- GET /admin/bookings -> returns list of bookings
- GET /admin/rooms -> returns list of rooms
- GET /admin/users -> returns list of users

Notes:

- The admin client stores the token at `localStorage.admin_token` and sets the Authorization header for subsequent admin requests.
- The project includes a middleware placeholder where you can add server-side JWT validation for admin API requests; for production you should implement proper JWT decoding & role checks.

