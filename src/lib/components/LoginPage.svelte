<script>
import minibase from "$lib/minibase";

  // import { useState } from 'react';
  // import * as UI from './ui';

  // import { useTheme } from '../theme';
  // import { useView } from '../view';
  // import { useAuth } from '../hooks/auth';
  import {
    Button,
    ButtonList,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    FormInput,
  } from "@svind/svelte";

  //   const { login, error } = useAuth();

  let username = "";
  let password = "";

  let theme = "dark";
  let view = "default";

  let error = "";
  //   const theme = useTheme();
  //   const view = useView();

  //   const next = () => {
  //     login({
  //       username,
  //       password,
  //     });
  //   };

  function login() {
    if(!username || !password) return
    minibase.login({username, password})
  }
  
  function createAccount() {
      console.log("Navigate to signup page")
  }

  //   const createAccount = () => {
  //     view.setView('signup');
  //   };
</script>

<div class="w-full h-full flex items-center justify-center">
  <Card>
    <CardHeader>Login Page</CardHeader>
    <CardBody>
      <FormInput
       variant="primary"
       bind:value={username}
       type="text"
       name="username"
       label="Username"
       />
       <FormInput
       variant="primary"
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
