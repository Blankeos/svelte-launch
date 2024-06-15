<script lang="ts">
  import { trpcClient } from '@/lib/trpc-client';
  import { onMount, type Snippet } from 'svelte';
  import { authStore } from '.';

  // Gets the current user at the start of the app.
  onMount(async () => {
    if ($authStore.user) {
      // If already hydrated, don't refetch the current user..
      $authStore.loading = false;
      return;
    }

    $authStore.loading = true;

    const result = await trpcClient.currentUser.query();

    if (result.user) {
      // Found user.
      $authStore = {
        loading: false,
        user: result.user,
      };
      return;
    }

    // No user found.
    $authStore = {
      loading: false,
      user: null,
    };
  });

  const { children } = $props<{ children: Snippet }>();
</script>

{@render children()}
