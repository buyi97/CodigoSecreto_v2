# Código Secreto - Codenames Online

Una plataforma interactiva para jugar Codenames (Código Secreto) en línea en tiempo real. Conecta con amigos y disfruta de este clásico juego de mesa digital con una interfaz moderna y responsiva.

## 🎮 Características

- ✅ **Juego en tiempo real** - Sincronización instantánea entre jugadores usando WebSockets
- ✅ **Salas privadas** - Crea salas protegidas con contraseña para jugar con amigos
- ✅ **Roles y equipos** - Asignación automática o manual de espías, capitanes y equipos
- ✅ **Tablero dinámico** - Generación procedural de palabras y configuración de juego
- ✅ **Historial de pistas** - Registro completo de todas las pistas dadas durante la partida
- ✅ **Interfaz responsiva** - Diseño adaptable para desktop, tablet y mobile
- ✅ **Temporizador integrado** - Control de tiempo para turnos y decisiones
- ✅ **Gestión de puntuación** - Seguimiento automático de puntos y victorias
- ✅ **Historial de salas** - Acceso rápido a salas recientes

## 🚀 Deployment en Producción

### Opción 1: Deployment en Render (Backend) + Vercel (Frontend)

Esta es la configuración recomendada y la más simple de mantener.

#### Backend en Render

