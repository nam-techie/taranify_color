import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  X, 
  Star, 
  Zap, 
  Users, 
  MessageCircle, 
  Heart,
  Camera,
  MapPin,
  Brain,
  Sparkles,
  Shield,
  Headphones,
  Gift,
  Smartphone,
  Palette,
  BarChart3,
  Video,
  ChefHat,
  Gamepad2,
  Music,
  BookOpen,
  TrendingUp,
  Award,
  Rocket,
  Target,
  Globe,
  Lock
} from 'lucide-react';

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Khám phá cơ bản các tính năng COLOR BITES',
      icon: Star,
      color: 'from-gray-500 to-gray-600',
      popular: false,
      features: [
        { name: 'Trắc nghiệm AI màu sắc', limit: '10 lần/tháng', included: true },
        { name: 'Gợi ý quán ăn theo giá', limit: '1 lần/tuần', included: true },
        { name: 'Đăng bài cộng đồng cơ bản', limit: 'Không giới hạn', included: true },
        { name: 'Xem bài viết cộng đồng', limit: 'Không giới hạn', included: true },
        { name: 'Tìm kiếm quán ăn cơ bản', limit: 'Có', included: true },
        { name: 'Lưu quán ăn yêu thích', limit: '5 quán', included: true },
        { name: 'Premium Food Planner', limit: '', included: false },
        { name: 'Trắc nghiệm không giới hạn', limit: '', included: false },
        { name: 'AI gợi ý nâng cao', limit: '', included: false },
        { name: 'Đăng công thức chi tiết', limit: '', included: false },
        { name: 'Video hướng dẫn nấu ăn', limit: '', included: false },
        { name: 'Tính năng cộng đồng nâng cao', limit: '', included: false },
        { name: 'Hỗ trợ ưu tiên', limit: '', included: false }
      ]
    },
    {
      name: 'Premium',
      price: { monthly: 36000, annual: 200000 },
      description: 'Trải nghiệm đầy đủ với AI thông minh và cộng đồng premium',
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        { name: 'Trắc nghiệm AI màu sắc', limit: 'Không giới hạn', included: true },
        { name: 'Gợi ý quán ăn theo giá', limit: 'Không giới hạn', included: true },
        { name: 'Đăng bài cộng đồng premium', limit: 'Công thức + video', included: true },
        { name: 'Xem bài viết cộng đồng', limit: 'Không giới hạn', included: true },
        { name: 'Tìm kiếm quán ăn nâng cao', limit: 'AI-powered', included: true },
        { name: 'Lưu quán ăn yêu thích', limit: 'Không giới hạn', included: true },
        { name: 'Premium Food Planner', limit: 'AI lập kế hoạch ăn uống', included: true },
        { name: 'Đăng công thức chi tiết', limit: 'Nguyên liệu + cách làm', included: true },
        { name: 'Video hướng dẫn nấu ăn', limit: 'Upload & chia sẻ', included: true },
        { name: 'Tính năng cộng đồng nâng cao', limit: 'Stories, Live chat', included: true },
        { name: 'AI gợi ý cá nhân hóa', limit: 'Học từ sở thích', included: true },
        { name: 'Thống kê chi tiêu ẩm thực', limit: 'Báo cáo chi tiết', included: true },
        { name: 'Hỗ trợ ưu tiên 24/7', limit: 'Chat & Email', included: true }
      ]
    }
  ];

  const premiumFeatures = [
    {
      icon: Brain,
      title: 'AI Gợi Ý Thông Minh',
      description: 'Thuật toán AI học từ sở thích và đưa ra gợi ý cá nhân hóa ngày càng chính xác',
      badge: 'AI-Powered',
      color: 'from-purple-500 to-blue-500'
    },
    {
      icon: ChefHat,
      title: 'Công Thức Chi Tiết',
      description: 'Chia sẻ công thức nấu ăn đầy đủ với nguyên liệu, cách làm và tips bí mật',
      badge: 'Premium',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Video,
      title: 'Video Hướng Dẫn',
      description: 'Upload và chia sẻ video nấu ăn, tạo kênh ẩm thực cá nhân',
      badge: 'Creator',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: MapPin,
      title: 'Premium Food Planner',
      description: 'Lập kế hoạch ăn uống theo ngân sách, tối ưu tuyến đường và thời gian',
      badge: 'Smart',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Cộng Đồng Nâng Cao',
      description: 'Stories ẩm thực, Live chat với foodie, nhóm thảo luận riêng tư',
      badge: 'Social',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Thống Kê Chi Tiêu',
      description: 'Theo dõi chi phí ăn uống, phân tích thói quen, đề xuất tiết kiệm',
      badge: 'Analytics',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Premium',
      description: 'Ứng dụng di động với tính năng offline, push notification thông minh',
      badge: 'Coming Q2 2025',
      color: 'from-gray-500 to-slate-500'
    },
    {
      icon: Palette,
      title: 'Color Mood Tracker',
      description: 'Theo dõi tâm trạng qua màu sắc, phân tích xu hướng cảm xúc theo thời gian',
      badge: 'Exclusive',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Gamepad2,
      title: 'Gamification & Rewards',
      description: 'Hệ thống điểm thưởng, badges, challenges ẩm thực hàng tuần',
      badge: 'Fun',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Music,
      title: 'Mood-Based Playlist',
      description: 'Playlist nhạc phù hợp với tâm trạng và món ăn đang thưởng thức',
      badge: 'Spotify Integration',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: BookOpen,
      title: 'Recipe Collections',
      description: 'Tạo bộ sưu tập công thức cá nhân, chia sẻ cookbook với cộng đồng',
      badge: 'Organize',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      icon: Headphones,
      title: 'Hỗ Trợ VIP 24/7',
      description: 'Chat trực tiếp với team, hỗ trợ 24/7, ưu tiên xử lý yêu cầu',
      badge: 'VIP',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const testimonials = [
    {
      name: 'Minh Anh',
      role: 'Food Blogger',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
      content: 'Premium Food Planner đã giúp mình tiết kiệm 30% chi phí ăn uống mà vẫn khám phá được nhiều quán ngon!',
      rating: 5,
      badge: 'Premium User'
    },
    {
      name: 'Thanh Tú',
      role: 'Sinh viên',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100&h=100&fit=crop&crop=face',
      content: 'Tính năng chia sẻ công thức với video hướng dẫn giúp mình học nấu ăn nhanh hơn rất nhiều!',
      rating: 5,
      badge: 'Content Creator'
    },
    {
      name: 'Hoàng Long',
      role: 'Nhân viên văn phòng',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face',
      content: 'Color Mood Tracker giúp mình hiểu rõ hơn về tâm trạng và chọn món ăn phù hợp mỗi ngày.',
      rating: 5,
      badge: 'Daily User'
    }
  ];

  const faqs = [
    {
      question: 'Tôi có thể hủy gói Premium bất cứ lúc nào không?',
      answer: 'Có, bạn có thể hủy gói Premium bất cứ lúc nào. Tài khoản sẽ chuyển về gói Free sau khi hết hạn thanh toán hiện tại.'
    },
    {
      question: 'Gói Premium có được dùng thử miễn phí không?',
      answer: 'Có, chúng tôi cung cấp 7 ngày dùng thử miễn phí cho gói Premium. Bạn có thể hủy trước khi hết thời gian dùng thử.'
    },
    {
      question: 'Thanh toán có an toàn không?',
      answer: 'Hoàn toàn an toàn. Chúng tôi sử dụng các cổng thanh toán uy tín và mã hóa SSL để bảo vệ thông tin của bạn.'
    },
    {
      question: 'Tôi có thể chuyển đổi giữa gói tháng và năm không?',
      answer: 'Có, bạn có thể chuyển đổi bất cứ lúc nào. Phí sẽ được tính theo tỷ lệ thời gian sử dụng.'
    },
    {
      question: 'Mobile app có sẵn chưa?',
      answer: 'Mobile app đang trong quá trình phát triển và sẽ ra mắt trong Q2 2025. Premium members sẽ được truy cập sớm.'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-white/30'}
      />
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getAnnualSavings = () => {
    const monthlyTotal = plans[1].price.monthly * 12;
    const annualPrice = plans[1].price.annual;
    const savings = monthlyTotal - annualPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings, percentage };
  };

  const annualSavings = getAnnualSavings();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-button rounded-full mb-6 shadow-glow relative">
            <Crown size={40} className="text-white" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles size={16} className="text-yellow-900" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Chọn Gói <span className="text-gradient">Phù Hợp</span> Với Bạn
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Khám phá thế giới ẩm thực với AI thông minh. Bắt đầu miễn phí hoặc nâng cấp để có trải nghiệm đầy đủ.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 relative">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                !isAnnual
                  ? 'bg-gradient-button text-white shadow-glow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Hàng tháng
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-full font-medium transition-all relative ${
                isAnnual
                  ? 'bg-gradient-button text-white shadow-glow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Hàng năm
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-2 py-1 rounded-full font-bold animate-bounce">
                -{annualSavings.percentage}%
              </span>
            </button>
          </div>
          
          {isAnnual && (
            <p className="text-green-400 text-sm mt-3 animate-pulse">
              💰 Tiết kiệm {formatPrice(annualSavings.savings)}₫ khi thanh toán năm!
            </p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isAnnual ? Math.round(plan.price.annual / 12) : plan.price.monthly;
            
            return (
              <div
                key={index}
                className={`relative glass-card rounded-3xl p-8 ${
                  plan.popular 
                    ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/20 scale-105' 
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      🔥 Phổ biến nhất
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-glow`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 mb-6">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        {price === 0 ? 'Miễn phí' : `${formatPrice(price)}₫`}
                      </span>
                      {price > 0 && (
                        <span className="text-white/60">/tháng</span>
                      )}
                    </div>
                    {isAnnual && plan.price.annual > 0 && (
                      <div className="text-sm text-green-400 mt-2">
                        Thanh toán {formatPrice(plan.price.annual)}₫/năm
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {plan.name === 'Free' ? 'Bắt đầu miễn phí' : 'Dùng thử 7 ngày miễn phí'}
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white mb-4">Tính năng bao gồm:</h4>
                  {plan.features.slice(0, 8).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X size={20} className="text-white/30 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <span className={`${feature.included ? 'text-white' : 'text-white/40'}`}>
                          {feature.name}
                        </span>
                        {feature.limit && (
                          <div className="text-sm text-white/60 mt-1">{feature.limit}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {plan.features.length > 8 && (
                    <div className="text-center pt-4">
                      <span className="text-primary-400 text-sm font-medium">
                        +{plan.features.length - 8} tính năng khác
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Features Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket size={16} />
              <span>Tính năng Premium</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tại Sao Chọn <span className="text-gradient">Premium</span>?
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Nâng cao trải nghiệm ẩm thực với các tính năng AI thông minh và cộng đồng sôi động
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="glass-card rounded-2xl p-6 card-hover group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gradient transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award size={16} />
              <span>Phản hồi từ người dùng</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Được Yêu Thích Bởi <span className="text-gradient">Cộng Đồng</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="text-white/80 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                  <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                    {testimonial.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle size={16} />
              <span>Câu hỏi thường gặp</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Câu Hỏi <span className="text-gradient">Thường Gặp</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card rounded-xl p-6 card-hover">
                <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-button rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-white/70 leading-relaxed pl-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
            
            <div className="relative">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Gift size={16} />
                <span>Ưu đãi đặc biệt</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Sẵn Sàng <span className="text-gradient">Bắt Đầu</span>?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Tham gia cùng hàng nghìn người dùng đã khám phá ẩm thực thông minh với COLOR BITES
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3">
                    <Crown size={24} />
                    <span className="text-lg">
                      Dùng thử Premium 7 ngày
                      {isAnnual && (
                        <span className="block text-sm opacity-80">
                          Tiết kiệm {annualSavings.percentage}% với gói năm
                        </span>
                      )}
                    </span>
                  </div>
                </button>
                
                <button className="group bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3">
                    <Star size={24} />
                    <span className="text-lg">Bắt đầu miễn phí</span>
                  </div>
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-white/60">
                <div className="flex items-center space-x-2">
                  <Shield size={16} />
                  <span>Không cần thẻ tín dụng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock size={16} />
                  <span>Hủy bất cứ lúc nào</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} />
                  <span>Nâng cấp dễ dàng</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;