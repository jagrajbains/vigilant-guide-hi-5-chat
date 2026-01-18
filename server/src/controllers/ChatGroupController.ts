import { Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import type { ChatGroup } from '../generated/prisma/client';

class ChatGroupController {
	static async create(req: Request, res: Response) {
		try {
      console.log("Creating chat group with body:", req.body, "and user:", req.user);
			const body = req.body;
			const user = req.user;

			const chatgroup = await prisma.chatGroup.create({
				data: {
					title: body.title,
					passcode: body.passcode,
					user_id: user?.id as number,
				},
			});

			return res.status(201).json(chatgroup);
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	}

	static async index(req: Request, res: Response) {
		try {
			const user = req.user;
			let groups: ChatGroup[] | null = [];
			if (user) {
				groups = await prisma.chatGroup.findMany({
					where: {
						user_id: user.id,
					},
					orderBy: {
						createdAt: "desc",
					},
				});
			}
			return res.json({ data: groups });
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Something went wrong.please try again!" });
		}
	}

	static async show(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (id) {
				const group: ChatGroup | null = await prisma.chatGroup.findUnique({
					where: {
						id: id as string,
					},
				});
				return res.json({ data: group });
			}

			return res.status(404).json({ message: "No groups found" });
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Something went wrong.please try again!" });
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const body = req.body;
			if (id) {
				await prisma.chatGroup.update({
					data: body,
					where: {
						id: id as string,
					},
				});
				return res.json({ message: "Group updated successfully!" });
			}

			return res.status(404).json({ message: "No groups found" });
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Something went wrong.please try again!" });
		}
	}

	static async destroy(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await prisma.chatGroup.delete({
				where: {
					id: id as string,
				},
			});
			return res.json({ message: "Chat Deleted successfully!" });
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Something went wrong.please try again!" });
		}
	}
}

export default ChatGroupController;
