<script>
  import { countStore } from '@/stores/count.store';
</script>

<div class="flex h-full flex-1 flex-col">
  <div class="mx-auto flex w-full max-w-5xl flex-col items-center gap-y-5">
    <h1 class="text-3xl font-medium">About</h1>
    <button
      class="rounded border border-blue-300 bg-blue-500 px-5 py-2 text-white"
      onclick={() => ($countStore = $countStore + 1)}
    >
      🌎 global count is {$countStore}
    </button>
  </div>
</div>
