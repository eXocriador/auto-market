import React from 'react';
import { 
  FaCar, 
  FaGasPump, 
  FaCog, 
  FaRoad, 
  FaCalendarAlt, 
  FaPalette, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaShieldAlt,
  FaTools,
  FaCarCrash
} from 'react-icons/fa';

export const CarDetailsCard = ({ post }) => {
  const fuelMap = {
    gasoline: 'Бензин',
    diesel: 'Дизель',
    'gaz/gasoline': 'Газ/Бензин',
    electro: 'Електро',
    hybrid: 'Гібрид'
  };

  const transmissionMap = {
    manual: 'Механічна',
    automatic: 'Автоматична',
    robot: 'Робот',
    variator: 'Варіатор'
  };

  const driveMap = {
    fwd: 'Передній',
    rwd: 'Задній',
    awd: 'Повний',
    '4wd': '4WD'
  };

  const bodyTypeMap = {
    sedan: 'Седан',
    hatchback: 'Хетчбек',
    wagon: 'Універсал',
    suv: 'Позашляховик',
    coupe: 'Купе',
    convertible: 'Кабріолет',
    pickup: 'Пікап'
  };

  const conditionMap = {
    excellent: 'Відмінний',
    good: 'Хороший',
    fair: 'Задовільний',
    poor: 'Поганий'
  };

  const conditionColors = {
    excellent: 'text-green-600 bg-green-100',
    good: 'text-blue-600 bg-blue-100',
    fair: 'text-yellow-600 bg-yellow-100',
    poor: 'text-red-600 bg-red-100'
  };

  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with Price */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center space-x-4 text-sm opacity-90">
              <div className="flex items-center space-x-1">
                <FaUser className="text-sm" />
                <span>{post.username}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaCalendarAlt className="text-sm" />
                <span>{new Date(post.createdAt).toLocaleDateString('uk-UA')}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${formatNumber(post.price)}</div>
            <div className="text-sm opacity-90">Ціна</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaCar className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Основні характеристики</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Марка:</span>
                <span className="font-medium">{post.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Модель:</span>
                <span className="font-medium">{post.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Рік:</span>
                <span className="font-medium">{post.year}</span>
              </div>
              {post.bodyType && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Тип кузова:</span>
                  <span className="font-medium">{bodyTypeMap[post.bodyType]}</span>
                </div>
              )}
              {post.color && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Колір:</span>
                  <span className="font-medium">{post.color}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaGasPump className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Технічні характеристики</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Паливо:</span>
                <span className="font-medium">{fuelMap[post.fuel]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Двигун:</span>
                <span className="font-medium">{post.engine} л</span>
              </div>
              {post.power && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Потужність:</span>
                  <span className="font-medium">{post.power} к.с.</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Коробка:</span>
                <span className="font-medium">{transmissionMap[post.transmission]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Привід:</span>
                <span className="font-medium">{driveMap[post.drive]}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaRoad className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Пробіг та стан</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Пробіг:</span>
                <span className="font-medium">{formatNumber(post.mileage)} км</span>
              </div>
              {post.condition && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Стан:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${conditionColors[post.condition]}`}>
                    {conditionMap[post.condition]}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Перегляди:</span>
                <span className="font-medium">{post.views || 0}</span>
              </div>
              {post.numberPlate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Номер:</span>
                  <span className="font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {post.numberPlate}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Accident and Defects Information */}
        {(post.hasAccident || post.defects?.length > 0) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FaCarCrash className="text-red-600" />
              </div>
              <h3 className="font-semibold text-red-800">Важлива інформація</h3>
            </div>
            <div className="space-y-2">
              {post.hasAccident && (
                <div className="flex items-center space-x-2 text-red-700">
                  <FaExclamationTriangle className="text-sm" />
                  <span className="text-sm font-medium">Автомобіль був в ДТП</span>
                </div>
              )}
              {post.accidentDescription && (
                <p className="text-sm text-red-600 ml-6">{post.accidentDescription}</p>
              )}
              {post.defects?.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaTools className="text-sm text-red-600" />
                    <span className="text-sm font-medium text-red-700">Дефекти:</span>
                  </div>
                  <ul className="ml-6 space-y-1">
                    {post.defects.map((defect, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-center space-x-2">
                        <FaTimesCircle className="text-xs" />
                        <span>{defect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Additional Features */}
        {post.features?.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaStar className="text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800">Додаткові опції</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {post.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-green-700">
                  <FaCheckCircle className="text-xs" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legal Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaShieldAlt className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-blue-800">Юридична інформація</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              {post.isCustomsCleared ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <FaTimesCircle className="text-red-600" />
              )}
              <span className={post.isCustomsCleared ? 'text-green-700' : 'text-red-700'}>
                Розмитнений
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {post.isFirstOwner ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <FaTimesCircle className="text-red-600" />
              )}
              <span className={post.isFirstOwner ? 'text-green-700' : 'text-red-700'}>
                Перший власник
              </span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        {(post.phone || post.location) && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FaPhone className="text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Контактна інформація</h3>
            </div>
            <div className="space-y-2 text-sm">
              {post.phone && (
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-gray-500" />
                  <span className="font-medium">{post.phone}</span>
                </div>
              )}
              {post.location && (
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span className="font-medium">{post.location}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {post.text && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <FaInfoCircle className="text-blue-600" />
              <span>Опис</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{post.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};
