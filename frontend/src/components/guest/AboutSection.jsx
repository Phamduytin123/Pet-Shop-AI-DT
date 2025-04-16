// src/components/AboutSection.jsx
import { Button, Card, Typography } from "antd";
import bigCatImage from "../../assets/images/blackCatAbout.png";
import AnimalTag from "../AnimalTag";
import "../../assets/scss/AnimalTag.scss";
import CatTagImage1 from "../../assets/images/CatTag1.png";
import CatTagImage2 from "../../assets/images/CatTag2.png";
import Ribbon from "antd/es/badge/Ribbon";
const AboutSection = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "row",
        maxHeight: "100%",
        position: "relative",
        gap: "15em",
        justifyContent: "space-around",
        alignContent: "center",
      }}
    >
      <div
        className="about-content"
        style={{
          // flex: 1,
          marginLeft: "184px",
          paddingRight: "60px",
          width: "800px",
        }}
      >
        <h2>OUR COMPANY</h2>
        <h3>About us</h3>
        <p>
          With 10 years of experience in the field of pet care and a team of
          experienced veterinarians, we are confident we can protect your pets
          from diseases they will get in the future. their nutrition and daily
          food intake.
        </p>
        <p>
          Loving and pampering your pet is not enough, it must also go hand in
          hand with their health and our service is where you can give your full
          trust.
        </p>
        <h3>About consulting</h3>
        <p>
          Each pet species has a different habitat and behavior, so meet and
          consult directly with an animal specialist.
        </p>
        <h3>Our Service </h3>
        <div style={{ display: "flex", gap: "5em" }}>
          <div className="pet-card-wrapper">
            <Card className="pet-card">
              <div className="card-content">
                <h3>Physical checkup your pet</h3>
                <p>Regular physical checkups are essential for maintain...</p>
                <Button type="primary" className="read-more-btn">
                  Read More
                </Button>
              </div>
              <img
                src={CatTagImage1} // ảnh con chó
                alt="pet"
                className="pet-image"
              />
            </Card>
          </div>
          <div className="pet-card-wrapper">
            <Card className="pet-card">
              <div className="card-content">
                <h3>Physical checkup your pet</h3>
                <p>Regular physical checkups are essential for maintain...</p>
                <Button type="primary" className="read-more-btn">
                  Read More
                </Button>
              </div>
              <img
                src={CatTagImage2} // ảnh con chó
                alt="pet"
                className="pet-image"
                style={{
                  height: "250px",
                  maxWidth: "150",
                  top: "-55px",
                  position: "absolute",
                  zIndex: "2",
                }}
              />
            </Card>
          </div>
        </div>
      </div>
      <div className="about-image" style={{ flex: 1, paddingLeft: "85px" }}>
        <img
          src={bigCatImage}
          alt=""
          style={{ width: "600px", height: "700px", objectFit: "cover" }}
        />
      </div>
    </section>
  );
};

export default AboutSection;
