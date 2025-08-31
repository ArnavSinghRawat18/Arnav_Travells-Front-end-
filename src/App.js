import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home,
  SingleHotel,
  SearchResults,
  Wishlist,
  Payment,
  OrderSummary
} from "./pages";
import AuthPage from './pages/AuthPage/AuthPage';
import { ErrorBoundary } from './components';
import "./App.css";
import useSwipe from './utils/useSwipe';
import { useFilter } from './context';
import { useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const filter = useFilter();
  const navigate = useNavigate();

  useSwipe({
    onLeft: () => filter.filterDispatch({ type: 'SHOW_FILTER_MODAL' }),
    onRight: () => navigate('/wishlists')
  });

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/hotels/:name/:address/:id/reserve"
              element={<SingleHotel />}
            />
            <Route path="/hotels/:address" element={<SearchResults />} />
            <Route path="/wishlists" element={<Wishlist />} />
            <Route path="/confirm-booking/stay/:id" element={<Payment />} />
            <Route path="/order-summary" element={<OrderSummary />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
