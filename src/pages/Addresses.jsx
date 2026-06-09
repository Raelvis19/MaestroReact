import { useEffect, useState } from 'react';
import { getAddresses } from '../services/AddressService';

function Addresses() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    loadAddresses();
  }, []);

  async function loadAddresses() {
    try {
      const data = await getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mt-4">
      <h1>Todas las direcciones</h1>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Calle</th>
            <th>Ciudad</th>
            <th>Provincia</th>
            <th>Persona</th>
          </tr>
        </thead>

        <tbody>
          {addresses.map((address) => (
            <tr key={address.id}>
              <td>{address.street}</td>
              <td>{address.city}</td>
              <td>{address.province}</td>
              <td>{address.people?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Addresses;