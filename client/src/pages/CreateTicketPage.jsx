
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

  try {
    console.log("formData enviado:", formData);
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

    console.log("Ticket creado:", data);
  } catch (error) {
    console.error("Error al crear el ticket:", error);
  }
}

  return (
    <div>
      <h1>Crear ticket</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Nombre del cliente</label>

          <input
            id="customerName"
            name="customerName"
            type="text"
            value={formData.customerName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="customerPhone">Teléfono</label>

          <input
            id="customerPhone"
            name="customerPhone"
            type="text"
            value={formData.customerPhone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="customerEmail">Email</label>

          <input
            id="customerEmail"
            name="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="productName">Producto</label>

          <input
            id="productName"
            name="productName"
            type="text"
            value={formData.productName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="budget">Presupuesto</label>

          <input
            id="budget"
            name="budget"
            type="number"
            step="0.01"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="issueDescription">
            Descripción del problema
          </label>

          <textarea
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="branchId">Sucursal</label>

          <select
            id="branchId"
            name="branchId"
            value={formData.branchId}
            onChange={handleChange}
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
          <label htmlFor="memberId">Empleado</label>

          <select
            id="memberId"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
          >
            <option value="">Seleccionar empleado</option>

            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Crear ticket</button>
      </form>
    </div>
  );
}

export default CreateTicketPage;
