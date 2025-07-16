import './FaqPage.css';
import Header from '../../components/header/Header';

const FaqPage = () => {
    return (
        <div className="faq">
            <Header />
            <h1>Frequently Asked Questions</h1>
            <div className="faq-item">
                <h2>What is this application about?</h2>
                <p>This application provides information and resources on various topics.</p>
            </div>
            <div className="faq-item">
                <h2>How can I contact support?</h2>
                <p>You can reach out to our support team via the contact page.</p>
            </div>
            <div className="faq-item">
                <h2>Where can I find more information?</h2>
                <p>Check out our about page for more details about our mission and team.</p>
            </div>
        </div>
    );
}

export default FaqPage;
