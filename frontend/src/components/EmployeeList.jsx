import EmployeeCard from './EmployeeCard';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  if (!employees.length) {
    return <p className="empty-state">No employees found.</p>;
  }

  return (
    <div className="employee-grid">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
