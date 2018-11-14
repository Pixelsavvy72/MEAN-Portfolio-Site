const app = require("./server/app");
const debug = require("debug")("node-angular");
const http = require("http");


// Make sure port is valid when we set it.
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// Check if error and exit gracefull if so.
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Show where we are listening
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Listen for errors onListening
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);




