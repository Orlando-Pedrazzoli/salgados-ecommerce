// pages/admin/dashboard.js - VERSÃO CORRIGIDA
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
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  Loader,
} from 'lucide-react';

// Importar o componente ImageUpload
import ImageUpload from '../../components/ImageUpload';

// Componente de Notificação
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className='w-5 h-5' />
      ) : (
        <AlertCircle className='w-5 h-5' />
      )}
      <span>{message}</span>
      <button onClick={onClose}>
        <X className='w-4 h-4' />
      </button>
    </div>
  );
};

// Componente do Header do Admin
const AdminHeader = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <header className='bg-white shadow-md border-b'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-8'>
            <div className='flex items-center'>
              <Package className='w-8 h-8 text-amber-500 mr-2' />
              <h1 className='text-xl font-bold'>Admin Dashboard</h1>
            </div>

            <nav className='flex space-x-4'>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className='w-4 h-4 inline mr-2' />
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'products'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Package className='w-4 h-4 inline mr-2' />
                Produtos
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className='w-4 h-4 inline mr-2' />
                Pedidos
              </button>
            </nav>
          </div>

          <button
            onClick={onLogout}
            className='flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg'
          >
            <LogOut className='w-4 h-4' />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

// Componente de Visão Geral
const OverviewTab = ({ orders }) => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const pendingOrders = orders.filter(
    order => order.status === 'pending'
  ).length;

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Visão Geral</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Receita Total</p>
              <p className='text-2xl font-bold text-green-600'>
                €{totalRevenue.toFixed(2)}
              </p>
            </div>
            <DollarSign className='w-8 h-8 text-green-500' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Total de Pedidos
              </p>
              <p className='text-2xl font-bold text-blue-600'>{totalOrders}</p>
            </div>
            <ShoppingBag className='w-8 h-8 text-blue-500' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Ticket Médio</p>
              <p className='text-2xl font-bold text-purple-600'>
                €{avgOrderValue.toFixed(2)}
              </p>
            </div>
            <TrendingUp className='w-8 h-8 text-purple-500' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Pedidos Pendentes
              </p>
              <p className='text-2xl font-bold text-orange-600'>
                {pendingOrders}
              </p>
            </div>
            <AlertCircle className='w-8 h-8 text-orange-500' />
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-lg font-bold mb-4'>Pedidos Recentes</h3>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b'>
                <th className='pb-2'>Pedido</th>
                <th className='pb-2'>Cliente</th>
                <th className='pb-2'>Total</th>
                <th className='pb-2'>Status</th>
                <th className='pb-2'>Data</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order._id} className='border-b'>
                  <td className='py-2 font-medium'>{order.orderNumber}</td>
                  <td className='py-2'>{order.customerName}</td>
                  <td className='py-2'>€{order.total.toFixed(2)}</td>
                  <td className='py-2'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className='py-2'>
                    {new Date(order.createdAt).toLocaleDateString('pt-PT')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Componente de Gestão de Produtos
const ProductsTab = ({ products, setProducts, setNotification }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'pacotes',
    type: '',
    rating: 4.5,
    reviews: 0,
    image: null,
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
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleImageUpload = imageUrl => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
    setNotification({
      message: 'Imagem carregada com sucesso!',
      type: 'success',
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      setNotification({
        message: 'Nome e preço são obrigatórios',
        type: 'error',
      });
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

      console.log('Enviando produto:', productData);

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
      console.log('Produto salvo:', product);

      if (editingProduct) {
        setProducts(prev =>
          prev.map(p => (p._id === product._id ? product : p))
        );
        setNotification({
          message: 'Produto atualizado com sucesso!',
          type: 'success',
        });
      } else {
        setProducts(prev => [...prev, product]);
        setNotification({
          message: 'Produto criado com sucesso!',
          type: 'success',
        });
      }

      resetForm();
    } catch (error) {
      console.error('Erro:', error);
      setNotification({
        message: 'Erro ao salvar produto: ' + error.message,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = product => {
    console.log('Editando produto:', product);
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
    });
    setShowAddForm(true);
  };

  const handleDelete = async productId => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      console.log('Deletando produto:', productId);

      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao excluir produto');
      }

      setProducts(prev => prev.filter(p => p._id !== productId));
      setNotification({
        message: 'Produto excluído com sucesso!',
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao excluir:', error);
      setNotification({
        message: 'Erro ao excluir produto: ' + error.message,
        type: 'error',
      });
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Gestão de Produtos</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className='bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 flex items-center gap-2'
        >
          <Plus className='w-4 h-4' />
          Novo Produto
        </button>
      </div>

      {/* Lista de Produtos */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Imagem
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Nome
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Categoria
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Preço
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Avaliação
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {products.map(product => (
                <tr key={product._id}>
                  <td className='px-6 py-4'>
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
                  </td>
                  <td className='px-6 py-4'>
                    <div>
                      <div className='text-sm font-medium text-gray-900'>
                        {product.name}
                      </div>
                      {product.type && (
                        <div className='text-sm text-gray-500'>
                          {product.type}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-900 capitalize'>
                    {product.category}
                  </td>
                  <td className='px-6 py-4 text-sm font-bold text-amber-600'>
                    €{product.price.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    {product.rating}/5 ({product.reviews})
                  </td>
                  <td className='px-6 py-4 text-sm font-medium space-x-2'>
                    <button
                      onClick={() => handleEdit(product)}
                      className='text-blue-600 hover:text-blue-900 p-1'
                      title='Editar produto'
                    >
                      <Edit className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className='text-red-600 hover:text-red-900 p-1'
                      title='Excluir produto'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
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
          <div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-xl font-bold'>
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button
                onClick={resetForm}
                disabled={isSubmitting}
                className='text-gray-400 hover:text-gray-600'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Upload de Imagem */}
              <ImageUpload
                currentImage={formData.image}
                onImageUpload={handleImageUpload}
                isUploading={isSubmitting}
              />

              {/* Campos do formulário */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input
                  type='text'
                  placeholder='Nome do produto *'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500'
                  required
                  disabled={isSubmitting}
                />

                <input
                  type='number'
                  step='0.01'
                  min='0'
                  placeholder='Preço *'
                  value={formData.price}
                  onChange={e =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500'
                  required
                  disabled={isSubmitting}
                />
              </div>

              <textarea
                placeholder='Descrição'
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className='w-full p-3 border rounded-lg h-20 focus:ring-2 focus:ring-amber-500'
                disabled={isSubmitting}
              />

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <select
                  value={formData.category}
                  onChange={e =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500'
                  disabled={isSubmitting}
                >
                  <option value='pacotes'>Pacotes</option>
                  <option value='kits'>Kits</option>
                </select>

                <input
                  type='text'
                  placeholder='Tipo (Fritos, Congelados)'
                  value={formData.type}
                  onChange={e =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500'
                  disabled={isSubmitting}
                />

                <input
                  type='number'
                  step='0.1'
                  min='1'
                  max='5'
                  placeholder='Avaliação (1-5)'
                  value={formData.rating}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      rating: parseFloat(e.target.value) || 4.5,
                    })
                  }
                  className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500'
                  disabled={isSubmitting}
                />
              </div>

              <input
                type='number'
                min='0'
                placeholder='Número de avaliações'
                value={formData.reviews}
                onChange={e =>
                  setFormData({
                    ...formData,
                    reviews: parseInt(e.target.value) || 0,
                  })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500'
                disabled={isSubmitting}
              />

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
                  className='flex-1 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors'
                >
                  {isSubmitting ? (
                    <>
                      <Loader className='w-4 h-4 animate-spin' />
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

// Componente de Gestão de Pedidos
const OrdersTab = ({ orders, setOrders, setNotification }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

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
      setNotification({ message: 'Status atualizado!', type: 'success' });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      setNotification({
        message: 'Erro ao atualizar status: ' + error.message,
        type: 'error',
      });
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = status => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'confirmed':
        return 'Confirmado';
      case 'preparing':
        return 'Preparando';
      case 'ready':
        return 'Pronto';
      case 'delivered':
        return 'Entregue';
      default:
        return status;
    }
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Gestão de Pedidos</h2>

      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Pedido
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Cliente
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Total
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Data
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {orders.map(order => (
                <tr key={order._id}>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {order.orderNumber}
                  </td>
                  <td className='px-6 py-4'>
                    <div>
                      <div className='text-sm font-medium text-gray-900'>
                        {order.customerName}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {order.customerPhone}
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-sm font-bold text-amber-600'>
                    €{order.total.toFixed(2)}
                  </td>
                  <td className='px-6 py-4'>
                    <select
                      value={order.status}
                      onChange={e =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <option value='pending'>Pendente</option>
                      <option value='confirmed'>Confirmado</option>
                      <option value='preparing'>Preparando</option>
                      <option value='ready'>Pronto</option>
                      <option value='delivered'>Entregue</option>
                    </select>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    {new Date(order.createdAt).toLocaleDateString('pt-PT')}
                  </td>
                  <td className='px-6 py-4 text-sm font-medium'>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className='text-blue-600 hover:text-blue-900 p-1'
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
          <div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-bold'>
                Pedido {selectedOrder.orderNumber}
              </h3>
              <button onClick={() => setSelectedOrder(null)}>
                <X className='w-6 h-6 text-gray-400 hover:text-gray-600' />
              </button>
            </div>

            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <h4 className='font-bold text-gray-900 mb-2'>
                    Dados do Cliente
                  </h4>
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
                  {selectedOrder.deliveryDate && (
                    <p>
                      <strong>Data entrega:</strong>{' '}
                      {selectedOrder.deliveryDate}
                    </p>
                  )}
                  {selectedOrder.deliveryTime && (
                    <p>
                      <strong>Hora entrega:</strong>{' '}
                      {selectedOrder.deliveryTime}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className='font-bold text-gray-900 mb-2'>
                    Informações do Pedido
                  </h4>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {getStatusLabel(selectedOrder.status)}
                    </span>
                  </p>
                  <p>
                    <strong>Pagamento:</strong>{' '}
                    {selectedOrder.paymentMethod === 'cash'
                      ? 'Dinheiro'
                      : selectedOrder.paymentMethod === 'mbway'
                      ? 'MBWay'
                      : 'Multibanco'}
                  </p>
                  <p>
                    <strong>Data:</strong>{' '}
                    {new Date(selectedOrder.createdAt).toLocaleString('pt-PT')}
                  </p>
                  {selectedOrder.couponCode && (
                    <p>
                      <strong>Cupom:</strong> {selectedOrder.couponCode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className='font-bold text-gray-900 mb-2'>
                  Itens do Pedido
                </h4>
                <div className='space-y-2'>
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className='flex justify-between items-center border-b pb-2'
                    >
                      <div>
                        <span className='font-medium'>
                          {item.quantity}x {item.name}
                        </span>
                        {item.type && (
                          <span className='text-gray-500'> ({item.type})</span>
                        )}
                      </div>
                      <span className='font-bold'>
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='border-t pt-4'>
                <div className='space-y-1'>
                  <div className='flex justify-between'>
                    <span>Subtotal:</span>
                    <span>€{selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className='flex justify-between text-green-600'>
                      <span>Desconto:</span>
                      <span>-€{selectedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className='flex justify-between text-lg font-bold border-t pt-2'>
                    <span>Total:</span>
                    <span className='text-amber-600'>
                      €{selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h4 className='font-bold text-gray-900 mb-2'>Observações</h4>
                  <p className='text-gray-700 bg-gray-50 p-3 rounded-lg'>
                    {selectedOrder.notes}
                  </p>
                </div>
              )}
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
  const [notification, setNotification] = useState(null);
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
      console.log('Produtos carregados:', data);
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setNotification({
        message: 'Erro ao carregar produtos',
        type: 'error',
      });
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Erro ao carregar pedidos');
      }
      const data = await response.json();
      console.log('Pedidos carregados:', data);
      setOrders(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      setNotification({
        message: 'Erro ao carregar pedidos',
        type: 'error',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <Package className='w-12 h-12 text-amber-500 mx-auto mb-4 animate-spin' />
          <p className='text-gray-600'>Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className='max-w-7xl mx-auto px-4 py-8'>
        {activeTab === 'overview' && <OverviewTab orders={orders} />}

        {activeTab === 'products' && (
          <ProductsTab
            products={products}
            setProducts={setProducts}
            setNotification={setNotification}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTab
            orders={orders}
            setOrders={setOrders}
            setNotification={setNotification}
          />
        )}
      </main>
    </div>
  );
}
