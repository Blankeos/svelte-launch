<script>
  import { authStore } from '@/stores/auth.store';
  let innerHeight = $state(0);
  let innerWidth = $state(0);
</script>

<svelte:window bind:innerHeight bind:innerWidth />
<div class="flex flex-col gap-y-4">
  Dashboard: {$authStore.user?.username}
  <div>
    Window Size: {innerWidth} x {innerHeight}
  </div>
</div>
