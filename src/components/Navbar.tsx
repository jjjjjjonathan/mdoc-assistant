import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn-ghost btn text-xl normal-case">MDOC Assistant</a>
      </div>
      <div className="navbar-end items-center gap-x-2">
        <div>hello {!isSignedIn && <span>NOT SIGNED IN</span>} name</div>
        <div className="dropdown dropdown-end">
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
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
