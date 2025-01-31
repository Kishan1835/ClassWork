### Aim of the Code

The aim of the provided code is to create a simple HTTP server using Node.js that listens for incoming requests on port 3000. The server responds to a specific endpoint (`/ping`) with a "pong" message, while any other requests receive a "Not Found" response. This setup can be useful for testing the server's availability and functionality.

### Algorithm

1. **Import Required Module**: 
   - Import the `http` module to create an HTTP server.

2. **Define Server Configuration**:
   - Set the hostname to `0.0.0.0` to listen on all network interfaces.
   - Define the port number as `3000`.

3. **Create the HTTP Server**:
   - Use `http.createServer()` to create a server that handles incoming requests.
   - Inside the request handler:
     - Check if the request URL is `/ping`.
       - If true, set the response status code to `200`, set the content type to `text/plain`, and send back "pong".
       - If false, set the response status code to `404` and send back "Not Found".

4. **Start the Server**:
   - Call `server.listen()` to start the server on the specified port and hostname.
   - Log a message to the console indicating that the server is running and provide the URL.

### Note

When using the build and run command, ensure that you have Docker Desktop running on your system.
   docker build -t node-ping-server .
   docker run -p 3000:3000 node-ping-server

This algorithm outlines the basic flow of the server's operation, from initialization to handling requests and sending responses.