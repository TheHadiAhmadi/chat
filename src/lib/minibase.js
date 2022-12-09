/* DO NOT EDIT MANUALLY, 
THIS FILE IS AVAILABLE AT https://chat.theminibase.com */

const minibase = (appName) => {
  let token = "";

  async function run(functionName, data = {}) {
    const baseUrl = "https://minibase-api.onrender.com/chat/";
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(baseUrl + functionName, opts);
    const result = await res.json();

    if (result.error) throw new Error(result.error);

    return result.data;
  }

  return {
    setToken(value) {
      token = value;
    },
    getToken() {
      return token;
    },
    getUsers: (data) => run("getUsers", data),
    getMessages: (data) => run("getMessages", data),
    register: (data) => run("register", data),
    login: (data) => run("login", data),
    sendMessage: (data) => run("sendMessage", data),
  };
};

export default minibase("chat");
