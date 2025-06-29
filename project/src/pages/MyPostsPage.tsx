import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Heart, 
  MessageCircle,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MyPost {
  id: number;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  views: number;
  status: 'published' | 'draft' | 'pending';
  createdAt: string;
  tags: string[];
}

const MyPostsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for user's posts
  const [myPosts] = useState<MyPost[]>([
    {
      id: 1,
      title: 'Bánh Tráng Nướng Đỏ Rực - Món Ăn Vặt Kinh Điển',
      description: 'Với màu đỏ cam rực rỡ từ tôm khô và mắm ruốc, bánh tráng nướng không chỉ ngon mà còn mang đến cảm giác hạnh phúc tức thì!',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      likes: 156,
      comments: 23,
      views: 1240,
      status: 'published',
      createdAt: '2024-01-15T08:00:00Z',
      tags: ['Đỏ', 'Cay', 'Ăn vặt']
    },
    {
      id: 2,
      title: 'Salad Xanh Mát Lạnh - Thanh Lọc Cơ Thể',
      description: 'Khi cần một chút bình yên cho tâm hồn, salad xanh mát với đủ loại rau củ tươi ngon chính là lựa chọn hoàn hảo!',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
      likes: 89,
      comments: 12,
      views: 890,
      status: 'published',
      createdAt: '2024-01-14T12:00:00Z',
      tags: ['Xanh', 'Khỏe mạnh', 'Vegetarian']
    },
    {
      id: 3,
      title: 'Công Thức Phở Bò Truyền Thống',
      description: 'Chia sẻ bí quyết nấu phở bò với nước dùng trong vắt, thơm ngon như quán phở Hà Nội...',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg',
      likes: 0,
      comments: 0,
      views: 0,
      status: 'draft',
      createdAt: '2024-01-16T10:00:00Z',
      tags: ['Nâu', 'Truyền thống', 'Phở']
    }
  ]);

  const filters = [
    { value: 'all', label: 'Tất cả', count: myPosts.length },
    { value: 'published', label: 'Đã đăng', count: myPosts.filter(p => p.status === 'published').length },
    { value: 'draft', label: 'Bản nháp', count: myPosts.filter(p => p.status === 'draft').length },
    { value: 'pending', label: 'Chờ duyệt', count: myPosts.filter(p => p.status === 'pending').length }
  ];

  const filteredPosts = myPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || post.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-500/20';
      case 'draft': return 'text-yellow-400 bg-yellow-500/20';
      case 'pending': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Đã đăng';
      case 'draft': return 'Bản nháp';
      case 'pending': return 'Chờ duyệt';
      default: return status;
    }
  };

  const totalStats = {
    totalPosts: myPosts.length,
    totalLikes: myPosts.reduce((sum, post) => sum + post.likes, 0),
    totalComments: myPosts.reduce((sum, post) => sum + post.comments, 0),
    totalViews: myPosts.reduce((sum, post) => sum + post.views, 0)
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText size={64} className="text-white/40 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Chưa đăng nhập</h2>
          <p className="text-white/60">Vui lòng đăng nhập để xem bài viết của bạn</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Bài Viết Của Tôi</h1>
            <p className="text-white/70">Quản lý và theo dõi các bài viết bạn đã chia sẻ</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Tạo bài viết mới</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText size={24} className="text-primary-400" />
              <span className="text-2xl font-bold text-white">{totalStats.totalPosts}</span>
            </div>
            <p className="text-white/60 text-sm">Tổng bài viết</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Heart size={24} className="text-red-400" />
              <span className="text-2xl font-bold text-white">{totalStats.totalLikes}</span>
            </div>
            <p className="text-white/60 text-sm">Lượt thích</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <MessageCircle size={24} className="text-blue-400" />
              <span className="text-2xl font-bold text-white">{totalStats.totalComments}</span>
            </div>
            <p className="text-white/60 text-sm">Bình luận</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Eye size={24} className="text-green-400" />
              <span className="text-2xl font-bold text-white">{totalStats.totalViews}</span>
            </div>
            <p className="text-white/60 text-sm">Lượt xem</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glass w-full pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-white/60" />
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === filter.value
                    ? 'bg-gradient-button text-white shadow-glow'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span>{filter.label}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="glass-card rounded-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full md:w-48 h-48 md:h-auto object-cover"
                />
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{post.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                          {getStatusLabel(post.status)}
                        </span>
                      </div>
                      <p className="text-white/70 mb-4 line-clamp-2">{post.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-white/60">
                      <div className="flex items-center space-x-1">
                        <Heart size={16} />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle size={16} />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-white/60 hover:text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText size={64} className="text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? 'Không tìm thấy bài viết nào' : 'Chưa có bài viết nào'}
            </h3>
            <p className="text-white/60 mb-6">
              {searchTerm 
                ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                : 'Hãy tạo bài viết đầu tiên để chia sẻ với cộng đồng'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                <Plus size={20} className="mr-2" />
                Tạo bài viết đầu tiên
              </button>
            )}
          </div>
        )}

        {/* Create Post Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Tạo Bài Viết Mới</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Tiêu đề bài viết
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề hấp dẫn..."
                    className="input-glass w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nội dung
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Chia sẻ trải nghiệm, công thức, hoặc cảm nhận của bạn về món ăn..."
                    className="input-glass w-full resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Hình ảnh
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
                    <Plus size={48} className="mx-auto text-white/40 mb-4" />
                    <p className="text-white/60 mb-2">Tải lên hình ảnh món ăn</p>
                    <button className="text-primary-400 font-medium">
                      Chọn file
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Thêm tags (cách nhau bằng dấu phẩy)"
                    className="input-glass w-full"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    Lưu nháp
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Đăng bài
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostsPage;