// app/layout.tsx
import "./globals.css";
import React from "react";
import { ApolloProviderWrapper } from "./ApolloProviderWrapper";
import { SocketProviderWrapper } from "./SocketProviderWrapper";

export const metadata = {
  title: "Calendo",
  description: "Notion Calendar Clone",
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
      </head>
      <body>
        <SocketProviderWrapper>
          <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
        </SocketProviderWrapper>
      </body>
    </html>
  );
}
