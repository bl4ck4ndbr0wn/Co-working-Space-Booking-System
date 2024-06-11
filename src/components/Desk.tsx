import React from "react";

interface DeskProps {
  id: number;
  type: "individual" | "team";
  isBooked: boolean;
  onBook: (id: number) => void;
}

const Desk: React.FC<DeskProps> = ({ id, type, isBooked, onBook }) => {
  return (
    <div
      className={`desk ${type} ${isBooked ? "booked" : ""}`}
      onClick={() => !isBooked && onBook(id)}
    >
      <p>
        {type} Desk {id}
      </p>
      {isBooked && <p>Booked</p>}
    </div>
  );
};

export default Desk;
