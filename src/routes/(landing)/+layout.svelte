<script lang="ts">
  import VerticalLayout from '@/components/layouts/vertical/vertical-layout.svelte';

  const { children } = $props();
</script>

<VerticalLayout>
  {@render children()}
</VerticalLayout>
