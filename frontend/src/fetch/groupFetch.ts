import { CHAT_GROUP, CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";

export async function fetchChatGroups(token: string) {
	const res = await fetch(CHAT_GROUP, {
		headers: {
			Authorization: token,
		},
		next: {
			revalidate: 60 * 60,
			tags: ["dashboard"],
		},
	});

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}
	const response = await res.json();
	if (response?.data) {
		return response?.data;
	}
	return [];
}

export async function fetchChatGroup(id: string, token: string) {
	const res = await fetch(`${CHAT_GROUP}/${id}`, {
		cache: "no-cache",
		headers: {
			Authorization: token,
		},
	});

	if (!res.ok) {
		const response1 = await res.json();
		console.log("Fetch Chat Group Response:", response1);
		throw new Error("Failed to fetch data");
	}
	const response = await res.json();
	if (response?.data) {
		return response?.data;
	}
	return null;
}

export async function fetchChatGroupUsers(id: string, token: string) {
	const res = await fetch(`${CHAT_GROUP_USERS}?group_id=${id}`, {
		cache: "no-cache",
		headers: {
			Authorization: token,
		},
	});

	if (!res.ok) {
		const response1 = await res.json();
		console.log("Fetch Chat Group Users Response:", response1);
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}
	const response = await res.json();
	if (response?.data) {
		return response?.data;
	}
	return [];
}
