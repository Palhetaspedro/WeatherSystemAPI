# 🌤️ WeatherDash

Um **Weather Dashboard moderno** construído com React + Vite, com design dark glassmorphism, fundo dinâmico baseado no clima, geolocalização automática e previsão de 5 dias.

---

## ✨ Funcionalidades

- 🔍 **Busca por cidade** com tratamento de erros
- 📍 **Geolocalização automática** ao carregar a página
- 🌡️ **Clima atual**: temperatura, sensação térmica, descrição, ícone animado
- 📅 **Previsão de 5 dias** com ícones dinâmicos e informações detalhadas
- 💧 Umidade, velocidade do vento, pressão e visibilidade
- 🎨 **Background dinâmico** (sol, chuva, neve, noite, névoa, tempestade)
- ✨ **Partículas animadas** no canvas (estrelas, chuva, neve, nuvens)
- ⏳ **Loading state** com animação orbital
- ❌ **Tratamento de erro** com animação
- 📱 **100% responsivo** (mobile, tablet, desktop)

---

## 🚀 Como rodar

### 1. Clone ou baixe o projeto

```bash
git clone <seu-repo>
cd weather-dashboard
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure sua API Key

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
```

> Obtenha sua chave gratuita em: [openweathermap.org/api](https://openweathermap.org/api)
> O plano gratuito permite 1.000 chamadas/dia — mais do que suficiente.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse em: `http://localhost:5173`

### 5. Build para produção

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura do projeto

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx        # Campo de busca
│   │   ├── WeatherCard.jsx      # Card do clima atual
│   │   ├── ForecastCard.jsx     # Cards da previsão
│   │   ├── LoadingScreen.jsx    # Tela de carregamento
│   │   ├── ErrorMessage.jsx     # Mensagem de erro
│   │   └── ParticleBackground.jsx  # Canvas de partículas
│   ├── hooks/
│   │   ├── useWeather.js        # Hook principal de dados
│   │   └── useBackground.js     # Hook de tema dinâmico
│   ├── services/
│   │   └── api.js               # Integração OpenWeatherMap
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env.example
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎨 Design

- **Tema**: Dark glassmorphism
- **Fontes**: Outfit (corpo) + Space Mono (números/código)
- **Backgrounds dinâmicos**: 9 temas diferentes baseados nas condições climáticas
- **Animações**: Ícone flutuante, partículas no canvas, transições suaves, hover effects

---

## 🛠️ Tecnologias

| Tech | Uso |
|------|-----|
| React 18 | UI e gerenciamento de estado |
| Vite 5 | Build tool ultra-rápido |
| CSS Modules (App.css) | Estilos sem dependências externas |
| OpenWeatherMap API | Dados meteorológicos |
| Canvas API | Partículas animadas |
| Geolocation API | Localização do usuário |

---

## 📌 Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `VITE_WEATHERAPI_API_KEY` | Chave da API do WEATHERAPI |

---

## 📄 Licença

Direitos autorais.Exclusivamente feito e configurado por @Palhetaspedro
