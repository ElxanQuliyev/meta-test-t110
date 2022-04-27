import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/logo.png"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                className="menu-link collapsed"
                to="#submenu1"
                data-bs-target="#submenu1"
                data-bs-toggle="collapse"
                exact={true}
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Actions</span>
              </NavLink>
              <div className="collapse" id="submenu1" aria-expanded="false">
                <ul>
                  <li className="menu-item">
                    <NavLink
                      className="menu-link"
                      to="/actor"
                    >
                      <span className="text">Actors</span>
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink
                      className="menu-link"
                      to="/director"
                    >
                      <span className="text">Directors</span>
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink
                      className="menu-link"
                      to="/platform"
                    >
                      <span className="text">Platform</span>
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink
                      className="menu-link"
                      to="/platform-ref"
                    >
                      <span className="text">Platform üçün kataloq</span>
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink
                      className="menu-link"
                      to="/catalog"
                    >
                      <span className="text">Catalog</span>
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink
                      className="menu-link"
                      to="/addActors"
                    >
                      <span className="text">Plan</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <NavLink
                className="menu-link"
                to="/products"
                data-bs-target="#submenu2"
                data-bs-toggle="collapse"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Movies</span>
              </NavLink>
              <ul id="submenu2" className="collapse">
              <li className="menu-item">
                  <NavLink
                    className="menu-link"
                    to="/products"
                  >
                    <span className="text">Movie List</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    className="menu-link"
                    to="/addMovie"
                  >
                    <span className="text">Add Movie</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <NavLink
                className="menu-link collapsed"
                to="/addSeries"
                data-bs-target="#submenu3"
                data-bs-toggle="collapse"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Series</span>
              </NavLink>
              <ul id="submenu3" className="collapse">
              <li className="menu-item">
                  <NavLink
                    className="menu-link"
                    to="/series"
                  >
                    <span className="text">Series List</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    className="menu-link"
                    to="/addSeries"
                  >
                    <span className="text">Add Series</span>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="menu-item">
              <NavLink
                className="menu-link"
                to="/category"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Categories</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Orders</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Users</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                className="menu-link disabled"
                to="/sellers"
              >
                <i className="icon fas fa-store-alt"></i>
                <span className="text">Sellers</span>
              </NavLink>
            </li> */}

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link disabled"
                to="/transaction"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Transactions</span>
              </NavLink>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
