"use client";

import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function BlossVerificationPage() {
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState(null);

  // 🔎 Manual verify
  const handleVerify = async () => {
    if (!serial) return;

    const clean = serial.trim().toUpperCase();

    const { data, error } = await supabase
      .from("serials")
      .select("*")
      .eq("code", clean)
      .single();

    console.log("MANUAL DATA:", data);
    console.log("MANUAL ERROR:", error);


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

  // 🔗 Auto verify από URL (?code=...)
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

      console.log("AUTO DATA:", data);
      console.log("AUTO ERROR:", error);

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
  <div className="bloss-wrapper">
    <div className="bloss-card">
      <h1 className="bloss-title">BLOSS Verification</h1>

      <p className="bloss-subtitle">
        Enter your product code to verify authenticity
      </p>

      <input
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
        placeholder="Enter serial code"
        className="bloss-input"
      />

      <button onClick={handleVerify} className="bloss-button">
        Verify Product
      </button>

      {status === "valid" && (
        <p className="bloss-valid">✓ Authentic Product</p>
      )}

      {status === "invalid" && (
        <p className="bloss-invalid">✕ Invalid Code</p>
      )}
    </div>
  </div>
);
}