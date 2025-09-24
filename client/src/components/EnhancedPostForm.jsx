import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaUpload, FaSave, FaTimes, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from '../utils/fixed_axios';

export const EnhancedPostForm = ({ post = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    price: '',
    brand: '',
    model: '',
    year: '',
    engine: '',
    transmission: '',
    mileage: '',
    fuel: '',
    drive: '',
    numberPlate: '',
    color: '',
    bodyType: '',
    power: '',
    doors: '4',
    condition: 'good',
    hasAccident: false,
    accidentDescription: '',
    defects: '',
    isCustomsCleared: true,
    isFirstOwner: false,
    features: '',
    phone: '',
    location: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const brands = ['BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Skoda', 'Volvo', 'Lexus', 'Mazda', 'Subaru', 'Mitsubishi', 'Peugeot', 'Renault', 'Citroen'];
  const fuelTypes = ['gasoline', 'diesel', 'gaz/gasoline', 'electro', 'hybrid'];
  const transmissions = ['manual', 'automatic', 'robot', 'variator'];
  const driveTypes = ['fwd', 'rwd', 'awd', '4wd'];
  const bodyTypes = ['sedan', 'hatchback', 'wagon', 'suv', 'coupe', 'convertible', 'pickup'];
  const conditions = ['excellent', 'good', 'fair', 'poor'];

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        text: post.text || '',
        price: post.price || '',
        brand: post.brand || '',
        model: post.model || '',
        year: post.year || '',
        engine: post.engine || '',
        transmission: post.transmission || '',
        mileage: post.mileage || '',
        fuel: post.fuel || '',
        drive: post.drive || '',
        numberPlate: post.numberPlate || '',
        color: post.color || '',
        bodyType: post.bodyType || '',
        power: post.power || '',
        doors: post.doors || '4',
        condition: post.condition || 'good',
        hasAccident: post.hasAccident || false,
        accidentDescription: post.accidentDescription || '',
        defects: post.defects ? post.defects.join(', ') : '',
        isCustomsCleared: post.isCustomsCleared !== false,
        isFirstOwner: post.isFirstOwner || false,
        features: post.features ? post.features.join(', ') : '',
        phone: post.phone || '',
        location: post.location || ''
      });
      if (post.imgUrl) {
        setPreview(`http://localhost:3002/${post.imgUrl}`);
      }
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Назва обов\'язкова';
    if (!formData.text.trim()) newErrors.text = 'Опис обов\'язковий';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Ціна повинна бути більше 0';
    if (!formData.brand) newErrors.brand = 'Марка обов\'язкова';
    if (!formData.model.trim()) newErrors.model = 'Модель обов\'язкова';
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Невірний рік випуску';
    }
    if (!formData.engine) newErrors.engine = 'Об\'єм двигуна обов\'язковий';
    if (!formData.transmission) newErrors.transmission = 'Коробка передач обов\'язкова';
    if (!formData.mileage || formData.mileage < 0) newErrors.mileage = 'Пробіг повинен бути більше 0';
    if (!formData.fuel) newErrors.fuel = 'Тип палива обов\'язковий';
    if (!formData.drive) newErrors.drive = 'Тип приводу обов\'язковий';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add image if selected
      if (image) {
        formDataToSend.append('image', image);
      }

      let response;
      if (post) {
        // Update existing post
        response = await axios.put(`/posts/${post._id}`, formDataToSend);
        toast.success('Оголошення успішно оновлено!');
        navigate(`/post/${response.data._id}`);
      } else {
        // Create new post
        response = await axios.post('/posts', formDataToSend);
        toast.success('Оголошення успішно створено!');
        navigate('/posts');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Помилка збереження оголошення');
      setErrors({ submit: error.response?.data?.message || 'Помилка збереження поста' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (post) {
      navigate(`/post/${post._id}`);
    } else {
      navigate('/posts');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaCar className="mr-2 text-blue-600" />
              {post ? 'Редагувати оголошення' : 'Створити нове оголошення'}
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Фото автомобіля
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Натисніть для завантаження фото
                      </p>
                    </label>
                  </div>
                </div>
                {preview && (
                  <div className="w-32 h-24">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Назва оголошення *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Наприклад: BMW 3 Series 2018 року"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ціна (USD) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="25000"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>

            {/* Car Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Марка *
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.brand ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Виберіть марку</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Модель *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.model ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="3 Series"
                />
                {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Рік випуску *
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="2018"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Паливо *
                </label>
                <select
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.fuel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Виберіть паливо</option>
                  <option value="gasoline">Бензин</option>
                  <option value="diesel">Дизель</option>
                  <option value="gaz/gasoline">Газ/Бензин</option>
                  <option value="electro">Електро</option>
                  <option value="hybrid">Гібрид</option>
                </select>
                {errors.fuel && <p className="text-red-500 text-sm mt-1">{errors.fuel}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Об'єм двигуна (л) *
                </label>
                <input
                  type="text"
                  name="engine"
                  value={formData.engine}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.engine ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="2.0"
                />
                {errors.engine && <p className="text-red-500 text-sm mt-1">{errors.engine}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Коробка передач *
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.transmission ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Виберіть коробку</option>
                  <option value="manual">Механічна</option>
                  <option value="automatic">Автоматична</option>
                  <option value="robot">Робот</option>
                  <option value="variator">Варіатор</option>
                </select>
                {errors.transmission && <p className="text-red-500 text-sm mt-1">{errors.transmission}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Привід *
                </label>
                <select
                  name="drive"
                  value={formData.drive}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.drive ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Виберіть привід</option>
                  <option value="fwd">Передній</option>
                  <option value="rwd">Задній</option>
                  <option value="awd">Повний</option>
                  <option value="4wd">4WD</option>
                </select>
                {errors.drive && <p className="text-red-500 text-sm mt-1">{errors.drive}</p>}
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Пробіг (км) *
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.mileage ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="50000"
                />
                {errors.mileage && <p className="text-red-500 text-sm mt-1">{errors.mileage}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Потужність (к.с.)
                </label>
                <input
                  type="number"
                  name="power"
                  value={formData.power}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Колір
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Чорний"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип кузова
                </label>
                <select
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Виберіть тип</option>
                  <option value="sedan">Седан</option>
                  <option value="hatchback">Хетчбек</option>
                  <option value="wagon">Універсал</option>
                  <option value="suv">Позашляховик</option>
                  <option value="coupe">Купе</option>
                  <option value="convertible">Кабріолет</option>
                  <option value="pickup">Пікап</option>
                </select>
              </div>
            </div>

            {/* Condition and Legal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Стан автомобіля
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="excellent">Відмінний</option>
                  <option value="good">Хороший</option>
                  <option value="fair">Задовільний</option>
                  <option value="poor">Поганий</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номерний знак
                </label>
                <input
                  type="text"
                  name="numberPlate"
                  value={formData.numberPlate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="AA1234BB"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasAccident"
                    checked={formData.hasAccident}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Автомобіль був в ДТП
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isCustomsCleared"
                    checked={formData.isCustomsCleared}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Розмитнений
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFirstOwner"
                    checked={formData.isFirstOwner}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Перший власник
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дефекти (через кому)
                  </label>
                  <textarea
                    name="defects"
                    value={formData.defects}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Подряпини на бампері, потертості на сидіннях"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Додаткові опції (через кому)
                  </label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Кондиціонер, навігація, ксенон"
                  />
                </div>
              </div>
            </div>

            {/* Accident Description */}
            {formData.hasAccident && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Опис ДТП
                </label>
                <textarea
                  name="accidentDescription"
                  value={formData.accidentDescription}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Опишіть деталі ДТП та відновлення"
                />
              </div>
            )}

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+380501234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Розташування
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Київ, Україна"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Опис *
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                rows="6"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.text ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Детальний опис автомобіля, його переваг, історії обслуговування..."
              />
              {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text}</p>}
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                <FaExclamationTriangle className="text-red-600" />
                <span className="text-red-800">{errors.submit}</span>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Скасувати
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Збереження...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>{post ? 'Оновити' : 'Створити'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPostForm;