<script>
  import {
    Button,
    ButtonList,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    FormInput,
  } from "@svind/svelte";

  export let mode;

  let username = "";
  let password = "";

  async function login() {
    if(!username || !password) return
    const result = await fetch('/api/login', {method: 'POST', body: JSON.stringify({username, password})}).then(res => res.json())
    // minibase.login({username, password})
    console.log(result)
    if(result.access_token) {
      mode = 'chatlist'
    }
  }
  
  function createAccount() {
    mode = 'signup'
  }
</script>

<div class="w-full h-full flex items-center justify-center">
  <Card>
    <CardHeader>Login Page</CardHeader>
    <CardBody>
      <FormInput
       bind:value={username}
       type="text"
       name="username"
       label="Username"
       />
       <FormInput
        bind:value={password}
        type="password"
        name="password"
        label="Password"
      />
    </CardBody>
    <div>Error:</div>
    <CardFooter>
      <ButtonList>
        <Button on:click={createAccount}>
          create account
        </Button>
        <Button variant="primary" on:click={login}>Next</Button>
      </ButtonList>
    </CardFooter>
  </Card>
</div>
