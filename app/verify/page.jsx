"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";



export default function BlossVerificationPage() {
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState(null);

  const validSerials = [
    "BLS-001SER",
    "BLS-002SER",
    "BLS-003SER",
    "BLS-004SER",
    "BLS-007SER",
    "BLS-008SER",
    "BLS-009SER",
  ];

  const handleVerify = async () => {
  if (!serial) return;

  const { data, error } = await supabase
    .from("serials")
    .select("*")
    .eq("code", serial.trim().toUpperCase())
    .single();

  if (error || !data || !data.is_valid) {
    setStatus("invalid");
    return;
  }

  // αύξηση scan counter
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