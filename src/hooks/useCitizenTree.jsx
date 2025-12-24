import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
export default function useCitizenTree(citizenId) {
  const [treeLevel, setTreeLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!citizenId) return;

    const fetchTree = async () => {
      const { data, error } = await supabase
        .from("treestatus")
        .select("treelevel")
        .eq("citizenno", citizenId)
        .single();

      if (error) {
        console.error("Tree fetch error:", error);
        setTreeLevel(0);
      } else {
        setTreeLevel(Number(data.treelevel)); // 0–100
      }

      setLoading(false);
    };

    fetchTree();
  }, [citizenId]);

  return { treeLevel, loading };
}
