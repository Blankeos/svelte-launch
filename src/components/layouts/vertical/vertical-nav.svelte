<script lang="ts">
  import { IconLoading } from '@/assets/icons';

  import { PageRoutes } from '@/constants/page-routes';
  import { authStore, logout } from '@/stores/auth.store';
  import { toast } from 'svelte-sonner';
  import { DropdownMenu, DropdownMenuTrigger } from '../../ui/dropdown-menu';
  import DropdownMenuContent from '../../ui/dropdown-menu/dropdown-menu-content.svelte';
  import DropdownMenuItem from '../../ui/dropdown-menu/dropdown-menu-item.svelte';
  import DropdownMenuLabel from '../../ui/dropdown-menu/dropdown-menu-label.svelte';

  const navLinks = [
    {
      name: 'Home',
      href: PageRoutes.Home,
      visible: true,
    },
    {
      name: 'About',
      href: PageRoutes.About,
      visible: true,
    },
  ];
</script>

<nav class="flex h-20 items-center justify-between gap-x-5 px-8">
  <a class="flex items-center gap-x-2" href={PageRoutes.Home}>
    <img class="h-16 w-16" src="/icon-logo.svg" />
    <span>Svelte Launch</span>
  </a>

  <ul class="flex items-center gap-x-5">
    {#each navLinks as navLink}
      <li>
        <a href={navLink.href}>{navLink.name}</a>
      </li>
    {/each}

    {#if $authStore.loading}
      <IconLoading />
    {/if}

    {#if !$authStore.user && !$authStore.loading}
      <li>
        <a href={PageRoutes.SignIn}>Sign In</a>
      </li>
      <li>
        <a href={PageRoutes.SignUp}>Sign Up</a>
      </li>
    {/if}

    {#if $authStore.user && !$authStore.loading}
      <li>
        <button
          onclick={async () => {
            const result = await logout();

            if (result.success) {
              toast.success('Logged out!');
            }
          }}>Logout</button
        >
      </li>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <!-- svelte-ignore element_invalid_self_closing_tag -->
          <div
            class="h-12 w-12 flex-shrink-0 rounded-full"
            style={`background-position: center; background-size: cover; background-image: url(https://thicc-uwu.mywaifulist.moe/waifus/satoru-gojo-sorcery-fight/bOnNB0cwHheCCRGzjHLSolqabo41HxX9Wv33kfW7.jpg?class=thumbnail);`}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem href={PageRoutes.Dashboard}>Dashboard</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    {/if}
  </ul>
</nav>
