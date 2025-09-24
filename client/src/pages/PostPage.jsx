import React, { useState, useEffect, useCallback } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
//import { Button } from '@/components/ui/button'; //Припустимо, що у вас є такий компонент
//import { cn } from '@/lib/utils';  //Припустимо, що у вас є така утиліта

axios.defaults.baseURL = 'http://localhost:3002/api';

const fuelMap = {
  gasoline: 'Бензин',
  diesel: 'Дизель',
  'gaz/gasoline': 'Газ/Бензин',
  electro: 'Електро',
};

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data);
    } catch (error) {
      console.error('Помилка завантаження поста:', error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return <div className="text-xl text-center text-black py-10">Постов не існує</div>;
  }

  const formattedDate = post.createdAt
    ? format(new Date(post.createdAt), 'dd MMMM yyyy', { locale: ru })
    : 'Немає дати';

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/sell')}
        className="bg-red-600 text-white rounded-md py-2 px-4 mb-4 hover:bg-red-700 transition-colors"
      >
        Назад
      </button>
      <div className="flex justify-start flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div className="rounded-md overflow-hidden">
            {post.imgUrl ? (
              <img
                src={`http://localhost:3002${post.imgUrl.startsWith('/') ? '' : '/'}${post.imgUrl}`}
                alt="Зображення автомобіля"
                className="object-cover w-full h-auto max-h-[400px]" // Added max-h
              />
            ) : (
              <div className="text-black text-center w-full py-10 bg-gray-200">
                Немає зображення
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div>{post.username || 'Анонім'}</div>
              <div>{formattedDate}</div>
            </div>
            <h1 className="text-2xl font-bold text-black mt-2">{post.title || 'Без заголовка'}</h1>
            <div className="text-xl text-black mt-2">{post.model}</div>
            <div className="text-sm font-semibold text-gray-800 mt-2">
              {post.mileage} км пробігу
            </div>
            <div className="flex gap-2 mt-2">
              <div className="text-sm font-semibold text-gray-800">
                {fuelMap[post.fuel]},
              </div>
              <div className="text-sm font-semibold text-gray-800">{post.engine}л</div>
            </div>
            <div className="text-2xl font-bold text-green-600 mt-4 uppercase">
              ${post.price || 'Обмін'}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {post.text || 'Немає опису'}
            </p>
            <div className="flex gap-3 items-center mt-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <AiFillEye /> <span>{post.views || 0}</span>
              </div>
            </div>
          </div>
        </div>
        {/* You can add a second column here if needed */}
      </div>
    </div>
  );
};

export default PostPage;
