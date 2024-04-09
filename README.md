This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## Application Documentation

Application documentation uses MDX. We do not use the remote version of MDX as the non-remote version doesn't need frontmatter, we can make use of the file structure, and it integrates better with existing components.

## find out what is running on port 3000

pkill next-serv

lsof -i :3000

kill -9 pid

killall -9 next-serv // might work

npx kill-port 3000

## jest testing

https://www.chakshunyu.com/blog/how-to-mock-only-one-function-from-a-module-in-jest/
