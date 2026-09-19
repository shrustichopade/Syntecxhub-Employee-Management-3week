const Employee = require('../models/Employee');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch employees',
      error: error.message,
    });
  }
};

exports.createEmployee = async (req, res) => {
  const { name, email, position, department, salary } = req.body;

  if (!name || !email || !position || !department) {
    return res.status(400).json({
      message: 'Name, email, position and department are required.',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: 'Please enter a valid email address.',
    });
  }

  try {
    const employee = await Employee.create({ name, email, position, department, salary });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: 'Could not create employee',
      error: error.message,
    });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, position, department, salary } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      message: 'Please enter a valid email address.',
    });
  }

  try {
    const updatedEmployee = await Employee.update(id, {
      name,
      email,
      position,
      department,
      salary,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update employee',
      error: error.message,
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Employee.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete employee',
      error: error.message,
    });
  }
};
