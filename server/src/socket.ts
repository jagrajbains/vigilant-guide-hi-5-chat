import { Server, Socket } from "socket.io";
import { produceMessage } from "./helper";

interface CustomSocket extends Socket {
	room?: string;
}
export function setupSocket(io: Server) {
	io.use((socket: CustomSocket, next) => {
		const room = socket.handshake.auth.room || socket.handshake.headers.room;
		if (!room) {
			return next(new Error("Invalid room"));
		}
		socket.room = room;
		next();
	});

	io.on("connection", (socket: CustomSocket) => {
    if (socket) {
			console.log("A user connected:", socket.id);
			// * Join the room
			socket.join(socket.room as string);

			socket.on("message", async (data) => {
				console.log("Received message:", data);
				// try {
				// 	await produceMessage("chats", data);
				// } catch (error) {
				// 	console.log("The kafka produce error is", error);
				// }
				socket.to(socket.room as string).emit("message", data);
			});

			socket.on("disconnect", () => {
				console.log("A user disconnected:", socket.id);
			});
		}
	});
}
