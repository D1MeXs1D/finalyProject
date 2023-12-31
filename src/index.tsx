import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import  store  from './store/store';
import { persistor}  from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
        <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
           <App />
        </PersistGate>
           
        </BrowserRouter>
  </Provider>
);


