import { useEffect, useState } from "react";

function TicketsPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(
      "https://fantastic-spoon-5grq775qxqpjcv6vw-3000.app.github.dev/api/tickets"
    )
      .then((response) => response.json())
      .then((data) => {
        setTickets(data);
      })
      .catch((error) => {
        console.error("Error al obtener los tickets:", error);
      });
  }, []);

  return (
    <div>
      <h1>Tickets</h1>

      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <h2>{ticket.ticket_number}</h2>
          <p>Cliente: {ticket.customer_name}</p>
          <p>Producto: {ticket.product_name}</p>
          <p>Estado: {ticket.status}</p>
          <p>Presupuesto: ${ticket.budget}</p>
        </div>
      ))}
    </div>
  );
}

export default TicketsPage;