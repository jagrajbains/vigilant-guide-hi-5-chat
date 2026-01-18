import DashNav from "@/components/dashboard/DashNav";
import { CustomSession, authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CreateChat from "@/components/groupChat/CreateChat";
import { fetchChatGroups } from "@/fetch/groupFetch";
import GroupChatCard from "@/components/groupChat/GroupChatCard";

export default async function Dashboard() {
	const session: CustomSession | null = await getServerSession(authOptions);
	if (!session?.user?.id) {
		redirect("/");
	}

	const groups: Array<GroupChatType> | [] = await fetchChatGroups(
		session?.user?.token!,
	);

	return (
		<div>
			<DashNav
				name={session?.user?.name!}
				image={session?.user?.image ?? undefined}
			/>
			<div className="container">
				<div className="mt-6 text-end">
					<CreateChat user={session?.user!} />
				</div>

				{/* If Groups */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{groups.length > 0 &&
						groups.map((item, index) => (
							<GroupChatCard group={item} key={index} user={session?.user!} />
						))}
				</div>
			</div>
		</div>
	);
}
