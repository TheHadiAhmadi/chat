<script>

    import '@svind/css/dist/index.css'
    import 'virtual:windi.css'

    import {Page, Button, PageWrapper, PageBody, Header, NavBrand} from '@svind/svelte'

    let dark = false;
    function toggleTheme() {
        dark = !dark
    }
</script>
<Page {dark}>
        <slot/>
</Page>
