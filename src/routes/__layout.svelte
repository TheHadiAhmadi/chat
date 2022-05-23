<script context="module">
	export async function load({session}) {
		console.log(session)
		return {
			props: {
				user: session.user,
				token: session.token
			}
		}
	}

</script>
<script>
	import '@svind/css/dist/index.css';
	import 'virtual:windi.css';

	import { Page, Button, PageWrapper, PageBody, Header, NavBrand } from '@svind/svelte';
	import LoginPage from '$lib/components/LoginPage.svelte';
	import SignupPage from '$lib/components/SignupPage.svelte';
	import ChatListPage from '$lib/components/ChatListPage.svelte';
	import { onMount } from 'svelte';
import ChatPage from '$lib/components/ChatPage.svelte';

	let dark = false;

	export let user;
	export let token;

	let users;
	let chats;

	let activeChat;


	let mode = token ? 'chatlist' : 'login';
</script>

<Page {dark}>
	{#if mode === 'login'}
		<LoginPage bind:mode />
	{:else if mode === 'signup'}
		<SignupPage bind:mode />
	{:else if mode === 'chatlist'}
		<ChatListPage bind:chats bind:users {token} {user} bind:activeChat bind:mode />
	{:else if mode === 'chatPage'}
		<ChatPage {user} bind:activeChat bind:mode/>
	{:else}
		{mode}
	{/if}
</Page>
