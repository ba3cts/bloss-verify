
"use client";
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

  const handleVerify = () => {
    if (!serial) return;
    if (validSerials.includes(serial.trim().toUpperCase())) {
      setStatus("valid");
    } else {
      setStatus("invalid");
    }
  };

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"white",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
      <div style={{maxWidth:"520px",width:"100%",background:"#111",padding:"32px",borderRadius:"20px",boxShadow:"0 20px 60px rgba(0,0,0,0.6)"}}>
        <div style={{textAlign:"center",marginBottom:"24px"}}>
          <h1 style={{fontSize:"32px",marginBottom:"6px"}}>BLOSS</h1>
          <p style={{color:"#aaa"}}>Έλεγχος Γνησιότητας Προϊόντος</p>
        </div>

        <input
          placeholder="Εισάγετε τον Σειριακό Αριθμό (π.χ. BLS-001SER)"
          value={serial}
          onChange={(e)=>setSerial(e.target.value)}
          style={{width:"100%",padding:"12px",marginBottom:"12px",borderRadius:"10px",border:"1px solid #333",background:"#000",color:"white"}}
        />

        <button
          onClick={handleVerify}
          style={{width:"100%",padding:"12px",borderRadius:"10px",border:"none",background:"#fff",color:"#000",fontWeight:"bold",cursor:"pointer"}}
        >
          Έλεγχος Προϊόντος
        </button>

        {status === "valid" && (
          <div style={{marginTop:"16px",padding:"14px",borderRadius:"10px",background:"rgba(0,200,0,0.12)",border:"1px solid rgba(0,200,0,0.4)"}}>
            <strong style={{color:"#4ade80"}}>Αυθεντικό Προϊόν BLOSS</strong>
            <div style={{fontSize:"14px",color:"#ccc"}}>
              Το φουλάρι έχει επιβεβαιωθεί ως γνήσιο.
            </div>
          </div>
        )}

        {status === "invalid" && (
          <div style={{marginTop:"16px",padding:"14px",borderRadius:"10px",background:"rgba(255,0,0,0.12)",border:"1px solid rgba(255,0,0,0.4)"}}>
            <strong style={{color:"#f87171"}}>Ο Σειριακός Αριθμός Δεν Βρέθηκε</strong>
            <div style={{fontSize:"14px",color:"#ccc"}}>
              Ελέγξτε τον κωδικό ή επικοινωνήστε με την BLOSS.
            </div>
          </div>
        )}

        <div style={{textAlign:"center",fontSize:"12px",color:"#777",marginTop:"24px"}}>
          © BLOSS
        </div>
      </div>
    </div>
  );
}
