
import { useEffect, useState } from "react";

function CreateTicketPage() {
  const [branches, setBranches] = useState([]);
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    productName: "",
    budget: "",
    issueDescription: "",
    branchId: "",
    memberId: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://fantastic-spoon-5grq775qxqpjcv6vw-3000.app.github.dev/api/locations"
    )
      .then((response) => response.json())
      .then((data) => {
        const branchLocations = data.filter(
          (location) => location.type === "BRANCH"
        );

        setBranches(branchLocations);
      })
      .catch((error) => {
        console.error("Error al obtener las sucursales:", error);
        setError("No se pudieron cargar las sucursales.");
      });

    fetch(
      "https://fantastic-spoon-5grq775qxqpjcv6vw-3000.app.github.dev/api/branch-members"
    )
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error("Error al obtener los empleados:", error);
        setError("No se pudieron cargar los empleados.");
      });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "https://fantastic-spoon-5grq775qxqpjcv6vw-3000.app.github.dev/api/tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear el ticket.");
      }

      console.log("Ticket creado:", data);

      setMessage(`Ticket ${data.ticket_number} creado correctamente.`);

      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        productName: "",
        budget: "",
        issueDescription: "",
        branchId: "",
        memberId: "",
      });
    } catch (error) {
      console.error("Error al crear el ticket:", error);
      setError(error.message);
    }
  }

  return (
    <div className="min-h-full bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Crear ticket
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Registra un producto para enviarlo al taller.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                Información del cliente
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Ingresa los datos de contacto del cliente.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="customerName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Nombre del cliente
                  </label>

                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customerPhone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Teléfono
                  </label>

                  <input
                    id="customerPhone"
                    name="customerPhone"
                    type="text"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="customerEmail"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-1.5 text-xs text-gray-500">
                    Debes proporcionar teléfono o email.
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200" />

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                Información del producto
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Describe el producto y el problema que presenta.
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <label
                    htmlFor="productName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Producto
                  </label>

                  <input
                    id="productName"
                    name="productName"
                    type="text"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="issueDescription"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Descripción del problema
                  </label>

                  <textarea
                    id="issueDescription"
                    name="issueDescription"
                    rows="4"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    required
                    className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Presupuesto
                  </label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>

                    <input
                      id="budget"
                      name="budget"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-2.5 pl-7 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200" />

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                Información de la sucursal
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Indica desde qué sucursal se está creando el ticket y qué
                empleado lo registró.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="branchId"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Sucursal
                  </label>

                  <select
                    id="branchId"
                    name="branchId"
                    value={formData.branchId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Seleccionar sucursal</option>

                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="memberId"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Empleado
                  </label>

                  <select
                    id="memberId"
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Seleccionar empleado</option>

                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <div className="flex justify-end border-t border-gray-200 pt-6">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                Crear ticket
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicketPage;

