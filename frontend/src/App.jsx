import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SavedPage from './pages/SavedPage';
import OffersPage from './pages/OffersPage';
import BookingPage from './pages/BookingPage';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/autentificare" element={<LoginPage />} />
        <Route path="/inregistrare" element={<RegisterPage />} />
        <Route path="/oferte" element={<OffersPage />} />
        <Route
          path="/salvate"
          element={
            <PrivateRoute>
              <SavedPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/rezervare/:id"
          element={
            <PrivateRoute>
              <BookingPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
