import './HomePage.css';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PageBanner from '../../components/banner/PageBanner';

const HomePage = () => {
    return (
        <div className="home">
            <Header />
            <PageBanner />
            <main>
                <h1>Welcome to Our Home Page</h1>
                <p>This is the main page of our application.</p>
            </main>
        </div>
    );
}

export default HomePage;
