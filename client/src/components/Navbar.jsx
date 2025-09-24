import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const activeStyles = {
    color: 'black',
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative bg-white shadow-md py-6 px-8"> 
  <div className="flex justify-center">
    {isAuth && (
      <ul className="flex gap-6">
        <li>
          <NavLink
            to="/"
            className="text-s text-gray-500 hover:text-red-400 font-bold"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sell"
            className="text-s text-gray-500 hover:text-red-400 font-bold"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Продаж автомобілів
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts"
            className="text-s text-gray-500 hover:text-red-400 font-bold"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Мої пости
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/new"
            className="flex items-center bg-green-600 text-s text-white rounded-xl hover:bg-green-700 px-4 py-2 font-bold"
          >
              + Додати пост
          </NavLink>
        </li>
      </ul>
    )}
  </div>

  {/* Профіль справа */}
  <div className="absolute right-8 top-1/2 -translate-y-1/2">
    {isAuth ? (
      <div className="relative" ref={profileRef}>
        <button onClick={() => setShowProfile((prev) => !prev)}>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-105 transition"
          />
        </button>
        {showProfile && (
          <div className="absolute right-0 top-12 bg-white border rounded-xl shadow-lg w-60 p-4 z-50">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/60"
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-bold text-black">{user?.username}</p>
                <p className="text-sm text-green-500">Підписка: Активна</p>
              </div>
            </div>
            <Link
              to="/profile"
              className="block text-blue-500 mt-3 hover:underline text-s"
            >
              Перейти до профілю
            </Link>
            <button
              onClick={handleLogout}
              className="mt-2 text-red-500 hover:underline text-s"
            >
              Вийти
            </button>
          </div>
        )}
      </div>
    ) : (
      <div className="bg-gray-600 text-white rounded-xl px-4 py-2 font-bold text-sm hover:bg-gray-700 transition">
        <Link to="/login">Увійти</Link>
      </div>
    )}
  </div>
</div>

  );
};
