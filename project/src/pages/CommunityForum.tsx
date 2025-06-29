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
  ExternalLink
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
    { value: 'all', label: 'Tất cả', color: 'primary' },
    { value: 'Đỏ', label: 'Đỏ', color: 'red' },
    { value: 'Xanh', label: 'Xanh', color: 'green' },
    { value: 'Vàng', label: 'Vàng', color: 'yellow' },
    { value: 'Nâu', label: 'Nâu', color: 'amber' },
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

  const handleReplyLike = (postId: number, commentId: number, replyId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: comment.replies.map(reply =>
                        reply.id === replyId
                          ? { ...reply, likes: reply.likes + 1 }
                          : reply
                      )
                    }
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

  const handleAddReply = (postId: number, commentId: number) => {
    if (!newReply.trim()) return;

    const reply = {
      id: Date.now(),
      author: user?.name || "Bạn",
      authorAvatar: user?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face",
      content: newReply,
      likes: 0,
      createdAt: new Date().toISOString()
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === commentId
                  ? { ...comment, replies: [...comment.replies, reply] }
                  : comment
              )
            }
          : post
      )
    );

    setNewReply('');
    setReplyingTo(null);
  };

  const addRecipeStep = () => {
    setPremiumPostData(prev => ({
      ...prev,
      recipe: [...prev.recipe, '']
    }));
  };

  const addIngredient = () => {
    setPremiumPostData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const updateRecipeStep = (index: number, value: string) => {
    setPremiumPostData(prev => ({
      ...prev,
      recipe: prev.recipe.map((step, i) => i === index ? value : step)
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setPremiumPostData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) => i === index ? value : ingredient)
    }));
  };

  const removeRecipeStep = (index: number) => {
    setPremiumPostData(prev => ({
      ...prev,
      recipe: prev.recipe.filter((_, i) => i !== index)
    }));
  };

  const removeIngredient = (index: number) => {
    setPremiumPostData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const getUserBadge = (authorName: string) => {
    const mockUser = mockUsers.find(u => u.name === authorName);
    if (!mockUser) return null;

    if (mockUser.isPremium) {
      return <Crown size={16} className="text-yellow-400" title="Premium Member" />;
    } else if (mockUser.isTrialUser) {
      return <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Trial</span>;
    }
    return null;
  };

  const canViewFullPost = (post: FoodPost, authorName: string) => {
    const mockUser = mockUsers.find(u => u.name === authorName);
    return mockUser?.isPremium || !post.recipe || !post.ingredients;
  };

  // Post Detail Modal
  if (selectedPost) {
    const authorUser = mockUsers.find(u => u.name === selectedPost.author);
    const canViewFull = canViewFullPost(selectedPost, selectedPost.author);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors text-white"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <img
                src={selectedPost.authorAvatar}
                alt={selectedPost.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{selectedPost.author}</span>
                  {getUserBadge(selectedPost.author)}
                </div>
                <span className="text-white/70 text-sm">
                  {new Date(selectedPost.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {selectedPost.title}
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  {selectedPost.description}
                </p>
                <div className="flex space-x-2 mb-6">
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Content - Recipe & Ingredients */}
            {authorUser?.isPremium && selectedPost.recipe && selectedPost.ingredients && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <ChefHat size={24} className="text-orange-400" />
                    <h3 className="text-xl font-bold text-white">Nguyên liệu</h3>
                  </div>
                  <ul className="space-y-3">
                    {selectedPost.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-white/80 flex items-center space-x-3">
                        <span className="w-2 h-2 bg-primary-400 rounded-full flex-shrink-0"></span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText size={24} className="text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Cách làm</h3>
                  </div>
                  <ol className="space-y-4">
                    {selectedPost.recipe.map((step, index) => (
                      <li key={index} className="text-white/80 flex space-x-3">
                        <span className="bg-primary-500 text-white text-sm w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Trial User Limitation */}
            {!canViewFull && (
              <div className="glass rounded-xl p-6 mb-8 border border-yellow-500/30">
                <div className="text-center">
                  <Crown size={48} className="text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Nội dung Premium</h3>
                  <p className="text-white/70 mb-4">
                    Công thức chi tiết và video hướng dẫn chỉ dành cho thành viên Premium
                  </p>
                  <button
                    onClick={() => window.location.href = '/pricing'}
                    className="btn-primary"
                  >
                    Nâng cấp Premium
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(selectedPost.id)}
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <Heart size={24} />
                  <span className="font-medium">{selectedPost.likes}</span>
                </button>
                <button
                  onClick={() => toggleComments(selectedPost.id)}
                  className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
                >
                  <MessageCircle size={24} />
                  <span className="font-medium">{selectedPost.comments.length}</span>
                </button>
              </div>
              <button className="text-white/40 hover:text-white/60 transition-colors">
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-button rounded-full mb-6 shadow-glow">
            <Users size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cộng Đồng Ẩm Thực
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Chia sẻ món ăn yêu thích, công thức nấu ăn và kết nối với những người cùng đam mê ẩm thực
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Tìm kiếm món ăn, công thức..."
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
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === filter.value
                    ? 'bg-gradient-button text-white shadow-glow'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCreatePost(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Đăng Bài</span>
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const authorUser = mockUsers.find(u => u.name === post.author);
            return (
              <div 
                key={post.id} 
                className="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                {/* Post Image */}
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Eye size={20} className="text-white/80" />
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white text-sm">{post.author}</span>
                      {getUserBadge(post.author)}
                    </div>
                    <span className="text-white/50 text-xs">
                      {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Premium Content Indicator */}
                  {authorUser?.isPremium && post.recipe && (
                    <div className="flex items-center space-x-2 mb-3">
                      <ChefHat size={14} className="text-orange-400" />
                      <span className="text-orange-300 text-xs">Có công thức chi tiết</span>
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
                        className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        <Heart size={16} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComments(post.id);
                        }}
                        className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
                      >
                        <MessageCircle size={16} />
                        <span className="text-sm">{post.comments.length}</span>
                      </button>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/40 hover:text-white/60 transition-colors"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/40 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-white/60">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
          </div>
        )}

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass-card rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Chia Sẻ Món Ăn</h2>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Post Type Selection */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() => setPostType('basic')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      postType === 'basic'
                        ? 'bg-gradient-button text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <Camera size={20} />
                    <span>Bài viết cơ bản</span>
                  </button>
                  
                  <button
                    onClick={() => setPostType('premium')}
                    disabled={!user?.isPremium}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      postType === 'premium' && user?.isPremium
                        ? 'bg-gradient-button text-white'
                        : user?.isPremium
                        ? 'bg-white/10 text-white/70 hover:bg-white/20'
                        : 'bg-white/5 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    <Crown size={20} />
                    <span>Bài viết Premium</span>
                    {!user?.isPremium && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                  </button>
                </div>

                {postType === 'premium' && !user?.isPremium && (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Crown size={16} className="text-yellow-400" />
                      <span className="text-yellow-300 text-sm font-medium">
                        Tính năng Premium: Chia sẻ công thức nấu ăn chi tiết, video hướng dẫn và nhiều hơn nữa!
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Tiêu đề món ăn
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên món ăn..."
                    className="input-glass w-full"
                    value={postType === 'premium' ? premiumPostData.title : ''}
                    onChange={(e) => postType === 'premium' && setPremiumPostData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Hình ảnh món ăn
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
                    <Camera size={48} className="mx-auto text-white/40 mb-4" />
                    <p className="text-white/60 mb-2">Tải lên hình ảnh món ăn</p>
                    <button className="text-primary-400 font-medium">
                      Chọn file
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Mô tả món ăn
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Chia sẻ cảm xúc, hương vị, kỷ niệm gắn liền với món ăn..."
                    className="input-glass w-full resize-none"
                    value={postType === 'premium' ? premiumPostData.description : ''}
                    onChange={(e) => postType === 'premium' && setPremiumPostData(prev => ({ ...prev, description: e.target.value }))}
                  ></textarea>
                </div>

                {/* Premium Features */}
                {postType === 'premium' && user?.isPremium && (
                  <>
                    {/* Recipe Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          <Clock size={16} className="inline mr-1" />
                          Thời gian nấu
                        </label>
                        <input
                          type="text"
                          placeholder="30 phút"
                          className="input-glass w-full"
                          value={premiumPostData.cookingTime}
                          onChange={(e) => setPremiumPostData(prev => ({ ...prev, cookingTime: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          <UsersIcon size={16} className="inline mr-1" />
                          Số người ăn
                        </label>
                        <input
                          type="text"
                          placeholder="4 người"
                          className="input-glass w-full"
                          value={premiumPostData.servings}
                          onChange={(e) => setPremiumPostData(prev => ({ ...prev, servings: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Độ khó
                        </label>
                        <select
                          className="input-glass w-full"
                          value={premiumPostData.difficulty}
                          onChange={(e) => setPremiumPostData(prev => ({ ...prev, difficulty: e.target.value }))}
                        >
                          <option value="easy">Dễ</option>
                          <option value="medium">Trung bình</option>
                          <option value="hard">Khó</option>
                        </select>
                      </div>
                    </div>

                    {/* Ingredients */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        <ChefHat size={16} className="inline mr-1" />
                        Nguyên liệu
                      </label>
                      <div className="space-y-2">
                        {premiumPostData.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex space-x-2">
                            <input
                              type="text"
                              placeholder={`Nguyên liệu ${index + 1}`}
                              className="input-glass flex-1"
                              value={ingredient}
                              onChange={(e) => updateIngredient(index, e.target.value)}
                            />
                            {premiumPostData.ingredients.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="p-2 text-red-400 hover:text-red-300"
                              >
                                <X size={20} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addIngredient}
                          className="text-primary-400 hover:text-primary-300 text-sm"
                        >
                          + Thêm nguyên liệu
                        </button>
                      </div>
                    </div>

                    {/* Recipe Steps */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        <FileText size={16} className="inline mr-1" />
                        Cách làm
                      </label>
                      <div className="space-y-2">
                        {premiumPostData.recipe.map((step, index) => (
                          <div key={index} className="flex space-x-2">
                            <span className="bg-primary-500 text-white text-sm w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              {index + 1}
                            </span>
                            <textarea
                              rows={2}
                              placeholder={`Bước ${index + 1}`}
                              className="input-glass flex-1 resize-none"
                              value={step}
                              onChange={(e) => updateRecipeStep(index, e.target.value)}
                            />
                            {premiumPostData.recipe.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeRecipeStep(index)}
                                className="p-2 text-red-400 hover:text-red-300"
                              >
                                <X size={20} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addRecipeStep}
                          className="text-primary-400 hover:text-primary-300 text-sm"
                        >
                          + Thêm bước
                        </button>
                      </div>
                    </div>

                    {/* Video URL */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        <Video size={16} className="inline mr-1" />
                        Video hướng dẫn (tùy chọn)
                      </label>
                      <input
                        type="url"
                        placeholder="https://youtube.com/watch?v=..."
                        className="input-glass w-full"
                        value={premiumPostData.videoUrl}
                        onChange={(e) => setPremiumPostData(prev => ({ ...prev, videoUrl: e.target.value }))}
                      />
                    </div>
                  </>
                )}

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
                    onClick={() => setShowCreatePost(false)}
                    className="btn-secondary"
                  >
                    Hủy
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

export default CommunityForum;