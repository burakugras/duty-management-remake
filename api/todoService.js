const API_BASE_URL = "https://localhost:44318/api/Duties";

export async function getTodosByUserId(userId) {
    const url = `${API_BASE_URL}/GetByUserId?userId=${userId}&PageSize=10`;

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        return data.items;
    } catch (err) {
        console.error("Error fetching todos:", err);
        return [];
    }
}