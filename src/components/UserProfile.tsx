import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState({
    username: '',
    idNumber: '',
    idType: '',
    phoneNumber: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/bank/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user data');
        console.error(err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(`http://localhost:5001/bank/users/${userId}`, user);
      alert('Perfil actualizado con éxito');
    } catch (err) {
      setError('Error updating profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <h1>{user.username}</h1>
          <p>ID: {user.idNumber} - {user.idType}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="profile-section">
          <h2>Datos Personales</h2>
          <div className="profile-card">
            <div className="mb-4">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="idNumber" className="form-label">ID</label>
              <input
                type="text"
                className="form-control"
                id="idNumber"
                name="idNumber"
                value={user.idNumber}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="idType" className="form-label">Tipo ID</label>
              <select
                className="form-control"
                id="idType"
                name="idType"
                value={user.idType}
                onChange={handleInputChange}
                required
                disabled={loading}
              >
                <option value=""> </option>
                <option value="Física">Física</option>
                <option value="Jurídica">Jurídica</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="form-label">Número de teléfono</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="address"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Cargando...' : 'Actualizar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
