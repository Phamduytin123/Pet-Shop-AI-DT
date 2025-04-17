import MainLayout from "../layout/MainLayout";
import HeroSection from "../components/guest/HeroSection";
import AboutSection from "../components/guest/AboutSection";
import ProductList from "../components/guest/ProductList";
import Testimonials from "../components/guest/Testimonials";
import Hero from "../components/guest/Hero";
import { API_BASE_URL } from "../constants/Env";
const Home = () => {
  console.log(API_BASE_URL);

  return (
    <MainLayout>
      <Hero />
      <HeroSection />
      <AboutSection />
      <ProductList />
      <Testimonials />
    </MainLayout>
  );
};

export default Home;
