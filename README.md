# 🏠 Raquel Perez - Plataforma Imobiliária

<div align="center">
  <img src="client/public/rqfavicon.jpg" alt="Logo" width="120" height="120">
  
  <h3 align="center">Sistema Completo de Gestão Imobiliária</h3>
  
  <p align="center">
    Uma plataforma moderna para compra, venda e arrendamento de imóveis
    <br />
    <a href="https://raquelperez-five.vercel.app"><strong>Ver Demo »</strong></a>
    <br />
    <br />
    <a href="#funcionalidades">Funcionalidades</a>
    ·
    <a href="#tecnologias">Tecnologias</a>
    ·
    <a href="#instalação">Instalação</a>
  </p>
</div>

## 📋 Sobre o Projeto

Plataforma completa de gestão imobiliária desenvolvida para a consultora **Raquel Perez - Century 21**, oferecendo uma experiência moderna e intuitiva para clientes interessados em comprar, vender ou arrendar imóveis na região de Lisboa, Sintra, Almada e Mafra.

### 🎯 Principais Objetivos

- Facilitar a busca e visualização de imóveis
- Integração direta com WhatsApp para contato rápido
- Sistema completo de gestão de anúncios
- Interface responsiva e moderna
- Mapas interativos com localização precisa

## ✨ Funcionalidades

### 🏘️ Gestão de Imóveis

- **Listagem completa** de propriedades com filtros avançados
- **Busca por localização**, tipo, preço e características
- **Visualização detalhada** com galeria de imagens
- **Mapa interativo** com Leaflet/OpenStreetMap
- **Sistema de favoritos** para salvar imóveis

### 👤 Sistema de Usuários

- **Autenticação segura** com JWT
- **Perfil personalizado** com avatar
- **Gestão de anúncios** próprios
- **Histórico de imóveis** salvos
- **Painel administrativo** para gestão

### 💬 Comunicação

- **Integração WhatsApp** para contato direto
- **Sistema de mensagens** interno
- **Chat em tempo real** entre usuários
- **Notificações** de novas mensagens

### 📱 Design Responsivo

- **Mobile-first** approach
- **Progressive Web App** capabilities
- **Otimizado** para todas as telas
- **Performance** otimizada com lazy loading

## 🛠️ Tecnologias

### Frontend

```json
{
  "Framework": "React 18.2",
  "Build Tool": "Vite 5.1",
  "Roteamento": "React Router DOM 6.22",
  "Estilização": "Sass 1.71",
  "HTTP Client": "Axios 1.6",
  "Mapas": "Leaflet 1.9 + React Leaflet 4.2",
  "Estado Global": "Zustand 4.5",
  "Editor Rich Text": "React Quill 2.0",
  "Autenticação": "Context API + JWT",
  "UI Components": "Custom Components",
  "Outras": "DOMPurify, Timeago.js"
}
```

### Backend

```json
{
  "Runtime": "Node.js",
  "Framework": "Express 4.18",
  "ORM": "Prisma 5.11",
  "Database": "MongoDB",
  "Autenticação": "JWT + Bcrypt",
  "CORS": "Cors 2.8",
  "Validação": "Custom Middlewares",
  "Upload": "Cloudinary Integration"
}
```

### Infraestrutura

- **Hospedagem Frontend**: Vercel
- **Hospedagem Backend**: Vercel Serverless
- **Database**: MongoDB Atlas
- **CDN de Imagens**: Cloudinary
- **Domínio**: raquelperez-five.vercel.app

## 📂 Estrutura do Projeto

```
raquelperez-imoveis/
├── 📁 api/                    # Backend Node.js
│   ├── 📁 controllers/        # Lógica de negócio
│   ├── 📁 middleware/         # Validações e autenticação
│   ├── 📁 routes/             # Definição de rotas
│   ├── 📁 lib/                # Configuração Prisma
│   ├── 📁 prisma/             # Schema e migrações
│   ├── 📁 scripts/            # Scripts de DB (seed, test)
│   ├── app.js                 # Servidor Express
│   └── vercel.json            # Configuração Vercel
│
├── 📁 client/                 # Frontend React
│   ├── 📁 src/
│   │   ├── 📁 components/     # Componentes reutilizáveis
│   │   ├── 📁 routes/         # Páginas da aplicação
│   │   ├── 📁 context/        # Context API (Auth)
│   │   ├── 📁 lib/            # Utilitários e API client
│   │   ├── App.jsx            # Componente principal
│   │   └── main.jsx           # Entry point
│   ├── 📁 public/             # Assets estáticos
│   └── vite.config.js         # Configuração Vite
│
└── 📄 README.md
```

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ e npm/yarn
- MongoDB Atlas conta (ou MongoDB local)
- Cloudinary conta (para upload de imagens)

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/seu-usuario/raquelperez-imoveis.git
cd raquelperez-imoveis
```

### 2️⃣ Configuração do Backend

#### Instalar dependências:

```bash
cd api
npm install
```

#### Criar arquivo `.env` na pasta api:

```env
# Database
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/database"

# JWT
JWT_SECRET_KEY="sua_chave_secreta_aqui"

# Server
PORT=3000
NODE_ENV=development

# Client URL (para CORS)
CLIENT_URL="http://localhost:5173"
```

#### Configurar Prisma e Database:

```bash
# Gerar Prisma Client
npx prisma generate

# Criar/atualizar schema no banco
npx prisma db push

