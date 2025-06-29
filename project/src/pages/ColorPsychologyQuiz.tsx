import React, { useState } from 'react';
import { Brain, RefreshCw, Share2, CheckCircle, ArrowRight, Play, ExternalLink, ShoppingCart, Navigation, ArrowLeft, Music, Film, Tv, BookOpen, Utensils, BarChart3, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface QuizType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  buttonText: string;
}

interface ColorOption {
  id: number;
  color: string;
  name: string;
  emotion: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  colors: ColorOption[];
}

interface QuizResult {
  dominantColors: string[];
  emotion: string;
  content: any[];
  description: string;
}

const ColorPsychologyQuiz: React.FC = () => {
  const [selectedQuizType, setSelectedQuizType] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  const quizTypes: QuizType[] = [
    {
      id: 'all',
      title: 'All in one',
      subtitle: 'Khám phá toàn diện',
      description: 'Nhận gợi ý về phim, nhạc, sách và món ăn phù hợp với tâm trạng của bạn',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      buttonText: 'Bắt đầu trắc nghiệm tổng hợp'
    },
    {
      id: 'music',
      title: 'Spotify',
      subtitle: 'Khám phá âm nhạc',
      description: 'Tìm playlist và bài hát Spotify phù hợp với tâm trạng hiện tại',
      icon: Music,
      color: 'from-green-500 to-green-600',
      buttonText: 'Tìm nhạc trên Spotify'
    },
    {
      id: 'movies',
      title: 'Movies',
      subtitle: 'Khám phá phim ảnh',
      description: 'Tìm phim và series phù hợp với cảm xúc của bạn',
      icon: Film,
      color: 'from-yellow-500 to-orange-500',
      buttonText: 'Tìm phim hay'
    },
    {
      id: 'netflix',
      title: 'Netflix',
      subtitle: 'Netflix shows',
      description: 'Khám phá series và phim Netflix dựa trên tâm trạng',
      icon: Tv,
      color: 'from-red-500 to-red-600',
      buttonText: 'Tìm show Netflix'
    },
    {
      id: 'books',
      title: 'Books',
      subtitle: 'Khám phá sách hay',
      description: 'Tìm cuốn sách phù hợp để đọc ngay bây giờ',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      buttonText: 'Tìm sách hay'
    },
    {
      id: 'food',
      title: 'Food',
      subtitle: 'Khám phá ẩm thực',
      description: 'Tìm món ăn và quán ăn phù hợp với tâm trạng',
      icon: Utensils,
      color: 'from-orange-500 to-red-500',
      buttonText: 'Tìm món ăn ngon'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Chọn màu sắc bạn cảm thấy hấp dẫn nhất ngay bây giờ",
      colors: [
        { id: 1, color: "#ef4444", name: "Đỏ", emotion: "passionate" },
        { id: 2, color: "#3b82f6", name: "Xanh dương", emotion: "calm" }
      ]
    },
    {
      id: 2,
      question: "Màu nào khiến bạn cảm thấy thư thái nhất?",
      colors: [
        { id: 3, color: "#8b5cf6", name: "Tím", emotion: "mystical" },
        { id: 4, color: "#06b6d4", name: "Xanh cyan", emotion: "peaceful" }
      ]
    },
    {
      id: 3,
      question: "Khi buồn, bạn muốn nhìn thấy màu gì?",
      colors: [
        { id: 5, color: "#ec4899", name: "Hồng", emotion: "loving" },
        { id: 6, color: "#10b981", name: "Emerald", emotion: "healing" }
      ]
    },
    {
      id: 4,
      question: "Màu nào thể hiện tính cách của bạn?",
      colors: [
        { id: 7, color: "#f59e0b", name: "Vàng", emotion: "happy" },
        { id: 8, color: "#6366f1", name: "Indigo", emotion: "deep" }
      ]
    },
    {
      id: 5,
      question: "Màu nào khiến bạn cảm thấy sáng tạo?",
      colors: [
        { id: 9, color: "#7c3aed", name: "Tím đậm", emotion: "creative" },
        { id: 10, color: "#059669", name: "Xanh đậm", emotion: "grounded" }
      ]
    },
    {
      id: 6,
      question: "Khi hạnh phúc, bạn thích màu nào nhất?",
      colors: [
        { id: 11, color: "#f43f5e", name: "Rose", emotion: "joyful" },
        { id: 12, color: "#84cc16", name: "Xanh lime", emotion: "energetic" }
      ]
    },
    {
      id: 7,
      question: "Màu nào giúp bạn tập trung?",
      colors: [
        { id: 13, color: "#64748b", name: "Xám", emotion: "focused" },
        { id: 14, color: "#dc2626", name: "Đỏ đậm", emotion: "intense" }
      ]
    },
    {
      id: 8,
      question: "Màu nào khiến bạn cảm thấy bí ẩn?",
      colors: [
        { id: 15, color: "#312e81", name: "Tím đen", emotion: "mysterious" },
        { id: 16, color: "#065f46", name: "Xanh đen", emotion: "deep" }
      ]
    },
    {
      id: 9,
      question: "Khi muốn thư giãn, bạn chọn màu gì?",
      colors: [
        { id: 17, color: "#fda4af", name: "Hồng nhạt", emotion: "gentle" },
        { id: 18, color: "#93c5fd", name: "Xanh nhạt", emotion: "serene" }
      ]
    },
    {
      id: 10,
      question: "Màu cuối cùng - chọn theo trực giác",
      colors: [
        { id: 19, color: "#fbbf24", name: "Vàng ấm", emotion: "warm" },
        { id: 20, color: "#1e40af", name: "Xanh navy", emotion: "stable" }
      ]
    }
  ];

  const contentData = {
    passionate: {
      all: [
        {
          type: 'movie',
          title: 'Top Gun: Maverick',
          subtitle: 'Action • 2022 • 2h 11m',
          description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN\'s elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
          rating: '8.3/10',
          matchPercentage: '95%',
          link: 'https://www.imdb.com/title/tt1745960/'
        },
        {
          type: 'music',
          title: 'High Energy Workout',
          subtitle: 'Spotify Playlist • 50 songs',
          description: 'Pump up your energy with these high-intensity tracks perfect for workouts and motivation.',
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
          rating: '4.8/5',
          matchPercentage: '92%',
          link: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP'
        },
        {
          type: 'book',
          title: 'Atomic Habits',
          subtitle: 'James Clear • Self-help',
          description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Transform your life with tiny changes in behavior.',
          image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
          rating: '4.7/5',
          matchPercentage: '88%',
          link: 'https://www.amazon.com/dp/0735211299'
        },
        {
          type: 'food',
          title: 'Mexican Cuisine',
          subtitle: 'Latin American • 100% mood match',
          description: 'Vibrant and energizing with bold spices, fresh lime, and exciting heat levels',
          image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg',
          rating: '4.5/5',
          matchPercentage: '100%',
          healthScore: '60/100',
          prepTime: '30-45 min',
          spiceLevel: '6/10',
          nutritionTags: ['Plant proteins', 'Vitamin C', 'Healthy fats'],
          restaurants: [
            { name: 'Bún Bò Huế Cô Ba', address: '123 Võ Văn Ngân, Thủ Đức', distance: '0.5km' }
          ]
        }
      ],
      music: [
        {
          title: 'Blinding Lights',
          artist: 'The Weeknd',
          album: 'After Hours',
          duration: '3:20',
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
          matchPercentage: '116%',
          spotifyUrl: 'https://open.spotify.com/track/0VjIjW4GlULA4LGoDOLVKN'
        },
        {
          title: 'Don\'t Stop Me Now',
          artist: 'Queen',
          album: 'Jazz',
          duration: '3:29',
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
          matchPercentage: '98%',
          spotifyUrl: 'https://open.spotify.com/track/5T8EDUDqKcs6OSOwEsfqG7'
        },
        {
          title: 'Uptown Funk',
          artist: 'Mark Ronson ft. Bruno Mars',
          album: 'Uptown Special',
          duration: '4:30',
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
          matchPercentage: '94%',
          spotifyUrl: 'https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS'
        }
      ],
      movies: [
        {
          title: 'Mad Max: Fury Road',
          year: 2015,
          genre: 'Action',
          duration: '2h 0m',
          rating: 8.1,
          matchPercentage: '116%',
          director: 'George Miller',
          cast: ['Tom Hardy', 'Charlize Theron'],
          synopsis: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'
        },
        {
          title: 'John Wick',
          year: 2014,
          genre: 'Action',
          duration: '1h 41m',
          rating: 7.4,
          matchPercentage: '108%',
          director: 'Chad Stahelski',
          cast: ['Keanu Reeves', 'Michael Nyqvist'],
          synopsis: 'An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'
        }
      ],
      netflix: [
        {
          title: 'Stranger Things',
          year: 2016,
          seasons: 4,
          genre: 'Sci-Fi Horror',
          rating: 8.7,
          matchPercentage: '102%',
          synopsis: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
          netflixUrl: 'https://www.netflix.com/title/80057281'
        },
        {
          title: 'Money Heist',
          year: 2017,
          seasons: 5,
          genre: 'Crime Drama',
          rating: 8.2,
          matchPercentage: '96%',
          synopsis: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
          netflixUrl: 'https://www.netflix.com/title/80192098'
        }
      ],
      books: [
        {
          title: 'The 7 Habits of Highly Effective People',
          author: 'Stephen Covey',
          pages: 381,
          year: 1989,
          genre: 'Self-help',
          isbn: '9780743269513',
          matchPercentage: '89%',
          synopsis: 'One of the most inspiring and impactful books ever written, The 7 Habits of Highly Effective People has captivated readers for 25 years.',
          image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
          buyUrl: 'https://www.amazon.com/dp/0743269519'
        },
        {
          title: 'Think and Grow Rich',
          author: 'Napoleon Hill',
          pages: 320,
          year: 1937,
          genre: 'Business',
          isbn: '9781585424331',
          matchPercentage: '85%',
          synopsis: 'The landmark bestseller now revised and updated for the 21st century.',
          image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
          buyUrl: 'https://www.amazon.com/dp/1585424331'
        }
      ],
      food: [
        {
          name: 'Mexican Cuisine',
          cuisine: 'Latin American',
          spiceLevel: 'Medium-Hot',
          cookTime: '30-45 min',
          difficulty: 'Intermediate',
          description: 'Vibrant and energizing with bold spices, fresh lime, and exciting heat levels',
          matchPercentage: '100%',
          healthScore: '60/100',
          prepTime: '30-45 min',
          spiceRating: '6/10',
          nutritionTags: ['Plant proteins', 'Vitamin C', 'Healthy fats'],
          nutrition: { calories: 320, protein: '25g', carbs: '15g' },
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
          restaurants: [
            { name: 'Lẩu Thái Cô Giang', address: '234 Hoàng Diệu 2, Thủ Đức', rating: 4.4, distance: '1.0km' }
          ]
        },
        {
          name: 'Spicy Korean BBQ',
          cuisine: 'Korean',
          spiceLevel: 'Hot',
          cookTime: '25-35 min',
          difficulty: 'Easy',
          description: 'Bold flavors with gochujang and kimchi that energize your taste buds',
          matchPercentage: '95%',
          healthScore: '70/100',
          prepTime: '25-35 min',
          spiceRating: '8/10',
          nutritionTags: ['High protein', 'Probiotics', 'Iron'],
          nutrition: { calories: 380, protein: '35g', carbs: '12g' },
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
          restaurants: [
            { name: 'Seoul Kitchen', address: '456 Phạm Văn Đồng, Thủ Đức', rating: 4.6, distance: '0.8km' }
          ]
        }
      ]
    },
    calm: {
      all: [
        {
          type: 'movie',
          title: 'Your Name',
          subtitle: 'Anime • 2016 • 1h 46m',
          description: 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
          rating: '8.2/10',
          matchPercentage: '94%',
          link: 'https://www.imdb.com/title/tt5311514/'
        },
        {
          type: 'music',
          title: 'Peaceful Piano',
          subtitle: 'Spotify Playlist • 100 songs',
          description: 'Relax and unwind with beautiful piano pieces perfect for studying, sleeping, or meditation.',
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
          rating: '4.9/5',
          matchPercentage: '98%',
          link: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO'
        },
        {
          type: 'book',
          title: 'The Alchemist',
          subtitle: 'Paulo Coelho • Philosophy',
          description: 'A magical story that inspires us to follow our dreams and listen to our hearts.',
          image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
          rating: '4.6/5',
          matchPercentage: '91%',
          link: 'https://www.amazon.com/dp/0062315005'
        },
        {
          type: 'food',
          title: 'Japanese Cuisine',
          subtitle: 'Asian • 95% mood match',
          description: 'Clean, balanced flavors with fresh ingredients and mindful preparation',
          image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
          rating: '4.8/5',
          matchPercentage: '95%',
          healthScore: '85/100',
          prepTime: '20-30 min',
          spiceLevel: '2/10',
          nutritionTags: ['Omega-3', 'Low sodium', 'Antioxidants'],
          restaurants: [
            { name: 'Trà Sen Hồ Tây', address: '123 Phạm Văn Đồng, Thủ Đức', distance: '1.1km' }
          ]
        }
      ],
      music: [
        {
          title: 'Weightless',
          artist: 'Marconi Union',
          album: 'Ambient',
          duration: '8:10',
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
          matchPercentage: '98%',
          spotifyUrl: 'https://open.spotify.com/track/3IAJfCQ3QkZbv2lEKvNcCn'
        },
        {
          title: 'Clair de Lune',
          artist: 'Claude Debussy',
          album: 'Classical',
          duration: '4:42',
          image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
          matchPercentage: '95%',
          spotifyUrl: 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m'
        }
      ],
      movies: [
        {
          title: 'Spirited Away',
          year: 2001,
          genre: 'Anime',
          duration: '2h 5m',
          rating: 9.3,
          matchPercentage: '96%',
          director: 'Hayao Miyazaki',
          cast: ['Rumi Hiiragi', 'Miyu Irino'],
          synopsis: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'
        }
      ],
      netflix: [
        {
          title: 'The Good Place',
          year: 2016,
          seasons: 4,
          genre: 'Comedy',
          rating: 8.2,
          matchPercentage: '92%',
          synopsis: 'A woman struggles to be a good person when she is placed in the afterlife by mistake.',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
          netflixUrl: 'https://www.netflix.com/title/80113701'
        }
      ],
      books: [
        {
          title: 'Mindfulness in Plain English',
          author: 'Bhante Henepola Gunaratana',
          pages: 224,
          year: 2011,
          genre: 'Spirituality',
          isbn: '9780861719068',
          matchPercentage: '93%',
          synopsis: 'A classic introduction to meditation and mindfulness, written in clear, easy-to-understand language.',
          image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
          buyUrl: 'https://www.amazon.com/dp/0861719069'
        }
      ],
      food: [
        {
          name: 'Japanese Cuisine',
          cuisine: 'Asian',
          spiceLevel: 'Mild',
          cookTime: '20-30 min',
          difficulty: 'Easy',
          description: 'Clean, balanced flavors with fresh ingredients and mindful preparation',
          matchPercentage: '95%',
          healthScore: '85/100',
          prepTime: '20-30 min',
          spiceRating: '2/10',
          nutritionTags: ['Omega-3', 'Low sodium', 'Antioxidants'],
          nutrition: { calories: 180, protein: '8g', carbs: '35g' },
          image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg',
          restaurants: [
            { name: 'Chè Cung Đình', address: '890 Võ Văn Ngân, Thủ Đức', rating: 4.5, distance: '0.9km' }
          ]
        }
      ]
    }
  };

  const handleQuizTypeSelect = (quizType: string) => {
    // Reset everything when selecting a new quiz type
    setSelectedQuizType(quizType);
    setCurrentQuestion(0);
    setSelectedColors([]);
    setShowResult(false);
    setResult(null);
    setCurrentResultIndex(0);
  };

  const handleColorSelect = (color: string) => {
    const newSelectedColors = [...selectedColors, color];
    setSelectedColors(newSelectedColors);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const dominantEmotion = newSelectedColors.length > 5 ? 'passionate' : 'calm';
      const resultData = contentData[dominantEmotion as keyof typeof contentData];
      
      let content = [];
      if (selectedQuizType === 'all') {
        content = resultData.all;
      } else if (selectedQuizType && resultData[selectedQuizType as keyof typeof resultData]) {
        content = resultData[selectedQuizType as keyof typeof resultData] as any[];
      }

      setResult({
        dominantColors: newSelectedColors,
        emotion: dominantEmotion === 'passionate' ? 'Đam mê & Năng động' : 'Bình yên & Tĩnh lặng',
        content,
        description: dominantEmotion === 'passionate' 
          ? 'Bạn đang tràn đầy năng lượng và đam mê!'
          : 'Tâm trạng của bạn đang rất thanh thản và cân bằng.'
      });
      setShowResult(true);
      setCurrentResultIndex(0);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedColors([]);
    setShowResult(false);
    setResult(null);
    setCurrentResultIndex(0);
  };

  const generateNewRecommendations = () => {
    // Simulate generating new recommendations by shuffling content
    if (result) {
      const shuffledContent = [...result.content].sort(() => Math.random() - 0.5);
      setResult({
        ...result,
        content: shuffledContent
      });
      setCurrentResultIndex(0);
    }
  };

  const nextResult = () => {
    if (result && currentResultIndex < result.content.length - 1) {
      setCurrentResultIndex(currentResultIndex + 1);
    }
  };

  const prevResult = () => {
    if (currentResultIndex > 0) {
      setCurrentResultIndex(currentResultIndex - 1);
    }
  };

  const openExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const getResultTitle = () => {
    if (!selectedQuizType) return '';
    
    const titles = {
      all: 'Your Perfect Matches',
      music: 'Your Perfect Music Matches',
      movies: 'Your Perfect Movie Matches',
      netflix: 'Your Perfect Netflix Matches',
      books: 'Your Perfect Book Matches',
      food: 'Your Perfect Food Matches'
    };
    
    return titles[selectedQuizType as keyof typeof titles] || 'Your Perfect Matches';
  };

  const getResultSubtitle = () => {
    if (!result || !selectedQuizType) return '';
    
    const count = result.content.length;
    const subtitles = {
      all: `Based on your current mood, here are ${count} recommendations I picked just for you`,
      music: `Based on your current mood, here are ${count} songs I picked just for you`,
      movies: `Based on your current mood, here are ${count} movies I picked just for you`,
      netflix: `Based on your current mood, here are ${count} shows I picked just for you`,
      books: `Based on your current mood, here are ${count} books I picked just for you`,
      food: `Based on your current mood, here are cuisines I picked just for you`
    };
    
    return subtitles[selectedQuizType as keyof typeof subtitles] || '';
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-button rounded-full mb-4 shadow-glow">
            <Brain size={24} className="text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            AI-Powered Mood-Based<br />Entertainment Recommendations
          </h1>
          <p className="text-base text-white/70 max-w-3xl mx-auto mb-6">
            Stop endless scrolling through Netflix, Spotify, and streaming platforms. Taranify's AI analyzes your mood through our innovative 
            color quiz to find movies, music, shows, and books you'll actually love.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="glass-card rounded-lg p-4">
              <Brain size={20} className="text-primary-400 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">Simple AI Color Quiz</h3>
              <p className="text-white/60 text-xs">Phân tích tâm trạng thông qua màu sắc với công nghệ AI</p>
            </div>
            <div className="glass-card rounded-lg p-4">
              <CheckCircle size={20} className="text-primary-400 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">Privacy-First Recommendations</h3>
              <p className="text-white/60 text-xs">Không cần đăng nhập, không lưu trữ dữ liệu cá nhân</p>
            </div>
            <div className="glass-card rounded-lg p-4">
              <RefreshCw size={20} className="text-primary-400 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">Instant Personalized Results</h3>
              <p className="text-white/60 text-xs">Nhận gợi ý cá nhân hóa trong vòng 30 giây</p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-6">
            <button className="btn-primary text-sm px-5 py-2 flex items-center space-x-2">
              <span>Start Free AI Quiz</span>
              <ArrowRight size={16} />
            </button>
            <button className="text-white/70 hover:text-white transition-colors text-sm">
              How It Works
            </button>
          </div>

          <p className="text-white/50 text-xs max-w-3xl mx-auto mb-8">
            Perfect for discovering new content on Netflix, Spotify and more. Whether you're looking for feel-good movies, energizing playlists, 
            binge-worthy series, or thought-provoking books, our AI understands your emotional state and finds content that matches your vibe.
          </p>
        </div>

        {/* Quiz Type Selection - Fixed uniform sizing */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {quizTypes.map((quiz) => {
            const IconComponent = quiz.icon;
            return (
              <button
                key={quiz.id}
                onClick={() => handleQuizTypeSelect(quiz.id)}
                className={`glass-card rounded-lg p-4 text-center hover:scale-105 transition-all duration-300 h-24 flex flex-col justify-center ${
                  quiz.id === selectedQuizType ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center mx-auto mb-2">
                  <IconComponent size={18} className="text-white" />
                </div>
                <h3 className="font-medium text-white text-xs leading-tight">{quiz.title}</h3>
                <p className="text-white/60 text-xs mt-1 leading-tight">{quiz.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Quiz Content - Hiển thị ngay dưới selection */}
        {selectedQuizType && !showResult && (
          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Câu hỏi {currentQuestion + 1} / {quizQuestions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-button h-3 rounded-full transition-all duration-500 shadow-glow"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 text-center">
                {quizQuestions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {quizQuestions[currentQuestion].colors.map((colorOption) => (
                  <button
                    key={colorOption.id}
                    onClick={() => handleColorSelect(colorOption.color)}
                    className="group relative aspect-square rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden card-hover"
                    style={{ backgroundColor: colorOption.color }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <h3 className="text-white font-bold text-lg mb-1">{colorOption.name}</h3>
                      <p className="text-white/90 text-sm capitalize">{colorOption.emotion}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results - Single Item Display với Navigation */}
        {showResult && result && result.content.length > 0 && (
          <div className="space-y-8">
            {/* Result Header */}
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                {selectedQuizType === 'movies' && <Film size={24} className="text-yellow-500" />}
                {selectedQuizType === 'music' && <Music size={24} className="text-green-500" />}
                {selectedQuizType === 'netflix' && <Tv size={24} className="text-red-500" />}
                {selectedQuizType === 'books' && <BookOpen size={24} className="text-blue-500" />}
                {selectedQuizType === 'food' && <Utensils size={24} className="text-orange-500" />}
                {selectedQuizType === 'all' && <BarChart3 size={24} className="text-purple-500" />}
                <h2 className="text-2xl font-bold text-white">
                  {getResultTitle()}
                </h2>
              </div>
              <p className="text-white/70 mb-4">
                {getResultSubtitle()}
              </p>
            </div>

            {/* Single Result Card */}
            <div className="relative">
              <div className="glass-card rounded-xl overflow-hidden">
                {(() => {
                  const item = result.content[currentResultIndex];
                  
                  if (selectedQuizType === 'food') {
                    return (
                      <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 p-8">
                        <div className="text-center mb-6">
                          <h3 className="text-3xl font-bold text-white mb-2">{item.name}</h3>
                          <p className="text-white/80 text-lg">{item.cuisine} • {item.matchPercentage} mood match</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 rounded-lg object-cover"
                          />
                          <img
                            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                            alt="Food 2"
                            className="w-full h-48 rounded-lg object-cover"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-6 text-center">
                          <div>
                            <div className="text-yellow-400 text-2xl font-bold">{item.healthScore}</div>
                            <div className="text-white/60 text-sm">Health</div>
                          </div>
                          <div>
                            <div className="text-blue-400 text-2xl font-bold">{item.prepTime}</div>
                            <div className="text-white/60 text-sm">Prep Time</div>
                          </div>
                          <div>
                            <div className="text-red-400 text-2xl font-bold">{item.spiceRating}</div>
                            <div className="text-white/60 text-sm">Spice</div>
                          </div>
                        </div>

                        <p className="text-white/80 text-center mb-6 text-lg">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                          {item.nutritionTags.map((tag: string, idx: number) => (
                            <span key={idx} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => item.restaurants && openGoogleMaps(item.restaurants[0].address)}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                        >
                          <Navigation size={20} />
                          <span>Find {item.name} Near Me</span>
                        </button>
                      </div>
                    );
                  }

                  if (selectedQuizType === 'movies') {
                    return (
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-96 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                            {item.matchPercentage} match
                          </span>
                        </div>
                        <div className="p-8">
                          <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                          <div className="flex items-center space-x-4 text-white/60 mb-4">
                            <span>{item.year}</span>
                            <span>⭐ {item.rating}/10</span>
                            <span>{item.duration}</span>
                          </div>
                          <p className="text-white/80 mb-6 leading-relaxed">
                            {item.synopsis}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {item.genre.split(' ').map((genre: string, idx: number) => (
                              <span key={idx} className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                                {genre}
                              </span>
                            ))}
                          </div>
                          <div className="text-center text-white/60 text-sm">
                            <p>Tìm kiếm "{item.title}" trên Google để xem phim</p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (selectedQuizType === 'netflix') {
                    return (
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-96 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {item.matchPercentage} match
                          </span>
                        </div>
                        <div className="p-8">
                          <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                          <div className="flex items-center space-x-4 text-white/60 mb-4">
                            <span>{item.year}</span>
                            <span>⭐ {item.rating}/10</span>
                            <span>{item.seasons} seasons</span>
                          </div>
                          <p className="text-white/80 mb-6 leading-relaxed">
                            {item.synopsis}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {item.genre.split(' ').map((genre: string, idx: number) => (
                              <span key={idx} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                                {genre}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => openExternalLink(item.netflixUrl)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                          >
                            <Play size={20} />
                            <span>Watch on Netflix</span>
                          </button>
                        </div>
                      </div>
                    );
                  }

                  if (selectedQuizType === 'music') {
                    return (
                      <div className="p-8 text-center">
                        <div className="mb-6">
                          <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            {item.matchPercentage} match
                          </span>
                        </div>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-64 h-64 rounded-lg object-cover mx-auto mb-6"
                        />
                        <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/60 text-lg mb-2">{item.artist}</p>
                        <p className="text-white/50 mb-6">{item.album} • {item.duration}</p>
                        <button
                          onClick={() => openExternalLink(item.spotifyUrl)}
                          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto transition-colors"
                        >
                          <Play size={20} />
                          <span>Play on Spotify</span>
                        </button>
                      </div>
                    );
                  }

                  if (selectedQuizType === 'books') {
                    return (
                      <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-6">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full md:w-48 h-64 rounded-lg object-cover mx-auto md:mx-0"
                          />
                          <div className="flex-1">
                            <div className="mb-4">
                              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {item.matchPercentage} match
                              </span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-white/60 text-lg mb-2">{item.author}</p>
                            <div className="flex items-center space-x-4 text-white/50 text-sm mb-4">
                              <span>{item.pages} pages</span>
                              <span>{item.year}</span>
                              <span>{item.genre}</span>
                            </div>
                            <p className="text-white/80 mb-6 leading-relaxed">
                              {item.synopsis}
                            </p>
                            <button
                              onClick={() => openExternalLink(item.buyUrl)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                            >
                              <ShoppingCart size={20} />
                              <span>Buy Book</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // All in one layout
                  return (
                    <div className="p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full md:w-48 h-64 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-sm font-medium capitalize">
                              {item.type}
                            </span>
                            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                              {item.matchPercentage} match
                            </span>
                            <span className="text-yellow-400 text-sm">⭐ {item.rating}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-white/60 mb-3">{item.subtitle}</p>
                          <p className="text-white/80 mb-6 leading-relaxed">{item.description}</p>
                          
                          <button
                            onClick={() => openExternalLink(item.link)}
                            className="btn-primary flex items-center space-x-2"
                          >
                            <ExternalLink size={16} />
                            <span>
                              {item.type === 'movie' ? 'View on IMDb' :
                               item.type === 'music' ? 'Listen on Spotify' :
                               item.type === 'book' ? 'Buy Book' : 'View Details'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Navigation Arrows */}
              {result.content.length > 1 && (
                <>
                  <button
                    onClick={prevResult}
                    disabled={currentResultIndex === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextResult}
                    disabled={currentResultIndex === result.content.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Progress Dots */}
            {result.content.length > 1 && (
              <div className="flex justify-center space-x-2">
                {result.content.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentResultIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentResultIndex ? 'bg-primary-500' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <RefreshCw size={20} />
                <span>Start Over</span>
              </button>
              <button
                onClick={generateNewRecommendations}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Sparkles size={20} />
                <span>New Recommendations</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPsychologyQuiz;