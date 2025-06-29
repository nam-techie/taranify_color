import React from 'react';
import { 
  Info, 
  Heart, 
  Users, 
  Target, 
  Lightbulb,
  Award,
  MapPin,
  Shield,
  FileText,
  Lock,
  Eye,
  UserCheck,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "Kết nối cảm xúc",
      description: "Chúng tôi tin rằng màu sắc có thể phản ánh cảm xúc và hướng dẫn lựa chọn ẩm thực của chúng ta."
    },
    {
      icon: Users,
      title: "Cộng đồng gắn kết",
      description: "Xây dựng một không gian để mọi người chia sẻ đam mê ẩm thực và kết nối với nhau."
    },
    {
      icon: Lightbulb,
      title: "Sáng tạo và khám phá",
      description: "Khuyến khích việc thử nghiệm và khám phá những hương vị mới dựa trên tâm trạng cá nhân."
    },
    {
      icon: MapPin,
      title: "Địa phương hóa",
      description: "Tập trung vào ẩm thực địa phương tại Thủ Đức, góp phần quảng bá văn hóa ẩm thực Việt Nam."
    }
  ];

  const milestones = [
    { year: "2024", title: "Ra mắt COLOR BITES", description: "Khởi động dự án với mục tiêu kết nối tâm lý màu sắc và ẩm thực" },
    { year: "Q1 2024", title: "Phát triển trắc nghiệm", description: "Hoàn thiện hệ thống trắc nghiệm tâm lý màu sắc đầu tiên" },
    { year: "Q2 2024", title: "Cộng đồng 1000+", description: "Đạt mốc 1000 thành viên tham gia chia sẻ món ăn" },
    { year: "Q3 2024", title: "Bản đồ ẩm thực", description: "Ra mắt tính năng bản đồ khám phá địa điểm ẩm thực Thủ Đức" }
  ];

  const team = [
    {
      name: "Nguyễn Minh An",
      role: "Founder & CEO",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face",
      bio: "Chuyên gia tâm lý học màu sắc với 5 năm kinh nghiệm nghiên cứu về mối liên hệ giữa màu sắc và cảm xúc"
    },
    {
      name: "Trần Thu Hà",
      role: "Head of Community",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=150&h=150&fit=crop&crop=face",
      bio: "Food blogger nổi tiếng với hơn 100K followers, am hiểu sâu về ẩm thực Sài Gòn"
    },
    {
      name: "Lê Hoàng Nam",
      role: "Tech Lead",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop&crop=face",
      bio: "Kỹ sư phần mềm với đam mê phát triển những ứng dụng có ý nghĩa xã hội"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-button rounded-full mb-6 shadow-glow">
            <Info size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Về COLOR BITES
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Kết nối cảm xúc với hương vị, tạo nên những trải nghiệm ẩm thực độc đáo 
            qua lăng kính tâm lý học màu sắc
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Target size={32} className="text-primary-400" />
                  <h2 className="text-2xl font-bold text-white">Sứ mệnh của chúng tôi</h2>
                </div>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  COLOR BITES ra đời với mong muốn tạo ra một cách tiếp cận mới mẻ đối với ẩm thực - 
                  nơi mà tâm lý học màu sắc gặp gỡ hương vị, giúp mỗi người tìm ra những món ăn 
                  phù hợp nhất với cảm xúc và tâm trạng của mình.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Chúng tôi tin rằng việc ăn uống không chỉ đơn thuần là nạp năng lượng, mà còn là 
                  cách để chăm sóc tinh thần và kết nối với cộng đồng xung quanh.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                  alt="Colorful food"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Giá trị cốt lõi</h2>
            <p className="text-white/60 text-lg">
              Những nguyên tắc định hướng mọi hoạt động của COLOR BITES
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center glass-card rounded-xl p-6 card-hover">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-button rounded-full mb-4 shadow-glow">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/70 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Hành trình phát triển</h2>
            <p className="text-white/60 text-lg">
              Những cột mốc quan trọng trong quá trình xây dựng COLOR BITES
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-button rounded-full flex items-center justify-center shadow-glow">
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-6 flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{milestone.title}</h3>
                  <p className="text-white/70">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Đội ngũ sáng lập</h2>
            <p className="text-white/60 text-lg">
              Những con người đam mê đứng sau COLOR BITES
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="glass-card rounded-xl p-6 text-center card-hover">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                <p className="text-primary-400 font-medium mb-4">{member.role}</p>
                <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recognition Section */}
        <section className="mb-16">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <Award size={48} className="text-accent-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Được công nhận bởi cộng đồng
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                COLOR BITES tự hào là nền tảng đầu tiên tại Việt Nam ứng dụng tâm lý học màu sắc 
                vào ẩm thực, được đánh giá cao bởi các chuyên gia và người dùng.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">98%</div>
                  <div className="text-white/70">Người dùng hài lòng</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-400 mb-2">4.8⭐</div>
                  <div className="text-white/70">Đánh giá trung bình</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">1,250+</div>
                  <div className="text-white/70">Thành viên tích cực</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Terms of Service Section */}
        <section id="terms" className="mb-16">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-3 mb-8">
              <FileText size={32} className="text-blue-400" />
              <h2 className="text-3xl font-bold text-white">Điều Khoản Sử Dụng</h2>
            </div>

            <div className="space-y-6 text-white/80 leading-relaxed">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>1. Chấp nhận điều khoản</span>
                </h3>
                <p className="ml-7">
                  Bằng việc truy cập và sử dụng COLOR BITES, bạn đồng ý tuân thủ các điều khoản và điều kiện 
                  được quy định trong tài liệu này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, 
                  vui lòng không sử dụng dịch vụ của chúng tôi.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <UserCheck size={20} className="text-blue-400" />
                  <span>2. Tài khoản người dùng</span>
                </h3>
                <ul className="ml-7 space-y-2">
                  <li>• Bạn có trách nhiệm bảo mật thông tin đăng nhập của mình</li>
                  <li>• Không được chia sẻ tài khoản với người khác</li>
                  <li>• Thông tin đăng ký phải chính xác và đầy đủ</li>
                  <li>• Thông báo ngay cho chúng tôi nếu phát hiện tài khoản bị xâm phạm</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <Heart size={20} className="text-red-400" />
                  <span>3. Nội dung và cộng đồng</span>
                </h3>
                <ul className="ml-7 space-y-2">
                  <li>• Nội dung chia sẻ phải phù hợp và không vi phạm pháp luật</li>
                  <li>• Không đăng tải nội dung có tính chất spam, quảng cáo trái phép</li>
                  <li>• Tôn trọng quyền sở hữu trí tuệ của người khác</li>
                  <li>• Duy trì môi trường tích cực và thân thiện trong cộng đồng</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <AlertTriangle size={20} className="text-yellow-400" />
                  <span>4. Hạn chế trách nhiệm</span>
                </h3>
                <p className="ml-7">
                  COLOR BITES cung cấp dịch vụ "như hiện tại" và không đảm bảo tính chính xác tuyệt đối 
                  của các gợi ý. Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh 
                  từ việc sử dụng dịch vụ.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <FileText size={20} className="text-purple-400" />
                  <span>5. Thay đổi điều khoản</span>
                </h3>
                <p className="ml-7">
                  Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có hiệu lực 
                  ngay khi được đăng tải trên website. Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc 
                  bạn chấp nhận các điều khoản mới.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy Section */}
        <section id="privacy" className="mb-16">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-3 mb-8">
              <Shield size={32} className="text-green-400" />
              <h2 className="text-3xl font-bold text-white">Chính Sách Bảo Mật</h2>
            </div>

            <div className="space-y-6 text-white/80 leading-relaxed">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <Eye size={20} className="text-blue-400" />
                  <span>1. Thu thập thông tin</span>
                </h3>
                <p className="ml-7">
                  Chúng tôi thu thập thông tin bạn cung cấp khi đăng ký tài khoản, sử dụng dịch vụ, 
                  và tương tác với cộng đồng. Bao gồm: email, tên hiển thị, sở thích ẩm thực, 
                  và dữ liệu sử dụng ứng dụng.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <Lock size={20} className="text-yellow-400" />
                  <span>2. Sử dụng thông tin</span>
                </h3>
                <ul className="ml-7 space-y-2">
                  <li>• Cung cấp và cải thiện dịch vụ</li>
                  <li>• Cá nhân hóa trải nghiệm người dùng</li>
                  <li>• Gửi thông báo quan trọng về dịch vụ</li>
                  <li>• Phân tích và nghiên cứu để phát triển sản phẩm</li>
                  <li>• Đảm bảo an toàn và bảo mật</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <Shield size={20} className="text-green-400" />
                  <span>3. Bảo vệ thông tin</span>
                </h3>
                <ul className="ml-7 space-y-2">
                  <li>• Mã hóa dữ liệu nhạy cảm bằng SSL/TLS</li>
                  <li>• Lưu trữ an toàn trên máy chủ được bảo mật</li>
                  <li>• Kiểm soát truy cập nghiêm ngặt</li>
                  <li>• Sao lưu dữ liệu định kỳ</li>
                  <li>• Tuân thủ các tiêu chuẩn bảo mật quốc tế</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <Users size={20} className="text-purple-400" />
                  <span>4. Chia sẻ thông tin</span>
                </h3>
                <p className="ml-7">
                  Chúng tôi KHÔNG bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba 
                  vì mục đích thương mại. Thông tin chỉ được chia sẻ trong các trường hợp: 
                  có sự đồng ý của bạn, yêu cầu pháp lý, hoặc để bảo vệ quyền lợi hợp pháp.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <FileText size={20} className="text-red-400" />
                  <span>5. Quyền của người dùng</span>
                </h3>
                <ul className="ml-7 space-y-2">
                  <li>• Truy cập và xem thông tin cá nhân</li>
                  <li>• Yêu cầu chỉnh sửa thông tin không chính xác</li>
                  <li>• Xóa tài khoản và dữ liệu liên quan</li>
                  <li>• Từ chối nhận email marketing</li>
                  <li>• Khiếu nại về việc xử lý dữ liệu</li>
                </ul>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-6">
                <p className="text-blue-300 text-sm">
                  <strong>Liên hệ:</strong> Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, 
                  vui lòng liên hệ với chúng tôi qua email: privacy@colorbites.vn
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;