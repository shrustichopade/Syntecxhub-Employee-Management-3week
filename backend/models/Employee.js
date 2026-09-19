const db = require('../config/db');

let memoryEmployees = [];
let nextMemoryId = 1;

const isDbAvailable = async () => {
  try {
    if (!db || typeof db.execute !== 'function') {
      return false;
    }

    await db.execute('SELECT 1');
    return true;
  } catch (error) {
    return false;
  }
};

class Employee {
  static async getAll() {
    if (!(await isDbAvailable())) {
      return [...memoryEmployees].sort((a, b) => b.id - a.id);
    }

    const [rows] = await db.execute(
      'SELECT * FROM employees ORDER BY id DESC'
    );
    return rows;
  }

  static async create(employeeData) {
    const { name, email, position, department, salary } = employeeData;

    if (!(await isDbAvailable())) {
      const newEmployee = {
        id: nextMemoryId++,
        name,
        email,
        position,
        department,
        salary: Number(salary) || 0,
      };

      memoryEmployees.push(newEmployee);
      return newEmployee;
    }

    const [result] = await db.execute(
      'INSERT INTO employees (name, email, position, department, salary) VALUES (?, ?, ?, ?, ?)',
      [name, email, position, department, Number(salary) || 0]
    );

    return {
      id: result.insertId,
      name,
      email,
      position,
      department,
      salary: Number(salary) || 0,
    };
  }

  static async update(id, employeeData) {
    const { name, email, position, department, salary } = employeeData;

    if (!(await isDbAvailable())) {
      const index = memoryEmployees.findIndex((employee) => employee.id === Number(id));

      if (index === -1) {
        return null;
      }

      memoryEmployees[index] = {
        ...memoryEmployees[index],
        name,
        email,
        position,
        department,
        salary: Number(salary) || 0,
      };

      return memoryEmployees[index];
    }

    const [result] = await db.execute(
      'UPDATE employees SET name = ?, email = ?, position = ?, department = ?, salary = ? WHERE id = ?',
      [name, email, position, department, Number(salary) || 0, id]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return { id, ...employeeData };
  }

  static async delete(id) {
    if (!(await isDbAvailable())) {
      const previousLength = memoryEmployees.length;
      memoryEmployees = memoryEmployees.filter((employee) => employee.id !== Number(id));
      return previousLength !== memoryEmployees.length;
    }

    const [result] = await db.execute('DELETE FROM employees WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Employee;
