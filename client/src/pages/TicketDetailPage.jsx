import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function TicketDetailPage() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `https://fantastic-spoon-5grq775qxqpjcv6vw-3000.app.github.dev/api/tickets/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ticket no encontrado.");
        }

        return response.json();
      })
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el ticket:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  function formatDate(date) {
    return new Date(date).toLocaleString("es-UY", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function getStatusLabel(status) {
    const labels = {
      SENT_TO_WORKSHOP: "Enviado al taller",
      IN_WORKSHOP: "En taller",
      RETURNING_TO_BRANCH: "Regresando a sucursal",
      RECEIVED_AT_BRANCH: "Recibido en sucursal",
      READY_FOR_PICKUP: "Listo para retirar",
      DELIVERED: "Entregado",
    };

    return labels[status] || status;
  }

  function getRepairStatusLabel(status) {
    const labels = {
      PENDING: "Pendiente",
      IN_REPAIR: "En reparación",
      REPAIRED: "Reparado",
      NOT_REPAIRABLE: "No reparable",
    };

    return labels[status] || status;
  }

  function getStatusClasses(status) {
    const classes = {
      SENT_TO_WORKSHOP: "bg-yellow-100 text-yellow-800",
      IN_WORKSHOP: "bg-blue-100 text-blue-800",
      RETURNING_TO_BRANCH: "bg-orange-100 text-orange-800",
      RECEIVED_AT_BRANCH: "bg-purple-100 text-purple-800",
      READY_FOR_PICKUP: "bg-green-100 text-green-800",
      DELIVERED: "bg-gray-100 text-gray-700",
    };

    return classes[status] || "bg-gray-100 text-gray-700";
  }

  function getRepairStatusClasses(status) {
    const classes = {
      PENDING: "bg-gray-100 text-gray-700",
      IN_REPAIR: "bg-blue-100 text-blue-800",
      REPAIRED: "bg-green-100 text-green-800",
      NOT_REPAIRABLE: "bg-red-100 text-red-800",
    };

    return classes[status] || "bg-gray-100 text-gray-700";
  }

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">Cargando ticket...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/tickets"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Volver a tickets
          </Link>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/tickets"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Volver a tickets
        </Link>

        <div className="mt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Ticket #{ticket.id}
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {ticket.ticket_number}
              </h1>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                ticket.status
              )}`}
            >
              {getStatusLabel(ticket.status)}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Información del cliente
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Nombre
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {ticket.customer_name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Teléfono
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {ticket.customer_phone || "No especificado"}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Email
                </p>
                <p className="mt-1 break-words text-sm text-gray-900">
                  {ticket.customer_email || "No especificado"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Producto
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Producto
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {ticket.product_name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Problema
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-900">
                  {ticket.issue_description}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Presupuesto
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  ${ticket.budget}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Reparación
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Estado de reparación
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${getRepairStatusClasses(
                    ticket.repair_status
                  )}`}
                >
                  {getRepairStatusLabel(ticket.repair_status)}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Comentario del taller
                </p>

                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-900">
                  {ticket.repair_comment || "Sin comentarios todavía"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Información del ticket
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  ID
                </p>
                <p className="mt-1 text-sm text-gray-900">{ticket.id}</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Número
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {ticket.ticket_number}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Sucursal ID
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {ticket.branch_id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Empleado ID
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {ticket.created_by_member_id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Creado
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(ticket.created_at)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Última actualización
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(ticket.updated_at)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailPage;

