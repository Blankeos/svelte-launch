<script lang="ts">
  import HorizontalLayout from '@/components/layouts/horizontal/horizontal-layout.svelte';
  import type { Snippet } from 'svelte';

  const { children } = $props<{ children: Snippet }>();
</script>

<HorizontalLayout>
  {@render children()}
</HorizontalLayout>
