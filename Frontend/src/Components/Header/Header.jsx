import React, { useState } from "react";
import "./Header.css";
import { Search, CircleUser } from "lucide-react";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="Header--Container">
      <div className="Header--Container__ProfileButton">
        <button>
          <CircleUser color="#fff" />
        </button>
      </div>
      <form onSubmit={handleSearch} className="Header--Container__Search">
          <input
            type="search"
            placeholder="Поиск.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <Search color="#808080" />
          </button>
      </form>
    </div>
  );
};

export default Header;