<script lang="ts">
  import '@/styles/app.css';
  import '@/styles/nprogress.css';

  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { Toaster } from 'svelte-sonner';

  import { AuthStoreProvider } from '@/stores/auth.store';

  const { children } = $props();

  const queryClient = new QueryClient();
</script>

<AuthStoreProvider>
  <QueryClientProvider client={queryClient}>
    {@render children()}
    <Toaster />
  </QueryClientProvider>
</AuthStoreProvider>
