import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "1% Better",
  description:
    "1% better is an easy and satisying way to see how small increments compound over time. This projects was inspired by James Clear's book Atomic Habits.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plus_jakarta_sans.className}>{children}</body>
    </html>
  );
}
