import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import Link from "next/link";

export default function GroupChatCard({
	group,
	user,
}: {
	group: GroupChatType;
	user: CustomUser;
}) {
	return (
		<Card>
			<CardHeader className="flex-row justify-between items-center ">
				<CardTitle className="text-2xl">
					<Link href={`/chat/${group.id}`}>{group.title}</Link>
				</CardTitle>
				<GroupChatCardMenu user={user} group={group} />
			</CardHeader>
			<CardContent>
				<p>
					Passcode :-<strong>{group.passcode}</strong>
				</p>
				<p>Created At :-{new Date(group.createdAt).toDateString()}</p>
			</CardContent>
		</Card>
	);
}
