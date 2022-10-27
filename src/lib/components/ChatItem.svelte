<script>
  import { Avatar } from "@svind/svelte";
  import { fly } from "svelte/transition";

  export let minimal = false;
  export let profile = "/chat/images/avatar.png";
  export let lastMessage = null;
  export let name = "ss";
  export let username = "";
  export let id;

  export let open = undefined;

  function getMessageText(message) {
    if (message) {
      if (message.type === "text") {
        return message.text;
      }
      return message.type;
    }
    return "";
  }
</script>

<div
  on:click={() => open(id)}
  class="w-full flex gap-2 transition-all duration-300 bg-gray-200 dark:bg-gray-100 dark:bg-opacity-15 bg-opacity-20 hover:bg-opacity-50 dark:hover:bg-opacity-20 border-b border-gray-300 border-opacity-20 active:hover:bg-green-500 dark:active:hover:bg-green-500 active:bg-opacity-100 transition-all p-3"
>
  <Avatar src={profile} size={minimal ? "sm" : "md"} />

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
