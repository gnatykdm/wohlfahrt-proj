import './HomePage.css';
import Header from '../../components/header/Header';

const HomePage = () => {
    return (
        <div className="home">
            <Header />
            <h1>Welcome to Our Home Page</h1>
            <p>This is the main page of our application.</p>
        </div>
    );
}

export default HomePage;
