import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "TransportPro - India's Best Truck Service",
  description: "Book trucks online for all India transport services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased bg-white dark:bg-black text-gray-900 dark:text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
