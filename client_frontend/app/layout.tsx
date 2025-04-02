import "./globals.css";
import React from "react";
import { ApolloProviderWrapper } from "./ApolloProviderWrapper";
import { SocketProviderWrapper } from "./SocketProviderWrapper";

export const metadata = {
  title: "Calendo | Nish Patel",
  description: "Notion Calendar Clone designed by Nish Patel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/calendo.jpg" />
        <meta name="apple-mobile-web-app-title" content="Calendo" />
      </head>
      <body>
        <SocketProviderWrapper>
          <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
        </SocketProviderWrapper>
      </body>
    </html>
  );
}
