// components/PetList.js
import React, { useState } from "react";
import { Row, Col, Pagination } from "antd";
import PetProductCard from "./PetProductCard";

const PetProductList = ({ petDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  //   console.log(petDetails);

  const start = (currentPage - 1) * pageSize;
  const currentpetDetails = petDetails.slice(start, start + pageSize);

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
        {currentpetDetails.map((pet) => (
          <PetProductCard key={pet.id} petProduct={pet} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={petDetails.length}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PetProductList;
