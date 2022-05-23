import minibase from "$lib/minibase"

export async function get() {
    const messages = await minibase.get('messages');
    return {
        status: 200,
        body: messages 
    } 

}
export async function post({locals, request}) {
    const body = await request.json()
    const user = locals.user

    const response = await minibase.insert('messages', {
        receiver: body.receiver,
        sender: user.id,
        content: body.text,
        createdAt: Date.now().valueOf(),
        updatedAt: Date.now().valueOf(),
    })
    console.log(response)
    

    return {
        status: 200,
        body: {
            status: 200,
            message: 'message sent successfully',
        }
    }
}