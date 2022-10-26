<script>
  import minibase from "$lib/minibase";
  import {
    Avatar,
    Button,
    Icon,
    Input,
    PageBody,
    PageHeader,
    PageWrapper,
  } from "@svind/svelte";
  import { onDestroy, onMount, tick } from "svelte";
  import Message from "./Message.svelte";

  export let user;
  export let activeChat;
  export let mode;

  let lastEl;

  let sending = false;
  let newMessageText = "";
  let skipScroll = false;

  export let messages = [];

  let timeout = 3000;

  let interval;

  function viewLastMessage(force = false) {
    if (skipScroll && !force) return;
    console.log(lastEl, { skipScroll });
    lastEl?.scrollIntoView();
  }

  async function loadMessages() {
    console.log("loadMessages");
    let newMessages = await minibase.getMessages({ with: activeChat.id });
    if (newMessages.length > messages.length) {
      timeout = 1000;
    } else {
      timeout = Math.min(timeout + 500, 6000);
    }
    if (sending) return;
    messages = newMessages;
    tick().then(() => {
      viewLastMessage();
    });
  }

  onMount(async () => {
    loadMessages();
    viewLastMessage();

    interval = setInterval(() => loadMessages(), timeout);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  async function onSend() {
    if (newMessageText === "") return;
    let message = newMessageText;
    newMessageText = "";
    sending = true;

    clearInterval(interval);
    interval = setInterval(() => loadMessages(), timeout);

    messages = [
      ...messages,
      {
        sending: true,
        message,
        to: activeChat.id,
        createdAt: "Sending...",
        seen: false,
      },
    ];

    tick().then(() => {
      viewLastMessage(true);
    });

    await minibase.sendMessage({ message, to: activeChat.id });

    loadMessages().then(() => {
      sending = false;
    });
  }

  function onScroll(e) {
    if (
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight >
      30
    ) {
      skipScroll = true;
    } else {
      skipScroll = false;
    }
  }

  function onBack() {
    activeChat = null;
    mode = "chatlist";
  }
</script>

<PageWrapper>
  <div class="navbar-header bg-green-600 py-2 text-white gap-2">
    <button
      class="btn btn-circle text-3xl !text-white !bg-transparent !hover:bg-white/10 !active:bg-white/30"
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
    on:scroll={onScroll}
    class="-mx-4 flex flex-col overflow-auto p-1 w-screen h-full bg-yellow-100"
  >
    {#each messages as message}
      <Message
        createdAt={message.createdAt}
        text={message.message}
        other={message.from === activeChat.id}
        sending={message.sending}
      />
    {/each}
    <div bind:this={lastEl} />
  </div>
  <div class="flex gap-2 -mx-4 p-2 bg-yellow-100">
    <input
      class="from-control p-2 px-4 outline-none w-full rounded-full bg-white shadow border border-gray-300"
      bind:value={newMessageText}
    />
    <button
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
