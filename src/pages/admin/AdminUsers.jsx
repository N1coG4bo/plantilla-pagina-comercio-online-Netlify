import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Container } from 'react-bootstrap';

const AdminUsers = () => {
  // Datos simulados (en un futuro vendrían de una API)
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@gmail.com', role: 'user', fecha: '12/10/2023' },
    { id: 2, name: 'Maria Admin', email: 'admin@huertohogar.cl', role: 'admin', fecha: '10/10/2023' },
    { id: 3, name: 'Pedro Cliente', email: 'pedro@hotmail.com', role: 'user', fecha: '15/10/2023' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar a este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <Container className="py-4">
      <h2 className="fw-bold text-dark mb-4">Gestión de Usuarios</h2>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <Table hover responsive className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Fecha Registro</th>
                <th className="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="ps-4">#{user.id}</td>
                  <td className="fw-bold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 'admin' ? (
                      <Badge bg="dark">Administrador</Badge>
                    ) : (
                      <Badge bg="secondary">Cliente</Badge>
                    )}
                  </td>
                  <td>{user.fecha}</td>
                  <td className="text-end pe-4">
                    <Button 
                      variant="link" 
                      className="text-danger p-0" 
                      disabled={user.role === 'admin'} // No borrar al admin principal
                      onClick={() => handleDelete(user.id)}
                    >
                      Eliminar 🚫
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default AdminUsers;