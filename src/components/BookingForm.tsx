"use client";
import React, { useState, useContext } from "react";
import { BookingContext } from "../context/BookingContext";

const BookingForm: React.FC = () => {
  const [selectedDesk, setSelectedDesk] = useState<number | null>(null);
  const [hours, setHours] = useState(1);
  const { bookDesk } = useContext(BookingContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedDesk !== null) {
      bookDesk(selectedDesk, hours);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Desk ID:
        <input
          type="number"
          value={selectedDesk ?? ""}
          onChange={(e) => setSelectedDesk(parseInt(e.target.value))}
          required
        />
      </label>
      <label>
        Hours:
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          required
          min="1"
        />
      </label>
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;
