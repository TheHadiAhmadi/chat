<script>
  import minibase from "$lib/minibase";

  import {
    Button,
    Dropdown,
    FormInput,
    Header,
    Icon,
    Input,
    Menu,
    MenuItem,
    NavBrand,
    PageWrapper,
  } from "@svind/svelte";
  import { onMount } from "svelte";

  import ChatItem from "./ChatItem.svelte";

  export let mode;
  export let user;
  export let token;
  export let messages;
  export let activeChat;

  export let chats;
  export let users;

  onMount(async () => {
    chats = await minibase.getUsers();

    await Promise.all(
      chats.map(async (chat) => {
        messages[chat.id] = await minibase.getMessages({ with: chat.id });
      })
    );

    users = chats;
  });
  // import * as UI from './ui';

  // import { useChatList } from '../hooks/chatList';

  // export type ChatListProps = {
  //   openChat: (chat: ChatType) => void;
  //   openProfile: (id: number) => void;
  //   openNewGroup: () => void;
  //   logout: () => void;
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   socket: any;
  // };

  //   <!-- openChat,
  //   openProfile,
  //   openNewGroup,
  //   logout,
  //   socket, -->

  //   const { chats, search, searchItems, refetchChats } = useChatList();
  // let chats = [];
  // let searchItems = [];
  // function refetchChats() {

  // }
  // let isSearching = false;
  // let searchText = "";
  // let isOpen = false;
  // //   const [isSearchisetIsSearchingng, setIsSearching] = useState<boolean>(false);

  // function onNewMessage() {
  //   refetchChats();
  // }
  // function openChat(chat) {
  //   goto(`/${chat.id}`);
  // }

  // function openNewGroup() {}

  // function openProfile() {}
  // //   useEffect(() => {
  // //     socket.on('/newMessage', onNewMessage);
  // //     console.log(socket);
  // //     return () => {
  // //       // eslint-disable-next-line no-param-reassign
  // //       socket._callbacks['$/newMessage'] = socket._callbacks['$/newMessage'].filter(
  // //         (callback: () => void) => callback !== onNewMessage
  // //       );
  // //     };
  // //   }, []);

  // const buttons = [
  //   {
  //     name: "Logout",
  //     icon: "mdi:logout",
  //     onClick: () => {
  function logout() {
    minibase.setToken("");
    localStorage.removeItem("chat-user");
    localStorage.removeItem("chat-token");
    users = [];
    chats = [];
    mode = "login";
  }
  //   },
  //   {
  //     name: "Create New Group",
  //     icon: "mdi:add",
  //     href: "/new",
  //   },
  //   {
  //     name: "Edit Profile",
  //     icon: "mdi:user",
  //     href: "/profile",
  //   },
  //   {
  //     name: "Refresh",
  //     icon: "mdi:refresh",
  //     onClick: () => {
  //       refetchChats();
  //     },
  //   },
  //   // {
  //   //   name: store.get("theme") === "dark" ? "Light Mode" : "Dark Mode",
  //   //   icon: store.get("theme") === "dark" ? "light_mode" : "dark_mode",
  //   //   onClick: () => {
  //   //     store.set("theme", store.get("theme") === "dark" ? "light" : "dark");
  //   //   },
  //   // },
  // ];

  function open(id) {
    console.log("open", id, users);
    activeChat = users.find((u) => u.id === id);
    mode = "chatPage";
  }
</script>

<div class="page-wrapper bg-green-100/10 absolute">
  <div class="navbar-header p-2 bg-green-600">
    <div class="navbar-brand font-normal text-white">
      <h1>ChatsApp</h1>
    </div>
    <Button on:click={logout} ghost class="pr-0 hover:text-white">Logout</Button
    >
  </div>
  <div class="-mx-4 w-screen flex flex-col h-full">
    <div class="h-full">
      {#if users}
        {#each users as user}
          <ChatItem
            id={user.id}
            {open}
            minimal
            name={user.name}
            username={user.username}
          />
        {/each}
      {/if}
    </div>
  </div>
</div>

<!-- 
  <div
    class="flex flex-col flex-1"
    on:click={() => {
      if (isOpen) isOpen = false;
    }}
  >
    <Header color="teal">
      <div class="flex-1">
        <NavBrand>ChatsApp</NavBrand>
      </div>
      <div
        class="rounded-full flex flex-row h-full flex-1 items-center {isSearching
          ? ` shadow`
          : ''}"
      >
        <div class="flex-1 relative">
          <Input
            class="bg-teal-400 form-control pr-10"
            bind:value={searchText}
            type="text"
            placeholder="Search..."
          />
        </div>

        <Button size="sm" circle on:click={() => (isSearching = !isSearching)}>
          <Icon icon="mdi:search" />
        </Button>
      </div>

      <div class="flex sm:hidden">
        <Dropdown align="end">
          <Button size="sm" circle slot="target">
            <Icon icon="mdi:menu" />
          </Button>

          <Menu class="bg-light dark:bg-dark">
            {#each buttons as button, index}
              {#if button.href}
                <MenuItem href={button.href}>
                  <Icon icon={button.icon} />
                  {button.name}
                </MenuItem>
              {:else}
                <Button on:click={button.onClick}>
                  <Icon icon={button.icon} />
                  {button.name}
                </Button>
              {/if}
            {/each}
          </Menu>
        </Dropdown>
      </div>
      <div class="hidden sm:flex flex-row gap-2">
        {#each buttons as button, index}
          <Button
            href={Button.href}
            size="sm"
            circle
            on:click={buttons.onClick}
          >
            <Icon icon={button.icon} />
          </Button>
        {/each}
      </div>
    </Header>
    {/* dropdown */}

    <div
      class="h-full"
      onClick={() => {
        if (isSearching) isSearching = false;
      }}
    >
      {#if !isSearching}
        {#each chats as chat}
          <div class="h-full w-full overflow-y-scroll overflow-x-hidden">
            <ChatItem {chat} open={() => openChat(chat)} />
          </div>
        {:else}
          <div class="h-full w-full overflow-hidden">
            <div
              class="flex w-full h-full flex-1 justify-center items-center flex-col"
            >
              <h1 class="text-center  text-4xl p-2">No Chats Found!</h1>
              <div>You can search for a group or user from top</div>
            </div>
          </div>
          )}
        {/each}
      {:else}
        {#each searchItems as chat}
          <ChatItem
            {chat}
            minimal
            open={() => {
              isSearching = false;
              openChat(chat);
            }}
          />
        {/each}
      {/if}
    </div>
  </div> -->
