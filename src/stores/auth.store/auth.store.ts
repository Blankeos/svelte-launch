import { trpcClient } from '@/lib/trpc-client';
import { writable } from 'svelte/store';

type AuthStoreValue = {
  user: { id: string; username: string } | null;
  loading: boolean;
};

export const authStore = writable<AuthStoreValue>({
  user: null,
  loading: true,
});

export function hydrateAuthStore(user: { id: string; username: string } | null) {
  authStore.update((value) => {
    value.loading = !!user || false;
    value.user = user ?? null;

    return value;
  });
}

export async function login(username: string, password: string) {
  const result = await trpcClient.login.mutate({
    username: username,
    password: password,
  });

  if (result.user) {
    authStore.update((value) => {
      value.user = result.user;
      return value;
    });

    return result.user;
  }

  return null;
}

export async function logout() {
  const result = await trpcClient.logout.query();
  if (result.success) {
    authStore.update((value) => {
      value.user = null;
      return value;
    });
    return { success: true };
  }

  return { success: false };
}

export async function register(username: string, password: string) {
  const result = await trpcClient.register.mutate({
    username: username,
    password: password,
  });

  if (result.user) {
    authStore.update((value) => {
      value.user = result.user;
      return value;
    });
    return result.user;
  }

  return null;
}
