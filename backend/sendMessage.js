exports = async (body, ctx) => {
  try {
    const { to, message } = body;
    if (!to || !message) {
      return {
        error: {
          code: "BAD_INPUT",
          message: "to and message fields are required",
        },
      };
    }

    if (!ctx.token) {
      return {
        status: 400,
        body: {
          success: false,
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

    const date = new Date().valueOf();
    const messageObject = {
      from: user.id,
      to: to,
      message,
      replyTo: body.replyTo ?? null,
      updatedAt: date,
      createdAt: date,
    };

    const result = await ctx.db.messages.insert(messageObject);

    return {
      data: result,
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
