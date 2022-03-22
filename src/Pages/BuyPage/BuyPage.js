import React from "react";
import "./BuyPage.scss";
import { Container, Row } from "react-bootstrap";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Pagination } from "@mantine/core";
import BuyContent from "./BuyContent";

const BuyPage = () => {
  return (
    <Container>
      <div className="buy__list">
        <DragHandleIcon /> <p> List view </p>
      </div>

      <Row>
        {/* First Row Content */}

        <BuyContent />

        <BuyContent />

        <BuyContent />

        {/* Second Row */}

        <BuyContent />

        <BuyContent />

        <BuyContent />

        {/* Third Row Content */}

        <BuyContent />

        <BuyContent />

        <BuyContent />

        {/* Fourth Row Content */}

        <BuyContent />

        <BuyContent />

        <BuyContent />
      </Row>

      <div className="buy__pagination">
        <Pagination total={4} color="gray" />;
      </div>
    </Container>
  );
};

export default BuyPage;
