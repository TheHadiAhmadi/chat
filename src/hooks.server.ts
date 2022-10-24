import cookie from 'cookie'

export async function handle({event, resolve}) {
    console.log(event.request.headers.get('cookie'))
    const cookies = cookie.parse(event.request.headers.get('cookie') ?? 'null')
    console.log(cookies)
    event.locals.token = cookies?.token ?? ''
    event.locals.user = JSON.parse(cookies?.user || 'null')
    return resolve(event)
}

// export async function getSession(event) {
//     const {user, token} = event.locals
//     console.log("getSession", user)
//     if(token) {
//         return {
//             user: {
//                 username: user.username,
//                 email: user.data.email,
//                 bio: user.data.bio,
//                 id: user.id
//             },
//             token
//         }
//     } else {
//         return {
//             user: null,
//             token: ''
//         }
//     }    
// }