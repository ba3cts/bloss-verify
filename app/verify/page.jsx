"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function BlossVerificationPage() {
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState(null);

  const handleVerify = async () => {
    if (!serial) return;

    const clean = serial.trim().toUpperCase();

    const { data, error } = await supabase
      .from("serials")
      .select("*")
      .eq("code", clean)
      .single();

    if (error || !data || !data.is_valid) {
      setStatus("invalid");
      return;
    }

    await supabase
      .from("serials")
      .update({ scans: (data.scans || 0) + 1 })
      .eq("id", data.id);

    setStatus("valid");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get("code");
    if (!codeFromUrl) return;

    (async () => {
      const cleanCode = codeFromUrl.trim().toUpperCase();

      const { data, error } = await supabase
        .from("serials")
        .select("*")
        .eq("code", cleanCode)
        .single();

      if (error || !data || !data.is_valid) {
        setSerial(codeFromUrl);
        setStatus("invalid");
        return;
      }

      await supabase
        .from("serials")
        .update({ scans: (data.scans || 0) + 1 })
        .eq("id", data.id);

      setSerial(codeFromUrl);
      setStatus("valid");
    })();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>BLOSS Verification</h1>

      <input
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
        placeholder="Enter serial"
        style={{ padding: 10, marginRight: 10 }}
      />

      <button onClick={handleVerify} style={{ padding: 10 }}>
        Έλεγχος
      </button>

      {status === "valid" && <p style={{ color: "green" }}>Valid</p>}
      {status === "invalid" && <p style={{ color: "red" }}>Invalid</p>}
    </div>
  );
}
