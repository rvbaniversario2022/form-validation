import axios from "axios";
import { useRouter } from "next/router";
import nookies from "nookies";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import NavItem from "./NavItem";

const Nav = styled.nav`
  background-color: #1f2937;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 1rem;
`;

const MenuButton = styled.button`
  cursor: pointer;
  color: #d1d5db;
  position: fixed;
  top: 1.25rem;
  right: 1.5rem;
  z-index: 99;
  background: transparent;
  border: transparent;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Menu = styled.div`
  background: #1f2937;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: all ease-in 0.3s;
  transform: translate(100%);

  @media (min-width: 768px) {
    background: transparent;
    position: unset;
    transition: unset;
    transform: unset;
    height: fit-content;
  }
`;

const NavList = styled.ul`
  text-align: center;
  list-style: none;
  margin-top: 5rem;
  margin-bottom: 0;
  showMenu && padding: 0;

  @media (min-width: 768px) {
    display: flex;
    justify-content: end;
    margin: 0;
  }
`;

const ListItem = styled.li`
  margin: 1rem 0;
  padding: 1rem 0;

  &:hover {
    background-color: #374151;
  }

  @media (min-width: 768px) {
  }
`;

const NavLink = styled.a`
  cursor: pointer;
  color: #d1d5db;
  border-radius: 0.25rem;
  transition: all ease-in 0.3s;

  &:hover {
    background-color: #374151;
    color: rgb(255 255 255);
  }
`;

const NavLogo = styled.a`
  color: #6366f1;
  cursor: pointer;
  padding: 0.25rem 1rem;
`;

const MenuList = [
  { text: "Home", href: "/" },
  { text: "Contact", href: "/contact" },
  { text: "Login", href: "/login" },
  { text: "Register", href: "/register" },
  // { text: "Profile", href: "/profile" },
];

const Navbar = (props: any) => {
  const router = useRouter();
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <nav className={`nav`}>
        <Link href="/">
          <a className={`nav__logo`}>LOGIN SYSTEM</a>
        </Link>
        <button
          className={`menu__btn`}
          onClick={() => setNavActive(!navActive)}
        >
          <MenuIcon />
        </button>
        <div className={`${navActive ? "active" : ""} menu`}>
          <div className="nav__list">
            {MenuList.map((menu, idx) => (
              <div
                onClick={() => {
                  setActiveIdx(idx);
                  setNavActive(false);
                }}
                key={menu.text}
              >
                <NavItem active={activeIdx === idx} {...menu} />
              </div>
            ))}
            <Link href="/profile">
              <a className={`nav__link`}>Profile</a>
            </Link>
            <Link href="/">
              <a className={`nav__link`} onClick={logout}>
                Logout
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
