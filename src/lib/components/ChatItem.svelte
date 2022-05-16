<script>
import { Avatar } from "@svind/svelte";



    export let chat = {}
    export let minimal = false
    export let open = undefined

    chat.profile = chat?.profile ?? "/images/avatar.png"

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
    <div on:click={open} class="flex gap-2 hover:bg-gray-200 transition-all p-3">
        <Avatar src={chat.profile} size={minimal ? 'sm' : 'md'}/>
        
      <div class="flex-1">
          <div class="flex">
              <p class="flex-1 text-bold text-lg">{chat.name}</p>
              {#if !minimal && chat.lastMessage}
              <div class="text-muted text-sm">

                  Date
                </div>
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
                {getMessageText(chat.lastMessage?.message)}
              </span>
            </div>
          </div>
        {/if}
      </div>
    </div>