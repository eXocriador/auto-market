import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaMapMarkerAlt, FaClock, FaDirections, FaStar, FaHeart, FaEye, FaCar, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const MainPage = () => {
  return (
    <div className="min-h-screen">
      {/* Features Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShieldAlt className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Безпечні угоди</h3>
            <p className="text-gray-600">
              Перевірка VIN, історія ДТП, технічний стан - все для вашої безпеки
            </p>
</div>

          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Перевірені продавці</h3>
            <p className="text-gray-600">
              Всі продавці проходять верифікацію та мають позитивні відгуки
            </p>
          </div>

          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCar className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Широкий вибір</h3>
            <p className="text-gray-600">
              Більше 10,000 автомобілів від легкових до комерційних
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-16">
        <div className="card p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Зв'яжіться з нами</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-2xl text-blue-600" />
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-gray-600">+(380)66-423-9374</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-2xl text-blue-600" />
                  <div>
                    <p className="font-semibold">Адреса</p>
                    <p className="text-gray-600">проспект Степана Бандери, 24 Д, Київ</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaClock className="text-2xl text-blue-600" />
                  <div>
                    <p className="font-semibold">Робочі години</p>
                    <p className="text-gray-600">ПН-ПТ, 9:00 до 19:00</p>
              </div>
              </div>
            </div>
          </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Надіслати повідомлення</h3>
            <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Ваше повідомлення"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <button className="btn-primary w-full">
                  Відправити повідомлення
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white rounded-3xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AutoBazar</h3>
            <p className="text-gray-400">
              Найкращий сервіс для покупки та продажу автомобілів в Україні
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Послуги</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Купівля авто</li>
              <li>Продаж авто</li>
              <li>Перевірка VIN</li>
              <li>Страхування</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Компанія</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Про нас</li>
              <li>Контакти</li>
              <li>Вакансії</li>
              <li>Блог</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Підтримка</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Допомога</li>
              <li>FAQ</li>
              <li>Політика конфіденційності</li>
              <li>Умови використання</li>
            </ul>
            </div>
          </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AutoBazar. Всі права захищені.</p>
          </div>
        </footer>
    </div>
  );
};

export default MainPage;
