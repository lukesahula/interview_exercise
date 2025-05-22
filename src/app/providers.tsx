"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/lib/store";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  );
};

export default Providers;
