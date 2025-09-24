import React, { useEffect, useState, useRef } from 'react';
import { PostItem } from '../components/Postitem';
import { PopularPost } from '../components/PopularPost';
import { useDispatch, useSelector } from 'react-redux';
import { getAllposts } from '../redux/features/auth/post/fixed_postSlice';
import image5 from '../img/logo.jpg';
import header from '../img/header.jpg';

export const SellPage = () => {
    const dispatch = useDispatch();
    const { posts, popularPost } = useSelector((state) => state.post);

    const sideNews = [
    { title: 'Які нові авто краще купували в Україні у квітні?', date: '06 травня 2025' },
    { title: 'Автомобіль тижня: Volkswagen Tayron', date: '05 травня 2025' },
    { title: 'Надійні авто віком від 3 до 10 років за даними ADAC', date: '01 травня 2025' },
    { title: 'Автомобіль тижня: Chery Tiggo 4', date: '28 квітня 2025' }
  ];

    const [filters, setFilters] = useState({
        priceMin: '',
        priceMax: '',
        mileageMin: '',
        mileageMax: '',
        yearMin: '',
        yearMax: '',
        brand: '',
        fuel: '',
        transmission: '',
        sortBy: 'createdAt', // Змінено на 'createdAt' для сортування за датою
        sortOrder: 'desc', // За замовчуванням сортуємо за спаданням (найновіші спочатку)
        drive: '',
        engine: '',
    });

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const timeoutId = useRef(null);

    useEffect(() => {
        dispatch(getAllposts(filters));
    }, [dispatch, filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });

        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            dispatch(getAllposts({ ...filters, [e.target.name]: e.target.value }));
        }, 500);
    };

    return (
        <div className="container mx-auto py-6 px-4 flex">
            {/* Фільтри */}
            <div className="w-1/4 bg-white p-6 rounded-lg shadow-md mr-8">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">Фільтри</h2>
                <div className="space-y-4">
                    <input 
                        type="number" 
                        placeholder="Мін. ціна" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.priceMin} 
                        name="priceMin" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Макс. ціна" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.priceMax} 
                        name="priceMax" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Мін. пробіг" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.mileageMin} 
                        name="mileageMin" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Макс. пробіг" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.mileageMax} 
                        name="mileageMax" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Рік від" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.yearMin} 
                        name="yearMin" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Рік до" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.yearMax} 
                        name="yearMax" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="text" 
                        placeholder="Марка (наприклад BMW)" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.brand} 
                        name="brand" 
                        onChange={handleFilterChange} 
                    />

                    <select 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.fuel} 
                        name="fuel" 
                        onChange={handleFilterChange}
                    >
                        <option value="">Паливо</option>
                        <option value="gasoline">Бензин</option>
                        <option value="diesel">Дизель</option>
                        <option value="gaz/gasoline">Газ/Бензин</option>
                        <option value="electro">Електро</option>
                    </select>
                    <select 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.transmission} 
                        name="transmission" 
                        onChange={handleFilterChange}
                    >
                        <option value="">Трансмісія</option>
                        <option value="manual">Механіка</option>
                        <option value="automatic">Автомат</option>
                    </select>

                    {showAdvancedFilters && (
                        <>
                            <select 
                                className="w-full border p-2 rounded-lg" 
                                value={filters.drive} 
                                name="drive" 
                                onChange={handleFilterChange}
                            >
                                <option value="">Привід</option>
                                <option value="RWD">RWD</option>
                                <option value="FWD">FWD</option>
                                <option value="AWD">AWD</option>
                            </select>
                            <select 
                                className="w-full border p-2 rounded-lg" 
                                value={filters.engine} 
                                name="engine" 
                                onChange={handleFilterChange}
                            >
                                <option value="">Об'єм двигуна</option>
                                <option value="0.6l">0.6</option>
                                <option value="1.0l">1.0</option>
                                <option value="2.0l">2.0</option>
                                <option value="3.0l">3.0</option>
                            </select>
                            
                                      <div className="bg-white p-6">
                                        <div className="flex">
                                          <div className="w-1/3">
                                            <img src={header} alt="header" className="rounded mb-4" />
                                            <img src={image5} alt="Логотип" className="mb-2 w-full" />
                                          </div>
                                          <div className="w-2/3 pl-6">
                                            <h2 className="text-2xl font-bold  mb-2">Щоб ви купували авто без сюрпризів</h2>
                                            <p className=' text-s font-bold '>Ми робимо 32 перевірки: розшук, VIN, пробіг, історія, ДТП тощо.</p>
                                          </div>
                                        </div>
                                      </div>
                        </>

                    )}

                    <button 
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} 
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        {showAdvancedFilters ? 'Приховати' : 'Показати розширений пошук'}
                    </button>
                    <div className="md:w-1/3 space-y-2">
              {sideNews.map((item, index) => (
                <div key={index} className="border-b pb-2 ">
                  <a href="#" className="text-blue-700 hover:underline font-medium ">{item.title}</a>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              ))}
            </div>
                </div>
            </div>

            {/* Пости */}
            <div className="flex-1">
                {/* Сортування */}
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <label htmlFor="sortBy" className="mr-2 text-lg text-blue-600">Сортувати за:</label>
                        <select 
                            id="sortBy" 
                            className="border p-2 rounded-lg"
                            value={filters.sortBy} 
                            name="sortBy" 
                            onChange={handleFilterChange}
                        >
                            <option value="price">Ціна</option>
                            <option value="year">Рік</option>
                            <option value="mileage">Пробіг</option>
                            <option value="createdAt">Дата</option> {/* Додано сортування за датою */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sortOrder" className="mr-2 text-lg text-blue-600">Порядок:</label>
                        <select 
                            id="sortOrder" 
                            className="border p-2 rounded-lg"
                            value={filters.sortOrder} 
                            name="sortOrder" 
                            onChange={handleFilterChange}
                        >
                            <option value="asc">Зростанням</option>
                            <option value="desc">Спаданням</option>
                        </select>
                    </div>
                </div>

                {/* Сітка постів */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts?.length ? (
                        posts.map((post, idx) => <PostItem key={idx} post={post} />)
                    ) : (
                        <div className="text-center col-span-3 text-gray-500">Нічого не знайдено</div>
                    )}
                </div>
            </div>
        </div>
    );
};
