import type { RequestEvent } from '@sveltejs/kit';
import type { Session, User } from 'lucia';

export const createContext = async (event: RequestEvent) => {
  return {
    /** API Event from SolidStart */
    event: event,

    // The following will be set by the middlewares. 
    user: null as User | null,
    session: null as Session | null
  };
};
