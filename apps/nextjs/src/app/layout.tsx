import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider"
import "./globals.css";


export const metadata: Metadata = {
  title: "Geo APP",
  description: "Generated geo processor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>

  );
}
