import './HomePage.css';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const HomePage = () => {
    return (
        <div className="home">
            <Header />
            <main>
                <h1>Welcome to Our Home Page</h1>
                <p>This is the main page of our application.</p>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
