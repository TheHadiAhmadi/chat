import minibase from "$lib/minibase"

export async function get({request, params}) {

    const users = await minibase.get('users')

    return {
        status: 200,
        body: users  
    }
}