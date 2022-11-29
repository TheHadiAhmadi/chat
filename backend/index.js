const express = require("express");
const knex = require("knex");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let ctx = {};

let tables = [
  {
    id: "43334b2c-1793-465d-b272-adcc97d697a2",
    project: "chat",
    name: "users",
    schema: [
      { name: "name", type: "string" },
      { name: "username", type: "string" },
      { name: "email", type: "string" },
      { name: "password", type: "string" },
      { name: "bio", type: "string" },
      { name: "id", type: "string" },
    ],
  },
  {
    id: "dca573ce-d474-48b8-beca-dd570c6d6d85",
    project: "chat",
    name: "messages",
    schema: [
      { name: "id", type: "string" },
      { name: "from", type: "string" },
      { name: "to", type: "string" },
      { name: "message", type: "string" },
      { name: "replyTo", type: "string" },
      { name: "createdAt", type: "string" },
      { name: "updatedAt", type: "string" },
    ],
  },
];

// Update client and connection
const db = new knex({
  useNullAsDefault: true,
  client: "sqlite3",
  connection: ":memory:",
  debug: true,
});

async function createDB(collection, schema) {
  const hasExists = await db.schema.hasTable(collection);

  if (!hasExists) {
    await db.schema.createTable(collection, (builder) => {
      for (let item of schema) {
        // TODO: support all available types
        if (item.type === "string") {
          builder.string(item.name);
        }
      }
    });
  }
  return {
    async insert(data) {
      const id = crypto.randomUUID();
      await db(collection).insert({
        ...data,
        id,
      });

      return { ...data, id };
    },
    async remove(id) {
      await db(collection).delete().where({ id });

      return true;
    },
    async update(id, data) {
      await db(collection).update(data).where({ id });

      return { ...data, id };
    },
    async get(id) {
      const result = await db(collection).select("*").where({ id }).first();

      if (!result) return null;

      return result;
    },
    async find(filter = {}, options = {}) {
      let result = await db(collection).select("*");
      const take = options.take ?? -1;
      const skip = options.skip ?? 0;

      result = result.filter((data) => {
        let returnVal = true;
        Object.entries(filter).map(([key, value]) => {
          if (data[key] !== value) {
            returnVal = false;
          }
        });
        return returnVal;
      });
      if (take === -1) return result.slice(skip);
      if (take > result.length) return result.slice(skip);

      return result.slice(skip, skip + take);
    },
  };
}

async function init() {
  const db = {};

  for (let table of tables) {
    db[table.name] = await createDB(table.name, table.schema);
  }

  ctx = {
    db,
    packages: {
      jsonwebtoken: require("jsonwebtoken"),
    },
    env: process.env,
  };
}

app.post("/login", async (req, res) => {
  let handle;

  function hashPassword(pass) {
    return pass;
  }
  handle = async (body, ctx) => {
    try {
      const { username, password } = body;

      if (!username || !password) {
        return {
          error: {
            code: "BAD_INPUT",
            message: "Username and password are required fields",
          },
        };
      }

      const users = await ctx.db.users.find({ username });

      if (users.length == 0) {
        return {
          error: {
            code: "NOT_FOUND",
            message: "Username is not valid",
          },
        };
      }
      const user = users[0];

      if (user.password !== hashPassword(password)) {
        return {
          error: {
            code: "BAD_INPUT",
            message: "Invalid password",
          },
        };
      }

      const token = await ctx.packages.jsonwebtoken.sign(
        {
          name: user.name,
          email: user.email,
          id: user.id,
          username: user.username,
          bio: user.bio,
        },
        "SECRET%"
      );

      return {
        data: {
          token,
          user: {
            name: user.name,
            username: user.username,
            email: user.email,
            id: user.id,
            bio: user.bio,
          },
        },
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

  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";

  const result = await handle(req.body, { ...ctx, token });
  return res.json(result);
});

app.post("/register", async (req, res) => {
  let handle;

  function hashPassword(pass) {
    return pass;
  }
  handle = async (body, ctx) => {
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

  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";

  const result = await handle(req.body, { ...ctx, token });
  return res.json(result);
});

app.post("/getUsers", async (req, res) => {
  let handle;

  handle = async (body, ctx) => {
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

  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";

  const result = await handle(req.body, { ...ctx, token });
  return res.json(result);
});

app.post("/sendMessage", async (req, res) => {
  let handle;

  handle = async (body, ctx) => {
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

  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";

  const result = await handle(req.body, { ...ctx, token });
  return res.json(result);
});

app.post("/getMessages", async (req, res) => {
  let handle;

  handle = async (body, ctx) => {
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

  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";

  const result = await handle(req.body, { ...ctx, token });
  return res.json(result);
});

init().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("server started at port " + port + "!");
  });
});

module.exports = app;
