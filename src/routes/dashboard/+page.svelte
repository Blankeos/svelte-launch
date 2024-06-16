<script>
  import ProtectedRoute from '@/components/common/protected-route.svelte';
  import { authStore, hydrateAuthStore } from '@/stores/auth.store';

  let { data } = $props();
  hydrateAuthStore(data.user);

  let innerHeight = $state(0);
  let innerWidth = $state(0);
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<ProtectedRoute>
  <div class="flex flex-col gap-y-4 p-5">
    Dashboard: {$authStore.user?.username}
    <div>
      Window Size: {innerWidth} x {innerHeight}
    </div>
  </div>
</ProtectedRoute>
