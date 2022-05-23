import minibase from "$lib/minibase"

export async function post({request}) {
    const {name, username, password, email, bio} = await request.json()

    const result = await minibase.signup({username, password, email, bio});

    console.log('signup', result)
    await minibase.insert('users', {name, username, email, bio})

    if(result.status >= 300) {
        return result
    }
    
    return {
        status: 201,
        body: result,
        headers: {
            'set-cookie': [
                `token=${result.access_token}; HttpOnly;path=/;`,
                `user=${JSON.stringify(result.user)}; HttpOnly; path=/;`,
            ]
        }
    }
}