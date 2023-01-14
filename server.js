const http = require("http");
http
  .createServer((req, res) => {
    const data = {
      name: "BOB",
      age: 100,
    };
    res.writeHead(200, {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    });
    setTimeout(() => {
      res.end(JSON.stringify(data));
    }, 5000);
  })
  .listen(1234, () => console.log("SERVER STARTED ON PORT 1234"));
