import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
	name: string;
	email: string;
	oauth_id: string;
	provider: string;
	image?: string;
}

class AuthController {
	static async login(req: Request, res: Response) {
		try {
      console.log("Login request body:", req.body);
			const body: LoginPayloadType = req.body;
			let foundUser = await prisma.users.findUnique({
				where: {
					email: body.email,
				},
			});
			if (!foundUser) {
				foundUser = await prisma.users.create({
					data: req.body,
				});
			}
			console.log("Found or created user:", foundUser);
			const jwtPayload = {
				name: body.name,
				email: body.email,
				id: foundUser.id,
			};
			const token = jwt.sign(
				jwtPayload,
				process.env.JWT_SECRET || "default_secret",
				{ expiresIn: "365d" },
			);
			return res.status(200).json({
				message: "Login successful",
				user: {
					...foundUser,
					token: `Bearer ${token}`,
				},
			});
		} catch (error) {
			return res.status(500).json({ message: "Error during login", error });
		}
	}
}

export default AuthController;