1. **Crear cuenta en Render.com**
   - Ve a [render.com](https://render.com) y crea una cuenta
   - Conecta tu repositorio GitHub

2. **Crear un nuevo servicio**
   - Click en "New" → "Web Service"
   - Selecciona tu repositorio
   - Configuración:
     - **Name**: `codigo-secreto-backend`
     - **Environment**: `Node`
     - **Build Command**: `cd backend && npm install && npm run build`
     - **Start Command**: `cd backend && npm start`
     - **Root Directory**: `.` (leave default)

3. **Variables de entorno (Environment)**
   - Haz click en "Environment" dentro del servicio
   - Agrega las siguientes variables:
     ```
     NODE_ENV=production
     PORT=3000
     FRONTEND_URL=https://tu-dominio-vercel.vercel.app
     MAX_ROOMS=100
     ```

4. **Configuración de CORS**
   - Render te asignará un dominio: `https://codigo-secreto-backend.onrender.com`
   - Asegúrate que `FRONTEND_URL` sea la URL de tu frontend en Vercel

#### Frontend en Vercel

1. **Crear cuenta en Vercel.com**
   - Ve a [vercel.com](https://vercel.com) y crea una cuenta
   - Conecta tu repositorio GitHub

2. **Importar proyecto**
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio `CodigoSecreto_v2`

3. **Configurar build settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Configurar variables de entorno**
   - En la sección de "Environment Variables":
     ```
     VITE_BACKEND_URL=https://codigo-secreto-backend.onrender.com
     ```

5. **Deploy**
   - Vercel desplegará automáticamente en cada push a `main`

### Opción 2: Deployment en una única plataforma

#### Alternativa: Backend + Frontend en Render

Render permite servir tanto backend como frontend, pero requiere una configuración más avanzada. Se recomienda usar la Opción 1.

#### Alternativa: Backend + Frontend en Railway

1. **Backend en Railway**
   - Ve a [railway.app](https://railway.app)
   - Conecta tu repositorio
   - Variables de entorno iguales a Render

2. **Frontend en Railway**
   - Crea otro proyecto
   - Build Command: `cd frontend && npm install && npm run build`
   - Start Command: `npm run preview`

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v16 o superior
- **npm** o **yarn**
- **Git**

Verifica las versiones:
```bash
node --version  # v16.0.0 o superior
npm --version   # 7.0.0 o superior
```

## 🏗️ Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/CodigoSecreto_v2.git
cd CodigoSecreto_v2
```

### 2. Configurar el Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cat > .env << EOF
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
MAX_ROOMS=100
EOF

# Compilar TypeScript
npm run build

# Iniciar el servidor (desarrollo)
npm start
```

El backend estará disponible en `http://localhost:3000`

### 3. Configurar el Frontend

En otra terminal:

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### 4. Verificar la conexión

- Abre `http://localhost:5173` en tu navegador
- Deberías ver la pantalla de inicio
- Crea una sala de prueba para verificar que el backend está funcionando

## 📁 Estructura del Proyecto

```
CodigoSecreto_v2/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Punto de entrada del servidor
│   │   ├── config/
│   │   │   └── env.ts            # Configuración de variables de entorno
│   │   ├── models/
│   │   │   ├── GameConfig.ts      # Configuración del juego
│   │   │   ├── GameState.ts       # Estado actual del juego
│   │   │   ├── Player.ts          # Modelo del jugador
│   │   │   └── Room.ts            # Modelo de la sala
│   │   ├── services/
│   │   │   ├── GameService.ts     # Lógica del juego
│   │   │   └── RoomManager.ts     # Gestión de salas
│   │   ├── sockets/
│   │   │   └── socketHandlers.ts  # Manejadores de WebSocket
│   │   └── utils/
│   │       ├── boardGenerator.ts  # Generador de tablero
│   │       ├── constants.ts       # Constantes
│   │       ├── hashUtils.ts       # Utilidades de hash
│   │       ├── timerManager.ts    # Gestor de timer
│   │       ├── wordBank.ts        # Banco de palabras
│   │       └── wordTracker.ts     # Rastreador de palabras
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx               # Punto de entrada React
│   │   ├── App.tsx                # Componente principal
│   │   ├── theme.css              # Estilos globales
│   │   ├── components/
│   │   │   ├── config/            # Componentes de configuración
│   │   │   ├── endgame/           # Componentes de fin de juego
│   │   │   ├── game/              # Componentes del juego
│   │   │   ├── hud/               # Elementos de interfaz
│   │   │   ├── layout/            # Componentes de layout
│   │   │   ├── lobby/             # Componentes del lobby
│   │   │   └── ui/                # Componentes UI reutilizables
│   │   ├── hooks/
│   │   │   ├── useGameActions.ts  # Hook para acciones del juego
│   │   │   ├── useOrientation.ts  # Hook para orientación
│   │   │   ├── useSocket.ts       # Hook para WebSocket
│   │   │   └── useTheme.ts        # Hook para tema
│   │   ├── store/
│   │   │   ├── configStore.ts     # Store de configuración
│   │   │   ├── gameStore.ts       # Store del juego
│   │   │   ├── roomStore.ts       # Store de salas
│   │   │   └── uiStore.ts         # Store de UI
│   │   ├── types/
│   │   │   ├── config.types.ts    # Tipos de configuración
│   │   │   ├── game.types.ts      # Tipos del juego
│   │   │   ├── socket.types.ts    # Tipos de socket
│   │   │   └── ui.types.ts        # Tipos de UI
│   │   ├── utils/
│   │   │   ├── constants.ts       # Constantes
│   │   │   └── socketClient.ts    # Cliente de socket
│   │   └── assets/                # Recursos estáticos
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── README.md
```

## 🔧 Variables de Entorno

### Backend (.env)

```env
# Entorno
NODE_ENV=development         # development o production

# Puerto
PORT=3000                    # Puerto donde corre el servidor

# Frontend
FRONTEND_URL=http://localhost:5173  # URL del frontend (para CORS)

# Configuración del juego
MAX_ROOMS=100                # Máximo número de salas simultáneas
```

### Frontend (crear archivo .env.local en la carpeta frontend)

```env
VITE_BACKEND_URL=http://localhost:3000  # URL del backend
```

## 🎯 Scripts Disponibles

### Backend

```bash
npm run build    # Compilar TypeScript a JavaScript
npm start        # Iniciar servidor en producción
```

### Frontend

```bash
npm run dev      # Iniciar servidor de desarrollo con Vite
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción localmente
```

## 📡 Arquitectura

### Backend

- **Express.js** - Framework web
- **Socket.io** - Comunicación en tiempo real
- **TypeScript** - Tipado estático
- **CORS** - Compartir recursos entre orígenes

### Frontend

- **React 18** - Librería de UI
- **Vite** - Bundler y servidor de desarrollo
- **Zustand** - Gestión de estado
- **TailwindCSS** - Utilidades de CSS
- **Framer Motion** - Animaciones
- **Radix UI** - Componentes accesibles
- **Socket.io Client** - Cliente WebSocket

## 🎮 Cómo Jugar

1. **Crear o Unirse a una Sala**
   - Haz clic en "Crear Sala" o "Unirse a Sala"
   - Si creates una sala, comparte el código con tus amigos

2. **Asignar Roles**
   - Designa quiénes son los capitanes (dan pistas)
   - El resto serán agentes

3. **Configurar el Juego** (opcional)
   - Ajusta el número de rondas, timer, banco de palabras, etc.

4. **Comenzar la Partida**
   - El capitán del equipo rojo comienza dando pistas
   - Los agentes intentan adivinar las palabras correctas

5. **Ganar**
   - El primer equipo en revelar todas sus palabras gana

## 🐛 Solución de Problemas

### Error: "Cannot GET /"
- Asegúrate que el backend esté corriendo en el puerto correcto
- Verifica que `FRONTEND_URL` sea correcto en el backend

### Error de conexión a WebSocket
- Revisa la consola del navegador para más detalles
- Asegúrate que el backend y frontend estén en la misma red local

### Salas no persisten después de reiniciar
- Las salas se almacenan en memoria del servidor
- Para persistencia, considera agregar una base de datos (MongoDB, PostgreSQL)

## 📦 Build para Producción

### Backend
```bash
cd backend
npm run build
# La carpeta `dist/` contiene el código compilado
```

### Frontend
```bash
cd frontend
npm run build
# La carpeta `dist/` contiene los archivos optimizados
```

## 🚀 Deployment Paso a Paso Detallado

### A. Preparar el Repositorio

1. Asegúrate de que el repositorio esté limpio:
```bash
git status
```

2. Haz commit de cualquier cambio pendiente:
```bash
git add .
git commit -m "Preparar para producción"
git push origin main
```

### B. Deployment del Backend (Render)

**Paso 1: Crear el servicio**

1. Ve a [render.com/dashboard](https://render.com/dashboard)
2. Haz clic en "+ New"
3. Selecciona "Web Service"
4. Conecta tu repositorio GitHub (primera vez requiere autenticación)
5. Selecciona `CodigoSecreto_v2`

**Paso 2: Configurar el servicio**

| Campo | Valor |
|-------|-------|
| **Name** | `codigo-secreto-backend` |
| **Environment** | Node |
| **Region** | Selecciona el más cercano a ti |
| **Branch** | main |
| **Build Command** | `cd backend && npm install && npm run build` |
| **Start Command** | `cd backend && npm start` |
| **Plan** | Free (o Starter según necesites) |

**Paso 3: Agregar variables de entorno**

1. Dentro del servicio, ve a "Environment"
2. Agrega estas variables:

```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://tu-dominio.vercel.app
MAX_ROOMS=100
```

**Paso 4: Deploy**

Haz clic en "Create Web Service". Render comenzará el build automáticamente.

- Url de tu backend: `https://codigo-secreto-backend.onrender.com`
- Guarda esta URL, la necesitarás para el frontend

### C. Deployment del Frontend (Vercel)

**Paso 1: Crear el proyecto**

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Haz clic en "Add New..." → "Project"
3. Importa tu repositorio (o conecta tu cuenta GitHub primero)

**Paso 2: Configurar el proyecto**

| Campo | Valor |
|-------|-------|
| **Project Name** | `codigo-secreto-frontend` |
| **Framework Preset** | Vite |
| **Root Directory** | `./frontend` |

**Paso 3: Configurar build**

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Paso 4: Agregar variables de entorno**

En "Environment Variables":

```
VITE_BACKEND_URL=https://codigo-secreto-backend.onrender.com
```

**Paso 5: Deploy**

1. Haz clic en "Deploy"
2. Espera a que termine el build
3. Vercel te dará una URL: `https://codigo-secreto.vercel.app`

**Paso 6: Actualizar backend con URL de frontend**

Ahora que tienes la URL del frontend, actualiza la variable en Render:

1. Ve al dashboard de Render
2. Selecciona tu servicio
3. Ve a "Environment"
4. Edita `FRONTEND_URL` con tu URL de Vercel: `https://codigo-secreto.vercel.app`
5. Guarda y el servicio se redesplegará automáticamente

### D. Verificar el Deployment

1. Ve a tu URL de Vercel
2. Intenta crear una sala
3. Verifica que los WebSockets estén conectando (abre DevTools → Console)
4. Prueba la funcionalidad completa

## 📊 Monitoreo

### Render
- Dashboard → Selecciona tu servicio → "Logs"
- Verifica logs de error y rendimiento

### Vercel
- Dashboard → Selecciona tu proyecto → "Deployments"
- Haz clic en un deployment para ver detalles
- "Analytics" para monitoreo de performance

## 🔄 Updates y Mantenimiento

### Desplegar cambios
```bash
# Backend
git add .
git commit -m "Update backend"
git push origin main
# Render se redesplegará automáticamente

# Frontend
git add .
git commit -m "Update frontend"
git push origin main
# Vercel se redesplegará automáticamente
```

### Escalar a producción real

Para manejar más usuarios simultáneos:

1. **Upgrade en Render**
   - Cambia de "Free" a plan pagado
   - Considera usar "Build Cache" para builds más rápidos

2. **Upgrade en Vercel**
   - Vercel es serverless, escala automáticamente
   - Plan Free es suficiente para tráfico moderado

3. **Agregar base de datos** (opcional)
   - Backend usa memoria por defecto
   - Para persistencia, agrega MongoDB Atlas o PostgreSQL

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/miFeature`)
3. Commits con mensajes claros
4. Push a la rama (`git push origin feature/miFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 📞 Soporte

- Abre un Issue en GitHub para reportar bugs
- Revisa Issues existentes antes de crear uno nuevo
- Proporciona pasos para reproducir el problema

---

**¡Disfruta jugando Código Secreto!** 🎮

