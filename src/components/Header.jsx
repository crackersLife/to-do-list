import CompanyLogo from "./common/CompanyLogo";
import { memo } from "react";
import './../styles/header.css';

const Header = function Header() {
    return(
        <header className='logoWrapper'>
            <CompanyLogo />
        </header>
    );
}

export default memo(Header);