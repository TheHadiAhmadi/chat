export async function get() {
    return {
        headers: {
            'set-cookie': [
                `token=; HttpOnly;path=/;`,
                `user=; HttpOnly; path=/;`,
            ]
        }
    }
}