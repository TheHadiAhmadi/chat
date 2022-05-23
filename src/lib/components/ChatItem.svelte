<script>
	import { Avatar } from '@svind/svelte';

	export let minimal = false;
	export let profile = '/images/avatar.png';
	export let lastMessage = null;
	export let name = 'ss';
	export let username = '';
	export let id;

	export let open = undefined;

	function getMessageText(message) {
		if (message) {
			if (message.type === 'text') {
				return message.text;
			}
			return message.type;
		}
		return '';
	}
</script>

<div
	on:click={() => open(id)}
	class="flex gap-2 bg-gray-50 hover:bg-green-100 active:bg-green-500 transition-all p-3"
>
	<Avatar src={profile} size={minimal ? 'sm' : 'md'} />

	<div class="flex-1">
		<div class="flex">
      <div class="flex flex-col">

        <p class="flex-1 text-bold text-lg">{name}</p>
        <span class="text-sm -mt-1 text-muted">{username}</span>
      </div>
			{#if !minimal && lastMessage}
				<div class="text-muted text-sm">Date</div>
			{/if}
		</div>
		{#if !minimal}
			<div class="flex flex-row">
				<div class="flex flex-row items-center">
					<!-- <span class="font-bold">
                  {#if chat.lastMessage?.sender === chat.id}
                    {chat.name}
                  {:else}
                  You
                  {/if}
              </span> -->

					<span class="text-sm text-muted">
						{getMessageText(lastMessage?.message)}
					</span>
				</div>
			</div>
		{/if}
	</div>
</div>
