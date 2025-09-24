import React, { useState } from 'react';
import image5 from '../img/logo.jpg';
import header from '../img/header.jpg';
import image10 from '../img/18337.avif';
import image11 from '../img/18395.avif';
import hotcar from '../img/image33.webp';
import audi from'../img/A6.webp';
import volvo from '../img/volvo.webp';
import suzuki from '../img/suzuki.webp';
import toyota from '../img/toyota.webp';
import start from '../img/start.webp';
import maserati from '../img/maserati_special_offer_1_website.jpg';
import pdrImage from '../img/test2.jpg';

import { FaPhone, FaMapMarkerAlt, FaClock, FaDirections } from 'react-icons/fa';

const VIYSKOVYI_ZBIR_URL = 'https://send.monobank.ua/jar/9Ud7dzjvrb';

const MainPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  const handleSupportClick = () => {
    window.location.href = VIYSKOVYI_ZBIR_URL;
  };

  const handleSubmit = () => {
    window.location.href = 'http://localhost:3000/api/chat';
  };

  const icons = {};
  for (let i = 1; i <= 35; i++) {
    icons[`${i}`] = require(`../icon/${i}.jpg`);
  }

  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 100, user: 'Користувач' })
      });

      const data = await response.json();
      const paymentWindow = window.open('', '_blank');
      paymentWindow.document.write(data.html);
      paymentWindow.document.close();
    } catch (error) {
      console.error('Помилка при створенні платежу:', error);
      alert('Не вдалося ініціювати оплату');
    }
  };

  const testMreo = () => (
    window.location.href = 'https://pdr.infotech.gov.ua'
  );

  const renderCatalog = () => (
    <div className="catalog-container bg-white rounded-lg p-4 shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Ринок вживаних автомобілів</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { brand: 'Toyota', model: 'Camry', year: 2018, price: '$20,000' },
          { brand: 'Honda', model: 'Civic', year: 2019, price: '$18,000' },
          { brand: 'BMW', model: 'X5', year: 2020, price: '$45,000' }
        ].map((car, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
            <p>Рік: {car.year}</p>
            <p>Ціна: {car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const hotNews = {
    title: 'Автомобіль тижня: Peugeot Landtrek',
    image: 'https://via.placeholder.com/600x300',
    date: 'Сьогодні',
    saved: true
  };

  const sideNews = [
    { title: 'Які нові авто краще купували в Україні у квітні?', date: '06 травня 2025' },
    { title: 'Автомобіль тижня: Volkswagen Tayron', date: '05 травня 2025' },
    { title: 'Надійні авто віком від 3 до 10 років за даними ADAC', date: '01 травня 2025' },
    { title: 'Автомобіль тижня: Chery Tiggo 4', date: '28 квітня 2025' }
  ];

  const feedNews = [
    { image: start, title: 'Чи справді система Start & Stop зберігає паливо?' },
    { image: toyota, title: 'Toyota Corolla Cross отримала оновлення' }
  ];

  return (
    <div className="bg-white font-sans min-h-screen p-4">
      <div className="container mx-auto">

        {/* Підписки */}
        <div className="flex justify-end mb-4">
          <button className="bg-green-500 text-white text-lg font-bold px-4 py-2 rounded mr-4"
            onClick={handleSubscribe}
            disabled={isSubscribed}>
            {isSubscribed ? 'Підписка активована' : 'Оформити підписку на місяць'}
          </button>
          <button className="bg-blue-500 text-white text-lg font-bold px-4 py-2 rounded"
            onClick={handleSupportClick}>
            Купити підписку Premium+
          </button>
        </div>

        {/* Автоновини */}
        <div className=" mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Автоновини</h1>

          <div
  className="bg-cover bg-center p-4 rounded-md mb-6 text-center"
  style={{ backgroundImage: `url(${pdrImage})` }}
>
  <p className="font-semibold text-white drop-shadow">
    Як повинен діяти водій у цих ситуаціях? Перевір знання ПДР!
  </p>
  <button 
   onClick={testMreo}
   className="mt-2 px-4 py-2 bg-green-600 text-white rounded-full">
    Пройти тест
  </button>
</div>


          <div className="md:flex gap-4 border-b pb-4">
            <div className="md:w-2/3 mb-4 md:mb-0">
              <img src={hotcar} alt="hot car" className="rounded-lg w-128 h-full object-cover" />
              <div className="mt-2">
                <h2 className="text-xl font-semibold">{hotNews.title}</h2>
                <p className="text-sm text-gray-500">{hotNews.date}</p>
              </div>
            </div>
            <div className="md:w-1/3 space-y-2">
              {sideNews.map((item, index) => (
                <div key={index} className="border-b pb-2">
                  <a href="#" className="text-blue-700 hover:underline font-medium">{item.title}</a>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

         <h2 className="mt-10 text-lg font-semibold">СТРІЧКА</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
  {[
    {
      image: audi,
      title: 'Новий Audi A6 пройде до 100 кілометрів без жодної краплі пального',
      date: 'Сьогодні'
    },
    {
      image: start,
      title: 'Чи справді система Start & Stop «вбиває» турбіну?',
      date: '3 дні тому'
    },
    {
      image: toyota,
      title: 'Toyota Corolla Cross отримав оновлення! Що це нам дає?',
      date: '4 дні тому'
    },
    {
      image: volvo,
      title: 'Volvo повертає XC70 як універсальну сімейну модель. ВІДЕО',
      date: '4 дні тому'
    },
    {
      image: maserati,
      title: 'Незабаром у салонах офіційних дилерів',
      date: ''
    },
    {
      image: suzuki,
      title: '15 нових машин з «автоматом», дешевших за $20 тисяч: що є на BazarAuto?',
      date: '07 травня 2025'
    }
  ].map((item, index) => (
    <div key={index} className="bg-white rounded shadow p-2 hover:shadow-md transition">
      <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
      <h3 className="text-base font-medium text-gray-900 mt-2 hover:text-blue-700 cursor-pointer">{item.title}</h3>
      <div className="text-sm text-gray-500 flex items-center justify-between mt-1">
        <span>{item.date}</span>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          В Обране
        </span>
      </div>
    </div>
  ))}
</div>
</div>


        {/* Марки авто */}
        <div className='bg-white p-6 mt-10 flex gap-8'>
          <div className='font-bold text-black text-xl'>
            <div className='flex flex-wrap gap-2'>
              {Object.keys(icons).map((key) => (
                <img key={key} src={icons[key]} alt={`Icon ${key}`} className="w-25 h-24 object-contain" />
              ))}
            </div>
          </div>
        </div>

          {showCatalog ? renderCatalog() : (
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
        )}

        {/* Футер */}
        <footer className="bg-white text-white pt-10 mt-10 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between px-8 pb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhone className="text-xl text-black" />
                <span className='text-black'>+(380)66-423-9374</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-xl text-black" />
                <span className='text-black'>проспект Степана Бандери, 24 Д, Київ, Украина, 04073</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-xl text-black" />
                <span className='text-black'>ПН-ПТ, 9:00 до 19:00</span>
              </div>
              <div className="flex items-center gap-3">
                <FaDirections className="text-xl text-black" />
                <span className='text-black'>Надіслати повідомлення менеджеру</span>
                <input
                  type="text"
                  placeholder="Enter your postcode..."
                  className="px-2 py-1 text-black rounded"
                />
                <button onClick={handleSubmit}
                  className="bg-white text-black font-bold px-3 py-1 rounded hover:bg-gray-400">
                  Відправити!
                </button>
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.4324168793125!2d0.0806503159567501!3d52.05654977973262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d88bfbef1cf6cb%3A0x529a80e8c7dc7ea9!2sMotorDesk!5e0!3m2!1sen!2suk!4v1715400000000"
                width="300"
                height="200"
                allowFullScreen
                loading="lazy"
                className="rounded"
              ></iframe>
            </div>
          </div>

          <div className="text-center py-3 text-sm flex flex-col md:flex-row justify-between px-8 text-gray-400">
            <p>© 2024 Will’s Wheels | Privacy Policy | Contact Us</p>
            <p>Powered by AutoBazar Car Dealer Software</p>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default MainPage;
