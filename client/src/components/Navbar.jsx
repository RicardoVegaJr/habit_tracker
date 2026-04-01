import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ stats }) {
  return (
    <nav className="navbar">
      <Link className="brand-mark" to="/">
        <span className="brand-kicker">Front End Only</span>
        <strong>Deadline Habit Tracker</strong>
      </Link>
      <div className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </div>
      <div className="nav-summary">
        <span>{stats.total} tasks</span>
        <span>{stats.overdue} overdue</span>
      </div>
    </nav>
  );
}

export default Navbar;
