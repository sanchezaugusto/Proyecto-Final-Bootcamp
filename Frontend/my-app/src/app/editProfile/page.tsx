"use client"
import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/673d10ec57366646c59afbb8')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setFormData(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (user) {
      const updatedData = { ...formData, id: user._id, role: user.role };
      const formDataToSend = new FormData();
      formDataToSend.append('id', user._id);
      formDataToSend.append('first_name', updatedData.first_name || '');
      formDataToSend.append('last_name', updatedData.last_name || '');
      formDataToSend.append('username', updatedData.username || '');
      formDataToSend.append('email', updatedData.email || '');
      formDataToSend.append('role', updatedData.role || '');
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      console.log('FormData to be sent:', formDataToSend); // Log the FormData before sending

      fetch('http://localhost:5000/api/users/editUser/673d10ec57366646c59afbb8', {
        method: 'PUT',
        body: formDataToSend,
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
          }
          return response.json();
        })
        .then(data => {
          console.log('Response from server:', data); // Log the response from the server
          setUser(data);
          setEditMode(false);
        })
        .catch(error => {
          console.error('Error updating user data:', error);
          alert(`Error updating user data: ${error.message}`);
        });
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData(user);
      setEditMode(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <img src={formData.image || 'https://via.placeholder.com/150'} alt="User" className="w-24 h-24 rounded-full mr-4" />
        {editMode ? (
          <div className="flex flex-col">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Editar Imagen
          </button>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        {editMode ? (
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{user.first_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Apellido</label>
        {editMode ? (
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{user.last_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre de Usuario</label>
        {editMode ? (
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{user.username}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Correo Electrónico</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{user.email}</p>
        )}
      </div>
      {editMode && (
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
          <button
            onClick={handleCancel}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      )}
      {!editMode && (
        <button
          onClick={() => setEditMode(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Editar Perfil
        </button>
      )}
    </div>
  );
};

export default UserProfile;