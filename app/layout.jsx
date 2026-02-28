import "./globals.css";

export const metadata = {
  title: "BLOSS Verification",
  description: "BLOSS Authenticity Check",
};

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  );
}