import React, { useState } from 'react';
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
  ChevronDown,
  UserCircle,
  FileText,
  Heart,
  Bell,
  Shield,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { path: '/', label: 'Trang Chủ', icon: Home },
    { path: '/quiz', label: 'Trắc Nghiệm', icon: Brain },
    { path: '/community', label: 'Cộng Đồng', icon: Users },
    { path: '/map', label: 'Bản Đồ', icon: Map },
    { path: '/pricing', label: 'Gói Dịch Vụ', icon: Crown },
    { path: '/about', label: 'Giới Thiệu', icon: Info },
  ];

  const userMenuItems = [
    { 
      label: 'Quản lý tài khoản', 
      icon: UserCircle, 
      path: '/profile',
      description: 'Thông tin cá nhân, cài đặt'
    },
    { 
      label: 'Bài viết của tôi', 
      icon: FileText, 
      path: '/my-posts',
      description: 'Quản lý bài đăng cộng đồng'
    },
    { 
      label: 'Yêu thích', 
      icon: Heart, 
      path: '/favorites',
      description: 'Quán ăn và bài viết đã lưu'
    },
    { 
      label: 'Thông báo', 
      icon: Bell, 
      path: '/notifications',
      description: 'Cập nhật và tin nhắn mới'
    },
    { 
      label: 'Cài đặt', 
      icon: Settings, 
      path: '/settings',
      description: 'Tùy chỉnh ứng dụng'
    }
  ];

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

            {/* Desktop Navigation - Icon Only với UI cải thiện */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                        : 'text-white/70 hover:bg-white/15 hover:text-white hover:scale-105 hover:shadow-lg'
                    }`}
                    title={item.label}
                  >
                    <Icon size={20} className={isActive ? 'drop-shadow-sm' : ''} />
                    
                    {/* Tooltip cải thiện */}
                    <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                      <div className="bg-gray-900/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                        {item.label}
                      </div>
                      <div className="w-2 h-2 bg-gray-900/95 transform rotate-45 mx-auto -mt-1 border-r border-b border-white/10"></div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-all group"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-primary-400 transition-all"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-white/60 text-xs flex items-center space-x-1">
                      {user.isPremium && <Crown size={12} className="text-yellow-400" />}
                      <span>{user.isPremium ? 'Premium' : 'Free'}</span>
                    </div>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-white/60 transition-transform duration-200 ${
                      showUserMenu ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                    
                    {/* Menu */}
                    <div className="absolute right-0 top-full mt-2 w-80 glass-card rounded-xl py-2 z-50 shadow-2xl">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-white/60 text-sm">{user.email}</div>
                            <div className="flex items-center space-x-1 mt-1">
                              {user.isPremium ? (
                                <>
                                  <Crown size={12} className="text-yellow-400" />
                                  <span className="text-yellow-400 text-xs font-medium">Premium Member</span>
                                </>
                              ) : (
                                <>
                                  <Shield size={12} className="text-gray-400" />
                                  <span className="text-gray-400 text-xs">Free Member</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {userMenuItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={index}
                              to={item.path}
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-start space-x-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-colors group"
                            >
                              <Icon size={18} className="mt-0.5 group-hover:text-primary-400 transition-colors" />
                              <div className="flex-1">
                                <div className="font-medium">{item.label}</div>
                                <div className="text-white/50 text-xs mt-0.5">{item.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Upgrade Section (for Free users) */}
                      {!user.isPremium && (
                        <div className="border-t border-white/10 p-4">
                          <Link
                            to="/pricing"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-2 w-full bg-gradient-button text-white px-4 py-2 rounded-lg hover:shadow-glow transition-all text-sm font-medium"
                          >
                            <Crown size={16} />
                            <span>Nâng cấp Premium</span>
                          </Link>
                        </div>
                      )}

                      {/* Logout */}
                      <div className="border-t border-white/10 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                        >
                          <LogOut size={18} />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Đăng Ký Button */}
                <Link
                  to="/auth?mode=register"
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-200"
                >
                  <UserPlus size={18} />
                  <span className="text-sm font-medium">Đăng Ký</span>
                </Link>

                {/* Đăng Nhập Button */}
                <Link
                  to="/auth?mode=login"
                  className="btn-primary flex items-center space-x-2"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">Đăng Nhập</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation với UI cải thiện */}
        <div className="lg:hidden border-t border-white/10">
          <div className="grid grid-cols-3 gap-1 py-2 px-2">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center px-2 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} className="mb-1" />
                  <span className="text-xs font-medium text-center leading-tight">
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