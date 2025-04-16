import { Button } from "antd";
import HeroImage from "../../assets/images/HeroImage.png";
import footPetLogo from "../../assets/svgs/footPet.svg";

const Hero = () => (
  <section
    style={{
      backgroundColor: "#F2E2FF",
      maxHeight: "100%",
      position: "relative",
    }}
  >
    <div
      style={{
        maxWidth: 1500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        gap: 32,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          flexDirection: "column",
          gap: "12",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ fontSize: 18, color: "#595959", marginBottom: "32px" }}>
          Welcome to the website to book all your pet care and sales
        </h2>
        <h1
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#410075",
            margin: "0",
          }}
        >
          CHOOSE THE BEST WAY FOR{" "}
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1.5em",
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: "bold",
              margin: "0",
              color: "#A1BE97",
              alignContent: "center",
            }}
          >
            YOUR PET
          </h1>
          <img src={footPetLogo} alt="Logo" style={{}} />
        </div>

        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#410075",
            borderColor: "#410075",
            marginTop: "32px",
          }}
        >
          Book a day to take care of your pet now
        </Button>
      </div>
      <div style={{ flex: 1, position: "relative", marginLeft: "80px" }}>
        <img
          src={HeroImage}
          alt="hero"
          width="100%"
          style={{ padding: "40px", marginLeft: "30px" }}
        />
      </div>
    </div>
  </section>
);
export default Hero;
