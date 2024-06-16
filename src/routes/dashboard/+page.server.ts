import { initTRPCSSRClient } from '@/lib/trpc-ssr-client.js';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
  const trpcClient = initTRPCSSRClient(event.request.headers, event.setHeaders);

  const result = await trpcClient.currentUser.query();

  return {
    user: result.user ?? null,
  };
}
