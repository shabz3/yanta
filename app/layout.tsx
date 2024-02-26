import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/navbar/Navbar";
import { v4 as uuidv4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | yanta",
    default: "yanta",
  },
  description:
    "The fast and simplistic note-jotting app, made for all your impromptu notes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const newId = uuidv4();
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          <NavBar newNoteUuid={newId} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
