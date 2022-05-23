<script>
	import {
		Button,
		ButtonList,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		FormInput
	} from '@svind/svelte';

	//   const { login, error } = useAuth();

	export let mode;

	let name = '';
	let username = '';
	let password = '';
	let email = 'test@test.gmail.com';
	let bio = 'Hey There! I am using ChatsApp';

	async function signup() {
		if (!username || !password || !email) return;
		const result = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify({
				name,
				username,
				password,
				email,
				bio
			})
		}).then((res) => res.json());

		if (result.access_token) {
			mode = 'chatlist';
		}
	}

	function noAccount() {
		mode = 'login';
	}
</script>

<div class="w-full h-full flex items-center justify-center">
	<Card>
		<CardHeader>Login Page</CardHeader>
		<CardBody>
			<FormInput bind:value={name} type="text" name="name" label="Your Name" />
			<FormInput bind:value={username} type="text" name="username" label="Choose a Username" />
			<FormInput bind:value={password} type="password" name="password" label="Choose a Password" />
			<FormInput bind:value={email} type="text" name="email" label="Your Email (not important)" />
			<FormInput bind:value={bio} type="text" name="bio" label="Bio" />
		</CardBody>
		<div>Error:</div>
		<CardFooter>
			<ButtonList>
				<Button on:click={noAccount}>no account?</Button>
				<Button variant="primary" on:click={signup}>Next</Button>
			</ButtonList>
		</CardFooter>
	</Card>
</div>
