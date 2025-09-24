import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export const PostItem = ({ post }) => {
    const fuelMap = {
        gasoline: 'Бензин',
        diesel: 'Дизель',
        'gaz/gasoline': 'Газ/Бензин',
        electro: 'Електро',
    };

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Постов не существует
            </div>
        );
    }

    const formattedDate = post?.createdAt
        ? format(new Date(post.createdAt), "d MMM yy", { locale: ru })
        : '';

    return (
        <Link to={`/post/${post._id}`} className='w-[300px] bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300'>
            <div className='flex flex-col'>
                {post?.imgUrl && (
                    <img
                        src={`http://localhost:3002/${post.imgUrl}`}
                        alt="img"
                        className='w-full h-[180px] object-cover'
                    />
                )}
                <div className='px-3 py-2 flex flex-col'>
                    <div className='flex justify-between text-xs text-gray-500'>
                        <span className='font-bold'>{post.username}</span>
                        <span>{formattedDate}</span>
                    </div>

                    <h2 className='text-xl font-semibold text-black pt-1'>{post.title}</h2>
                    {post.model && <div className='text-base text-black'>{post.model}</div>}

                    {post.numberPlate && (
                        <div className="bg-blue-900 text-white text-xs font-semibold px-2 py-1 rounded w-fit mt-1">
                            {post.numberPlate}
                        </div>
                    )}

                    <div className='text-sm text-gray-700 pt-2'>
                        {post.mileage} км • {fuelMap[post.fuel]}, {post.engine} л
                    </div>

                    <p className='text-green-800 text-2xl font-bold pt-1'>${post.price}</p>
                    <p className='text-gray-600 text-sm pt-2 line-clamp-3'>{post.text}</p>

                    <div className='flex gap-4 items-center mt-4 text-gray-500 text-sm'>
                        <div className='flex items-center gap-1'><AiFillEye /> {post.views}</div>
                        <div className='flex items-center gap-1'><AiOutlineMessage /> {post.comments?.length || 0}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
