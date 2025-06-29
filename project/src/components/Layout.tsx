import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Brain, 
  Users, 
  Map, 
  Info, 
  User, 
  Instagram, 
  Facebook, 
  Mail,
  Crown,
  LogOut,
  Settings,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Trang Chủ', icon: Home },
    { path: '/quiz', label: 'Trắc Nghiệm', icon: Brain },
    { path: '/community', label: 'Cộng Đồng', icon: Users },
    { path: '/map', label: 'Bản Đồ', icon: Map },
    { path: '/pricing', label: 'Gói Dịch Vụ', icon: Crown },
    { path: '/about', label: 'Giới Thiệu', icon: Info },
  ];

  // Add expense tracker for authenticated users
  if (isAuthenticated) {
    navItems.splice(4, 0, { path: '/expenses', label: 'Chi Tiêu', icon: DollarSign });
  }

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-button rounded-lg flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">CB</span>
              </div>
              <span className="text-2xl font-bold text-gradient">
                COLOR BITES
              </span>
            </Link>

            <div className="hidden lg:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-button text-white shadow-glow'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-all">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-white/60 text-xs">
                      {user.isPremium ? 'Premium' : 'Free'}
                    </div>
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/expenses"
                    className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <DollarSign size={16} />
                    <span>Quản lý chi tiêu</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Settings size={16} />
                    <span>Cài đặt</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="btn-primary flex items-center space-x-2"
              >
                <User size={18} />
                <span className="text-sm font-medium">Đăng Nhập</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-white/10">
          <div className="grid grid-cols-3 gap-1 py-2">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center px-2 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-primary-400'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-xs font-medium mt-1 text-center leading-tight">
                    {item.label.split(' ')[0]}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-fade-in">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark-900/50 backdrop-blur-md border-t border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-button rounded-lg flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-lg">CB</span>
                </div>
                <span className="text-2xl font-bold text-gradient">COLOR BITES</span>
              </div>
              <p className="text-white/70 mb-4 max-w-md">
                Khám phá thế giới ẩm thực qua lăng kính tâm lý học màu sắc. 
                Kết nối cảm xúc với hương vị tại Thủ Đức, TP.HCM.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/60 hover:text-primary-400 transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-white/60 hover:text-primary-400 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-white/60 hover:text-primary-400 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Khám Phá</h3>
              <ul className="space-y-2">
                <li><Link to="/quiz" className="text-white/70 hover:text-primary-400 transition-colors">Trắc nghiệm màu sắc</Link></li>
                <li><Link to="/community" className="text-white/70 hover:text-primary-400 transition-colors">Cộng đồng</Link></li>
                <li><Link to="/map" className="text-white/70 hover:text-primary-400 transition-colors">Bản đồ ẩm thực</Link></li>
                <li><Link to="/pricing" className="text-white/70 hover:text-primary-400 transition-colors">Gói dịch vụ</Link></li>
                <li><Link to="/about" className="text-white/70 hover:text-primary-400 transition-colors">Giới thiệu</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Hỗ Trợ</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-primary-400 transition-colors">Liên hệ</a></li>
                <li><a href="#" className="text-white/70 hover:text-primary-400 transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="text-white/70 hover:text-primary-400 transition-colors">Điều khoản sử dụng</a></li>
                <li><a href="#" className="text-white/70 hover:text-primary-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © 2024 COLOR BITES. Tất cả quyền được bảo lưu. Made with ❤️ in Thủ Đức, TP.HCM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;