import { useEffect, useState } from "react";

function TicketsPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("https://fantastic-spoon-5grq775qxqpjcv6vw-3000.app.github.dev/api/locations")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error("Error al obtener las ubicaciones:", error);
      });
  }, []);

  return (
    <div>
      <h1>Tickets Page</h1>

      <h2>Ubicaciones</h2>

      {locations.map((location) => (
        <p key={location.id}>
          {location.name} - {location.type}
        </p>
      ))}
    </div>
  );
}

export default TicketsPage;