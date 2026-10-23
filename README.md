# Calculadora de Notas Acumuladas

Aplicación web orientada a la gestión, cálculo y seguimiento en tiempo real de notas acumuladas para cursos universitarios con esquemas de evaluación heterogéneos.

El sistema resuelve la complejidad de los cálculos académicos que combinan rubros promediados con peso general y evaluaciones ponderadas independientes, permitiendo a los estudiantes proyectar su rendimiento y verificar el cumplimiento de los criterios de aprobación vigesimal de 0 a 20 puntos.

---

## Demo en Producción

- **Aplicación Web:** [https://notas-app-liw.netlify.app/](https://notas-app-liw.netlify.app/)

---

## Stack Tecnológico

- **Núcleo:** React 19, JavaScript ES Modules, Vite.
- **Tipografía y Estilos:** Plus Jakarta Sans y arquitectura CSS modular con soporte para modo claro y modo oscuro.
- **Persistencia:** Almacenamiento reactivo en `localStorage` con serialización JSON y tolerancia a fallos.
- **Portabilidad:** Generación y lectura de copias de seguridad en formato JSON estructurado para transferencia inmediata entre dispositivos.

---

## Módulos y Funcionalidades

### 1. Motor de Cálculo Académico
- **Rubros con Promedio Compuesto:** Gestión de grupos como prácticas de laboratorio donde las notas se promedian internamente y aportan al curso según el peso global asignado.
- **Evaluaciones Ponderadas Independientes:** Configuración de exámenes o prácticas con pesos específicos por casilla, adaptándose a estructuras universitarias tradicionales.
- **Fracciones Irreducibles de Aporte:** Algoritmo que simplifica matemáticamente el peso efectivo de cada casilla frente al divisor del curso, mostrando valores enteros o fracciones simplificadas cuando no existe una división exacta.
- **Escala Vigesimal Unificada:** Conversión directa de los puntos acumulados hacia la escala de 0 a 20, permitiendo observar con exactitud el aporte neto de cada rubro a la calificación final.

### 2. Monitor Interactivo de Aprobación
- **Retroalimentación Visual Reactiva:** Transición dinámica de color en el tablero de resumen basada en el umbral de aprobación de 10.50 puntos.
- **Estados Académicos Claros:** Identificación precisa de cursos en progreso, cursos con aprobación asegurada antes de finalizar el ciclo y asignaturas completadas.
- **Seguimiento de Notas:** Indicador numérico de casillas calificadas frente al total de evaluaciones programadas en el sílabo.

### 3. Validación y Balance de Fórmulas
- **Detector de Desbalance:** Verificación en tiempo real que compara la suma de pesos de los tableros con el divisor total establecido.
- **Alertas Preventivas:** Notificación visual inmediata cuando existen pesos pendientes por asignar, evitando limitaciones artificiales en la calificación máxima alcanzable.
- **Configurador Flexible de Cursos:** Modal para creación y edición de materias con plantillas estándar y ajuste de parámetros a la medida.

### 4. Respaldo y Privacidad de Datos
- **Almacenamiento Local:** La información se guarda exclusivamente en el navegador del usuario sin requerir bases de datos remotas ni autenticación externa.
- **Exportación en un Clic:** Descarga de las materias y calificaciones en un archivo JSON estructurado con fecha de generación.
- **Restauración y Migración:** Importador con validación de esquema que permite recuperar o mover los datos a otro equipo al instante.

### 5. Interfaz y Experiencia de Usuario
- **Iconografía Vectorial Integrada:** Uso de iconos SVG propios sin dependencias externas pesadas ni emojis del sistema operativo.
- **Modo Claro y Modo Oscuro:** Paleta neutra de alto contraste inspirada en interfaces modernas, con persistencia automática de la preferencia seleccionada.
- **Limpieza Inmediata de Notas:** Mecanismo de vaciado rápido por tablero para agilizar simulaciones de rendimiento académico.

---

## Estructura del Proyecto

```text
notas-app/
├── public/
│   ├── _redirects          # Reglas de redirección SPA para despliegue en Netlify
│   ├── favicon.svg         # Icono principal de la aplicación
│   └── icons.svg
├── src/
│   ├── assets/             # Recursos estáticos
│   ├── App.css
│   ├── App.jsx             # Componente principal, lógica de cálculo y vistas
│   ├── index.css           # Estilos globales y configuración tipográfica
│   └── main.jsx            # Punto de entrada de la aplicación React
├── .gitignore              # Exclusiones de dependencias y configuraciones locales
├── eslint.config.js        # Configuración de ESLint
├── index.html              # Plantilla HTML base
├── package.json            # Dependencias y scripts del proyecto
├── README.md               # Documentación del proyecto
└── vite.config.js          # Configuración de compilación con Vite
```

---

## Instalación y Ejecución Local

### Prerrequisitos
- Node.js 18.x o superior
- npm

### 1. Clonar el repositorio
```bash
git clone https://github.com/liw404/notas-app.git
cd notas-app
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en entorno de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

### 4. Compilar para producción
```bash
npm run build
```
Los archivos optimizados para despliegue se generarán en la carpeta `dist`.

---

## Licencia

Proyecto distribuido bajo Licencia MIT con fines académicos.
