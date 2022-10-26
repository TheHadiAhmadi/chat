const minibase = (appName) => {
  let token = "";

  async function run(functionName, data) {
    const baseUrl = `https://${appName}.theminibase.com/`;
    const opts = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(baseUrl + functionName, opts);
    return res.json();
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
    sendMessage: (data) => run("sendMessage", data),
    login: (data) => run("login", data),
    register: (data) => run("register", data),
  };
};

export default minibase("chat");
