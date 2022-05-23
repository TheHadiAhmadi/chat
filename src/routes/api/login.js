import minibase from "$lib/minibase";

export async function post({request}) {
    const {username, password} = await request.json()
    const result = await minibase.login({username, password})

    if(result.status >= 300) {
        return {
            status: result.status,
            body: result
        }
    }

    return {   
        status: 200,
        body: result,
        headers: {
            'set-cookie': [
                `token=${result.access_token}; HttpOnly;path=/;`,
                `user=${JSON.stringify(result.user)}; HttpOnly; path=/;`,
            ]
        }
    }
}