import { NavLink } from "react-router";
import { Facebook, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center bg-primary py-10 px-10">
      <NavLink to="/">
        <img src="/images/logo.png" alt="Logo" className="h-14 w-14" />
      </NavLink>
      <div>
        <Facebook sx={{ color: "white", fontSize: "2rem" }} />
        <Instagram sx={{ color: "white", fontSize: "2rem" }} />
      </div>
    </footer>
  );
};

export default Footer;
