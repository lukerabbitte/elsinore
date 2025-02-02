// GET request to fetch all highlights
export async function GET() {
    try {

        return new Response(JSON.stringify("Hello World"), { status: 200 });
    } catch (error) {
        return new Response("Error helloing world", { status: 500 });
    }
}