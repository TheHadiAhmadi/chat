<script>
  import { getMessages, sendMessage } from "$lib/api";
  import {
    Avatar,
    Button,
    Icon,
    Input,
    PageBody,
    PageHeader,
    PageWrapper,
  } from "@svind/svelte";
  import { onMount } from "svelte";
  import Message from "./Message.svelte";

  export let user;
  export let activeChat;
  export let mode;

  let sending = false;
  let newMessageText = "";

  let messages = [];

  let timeout = 3000;

  let interval;
  async function loadMessages() {
    newMessages = await getMessages(
      activeChat.id,
      localStorage.getItem("chat-token")
    );
    if (newMessages.length > messages.length) {
      timeout = 1000;
    } else {
      timeout = Math.min(timeout + 500, 6000);
    }
  }

  onMount(async () => {
    console.log({ user });
    loadMessages();
    interval = setInterval(() => loadMessages(), timeout);
  });

  async function onSend() {
    messages = [
      ...messages,
      {
        message: newMessageText,
        to: activeChat.id,
        createdAt: "Sending...",
        seen: false,
      },
    ];
    sending = true;

    await sendMessage(
      { message: newMessageText, to: activeChat.id },
      localStorage.getItem("chat-token")
    );
    sending = false;
    newMessageText = "";
    clearInterval(interval);
    loadMessages();
    interval = setInterval(() => loadMessages(), timeout);
  }

  function onBack() {
    activeChat = null;
    mode = "chatlist";
  }
</script>

<PageWrapper>
  <div class="navbar-header bg-green-600 py-2 text-white gap-2">
    <button
      class="btn btn-circle text-3xl text-white bg-transparent hover:bg-white/10 active:bg-white/30"
      on:click={onBack}
    >
      <Icon icon="la:arrow-left" />
    </button>
    <div class="flex items-center gap-2 w-full">
      <Avatar src={"/chat/images/avatar.png"} />
      <div>
        <h2 class="text-xl font-bolder">
          {activeChat.username}
        </h2>
        <h4 class="text-xs -mt-1 mb-1 text-muted">online</h4>
      </div>
    </div>
    <div>Menu</div>
  </div>
  <div
    class="-mx-4 flex flex-col overflow-auto p-1 w-screen h-full bg-yellow-100"
  >
    {#each messages as message}
      <Message
        createdAt={message.createdAt}
        text={message.message}
        other={message.from === activeChat.id}
      />
    {/each}
  </div>
  <div class="flex gap-2 -mx-4 p-2 bg-yellow-100">
    <input
      disabled={sending}
      class="from-control p-2 px-4 outline-none w-full rounded-full bg-white shadow border border-gray-300"
      bind:value={newMessageText}
    />
    <button
      disabled={sending}
      class="btn btn-success text-2xl bg-green-600 btn-circle"
      on:click={onSend}
    >
      <Icon icon="material-symbols:send-rounded" />
    </button>
  </div>
</PageWrapper>

<!-- Active Chat
{JSON.stringify(activeChat)}
 -->
