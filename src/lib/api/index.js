async function send(pathname, method, data, token) {
  const opts = {};
  if (method) {
    opts.method = method;
  }
  if (token) {
    opts.headers = {};
    opts.headers.Authorization = `bearer ${token}`;
  }

  if (data) {
    opts.body = JSON.stringify(data);
  }
  const result = await fetch(
    "https://chat.theminibase.com" + pathname,
    opts
  ).then((res) => res.json());

  if (result.success) {
    return result.data;
  } else {
    console.log(result.message);
    throw new Error(result.message);
  }
}

export function getUsers(token) {
  return send("/getUsers", null, null, token);
}
export function getMessages(userId, token) {
  return send("/getMessages?with=" + userId, null, null, token);
}

export function sendMessage({ to, message, replyTo }, token) {
  return send("/sendMessage", "POST", { to, message, replyTo }, token);
}

export function login({ username, password }) {
  return send("/login", "POST", { username, password });
}

export function register({ username, email, name, bio, password }) {
  return send("/register", "POST", { username, email, name, bio, password });
}
