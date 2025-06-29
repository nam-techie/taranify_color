import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Mail, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OTPVerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const email = searchParams.get('email') || '';
  const type = searchParams.get('type') || 'register'; // register, reset-password, change-email
  
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

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
    const otpString = otpCode.join('');
    
    if (otpString.length !== 6) {
      setError('Vui lòng nhập đầy đủ mã OTP');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otpString === '123456') {
        setSuccess('Xác thực thành công!');
        
        setTimeout(() => {
          switch (type) {
            case 'register':
              navigate('/auth?mode=login');
              break;
            case 'reset-password':
              navigate('/auth?mode=reset&step=new-password');
              break;
            case 'change-email':
              navigate('/profile?success=email-changed');
              break;
            default:
              navigate('/');
          }
        }, 1500);
      } else {
        setError('Mã OTP không đúng. Thử 123456');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi xác thực OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError('');
    
    try {
      // Simulate resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Mã OTP mới đã được gửi đến email của bạn');
      setOtpCode(['', '', '', '', '', '']);
      setCountdown(60);
      setCanResend(false);
    } catch (err) {
      setError('Không thể gửi lại mã OTP. Vui lòng thử lại.');
    } finally {
      setResendLoading(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'register': return 'Xác Thực Đăng Ký';
      case 'reset-password': return 'Xác Thực Đặt Lại Mật Khẩu';
      case 'change-email': return 'Xác Thực Email Mới';
      default: return 'Xác Thực Email';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'register': 
        return 'Chúng tôi đã gửi mã xác thực đến email của bạn để hoàn tất quá trình đăng ký';
      case 'reset-password': 
        return 'Nhập mã xác thực để tiếp tục đặt lại mật khẩu';
      case 'change-email': 
        return 'Xác thực email mới để hoàn tất thay đổi';
      default: 
        return 'Nhập mã xác thực 6 số được gửi đến email của bạn';
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Thiếu thông tin</h2>
          <p className="text-white/60 mb-4">Không tìm thấy email để xác thực</p>
          <button
            onClick={() => navigate('/auth')}
            className="btn-primary"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-button rounded-full mb-6 shadow-glow">
            {success ? <CheckCircle size={32} className="text-white" /> : <Shield size={32} className="text-white" />}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {getTitle()}
          </h2>
          <p className="text-white/60 leading-relaxed mb-2">
            {getDescription()}
          </p>
          <p className="text-primary-400 font-medium text-sm">
            {email}
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

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-green-300 text-sm">{success}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-4 text-center">
                Nhập mã xác thực 6 số
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
                    disabled={loading || success}
                  />
                ))}
              </div>
              <p className="text-white/50 text-xs text-center mt-3">
                Demo: Nhập <span className="text-primary-400 font-medium">123456</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading && <RefreshCw size={18} className="animate-spin" />}
              <span>
                {loading ? 'Đang xác thực...' : success ? 'Đã xác thực' : 'Xác Thực'}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-white/60">
              <Mail size={16} />
              <span>Không nhận được mã?</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleResend}
                disabled={!canResend || resendLoading || success}
                className={`text-sm font-medium transition-colors ${
                  canResend && !success
                    ? 'text-primary-400 hover:text-primary-300'
                    : 'text-white/40 cursor-not-allowed'
                }`}
              >
                {resendLoading ? (
                  <span className="flex items-center space-x-1">
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Đang gửi...</span>
                  </span>
                ) : canResend ? (
                  'Gửi lại mã'
                ) : (
                  `Gửi lại sau ${countdown}s`
                )}
              </button>
              
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center justify-center space-x-1 text-white/60 hover:text-white text-sm transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Quay lại</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-white/50 leading-relaxed">
          Mã OTP có hiệu lực trong 10 phút. Vui lòng kiểm tra cả thư mục spam nếu không thấy email.
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;