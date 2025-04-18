import logo from "../../img/logo_horizontal.png";
import { Link } from "react-router-dom";
import AvatarDropdownMenu from "../common/AvatarDropdownMenu";
const Navbar = () => {
  return (
    <div className="bg-[#E2E8F0] dark:bg-slate-700 text-white px-5 flex justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} width={149} height={64} alt="JoyEng logo"></img>
      </Link>
      <AvatarDropdownMenu />
    </div>
  );
};

export default Navbar;
