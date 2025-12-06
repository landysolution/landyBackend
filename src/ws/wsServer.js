import { WebSocketServer } from "ws";

// Map to store active top-up users
const clients = new Map(); // key: userId, value: ws connection

let wss;

function initWebSocket(server) {
  // Create WebSocket server attached to existing HTTP server
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId");

    if (!userId) return ws.close();

    // Store connection
    clients.set(userId, ws);

    ws.on("close", () => {
      clients.delete(userId);
    });
  });
}

// Function to send a message to a user
function notifyUser(userId, message) {
  const ws = clients.get(userId);
  if (ws && ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

export { initWebSocket, notifyUser, clients };
