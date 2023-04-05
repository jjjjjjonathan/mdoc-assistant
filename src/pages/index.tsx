import { type NextPage } from "next";
import Head from "next/head";
import { SignIn, SignOutButton, useUser } from "@clerk/nextjs";

const Home: NextPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <>
      <Head>
        <title>MDOC Assistant | League1 Ontario</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {isLoaded && (
          <div>
            {!isSignedIn && (
              <SignIn
                appearance={{
                  elements: {
                    card: "bg-base-300",
                    headerTitle: "text-base-content",
                    headerSubtitle: "text-base-content",
                    formFieldLabel: "text-base-content",
                    formFieldInput: "text-base-content bg-base-100",
                    formButtonPrimary:
                      "bg-primary hover:bg-primary-focus text-primary-content",
                    footerAction: "hidden",
                  },
                }}
              />
            )}
            {isSignedIn && (
              <>
                <p>{user.fullName}</p>
                <SignOutButton />
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
