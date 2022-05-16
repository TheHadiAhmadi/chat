<script>

    function onclick() {
        throw new Error("Click erorr")
    }
</script>
<button on:click={onclick}>Click Me</button>