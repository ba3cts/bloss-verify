"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function BlossVerificationPage() {
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔎 Manual verify
  const handleVerify = async () => {
    if (!serial) return;

    setLoading(true);

    const cleanCode = serial.trim().toUpperCase();

    const { data, error } = await supabase
      .from("serials")
      .select("*")
      .eq("code", cleanCode)
      .single();

    if (error || !data || !data.is_valid) {
      setStatus("invalid");
      setLoading(false);
      return;
    }

    // αύξηση scan counter
    await supabase
      .from("serials")
      .update({ scans: (data.scans || 0) + 1 })
      .eq("id", data.id);

    setStatus("valid");
    setLoading(false);
  };

  // 🔗 Auto verify από URL ?code=
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get("code");
    if (!codeFromUrl) return;

    setSerial(codeFromUrl);

    (async () => {
      setLoading(true);

      const cleanCode = codeFromUrl.trim().toUpperCase();

      const { data, error } = await supabase
        .from("serials")
        .select("*")
        .eq("code", cleanCode)
        .single();

      if (error || !data || !data.is_valid) {
        setStatus("invalid");
        setLoading(false);
        return;
      }

      await supabase
        .from("serials")
        .update({ scans: (data.scans || 0) + 1 })
        .eq("id", data.id);

      setStatus("valid");
      setLoading(false);
    })();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          background: "#111",
          padding: 32,
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 32, marginBottom: 6 }}>BLOSS</h1>
          <p style={{ color: "#aaa" }}>Έλεγχος Γνησιότητας Προϊόντος</p>
        </div>

        <input
          placeholder="Εισάγετε τον Σειριακό Αριθμό"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            border: "1px solid #333",
            background: "#000",
            color: "white",
          }}
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            background: "#fff",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Έλεγχος..." : "Έλεγχος Προϊόντος"}
        </button>

        {status === "valid" && (
          <div
            style={{
              marginTop: 16,
              padding: 14,
              borderRadius: 10,
              background: "rgba(0,200,0,0.12)",
              border: "1px solid rgba(0,200,0,0.4)",
            }}
          >
            <strong style={{ color: "#4ade80" }}>
              Αυθεντικό Προϊόν BLOSS
            </strong>
          </div>
        )}

        {status === "invalid" && (
          <div
            style={{
              marginTop: 16,
              padding: 14,
              borderRadius: 10,
              background: "rgba(255,0,0,0.12)",
              border: "1px solid rgba(255,0,0,0.4)",
            }}
          >
            <strong style={{ color: "#f87171" }}>
              Ο Σειριακός Αριθμός Δεν Βρέθηκε
            </strong>
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#777",
            marginTop: 24,
          }}
        >
          © BLOSS
        </div>
      </div>
    </div>
  );
}
