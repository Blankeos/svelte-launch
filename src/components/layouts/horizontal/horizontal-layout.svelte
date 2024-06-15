<script lang="ts">
  import type { Snippet } from 'svelte';
  import HorizontalSidebar from './horizontal-sidebar.svelte';

  const { children } = $props<{ children: Snippet }>();
</script>

<div class="flex h-screen">
  <HorizontalSidebar />
  {@render children()}
</div>
