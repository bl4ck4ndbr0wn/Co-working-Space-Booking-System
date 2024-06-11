"use client";
import React, { createContext, useState, useEffect } from "react";
import { Desk, Booking, Revenue } from "@prisma/client";

interface BookingContextProps {
  desks: Desk[];
  bookings: Booking[];
  totalAmount: number;
  totalRevenue: number;
  bookDesk: (id: number, hours: number) => void;
}

const BookingContext = createContext<BookingContextProps>({
  desks: [],
  bookings: [],
  totalAmount: 0,
  totalRevenue: 0,
  bookDesk: () => {},
});

const BookingProvider: React.FC = ({ children }) => {
  const [desks, setDesks] = useState<Desk[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchDesks = async () => {
      try {
        const response = await fetch("/api/desks");
        const data = await response.json();
        setDesks(data);
      } catch (error) {
        console.error("Error fetching desks:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    const fetchRevenue = async () => {
      try {
        const response = await fetch("/api/revenue");
        const data: Revenue = await response.json();
        setTotalRevenue(data._sum.amount);
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    };

    fetchDesks();
    fetchBookings();
    fetchRevenue();
  }, []);

  const bookDesk = async (id: number, hours: number) => {
    try {
      // Send booking data to the server
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deskId: id,
          userId: 1, // Assuming a static user ID for now
          hours,
          amount: calculateAmount(hours), // You can implement this function based on your logic
        }),
      });
      if (!response.ok) {
        throw new Error("Unable to book desk.");
      }

      // Update desks after successful booking
      setDesks((prevDesks) =>
        prevDesks.map((desk) =>
          desk.id === id ? { ...desk, isBooked: true } : desk
        )
      );

      // You might want to update totalAmount here as well if needed
    } catch (error) {
      console.error("Error booking desk:", error);
    }
  };

  return (
    <BookingContext.Provider
      value={{ desks, bookings, totalAmount, totalRevenue, bookDesk }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingProvider };
