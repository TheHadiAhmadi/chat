<script>
  export let text;
  export let createdAt;
  export let other = true;
  export let seen = false;
  export let sending = false;

  function getDate(date) {
    if (!date) return "Loading...";

    console.log(date);

    const oneDay = 1000 * 60 * 60 * 24;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const now = new Date();
    if (date - now > oneDay) {
      const month = months[date.getMonth()];
      const day = date.getDay();

      return `${day} ${month}`;
    } else {
      return date
        .toLocaleTimeString("en", { hourCycle: "h23" })
        .substring(0, 5);
    }
  }

  $: otherClasses = `!self-start bg-white dark:bg-white/20`;
  $: selfClasses = "bg-green-300 dark:bg-green-600 self-end";
</script>

<div
  class="p-1 flex flex-col mb-1 shadow rounded-lg mx-5 {other
    ? otherClasses
    : selfClasses}"
  class:opacity-70={sending}
>
  {#if seen}
    <div>Seen</div>
  {/if}
  <div class="p-2">
    {text}
  </div>
  <div class="text-right ml-12 mr-1 text-10px">
    {#if sending}
      Sending...
    {:else}
      {getDate(new Date(Number(createdAt)))}
    {/if}
  </div>
</div>
