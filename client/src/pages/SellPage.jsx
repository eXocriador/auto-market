import React, { useEffect, useState, useRef, useCallback } from 'react';
import { PostItem } from '../components/Postitem';
import { PostFilters } from '../components/PostFilters';
import { useDispatch, useSelector } from 'react-redux';
import { getAllposts } from '../redux/features/auth/post/fixed_postSlice';

export const SellPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts, page, pages, hasMore, loading } = useSelector((state) => state.post);

  const [filters, setFilters] = useState({
    brand: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    fuel: '',
    transmission: '',
    bodyType: '',
    condition: '',
    hasAccident: '',
    mileageMax: '',
  });

  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const observer = useRef();

  const limit = 9;

  // Завантаження постів
  const loadPosts = useCallback((pageNumber = 1, append = false) => {
    const apiFilters = {
      ...filters,
      sortBy:
        sortBy === 'newest'
          ? 'createdAt'
          : sortBy === 'oldest'
          ? 'createdAt'
          : sortBy === 'price_asc'
          ? 'price'
          : sortBy === 'price_desc'
          ? 'price'
          : sortBy === 'mileage_asc'
          ? 'mileage'
          : sortBy === 'mileage_desc'
          ? 'mileage'
          : sortBy === 'year_desc'
          ? 'year'
          : sortBy === 'year_asc'
          ? 'year'
          : 'createdAt',
      sortOrder:
        sortBy === 'newest' ||
        sortBy === 'price_desc' ||
        sortBy === 'mileage_desc' ||
        sortBy === 'year_desc'
          ? 'desc'
          : 'asc',
      search: searchQuery,
      page: pageNumber,
      limit,
      append, // новий прапорець
    };
    dispatch(getAllposts(apiFilters));
  }, [dispatch, filters, sortBy, searchQuery]);

  // Початкове завантаження
  useEffect(() => {
    loadPosts(1, false); // завантажуємо першу сторінку, не додаючи
  }, [loadPosts]);

  // Обробка фільтрів
  useEffect(() => {
    loadPosts(1, false); // заміна постів при зміні фільтрів
  }, [filters, sortBy, searchQuery, loadPosts]);

  // Інфініті-скрол
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadPosts(page + 1, true); // додаємо пости
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, loadPosts]
  );

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSortChange = (newSortBy) => setSortBy(newSortBy);
  const handleSearchChange = (newSearchQuery) => setSearchQuery(newSearchQuery);

  const handlePageClick = (pageNumber) => {
    loadPosts(pageNumber, false); // заміна постів при кліку на кнопку
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <PostFilters
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        initialFilters={filters}
        initialSortBy={sortBy}
        initialSearchQuery={searchQuery}
      />

      <div className="flex-1">
        {loading && page === 1 ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Завантаження постів...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.length ? (
              posts.map((post, idx) => {
                if (posts.length === idx + 1) {
                  return <PostItem key={post._id} post={post} ref={lastPostRef} />;
                } else {
                  return <PostItem key={post._id} post={post} />;
                }
              })
            ) : (
              <div className="text-center col-span-3 text-gray-500 py-8">
                <p className="text-lg">Нічого не знайдено</p>
                <p className="text-sm mt-2">Спробуйте змінити фільтри або пошуковий запит</p>
              </div>
            )}
          </div>
        )}

        {/* Кнопки сторінок */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
