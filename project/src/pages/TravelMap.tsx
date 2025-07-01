import React, { useState } from 'react';
import { 
  Map, 
  MapPin, 
  Star, 
  Navigation, 
  Phone, 
  Clock,
  Filter,
  Search,
  Camera,
  Heart,
  ThumbsUp,
  Crown,
  Calendar,
  DollarSign,
  Coffee,
  Sun,
  Moon,
  Route,
  X
} from 'lucide-react';
import { travelLocations } from '../data/mockData';
import { TravelLocation } from '../types';

interface MealPlan {
  id: string;
  time: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  restaurant: TravelLocation;
  estimatedCost: number;
  travelTime: number;
}

interface DayPlan {
  date: string;
  totalBudget: number;
  meals: MealPlan[];
  totalCost: number;
  route: string;
}

const TravelMap: React.FC = () => {
  const [locations, setLocations] = useState<TravelLocation[]>(travelLocations);
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumPlan, setPremiumPlan] = useState<DayPlan | null>(null);
  
  // Premium form state
  const [budget, setBudget] = useState<number>(500000);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [mealTimes, setMealTimes] = useState({
    breakfast: '08:00',
    lunch: '12:00',
    dinner: '19:00'
  });

  const locationTypes = [
    { value: 'all', label: 'Tất cả', icon: '🍽️' },
    { value: 'restaurant', label: 'Nhà hàng', icon: '🏪' },
    { value: 'cafe', label: 'Quán cà phê', icon: '☕' },
    { value: 'street_food', label: 'Ăn vặt', icon: '🥘' },
    { value: 'dessert', label: 'Tráng miệng', icon: '🍨' },
  ];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesType = selectedType === 'all' || location.type === selectedType;
    return matchesSearch && matchesType;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}
      />
    ));
  };

  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleReviewLike = (locationId: number, reviewId: number) => {
    setLocations(prevLocations =>
      prevLocations.map(location =>
        location.id === locationId
          ? {
              ...location,
              reviews: location.reviews.map(review =>
                review.id === reviewId
                  ? { ...review, likes: review.likes + 1 }
                  : review
              )
            }
          : location
      )
    );
  };

  const generatePremiumPlan = () => {
    if (!selectedDate || budget < 100000) return;

    // Simulate AI-generated meal plan
    const availableRestaurants = locations.filter(loc => {
      const avgPrice = parseInt(loc.priceRange.split('-')[0].replace(/[^0-9]/g, ''));
      return avgPrice <= budget / 3; // Ensure we can afford 3 meals
    });

    const breakfastSpots = availableRestaurants.filter(loc => loc.type === 'cafe' || loc.specialties.some(s => s.includes('bánh mì')));
    const lunchSpots = availableRestaurants.filter(loc => loc.type === 'restaurant' || loc.type === 'street_food');
    const dinnerSpots = availableRestaurants.filter(loc => loc.type === 'restaurant');

    const meals: MealPlan[] = [
      {
        id: 'breakfast',
        time: mealTimes.breakfast,
        type: 'breakfast',
        restaurant: breakfastSpots[Math.floor(Math.random() * breakfastSpots.length)] || availableRestaurants[0],
        estimatedCost: Math.floor(budget * 0.2),
        travelTime: 15
      },
      {
        id: 'lunch',
        time: mealTimes.lunch,
        type: 'lunch',
        restaurant: lunchSpots[Math.floor(Math.random() * lunchSpots.length)] || availableRestaurants[1],
        estimatedCost: Math.floor(budget * 0.4),
        travelTime: 20
      },
      {
        id: 'dinner',
        time: mealTimes.dinner,
        type: 'dinner',
        restaurant: dinnerSpots[Math.floor(Math.random() * dinnerSpots.length)] || availableRestaurants[2],
        estimatedCost: Math.floor(budget * 0.4),
        travelTime: 25
      }
    ];

    const totalCost = meals.reduce((sum, meal) => sum + meal.estimatedCost, 0);

    const plan: DayPlan = {
      date: selectedDate,
      totalBudget: budget,
      meals,
      totalCost,
      route: `Tối ưu hóa tuyến đường cho ${meals.length} điểm dừng`
    };

    setPremiumPlan(plan);
    setShowPremiumModal(false);
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return <Coffee size={20} className="text-yellow-500" />;
      case 'lunch': return <Sun size={20} className="text-orange-500" />;
      case 'dinner': return <Moon size={20} className="text-purple-500" />;
      default: return <MapPin size={20} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-button rounded-full mb-6 shadow-glow">
            <Map size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bản Đồ Ẩm Thực Thủ Đức
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Khám phá những địa điểm ẩm thực tuyệt vời tại Thủ Đức, TP.HCM. Chia sẻ trải nghiệm và tìm kiếm món ăn phù hợp với tâm trạng
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Tìm kiếm địa điểm, món ăn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-glass w-full pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter size={20} className="text-white/60 flex-shrink-0" />
            {locationTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedType === type.value
                    ? 'bg-gradient-button text-white shadow-glow'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Premium Button */}
          <button
            onClick={() => setShowPremiumModal(true)}
            className="btn-primary flex items-center space-x-2 whitespace-nowrap"
          >
            <Crown size={20} />
            <span>Premium Plan</span>
          </button>
        </div>

        {/* Premium Plan Display */}
        {premiumPlan && (
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Crown size={24} className="text-yellow-400" />
                <h2 className="text-xl font-bold text-white">
                  Kế hoạch ăn uống ngày {new Date(premiumPlan.date).toLocaleDateString('vi-VN')}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60">Tổng ngân sách</div>
                <div className="text-lg font-bold text-green-400">{formatCurrency(premiumPlan.totalBudget)}</div>
                <div className="text-sm text-white/60">Dự kiến: {formatCurrency(premiumPlan.totalCost)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumPlan.meals.map((meal) => (
                <div key={meal.id} className="glass rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    {getMealIcon(meal.type)}
                    <span className="font-semibold text-white capitalize">{meal.type}</span>
                    <span className="text-white/60 text-sm">{meal.time}</span>
                  </div>
                  
                  <div className="flex items-start space-x-3 mb-3">
                    <img
                      src={meal.restaurant.image}
                      alt={meal.restaurant.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-white text-sm">{meal.restaurant.name}</h3>
                      <p className="text-white/60 text-xs mb-1">{meal.restaurant.address}</p>
                      <div className="flex items-center space-x-1">
                        {renderStars(meal.restaurant.rating)}
                        <span className="text-xs text-white/60">({meal.restaurant.rating})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400 font-medium">{formatCurrency(meal.estimatedCost)}</span>
                    <button
                      onClick={() => openGoogleMaps(meal.restaurant.address)}
                      className="flex items-center space-x-1 text-primary-400 hover:text-primary-300"
                    >
                      <Navigation size={14} />
                      <span>{meal.travelTime}p</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white/60">
                <Route size={16} />
                <span className="text-sm">{premiumPlan.route}</span>
              </div>
              <button
                onClick={() => {
                  const addresses = premiumPlan.meals.map(meal => meal.restaurant.address).join(' to ');
                  openGoogleMaps(addresses);
                }}
                className="btn-secondary text-sm"
              >
                <Navigation size={16} className="mr-2" />
                Xem tuyến đường
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section - Left Side */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Bản Đồ Tương Tác</h3>
                <span className="text-white/60 text-sm">
                  {filteredLocations.length} địa điểm
                </span>
              </div>
              
              {/* Map Demo Area */}
              <div className="flex-1 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center p-8">
                <MapPin size={64} className="text-primary-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Google Maps Integration</h4>
                <p className="text-white/60 mb-4">
                  Bản đồ tương tác hiển thị {filteredLocations.length} địa điểm ẩm thực tại Thủ Đức
                </p>
                <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                  {filteredLocations.slice(0, 4).map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location)}
                      className="glass rounded-lg p-3 hover:bg-white/20 transition-all text-left"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin size={12} className="text-primary-400" />
                        <span className="text-white text-xs font-medium truncate">
                          {location.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(location.rating)}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-white/40 text-xs mt-4">
                  * Demo interface - Sẽ tích hợp Google Maps thực tế
                </p>
              </div>
            </div>
          </div>

          {/* Location List - Right Side */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Địa điểm gợi ý ({filteredLocations.length})
              </h2>
              <button className="text-primary-400 hover:text-primary-300 text-sm">
                Xem tất cả
              </button>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={`glass-card rounded-xl p-4 cursor-pointer transition-all card-hover ${
                    selectedLocation?.id === location.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white mb-1 truncate">
                        {location.name}
                      </h3>
                      <p className="text-sm text-white/60 mb-2 line-clamp-2">
                        {location.address}
                      </p>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(location.rating)}
                          <span className="text-sm text-white/60">({location.rating})</span>
                        </div>
                        <span className="text-sm text-green-400 font-medium">
                          {location.priceRange.split(' - ')[0]}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-white/50 mb-2">
                        <Clock size={12} />
                        <span>{location.openHours}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {location.specialties.slice(0, 2).map((specialty, index) => (
                          <span
                            key={index}
                            className="text-xs bg-primary-500/20 text-primary-300 px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openGoogleMaps(location.address);
                      }}
                      className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 text-sm"
                    >
                      <Navigation size={14} />
                      <span>Chỉ đường</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <button className="text-white/40 hover:text-red-400 transition-colors">
                        <Heart size={16} />
                      </button>
                      <button className="text-white/40 hover:text-blue-400 transition-colors">
                        <Camera size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Modal */}
        {showPremiumModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Crown size={24} className="text-yellow-400" />
                    <h2 className="text-2xl font-bold text-white">Premium Food Planner</h2>
                  </div>
                  <button
                    onClick={() => setShowPremiumModal(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Budget Input */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Ngân sách cho ngày (VNĐ)
                    </label>
                    <div className="relative">
                      <DollarSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                      <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="input-glass w-full pl-10"
                        placeholder="500,000"
                        min="100000"
                        step="50000"
                      />
                    </div>
                    <p className="text-white/60 text-sm mt-1">
                      Tối thiểu 100,000 VNĐ cho 3 bữa ăn
                    </p>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Chọn ngày
                    </label>
                    <div className="relative">
                      <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="input-glass w-full pl-10"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  {/* Meal Times */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      Thời gian các bữa ăn
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-white/60 mb-1">Sáng</label>
                        <div className="relative">
                          <Coffee size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                          <input
                            type="time"
                            value={mealTimes.breakfast}
                            onChange={(e) => setMealTimes(prev => ({ ...prev, breakfast: e.target.value }))}
                            className="input-glass w-full pl-10 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-white/60 mb-1">Trưa</label>
                        <div className="relative">
                          <Sun size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                          <input
                            type="time"
                            value={mealTimes.lunch}
                            onChange={(e) => setMealTimes(prev => ({ ...prev, lunch: e.target.value }))}
                            className="input-glass w-full pl-10 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-white/60 mb-1">Tối</label>
                        <div className="relative">
                          <Moon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                          <input
                            type="time"
                            value={mealTimes.dinner}
                            onChange={(e) => setMealTimes(prev => ({ ...prev, dinner: e.target.value }))}
                            className="input-glass w-full pl-10 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="glass rounded-lg p-4">
                    <h3 className="font-semibold text-white mb-3">Tính năng Premium:</h3>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>AI gợi ý quán ăn phù hợp ngân sách</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Tối ưu hóa tuyến đường di chuyển</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Phân bổ ngân sách thông minh</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Chỉ đường Google Maps tích hợp</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowPremiumModal(false)}
                      className="btn-secondary flex-1"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={generatePremiumPlan}
                      disabled={!selectedDate || budget < 100000}
                      className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Tạo kế hoạch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Location Detail Modal */}
        {selectedLocation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.name}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedLocation.name}
                    </h2>
                    <p className="text-white/60 flex items-center space-x-2 mb-2">
                      <MapPin size={16} />
                      <span>{selectedLocation.address}</span>
                    </p>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedLocation.rating)}
                        <span className="text-sm text-white/60 ml-1">({selectedLocation.rating})</span>
                      </div>
                      <span className="text-green-400 font-medium">{selectedLocation.priceRange}</span>
                    </div>
                  </div>
                </div>

                <p className="text-white/80 mb-6 leading-relaxed">
                  {selectedLocation.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">📍 Thông tin chi tiết</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-blue-400" />
                        <span className="font-medium text-white/80">Giờ mở cửa:</span>
                        <span className="text-white/60">{selectedLocation.openHours}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-green-400" />
                        <span className="font-medium text-white/80">Điện thoại:</span>
                        <span className="text-white/60">{selectedLocation.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 font-medium">💰 Giá:</span>
                        <span className="text-white/60">{selectedLocation.priceRange}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-3">✨ Tiện ích</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-white mb-3">🍽️ Món đặc sản</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-primary-500/20 text-primary-300 px-3 py-2 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="mb-6">
                  <h3 className="font-semibold text-white mb-4">💬 Đánh giá từ cộng đồng</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {selectedLocation.reviews.map((review) => (
                      <div key={review.id} className="glass rounded-lg p-4">
                        <div className="flex items-start space-x-3 mb-3">
                          <img
                            src={review.authorAvatar}
                            alt={review.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-white">{review.author}</span>
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <span className="text-sm text-white/50">
                              {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                        <p className="text-white/80 mb-3 leading-relaxed">{review.content}</p>
                        {review.images.length > 0 && (
                          <div className="flex space-x-2 mb-3">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt="Review"
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleReviewLike(selectedLocation.id, review.id)}
                            className="flex items-center space-x-1 text-sm text-white/50 hover:text-primary-400 transition-colors"
                          >
                            <ThumbsUp size={14} />
                            <span>{review.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => openGoogleMaps(selectedLocation.address)}
                    className="btn-primary flex-1 flex items-center justify-center space-x-2"
                  >
                    <Navigation size={20} />
                    <span>Chỉ đường</span>
                  </button>
                  <button className="btn-secondary">
                    <Heart size={20} />
                  </button>
                  <button className="btn-secondary">
                    <Camera size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelMap;