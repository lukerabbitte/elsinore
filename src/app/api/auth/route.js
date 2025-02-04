export async function GET() {
    return new Response(JSON.stringify("Hello Auth"), { status: 200 });
}
