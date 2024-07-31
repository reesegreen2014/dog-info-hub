import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AllBreeds from './components/AllBreeds/AllBreeds';
import BreedDetails from './components/BreedDetails/BreedDetails';
import MyFavorites from './components/MyFavorites/MyFavorites';
import OwnerResources from './components/OwnerResources/OwnerResources';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import './App.css';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-breeds" element={<AllBreeds />} />
          <Route path='/breed/:id' element={<BreedDetails />} />
          <Route path='/favorites' element={<MyFavorites />} />
          <Route path='/resources' element={<OwnerResources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
