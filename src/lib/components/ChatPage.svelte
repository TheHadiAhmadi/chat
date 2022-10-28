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

  async function loadMessages(force = false) {
    console.log("loadMessages");
    let with_ = activeChat.id;
    let newMessages = await minibase.getMessages({ with: with_ });
    if (newMessages.length > messages.length) {
      timeout = 1000;
    } else {
      timeout = Math.min(timeout + 500, 6000);
    }
    if ((!force && sending) || with_ !== activeChat.id) {
      console.log("skip");
      return;
    }

    messages = newMessages;
    tick().then(() => {
      viewLastMessage();
    });
  }

  onMount(async () => {
    loadMessages(true);
    viewLastMessage();

    interval = setInterval(() => loadMessages(), timeout);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  async function onSend() {
    console.log("onSend");
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
        seen: false,
      },
    ];

    tick().then(() => {
      viewLastMessage(true);
    });

    await minibase.sendMessage({ message, to: activeChat.id });

    loadMessages(true).then(() => {
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

  function sendHello() {
    newMessageText = "Hello 👋";
    onSend();
  }

  function onBack() {
    mode = "chatlist";
  }
</script>

<div class="page-wrapper">
  <div class="navbar-header bg-green-600 py-2 text-white gap-3">
    <button
      class="btn btn-circle text-3xl !text-white !bg-transparent"
      on:click={onBack}
    >
      <Icon icon="mdi:arrow-left" />
    </button>
    <div class="flex items-center gap-3 w-full">
      <Avatar src={"/chat/images/avatar.png"} />
      <div>
        <h2
          class=" transition-all duration-400 text-lg font-bolder"
          class:text-xl={activeChat.isOnline}
        >
          {activeChat.username}
        </h2>
        {#if activeChat.isOnline}
          <h4 class="text-xs -mt-1 mb-1 text-muted">online</h4>
        {/if}
      </div>
    </div>
    <div>Menu</div>
  </div>
  <div
    on:scroll={onScroll}
    class="-mx-4 flex flex-col overflow-auto p-1 w-screen h-full bg-green-100 dark:bg-opacity-10"
  >
    {#each messages as message}
      <Message
        createdAt={message.createdAt}
        text={message.message}
        other={message.from === activeChat.id}
        sending={message.sending}
      />
    {:else}
      {#if !sending}
        <div
          class="flex w-full h-full items-center justify-center text-xl gap-4 flex-col"
        >
          <p>No Messages Yet!</p>
          <button on:click={sendHello} class="p-4 bg-white/20 rounded-xl"
            >Say Hello! 👋</button
          >
        </div>
      {/if}
    {/each}
    <div bind:this={lastEl} />
  </div>
  <div
    class="flex gap-2 -mx-4 p-2 bg-green-200 dark:bg-green-100  dark:bg-opacity-20 overflow-hidden"
  >
    <input
      placeholder="Type Something..."
      class="from-control transition-all duration-200 focus:shadow-lg p-2 px-4 outline-none w-full flex-1 rounded-full bg-white/60 dark:bg-opacity-10 dark:border-opacity-20 shadow border border-gray-300"
      bind:value={newMessageText}
    />
    {#if newMessageText !== ""}
      <button
        class="flex items-center shadow-xl justify-center w-36px h-36px rounded-full text-white text-2xl pl-1 transform hover:-rotate-45 bg-green-500"
        on:click={onSend}
      >
        <Icon icon="material-symbols:send-rounded" />
      </button>
    {/if}
  </div>
</div>
