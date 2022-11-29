function hashPassword(pass) {
    return pass;
}
exports = async (body, ctx) => {
    try {
        

        const {username, password} = body;
        
        if(!username || !password) {
            return {
                error: {
                    code: 'BAD_INPUT',
                    message: 'Username and password are required fields'
                }
            }
        }
        
        const users = await ctx.db.users.find({username});
        
        if(users.length == 0) {
            return {
                error: {
                    code: 'NOT_FOUND',
                    message: 'Username is not valid'
                }
            }
        }
        const user = users[0]
        
        if(user.password !== hashPassword(password)) {
            return {
                error: {
                    code: 'BAD_INPUT',
                    message: "Invalid password"
                }
            }
        }
        
        const token = await ctx.packages.jsonwebtoken.sign({name: user.name, email: user.email, id: user.id, username: user.username, bio: user.bio}, "SECRET%")
        
        return {
            data: {
                token,
                user: {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    bio: user.bio,
                }
            }
        }
        
        
    } catch(err) {
        return {
            error: {
                code: 'INTERNAL_ERROR',
                message: err.message
            }
        }
    }
    
}