import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Redux/store';
import { Provider } from 'react-redux';
import BackToTop from './components/Button/BackToTop';

ReactDOM.render(
    <Provider store={store}>
        <div class="pyro">
            <div class="before"></div>
            <div class="after"></div>
        </div>
        <BackToTop />
        <App />
    </Provider>,

    document.getElementById('root'),
);
