import React, { useState } from 'react';
import { 
  UserCircle, 
  Mail, 
  Calendar, 
  MapPin, 
  Edit3, 
  Save, 
  X,
  Crown,
  Shield,
  Camera,
  Settings,
  Bell,
  Lock,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Yêu thích khám phá ẩm thực và chia sẻ trải nghiệm với cộng đồng.',
    location: 'Thủ Đức, TP.HCM',
    phone: '+84 123 456 789',
    birthday: '1995-06-15'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    communityUpdates: true,
    promotions: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications]
    });
  };

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  const handlePasswordSave = () => {
    // Save password changes
    setShowChangePassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <UserCircle size={64} className="text-white/40 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Chưa đăng nhập</h2>
          <p className="text-white/60">Vui lòng đăng nhập để xem thông tin tài khoản</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Tài Khoản</h1>
          <p className="text-white/70">Cập nhật thông tin cá nhân và cài đặt tài khoản</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-button rounded-full flex items-center justify-center shadow-glow">
                  <Camera size={16} className="text-white" />
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
              <p className="text-white/60 text-sm mb-3">{user.email}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                {user.isPremium ? (
                  <>
                    <Crown size={16} className="text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Premium Member</span>
                  </>
                ) : (
                  <>
                    <Shield size={16} className="text-gray-400" />
                    <span className="text-gray-400">Free Member</span>
                  </>
                )}
              </div>

              <div className="text-center text-sm text-white/60 mb-4">
                <p>Tham gia từ {new Date(user.joinedAt).toLocaleDateString('vi-VN')}</p>
              </div>

              {!user.isPremium && (
                <button className="w-full btn-primary text-sm">
                  <Crown size={16} className="mr-2" />
                  Nâng cấp Premium
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Thông Tin Cá Nhân</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300"
                >
                  {isEditing ? <X size={20} /> : <Edit3 size={20} />}
                  <span>{isEditing ? 'Hủy' : 'Chỉnh sửa'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input-glass w-full disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input-glass w-full disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input-glass w-full disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Ngày sinh</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input-glass w-full disabled:opacity-60"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input-glass w-full disabled:opacity-60"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">Giới thiệu bản thân</label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input-glass w-full resize-none disabled:opacity-60"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Lưu thay đổi</span>
                  </button>
                </div>
              )}
            </div>

            {/* Security Settings */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Bảo Mật</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Mật khẩu</h4>
                    <p className="text-white/60 text-sm">Thay đổi mật khẩu đăng nhập</p>
                  </div>
                  <button
                    onClick={() => setShowChangePassword(!showChangePassword)}
                    className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                  >
                    {showChangePassword ? 'Hủy' : 'Thay đổi'}
                  </button>
                </div>

                {showChangePassword && (
                  <div className="glass rounded-lg p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Mật khẩu hiện tại</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="input-glass w-full pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Mật khẩu mới</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="input-glass w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Xác nhận mật khẩu mới</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="input-glass w-full"
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowChangePassword(false)}
                        className="btn-secondary text-sm"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handlePasswordSave}
                        className="btn-primary text-sm"
                      >
                        Cập nhật mật khẩu
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notification Settings */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Cài Đặt Thông Báo</h3>
              
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Thông báo qua Email', desc: 'Nhận thông báo về hoạt động tài khoản' },
                  { key: 'pushNotifications', label: 'Thông báo đẩy', desc: 'Thông báo trên trình duyệt và thiết bị' },
                  { key: 'communityUpdates', label: 'Cập nhật cộng đồng', desc: 'Thông báo về bài viết và bình luận mới' },
                  { key: 'promotions', label: 'Khuyến mãi', desc: 'Nhận thông tin về ưu đãi và sự kiện' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{item.label}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(item.key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-primary-500'
                          : 'bg-white/20'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-card rounded-2xl p-6 border border-red-500/20">
              <h3 className="text-xl font-bold text-red-400 mb-6">Vùng Nguy Hiểm</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Xóa tài khoản</h4>
                    <p className="text-white/60 text-sm">Xóa vĩnh viễn tài khoản và tất cả dữ liệu</p>
                  </div>
                  <button className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                    <Trash2 size={16} />
                    <span>Xóa tài khoản</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;