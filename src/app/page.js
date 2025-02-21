import HeroSection from "./Components/HeroSection/HeroSection";
import Services from "./Components/Services/Services";
import Choose from "./Components/Choose/Choose";
import Ourworks from "./Components/Ourworks/Ourworks";
import Review from "./Components/Review/Review";
import Contact from "./Components/Contact/Contact";

export default function Home() {
  return (
   <>
   {/* start form here  */}
   <HeroSection/>
   <Services/>
   <Ourworks/>
   <Choose/>
   <Review/>
   <Contact/>
   </>
  );
}
