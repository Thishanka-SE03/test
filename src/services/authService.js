import { supabase } from "../lib/supabaseClient";

export async function citizenLogin(email, password) {
  // 1️⃣ Authenticate with Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // 2️⃣ Fetch user profile from public.users
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    throw new Error("User profile not found");
  }

  // 3️⃣ Ensure user is Citizen (usertype = 2)
  if (profile.usertype !== 2) {
    await supabase.auth.signOut();
    throw new Error("Unauthorized: Not a citizen account");
  }

  return profile;
}
export async function sendPasswordReset(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://localhost:2000/reset-password",
  });

  if (error) {
    throw new Error(error.message);
  }
}
export const signUpCitizen = async ({
  email,
  password,
  username,
  fullname,
}) => {
  // 1️⃣ Create Supabase Auth user
  const { data: authData, error: authError } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (authError) throw authError;

  const userId = authData.user.id;
  const citizenid = userId; // same UUID

  // 2️⃣ Insert into users table
  const { error: dbError } = await supabase.from("users").insert([
    {
      id: userId,
      email,
      username,
      usertype: 2, // citizen
    },
  ]);

  if (dbError) throw dbError;

  // 3️⃣ Insert into citizen table
  const { error: citizenError } = await supabase.from("citizen").insert([
    {
      fullname,
      citizenid,
    },
  ]);

  if (citizenError) throw citizenError;

  // 4️⃣ Create initial tree status for citizen 🌱
  const { error: treeError } = await supabase.from("treestatus").insert([
    {
      citizenno: citizenid,
      // treecount & treelevel will use DB defaults (0)
    },
  ]);

  if (treeError) throw treeError;

  return authData.user;
};
