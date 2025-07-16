import './ServicePage.css';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const ServicesPage = () => {
    return (
        <div className="services">
            <Header />
            <main>
                <h1>Our Services</h1>
                <p>Explore the various services we offer to our clients.</p>
            </main>
            <Footer />
        </div>
    );
}


export default ServicesPage;
