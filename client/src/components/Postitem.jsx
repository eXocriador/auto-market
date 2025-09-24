import React, { useState } from 'react';
import { AiFillEye, AiOutlineMessage, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaMapMarkerAlt, FaCar, FaGasPump, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export const PostItem = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const fuelMap = {
        gasoline: 'Бензин',
        diesel: 'Дизель',
        'gaz/gasoline': 'Газ/Бензин',
        electro: 'Електро',
        hybrid: 'Гібрид'
    };

    const transmissionMap = {
        manual: 'МКПП',
        automatic: 'АКПП',
        robot: 'Робот',
        variator: 'Варіатор'
    };

    const conditionMap = {
        excellent: 'Відмінний',
        good: 'Хороший',
        fair: 'Задовільний',
        poor: 'Поганий'
    };

    const conditionColors = {
        excellent: 'bg-green-100 text-green-800',
        good: 'bg-blue-100 text-blue-800',
        fair: 'bg-yellow-100 text-yellow-800',
        poor: 'bg-red-100 text-red-800'
    };

    if (!post) {
        return (
            <div className='text-xl text-center text-gray-600 py-10'>
                Постів не існує
            </div>
        );
    }

    const formattedDate = post?.createdAt
        ? format(new Date(post.createdAt), "d MMM yy", { locale: ru })
        : '';

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const formatNumber = (num) => {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return (
        <Link 
            to={`/post/${post._id}`} 
            className='bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='relative'>
                {post?.imgUrl && (
                    <div className='relative overflow-hidden'>
                        <img
                            src={`http://localhost:3002/${post.imgUrl}`}
                            alt={post.title}
                            className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        
                        {/* Like button */}
                        <button
                            onClick={handleLike}
                            className='absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-200 transform hover:scale-110 z-10'
                        >
                            {isLiked ? (
                                <AiFillHeart className='text-red-500 text-lg' />
                            ) : (
                                <AiOutlineHeart className='text-gray-600 text-lg' />
                            )}
                        </button>

                        {/* Price badge */}
                        <div className='absolute bottom-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg'>
                            ${formatNumber(post.price)}
                        </div>

                        {/* Accident badge */}
                        {post.hasAccident && (
                            <div className='absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg flex items-center space-x-1'>
                                <FaExclamationTriangle className='text-xs' />
                                <span>ДТП</span>
                            </div>
                        )}

                        {/* Condition badge */}
                        {post.condition && (
                            <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-medium shadow-lg ${conditionColors[post.condition]}`}>
                                {conditionMap[post.condition]}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className='p-6'>
                {/* Header */}
                <div className='flex justify-between items-start mb-3'>
                    <div className='flex items-center space-x-2'>
                        <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                            <span className='text-white text-sm font-bold'>
                                {post.username?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className='font-semibold text-gray-900'>{post.username}</p>
                            <p className='text-xs text-gray-500 flex items-center'>
                                <FaCalendarAlt className='mr-1' />
                                {formattedDate}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Title and Model */}
                <h2 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2'>
                    {post.title}
                </h2>
                
                {/* Brand and Model */}
                <div className='mb-3'>
                    {post.brand && post.model && (
                        <p className='text-lg text-gray-700 flex items-center'>
                            <FaCar className='mr-2 text-blue-500' />
                            {post.brand} {post.model}
                        </p>
                    )}
                    {post.year && (
                        <p className='text-sm text-gray-600 mt-1'>
                            {post.year} рік
                        </p>
                    )}
                </div>

                {/* Number Plate */}
                {post.numberPlate && (
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold px-3 py-1 rounded-lg w-fit mb-3 shadow-md">
                        {post.numberPlate}
                    </div>
                )}

                {/* Car Details */}
                <div className='space-y-2 mb-4'>
                    <div className='flex items-center text-sm text-gray-600'>
                        <FaGasPump className='mr-2 text-green-500' />
                        <span>{fuelMap[post.fuel]}, {post.engine} л</span>
                        {post.power && <span className='ml-1'>({post.power} к.с.)</span>}
                    </div>
                    <div className='flex items-center text-sm text-gray-600'>
                        <FaMapMarkerAlt className='mr-2 text-red-500' />
                        <span>{formatNumber(post.mileage)} км</span>
                    </div>
                    {post.transmission && (
                        <div className='flex items-center text-sm text-gray-600'>
                            <FaCar className='mr-2 text-purple-500' />
                            <span>{transmissionMap[post.transmission]}</span>
                        </div>
                    )}
                </div>

                {/* Description */}
                <p className='text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed'>
                    {post.text}
                </p>

                {/* Additional Info */}
                <div className='flex flex-wrap gap-2 mb-4'>
                    {post.color && (
                        <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full'>
                            {post.color}
                        </span>
                    )}
                    {post.bodyType && (
                        <span className='px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full'>
                            {post.bodyType}
                        </span>
                    )}
                    {post.isCustomsCleared && (
                        <span className='px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full'>
                            Розмитнений
                        </span>
                    )}
                    {post.isFirstOwner && (
                        <span className='px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full'>
                            Перший власник
                        </span>
                    )}
                </div>

                {/* Stats */}
                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                    <div className='flex items-center space-x-4 text-sm text-gray-500'>
                        <div className='flex items-center space-x-1'>
                            <AiFillEye className='text-blue-500' />
                            <span>{post.views || 0}</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <AiOutlineMessage className='text-green-500' />
                            <span>{post.comments?.length || 0}</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <AiOutlineHeart className='text-red-500' />
                            <span>{post.likes || 0}</span>
                        </div>
                    </div>
                    
                    <div className='text-lg font-bold text-green-600'>
                        ${formatNumber(post.price)}
                    </div>
                </div>
            </div>
        </Link>
    );
};
