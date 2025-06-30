import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Users, 
  Map, 
  Sparkles, 
  Heart, 
  Camera,
  MapPin,
  Utensils,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  Play,
  Palette,
  Crown
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Trắc Nghiệm Màu Sắc",
      description: "Thuật toán AI phân tích tâm trạng qua 10 câu hỏi chọn màu thông minh, đưa ra gợi ý cá nhân hóa về phim, nhạc, sách và món ăn",
      color: "from-purple-500 to-pink-500",
      link: "/quiz",
      stats: "95% độ chính xác",
      badge: "AI-Powered"
    },
    {
      icon: Users,
      title: "Cộng Đồng Premium",
      description: "Chia sẻ công thức chi tiết với video hướng dẫn, kết nối với foodie và tham gia challenges ẩm thực hàng tuần",
      color: "from-blue-500 to-cyan-500",
      link: "/community",
      stats: "1,250+ thành viên",
      badge: "Community"
    },
    {
      icon: Map,
      title: "Smart Food Planner",
      description: "AI lập kế hoạch 3 bữa ăn theo ngân sách, tối ưu tuyến đường và thời gian di chuyển với Google Maps",
      color: "from-green-500 to-emerald-500",
      link: "/map",
      stats: "156 quán ăn",
      badge: "Premium"
    }
  ];

  const stats = [
    { number: "1,250+", label: "Thành viên", icon: Heart, color: "text-red-400" },
    { number: "3,400+", label: "Món ăn chia sẻ", icon: Camera, color: "text-orange-400" },
    { number: "156", label: "Địa điểm", icon: MapPin, color: "text-green-400" },
    { number: "98%", label: "Hài lòng", icon: Sparkles, color: "text-purple-400" }
  ];

  const testimonials = [
    {
      name: "Minh Anh",
      role: "Food Blogger",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face",
      content: "Premium Food Planner đã giúp mình tiết kiệm 30% chi phí ăn uống mà vẫn khám phá được nhiều quán ngon!",
      rating: 5
    },
    {
      name: "Thanh Tú", 
      role: "Sinh viên",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100&h=100&fit=crop&crop=face",
      content: "Trắc nghiệm AI rất chính xác! Những gợi ý món ăn luôn phù hợp với tâm trạng của mình.",
      rating: 5
    },
    {
      name: "Hoàng Long",
      role: "Nhân viên văn phòng", 
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face",
      content: "Cộng đồng rất sôi động, mình đã học được nhiều công thức hay từ các thành viên khác.",
      rating: 5
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

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute top-1/2 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating Logo */}
          <div className="animate-bounce-subtle mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-button rounded-3xl shadow-glow-lg relative">
              <Utensils size={48} className="text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles size={16} className="text-yellow-900" />
              </div>
            </div>
          </div>
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 animate-slide-up">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <Star size={16} className="text-yellow-400" />
            <span className="text-white/80 text-sm font-medium">Được tin tưởng bởi 1,250+ người dùng</span>
            <TrendingUp size={16} className="text-green-400" />
          </div>
          
          {/* Main Title with Gradient Animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              COLOR BITES
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-3xl text-white/90 mb-6 animate-slide-up font-light">
            Khám phá thế giới ẩm thực qua lăng kính 
            <span className="text-gradient font-semibold"> tâm lý học màu sắc</span>
          </p>
          
          <p className="text-lg text-white/70 mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed">
            Tìm hiểu cảm xúc của bạn, khám phá món ăn phù hợp và kết nối với cộng đồng ẩm thực tại Thủ Đức, TP.HCM
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/quiz"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <Sparkles size={24} />
                <span className="text-lg">Bắt Đầu Trắc Nghiệm</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <Link
              to="/community"
              className="group bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <Users size={24} />
                <span className="text-lg">Khám Phá Cộng Đồng</span>
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-slide-up">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${stat.color} bg-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap size={16} />
              <span>Tính năng nổi bật</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trải Nghiệm Đặc Biệt
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              COLOR BITES mang đến cho bạn những trải nghiệm độc đáo kết hợp giữa AI, tâm lý học và ẩm thực
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group relative overflow-hidden glass-card rounded-3xl p-8 card-hover"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow`}>
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-400">
                      {feature.stats}
                    </span>
                    <div className="flex items-center space-x-2 text-primary-400 group-hover:text-primary-300 transition-colors">
                      <span className="text-sm font-medium">Khám phá</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award size={16} />
              <span>Phản hồi từ người dùng</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Được Yêu Thích Bởi Cộng Đồng
            </h2>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
              <div className="flex items-center justify-center space-x-1 mb-6">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-white/60">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary-500 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
            
            <div className="relative">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Crown size={16} />
                <span>Bắt đầu ngay hôm nay</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sẵn Sàng Khám Phá?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Tham gia cùng chúng tôi để khám phá thế giới ẩm thực đầy màu sắc và cảm xúc
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/quiz"
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <Sparkles size={24} />
                    <span className="text-lg">Bắt Đầu Hành Trình</span>
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                
                <Link
                  to="/pricing"
                  className="group bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <Crown size={24} />
                    <span className="text-lg">Xem Gói Premium</span>
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;