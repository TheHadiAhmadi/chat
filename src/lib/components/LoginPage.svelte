<script>
  import { login } from "$lib/api";
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

  async function onLogin() {
    if (!username || !password) return;
    const result = await login({ username, password });

    console.log(result);
    if (result.token) {
      localStorage.setItem("chat-user", JSON.stringify(result.user));
      localStorage.setItem("chat-token", result.token);
      mode = "chatlist";
    }
  }

  function createAccount() {
    mode = "signup";
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
    <CardFooter>
      <ButtonList>
        <Button ghost on:click={createAccount}>create account</Button>
        <Button variant="primary" on:click={onLogin}>Next</Button>
      </ButtonList>
    </CardFooter>
  </Card>
</div>
