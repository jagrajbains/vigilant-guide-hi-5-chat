import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

class ChatsController {
	static async index(req: Request, res: Response) {
		const { groupId } = req.params;
		const chats = await prisma.chats.findMany({
			where: {
				group_id: groupId as string,
			},
		});
		return res.json({ data: chats });
	}
}

export default ChatsController;
