<script lang="ts">
  import { goto } from '$app/navigation';
  import { PageRoutes } from '@/constants/page-routes';
  import { register } from '@/stores/auth.store';
  import { countStore } from '@/stores/count.store';
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';
  import { toast } from 'svelte-sonner';
  import { z } from 'zod';

  const schema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { form, data: formData } = createForm({
    extend: validator({ schema }),
    onSubmit: async (values: typeof schema._type) => {
      toast.promise(
        async () => {
          const result = await register(values.username, values.password);

          if (result) goto(PageRoutes.Dashboard);
        },
        {
          error: 'Failed to Register',

          success: 'Registered',
          loading: 'Registering...',
        }
      );
    },
  });
</script>

<div class="flex h-full flex-1 flex-col">
  <div class="mx-auto flex w-full max-w-5xl flex-col items-center gap-y-5">
    <h1 class="text-3xl font-medium">Sign Up</h1>
    <button
      class="rounded border border-blue-300 bg-blue-500 px-5 py-2 text-white"
      onclick={() => ($countStore = $countStore + 1)}
    >
      🌎 global count is {$countStore}
    </button>

    <form use:form class="flex flex-col gap-y-3">
      <div class="flex flex-col">
        <label>Username</label>
        <input name="username" class="rounded border p-2" type="text" />
      </div>
      <div class="flex flex-col">
        <label>Password</label>
        <input name="password" class="rounded border p-2" type="password" />
      </div>

      <button type="submit" class="rounded border border-blue-300 bg-blue-500 px-5 py-2 text-white">
        Register
      </button>
    </form>

    <pre
      class="rounded-md border border-gray-500 bg-gray-900 p-3 text-white">{`${JSON.stringify($formData, null, 2)}`}</pre>
  </div>
</div>
