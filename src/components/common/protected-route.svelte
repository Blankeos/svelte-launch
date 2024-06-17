<script lang="ts">
  import { goto } from '$app/navigation';
  import { IconLoading } from '@/assets/icons';
  import { PageRoutes } from '@/constants/page-routes';
  import { authStore } from '@/stores/auth.store';
  import type { Snippet } from 'svelte';

  const {
    redirect,
    fallback = PageRoutes.SignIn,
    children,
  } = $props<{
    /** Redirect when authenticated. */
    redirect?: string;
    /** Fallback when not authed. @defaultValue /sign-in */
    fallback?: string;
    children: Snippet;
  }>();

  let showProtector = $state(!$authStore.user);

  $effect(() => {
    if ($authStore.loading) {
      // Still fetching. Don't do anything.
      return;
    }

    console.log('Not loading anymore', $authStore.loading);

    // Stopped fetching. User Exists.
    if ($authStore.user && !$authStore.loading) {
      // When there's a user and there's a "redirect". Go to it.
      // Usecase: Going into /login, but there's actually a user.
      if (redirect) {
        goto(redirect);
        return;
      }

      // Remove the protector.
      showProtector = false;
    }

    if (!$authStore.user && !$authStore.loading) {
      goto(fallback);

      // Remove the protector.
      showProtector = false;
    }
  });
</script>

{#if showProtector}
  <div class="fixed inset-0 flex items-center justify-center gap-x-3 bg-white">
    {#if $authStore.loading}
      <IconLoading />
      Looking for user.
    {:else if !$authStore.loading && $authStore.user}
      <IconLoading />
      User found. Redirecting...
    {:else if !$authStore.loading && !$authStore.user}
      User not found. Unauthorized.
    {/if}
  </div>
{/if}

{@render children()}
