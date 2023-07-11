import Footer from './components/footer/footer';
import Header from './components/header/Header';
import Index from './components/mainPage/IndexPage';
import LoginPage from './components/mainPage/loginPage/LoginPage';
import SearchRequestPage from './components/mainPage/searchRequestPage/searchResponsePage';
import Documents from './components/mainPage/requestPage';
import {Routes, Route} from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import './styles/globalStyles.css';
import PrivateRoute from './store/privateRoute';
import { useEffect } from 'react';


function App() {
  let stateWindow = useSelector((state: RootState) => state.burgerMenuWindow.value); 
  let expire = JSON.parse(localStorage.getItem('tokenAndDate') || '{}')?.expire;

  useEffect(()=>{
    if(new Date(expire) < new Date()) {
        // нужно хранить токен до тех пор, пока его "срок годности не истечет"
      localStorage.removeItem('tokenAndDate');
    }
  },[expire])
  

  return (
    <div className={stateWindow !== true ? 'main' : 'mainNoScroll'}>
      <Header/>
      <Routes>
        {/* приватные роуты */}
          <Route element={<PrivateRoute/>}>
            <Route path='/responsePage' element={<SearchRequestPage/>}/>
            <Route path='/requestPage' element={<Documents/>}/>
          </Route>

        {/* общедоступные роуты */}
          <Route path='/' element={<Index/>}/>
          <Route path='/login' element={<LoginPage/>}/>
         
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
