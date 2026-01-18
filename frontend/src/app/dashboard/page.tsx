import DashNav from "@/components/dashboard/DashNav";
import { CustomSession, authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const session: CustomSession | null = await getServerSession(authOptions);
	if (!session?.user?.id) {
		redirect("/");
	}

	return (
		<div>
			<DashNav
				name={session?.user?.name!}
				image={session?.user?.image ?? undefined}
			/>
		</div>
	);
}
