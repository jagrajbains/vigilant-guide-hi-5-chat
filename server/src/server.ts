import dotenv from "dotenv";
import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./lib/redis.config";
import { instrument } from "@socket.io/admin-ui";

dotenv.config();

const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["https://admin.socket.io", "http://localhost:3000"],
		credentials: true,
		// methods: ["GET", "POST"],
	},
	adapter: createAdapter(redis),
});

instrument(io, {
	auth: false,
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
});

setupSocket(io);

export { io };

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
