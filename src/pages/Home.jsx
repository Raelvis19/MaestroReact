import { useEffect, useState } from 'react';

import { countPeople } from '../services/personService';
import { countSocialNetworks } from '../services/socialNeworkService';
import { countAddresses } from '../services/AddressService';

function Home() {
  const [stats, setStats] = useState({
    people: 0,
    networks: 0,
    addresses: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const people = await countPeople();
      const networks = await countSocialNetworks();
      const addresses = await countAddresses();

      setStats({
        people,
        networks,
        addresses
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mt-5 text-center">
      <h1>Sistema de Gestión de Personas</h1>

      <p className="lead">
        🚧 Plataforma en construcción 🚧
      </p>

      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>👥 Personas</h5>
              <h1>{stats.people}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>📱 Redes Sociales</h5>
              <h1>{stats.networks}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>📍 Direcciones</h5>
              <h1>{stats.addresses}</h1>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-5">
        <div
          className="spinner-border text-primary"
          style={{ width: '4rem', height: '4rem' }}
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <h3 className="mt-3">
          Próximas funcionalidades
        </h3>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            ✅ Gestión de Personas
          </li>

          <li className="list-group-item">
            ✅ Redes Sociales
          </li>

          <li className="list-group-item">
            ✅ Direcciones
          </li>

          <li className="list-group-item">
            🔄 Reportes
          </li>

          <li className="list-group-item">
            🔄 Dashboard Avanzado
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;