<script context="module">
  export async function load({ session }) {
    console.log(session);
    return {
      props: {
        user: session.user,
        token: session.token,
      },
    };
  }
</script>

<script>
  import "virtual:windi.css";
  import "@svind/svelte/styles.css";

  import {
    Page,
    Button,
    PageWrapper,
    PageBody,
    Header,
    NavBrand,
  } from "@svind/svelte";
  import LoginPage from "$lib/components/LoginPage.svelte";
  import SignupPage from "$lib/components/SignupPage.svelte";
  import ChatListPage from "$lib/components/ChatListPage.svelte";
  import { onMount } from "svelte";
  import ChatPage from "$lib/components/ChatPage.svelte";
  import minibase from "$lib/minibase";

  let dark = false;

  let user;
  let token;

  let users;
  let chats;

  let messages = {};

  let mode = "loading";

  let activeChat;

  onMount(() => {
    token = localStorage.getItem("chat-token");
    mode = token ? "chatlist" : "login";

    if (!token) return;

    minibase.setToken(token);

    user = JSON.parse(localStorage.getItem("chat-user"));
  });
</script>

<Page dark>
  {#if mode === "login"}
    <LoginPage bind:mode />
  {:else if mode === "signup"}
    <SignupPage bind:mode />
  {:else if mode === "chatlist"}
    <ChatListPage
      bind:chats
      bind:users
      bind:messages
      {token}
      {user}
      bind:activeChat
      bind:mode
    />
  {:else if mode === "chatPage"}
    <ChatPage
      {user}
      bind:activeChat
      bind:mode
      bind:messages={messages[activeChat.id]}
    />
  {:else}
    Loading ....
  {/if}
</Page>

<style>
  :global(.page) {
    height: 100%;
  }

  :global(html),
  :global(body),
  :global(.parent) {
    height: 100%;
  }
</style>
