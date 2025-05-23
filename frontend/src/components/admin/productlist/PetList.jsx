// components/PetList.js
import React, { useState } from "react";
import { Row, Col, Pagination } from "antd";
import PetCard from "./PetCard";

const PetList = ({ pets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const start = (currentPage - 1) * pageSize;
  const currentPets = pets.slice(start, start + pageSize);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "flex-start",
        }}
      >
        {currentPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={pets.length}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PetList;
