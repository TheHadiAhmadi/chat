import minibase from "$lib/minibase"

export async function get() {
    const messages = await minibase.get('messages');
    return {
        status: 200,
        body: {
            data: messages
        }
    } 

}
export async function post({request}) {
    const body = await request.json()

    console.time('fetch:chat/messages')
    const response = await minibase.insert('messages', body)
    console.timeEnd('fetch:chat/messages')
    

    return {
        status: 200,
        body: {
            status: 200,
            message: 'message sent successfully',
        }
    }
}