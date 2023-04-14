import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100">
      <div className="navbar-start">
        <DarkModeToggle />
      </div>
      <div className="navbar-center">
        <Link href="/">
          <Image
            src="/leagueLogo150px.png"
            alt="League1 Ontario logo"
            width={42}
            height={42}
          />
        </Link>
      </div>
      <div className="navbar-end items-center gap-x-2">
        {isSignedIn && (
          <>
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-10 rounded-full">
                  <Image
                    src="/profilePlaceholder.jpg"
                    alt="jonathan cheng"
                    width={200}
                    height={200}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
