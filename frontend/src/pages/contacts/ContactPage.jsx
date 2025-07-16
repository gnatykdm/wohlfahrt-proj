import './ContactPage.css';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ContactForm from '../../components/form/ContactForm';

const ContactPage = () => {
    return (
        <div className="contact">
            <Header />
            <main>
                <h1>Contact Us</h1>
                <p>If you have any questions, feel free to reach out!</p>
                <ContactForm />
            </main>
        </div>
    );
}

export default ContactPage;
