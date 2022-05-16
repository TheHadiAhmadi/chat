<script>
import { goto } from "$app/navigation";

import minibase from "$lib/minibase";

import { onMount } from "svelte";



onMount(async () => {
    await minibase.logout()
    goto('/')
})

</script>
<div>Shoult logout from app</div>