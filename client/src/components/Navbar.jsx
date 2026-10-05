import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-50 bg-gray-900">

      <div className="flex flex-col gap-3 p-4">
        <NavLink to="/dashboard" className="rounded px-4 py-2 text-left text-white hover:bg-gray-700">
          Dashboard
        </NavLink>

        <NavLink to="/tickets" className="rounded px-4 py-2 text-left text-white hover:bg-gray-700">
          Tickets
        </NavLink>

        <NavLink to="/tickets/new" className="rounded px-4 py-2 text-left text-white hover:bg-gray-700">
          Create Ticket
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;