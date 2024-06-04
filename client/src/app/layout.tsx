import { Header } from "@/widgets/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../shared/styles/global.scss'
import ReduxToolkitProvider from "@/shared/providers/reduxToolkit";
import { GetUser } from "@/entities/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxToolkitProvider>
          <GetUser/>
        <Header/>
        {children}
        </ReduxToolkitProvider>
        </body>
    </html>
  );
}