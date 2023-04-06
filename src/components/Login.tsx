import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <header className="hero flex flex-col items-center justify-center bg-base-100">
      <div className="hero-content flex-col lg:flex-row lg:gap-x-24">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome to MDOC Assistant!</h1>
          <p className="py-6">
            Enter your email address that you gave to Melissa, and you will
            receive a link in your email to sign in.
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              card: "bg-neutral",
              headerTitle: "text-neutral-content",
              headerSubtitle: "text-neutral-content",
              formFieldLabel: "text-neutral-content",
              formFieldInput: "text-base-content bg-base-100",
              formButtonPrimary:
                "bg-primary hover:bg-primary-focus text-primary-content",
              footerAction: "hidden",
              identityPreview: "bg-base-100",
              identityPreviewText: "text-base-content",
              identityPreviewEditButtonIcon: "text-primary",
              formHeaderTitle: "text-neutral-content",
              formHeaderSubtitle: "text-neutral-content",
              formResendCodeLink: "text-primary",
              verificationLinkStatusIcon: "text-primary",
              verificationLinkStatusIconBox: "bg-base-100",
              verificationLinkStatusText: "text-neutral-content",
            },
          }}
        />
      </div>
    </header>
  );
};

export default Login;
