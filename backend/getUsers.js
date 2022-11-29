exports = async (body, ctx) => {
  try {
    if (!ctx.token) {
      return {
        error: {
          code: "NO_ACCESS",
          message: "Authorization Header is missing",
        },
      };
    }

    let user = null;
    try {
      user = await ctx.packages.jsonwebtoken.verify(ctx.token, "SECRET%");
    } catch (err) {
      return {
        error: {
          code: "JWT_ERROR",
          message: err.message,
        },
      };
    }

    if (!user || !user.id) {
      return {
        error: {
          code: "NO_ACCESS",
          message: "You are not authorized!",
        },
      };
    }

    const users = await ctx.db.users.find();

    return {
      data: users
        .filter((u) => u.id !== user.id)
        .map((u) => ({
          name: u.name,
          username: u.username,
          bio: u.bio,
          id: u.id,
        })),
    };
  } catch (err) {
    return {
      error: {
        code: "INTERNAL_ERROR",
        message: err.message,
      },
    };
  }
};
