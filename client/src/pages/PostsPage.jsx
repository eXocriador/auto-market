import React, { useEffect, useState, useMemo } from 'react';
import axios from '../utils/fixed_axios';
import { PostItem } from '../components/Postitem';
import { PostFilters } from '../components/PostFilters';
import { FaCar, FaFilter, FaSort } from 'react-icons/fa';

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('posts/user/me');
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...posts];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title?.toLowerCase().includes(query) ||
        post.model?.toLowerCase().includes(query) ||
        post.text?.toLowerCase().includes(query) ||
        post.brand?.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.brand) {
      result = result.filter(post => post.brand === filters.brand);
    }
    if (filters.priceMin) {
      result = result.filter(post => post.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter(post => post.price <= Number(filters.priceMax));
    }
    if (filters.yearMin) {
      result = result.filter(post => post.year >= Number(filters.yearMin));
    }
    if (filters.yearMax) {
      result = result.filter(post => post.year <= Number(filters.yearMax));
    }
    if (filters.fuel) {
      result = result.filter(post => post.fuel === filters.fuel);
    }
    if (filters.transmission) {
      result = result.filter(post => post.transmission === filters.transmission);
    }
    if (filters.bodyType) {
      result = result.filter(post => post.bodyType === filters.bodyType);
    }
    if (filters.condition) {
      result = result.filter(post => post.condition === filters.condition);
    }
    if (filters.hasAccident !== '') {
      result = result.filter(post => post.hasAccident === (filters.hasAccident === 'true'));
    }
    if (filters.mileageMax) {
      result = result.filter(post => post.mileage <= Number(filters.mileageMax));
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage_asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileage_desc':
        result.sort((a, b) => b.mileage - a.mileage);
        break;
      case 'year_desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'year_asc':
        result.sort((a, b) => a.year - b.year);
        break;
      default:
        break;
    }

    setFilteredPosts(result);
  }, [posts, filters, sortBy, searchQuery]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleSearchChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  };

  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const activePosts = posts.filter(post => post.isActive !== false).length;
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const avgPrice = totalPosts > 0 ? posts.reduce((sum, post) => sum + post.price, 0) / totalPosts : 0;

    return { totalPosts, activePosts, totalViews, avgPrice };
  }, [posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження постів...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Мої оголошення</h1>
              <p className="text-gray-600">Управляйте вашими оголошеннями про продаж автомобілів</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{stats.totalPosts}</div>
                <div className="text-sm text-gray-600">Всього оголошень</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{stats.totalViews}</div>
                <div className="text-sm text-gray-600">Переглядів</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaCar className="text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Активні оголошення</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.activePosts}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaFilter className="text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Показано</p>
                  <p className="text-lg font-semibold text-gray-900">{filteredPosts.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaSort className="text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Середня ціна</p>
                  <p className="text-lg font-semibold text-gray-900">${Math.round(stats.avgPrice)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FaCar className="text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Всього переглядів</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.totalViews}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <PostFilters 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
        />

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <PostItem post={post} key={post._id || idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaCar className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery || Object.values(filters).some(f => f) 
                  ? 'Немає результатів' 
                  : 'Немає оголошень'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || Object.values(filters).some(f => f)
                  ? 'Спробуйте змінити фільтри або пошуковий запит'
                  : 'Створіть перше оголошення про продаж автомобіля'}
              </p>
              {!searchQuery && !Object.values(filters).some(f => f) && (
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Створити оголошення
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
