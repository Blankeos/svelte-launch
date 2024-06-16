<script lang="ts">
  import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
  import DropdownMenuContent from '@/components/ui/dropdown-menu/dropdown-menu-content.svelte';
  import DropdownMenuItem from '@/components/ui/dropdown-menu/dropdown-menu-item.svelte';
  import DropdownMenuLabel from '@/components/ui/dropdown-menu/dropdown-menu-label.svelte';
  import { PageRoutes } from '@/constants/page-routes';
  import { authStore } from '@/stores/auth.store';
</script>

<div class="flex h-full w-56 flex-shrink-0 flex-col border-r px-8 py-8">
  <div class="flex items-center gap-x-3">
    <a href={PageRoutes.Home} class="text-4xl text-gray-500">
      {'<'}
    </a>

    {#if $authStore.user}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            class="h-12 w-12 flex-shrink-0 rounded-full"
            style={`background-position: center; background-size: cover; background-image: url(https://thicc-uwu.mywaifulist.moe/waifus/satoru-gojo-sorcery-fight/bOnNB0cwHheCCRGzjHLSolqabo41HxX9Wv33kfW7.jpg?class=thumbnail);`}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem href={PageRoutes.Settings}>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    {:else}
      <div class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-100" />
    {/if}
  </div>
</div>
