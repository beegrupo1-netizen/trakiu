# TRAKIU — Landing Page

Landing page responsiva inspirada na apresentação da app Trakiu — gestão simples de equipas e picagem de ponto por geolocalização.

## 🎯 Características

- ✨ Design moderno, tema escuro com azul claro
- 📱 Mobile-first e totalmente responsivo
- ⚡ Seções: Hero, Solução, Features, Mockups, Contato
- 🖼️ Lightbox para ampliar imagens
- 🎨 Animações suaves e transições elegantes
- ♿ HTML semântico e acessível

## 📂 Estrutura

```
.
├── index.html        # Página principal
├── styles.css        # Estilos (tema Trakiu)
├── script.js         # Interatividade
├── assets/           # Imagens da apresentação
│   ├── slide1.png    # Slide 1
│   ├── slide2.png    # Slide 2
│   └── slide3.png    # Slide 3
└── README.md         # Este arquivo
```

## 🚀 Como usar

### 1. Adicionar as imagens da apresentação

Copie as capturas da apresentação para a pasta `assets/`:

```bash
# Exemplo no macOS:
cp "/Users/seu_usuario/Desktop/Captura*.png" /Users/pedrogarcez/trakiu/assets/
```

Renomeie-as conforme necessário:
- `slide1.png` — primeira captura
- `slide2.png` — segunda captura
- `slide3.png` — terceira captura

### 2. Abrir localmente

**Opção 1: Duplo-clique (mais simples)**
```bash
open /Users/pedrogarcez/trakiu/index.html
```

**Opção 2: Servidor local (recomendado)**
```bash
cd /Users/pedrogarcez/trakiu
python3 -m http.server 8000
# Abrir http://localhost:8000 no navegador
```

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `styles.css`:
```css
:root {
  --accent-blue: #5dade2;    /* Azul claro */
  --text-primary: #ffffff;    /* Texto principal */
  --bg-dark: #0a1929;         /* Fundo escuro */
}
```

### Textos
Edite as seções no `index.html`:
- **Hero**: Altere o título e subtítulo
- **Solução**: Customize as 3 features
- **Contato**: Atualize o email footer

## 📧 Integrar formulário real

Atualmente, o formulário é apenas local. Para enviar emails de verdade:

**Opção 1: Formspree (simples)**
1. Acesse [formspree.io](https://formspree.io)
2. Crie um novo formulário
3. Mude a action do formulário em `index.html`:
```html
<form action="https://formspree.io/f/SEU_ID" method="POST">
```

**Opção 2: Netlify Forms (recomendado se for fazer deploy)**
1. Deploy em [netlify.com](https://netlify.com)
2. Ative Netlify Forms nas settings

## 📱 Responsividade testada

- ✅ Desktop (1440px+)
- ✅ Tablet (900px–1440px)
- ✅ Mobile (360px–900px)

## 🚀 Deploy

### GitHub Pages
```bash
cd /Users/pedrogarcez/trakiu
git init
git add .
git commit -m "Initial commit: Trakiu landing page"
git branch -M main
git remote add origin https://github.com/seu_usuario/trakiu.git
git push -u origin main

# Ativar Pages nas settings do repositório
# Branch: main | Folder: / (root)
```

## 📄 Licença

Feito com ❤️ para Trakiu Technology © 2026
