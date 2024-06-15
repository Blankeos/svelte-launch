<script lang="ts">
  import type { Snippet } from 'svelte';
  import VerticalNav from './vertical-nav.svelte';

  const { children } = $props<{ children: Snippet }>();
</script>

<VerticalNav />
{@render children()}
