import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  PieChart, 
  Plus,
  Coffee,
  Utensils,
  ShoppingBag,
  MapPin,
  Filter,
  Download,
  Target,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'drink';
  restaurant: string;
  location: string;
  date: string;
  notes?: string;
}

interface Budget {
  monthly: number;
  daily: number;
  categories: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
    drink: number;
  };
}

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 45000,
      category: 'breakfast',
      restaurant: 'Highlands Coffee',
      location: 'ĐHQG TP.HCM',
      date: '2024-01-15',
      notes: 'Cà phê sữa đá + bánh mì'
    },
    {
      id: '2',
      amount: 85000,
      category: 'lunch',
      restaurant: 'Cơm Tấm Sài Gòn',
      location: 'Võ Văn Ngân',
      date: '2024-01-15',
      notes: 'Cơm tấm sườn nướng'
    },
    {
      id: '3',
      amount: 120000,
      category: 'dinner',
      restaurant: 'Bún Bò Huế Cô Ba',
      location: 'Hoàng Diệu 2',
      date: '2024-01-15',
      notes: 'Bún bò Huế + nem chua'
    },
    {
      id: '4',
      amount: 35000,
      category: 'snack',
      restaurant: 'Chợ Đêm Thủ Đức',
      location: 'Kha Vạn Cân',
      date: '2024-01-14',
      notes: 'Bánh tráng nướng'
    }
  ]);

  const [budget, setBudget] = useState<Budget>({
    monthly: 3000000,
    daily: 100000,
    categories: {
      breakfast: 20000,
      lunch: 40000,
      dinner: 40000,
      snack: 15000,
      drink: 25000
    }
  });

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  const categoryIcons = {
    breakfast: Coffee,
    lunch: Utensils,
    dinner: Utensils,
    snack: ShoppingBag,
    drink: Coffee
  };

  const categoryColors = {
    breakfast: 'text-yellow-400',
    lunch: 'text-orange-400',
    dinner: 'text-purple-400',
    snack: 'text-green-400',
    drink: 'text-blue-400'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getTodayExpenses = () => {
    const today = new Date().toISOString().split('T')[0];
    return expenses.filter(expense => expense.date === today);
  };

  const getWeekExpenses = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= weekAgo && expenseDate <= today;
    });
  };

  const getMonthExpenses = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  };

  const getCurrentExpenses = () => {
    switch (selectedPeriod) {
      case 'today': return getTodayExpenses();
      case 'week': return getWeekExpenses();
      case 'month': return getMonthExpenses();
      default: return getTodayExpenses();
    }
  };

  const getCurrentBudget = () => {
    switch (selectedPeriod) {
      case 'today': return budget.daily;
      case 'week': return budget.daily * 7;
      case 'month': return budget.monthly;
      default: return budget.daily;
    }
  };

  const currentExpenses = getCurrentExpenses();
  const totalSpent = currentExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const currentBudget = getCurrentBudget();
  const remainingBudget = currentBudget - totalSpent;
  const budgetProgress = (totalSpent / currentBudget) * 100;

  const categoryStats = Object.keys(budget.categories).map(category => {
    const categoryExpenses = currentExpenses.filter(expense => expense.category === category);
    const spent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const budgetAmount = budget.categories[category as keyof typeof budget.categories];
    const adjustedBudget = selectedPeriod === 'week' ? budgetAmount * 7 : 
                          selectedPeriod === 'month' ? budgetAmount * 30 : budgetAmount;
    
    return {
      category,
      spent,
      budget: adjustedBudget,
      percentage: (spent / adjustedBudget) * 100,
      count: categoryExpenses.length
    };
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Chi Tiêu Ẩm Thực</h1>
            <p className="text-white/70">Theo dõi và phân tích chi phí ăn uống của bạn</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
              {(['today', 'week', 'month'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-gradient-button text-white'
                      : 'text-white/70 hover:text-white'
                  } ${period === 'today' ? 'rounded-l-lg' : period === 'month' ? 'rounded-r-lg' : ''}`}
                >
                  {period === 'today' ? 'Hôm nay' : period === 'week' ? 'Tuần' : 'Tháng'}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddExpense(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Thêm Chi Tiêu</span>
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <DollarSign size={24} className="text-white" />
              </div>
              <span className="text-xs text-white/60 uppercase tracking-wide">Ngân sách</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(currentBudget)}
            </div>
            <div className="text-sm text-white/60">
              {selectedPeriod === 'today' ? 'Hôm nay' : selectedPeriod === 'week' ? 'Tuần này' : 'Tháng này'}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <TrendingUp size={24} className="text-white" />
              </div>
              <span className="text-xs text-white/60 uppercase tracking-wide">Đã chi</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(totalSpent)}
            </div>
            <div className="text-sm text-white/60">
              {currentExpenses.length} giao dịch
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                remainingBudget >= 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}>
                {remainingBudget >= 0 ? <TrendingDown size={24} className="text-white" /> : <AlertCircle size={24} className="text-white" />}
              </div>
              <span className="text-xs text-white/60 uppercase tracking-wide">Còn lại</span>
            </div>
            <div className={`text-2xl font-bold mb-1 ${remainingBudget >= 0 ? 'text-white' : 'text-red-400'}`}>
              {formatCurrency(Math.abs(remainingBudget))}
            </div>
            <div className="text-sm text-white/60">
              {remainingBudget >= 0 ? 'Trong ngân sách' : 'Vượt ngân sách'}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Target size={24} className="text-white" />
              </div>
              <span className="text-xs text-white/60 uppercase tracking-wide">Tiến độ</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {budgetProgress.toFixed(1)}%
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  budgetProgress <= 80 ? 'bg-green-500' : budgetProgress <= 100 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(budgetProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Breakdown */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-6">Chi Tiêu Theo Danh Mục</h3>
              <div className="space-y-4">
                {categoryStats.map((stat) => {
                  const Icon = categoryIcons[stat.category as keyof typeof categoryIcons];
                  const colorClass = categoryColors[stat.category as keyof typeof categoryColors];
                  
                  return (
                    <div key={stat.category} className="glass rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Icon size={20} className={colorClass} />
                          <span className="font-medium text-white capitalize">
                            {stat.category === 'breakfast' ? 'Sáng' :
                             stat.category === 'lunch' ? 'Trưa' :
                             stat.category === 'dinner' ? 'Tối' :
                             stat.category === 'snack' ? 'Ăn vặt' : 'Đồ uống'}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{formatCurrency(stat.spent)}</div>
                          <div className="text-white/60 text-sm">/ {formatCurrency(stat.budget)}</div>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            stat.percentage <= 80 ? 'bg-green-500' : stat.percentage <= 100 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{stat.count} giao dịch</span>
                        <span className={`font-medium ${
                          stat.percentage <= 80 ? 'text-green-400' : stat.percentage <= 100 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {stat.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Expenses */}
          <div>
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Giao Dịch Gần Đây</h3>
                <button className="text-primary-400 hover:text-primary-300 text-sm">
                  Xem tất cả
                </button>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {currentExpenses.slice(0, 10).map((expense) => {
                  const Icon = categoryIcons[expense.category];
                  const colorClass = categoryColors[expense.category];
                  
                  return (
                    <div key={expense.id} className="flex items-start space-x-3 p-3 glass rounded-lg">
                      <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center`}>
                        <Icon size={16} className={colorClass} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm">{expense.restaurant}</div>
                        <div className="text-white/60 text-xs flex items-center space-x-1 mb-1">
                          <MapPin size={12} />
                          <span>{expense.location}</span>
                        </div>
                        <div className="text-white/50 text-xs">{expense.notes}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white text-sm">{formatCurrency(expense.amount)}</div>
                        <div className="text-white/50 text-xs">
                          {new Date(expense.date).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass-card rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Thêm Chi Tiêu</h2>
                  <button
                    onClick={() => setShowAddExpense(false)}
                    className="text-white/60 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Số tiền</label>
                    <input
                      type="number"
                      placeholder="50,000"
                      className="input-glass w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Danh mục</label>
                    <select className="input-glass w-full">
                      <option value="breakfast">Sáng</option>
                      <option value="lunch">Trưa</option>
                      <option value="dinner">Tối</option>
                      <option value="snack">Ăn vặt</option>
                      <option value="drink">Đồ uống</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Quán ăn</label>
                    <input
                      type="text"
                      placeholder="Tên quán ăn"
                      className="input-glass w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Địa điểm</label>
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      className="input-glass w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Ghi chú</label>
                    <textarea
                      rows={3}
                      placeholder="Món ăn, trải nghiệm..."
                      className="input-glass w-full resize-none"
                    ></textarea>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowAddExpense(false)}
                      className="btn-secondary flex-1"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1"
                    >
                      Thêm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;