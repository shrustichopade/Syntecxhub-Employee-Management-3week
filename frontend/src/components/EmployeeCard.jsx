const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="employee-card">
      <div className="card-header">
        <h3>{employee.name}</h3>
        <span className="badge">{employee.department}</span>
      </div>

      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Position:</strong> {employee.position}
      </p>
      <p>
        <strong>Salary:</strong> ${Number(employee.salary || 0).toFixed(2)}
      </p>

      <div className="card-actions">
        <button onClick={() => onEdit(employee)} className="secondary-btn">
          Edit
        </button>
        <button onClick={() => onDelete(employee.id)} className="danger-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
