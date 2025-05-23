import React from "react";
import { Menu } from "antd";
import "../../../assets/scss/Sidebar.scss";
import { useState } from "react";

const Sidebar = ({ breeds = [], onFilterChange }) => {
  const [selectedBreeds, setSelectedBreeds] = useState(["all"]);

  const handleSelect = ({ key }) => {
    if (key === "all") {
      setSelectedBreeds(["all"]);
      onFilterChange([]);
    } else {
      const newSelected = selectedBreeds.filter((k) => k !== "all");
      const updated = [...new Set([...newSelected, key])];
      setSelectedBreeds(updated);
      onFilterChange(updated);
    }
  };

  const handleDeselect = ({ key }) => {
    const updated = selectedBreeds.filter((item) => item !== key);
    const final = updated.length === 0 ? ["all"] : updated;
    setSelectedBreeds(final);
    onFilterChange(final.includes("all") ? [] : final);
  };
  return (
    <Menu
      mode="inline"
      style={{
        height: "100%",
        borderRight: 2,
        background: "F2E2FF",
        maxHeight: "500px",
        overflow: "auto",
      }}
      multiple={true}
      selectedKeys={selectedBreeds}
      onSelect={handleSelect}
      onDeselect={handleDeselect}
      className="custom-sidebar"
    >
      <Menu.Item key="all">All breeds</Menu.Item>
      {breeds.map((breed) => (
        <Menu.Item key={breed}>{breed}</Menu.Item>
      ))}
    </Menu>
  );
};

export default Sidebar;
