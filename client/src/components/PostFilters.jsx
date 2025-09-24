import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaTimes } from 'react-icons/fa';
import { MdOutlineDirectionsCar, MdOutlineAttachMoney } from 'react-icons/md';

export const PostFilters = ({ 
  onFilterChange, 
  onSortChange, 
  onSearchChange,
  initialFilters = {},
  initialSortBy = 'newest',
  initialSearchQuery = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    fuel: '',
    transmission: '',
    bodyType: '',
    condition: '',
    hasAccident: '',
    mileageMax: '',
    ...initialFilters
  });

  const [sortBy, setSortBy] = useState(initialSortBy);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);


  const brands = ['BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Skoda', 'Volvo', 'Lexus', 'Mazda', 'Subaru', 'Mitsubishi', 'Peugeot', 'Renault', 'Citroen'];
  const fuelTypes = ['gasoline', 'diesel', 'gaz/gasoline', 'electro', 'hybrid'];
  const transmissions = ['manual', 'automatic', 'robot', 'variator'];
  const bodyTypes = ['sedan', 'hatchback', 'wagon', 'suv', 'coupe', 'convertible', 'pickup'];
  const conditions = ['excellent', 'good', 'fair', 'poor'];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  const clearFilters = () => {
    const clearedFilters = {
      brand: '',
      priceMin: '',
      priceMax: '',
      yearMin: '',
      yearMax: '',
      fuel: '',
      transmission: '',
      bodyType: '',
      condition: '',
      hasAccident: '',
      mileageMax: '',
    };
    setFilters(clearedFilters);
    setSortBy('newest');
    setSearchQuery('');
    onFilterChange(clearedFilters);
    onSortChange('newest');
    onSearchChange('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaFilter className="text-blue-600 text-lg" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Фільтри та пошук</h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <span className="text-sm font-medium text-gray-700">
            {isExpanded ? 'Сховати' : 'Показати'} фільтри
          </span>
          <FaFilter className="text-gray-600" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Пошук за назвою, моделлю, описом..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <FaTimes className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Sort Options */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <FaSort className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Сортування:</span>
        </div>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="newest">Найновіші</option>
          <option value="oldest">Найстаріші</option>
          <option value="price_asc">Ціна (від дешевих)</option>
          <option value="price_desc">Ціна (від дорогих)</option>
          <option value="mileage_asc">Пробіг (від меншого)</option>
          <option value="mileage_desc">Пробіг (від більшого)</option>
          <option value="year_desc">Рік (від новіших)</option>
          <option value="year_asc">Рік (від старіших)</option>
        </select>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Brand and Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Марка</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Всі марки</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ціна від</label>
              <div className="relative">
                <MdOutlineAttachMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="0"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ціна до</label>
              <div className="relative">
                <MdOutlineAttachMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="∞"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Рік від</label>
              <input
                type="number"
                placeholder="1990"
                value={filters.yearMin}
                onChange={(e) => handleFilterChange('yearMin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Паливо</label>
              <select
                value={filters.fuel}
                onChange={(e) => handleFilterChange('fuel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Всі типи</option>
                <option value="gasoline">Бензин</option>
                <option value="diesel">Дизель</option>
                <option value="gaz/gasoline">Газ/Бензин</option>
                <option value="electro">Електро</option>
                <option value="hybrid">Гібрид</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Коробка передач</label>
              <select
                value={filters.transmission}
                onChange={(e) => handleFilterChange('transmission', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Всі типи</option>
                <option value="manual">Механічна</option>
                <option value="automatic">Автоматична</option>
                <option value="robot">Робот</option>
                <option value="variator">Варіатор</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип кузова</label>
              <select
                value={filters.bodyType}
                onChange={(e) => handleFilterChange('bodyType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Всі типи</option>
                <option value="sedan">Седан</option>
                <option value="hatchback">Хетчбек</option>
                <option value="wagon">Універсал</option>
                <option value="suv">Позашляховик</option>
                <option value="coupe">Купе</option>
                <option value="convertible">Кабріолет</option>
                <option value="pickup">Пікап</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пробіг до (км)</label>
              <input
                type="number"
                placeholder="∞"
                value={filters.mileageMax}
                onChange={(e) => handleFilterChange('mileageMax', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Condition and Accident */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Стан автомобіля</label>
              <select
                value={filters.condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Будь-який стан</option>
                <option value="excellent">Відмінний</option>
                <option value="good">Хороший</option>
                <option value="fair">Задовільний</option>
                <option value="poor">Поганий</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ДТП</label>
              <select
                value={filters.hasAccident}
                onChange={(e) => handleFilterChange('hasAccident', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Не важливо</option>
                <option value="false">Без ДТП</option>
                <option value="true">Було в ДТП</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <FaTimes className="text-sm" />
              <span>Очистити фільтри</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
