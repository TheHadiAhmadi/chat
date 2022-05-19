<script context="module">
  export async function load({fetch}) {
    console.time("fetch:api/users")
    const users = await fetch('/api/users').then(res => res.json())
    console.timeEnd("fetch:api/users")

    console.time("fetch:api/messages")
    const messages = await fetch('/api/messages').then(res => res.json())
    console.timeEnd("fetch:api/messages")

    return {
      props: {
        users: users.data,
        messages: messages.data
      }
    }

  }

</script>
<script>
import { invalidate } from "$app/navigation";

import { session } from "$app/stores";
import ChatListPage from "$lib/components/ChatListPage.svelte";
import LoginPage from "$lib/components/LoginPage.svelte";

  import minibase from "$lib/minibase";
import { Avatar, Button, Input, PageBody, PageWrapper } from "@svind/svelte";
import { onMount } from "svelte";

  export let users;
  export let messages;

  let senderId;
  let receiverId;
  let message;

  function sendMessage() {
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        text: message,
        content: message,
        sender: senderId, 
        receiver:receiverId,
        reply_to: null,
        created_at: new Date().valueOf(),
        updated_at: new Date().valueOf(),
      })
    })
    invalidate('/')

  }
</script>
<PageWrapper>

  <PageBody>

{#each users as user}
  <div class="flex p-4 border border-gray-400 bg-gray-50 m-4 gap-4">
    <Avatar size="xl" src={user.profile}/>
    <div class="flex-1">
      <div class="flex gap-2">
        <div class="font-bold">{user.name}</div>
        <div class="text-sm">{user.username}</div>
      </div>
      <div>{user.bio}</div>
      <div class="text-xs text-gray-800">{user.id}</div>
    </div>
  </div>
{/each}
{JSON.stringify(messages)}

{#each messages as message}
  <div class="flex p-4 border border-gray-400 bg-gray-50 m-4 gap-4">
    <div>{message.id}</div>
    <div>{message.text}</div>
    <div>{message.content}</div>
    <div>{message.sender}</div>
    <div>{message.receiver}</div>
  </div>
{/each}
<!-- {JSON.stringify(users)} -->

<hr/>

<div>
  <Input placeholder="message text" bind:value={message}/>
  <Input placeholder="your id" bind:value={senderId}/>
  <Input placeholder="reciever id" bind:value={receiverId}/>
  <Button on:click={sendMessage}>Send Message</Button>
</div>

</PageBody>

</PageWrapper>

<!-- {#if $session}
<ChatListPage/>
{:else}
<LoginPage/>
{/if} -->
<!-- 
{#await minibase.get("users")}
  Loading...
{:then result}
  {JSON.stringify(result)}
{/await} -->
