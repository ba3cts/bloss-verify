import { supabase } from "@/lib/supabase";
"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";

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
