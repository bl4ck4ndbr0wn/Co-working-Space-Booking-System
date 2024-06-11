import React, { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

const BookingSummary: React.FC = () => {
  const { totalAmount } = useContext(BookingContext);

  return (
    <div>
      <h3>Booking Summary</h3>
      <p>Total Charged: ${totalAmount}</p>
    </div>
  );
};

export default BookingSummary;
