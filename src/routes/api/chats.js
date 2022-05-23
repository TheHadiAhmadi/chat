import minibase from "$lib/minibase";

export async function get({request, locals}) {
    const messages = await minibase.get('messages')
    console.log("1233333", locals)

    // const user = await minibase.getUser(token)
    const userId = locals.user.id
    

    console.log({userId, messages})


    return {
        status: 200,
        body: []
    }
}