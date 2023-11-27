/// Components
import Index from './jsx/index';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
// action
import { checkAutoLogin, isLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import './other/swiper/css/swiper-bundle.min.css';
import "./other/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { Login } from './jsx/pages/Login';


function App(props) {
  
    return (
        <>
            <Index />
        </>

    )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

// export default withRouter(connect(mapStateToProps)(App)); 
export default App