import { OrderSummaryComp } from "../../components";
import BookingConfirmation from '../../components/BookingConfirmation/BookingConfirmation';
import { useHotel } from '../../context';
import "./OrderSummary.css";

export const OrderSummary = () => {
  const { hotel } = useHotel();
  return (
    <main className="order-summary-main">
      {hotel && hotel.orderId ? <BookingConfirmation booking={hotel} /> : <OrderSummaryComp />}
    </main>
  );
};
