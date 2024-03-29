/* DO NOT EDIT MANUALLY, 
THIS FILE IS AVAILABLE AT https://chat.theminibase.com */

const minibase = (appName) => {
  let token = "";

  async function run(functionName, method, data = {}) {
    // const baseUrl = "http://localhost:3000/";
    const baseUrl = "https://minibase-project-chat-api.vercel.app/";
    const opts = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: method === "GET" ? null : JSON.stringify(data),
    };

    let queryParams = "";

    if (method === "GET") {
      queryParams = "?";
      for (let key of Object.keys(data)) {
        queryParams += `${key}=${data[key]}&`;
      }
    }

    console.log(functionName, data, token);
    const res = await fetch(baseUrl + functionName + queryParams, opts);
    const result = await res.json();

    console.log(result);

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
    getUsers: (data) => run("getUsers", "GET", data),
    getMessages: (data) => run("getMessages", "GET", data),
    register: (data) => run("register", "POST", data),
    login: (data) => run("login", "POST", data),
    sendMessage: (data) => run("sendMessage", "POST", data),
  };
};

export default minibase("chat");
