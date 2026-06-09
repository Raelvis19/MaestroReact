import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getPersonById } from '../services/personService';

import {
  getAddressesByPersonId,
  createAddress,
  updateAddress,
  deleteAddress
} from '../services/addressService';

function PersonAddresses() {
  const { id } = useParams();

  const [person, setPerson] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    street: '',
    city: '',
    province: ''
  });

  async function loadDetails() {
    try {
      const personData = await getPersonById(id);
      const addressesData = await getAddressesByPersonId(id);

      setPerson(personData);
      setAddresses(addressesData);
    } catch (error) {
      console.error(error);
      setMessage('Error al cargar las direcciones');
    }
  }

  useEffect(() => {
    loadDetails();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  function clearForm() {
    setForm({
      street: '',
      city: '',
      province: ''
    });

    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.street || !form.city || !form.province) {
      setMessage('Todos los campos son obligatorios');
      return;
    }

    try {
      if (editingId) {
        await updateAddress(editingId, form);
        setMessage('Dirección actualizada correctamente');
      } else {
        await createAddress({
          person_id: Number(id),
          street: form.street,
          city: form.city,
          province: form.province
        });

        setMessage('Dirección agregada correctamente');
      }

      clearForm();
      await loadDetails();
    } catch (error) {
      console.error(error);
      setMessage('Error al guardar la dirección');
    }
  }

  function handleEdit(address) {
    setEditingId(address.id);

    setForm({
      street: address.street,
      city: address.city,
      province: address.province
    });
  }

  async function handleDelete(addressId) {
    const confirmed = window.confirm(
      '¿Deseas eliminar esta dirección?'
    );

    if (!confirmed) return;

    try {
      await deleteAddress(addressId);
      setMessage('Dirección eliminada correctamente');
      await loadDetails();
    } catch (error) {
      console.error(error);
      setMessage('Error al eliminar la dirección');
    }
  }

  return (
    <div className="container mt-4">
      <Link
        to="/personas"
        className="btn btn-secondary mb-3"
      >
        Volver
      </Link>

      <h1>Direcciones</h1>

      {message && (
        <div className="alert alert-info">
          {message}
        </div>
      )}

      {person && (
        <div className="card mb-4">
          <div className="card-header">
            Datos de la persona
          </div>

          <div className="card-body">
            <p>
              <strong>Nombre:</strong> {person.name}
            </p>

            <p>
              <strong>Cédula:</strong> {person.cedula}
            </p>

            <p>
              <strong>Fecha:</strong> {person.birth_date}
            </p>
          </div>
        </div>
      )}

      <div className="card mb-4">
        <div className="card-header">
          {editingId
            ? 'Actualizar dirección'
            : 'Agregar dirección'}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Calle
                </label>

                <input
                  className="form-control"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  placeholder="Ej: Calle Duarte #25"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Ciudad
                </label>

                <input
                  className="form-control"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Ej: San Francisco de Macorís"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Provincia
                </label>

                <input
                  className="form-control"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  placeholder="Ej: Duarte"
                />
              </div>

            </div>

            <button
              className="btn btn-primary me-2"
              type="submit"
            >
              {editingId ? 'Actualizar' : 'Agregar'}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearForm}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Direcciones registradas
        </div>

        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Calle</th>
                <th>Ciudad</th>
                <th>Provincia</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {addresses.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center"
                  >
                    No hay direcciones registradas
                  </td>
                </tr>
              ) : (
                addresses.map((address) => (
                  <tr key={address.id}>
                    <td>{address.street}</td>
                    <td>{address.city}</td>
                    <td>{address.province}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(address)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(address.id)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default PersonAddresses;