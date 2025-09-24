import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllposts } from '../redux/features/auth/post/fixed_postSlice';
import { getMe } from '../redux/features/auth/authSlice';
import { Link } from 'react-router-dom'; // 🔹 Додано для навігації

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllposts({ user: user._id }));
    }
  }, [dispatch, user?._id]);

  const brandStats = {};
  let totalPrice = 0;

  const exchangeRate = 40;
  posts.forEach((post) => {
    const brand = post.brand || 'Невідомо';
    brandStats[brand] = (brandStats[brand] || 0) + 1;
    totalPrice += (Number(post.price) || 0) * exchangeRate;
  });

  const totalUSD = totalPrice / exchangeRate;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      {/* --- КОРИСТУВАЧ --- */}
      <div className="flex items-center gap-6 border-b pb-6">
        <img
          src={user?.avatar || 'https://i.pravatar.cc/100'}
          alt="avatar"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold text-black">{user?.username}</h1>
          <p className="text-sm text-gray-500">
            Дата реєстрації: {new Date(user?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-green-600">
            Підписка: {user?.subscription ? 'Активна' : 'Немає'}
          </p>
          {/* 🔹 Кнопка переходу до чату */}
          <Link
            to="/chat"
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            Перейти до чату
          </Link>
        </div>
      </div>

      {/* --- ПОСТИ + СТАТИСТИКА --- */}
      <h2 className="mt-10 text-xl font-bold">Ваші пости</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Пости */}
        <div className="md:col-span-2 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={post.imgUrl}
                    alt="car"
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white border border-black rounded inline-flex items-center font-semibold text-blue-900 text-lg w-fit">
                        <div className="flex items-center">
                          <div className="flex flex-col items-center justify-center bg-blue-600 text-white px-1 py-0.5 rounded-l-sm mr-1 w-5 h-5">
                            <div className="text-[8px] font-bold">UA</div>
                            <div className="w-full h-0.5 bg-yellow-400"></div>
                          </div>
                          <span className="text-xs font-bold px-1 text-black">
                            {post.numberPlate || 'Номерний знак не вказано'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {post.model} • {post.year}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {(Number(post.price) * exchangeRate).toLocaleString('uk-UA')} ₴
                  </p>
                  <p
                    className={`text-sm ${
                      post.isSold ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    {post.isSold ? 'Продано' : 'В наявності'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>Поки що немає постів.</div>
          )}
        </div>

        {/* Статистика */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow-sm h-fit">
          <h3 className="text-lg font-bold mb-2">Статистика</h3>
          <p className="mb-2 font-semibold">Загальна кількість: {posts.length}</p>
          <p className="mb-1 font-semibold text-green-600">
            Сума: {totalPrice.toLocaleString('uk-UA')} ₴
          </p>
          <p className="text-sm text-gray-600 mb-2">
            ≈ {(totalUSD).toFixed(2).toLocaleString('en-US')} $
          </p>
          <div className="mt-2">
            <p className="font-semibold mb-1">Кількість по брендах:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {Object.entries(brandStats).map(([brand, count]) => (
                <li key={brand}>
                  {brand}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
