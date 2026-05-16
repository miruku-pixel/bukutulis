"use server";

interface AuthPayload {
    username?: string;
    password?: string;
}

export async function authenticate(endpoint: string, payload: AuthPayload) {
    const { username, password } = payload;
    const baseUrl = process.env.AUTH_BASE_URL;
    const internalUser = process.env.AUTH_INTERNAL_USER;
    const internalPass = process.env.AUTH_INTERNAL_PASS;

    if (!baseUrl || !internalUser || !internalPass) {
        return { status: 0, message: "Server configuration error: Required environment variables are missing" };
    }

    const targetUrl = `${baseUrl}${endpoint}`;

    try {
        // Step 1: Get Token using internal credentials
        const authHeader = Buffer.from(`${internalUser}:${internalPass}`).toString("base64");
        const tokenResponse = await fetch(targetUrl, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${authHeader}`
            },
            cache: "no-store",
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.status !== 1 || !tokenData.data?.token) {
            return { status: 0, message: tokenData.message || "Failed to obtain internal authentication token" };
        }

        const internalToken = tokenData.data.token;

        // Step 2: Login using the obtained token and user credentials
        const formData = new FormData();
        if (username) formData.append("username", username);
        if (password) formData.append("password", password);

        const loginResponse = await fetch(targetUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${internalToken}`
            },
            body: formData,
            cache: "no-store",
        });

        const loginData = await loginResponse.json();
        return { ...loginData, token: internalToken };

    } catch (error) {
        console.error("Auth action error:", error);
        return { status: 0, message: "Authentication service error occurred" };
    }
}
