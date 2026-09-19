import { useEffect, useState } from 'react';
import api from '../services/api';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const initialFormState = {
  name: '',
  email: '',
  position: '',
  department: '',
  salary: 0,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailError, setEmailError] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailRegex.test(formData.email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');

    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, formData);
      } else {
        await api.post('/employees', formData);
      }

      setFormData(initialFormState);
      setEditingId(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setFormData({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      salary: employee.salary || 0,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">S</div>
          <div>
            <p className="eyebrow">Syntecxhub</p>
            <h1>People Pulse</h1>
          </div>
        </div>

        <div className="stats-strip">
          <div className="stat-pill">
            <span>Total Staff</span>
            <strong>{employees.length}</strong>
          </div>
          <div className="stat-pill accent">
            <span>Team Status</span>
            <strong>Active</strong>
          </div>
        </div>
      </header>

      <EmployeeForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        editingId={editingId}
        emailError={emailError}
      />

      <section className="employees-section">
        <div className="section-heading">
          <h2>Team Directory</h2>
          <span>{employees.length} profiles</span>
        </div>
        {loading ? <p className="loading-text">Loading employees...</p> : <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />}
      </section>
    </div>
  );
};

export default Dashboard;
