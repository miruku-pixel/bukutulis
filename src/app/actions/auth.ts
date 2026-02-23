"use server";

interface AuthPayload {
    username?: string;
    password?: string;
    token?: string;
    mode: "token" | "login";
}

export async function authenticate(endpoint: string, payload: AuthPayload) {
    const { username, password, token, mode } = payload;
    const baseUrl = process.env.AUTH_BASE_URL;

    if (!baseUrl) {
        return { status: 0, message: "Server configuration error: Base URL is not defined" };
    }

    const targetUrl = `${baseUrl}${endpoint}`;
    const headers: Record<string, string> = {};
    let body: FormData | null = null;

    try {
        if (mode === "token") {
            const auth = Buffer.from(`${username}:${password}`).toString("base64");
            headers["Authorization"] = `Basic ${auth}`;
        } else if (mode === "login") {
            headers["Authorization"] = `Bearer ${token}`;
            const formData = new FormData();
            if (username && password) {
                formData.append("username", username);
                formData.append("password", password);
            }
            body = formData;
        } else {
            return { status: 0, message: "Invalid authentication mode" };
        }

        const response = await fetch(targetUrl, {
            method: "POST",
            headers: headers,
            body: body,
            cache: "no-store",
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Auth action error:", error);
        return { status: 0, message: "Authentication service error occurred" };
    }
}
