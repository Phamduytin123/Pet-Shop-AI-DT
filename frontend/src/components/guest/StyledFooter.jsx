import { Footer } from "antd/es/layout/layout";
import logo from "../../assets/svgs/logo.svg";
import catFoot from "../../assets/images/catFoot.png";
import inboxLogo from "../../assets/svgs/inboxLogo.svg";
import phoneLogo from "../../assets/svgs/phoneLogo.svg";
import instagramLogo from "../../assets/svgs/instagramLogo.svg";
import facebookLogo from "../../assets/svgs/facebookLogo.svg";
import LinkedLogo from "../../assets/svgs/LinkedLogo.svg";
export default function StyledFooter() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Wave SVG */}
      <div
        style={{
          top: 0,
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{
            display: "block",
            width: "100%",
            height: "150px", // Kéo cao sóng lên
          }}
        >
          {/* Nền trắng phía sau */}
          <rect width="100%" height="100%" fill="#ffffff" />
          <path
            fill="#F1E0FF"
            fillOpacity="1"
            d="M0,96L48,101.3C96,107,192,117,288,133.3C384,149,480,171,576,170.7C672,171,768,149,864,128C960,107,1056,85,1152,90.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Footer content */}
      <Footer
        style={{
          backgroundColor: "#F1E0FF",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          gap: "10em",
        }}
      >
        <div className="information" style={{ flex: 1, paddingLeft: "5em" }}>
          <img src={logo} alt="" />
          <p>
            Welcome to Cuddle & Care Pets! We provide quality pet products,
            grooming, and care advice for your furry friends.
          </p>
          <div
            className="group-infor"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0",
              alignContent: "center",
            }}
          >
            <div
              className="group-infor-inner"
              style={{ display: "flex", gap: "0.2em", alignContent: "center" }}
            >
              <img src={inboxLogo} />
              <p>phamtin482003@gmail.com</p>
            </div>
            <div
              className="group-infor-inner"
              style={{
                display: "flex",
                gap: "0.2em",
                alignContent: "center",
                flex: 1,
              }}
            >
              <img src={inboxLogo} />
              <p>duytin04082003@gmail.com</p>
            </div>
            <div
              className="group-infor-inner"
              style={{ display: "flex", gap: "0.2em", alignContent: "center" }}
            >
              <img src={phoneLogo} />
              <p>+84999555666</p>
            </div>
            <div
              className="group-infor-inner"
              style={{
                display: "flex",
                gap: "0.2em",
                alignContent: "center",
              }}
            >
              <img src={phoneLogo} />
              <p>+84965582649</p>
            </div>
          </div>
          <div
            className="group-icon"
            style={{ display: "flex", gap: "1.8em", alignContent: "center" }}
          >
            <img src={instagramLogo} />
            <img src={facebookLogo} />
            <img src={LinkedLogo} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <img src={catFoot} alt="" style={{ maxWidth: 400 }} />
        </div>
        <div
          className="group2"
          style={{ display: "flex", paddingRight: "5em", gap: "1em", flex: 1 }}
        >
          <div className="service" style={{ flex: 1 }}>
            <h4>Service</h4>
            <p>Pet care</p>
            <p>Special Program</p>
            <p>Security program</p>
          </div>
          <div className="website" style={{ flex: 1 }}>
            <h4>Website</h4>
            <p>About</p>
            <p>Service</p>
            <p>Discovery</p>
            <p>Shop</p>
            <p>Contact</p>
          </div>
        </div>
      </Footer>
    </div>
  );
}
