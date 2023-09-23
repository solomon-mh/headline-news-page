import Link from "next/link";
import "./mainHeader.css";
import React from "react";
import NavLink from "./NavLink";
const MainHeader = () => {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <NavLink href='/news'>News</NavLink>
        </li>
        <li>
          <NavLink href='/archive'>Archive</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainHeader;