# (Opcional) Popular banco com dados de teste
npm run db:seed
```

#### Iniciar servidor de desenvolvimento:

```bash
npm run dev
```

### 3️⃣ Configuração do Frontend

#### Instalar dependências:

```bash
cd ../client
npm install
```

#### Criar arquivo `.env` na pasta client:

```env
VITE_API_URL=http://localhost:3000
```

#### Iniciar aplicação:

```bash
npm run dev
```

### 4️⃣ Acessar Aplicação

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Prisma Studio: `npx prisma studio`

## 📝 Scripts Disponíveis

### Backend (API)

```bash
npm run start        # Inicia servidor em produção
npm run dev          # Inicia servidor em desenvolvimento (nodemon)
npm run build        # Gera Prisma Client
npm run db:seed      # Popula banco com dados de teste
npm run db:reset     # Reset completo do banco
npm run db:push      # Sincroniza schema com banco
npm run db:studio    # Abre Prisma Studio
npm run test:db      # Testa conexão com banco
```

### Frontend (Client)

```bash
npm run dev          # Inicia em desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Executar linter
```

## 🔑 Funcionalidades por Tipo de Usuário

### Visitante (Não Autenticado)

- ✅ Visualizar listagem de imóveis
- ✅ Pesquisar e filtrar propriedades
- ✅ Ver detalhes de imóveis
- ✅ Visualizar mapas
- ✅ Contactar via WhatsApp
- ✅ Ver informações sobre a consultora

### Usuário Autenticado

- ✅ Todas as funcionalidades de visitante
- ✅ Criar e gerenciar anúncios
- ✅ Salvar imóveis favoritos
- ✅ Sistema de mensagens interno
- ✅ Editar perfil
- ✅ Histórico de atividades

### Administrador

- ✅ Todas as funcionalidades de usuário
- ✅ Gestão completa de anúncios
- ✅ Moderação de conteúdo
- ✅ Acesso a estatísticas

## 🗺️ Rotas da API

### Autenticação (`/api/auth`)

- `POST /register` - Criar nova conta
- `POST /login` - Fazer login
- `POST /logout` - Fazer logout

### Usuários (`/api/users`)

- `GET /` - Listar usuários
- `PUT /:id` - Atualizar usuário
- `DELETE /:id` - Deletar usuário
- `POST /save` - Salvar/remover favorito
- `GET /profilePosts` - Posts do perfil
- `GET /notification` - Número de notificações

### Imóveis (`/api/posts`)

- `GET /` - Listar imóveis (com filtros)
- `GET /:id` - Detalhes do imóvel
- `POST /` - Criar anúncio (autenticado)
- `PUT /:id` - Atualizar anúncio
- `DELETE /:id` - Deletar anúncio

### Mensagens (`/api/chats` e `/api/messages`)

- `GET /chats` - Listar conversas
- `GET /chats/:id` - Ver conversa
- `POST /chats` - Criar conversa
- `POST /messages/:chatId` - Enviar mensagem

## 🎨 Componentes Principais

### Core Components

- `Navbar` - Navegação responsiva com menu mobile
- `Footer` - Rodapé com informações e links
- `ScrollToTop` - Auto scroll ao mudar de página

### Property Components

- `Card` - Card de imóvel com carousel
- `List` - Lista de imóveis
- `Filter` - Filtros avançados de busca
- `SearchBar` - Barra de pesquisa rápida
- `Map` - Mapa interativo com pins
- `Slider` - Galeria de imagens fullscreen
- `ImageModal` - Modal de visualização de imagens

### Communication

- `WhatsAppChat` - Integração WhatsApp
- `WhatsAppFloating` - Botão flutuante

### Forms

- `UploadWidget` - Upload de imagens (Cloudinary)

## 🔒 Segurança

- ✅ Autenticação JWT com httpOnly cookies
- ✅ Senhas hasheadas com Bcrypt
- ✅ Validação de dados no backend
- ✅ Sanitização de inputs com DOMPurify
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ Variáveis de ambiente protegidas

## 🚢 Deploy

### Deploy no Vercel

#### Backend:

1. Conecte o repositório no Vercel
2. Configure as variáveis de ambiente
3. Set root directory: `api`
4. Deploy

#### Frontend:

1. Conecte o repositório no Vercel
2. Configure variável `VITE_API_URL`
3. Set root directory: `client`
4. Deploy

## 📱 Responsividade

O projeto utiliza um sistema robusto de breakpoints:

```scss
$breakpoints: (
  xs: 480px,
  // Mobile pequeno
  sm: 768px,
  // Mobile grande/Tablet
  md: 1024px,
  // Tablet/Laptop
  lg: 1366px,
  // Desktop
  xl: 1920px,
  // Desktop grande
  xxl: 2560px // Ultra wide,
);
```

## 🤝 Contribuindo

1. Faça Fork do projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: Nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença privada. Todos os direitos reservados.

## 👥 Equipe

- **Desenvolvimento**: [Orlando Pedrazzoli](https://orlandopedrazzoli.com)
- **Cliente**: Raquel Perez - Century 21

## 📞 Suporte

Para suporte, envie um email para raquelperez@century21.pt ou entre em contato via WhatsApp.

---

<div align="center">
  Desenvolvido com ❤️ por <a href="https://orlandopedrazzoli.com">ORLANDOPEDRAZZOLI.COM</a>
</div>
