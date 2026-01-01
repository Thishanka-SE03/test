import { supabase } from "../../../lib/supabaseClient";

export const fetchCitizenAddress = async (userId) => {
  if (!userId) return "";

  const { data, error } = await supabase
    .from("citizen")
    .select("address")
    .eq("citizenid", userId)
    .single();

  if (error) return "";
  return data?.address || "";
};

export const updateUserProfile = async ({
  userId,
  username,
  email,
  address,
  photoFile,
  currentPhotoPath,
}) => {
  if (!userId) throw new Error("User ID missing");
  if (!username?.trim() || !email?.trim())
    throw new Error("Username and email required");

  let photoUrl = currentPhotoPath;

  if (photoFile) {
    const ext = photoFile.name.split(".").pop();
    const path = `public/${userId}/profile.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(path, photoFile, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("profile-photos").getPublicUrl(path);

    photoUrl = data.publicUrl;
  }

  const { error: userError } = await supabase
    .from("users")
    .update({
      username: username.trim(),
      email: email.trim(),
      userphotopath: photoUrl,
    })
    .eq("id", userId);

  if (userError) throw userError;

  const { data: citizen } = await supabase
    .from("citizen")
    .select("citizenid")
    .eq("citizenid", userId)
    .single();

  if (!citizen) {
    const { error } = await supabase.from("citizen").insert({
      citizenid: userId,
      fullname: username.trim(),
      address: address?.trim() || null,
      totalpoints: 0,
    });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("citizen")
      .update({ address: address?.trim() || null })
      .eq("citizenid", userId);
    if (error) throw error;
  }

  return photoUrl;
};
export const fetchTreeCount = async (userId) => {
  if (!userId) return 0;

  const { data, error } = await supabase
    .from("treestatus")
    .select("treecount")
    .eq("citizenno", userId)
    .single();

  if (error) {
    // Common cases: no row, table missing, wrong column, permission denied
    if (error.code === "PGRST116") {
      // No row found (single() expects exactly one)
      return 0;
    }
    console.warn("Tree count fetch error:", error.message);
    return 0;
  }

  return data?.treecount || 0;
};
