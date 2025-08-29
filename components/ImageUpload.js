// COMPONENTE DE UPLOAD DE IMAGEM
// ==========================================
import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';

const ImageUpload = ({ currentImage, onImageUpload, isUploading = false }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = async file => {
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Arquivo muito grande. Máximo 5MB.');
      return;
    }

    // Mostrar preview imediatamente
    const reader = new FileReader();
    reader.onload = e => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload do arquivo
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onImageUpload(data.url); // URL da Cloudinary
      } else {
        throw new Error('Erro no upload');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem');
      setPreview(currentImage); // Voltar para imagem anterior
    }
  };

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload(null);
  };

  return (
    <div className='space-y-4'>
      <label className='block text-sm font-medium text-gray-700'>
        Imagem do Produto
      </label>

      {preview ? (
        // Preview da imagem
        <div className='relative'>
          <img
            src={preview}
            alt='Preview'
            className='w-full h-48 object-cover rounded-lg border'
          />
          <button
            type='button'
            onClick={removeImage}
            className='absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600'
            disabled={isUploading}
          >
            <X className='w-4 h-4' />
          </button>
          {isUploading && (
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg'>
              <Loader className='w-8 h-8 text-white animate-spin' />
            </div>
          )}
        </div>
      ) : (
        // Área de upload
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-amber-500 bg-amber-50'
              : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon className='w-12 h-12 text-gray-400 mx-auto mb-4' />
          <p className='text-gray-600 mb-2'>
            Arraste uma imagem aqui ou clique para selecionar
          </p>
          <p className='text-sm text-gray-500 mb-4'>PNG, JPG até 5MB</p>
          <input
            type='file'
            accept='image/*'
            onChange={e => handleFileSelect(e.target.files[0])}
            className='hidden'
            id='image-upload'
            disabled={isUploading}
          />
          <label
            htmlFor='image-upload'
            className='bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 cursor-pointer inline-flex items-center gap-2'
          >
            <Upload className='w-4 h-4' />
            {isUploading ? 'Enviando...' : 'Selecionar Imagem'}
          </label>
        </div>
      )}
    </div>
  );
};
