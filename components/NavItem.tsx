import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  text: string;
  href: string;
  active: boolean;
}

const NavItem = ({ text, href, active }: Props) => {
  return (
    <>
      {/* {text === "logout" ? (
        <Link href={href}>
          <a className={`nav__link`} onClick={logout}>
            {text}
          </a>
        </Link>
      ) : (
        <Link href={href}>
          <a className={`nav__link`}>{text}</a>
        </Link>
      )} */}

      <Link href={href}>
        <a className={`nav__link`}>{text}</a>
      </Link>
    </>
  );
};

export default NavItem;

{
  /* <Link href="/contact">
    <a className={`nav__link`}>Contact</a>
  </Link>
  <Link href="/login">
    <a className={`nav__link`}>Login</a>
  </Link>
  <Link href="/register">
    <a className={`nav__link`}>Register</a>
  </Link>
  <Link href="/profile">
    <a className={`nav__link`}>Profile</a>
  </Link>
  <Link href="/logout">
    <a className={`nav__link`}>Logout</a>
  </Link> */
}
