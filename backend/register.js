function hashPassword(str) {
  if (str) {
    return crypto.createHash("sha256").update(str).digest("hex");
  }
  throw new Error("empty password");
}

exports = async (body, ctx) => {
  try {
    const { name, username, email, password, bio = "Hello World!" } = body;

    if (!name || !username || !email || !password) {
      return {
        error: {
          code: "BAD_INPUT",
          message: "name, email, Username and password are required fields",
        },
      };
    }

    const [usernameUsers, emailUsers] = await Promise.all([
      ctx.db.users.find({ username }),
      ctx.db.users.find({ email }),
    ]);

    if (usernameUsers.length > 0) {
      return {
        error: {
          code: "CONFLICT",
          message: "Username is already taken",
        },
      };
    }

    if (emailUsers.length > 0) {
      return {
        error: {
          code: "CONFLICT",
          message: "Email is already taken",
        },
      };
    }

    const user = {
      name,
      username,
      email,
      bio,
    };

    const result = await ctx.db.users.insert({
      ...user,
      password: hashPassword(password),
    });

    // name, email, username, id, bio
    const token = await ctx.packages.jsonwebtoken.sign(
      { ...user, id: result.id },
      "SECRET%"
    );

    return {
      data: {
        token,
        user: {
          ...user,
          id: result.id,
        },
      },
    };
  } catch (err) {
    return {
      body: {
        code: "INTERNAL_ERROR",
        message: err.message,
      },
    };
  }
};
