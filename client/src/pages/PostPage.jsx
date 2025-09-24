import React, { useState, useEffect, useCallback } from 'react';
import { AiFillEye, AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai';
import { FaArrowLeft, FaPhone, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/fixed_axios';
import { CarDetailsCard } from '../components/CarDetailsCard';

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data);
    } catch (error) {
      console.error('Помилка завантаження поста:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Посилання скопійовано в буфер обміну!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження оголошення...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FaUser className="text-red-600 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Оголошення не знайдено</h3>
          <p className="text-gray-600 mb-4">Можливо, воно було видалено або не існує</p>
          <button
            onClick={() => navigate('/posts')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Повернутися до оголошень
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/posts')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            <span>Назад до оголошень</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Car Details Card */}
            <CarDetailsCard post={post} />

            {/* Action Buttons */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isLiked ? (
                      <AiFillHeart className="text-lg" />
                    ) : (
                      <AiOutlineHeart className="text-lg" />
                    )}
                    <span className="font-medium">
                      {isLiked ? 'В обраному' : 'В обране'}
                    </span>
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <AiOutlineShareAlt className="text-lg" />
                    <span className="font-medium">Поділитися</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <AiFillEye className="text-lg" />
                  <span>{post.views || 0} переглядів</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FaUser className="text-blue-600" />
                <span>Контактна інформація</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaPhone className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Телефон</p>
                    <p className="font-medium text-gray-900">
                      {post.phone || 'Не вказано'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaMapMarkerAlt className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Розташування</p>
                    <p className="font-medium text-gray-900">
                      {post.location || 'Не вказано'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaUser className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Продавець</p>
                    <p className="font-medium text-gray-900">{post.username}</p>
                  </div>
                </div>
              </div>

              {post.phone && (
                <button className="w-full mt-4 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Зателефонувати
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Швидка статистика</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Дата публікації</span>
                  <span className="font-medium">
                    {new Date(post.createdAt).toLocaleDateString('uk-UA')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Перегляди</span>
                  <span className="font-medium">{post.views || 0}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Коментарі</span>
                  <span className="font-medium">{post.comments?.length || 0}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">В обраному</span>
                  <span className="font-medium">{post.likes || 0}</span>
                </div>
              </div>
            </div>

            {/* Similar Posts Placeholder */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Схожі оголошення</h3>
              <p className="text-gray-600 text-sm">
                Тут будуть показані схожі оголошення з такою ж маркою або ціновим діапазоном
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
