/// Components
import Index from './jsx/index';
// action
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import './other/swiper/css/swiper-bundle.min.css';
import "./other/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import axios from 'axios';

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