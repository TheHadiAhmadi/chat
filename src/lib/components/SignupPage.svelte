<script>
  import minibase from "$lib/minibase";
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

  let name = "";
  let username = "";
  let password = "";
  let email = "";
  let bio = "Hey There! I am using ChatsApp";

  async function signup() {
    if (!username || !password || !email) return;
    const result = await minibase.register({
      name,
      username,
      password,
      email,
      bio,
    });

    if (result.token) {
      minibase.setToken(result.token);
      localStorage.setItem("chat-token", result.token);
      localStorage.setItem("chat-user", JSON.stringify(result.user));
      mode = "chatlist";
    }
  }

  function hasAccount() {
    mode = "login";
  }
</script>

<div class="w-full h-full flex items-center justify-center">
  <Card>
    <CardHeader>Login Page</CardHeader>
    <CardBody>
      <FormInput bind:value={name} type="text" name="name" label="Your Name" />
      <FormInput
        bind:value={username}
        type="text"
        name="username"
        label="Choose a Username"
      />
      <FormInput
        bind:value={password}
        type="password"
        name="password"
        label="Choose a Password"
      />
      <FormInput
        bind:value={email}
        type="text"
        name="email"
        label="Your Email (not important)"
      />
      <FormInput bind:value={bio} type="text" name="bio" label="Bio" />
    </CardBody>
    <CardFooter>
      <ButtonList>
        <Button ghost on:click={hasAccount}>already has account?</Button>
        <Button variant="success" on:click={signup}>Next</Button>
      </ButtonList>
    </CardFooter>
  </Card>
</div>
