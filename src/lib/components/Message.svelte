<script>
  export let text;
  export let createdAt;
  export let other = true;
  export let seen = false;

  $: console.log(other);
</script>

<div
  class="p-1 flex flex-col  mb-1 shadow rounded-lg mx-5 bg-green-300 self-end"
  class:!bg-white={other}
  class:!self-start={other}
>
  {#if seen}
    <div>Seen</div>
  {/if}
  <div class="p-2">
    {text}
  </div>
  <div class="text-right ml-12 mr-1 text-xs">
    {new Date(createdAt).toTimeString().substring(0, 5)}
  </div>
</div>
