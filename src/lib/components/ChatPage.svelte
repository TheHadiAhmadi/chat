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

  let newMessageText = "";

  let messages = [];

  async function loadMessages() {
    console.log({ user, activeChat });
    messages = await getMessages(
      activeChat.id,
      localStorage.getItem("chat-token")
    );
    console.log(messages);

    // messages = result.filter((message) => {
    // 	console.log('me: ', user.id, 'other: ', activeChat.id);
    // 	console.log('sender: ', message.sender, 'receiver: ', message.receiver);
    // 	if (
    // 		(message.sender === activeChat.id && message.sender === user.id) ||
    // 		(message.sender === user.id && message.receiver === activeChat.id)
    // 	) {
    // 		return true;
    // 	} else {
    // 		return false;
    // 	}
    // });
  }
  onMount(async () => {
    console.log({ user });
    loadMessages();
  });

  async function onSend() {
    await sendMessage(
      { message: newMessageText, to: activeChat.id },
      localStorage.getItem("chat-token")
    );
    newMessageText = "";

    await loadMessages();
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
      <Avatar src={"/images/avatar.png"} />
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
