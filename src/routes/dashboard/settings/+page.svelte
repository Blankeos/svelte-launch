<script lang="ts">
  import ProtectedRoute from '@/components/common/protected-route.svelte';
  import { authStore } from '@/stores/auth.store';
</script>

<ProtectedRoute>
  <div class="flex flex-col gap-y-4 px-8 py-8">Settings Page: {$authStore.user?.username}</div>
</ProtectedRoute>
