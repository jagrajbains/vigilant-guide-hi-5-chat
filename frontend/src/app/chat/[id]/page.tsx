import {
	authOptions,
	CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";

import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function chat({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const session: CustomSession | null = await getServerSession(authOptions);
	if (!session?.user?.id) {
		redirect("/");
	}
	if (id.length !== 36) {
		return notFound();
	}

	const chatGroup: GroupChatType | null = await fetchChatGroup(
		id,
		session?.user?.token!,
	);
	if (chatGroup === null) {
		return notFound();
	}
	const chatGroupUsers: Array<GroupChatUserType> | [] =
		await fetchChatGroupUsers(id, session?.user?.token!);
	const chats: Array<MessageType> | [] = await fetchChats(
		id,
		session?.user?.token!,
	);

	return (
		<div>
			<ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
		</div>
	);
}
