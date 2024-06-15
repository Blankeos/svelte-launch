import { appRouter } from '@/server/_app.js';
import { createContext } from '@/server/context.js';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler: RequestHandler = (event: RequestEvent) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: event.request,
    router: appRouter,
    createContext: () => createContext(event),
  });

export { handler as GET, handler as POST };
