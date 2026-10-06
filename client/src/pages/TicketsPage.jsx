import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://fantastic-spoon-5grq775qxqpjcv6vw-3000.app.github.dev/api/tickets"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los tickets.");
        }

        return response.json();
      })
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los tickets:", error);
        setError("No se pudieron cargar los tickets.");
        setLoading(false);
      });
  }, []);

  function formatDate(date) {
    return new Date(date).toLocaleString("es-UY", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Tickets
          </h1>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">Cargando tickets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Tickets
          </h1>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Tickets
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Selecciona un ticket para ver sus detalles.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
            {tickets.length}
          </span>
        </div>

        {tickets.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="font-medium text-gray-900">
              No hay tickets registrados.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Los tickets creados aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/tickets/${ticket.id}`}
                className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition active:scale-[0.99] hover:border-gray-300 hover:shadow-md sm:p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      ID
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      #{ticket.id}
                    </p>
                  </div>

                  <div className="min-w-0 flex-1 sm:ml-8">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Producto
                    </p>

                    <p className="mt-1 truncate text-base font-medium text-gray-900">
                      {ticket.product_name}
                    </p>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Creado
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {formatDate(ticket.created_at)}
                    </p>
                  </div>

                  <span className="shrink-0 text-xl text-gray-400 sm:hidden">
                    ›
                  </span>
                </div>

                <div className="mt-3 border-t border-gray-100 pt-3 sm:hidden">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Creado
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {formatDate(ticket.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketsPage;
