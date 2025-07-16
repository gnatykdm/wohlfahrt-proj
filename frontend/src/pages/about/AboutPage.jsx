import './AboutPage.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const AboutPage = () => {
    return (
        <div className="about">
            <Header />
            <main>
                <h1>About Us</h1>
                <p>This is the about page of our application.</p>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
