<script>
  import ChatItem from "$lib/components/ChatItem.svelte";

  import minibase from "$lib/minibase";
  import {
    Button,
    Dropdown,
    Header,
    Icon,
    Menu,
    MenuItem,
    NavBrand,
    PageWrapper,
  } from "@svind/svelte";

  const buttons = [
    {
      name: "Logout",
      icon: "logout",
      onClick() {
        minibase.logout();
      },
    },
    {
      name: "Create New Group",
      icon: "add",
      onClick: () => {
        // openNewGroup();
      },
    },
    {
      name: "Edit Profile",
      icon: "manage_accounts",
      onClick: () => {
        // openProfile();
      },
    },
    {
      name: "Refresh",
      icon: "refresh",
      onClick: () => {
        // refetchChats();
      },
    },
    // {
    //   name: store.get("theme") === "dark" ? "Light Mode" : "Dark Mode",
    //   icon: store.get("theme") === "dark" ? "light_mode" : "dark_mode",
    //   onClick: () => {
    //     store.set("theme", store.get("theme") === "dark" ? "light" : "dark");
    //   },
    // },
  ];
</script>

<Header color="teal">
  <NavBrand>ChatsApp</NavBrand>
  <Dropdown align="end">
    <Button variant="secondary" circle slot="target">
      <Icon icon="fa-solid:bars" />
    </Button>

    <Menu class="bg-light dark:bg-dark">
      {#each buttons as button, index}
        <MenuItem>
          <Icon icon={button.icon} />
          {button.name}
        </MenuItem>
      {/each}
    </Menu>
  </Dropdown>
</Header>

<PageWrapper>
  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: {
        id: "23",
        message: {
          type: "message",
          text: "some message",
        },
      },
    }}
  />
  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: {
        id: "23",
        sender: "1",
        message: {
          type: "text",
          text: "some message",
        },
      },
    }}
  />

  <ChatItem
    minimal
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: {
        id: "23",
        message: { type: "Photo", text: "some message" },
      },
    }}
  />
  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />

  <ChatItem
    chat={{
      name: "Hadi",
      profile: null,
      lastMessage: { id: "23", message: { text: "some message" } },
    }}
  />
</PageWrapper>
