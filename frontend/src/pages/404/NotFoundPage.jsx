import './NotFoundPage.less';
import NotFoundImage from '../../assets/img/404.png';

const NotFoundPage = () => {
    return (
        <div class="page-content">
            <div className="not-found-section">
                <div className="wrapper">
                    <img className="image" src={NotFoundImage} alt="Page Not Found" />
                    <h1 className="title">Страница не найдена</h1>
                    <div className="actions">
                        <router-link className="btn-primary" to="/">
                            <span className="fas fa-home"></span>
                            <span>На главную</span>
                        </router-link>
                    </div>
                </div>      
            </div>
        </div>
    );
};

export default NotFoundPage;