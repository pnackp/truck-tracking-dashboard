export async function api_json(ip,type, body_json) {
    try {
        const response = await fetch(ip, {
            method: type,
            headers: { "Content-Type": "application/json" },
            body: body_json
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
