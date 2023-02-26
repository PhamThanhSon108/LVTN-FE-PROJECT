import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Redux/store';
import { Provider } from 'react-redux';
import BackToTop from './components/Button/BackToTop';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();
ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BackToTop />
            <App />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,

    document.getElementById('root'),
);
