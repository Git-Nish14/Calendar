"use client";

import "./globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Debug to ensure client-side execution
  if (typeof window === "undefined") {
    console.error("This component is being executed on the server!");
  } else {
    console.log("This component is being executed on the client.");
  }

  // Create an HTTP link
  const httpLink = createHttpLink({
    // uri: 'https://fxw7gnq5-4000.inc1.devtunnels.ms/graphql',
    uri: "http://localhost:4000/graphql",
  });

  // Add token from cookies to the headers
  const authLink = setContext((_, { headers }) => {
    // Retrieve token from cookies using js-cookie
    const token = Cookies.get("token"); // Gets the 'token' cookie value

    // Return headers with the token (without 'Bearer')
    return {
      headers: {
        ...headers,
        Authorization: token ? `${token}` : "",
      },
    };
  });

  // Create Apollo Client with authLink and httpLink
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
