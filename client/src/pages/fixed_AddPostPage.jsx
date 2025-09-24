import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('automatic');
  const [engine, setEngine] = useState('');
  const [fuel, setFuel] = useState('gasoline');
  const [drive, setDrive] = useState('');
  const [model, setModel] = useState('');
  const [numberPlate, setNumberPlate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !text || !price || !mileage || !image) {
      alert('Будь ласка, заповніть усі обовʼязкові поля');
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(mileage))) {
      alert("Ціна та пробіг мають бути числовими");
      return;
    }

    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('price', price.toString());
      data.append('mileage', mileage.toString());
      data.append('transmission', transmission);
      data.append('engine', engine);
      data.append('fuel', fuel);
      data.append('drive', drive);
      data.append('model', model);
      data.append('numberPlate', numberPlate);
      if (image) data.append('image', image);

      const token = localStorage.getItem('token');

      const res = await axios.post('/posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Post created:', res.data);
      navigate('/sell');
    } catch (error) {
      console.error('Помилка створення поста:', error);
      alert('Сталася помилка при відправленні даних');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Додати оголошення</h2>

      <input placeholder="Марка" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Опис" value={text} onChange={(e) => setText(e.target.value)} className="w-full border p-2 rounded" />
      <input type="text" placeholder="Модель" value={model} onChange={(e) => setModel(e.target.value)} className="w-full border p-2 rounded" />
      <input type="text" placeholder="Номерний знак" value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} className="w-full border p-2 rounded" />
      <input type="number" placeholder="Ціна" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded" />
      <input type="number" placeholder="Пробіг" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full border p-2 rounded" />

      <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="w-full border p-2 rounded">
        <option value="automatic">Автомат</option>
        <option value="manual">Механіка</option>
      </select>

      <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="w-full border p-2 rounded">
        <option value="gasoline">Бензин</option>
        <option value="diesel">Дизель</option>
        <option value="gaz/gasoline">Газ/Бензин</option>
        <option value="electro">Електро</option>
      </select>

      <select value={drive} onChange={(e) => setDrive(e.target.value)} className="w-full border p-2 rounded">
        <option value="">Тип приводу</option>
        <option value="FWD">FWD</option>
        <option value="RWD">RWD</option>
        <option value="AWD">AWD</option>
      </select>

      <select value={engine} onChange={(e) => setEngine(e.target.value)} className="w-full border p-2 rounded">
        <option value="">Обʼєм двигуна</option>
        <option value="1.0l">1.0л</option>
        <option value="1.6l">1.6л</option>
        <option value="2.0l">2.0л</option>
        <option value="2.5l">2.5л</option>
        <option value="3.0l">3.0л</option>
        <option value="3.5l">3.5л</option>
        <option value="4.0l">4.0л</option>
        <option value="4.4l">4.4л</option>
        <option value="4.7l">4.7л</option>
        <option value="5.0l">5.0л</option>
        <option value="5.5l">5.5л</option>
        <option value="6.0l">6.0л</option>
      </select>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full border p-2 rounded"
      />

      {image && (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-32 h-32 object-cover rounded-md border-2 border-gray-300"
          />
        </div>
      )}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Створити оголошення
      </button>
    </form>
  );
};

export default AddPostPage;
