import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? false : true;
  
  const [isLogin, setIsLogin] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Update mode when URL changes
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'register') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Password must contain at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const minLength = password.length >= 6;
    
    return {
      isValid: hasLetter && hasNumber && minLength,
      hasLetter,
      hasNumber,
      minLength
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOTP = [...otpCode];
    newOTP[index] = value;
    setOtpCode(newOTP);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate('/');
        } else {
          setError('Email hoặc mật khẩu không đúng. Thử test@gmail.com / 123456');
        }
      } else {
        // Validate email
        if (!validateEmail(formData.email)) {
          setError('Email không hợp lệ');
          return;
        }

        // Validate password
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
          if (!passwordValidation.minLength) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
          } else if (!passwordValidation.hasLetter) {
            setError('Mật khẩu phải chứa ít nhất một chữ cái');
          } else if (!passwordValidation.hasNumber) {
            setError('Mật khẩu phải chứa ít nhất một số');
          }
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('Mật khẩu xác nhận không khớp');
          return;
        }

        // Show OTP verification
        setShowOTP(true);
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otpCode.join('');
    
    if (otpString.length !== 6) {
      setError('Vui lòng nhập đầy đủ mã OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      if (otpString === '123456') {
        setError('Đăng ký thành công! Vui lòng đăng nhập.');
        setShowOTP(false);
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setOtpCode(['', '', '', '', '', '']);
      } else {
        setError('Mã OTP không đúng. Thử 123456');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi xác thực OTP');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setShowOTP(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setOtpCode(['', '', '', '', '', '']);
    // Update URL
    navigate(isLogin ? '/auth?mode=register' : '/auth?mode=login', { replace: true });
  };

  const resendOTP = () => {
    setError('Mã OTP mới đã được gửi đến email của bạn');
    setOtpCode(['', '', '', '', '', '']);
  };

  if (showOTP) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-button rounded-full mb-6 shadow-glow">
              <Shield size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Xác Thực Email
            </h2>
            <p className="text-white/60 leading-relaxed">
              Chúng tôi đã gửi mã xác thực 6 số đến email
              <br />
              <span className="text-primary-400 font-medium">{formData.email}</span>
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle size={16} className="text-red-400" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleOTPSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-4 text-center">
                  Nhập mã xác thực
                </label>
                <div className="flex justify-center space-x-3">
                  {otpCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  ))}
                </div>
                <p className="text-white/50 text-xs text-center mt-3">
                  Demo: Nhập <span className="text-primary-400 font-medium">123456</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang xác thực...' : 'Xác Thực'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm mb-3">
                Không nhận được mã?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={resendOTP}
                  className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                >
                  Gửi lại mã
                </button>
                <button
                  onClick={() => setShowOTP(false)}
                  className="flex items-center justify-center space-x-1 text-white/60 hover:text-white text-sm"
                >
                  <ArrowLeft size={16} />
                  <span>Quay lại</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-button rounded-full mb-6 shadow-glow">
            <span className="text-white font-bold text-2xl">CB</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Chào mừng trở lại!' : 'Tham gia COLOR BITES'}
          </h2>
          <p className="text-white/60 leading-relaxed">
            {isLogin 
              ? 'Đăng nhập để khám phá thế giới ẩm thực đầy màu sắc' 
              : 'Tạo tài khoản để bắt đầu hành trình khám phá'
            }
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle size={16} className="text-red-400" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Họ và tên
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-glass w-full pl-10"
                    placeholder="Nhập họ và tên"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-glass w-full pl-10"
                  placeholder="Nhập địa chỉ email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-glass w-full pl-10 pr-12"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {!isLogin && (
                <div className="mt-2 text-xs text-white/60">
                  Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-glass w-full pl-10 pr-12"
                    placeholder="Nhập lại mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-white/20 rounded bg-white/10"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <button type="button" className="text-sm text-primary-400 hover:text-primary-300">
                  Quên mật khẩu?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLogin ? <User size={18} /> : <UserPlus size={18} />}
              <span>{loading ? 'Đang xử lý...' : (isLogin ? 'Đăng Nhập' : 'Đăng Ký')}</span>
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/50">Hoặc</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="btn-secondary w-full inline-flex justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button className="btn-secondary w-full inline-flex justify-center">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <span className="text-white/60">
              {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            </span>
            <button
              onClick={switchMode}
              className="ml-2 text-primary-400 hover:text-primary-300 font-medium"
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-white/50 leading-relaxed">
          Bằng việc {isLogin ? 'đăng nhập' : 'đăng ký'}, bạn đồng ý với{' '}
          <a href="/about#terms" className="text-primary-400 hover:text-primary-300">
            Điều khoản sử dụng
          </a>{' '}
          và{' '}
          <a href="/about#privacy" className="text-primary-400 hover:text-primary-300">
            Chính sách bảo mật
          </a>{' '}
          của COLOR BITES.
        </div>
      </div>
    </div>
  );
};

export default AuthPage;