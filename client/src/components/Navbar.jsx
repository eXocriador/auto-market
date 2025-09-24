import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { FaCar, FaUser, FaSignOutAlt, FaCog, FaHeart } from 'react-icons/fa';

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowProfile(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <FaCar className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold gradient-text">AutoBazar</span>
          </Link>

          {/* Navigation Links */}
          {isAuth && (
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Головна
              </NavLink>
              <NavLink
                to="/sell"
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Продаж авто
              </NavLink>
              <NavLink
                to="/posts"
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Мої пости
              </NavLink>
              <Link
                to="/new"
                className="btn-secondary flex items-center space-x-2"
              >
                <span>+</span>
                <span>Додати пост</span>
              </Link>
            </div>
          )}

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            {isAuth ? (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="relative">
                    <img
                      src={user?.avatar || "https://i.pravatar.cc/40"}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="hidden sm:block font-medium text-gray-700">{user?.username}</span>
                </button>

                {showProfile && (
                  <div className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 slide-up">
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={user?.avatar || "https://i.pravatar.cc/60"}
                        alt="avatar"
                        className="w-16 h-16 rounded-full border-4 border-blue-100"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{user?.username}</h3>
                        <p className="text-sm text-green-600 font-medium">Premium підписка активна</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-blue-600"
                        onClick={() => setShowProfile(false)}
                      >
                        <FaUser className="text-gray-400" />
                        <span>Мій профіль</span>
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-red-600"
                        onClick={() => setShowProfile(false)}
                      >
                        <FaHeart className="text-gray-400" />
                        <span>Обране</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-colors duration-200 text-gray-700 hover:text-red-600 w-full text-left"
                      >
                        <FaSignOutAlt className="text-gray-400" />
                        <span>Вийти</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
                  Увійти
                </Link>
                <Link to="/register" className="btn-primary">
                  Реєстрація
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
