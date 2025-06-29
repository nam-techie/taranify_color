import React, { useState } from 'react';
import { 
  Heart, 
  Music, 
  Film, 
  Tv, 
  BookOpen, 
  Utensils, 
  MapPin,
  ExternalLink,
  Trash2,
  Filter,
  Search,
  Star,
  Play,
  ShoppingCart,
  Navigation
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface FavoriteItem {
  id: string;
  type: 'music' | 'movie' | 'netflix' | 'book' | 'food' | 'restaurant';
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating?: number;
  link?: string;
  addedAt: string;
  category?: string;
  matchPercentage?: string;
}

const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock favorites data
  const [favorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      type: 'music',
      title: 'Blinding Lights',
      subtitle: 'The Weeknd • After Hours',
      description: 'Bài hát năng động phù hợp với tâm trạng nhiệt huyết',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      rating: 4.8,
      link: 'https://open.spotify.com/track/0VjIjW4GlULA4LGoDOLVKN',
      addedAt: '2024-01-15T10:30:00Z',
      matchPercentage: '95%'
    },
    {
      id: '2',
      type: 'movie',
      title: 'Your Name',
      subtitle: 'Anime • 2016 • 1h 46m',
      description: 'Phim anime lãng mạn với hình ảnh đẹp mắt',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      rating: 8.2,
      link: 'https://www.imdb.com/title/tt5311514/',
      addedAt: '2024-01-14T15:20:00Z',
      matchPercentage: '92%'
    },
    {
      id: '3',
      type: 'netflix',
      title: 'Stranger Things',
      subtitle: 'Sci-Fi Horror • 4 seasons',
      description: 'Series kinh dị khoa học viễn tưởng hấp dẫn',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      rating: 8.7,
      link: 'https://www.netflix.com/title/80057281',
      addedAt: '2024-01-13T20:15:00Z',
      matchPercentage: '88%'
    },
    {
      id: '4',
      type: 'book',
      title: 'The Alchemist',
      subtitle: 'Paulo Coelho • Philosophy',
      description: 'Cuốn sách truyền cảm hứng về việc theo đuổi ước mơ',
      image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
      rating: 4.6,
      link: 'https://www.amazon.com/dp/0062315005',
      addedAt: '2024-01-12T14:45:00Z',
      matchPercentage: '90%'
    },
    {
      id: '5',
      type: 'food',
      title: 'Japanese Cuisine',
      subtitle: 'Asian • Healthy',
      description: 'Ẩm thực Nhật Bản thanh đạm, cân bằng',
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg',
      addedAt: '2024-01-11T12:30:00Z',
      matchPercentage: '94%'
    },
    {
      id: '6',
      type: 'restaurant',
      title: 'Highlands Coffee',
      subtitle: 'Cafe • ĐHQG TP.HCM',
      description: 'Quán cà phê yên tĩnh, thích hợp học bài',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
      rating: 4.2,
      addedAt: '2024-01-10T16:20:00Z'
    }
  ]);

  const filters = [
    { value: 'all', label: 'Tất cả', icon: Heart, count: favorites.length },
    { value: 'music', label: 'Spotify', icon: Music, count: favorites.filter(f => f.type === 'music').length },
    { value: 'movie', label: 'Movies', icon: Film, count: favorites.filter(f => f.type === 'movie').length },
    { value: 'netflix', label: 'Netflix', icon: Tv, count: favorites.filter(f => f.type === 'netflix').length },
    { value: 'book', label: 'Books', icon: BookOpen, count: favorites.filter(f => f.type === 'book').length },
    { value: 'food', label: 'Food', icon: Utensils, count: favorites.filter(f => f.type === 'food').length },
    { value: 'restaurant', label: 'Restaurants', icon: MapPin, count: favorites.filter(f => f.type === 'restaurant').length }
  ];

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'music': return <Music size={20} className="text-green-400" />;
      case 'movie': return <Film size={20} className="text-yellow-400" />;
      case 'netflix': return <Tv size={20} className="text-red-400" />;
      case 'book': return <BookOpen size={20} className="text-blue-400" />;
      case 'food': return <Utensils size={20} className="text-orange-400" />;
      case 'restaurant': return <MapPin size={20} className="text-purple-400" />;
      default: return <Heart size={20} className="text-pink-400" />;
    }
  };

  const getActionButton = (item: FavoriteItem) => {
    switch (item.type) {
      case 'music':
        return (
          <button
            onClick={() => item.link && window.open(item.link, '_blank')}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Play size={16} />
            <span>Play</span>
          </button>
        );
      case 'movie':
      case 'netflix':
        return (
          <button
            onClick={() => item.link && window.open(item.link, '_blank')}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ExternalLink size={16} />
            <span>Watch</span>
          </button>
        );
      case 'book':
        return (
          <button
            onClick={() => item.link && window.open(item.link, '_blank')}
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart size={16} />
            <span>Buy</span>
          </button>
        );
      case 'restaurant':
        return (
          <button
            onClick={() => {
              const query = encodeURIComponent(item.title + ' ' + item.subtitle);
              window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
            }}
            className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Navigation size={16} />
            <span>Directions</span>
          </button>
        );
      default:
        return (
          <button className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            <ExternalLink size={16} />
            <span>View</span>
          </button>
        );
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}
      />
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart size={64} className="text-white/40 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Chưa đăng nhập</h2>
          <p className="text-white/60">Vui lòng đăng nhập để xem mục yêu thích</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-button rounded-full mb-6 shadow-glow">
            <Heart size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mục Yêu Thích
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Bộ sưu tập cá nhân các gợi ý từ trắc nghiệm màu sắc và địa điểm yêu thích
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{favorites.length}</div>
            <div className="text-white/60 text-sm">Tổng mục yêu thích</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {favorites.filter(f => f.type === 'music').length}
            </div>
            <div className="text-white/60 text-sm">Bài hát</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {favorites.filter(f => f.type === 'movie' || f.type === 'netflix').length}
            </div>
            <div className="text-white/60 text-sm">Phim & Shows</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {favorites.filter(f => f.type === 'restaurant' || f.type === 'food').length}
            </div>
            <div className="text-white/60 text-sm">Ẩm thực</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Tìm kiếm trong mục yêu thích..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glass w-full pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter size={20} className="text-white/60 flex-shrink-0" />
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedFilter === filter.value
                      ? 'bg-gradient-button text-white shadow-glow'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span>{filter.label}</span>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((item) => (
            <div key={item.id} className="glass-card rounded-2xl overflow-hidden card-hover">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
                    {getTypeIcon(item.type)}
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-red-500/60 transition-colors">
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
                {item.matchPercentage && (
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {item.matchPercentage} match
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-2">{item.subtitle}</p>
                    {item.rating && (
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(item.rating)}
                        <span className="text-white/60 text-sm ml-1">({item.rating})</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-xs">
                    {new Date(item.addedAt).toLocaleDateString('vi-VN')}
                  </span>
                  {getActionButton(item)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFavorites.length === 0 && (
          <div className="text-center py-12">
            <Heart size={64} className="text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? 'Không tìm thấy mục nào' : 'Chưa có mục yêu thích nào'}
            </h3>
            <p className="text-white/60 mb-6">
              {searchTerm 
                ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                : 'Hãy làm trắc nghiệm màu sắc để nhận gợi ý và thêm vào yêu thích'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => window.location.href = '/quiz'}
                className="btn-primary"
              >
                Làm trắc nghiệm ngay
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;