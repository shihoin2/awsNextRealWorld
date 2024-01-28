import React, { ReactNode } from "react";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" href="/">
            conduit
          </Link>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* Add "active" class when you're on that page" */}
              <Link className="nav-link active" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/create">
                {" "}
                <i className="ion-compose" />
                &nbsp;New Article{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/settings">
                {" "}
                <i className="ion-gear-Link" />
                &nbsp;Settings{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/profile/{id}">
                <img src="" className="user-pic" />
                Eric Simons
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
