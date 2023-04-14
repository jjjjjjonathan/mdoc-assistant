import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { api } from "~/utils/api";
import Navbar from "~/components/Navbar";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <ClerkProvider {...pageProps}>
        <div className="flex min-h-screen flex-col justify-between">
          <Navbar />
          <Component {...pageProps} />
          <div />
        </div>
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
