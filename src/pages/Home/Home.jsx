import Banner from "../../components/Banner/BAnner";
import Testimonials from "../../components/Testimonial/Testimonial";
import Services from "../Services/Services";


const Home = () => {
    return (
        <div>
            <Banner/>
            <Services/>
            <Testimonials/>
        </div>
    );
};

export default Home;