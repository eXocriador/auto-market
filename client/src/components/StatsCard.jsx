import React from 'react';
import { FaCar, FaUsers, FaEye, FaHeart, FaStar, FaChartLine } from 'react-icons/fa';

export const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = 'blue',
  size = 'md' 
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'car':
        return <FaCar />;
      case 'users':
        return <FaUsers />;
      case 'views':
        return <FaEye />;
      case 'likes':
        return <FaHeart />;
      case 'rating':
        return <FaStar />;
      case 'trend':
        return <FaChartLine />;
      default:
        return <FaCar />;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-500',
          light: 'bg-blue-100',
          text: 'text-blue-600',
          border: 'border-blue-200'
        };
      case 'green':
        return {
          bg: 'bg-green-500',
          light: 'bg-green-100',
          text: 'text-green-600',
          border: 'border-green-200'
        };
      case 'purple':
        return {
          bg: 'bg-purple-500',
          light: 'bg-purple-100',
          text: 'text-purple-600',
          border: 'border-purple-200'
        };
      case 'orange':
        return {
          bg: 'bg-orange-500',
          light: 'bg-orange-100',
          text: 'text-orange-600',
          border: 'border-orange-200'
        };
      case 'red':
        return {
          bg: 'bg-red-500',
          light: 'bg-red-100',
          text: 'text-red-600',
          border: 'border-red-200'
        };
      default:
        return {
          bg: 'bg-blue-500',
          light: 'bg-blue-100',
          text: 'text-blue-600',
          border: 'border-blue-200'
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          card: 'p-4',
          icon: 'w-8 h-8',
          title: 'text-sm',
          value: 'text-xl'
        };
      case 'md':
        return {
          card: 'p-6',
          icon: 'w-12 h-12',
          title: 'text-base',
          value: 'text-2xl'
        };
      case 'lg':
        return {
          card: 'p-8',
          icon: 'w-16 h-16',
          title: 'text-lg',
          value: 'text-3xl'
        };
      default:
        return {
          card: 'p-6',
          icon: 'w-12 h-12',
          title: 'text-base',
          value: 'text-2xl'
        };
    }
  };

  const colors = getColorClasses();
  const sizes = getSizeClasses();

  return (
    <div className={`card ${sizes.card} hover:scale-105 transition-transform duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`${sizes.title} font-medium text-gray-600 mb-2`}>
            {title}
          </p>
          <p className={`${sizes.value} font-bold text-gray-900 mb-2`}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center">
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'up' ? '↗' : '↘'} {trendValue}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                з минулого місяця
              </span>
            </div>
          )}
        </div>
        <div className={`${colors.light} ${sizes.icon} rounded-full flex items-center justify-center ${colors.text}`}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

export const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          trendValue={stat.trendValue}
          color={stat.color}
          size={stat.size}
        />
      ))}
    </div>
  );
};

export const DashboardStats = () => {
  const stats = [
    {
      title: 'Всього автомобілів',
      value: '1,234',
      icon: 'car',
      trend: 'up',
      trendValue: '+12%',
      color: 'blue'
    },
    {
      title: 'Активні користувачі',
      value: '856',
      icon: 'users',
      trend: 'up',
      trendValue: '+8%',
      color: 'green'
    },
    {
      title: 'Перегляди сьогодні',
      value: '2,847',
      icon: 'views',
      trend: 'up',
      trendValue: '+15%',
      color: 'purple'
    },
    {
      title: 'Середній рейтинг',
      value: '4.8',
      icon: 'rating',
      trend: 'up',
      trendValue: '+0.2',
      color: 'orange'
    }
  ];

  return <StatsGrid stats={stats} />;
};
