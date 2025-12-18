# 🚛 BuscaFrete Landing Page

Landing page profissional para o aplicativo BuscaFrete, conectando caminhoneiros e contratantes de fretes na rota SP ⇄ PI.

## ✨ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Styling**: Tailwind CSS + Radix UI
- **Build**: Vite + esbuild
- **Package Manager**: pnpm

## 🚀 Hospedagem Gratuita - Guia Completo

Este projeto pode ser hospedado gratuitamente em várias plataformas. Aqui estão as opções recomendadas:

---

## 🔥 **RECOMENDADO: Vercel (Full-Stack)**

### ✅ Vantagens:
- Suporte completo para frontend + backend
- Deploy automático via Git
- Domínio gratuito (.vercel.app)
- CDN global
- Análise de performance integrada

### 📋 Passos para Deploy:

1. **Crie uma conta no Vercel:**
   - Acesse: [vercel.com](https://vercel.com)
   - Faça login com GitHub/GitLab/Bitbucket

2. **Importe seu projeto:**
   - Clique em "New Project"
   - Conecte seu repositório Git
   - O Vercel detectará automaticamente as configurações

3. **Configure o deploy:**
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `pnpm install`

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build (cerca de 2-3 minutos)
   - Seu site estará online em `https://seu-projeto.vercel.app`

---

## 🌐 **OPÇÃO 2: Netlify (Frontend Estático)**

### ✅ Vantagens:
- Deploy ultra-rápido
- Formulários gratuitos
- CDN global
- Deploy preview para cada PR

### 📋 Passos para Deploy:

1. **Crie uma conta no Netlify:**
   - Acesse: [netlify.com](https://netlify.com)
   - Faça login com GitHub/GitLab/Bitbucket

2. **Importe seu projeto:**
   - Clique em "Add new site" → "Import an existing project"
   - Conecte seu repositório

3. **Configure o build:**
   - **Base directory**: `./` (vazio)
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist/public`

4. **Deploy:**
   - Clique em "Deploy site"
   - Seu site estará online em `https://random-name.netlify.app`

---

## ⚙️ **OPÇÃO 3: Render (Full-Stack)**

### ✅ Vantagens:
- Suporte para Node.js + banco de dados gratuito
- Cron jobs gratuitos
- Auto-scaling
- Logs em tempo real

### 📋 Passos para Deploy:

1. **Crie uma conta no Render:**
   - Acesse: [render.com](https://render.com)
   - Faça login com GitHub/GitLab

2. **Crie um novo Web Service:**
   - Clique em "New" → "Web Service"
   - Conecte seu repositório

3. **Configure:**
   - **Runtime**: `Node`
   - **Build Command**: `pnpm build`
   - **Start Command**: `pnpm start`
   - **Plan**: Free

4. **Deploy:**
   - Clique em "Create Web Service"
   - Aguarde o deploy (cerca de 5-10 minutos)

---

## 🐙 **OPÇÃO 4: GitHub Pages (Frontend Apenas)**

### ✅ Vantagens:
- Totalmente gratuito
- Integrado com GitHub
- Ideal para projetos estáticos

### 📋 Passos para Deploy:

1. **Instale o GitHub CLI ou use a interface web**

2. **Configure o GitHub Pages:**
   ```bash
   # Instale o gh-pages
   pnpm add -D gh-pages

   # Adicione ao package.json:
   "scripts": {
     "deploy": "pnpm build && gh-pages -d dist/public"
   }
   ```

3. **Deploy:**
   ```bash
   pnpm deploy
   ```

4. **Ative no GitHub:**
   - Vá para Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Folder: `/ (root)`

---

## 🔧 **Scripts de Build**

```bash
# Desenvolvimento
pnpm dev          # Servidor local em http://localhost:3000

# Build para produção
pnpm build        # Gera arquivos otimizados em dist/

# Preview do build
pnpm preview      # Testa o build localmente

# Verificação de tipos
pnpm check        # TypeScript type checking

# Formatação
pnpm format       # Prettier formatting
```

## 📁 **Estrutura do Projeto**

```
BuscaFreteLandingPage/
├── client/              # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/       # Páginas da aplicação
│   │   └── lib/         # Utilitários
│   └── index.html       # Template HTML
├── server/              # Backend Express
├── shared/              # Código compartilhado
├── dist/                # Build de produção
├── vercel.json          # Configuração Vercel
├── netlify.toml         # Configuração Netlify
└── package.json         # Dependências e scripts
```

## 🎯 **Funcionalidades**

- ✅ **Design Responsivo**: Mobile-first com Tailwind CSS
- ✅ **Componentes Acessíveis**: Baseado em Radix UI
- ✅ **SEO Otimizado**: Meta tags e estrutura semântica
- ✅ **Performance**: Build otimizado com Vite
- ✅ **TypeScript**: Type safety em todo o projeto
- ✅ **Testes**: Vitest + Testing Library

## 📞 **Suporte**

Para dúvidas sobre deploy ou desenvolvimento:

- 📧 **Email**: seu-email@exemplo.com
- 💬 **GitHub Issues**: Abra uma issue no repositório
- 📖 **Documentação**: Este README

---

## 🚀 **Deploy Automático**

Todas as plataformas suportam **deploy automático** via Git:

1. **Push para a branch main/master**
2. **A plataforma detecta as mudanças**
3. **Build automático**
4. **Deploy para produção**

**URL de exemplo**: `https://buscafrete-landing.vercel.app`

---

**Desenvolvido com ❤️ para conectar caminhoneiros e contratantes de fretes**
