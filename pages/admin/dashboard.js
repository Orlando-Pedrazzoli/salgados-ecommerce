// pages/admin/dashboard.js - VERSÃO PROFISSIONAL MELHORADA
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Package,
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Users,
  LogOut,
  X,
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  Loader2,
  Home,
  Clock,
  Calendar,
  Filter,
  Search,
  Download,
  RefreshCw,
  Bell,
  ChevronDown,
  Star,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ImageUpload from '../../components/ImageUpload';

// Componente do Header do Admin Melhorado
const AdminHeader = ({ activeTab, setActiveTab, onLogout, stats }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const pendingOrders = stats?.pendingOrders || 0;

  return (
    <header className='bg-white shadow-md border-b sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-8'>
            <div className='flex items-center'>
              <Package className='w-8 h-8 text-amber-500 mr-2' />
              <div>
                <h1 className='text-xl font-bold'>Painel Administrativo</h1>
                <p className='text-xs text-gray-500'>Salgados Premium</p>
              </div>
            </div>

            <nav className='hidden md:flex space-x-2'>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className='w-4 h-4' />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'products'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Package className='w-4 h-4' />
                Produtos
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 relative ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className='w-4 h-4' />
                Pedidos
                {pendingOrders > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                    {pendingOrders}
                  </span>
                )}
              </button>
            </nav>
          </div>

          <div className='flex items-center gap-3'>
            {/* Notificações */}
            <div className='relative'>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className='relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg'
              >
                <Bell className='w-5 h-5' />
                {pendingOrders > 0 && (
                  <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
                )}
              </button>

              {showNotifications && (
                <div className='absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50'>
                  <div className='p-4 border-b'>
                    <h3 className='font-semibold'>Notificações</h3>
                  </div>
                  <div className='max-h-96 overflow-y-auto'>
                    {pendingOrders > 0 ? (
                      <div className='p-4 hover:bg-gray-50 cursor-pointer'>
                        <div className='flex items-start gap-3'>
                          <div className='bg-amber-100 p-2 rounded-full'>
                            <ShoppingBag className='w-4 h-4 text-amber-600' />
                          </div>
                          <div>
                            <p className='text-sm font-medium'>
                              {pendingOrders} pedidos pendentes
                            </p>
                            <p className='text-xs text-gray-500'>
                              Clique para ver os pedidos
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='p-4 text-center text-gray-500'>
                        <p className='text-sm'>Sem notificações</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Link para Homepage */}
            <a
              href='/'
              className='flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors'
            >
              <Home className='w-4 h-4' />
              <span className='hidden md:inline'>Ver Loja</span>
            </a>

            {/* Botão de Logout */}
            <button
              onClick={onLogout}
              className='flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors'
            >
              <LogOut className='w-4 h-4' />
              <span className='hidden md:inline'>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Dashboard Overview Melhorado
const OverviewTab = ({ orders, products, refreshData }) => {
  const [dateRange, setDateRange] = useState('today');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const pendingOrders = orders.filter(
    order => order.status === 'pending'
  ).length;
  const completedOrders = orders.filter(
    order => order.status === 'delivered'
  ).length;
  const activeProducts = products.filter(p => p.active).length;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
    toast.success('Dados atualizados!');
  };

  const getRecentOrders = () => {
    return orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  };

  const getStatusBadge = status => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pendente' },
      confirmed: { color: 'bg-blue-100 text-blue-800', label: 'Confirmado' },
      preparing: {
        color: 'bg-orange-100 text-orange-800',
        label: 'Preparando',
      },
      ready: { color: 'bg-purple-100 text-purple-800', label: 'Pronto' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Entregue' },
    };

    return (
      statusConfig[status] || {
        color: 'bg-gray-100 text-gray-800',
        label: status,
      }
    );
  };

  return (
    <div className='space-y-6'>
      {/* Header com Filtros */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Dashboard</h2>
          <p className='text-gray-600'>Bem-vindo ao painel administrativo</p>
        </div>

        <div className='flex gap-3'>
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500'
          >
            <option value='today'>Hoje</option>
            <option value='week'>Esta Semana</option>
            <option value='month'>Este Mês</option>
            <option value='all'>Todos</option>
          </select>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className='px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2'
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            Atualizar
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Receita Total</p>
              <p className='text-3xl font-bold text-green-600 mt-1'>
                €{totalRevenue.toFixed(2)}
              </p>
              <p className='text-xs text-gray-500 mt-1'>+12% vs mês anterior</p>
            </div>
            <div className='bg-green-100 p-3 rounded-full'>
              <DollarSign className='w-8 h-8 text-green-600' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Total de Pedidos
              </p>
              <p className='text-3xl font-bold text-blue-600 mt-1'>
                {totalOrders}
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                {completedOrders} entregues
              </p>
            </div>
            <div className='bg-blue-100 p-3 rounded-full'>
              <ShoppingBag className='w-8 h-8 text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Ticket Médio</p>
              <p className='text-3xl font-bold text-purple-600 mt-1'>
                €{avgOrderValue.toFixed(2)}
              </p>
              <p className='text-xs text-gray-500 mt-1'>Por pedido</p>
            </div>
            <div className='bg-purple-100 p-3 rounded-full'>
              <TrendingUp className='w-8 h-8 text-purple-600' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Pedidos Pendentes
              </p>
              <p className='text-3xl font-bold text-orange-600 mt-1'>
                {pendingOrders}
              </p>
              <p className='text-xs text-gray-500 mt-1'>Aguardando ação</p>
            </div>
            <div className='bg-orange-100 p-3 rounded-full'>
              <Clock className='w-8 h-8 text-orange-600' />
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico e Pedidos Recentes */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Card de Pedidos Recentes */}
        <div className='bg-white p-6 rounded-xl shadow-md'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-bold'>Pedidos Recentes</h3>
            <button className='text-sm text-amber-600 hover:text-amber-700'>
              Ver todos →
            </button>
          </div>

          <div className='space-y-3'>
            {getRecentOrders().map(order => {
              const status = getStatusBadge(order.status);
              return (
                <div
                  key={order._id}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                >
                  <div className='flex-1'>
                    <div className='flex items-center gap-3'>
                      <span className='font-semibold text-sm'>
                        #{order.orderNumber}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600 mt-1'>
                      {order.customerName}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {new Date(order.createdAt).toLocaleString('pt-PT')}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-amber-600'>
                      €{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card de Produtos Mais Vendidos */}
        <div className='bg-white p-6 rounded-xl shadow-md'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-bold'>Produtos em Destaque</h3>
            <button className='text-sm text-amber-600 hover:text-amber-700'>
              Gerenciar →
            </button>
          </div>

          <div className='space-y-3'>
            {products.slice(0, 5).map(product => (
              <div
                key={product._id}
                className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-12 h-12 rounded-lg object-cover'
                  />
                ) : (
                  <div className='w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center'>
                    <ImageIcon className='w-6 h-6 text-gray-400' />
                  </div>
                )}
                <div className='flex-1'>
                  <p className='font-medium text-sm'>{product.name}</p>
                  <p className='text-xs text-gray-500'>{product.category}</p>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-amber-600'>
                    €{product.price.toFixed(2)}
                  </p>
                  <div className='flex items-center gap-1 text-xs text-gray-500'>
                    <Star className='w-3 h-3 text-yellow-400 fill-current' />
                    {product.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Gestão de Produtos Melhorada
const ProductsTab = ({ products, setProducts }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'pacotes',
    type: '',
    rating: 4.5,
    reviews: 0,
    image: null,
    active: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'pacotes',
      type: '',
      rating: 4.5,
      reviews: 0,
      image: null,
      active: true,
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleImageUpload = imageUrl => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
    toast.success('Imagem carregada com sucesso!');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      toast.error('Nome e preço são obrigatórios');
      return;
    }

    try {
      setIsSubmitting(true);

      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const productData = {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        type: formData.type.trim(),
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar produto');
      }

      const product = await response.json();

      if (editingProduct) {
        setProducts(prev =>
          prev.map(p => (p._id === product._id ? product : p))
        );
        toast.success('Produto atualizado com sucesso!');
      } else {
        setProducts(prev => [...prev, product]);
        toast.success('Produto criado com sucesso!');
      }

      resetForm();
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao salvar produto: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = product => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category,
      type: product.type || '',
      rating: product.rating,
      reviews: product.reviews,
      image: product.image || null,
      active: product.active !== undefined ? product.active : true,
    });
    setShowAddForm(true);
  };

  const handleDelete = async productId => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao excluir produto');
      }

      setProducts(prev => prev.filter(p => p._id !== productId));
      toast.success('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir:', error);
      toast.error('Erro ao excluir produto: ' + error.message);
    }
  };

  const toggleProductStatus = async product => {
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, active: !product.active }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar status');

      const updatedProduct = await response.json();
      setProducts(prev =>
        prev.map(p => (p._id === updatedProduct._id ? updatedProduct : p))
      );

      toast.success(
        `Produto ${updatedProduct.active ? 'ativado' : 'desativado'}!`
      );
    } catch (error) {
      toast.error('Erro ao atualizar status do produto');
    }
  };

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className='space-y-6'>
      {/* Header com Ações */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Gestão de Produtos</h2>
          <p className='text-gray-600'>
            {products.length} produtos cadastrados
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className='bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all'
        >
          <Plus className='w-5 h-5' />
          Novo Produto
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className='bg-white p-4 rounded-xl shadow-md'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='Buscar produtos...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
            />
          </div>

          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500'
          >
            <option value='all'>Todas Categorias</option>
            <option value='pacotes'>Pacotes</option>
            <option value='kits'>Kits</option>
          </select>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className='bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Produto
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Categoria
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Preço
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Avaliação
                </th>
                <th className='px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredProducts.map(product => (
                <tr
                  key={product._id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className='w-16 h-16 object-cover rounded-lg'
                        />
                      ) : (
                        <div className='w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center'>
                          <ImageIcon className='w-6 h-6 text-gray-400' />
                        </div>
                      )}
                      <div>
                        <p className='font-medium text-gray-900'>
                          {product.name}
                        </p>
                        {product.type && (
                          <p className='text-sm text-gray-500'>
                            {product.type}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800'>
                      {product.category}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-lg font-bold text-amber-600'>
                      €{product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => toggleProductStatus(product)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
                        product.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-1'>
                      <Star className='w-4 h-4 text-yellow-400 fill-current' />
                      <span className='text-sm'>{product.rating}</span>
                      <span className='text-xs text-gray-500'>
                        ({product.reviews})
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <div className='flex justify-end gap-2'>
                      <button
                        onClick={() => handleEdit(product)}
                        className='text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors'
                        title='Editar produto'
                      >
                        <Edit className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className='text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors'
                        title='Excluir produto'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Adicionar/Editar Produto */}
      {showAddForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-xl font-bold'>
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button
                onClick={resetForm}
                disabled={isSubmitting}
                className='text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <ImageUpload
                currentImage={formData.image}
                onImageUpload={handleImageUpload}
                isUploading={isSubmitting}
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Nome do Produto *
                  </label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Preço (€) *
                  </label>
                  <input
                    type='number'
                    step='0.01'
                    min='0'
                    value={formData.price}
                    onChange={e =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className='w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                  disabled={isSubmitting}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Categoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={e =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                    disabled={isSubmitting}
                  >
                    <option value='pacotes'>Pacotes</option>
                    <option value='kits'>Kits</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Tipo
                  </label>
                  <input
                    type='text'
                    placeholder='Ex: Fritos, Congelados'
                    value={formData.type}
                    onChange={e =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Avaliação
                  </label>
                  <input
                    type='number'
                    step='0.1'
                    min='1'
                    max='5'
                    value={formData.rating}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        rating: parseFloat(e.target.value) || 4.5,
                      })
                    }
                    className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={formData.active}
                    onChange={e =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                    className='w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded'
                    disabled={isSubmitting}
                  />
                  <span className='text-sm font-medium text-gray-700'>
                    Produto ativo
                  </span>
                </label>
              </div>

              <div className='flex gap-3 pt-4 border-t'>
                <button
                  type='button'
                  onClick={resetForm}
                  className='flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2'
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      {editingProduct ? 'Atualizando...' : 'Criando...'}
                    </>
                  ) : editingProduct ? (
                    'Atualizar Produto'
                  ) : (
                    'Criar Produto'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Gestão de Pedidos Melhorada
const OrdersTab = ({ orders, setOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar status');
      }

      const updatedOrder = await response.json();
      setOrders(prev =>
        prev.map(order => (order._id === orderId ? updatedOrder : order))
      );
      toast.success('Status atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  const getStatusColor = status => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      preparing: 'bg-orange-100 text-orange-800 border-orange-300',
      ready: 'bg-purple-100 text-purple-800 border-purple-300',
      delivered: 'bg-green-100 text-green-800 border-green-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusLabel = status => {
    const labels = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      preparing: 'Preparando',
      ready: 'Pronto',
      delivered: 'Entregue',
    };
    return labels[status] || status;
  };

  // Filtrar e ordenar pedidos
  const filteredOrders = orders
    .filter(order => {
      const matchesStatus =
        filterStatus === 'all' || order.status === filterStatus;
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm);
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'value') {
        return b.total - a.total;
      }
      return 0;
    });

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Gestão de Pedidos</h2>
          <p className='text-gray-600'>{orders.length} pedidos no total</p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className='flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50'
        >
          <RefreshCw className='w-4 h-4' />
          Atualizar
        </button>
      </div>

      {/* Filtros */}
      <div className='bg-white p-4 rounded-xl shadow-md'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='Buscar pedido, cliente, telefone...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
            />
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500'
          >
            <option value='all'>Todos Status</option>
            <option value='pending'>Pendentes</option>
            <option value='confirmed'>Confirmados</option>
            <option value='preparing'>Preparando</option>
            <option value='ready'>Prontos</option>
            <option value='delivered'>Entregues</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500'
          >
            <option value='recent'>Mais Recentes</option>
            <option value='value'>Maior Valor</option>
          </select>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className='bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Pedido
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Cliente
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Itens
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Total
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Data
                </th>
                <th className='px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredOrders.map(order => (
                <tr
                  key={order._id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4'>
                    <div>
                      <p className='font-semibold text-gray-900'>
                        #{order.orderNumber}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {order.paymentMethod === 'cash'
                          ? '💵 Dinheiro'
                          : order.paymentMethod === 'mbway'
                          ? '📱 MBWay'
                          : '🏧 Multibanco'}
                      </p>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div>
                      <p className='font-medium text-gray-900'>
                        {order.customerName}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {order.customerPhone}
                      </p>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-900'>
                      {order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}{' '}
                      produtos
                    </p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-lg font-bold text-amber-600'>
                      €{order.total.toFixed(2)}
                    </p>
                    {order.discount > 0 && (
                      <p className='text-xs text-green-600'>
                        -€{order.discount.toFixed(2)} desc.
                      </p>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    <select
                      value={order.status}
                      onChange={e =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        order.status
                      )} cursor-pointer focus:ring-2 focus:ring-amber-500`}
                    >
                      <option value='pending'>Pendente</option>
                      <option value='confirmed'>Confirmado</option>
                      <option value='preparing'>Preparando</option>
                      <option value='ready'>Pronto</option>
                      <option value='delivered'>Entregue</option>
                    </select>
                  </td>
                  <td className='px-6 py-4'>
                    <div>
                      <p className='text-sm text-gray-900'>
                        {new Date(order.createdAt).toLocaleDateString('pt-PT')}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {new Date(order.createdAt).toLocaleTimeString('pt-PT', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className='text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors'
                      title='Ver detalhes'
                    >
                      <Eye className='w-4 h-4' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes do Pedido */}
      {selectedOrder && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h3 className='text-xl font-bold'>
                  Pedido #{selectedOrder.orderNumber}
                </h3>
                <p className='text-sm text-gray-500'>
                  {new Date(selectedOrder.createdAt).toLocaleString('pt-PT')}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X className='w-5 h-5 text-gray-400' />
              </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              {/* Dados do Cliente */}
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <Users className='w-4 h-4' />
                  Dados do Cliente
                </h4>
                <div className='space-y-2 text-sm'>
                  <p>
                    <strong>Nome:</strong> {selectedOrder.customerName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder.customerEmail}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {selectedOrder.customerPhone}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {selectedOrder.address}
                  </p>
                </div>
              </div>

              {/* Informações de Entrega */}
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  Informações de Entrega
                </h4>
                <div className='space-y-2 text-sm'>
                  {selectedOrder.deliveryDate && (
                    <p>
                      <strong>Data:</strong>{' '}
                      {new Date(selectedOrder.deliveryDate).toLocaleDateString(
                        'pt-PT'
                      )}
                    </p>
                  )}
                  {selectedOrder.deliveryTime && (
                    <p>
                      <strong>Hora:</strong> {selectedOrder.deliveryTime}
                    </p>
                  )}
                  <p>
                    <strong>Pagamento:</strong>{' '}
                    {selectedOrder.paymentMethod === 'cash'
                      ? '💵 Dinheiro'
                      : selectedOrder.paymentMethod === 'mbway'
                      ? '📱 MBWay'
                      : '🏧 Multibanco'}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {getStatusLabel(selectedOrder.status)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Itens do Pedido */}
            <div className='bg-gray-50 p-4 rounded-lg mb-6'>
              <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                <ShoppingBag className='w-4 h-4' />
                Itens do Pedido
              </h4>
              <div className='space-y-2'>
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center py-2 border-b border-gray-200 last:border-0'
                  >
                    <div>
                      <span className='font-medium'>
                        {item.quantity}x {item.name}
                      </span>
                      {item.type && (
                        <span className='text-gray-500 text-sm ml-2'>
                          ({item.type})
                        </span>
                      )}
                    </div>
                    <span className='font-semibold'>
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totais */}
              <div className='mt-4 pt-4 border-t border-gray-300 space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Subtotal:</span>
                  <span>€{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className='flex justify-between text-sm text-green-600'>
                    <span>
                      Desconto{' '}
                      {selectedOrder.couponCode &&
                        `(${selectedOrder.couponCode})`}
                      :
                    </span>
                    <span>-€{selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className='flex justify-between text-lg font-bold pt-2 border-t'>
                  <span>Total:</span>
                  <span className='text-amber-600'>
                    €{selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Observações */}
            {selectedOrder.notes && (
              <div className='bg-amber-50 p-4 rounded-lg mb-6'>
                <h4 className='font-bold text-gray-900 mb-2'>Observações</h4>
                <p className='text-sm text-gray-700'>{selectedOrder.notes}</p>
              </div>
            )}

            {/* Ações */}
            <div className='flex gap-3'>
              <button
                onClick={() => setSelectedOrder(null)}
                className='flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const message = `Pedido #${
                    selectedOrder.orderNumber
                  }\nCliente: ${
                    selectedOrder.customerName
                  }\nTotal: €${selectedOrder.total.toFixed(2)}`;
                  window.open(
                    `https://wa.me/${selectedOrder.customerPhone.replace(
                      /\D/g,
                      ''
                    )}?text=${encodeURIComponent(message)}`,
                    '_blank'
                  );
                }}
                className='flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors'
              >
                Contactar Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente Principal do Dashboard
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    loadData();
  }, [router]);

  const loadData = async () => {
    setIsLoading(true);
    await Promise.all([fetchProducts(), fetchOrders()]);
    setIsLoading(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      toast.error('Erro ao carregar produtos');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Erro ao carregar pedidos');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      toast.error('Erro ao carregar pedidos');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const stats = {
    pendingOrders: orders.filter(o => o.status === 'pending').length,
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-12 h-12 text-amber-500 mx-auto mb-4 animate-spin' />
          <p className='text-gray-600'>Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Head>
        <title>Dashboard Admin - Salgados Premium</title>
      </Head>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        stats={stats}
      />

      <main className='max-w-7xl mx-auto px-4 py-8'>
        {activeTab === 'overview' && (
          <OverviewTab
            orders={orders}
            products={products}
            refreshData={loadData}
          />
        )}

        {activeTab === 'products' && (
          <ProductsTab products={products} setProducts={setProducts} />
        )}

        {activeTab === 'orders' && (
          <OrdersTab orders={orders} setOrders={setOrders} />
        )}
      </main>
    </div>
  );
}
