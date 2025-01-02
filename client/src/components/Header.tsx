import { useState } from "react";
import { AccountCircle, Login, Logout, AccountBox } from "@mui/icons-material";
import { NavLink } from "react-router";
import { links } from "../constants";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { isAuthorized, logout } = useAuth();

  return (
    <nav className="w-full h-20 fixed top-0 flex justify-between items-center bg-primary px-10 z-20">
      <NavLink to="/">
        <img src="/images/logo.png" alt="Logo" className="h-14 w-14" />
      </NavLink>

      {/* Hamburger Menu for Mobile */}
      <button
        className="lg:hidden text-white"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center">
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.url}
            className={({ isActive }) =>
              isActive
                ? "bg-secondary text-white px-4 py-2 rounded-2xl mx-3"
                : "text-white mx-3"
            }
          >
            {link.id}
          </NavLink>
        ))}
      </div>

      {/* Profile Menu */}
      <Menu as="div" className="relative">
        <MenuButton>
          <AccountCircle sx={{ color: "white", fontSize: "3rem" }} />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="absolute w-40 flex flex-col bg-secondary mt-2 px-5 py-2 rounded-md shadow-level5 z-50 text-white"
        >
          <MenuItem>
            <NavLink
              to="/profile"
              className="w-full flex items-center justify-between gap-2 hover:underline"
            >
              <p>Profile</p>
              <AccountBox sx={{ color: "white", fontSize: "1.5rem" }} />
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/profile"
              className="w-full flex items-center justify-between gap-2 hover:underline"
            >
              <p>Login</p>
              <Login sx={{ color: "white", fontSize: "1.5rem" }} />
            </NavLink>
          </MenuItem>
          <MenuItem>
            <>
              {isAuthorized && (
                <div className="w-full flex items-center justify-between gap-2 hover:underline">
                  <button onClick={logout}>
                    <p>Logout</p>
                  </button>
                  <Logout sx={{ color: "white", fontSize: "1.5rem" }} />
                </div>
              )}
            </>
          </MenuItem>
        </MenuItems>
      </Menu>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-primary flex flex-col items-center lg:hidden z-20 shadow-md">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.url}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-4 py-2 rounded-2xl my-2"
                  : "text-white px-4 py-2 hover:text-gray-300"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.id}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
