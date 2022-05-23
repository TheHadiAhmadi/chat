import minibase from "$lib/minibase";

export async function get({locals}) {
    const users = await minibase.get('users')
    const user = locals.user

    console.log(JSON.stringify({users, user}, null, 2))
    return {}
}