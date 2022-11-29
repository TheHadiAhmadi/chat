exports = async (body, ctx) => {
  try {
    const otherUserId = body.with ?? "";

    if (!otherUserId) {
      return {
        error: {
          code: "BAD_INPUT",
          message: "'with property required",
        },
      };
    }

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
        body: {
          code: "NO_ACCESS",
          message: "You are not authorized!",
        },
      };
    }

    const [myMessages, otherMessages] = await Promise.all([
      ctx.db.messages.find({ from: user.id, to: otherUserId }),
      ctx.db.messages.find({ from: otherUserId, to: user.id }),
    ]);

    const messages = [...myMessages, ...otherMessages].sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    });

    return {
      data: messages,
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
