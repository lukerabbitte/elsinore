import { supabase } from "@/lib/supabase";

export async function GET() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: "luke.rabbitte@gmail.com",
        password: "Octopus9909",
    });

    if (error) {
        console.error("Auth error:", error);
        return;
    }

    console.log("Bearer Token:", data.session.access_token);
}
