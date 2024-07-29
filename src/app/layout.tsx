import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import "primereact/resources/themes/saga-blue/theme.css"
import "primeicons/primeicons.css"
import 'primereact/resources/primereact.min.css';
import "/node_modules/primeflex/primeflex.css"


export const metadata: Metadata = {
  title: "Dux App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"/>
      </Head>
      <body>{children}</body>
    </html>
  );
}
