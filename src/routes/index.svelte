<script>
import { session } from "$app/stores";
import ChatListPage from "$lib/components/ChatListPage.svelte";
import LoginPage from "$lib/components/LoginPage.svelte";

  import minibase from "$lib/minibase";
</script>
{#if $session}
<ChatListPage/>
{:else}
<LoginPage/>
{/if}
<!-- 
{#await minibase.get("users")}
  Loading...
{:then result}
  {JSON.stringify(result)}
{/await} -->
