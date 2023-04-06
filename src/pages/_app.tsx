import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Navbar from "~/components/Navbar";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <div className="flex min-h-screen flex-col justify-between">
        <Navbar />
        <Component {...pageProps} />
        <div />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
