import MainLayout from "../layout/MainLayout";
import HeroSection from "../components/guest/HeroSection";
import AboutSection from "../components/guest/AboutSection";
import ProductList from "../components/guest/ProductList";

import Hero from "../components/guest/Hero";
import { API_BASE_URL } from "../constants/Env";
import PetCarousel from "../components/guest/PetCarousel";
import petService from "../service/petService";
import { useEffect, useState } from "react";
import petProductService from "../service/petProductService";
const Home = () => {
  console.log(API_BASE_URL);
  const [pets, setPets] = useState([]);
  const [petProducts, setPetProducts] = useState([]);
  useEffect(() => {
    const fetchGetListPet = async () => {
      try {
        const res = await petService.getAllPet();
        const res2 = await petProductService.getAllPetProduct();
        const data = res.data;
        const data2 = res2.data;
        setPets(data);
        setPetProducts(data2);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetListPet();
  }, []);
  return (
    <MainLayout>
      <Hero />
      {/* <HeroSection /> */}
      <AboutSection />
      <PetCarousel pets={pets} />
      <ProductList products={petProducts} />
    </MainLayout>
  );
};

export default Home;
