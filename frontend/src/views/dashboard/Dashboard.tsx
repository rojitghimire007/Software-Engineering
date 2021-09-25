import React from 'react';
import { Link } from 'react-router-dom';
import 'style/Dashboard.css';

const Dashboard = () => {
  const menus: string[] = [
    'Materials Inventory',
    'Welding',
    'Menu 1',
    'Menu 2',
    'Menu 3',
    'Menu 4',
  ];

  const generateMenus = () => {
    return menus.map((item, i) => {
      return (
        <div
          key={i}
          className="menuItem"
          style={{ backgroundColor: `${i % 2 == 0 ? 'gray' : 'brown'}` }}
        >
          {item}
        </div>
      );
    });
  };
  return (
    <div className="dashboard-container">
      <div id="menu">{generateMenus()}</div>
      <div id="options">
        <div className="header">
          <b>Options</b>
        </div>
        <div>
          <ul>
            <Link to="/pipes/add">
              <li>Material Inventory</li>
            </Link>

            <a href="#">
              <li>Option 2</li>
            </a>
            <a href="#">
              <li>Option 3</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
