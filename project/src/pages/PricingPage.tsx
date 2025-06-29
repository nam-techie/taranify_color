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
  BookOpen
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
      description: 'Trải nghiệm đầy đủ với tính năng AI nâng cao và cộng đồng premium',
      icon: Crown,
      color: 'from-primary-500 to-accent-500',
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
      description: 'Thuật toán AI học từ sở thích và đưa ra gợi ý cá nhân hóa ngày càng chính xác'
    },
    {
      icon: ChefHat,
      title: 'Công Thức Chi Tiết',
      description: 'Chia sẻ công thức nấu ăn đầy đủ với nguyên liệu, cách làm và tips bí mật'
    },
    {
      icon: Video,
      title: 'Video Hướng Dẫn',
      description: 'Upload và chia sẻ video nấu ăn, tạo kênh ẩm thực cá nhân'
    },
    {
      icon: MapPin,
      title: 'Premium Food Planner',
      description: 'Lập kế hoạch ăn uống theo ngân sách, tối ưu tuyến đường và thời gian'
    },
    {
      icon: Users,
      title: 'Cộng Đồng Nâng Cao',
      description: 'Stories ẩm thực, Live chat với foodie, nhóm thảo luận riêng tư'
    },
    {
      icon: BarChart3,
      title: 'Thống Kê Chi Tiêu',
      description: 'Theo dõi chi phí ăn uống, phân tích thói quen, đề xuất tiết kiệm'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Premium',
      description: 'Ứng dụng di động với tính năng offline, push notification thông minh'
    },
    {
      icon: Palette,
      title: 'Color Mood Tracker',
      description: 'Theo dõi tâm trạng qua màu sắc, phân tích xu hướng cảm xúc theo thời gian'
    },
    {
      icon: Gamepad2,
      title: 'Gamification',
      description: 'Hệ thống điểm thưởng, badges, challenges ẩm thực hàng tuần'
    },
    {
      icon: Music,
      title: 'Mood-Based Playlist',
      description: 'Playlist nhạc phù hợp với tâm trạng và món ăn đang thưởng thức'
    },
    {
      icon: BookOpen,
      title: 'Recipe Collections',
      description: 'Tạo bộ sưu tập công thức cá nhân, chia sẻ cookbook với cộng đồng'
    },
    {
      icon: Headphones,
      title: 'Hỗ Trợ VIP',
      description: 'Chat trực tiếp với team, hỗ trợ 24/7, ưu tiên xử lý yêu cầu'
    }
  ];

  const testimonials = [
    {
      name: 'Minh Anh',
      role: 'Food Blogger',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
      content: 'Premium Food Planner đã giúp mình tiết kiệm 30% chi phí ăn uống mà vẫn khám phá được nhiều quán ngon!',
      rating: 5
    },
    {
      name: 'Thanh Tú',
      role: 'Sinh viên',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100&h=100&fit=crop&crop=face',
      content: 'Tính năng chia sẻ công thức với video hướng dẫn giúp mình học nấu ăn nhanh hơn rất nhiều!',
      rating: 5
    },
    {
      name: 'Hoàng Long',
      role: 'Nhân viên văn phòng',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face',
      content: 'Color Mood Tracker giúp mình hiểu rõ hơn về tâm trạng và chọn món ăn phù hợp mỗi ngày.',
      rating: 5
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-button rounded-full mb-6 shadow-glow">
            <Crown size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Chọn Gói Phù Hợp Với Bạn
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Khám phá thế giới ẩm thực với AI thông minh. Bắt đầu miễn phí hoặc nâng cấp để có trải nghiệm đầy đủ.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                !isAnnual
                  ? 'bg-gradient-button text-white shadow-glow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Hàng tháng
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all relative ${
                isAnnual
                  ? 'bg-gradient-button text-white shadow-glow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Hàng năm
              <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
                -{annualSavings.percentage}%
              </span>
            </button>
          </div>
          
          {isAnnual && (
            <p className="text-green-400 text-sm mt-2">
              Tiết kiệm {formatPrice(annualSavings.savings)}₫ khi thanh toán năm!
            </p>
          )}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-6 text-white font-semibold">Tính năng</th>
                    <th className="text-center p-6 w-48">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center mb-2">
                          <Star size={24} className="text-white" />
                        </div>
                        <span className="text-white font-bold text-lg">Free</span>
                        <span className="text-white/60 text-sm">Miễn phí</span>
                      </div>
                    </th>
                    <th className="text-center p-6 w-48">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gradient-button rounded-lg flex items-center justify-center mb-2 shadow-glow">
                          <Crown size={24} className="text-white" />
                        </div>
                        <span className="text-white font-bold text-lg">Premium</span>
                        <span className="text-white/60 text-sm">
                          {formatPrice(isAnnual ? Math.round(plans[1].price.annual / 12) : plans[1].price.monthly)}₫/tháng
                        </span>
                        <div className="mt-2">
                          <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs">
                            Phổ biến nhất
                          </span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Trắc nghiệm AI màu sắc', free: '10 lần/tháng', premium: 'Không giới hạn' },
                    { feature: 'Gợi ý quán ăn theo giá', free: '1 lần/tuần', premium: 'Không giới hạn' },
                    { feature: 'Đăng bài cộng đồng', free: 'Cơ bản (ảnh + text)', premium: 'Premium (công thức + video)' },
                    { feature: 'Lưu quán ăn yêu thích', free: '5 quán', premium: 'Không giới hạn' },
                    { feature: 'Premium Food Planner', free: false, premium: true },
                    { feature: 'AI gợi ý cá nhân hóa', free: false, premium: true },
                    { feature: 'Chia sẻ công thức chi tiết', free: false, premium: true },
                    { feature: 'Video hướng dẫn nấu ăn', free: false, premium: true },
                    { feature: 'Color Mood Tracker', free: false, premium: true },
                    { feature: 'Mobile App Premium', free: false, premium: true },
                    { feature: 'Gamification & Rewards', free: false, premium: true },
                    { feature: 'Mood-Based Playlist', free: false, premium: true },
                    { feature: 'Recipe Collections', free: false, premium: true },
                    { feature: 'Thống kê chi tiêu ẩm thực', free: false, premium: true },
                    { feature: 'Hỗ trợ ưu tiên 24/7', free: false, premium: true }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="p-6 text-white font-medium">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <Check size={20} className="text-green-400 mx-auto" />
                          ) : (
                            <X size={20} className="text-white/30 mx-auto" />
                          )
                        ) : (
                          <span className="text-white/70 text-sm">{row.free}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <Check size={20} className="text-green-400 mx-auto" />
                          ) : (
                            <X size={20} className="text-white/30 mx-auto" />
                          )
                        ) : (
                          <span className="text-white/70 text-sm">{row.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Action Buttons */}
            <div className="p-6 bg-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="btn-secondary w-full">
                  Bắt đầu miễn phí
                </button>
                <button className="btn-primary w-full flex items-center justify-center space-x-2">
                  <Crown size={20} />
                  <span>
                    Dùng thử Premium 7 ngày
                    {isAnnual && (
                      <span className="block text-xs opacity-80">
                        Chỉ {formatPrice(Math.round(plans[1].price.annual / 12))}₫/tháng
                      </span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Tại Sao Chọn Premium?
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Nâng cao trải nghiệm ẩm thực với các tính năng AI thông minh và cộng đồng sôi động
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="glass-card rounded-xl p-6 text-center card-hover">
                  <div className="w-12 h-12 bg-gradient-button rounded-lg flex items-center justify-center mb-4 mx-auto shadow-glow">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Người Dùng Nói Gì Về Premium
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card rounded-xl p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-white/80 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Câu Hỏi Thường Gặp
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="glass-card rounded-2xl p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Gift size={32} className="text-accent-400" />
              <h2 className="text-3xl font-bold text-white">
                Sẵn Sàng Bắt Đầu?
              </h2>
            </div>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Tham gia cùng hàng nghìn người dùng đã khám phá ẩm thực thông minh với COLOR BITES
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-secondary">
                Bắt đầu miễn phí
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Crown size={20} />
                <span>
                  Dùng thử Premium 7 ngày
                  {isAnnual && (
                    <span className="block text-xs opacity-80">
                      Tiết kiệm {annualSavings.percentage}% với gói năm
                    </span>
                  )}
                </span>
              </button>
            </div>
            <p className="text-white/50 text-sm mt-4">
              Không cần thẻ tín dụng • Hủy bất cứ lúc nào
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;