import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import moneyImage from "../assets/front2.avif"; 

const Home = () => {
  return (
    <div>
      {/* Internal CSS */}
      <style>
        {`
          body {
            background: linear-gradient(135deg, #ffffff, #f8f9fa, #eef1f6);
          }

          .home-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 85vh; /* Adjust height */
          }

          .text-section {
            text-align: left;
            max-width: 500px;
          }

          .main-title {
            font-size: 2.5rem;
            font-weight: bold;
            color: #333;
          }

          .subtitle {
            font-size: 1.3rem;
            color: #555;
          }

          .side-text {
            font-size: 1rem;
            color: #777;
            margin-top: 10px;
          }

          .image-section img {
            max-width: 100%;
            height: auto;
          }
        `}
      </style>

      {/* Home Page Content */}
      <Container className="home-container">
        <Row className="align-items-center">
          {/* Left Text Section */}
          <Col md={6} className="text-section">
            <h2 className="main-title">It’s not about how much you make, but how well you manage it.</h2>
            <p className="subtitle">Simple way to manage personal finances</p>
            </Col>

          {/* Right Image Section */}
          <Col md={6} className="image-section">
            <img src={moneyImage} alt="Finance Management" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
