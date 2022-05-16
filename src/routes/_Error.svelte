<!-- <script>
    import { Boundary } from '@crownframework/svelte-error-boundary';
    let a;
      let b = { data: 'text' }
  </script>
  
  The code inside this boundary will throw immediately
  <Boundary onError={console.error}>
    {a.b.c}
  </Boundary>
  
  This code will throw once you click the button
  <Boundary onError={console.error}>
      <p>
          data: {b.data} 
      </p>
  </Boundary>
  
  <button on:click={() => {
      b = null
  }}>Trigger error</button>
   -->
  <dl>
    <dt>Repo:</dt>
      <dd><a href="https://github.com/crownframework/svelte-error-boundary">https://github.com/crownframework/svelte-error-boundary</a></dd>
    <dt>NPM package:</dt>
      <dd><a href="https://www.npmjs.com/package/@crownframework/svelte-error-boundary">https://www.npmjs.com/package/@crownframework/svelte-error-boundary</a></dd>
  </dl>