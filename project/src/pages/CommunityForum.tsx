import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  Camera,
  Filter,
  Search,
  Send,
  ThumbsUp,
  Crown,
  Video,
  FileText,
  ChefHat,
  Clock,
  Users as UsersIcon,
  X,
  Eye,
  Star,
  Play,
  ExternalLink,
  Award,
  Sparkles,
  TrendingUp,
  Bookmark,
  MoreHorizontal
} from 'lucide-react';
import { foodPosts } from '../data/mockData';
import { FoodPost, Comment } from '../types';
import { useAuth } from '../contexts/AuthContext';

const CommunityForum: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<FoodPost[]>(foodPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [replyingTo, setReplyingTo] = useState<{ postId: number; commentId: number } | null>(null);
  const [newReply, setNewReply] = useState('');
  const [postType, setPostType] = useState<'basic' | 'premium'>('basic');
  const [selectedPost, setSelectedPost] = useState<FoodPost | null>(null);

  // Premium post form data
  const [premiumPostData, setPremiumPostData] = useState({
    title: '',
    description: '',
    recipe: [''],
    ingredients: [''],
    cookingTime: '',
    servings: '',
    difficulty: 'easy',
    videoUrl: ''
  });

  // Mock users with different membership types
  const mockUsers = [
    { id: 1, name: 'Mai Anh', isPremium: true, isTrialUser: false },
    { id: 2, name: 'Thanh Tú', isPremium: false, isTrialUser: true },
    { id: 3, name: 'Hoàng Long', isPremium: true, isTrialUser: false },
    { id: 4, name: 'Linh Chi', isPremium: false, isTrialUser: true },
  ];

  const filters = [
    { value: 'all', label: 'Tất cả', color: 'primary', icon: '🍽️' },
    { value: 'Đỏ', label: 'Đỏ', color: 'red', icon: '🔴' },
    { value: 'Xanh', label: 'Xanh', color: 'green', icon: '🟢' },
    { value: 'Vàng', label: 'Vàng', color: 'yellow', icon: '🟡' },
    { value: 'Nâu', label: 'Nâu', color: 'amber', icon: '🟤' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || post.tags.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleCommentLike = (postId: number, commentId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === commentId
                  ? { ...comment, likes: comment.likes + 1 }
                  : comment
              )
            }
          : post
      )
    );
  };

  const toggleComments = (postId: number) => {
    setExpandedComments(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleAddComment = (postId: number) => {
    if (!newComment[postId]?.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: user?.name || "Bạn",
      authorAvatar: user?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face",
      content: newComment[postId],
      likes: 0,
      replies: [],
      createdAt: new Date().toISOString()
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );

    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  const getUserBadge = (authorName: string) => {
    const mockUser = mockUsers.find(u => u.name === authorName);
    if (!mockUser) return null;

    if (mockUser.isPremium) {
      return (
        <div className="flex items-center space-x-1">
          <Crown size={14} className="text-yellow-400" />
          <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full font-medium">Premium</span>
        </div>
      );
    } else if (mockUser.isTrialUser) {
      return <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full font-medium">Trial</span>;
    }
    return null;
  };

  const canViewFullPost = (post: FoodPost, authorName: string) => {
    const mockUser = mockUsers.find(u => u.name === authorName);
    return mockUser?.isPremium || !post.recipe || !post.ingredients;
  };

  // Enhanced Post Detail Modal
  if (selectedPost) {
    const authorUser = mockUsers.find(u => u.name === selectedPost.author);
    const canViewFull = canViewFullPost(selectedPost, selectedPost.author);

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="glass-card rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
          {/* Header Image */}
          <div className="relative h-80 rounded-t-3xl overflow-hidden">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors text-white"
            >
              <X size={24} />
            </button>

            {/* Author Info Overlay */}
            <div className="absolute bottom-6 left-6 flex items-center space-x-4">
              <img
                src={selectedPost.authorAvatar}
                alt={selectedPost.author}
                className="w-16 h-16 rounded-full object-cover border-3 border-white/30"
              />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-bold text-lg">{selectedPost.author}</span>
                  {getUserBadge(selectedPost.author)}
                </div>
                <span className="text-white/80 text-sm">
                  {new Date(selectedPost.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute top-6 left-6 flex items-center space-x-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Heart size={16} className="text-red-400" />
                <span className="text-white font-medium">{selectedPost.likes}</span>
              </div>
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <MessageCircle size={16} className="text-blue-400" />
                <span className="text-white font-medium">{selectedPost.comments.length}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Title and Description */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {selectedPost.title}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                {selectedPost.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary-500/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Premium Content - Recipe & Ingredients */}
            {authorUser?.isPremium && selectedPost.recipe && selectedPost.ingredients && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Ingredients */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <ChefHat size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Nguyên liệu</h3>
                      <p className="text-white/60 text-sm">Chuẩn bị đầy đủ để có món ngon nhất</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {selectedPost.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary-400 rounded-full flex-shrink-0"></div>
                        <span className="text-white/90">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recipe Steps */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <FileText size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Cách làm</h3>
                      <p className="text-white/60 text-sm">Thực hiện từng bước một cách cẩn thận</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {selectedPost.recipe.map((step, index) => (
                      <div key={index} className="flex space-x-4 p-4 bg-white/5 rounded-lg">
                        <div className="bg-primary-500 text-white text-sm w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          {index + 1}
                        </div>
                        <span className="text-white/90 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Premium Features Showcase */}
            {authorUser?.isPremium && (
              <div className="glass rounded-2xl p-6 mb-8 border border-yellow-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Crown size={24} className="text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Nội dung Premium</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-white/80">
                    <Video size={16} className="text-red-400" />
                    <span className="text-sm">Video hướng dẫn chi tiết</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Clock size={16} className="text-blue-400" />
                    <span className="text-sm">Tips nấu ăn chuyên nghiệp</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Award size={16} className="text-purple-400" />
                    <span className="text-sm">Công thức độc quyền</span>
                  </div>
                </div>
              </div>
            )}

            {/* Trial User Limitation */}
            {!canViewFull && (
              <div className="glass rounded-2xl p-8 mb-8 border border-yellow-500/30 text-center">
                <Crown size={64} className="text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Nội dung Premium</h3>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  Công thức chi tiết và video hướng dẫn chỉ dành cho thành viên Premium. 
                  Nâng cấp ngay để truy cập đầy đủ nội dung!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.location.href = '/pricing'}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Nâng cấp Premium
                  </button>
                  <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all">
                    Dùng thử 7 ngày
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(selectedPost.id)}
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors group"
                >
                  <Heart size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{selectedPost.likes}</span>
                </button>
                <button
                  onClick={() => toggleComments(selectedPost.id)}
                  className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors group"
                >
                  <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{selectedPost.comments.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors group">
                  <Bookmark size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Lưu</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-white/40 hover:text-white/60 transition-colors p-2 rounded-lg hover:bg-white/10">
                  <Share2 size={20} />
                </button>
                <button className="text-white/40 hover:text-white/60 transition-colors p-2 rounded-lg hover:bg-white/10">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-button rounded-full mb-6 shadow-glow relative">
            <Users size={40} className="text-white" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
              <TrendingUp size={16} className="text-green-900" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cộng Đồng <span className="text-gradient">Ẩm Thực</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Chia sẻ món ăn yêu thích, công thức nấu ăn và kết nối với những người cùng đam mê ẩm thực
          </p>
          
          {/* Community Stats */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400">1,250+</div>
              <div className="text-white/60 text-sm">Thành viên</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">3,400+</div>
              <div className="text-white/60 text-sm">Bài viết</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">98%</div>
              <div className="text-white/60 text-sm">Hài lòng</div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Tìm kiếm món ăn, công thức, người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glass w-full pl-12 pr-4 py-4 text-lg"
            />
          </div>
          
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            <Filter size={20} className="text-white/60 flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedFilter === filter.value
                    ? 'bg-gradient-button text-white shadow-glow scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white hover:scale-105'
                }`}
              >
                <span className="text-lg">{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCreatePost(true)}
            className="btn-primary flex items-center space-x-2 whitespace-nowrap px-6 py-3"
          >
            <Plus size={20} />
            <span>Đăng Bài</span>
          </button>
        </div>

        {/* Enhanced Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const authorUser = mockUsers.find(u => u.name === post.author);
            return (
              <div 
                key={post.id} 
                className="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                {/* Enhanced Post Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Premium Badge */}
                  {authorUser?.isPremium && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-yellow-500/90 backdrop-blur-sm text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <Crown size={12} />
                        <span>Premium</span>
                      </div>
                    </div>
                  )}
                  
                  {/* View Button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                      <Eye size={16} className="text-white" />
                    </div>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Heart size={12} className="text-red-400" />
                      <span className="text-white text-xs font-medium">{post.likes}</span>
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <MessageCircle size={12} className="text-blue-400" />
                      <span className="text-white text-xs font-medium">{post.comments.length}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Post Content */}
                <div className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white text-sm">{post.author}</span>
                        {getUserBadge(post.author)}
                      </div>
                      <span className="text-white/50 text-xs">
                        {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-gradient transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Premium Content Indicator */}
                  {authorUser?.isPremium && post.recipe && (
                    <div className="flex items-center space-x-2 mb-4 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <ChefHat size={14} className="text-yellow-400" />
                      <span className="text-yellow-300 text-xs font-medium">Có công thức chi tiết + video</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post.id);
                        }}
                        className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 transition-colors group"
                      >
                        <Heart size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComments(post.id);
                        }}
                        className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors group"
                      >
                        <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{post.comments.length}</span>
                      </button>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/40 hover:text-white/60 transition-colors p-2 rounded-lg hover:bg-white/10"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={48} className="text-white/40" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để khám phá thêm nội dung
            </p>
            <button
              onClick={() => setShowCreatePost(true)}
              className="btn-primary"
            >
              <Plus size={20} className="mr-2" />
              Tạo bài viết đầu tiên
            </button>
          </div>
        )}

        {/* Create Post Modal - Enhanced */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass-card rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white">Chia Sẻ Món Ăn</h2>
                  <p className="text-white/60 mt-2">Chia sẻ công thức và trải nghiệm ẩm thực của bạn</p>
                </div>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Post Type Selection */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <button
                    onClick={() => setPostType('basic')}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all ${
                      postType === 'basic'
                        ? 'bg-gradient-button text-white shadow-glow'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <Camera size={20} />
                    <div className="text-left">
                      <div className="font-medium">Bài viết cơ bản</div>
                      <div className="text-xs opacity-70">Ảnh + mô tả</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setPostType('premium')}
                    disabled={!user?.isPremium}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all ${
                      postType === 'premium' && user?.isPremium
                        ? 'bg-gradient-button text-white shadow-glow'
                        : user?.isPremium
                        ? 'bg-white/10 text-white/70 hover:bg-white/20'
                        : 'bg-white/5 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    <Crown size={20} />
                    <div className="text-left">
                      <div className="font-medium">Bài viết Premium</div>
                      <div className="text-xs opacity-70">Công thức + video</div>
                    </div>
                    {!user?.isPremium && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                  </button>
                </div>

                {postType === 'premium' && !user?.isPremium && (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <Crown size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-yellow-300 font-semibold mb-2">Tính năng Premium</h3>
                        <p className="text-yellow-200/80 text-sm mb-4">
                          Chia sẻ công thức chi tiết với video hướng dẫn, tạo nội dung chuyên nghiệp và thu hút nhiều người xem hơn!
                        </p>
                        <button
                          onClick={() => window.location.href = '/pricing'}
                          className="bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400 transition-colors"
                        >
                          Nâng cấp ngay
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Content */}
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Tiêu đề món ăn
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên món ăn hấp dẫn..."
                    className="input-glass w-full text-lg py-4"
                    value={postType === 'premium' ? premiumPostData.title : ''}
                    onChange={(e) => postType === 'premium' && setPremiumPostData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Hình ảnh món ăn
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors group cursor-pointer">
                    <Camera size={64} className="mx-auto text-white/40 mb-4 group-hover:text-primary-400 transition-colors" />
                    <p className="text-white/60 mb-2 text-lg">Tải lên hình ảnh món ăn</p>
                    <p className="text-white/40 text-sm mb-4">Kéo thả hoặc click để chọn file</p>
                    <button className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors">
                      Chọn file
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Mô tả món ăn
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Chia sẻ cảm xúc, hương vị, kỷ niệm gắn liền với món ăn..."
                    className="input-glass w-full resize-none text-lg"
                    value={postType === 'premium' ? premiumPostData.description : ''}
                    onChange={(e) => postType === 'premium' && setPremiumPostData(prev => ({ ...prev, description: e.target.value }))}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Thêm tags (cách nhau bằng dấu phẩy)"
                    className="input-glass w-full"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowCreatePost(false)}
                    className="btn-secondary px-8 py-3"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-8 py-3"
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

export default CommunityForum;