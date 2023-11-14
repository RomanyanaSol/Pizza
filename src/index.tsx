import ReactDOM from 'react-dom/client';
import App from './components/index.tsx';
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root')as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);


