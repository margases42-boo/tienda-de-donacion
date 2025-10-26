 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa los componentes de las páginas
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Marketplace from './pages/marketplace/Marketplace';
import ProductPage from './pages/marketplace/ProductPage';
import DonatePage from './pages/donations/DonatePage';
import CartPage from './pages/marketplace/CartPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StoreSetup from './pages/user/StoreSetup';
import NewProductPage from './pages/marketplace/NewProductPage';
import StorePage from './pages/marketplace/StorePage';
import DonationHistoryPage from "./pages/DonationHistoryPage";
import SalesStats from './pages/user/SalesStats';
import UserProfile from './pages/user/UserProfile';
import MoneyDonation from './pages/admin/MoneyDonation';

// Importa componentes comunes de la interfaz (Header, Footer, etc.)
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Marketplace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/new-product" element={<NewProductPage />} />
          <Route path="/store/:storeId" element={<StorePage />} />
         <Route path="/historial-donaciones" element={<DonationHistoryPage />} />
          <Route path='/cuenta-del-usuario' element={<UserProfile/>}/>
          
          {/* Rutas de usuario autenticado (requiere protección) */}
          <Route path="/mi-tienda" element={<StoreSetup />} />
          <Route path="/vender" element={<NewProductPage />} />
          <Route path="/mis-ventas" element={<SalesStats />} />

          {/* Rutas de administrador (requiere protección) */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/donacion-monetaria' element={<MoneyDonation/>} />

          {/* Manejo de rutas no encontradas */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;