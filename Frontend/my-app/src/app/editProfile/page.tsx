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
    <div className='bg-gray-100 min-h-[80vh] flex flex-col items-center justify-center'>


      <div className="max-w-4xl mx-auto p-12 bg-white rounded-2xl shadow-lg grid justify-items-center items-center justify-center grid-cols-3 gap-2">
        {/* Primera columna: Imagen de perfil */}
        <div className="flex flex-col items-center">
          <img
            src={formData.image || 'https://via.placeholder.com/150'}
            alt="User"
            className="size-64 rounded-full border-4 border-gray-200 shadow-md mb-4"
          />
          {editMode ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 text-white rounded-md shadow-xl hover:scale-110 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} enableBackground="new 0 0 32 32" viewBox="0 0 32 32" id="edit">
                <path d="M12.82373,12.95898l-1.86279,6.21191c-0.1582,0.52832-0.01367,1.10156,0.37646,1.49121c0.28516,0.28516,0.66846,0.43945,1.06055,0.43945c0.14404,0,0.28906-0.02051,0.43066-0.06348l6.2124-1.8623c0.23779-0.07129,0.45459-0.2002,0.62988-0.37598L31.06055,7.41016C31.3418,7.12891,31.5,6.74707,31.5,6.34961s-0.1582-0.7793-0.43945-1.06055l-4.3501-4.34961c-0.58594-0.58594-1.53516-0.58594-2.12109,0L13.2002,12.3291C13.02441,12.50488,12.89551,12.7207,12.82373,12.95898z M15.58887,14.18262L25.6499,4.12109l2.22852,2.22852L17.81738,16.41113l-3.18262,0.9541L15.58887,14.18262z"></path>
                <path d="M30,14.5c-0.82861,0-1.5,0.67188-1.5,1.5v10c0,1.37891-1.12158,2.5-2.5,2.5H6c-1.37842,0-2.5-1.12109-2.5-2.5V6c0-1.37891,1.12158-2.5,2.5-2.5h10c0.82861,0,1.5-0.67188,1.5-1.5S16.82861,0.5,16,0.5H6C2.96729,0.5,0.5,2.96777,0.5,6v20c0,3.03223,2.46729,5.5,5.5,5.5h20c3.03271,0,5.5-2.46777,5.5-5.5V16C31.5,15.17188,30.82861,14.5,30,14.5z"></path>
              </svg>
            </button>
          )}
        </div>

        {/* Segunda columna: Nombre y Apellido */}
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-semibold">Nombre</label>
            {editMode ? (
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-500 font-medium">{user.first_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-semibold">Apellido</label>
            {editMode ? (
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-500 font-medium">{user.last_name}</p>
            )}
          </div>
        </div>

        {/* Tercera columna: Nombre de Usuario y Correo Electrónico */}
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-semibold">Nombre de Usuario</label>
            {editMode ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-500 font-medium">{user.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-semibold">Correo Electrónico</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-500 font-medium">{user.email}</p>
            )}
          </div>
        </div>

        {/* Segunda fila: Botones */}
        <div className="col-span-full w-full flex justify-end space-x-4 mt-6">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#2a2a2a] text-white rounded-md hover:bg-gray-800 shadow-md"
              >
                Guardar Cambios
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 shadow-md"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-[#2a2a2a] text-white rounded-md hover:bg-gray-800 shadow-md"
            >
              Editar Perfil
            </button>
          )}
        </div>


      </div>


    </div>

  );
};

export default UserProfile;