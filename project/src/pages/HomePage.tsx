import React from 'react';
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
  ArrowRight
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Trắc Nghiệm Tâm Lý Màu Sắc",
      description: "Khám phá tâm trạng của bạn qua màu sắc và nhận gợi ý cá nhân hóa về món ăn, đồ uống phù hợp",
      color: "from-primary-500 to-primary-600",
      link: "/quiz"
    },
    {
      icon: Users,
      title: "Cộng Đồng Ẩm Thực",
      description: "Chia sẻ công thức, ảnh món ăn và kết nối với những người yêu thích ẩm thực",
      color: "from-accent-500 to-accent-600",
      link: "/community"
    },
    {
      icon: Map,
      title: "Bản Đồ Khám Phá",
      description: "Tìm kiếm những địa điểm ẩm thực tuyệt vời tại Thủ Đức và chia sẻ trải nghiệm",
      color: "from-primary-600 to-accent-500",
      link: "/map"
    }
  ];

  const stats = [
    { number: "1,250+", label: "Thành viên", icon: Heart },
    { number: "3,400+", label: "Món ăn chia sẻ", icon: Camera },
    { number: "156", label: "Địa điểm", icon: MapPin },
    { number: "98%", label: "Hài lòng", icon: Sparkles }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-bounce-subtle mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-button rounded-2xl shadow-glow-lg">
              <Utensils size={40} className="text-white" />
            </div>
          </div>
          
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
            <Star size={16} className="text-yellow-400" />
            <span className="text-white/80 text-sm">Được tin tưởng bởi 1,250+ người dùng</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient">
              COLOR BITES
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up">
            Khám phá thế giới ẩm thực qua lăng kính tâm lý học màu sắc
          </p>
          
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto animate-slide-up">
            Tìm hiểu cảm xúc của bạn, khám phá món ăn phù hợp và kết nối với cộng đồng ẩm thực tại Thủ Đức, TP.HCM
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/quiz"
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <Sparkles size={20} />
              <span>Bắt Đầu Trắc Nghiệm</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/community"
              className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <Users size={20} />
              <span>Khám Phá Cộng Đồng</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trải Nghiệm Đặc Biệt
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            COLOR BITES mang đến cho bạn những trải nghiệm độc đáo kết hợp giữa tâm lý học và ẩm thực
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.link}
                className="group glass-card rounded-2xl p-8 card-hover"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
                <div className="flex items-center space-x-2 mt-4 text-primary-400 group-hover:text-primary-300 transition-colors">
                  <span className="text-sm font-medium">Khám phá ngay</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-600/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center text-white">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-button rounded-xl mb-4 shadow-glow">
                    <Icon size={32} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient">{stat.number}</div>
                  <div className="text-lg text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <div className="glass-card rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sẵn Sàng Khám Phá?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Tham gia cùng chúng tôi để khám phá thế giới ẩm thực đầy màu sắc và cảm xúc
          </p>
          <Link
            to="/quiz"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <Sparkles size={24} />
            <span>Bắt Đầu Hành Trình</span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;