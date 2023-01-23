import * as dotenv from 'dotenv';
import { INITIAL_STATE, log } from 'config';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import cors from 'cors'

// Env stuff...
dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT;

// tRPC: Initialize
const t = initTRPC.create()

// tRPC(and now Express app's): Handlers
const getInitialState = t.procedure.query(() => {
    log(`received from config: ${INITIAL_STATE}`);
    return INITIAL_STATE
})

// tRPC(and now Express app's): Main Router

const appRouter = t.router({
    getInitialState
})

// tRPC: Export the type, as this is heart of the tRPC system
export type AppRouter = typeof appRouter

// Express: Your usual server-side set-up code

const app = express()

// Express: Middlewares
// Express: CORS
app.use(cors())

// Express: Let's intercept!
app.use((req, _res, next) => {
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query);
    next();
});

// Express + tRPC: Let tRPC handle the routes starting with `/trpc`
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter
    }),
);

// Express: Listen!
app.listen(SERVER_PORT, () => console.log(`Server has started on port ${SERVER_PORT}`));
