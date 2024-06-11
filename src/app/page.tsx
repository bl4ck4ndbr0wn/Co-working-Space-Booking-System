import { BookingContext, BookingProvider } from "@/context/BookingContext";
import Desk from "@/components/Desk";
import BookingForm from "@/components/BookingForm";
import MembershipTier from "@/components/MembershipTier";
import BookingSummary from "@/components/BookingSummary";
import Discounts, { applyDiscount } from "@/components/Discounts";
import React, { useContext } from "react";

const Home: React.FC = () => {
  const { desks } = useContext(BookingContext);

  return (
    <BookingProvider>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4">
          Co-working Space Booking System
        </h1>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Desks</h2>
            <div className="grid grid-cols-3 gap-4">
              {desks.map((desk) => (
                <Desk
                  key={desk.id}
                  id={desk.id}
                  type={desk.type}
                  isBooked={desk.isBooked}
                  onBook={handleBook}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Book Desk</h2>
            <BookingForm />
          </div>
          <div>
            <MembershipTier />
            <BookingSummary />
            <Discounts />
          </div>
        </div>
      </div>
    </BookingProvider>
  );
};

export default Home;
