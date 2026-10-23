import { useState, useEffect, useRef } from "react";

// Iconos SVG limpios y profesionales estilo Lucide
const SunIcon = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const EditIcon = ({ size = 15, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const TrashIcon = ({ size = 15, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

const PlusIcon = ({ size = 15, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <line x1="12" x2="12" y1="5" y2="19" />
    <line x1="5" x2="19" y1="12" y2="12" />
  </svg>
);

const EraserIcon = ({ size = 13, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
    <path d="M22 21H7" />
    <path d="m5 11 9 9" />
  </svg>
);

const DownloadIcon = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const UploadIcon = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const CheckIcon = ({ size = 15, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = ({ size = 14, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

// Función matemática para simplificar fracciones irreduciblemente (ej: 10/10 -> 1, 2/6 -> 1/3, 2/4 -> 1/2)
function simplificarFraccion(numerador, denominador) {
  if (!denominador || denominador === 0) return "0";
  if (!numerador || numerador === 0) return "0";

  let num = Math.abs(numerador);
  let den = Math.abs(denominador);

  let multiplicador = 1;
  while ((!Number.isInteger(num * multiplicador) || !Number.isInteger(den * multiplicador)) && multiplicador <= 1000) {
    multiplicador *= 10;
  }
  num = Math.round(num * multiplicador);
  den = Math.round(den * multiplicador);

  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  const g = gcd(num, den);
  num = num / g;
  den = den / g;

  if (den === 1) {
    return `${num}`;
  }
  return `${num}/${den}`;
}

// Determina el peso efectivo real de cada casilla
function formatearPesoItem(grupo, item) {
  if (grupo.tipo === "promedio") {
    const pesoGrupo = parseFloat(grupo.peso) || 1;
    const cant = grupo.items?.length || 1;
    const fraccion = simplificarFraccion(pesoGrupo, cant);
    return `× ${fraccion}`;
  }
  return `× ${item.peso ?? 1}`;
}

const cursosPredeterminados = [
  {
    id: "programacion-2",
    nombre: "Programación 2",
    divisorTotal: 20,
    grupos: [
      {
        id: "pb",
        codigo: "Pb",
        nombre: "Prácticas de Laboratorio",
        tipo: "promedio",
        peso: 10,
        items: [
          { label: "Lab 1", nota: null },
          { label: "Lab 2", nota: null },
          { label: "Lab 3", nota: null },
          { label: "Lab 4", nota: null },
          { label: "Lab 5", nota: null },
          { label: "Lab 6", nota: null },
          { label: "Lab 7", nota: null },
          { label: "Lab 8", nota: null },
          { label: "Lab 9", nota: null },
          { label: "Lab 10", nota: null }
        ]
      },
      {
        id: "ex",
        codigo: "Ex",
        nombre: "Exámenes",
        tipo: "ponderado",
        items: [
          { label: "Examen Parcial", peso: 5, nota: null },
          { label: "Examen Final", peso: 5, nota: null }
        ]
      }
    ]
  },
  {
    id: "mape",
    nombre: "MAPE",
    divisorTotal: 100,
    grupos: [
      {
        id: "pa",
        codigo: "Pa",
        nombre: "Prácticas Calificadas",
        tipo: "ponderado",
        items: [
          { label: "Pa 1", peso: 1, nota: null },
          { label: "Pa 2", peso: 3, nota: null },
          { label: "Pa 3", peso: 3, nota: null },
          { label: "Pa 4", peso: 1, nota: null },
          { label: "Pa 5", peso: 3, nota: null },
          { label: "Pa 6", peso: 3, nota: null }
        ]
      },
      {
        id: "ta",
        codigo: "Ta",
        nombre: "Tareas Académicas",
        tipo: "ponderado",
        items: [
          { label: "Ta 1", peso: 12, nota: null },
          { label: "Ta 2", peso: 12, nota: null }
        ]
      },
      {
        id: "ex",
        codigo: "Ex",
        nombre: "Exámenes",
        tipo: "ponderado",
        items: [
          { label: "Ex 1", peso: 30, nota: null },
          { label: "Ex 2", peso: 32, nota: null }
        ]
      }
    ]
  }
];

const PLANTILLAS_EVALUACION = {
  Pa: { codigo: "Pa", nombre: "Prácticas Calificadas", tipo: "ponderado", pesosStr: "1, 1, 1, 1" },
  Pb: { codigo: "Pb", nombre: "Prácticas de Laboratorio", tipo: "promedio", peso: 2, cantidadNotas: 6 },
  Ta: { codigo: "Ta", nombre: "Tareas Académicas", tipo: "ponderado", pesosStr: "12, 12" },
  Ex: { codigo: "Ex", nombre: "Exámenes", tipo: "ponderado", pesosStr: "30, 32" }
};

export default function App() {
  const [cursos, setCursos] = useState(() => {
    try {
      const guardados = localStorage.getItem("mis_cursos_notas_v5");
      return guardados ? JSON.parse(guardados) : cursosPredeterminados;
    } catch (err) {
      console.error("Error al leer cursos de localStorage:", err);
      return cursosPredeterminados;
    }
  });

  const [cursoActivoId, setCursoActivoId] = useState(() => cursos[0]?.id || "");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("app_dark_mode") === "true";
  });

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cursoForm, setCursoForm] = useState({
    id: "",
    nombre: "",
    divisorTotal: 20,
    grupos: []
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("mis_cursos_notas_v5", JSON.stringify(cursos));
    } catch (err) {
      console.error("Error guardando cursos en localStorage:", err);
    }
  }, [cursos]);

  useEffect(() => {
    localStorage.setItem("app_dark_mode", darkMode);
    document.body.style.backgroundColor = darkMode ? "#131314" : "#f8fafc";
    document.body.style.color = darkMode ? "#e3e3e3" : "#1e293b";
  }, [darkMode]);

  const cursoActivo = cursos.find((c) => c.id === cursoActivoId) || cursos[0];

  // Paleta de colores neutros para interfaz moderna
  const theme = {
    bgCard: darkMode ? "#1e1f20" : "#ffffff",
    bgSubCard: darkMode ? "#282a2c" : "#f8fafc",
    borderCard: darkMode ? "#3c4043" : "#e2e8f0",
    textMain: darkMode ? "#f1f3f4" : "#0f172a",
    textMuted: darkMode ? "#9aa0a6" : "#64748b",
    inputBg: darkMode ? "#131314" : "#ffffff",
    inputBorder: darkMode ? "#5f6368" : "#cbd5e1",
    modalBg: darkMode ? "#1e1f20" : "#ffffff",
    bannerBg: darkMode ? "#0f2e1b" : "#ecfdf5",
    bannerBorder: darkMode ? "#1b5e20" : "#10b981",
    bannerTitle: darkMode ? "#a7f3d0" : "#065f46",
    bannerSub: darkMode ? "#6ee7b7" : "#047857"
  };

  // Función para exportar los cursos a un archivo JSON físico
  const handleExportarDatos = () => {
    try {
      const dataStr = JSON.stringify(cursos, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fecha = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `mis_cursos_notas_${fecha}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al exportar:", err);
      alert("Hubo un error al exportar tus datos.");
    }
  };

  // Función para importar un archivo JSON y restaurar datos
  const handleImportarArchivo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const contenido = JSON.parse(event.target?.result);
        if (!Array.isArray(contenido) || contenido.length === 0) {
          alert("El archivo seleccionado no contiene un listado válido de cursos.");
          return;
        }

        const esValido = contenido.every((c) => c && c.id && c.nombre && Array.isArray(c.grupos));
        if (!esValido) {
          alert("El formato del archivo no coincide con la estructura de cursos.");
          return;
        }

        const confirmar = window.confirm(
          `Se detectaron ${contenido.length} curso(s) en el archivo.\n¿Deseas cargarlos en la aplicación? Esto actualizará tu lista actual.`
        );
        if (!confirmar) return;

        setCursos(contenido);
        if (contenido[0]?.id) {
          setCursoActivoId(contenido[0].id);
        }
        localStorage.setItem("mis_cursos_notas_v5", JSON.stringify(contenido));
        alert("¡Cursos y notas importados exitosamente!");
      } catch (err) {
        console.error("Error al importar JSON:", err);
        alert("Error al leer el archivo JSON. Verifica que sea un archivo de respaldo válido.");
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };
    reader.readAsText(file);
  };

  const handleLimpiarNotasGrupo = (grupoId) => {
    setCursos((prev) =>
      prev.map((curso) => {
        if (curso.id !== cursoActivo.id) return curso;
        return {
          ...curso,
          grupos: curso.grupos.map((grp) => {
            if (grp.id !== grupoId) return grp;
            return {
              ...grp,
              items: grp.items.map((item) => ({ ...item, nota: null }))
            };
          })
        };
      })
    );
  };

  const handleNotaChange = (grupoId, itemIndex, valorTexto) => {
    let valorFinal = null;
    if (valorTexto.trim() !== "") {
      const num = parseFloat(valorTexto);
      if (isNaN(num)) return;
      valorFinal = Math.max(0, Math.min(20, num));
    }

    setCursos((prev) =>
      prev.map((curso) => {
        if (curso.id !== cursoActivo.id) return curso;
        return {
          ...curso,
          grupos: curso.grupos.map((grupo) => {
            if (grupo.id !== grupoId) return grupo;
            const nuevosItems = [...grupo.items];
            nuevosItems[itemIndex] = { ...nuevosItems[itemIndex], nota: valorFinal };
            return { ...grupo, items: nuevosItems };
          })
        };
      })
    );
  };

  // Cálculo de puntaje actual exacto acumulado
  const calcularPuntaje = () => {
    if (!cursoActivo) return { acumulado: "0.00" };
    let puntosActuales = 0;

    for (const grupo of cursoActivo.grupos) {
      const pesoGrupo = parseFloat(grupo.peso) || 1;
      const cantItems = grupo.items?.length || 1;

      if (grupo.tipo === "promedio") {
        const sumaActual = grupo.items.reduce((acc, it) => acc + (it.nota !== null ? it.nota : 0), 0);
        puntosActuales += (sumaActual / cantItems) * pesoGrupo;
      } else {
        for (const it of grupo.items) {
          const pesoItem = parseFloat(it.peso) || 1;
          const nActual = it.nota !== null ? it.nota : 0;
          puntosActuales += nActual * pesoItem;
        }
      }
    }

    const divisor = parseFloat(cursoActivo.divisorTotal) || 1;
    return {
      acumulado: (puntosActuales / divisor).toFixed(2)
    };
  };

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setCursoForm({
      id: "",
      nombre: "",
      divisorTotal: 20,
      grupos: [
        {
          tipoPlantilla: "Pa",
          codigo: "Pa",
          nombre: "Prácticas Calificadas",
          tipo: "ponderado",
          pesosStr: "1, 1, 1, 1",
          peso: 2,
          cantidadNotas: 4,
          itemsPrevios: []
        }
      ]
    });
    setModalAbierto(true);
  };

  const abrirModalEditar = () => {
    if (!cursoActivo) return;
    setModoEdicion(true);
    setCursoForm({
      id: cursoActivo.id,
      nombre: cursoActivo.nombre,
      divisorTotal: cursoActivo.divisorTotal,
      grupos: cursoActivo.grupos.map((grp) => ({
        id: grp.id,
        tipoPlantilla: "custom",
        codigo: grp.codigo,
        nombre: grp.nombre,
        tipo: grp.tipo,
        peso: grp.peso || 1,
        cantidadNotas: grp.items.length,
        pesosStr: grp.items.map((it) => it.peso).join(", "),
        itemsPrevios: grp.items
      }))
    });
    setModalAbierto(true);
  };

  const handleEliminarCurso = () => {
    if (!cursoActivo) return;
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el curso "${cursoActivo.nombre}"?`)) return;
    const actualizados = cursos.filter((c) => c.id !== cursoActivo.id);
    setCursos(actualizados);
    setCursoActivoId(actualizados[0]?.id || "");
  };

  const guardarCurso = (e) => {
    e.preventDefault();
    if (!cursoForm.nombre.trim()) return;

    const idCurso = modoEdicion ? cursoForm.id : cursoForm.nombre.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

    const gruposProcesados = cursoForm.grupos.map((grp, idx) => {
      if (grp.tipo === "promedio") {
        const cantidad = Math.max(1, parseInt(grp.cantidadNotas, 10) || 1);
        const items = Array.from({ length: cantidad }, (_, i) => ({
          label: `${grp.codigo || "Lab"} ${i + 1}`,
          nota: grp.itemsPrevios && grp.itemsPrevios[i] ? grp.itemsPrevios[i].nota : null
        }));

        return {
          id: grp.id || `grp-${idx}-${Date.now()}`,
          codigo: grp.codigo || `G${idx + 1}`,
          nombre: grp.nombre || `Grupo ${idx + 1}`,
          tipo: "promedio",
          peso: parseFloat(grp.peso) || 1,
          items
        };
      } else {
        const pesosArray = (grp.pesosStr || "")
          .split(",")
          .map((p) => parseFloat(p.trim()))
          .filter((p) => !isNaN(p) && p > 0);

        const items = (pesosArray.length > 0 ? pesosArray : [1]).map((peso, i) => ({
          label: `${grp.codigo || "Nota"} ${i + 1}`,
          peso: peso,
          nota: grp.itemsPrevios && grp.itemsPrevios[i] ? grp.itemsPrevios[i].nota : null
        }));

        return {
          id: grp.id || `grp-${idx}-${Date.now()}`,
          codigo: grp.codigo || `G${idx + 1}`,
          nombre: grp.nombre || `Grupo ${idx + 1}`,
          tipo: "ponderado",
          items
        };
      }
    });

    const nuevoCursoObjeto = {
      id: idCurso,
      nombre: cursoForm.nombre,
      divisorTotal: parseFloat(cursoForm.divisorTotal) || 20,
      grupos: gruposProcesados
    };

    if (modoEdicion) {
      setCursos((prev) => prev.map((c) => (c.id === idCurso ? nuevoCursoObjeto : c)));
    } else {
      setCursos((prev) => [...prev, nuevoCursoObjeto]);
      setCursoActivoId(idCurso);
    }

    setModalAbierto(false);
  };

  const { acumulado } = calcularPuntaje();

  // Verificación de suma de pesos y estadísticas de notas ingresadas
  const pesoTotalConfigurado = cursoActivo?.grupos.reduce((acc, grp) => {
    if (grp.tipo === "promedio") {
      return acc + (parseFloat(grp.peso) || 0);
    } else {
      return acc + grp.items.reduce((s, it) => s + (parseFloat(it.peso) || 0), 0);
    }
  }, 0) || 0;

  const divisorCurso = parseFloat(cursoActivo?.divisorTotal) || 1;
  const formulaBalanceada = Math.abs(pesoTotalConfigurado - divisorCurso) < 0.01;

  let totalEvaluaciones = 0;
  let evaluacionesRendidas = 0;
  if (cursoActivo) {
    for (const grp of cursoActivo.grupos) {
      for (const it of grp.items) {
        totalEvaluaciones++;
        if (it.nota !== null) {
          evaluacionesRendidas++;
        }
      }
    }
  }

  const todasCompletadas = totalEvaluaciones > 0 && evaluacionesRendidas === totalEvaluaciones;
  const esAprobado = parseFloat(acumulado) >= 10.5;

  let estadoTitulo;
  let estadoMensaje;

  if (todasCompletadas) {
    if (esAprobado) {
      estadoTitulo = "Curso Finalizado: Aprobado";
      estadoMensaje = `Completaste todas las notas (${evaluacionesRendidas}/${totalEvaluaciones}) exitosamente.`;
    } else {
      estadoTitulo = "Curso Finalizado: Desaprobado";
      estadoMensaje = `Completaste las notas pero no alcanzaste los 10.50 pts requeridos.`;
    }
  } else {
    if (esAprobado) {
      estadoTitulo = "Curso Aprobado";
      estadoMensaje = `Superaste los 10.50 mínimos con +${(parseFloat(acumulado) - 10.5).toFixed(2)} pts de ventaja.`;
    } else {
      estadoTitulo = "En progreso";
      estadoMensaje = `Faltan ${(10.5 - parseFloat(acumulado)).toFixed(2)} pts para alcanzar la nota mínima (10.50).`;
    }
  }

  // Colores interactivos de la tarjeta: Verde si esAprobado (>= 10.5), Rojo si aún no (< 10.5)
  const bannerColors = esAprobado
    ? {
        bg: darkMode ? "#0a2618" : "#ecfdf5",
        border: darkMode ? "#166534" : "#10b981",
        title: darkMode ? "#86efac" : "#047857",
        sub: darkMode ? "#4ade80" : "#059669",
        badgeBg: darkMode ? "rgba(74, 222, 128, 0.15)" : "#d1fae5",
        badgeText: darkMode ? "#4ade80" : "#065f46"
      }
    : {
        bg: darkMode ? "#2b1114" : "#fef2f2",
        border: darkMode ? "#991b1b" : "#f87171",
        title: darkMode ? "#fca5a5" : "#b91c1c",
        sub: darkMode ? "#f87171" : "#dc2626",
        badgeBg: darkMode ? "rgba(248, 113, 113, 0.15)" : "#fee2e2",
        badgeText: darkMode ? "#f87171" : "#991b1b"
      };

  // Estilo común para botones de icono minimalistas (36x36px)
  const iconBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    border: `1px solid ${theme.borderCard}`,
    backgroundColor: darkMode ? "#282a2c" : "#f1f5f9",
    color: theme.textMain,
    cursor: "pointer",
    transition: "background-color 0.15s ease, border-color 0.15s ease",
    padding: 0
  };

  // Cálculo en tiempo real para el modal de pesos
  const sumaPesosModal = cursoForm.grupos.reduce((acc, grp) => {
    if (grp.tipo === "promedio") {
      return acc + (parseFloat(grp.peso) || 0);
    } else {
      const pesosArr = (grp.pesosStr || "")
        .split(",")
        .map((p) => parseFloat(p.trim()))
        .filter((p) => !isNaN(p) && p > 0);
      return acc + pesosArr.reduce((s, p) => s + p, 0);
    }
  }, 0);
  const divisorModal = parseFloat(cursoForm.divisorTotal) || 0;

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", paddingBottom: "60px" }}>
      {/* Barra superior con título y controles minimalistas alineados */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "16px"
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "900",
              letterSpacing: "-0.6px",
              color: theme.textMain,
              margin: 0,
              lineHeight: 1.2
            }}
          >
            CALCULADORA DE NOTAS ACUMULADAS
          </h1>
          <p style={{ color: theme.textMuted, fontSize: "13px", margin: "4px 0 0 0" }}>
            Las evaluaciones pendientes se computan automáticamente como 0.
          </p>
        </div>

        {/* Toolbar de acciones minimalista de ancho fijo (evita saltos y wrapping) */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* Botón Exportar JSON */}
          <button
            onClick={handleExportarDatos}
            title="Exportar respaldo (archivo JSON)"
            aria-label="Exportar respaldo JSON"
            style={iconBtnStyle}
          >
            <DownloadIcon size={16} />
          </button>

          {/* Botón Importar JSON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Importar cursos desde respaldo (archivo JSON)"
            aria-label="Importar respaldo JSON"
            style={iconBtnStyle}
          >
            <UploadIcon size={16} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json,application/json"
            onChange={handleImportarArchivo}
            style={{ display: "none" }}
          />

          {/* Alternador de Modo Claro / Oscuro */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            aria-label={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            style={iconBtnStyle}
          >
            {darkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>
        </div>
      </div>

      {/* Controles de selección y acción del curso */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        {cursos.length > 0 ? (
          <>
            <select
              value={cursoActivo?.id}
              onChange={(e) => setCursoActivoId(e.target.value)}
              style={{
                flex: "1",
                minWidth: "180px",
                padding: "10px 14px",
                borderRadius: "6px",
                border: `1px solid ${theme.inputBorder}`,
                fontSize: "15px",
                backgroundColor: theme.bgCard,
                color: theme.textMain,
                fontWeight: "600"
              }}
            >
              {cursos.map((c) => (
                <option key={c.id} value={c.id} style={{ backgroundColor: theme.bgCard, color: theme.textMain }}>
                  {c.nombre}
                </option>
              ))}
            </select>

            <button
              onClick={abrirModalEditar}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: darkMode ? "#282a2c" : "#f1f5f9",
                color: theme.textMain,
                border: `1px solid ${theme.borderCard}`,
                borderRadius: "6px",
                padding: "10px 14px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              <EditIcon size={15} /> Editar Curso
            </button>

            <button
              onClick={handleEliminarCurso}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: darkMode ? "#3b1717" : "#fee2e2",
                color: darkMode ? "#fca5a5" : "#dc2626",
                border: `1px solid ${darkMode ? "#7f1d1d" : "#fca5a5"}`,
                borderRadius: "6px",
                padding: "10px 14px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              <TrashIcon size={15} /> Borrar Curso
            </button>
          </>
        ) : null}

        <button
          onClick={abrirModalCrear}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 18px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          <PlusIcon size={16} /> Añadir Curso
        </button>
      </div>

      {/* Alerta si la suma de pesos no coincide con el divisor */}
      {cursos.length > 0 && !formulaBalanceada && (
        <div
          style={{
            backgroundColor: darkMode ? "#3b2308" : "#fffbeb",
            border: `1px solid ${darkMode ? "#854d0e" : "#fcd34d"}`,
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "20px",
            fontSize: "13px",
            color: darkMode ? "#fef08a" : "#92400e",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px"
          }}
        >
          <div>
            <strong>⚠️ Desbalance en la fórmula:</strong> Los pesos de tus tableros suman{" "}
            <strong>{pesoTotalConfigurado}</strong>, pero el divisor del curso es <strong>{divisorCurso}</strong>.
            {pesoTotalConfigurado < divisorCurso && (
              <span>
                {" "}Falta asignar <strong>{(divisorCurso - pesoTotalConfigurado).toFixed(1)}</strong> de peso (por eso la nota máxima posible queda por debajo de 20).
              </span>
            )}
          </div>
          <button
            onClick={abrirModalEditar}
            style={{
              backgroundColor: darkMode ? "#854d0e" : "#fef3c7",
              color: darkMode ? "#ffffff" : "#78350f",
              border: `1px solid ${darkMode ? "#a16207" : "#f59e0b"}`,
              borderRadius: "5px",
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            Corregir en Editar Curso
          </button>
        </div>
      )}

      {cursos.length > 0 && (
        <>
          {/* Tarjeta de Resumen interactiva (Verde si >= 10.5, Rojo si < 10.5) */}
          <div
            style={{
              background: bannerColors.bg,
              border: `1.5px solid ${bannerColors.border}`,
              borderRadius: "12px",
              padding: "18px 22px",
              marginBottom: "28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              transition: "background 0.25s ease, border-color 0.25s ease"
            }}
          >
            <div>
              <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: bannerColors.sub, letterSpacing: "0.5px" }}>
                Nota Acumulada Actual
              </span>
              <div style={{ fontSize: "38px", fontWeight: "900", color: bannerColors.title, lineHeight: 1.1, margin: "2px 0" }}>
                {acumulado} <span style={{ fontSize: "18px", fontWeight: "500", opacity: 0.85 }}>/ 20</span>
              </div>
              <div style={{ fontSize: "12px", color: bannerColors.sub, fontWeight: "600", marginTop: "2px" }}>
                Calificación: 0 a 20
              </div>
            </div>

            <div style={{ textAlign: "right", fontSize: "13px", color: bannerColors.sub, display: "flex", flexDirection: "column", gap: "6px" }}>
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: bannerColors.badgeBg,
                    color: bannerColors.badgeText,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.2px"
                  }}
                >
                  {esAprobado ? <CheckIcon size={13} /> : <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: bannerColors.badgeText }} />}
                  {estadoTitulo}
                </span>
              </div>

              <div style={{ fontSize: "12px", opacity: 0.95, color: bannerColors.title, fontWeight: "600" }}>
                {estadoMensaje}
              </div>

              <div style={{ fontSize: "11px", opacity: 0.85, color: bannerColors.sub }}>
                Progreso: <strong>{evaluacionesRendidas}</strong> de <strong>{totalEvaluaciones}</strong> casillas completadas
              </div>
            </div>
          </div>

          {/* Listado de Tableros / Grupos de evaluación */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {cursoActivo?.grupos.map((grupo) => {
              const esPromedio = grupo.tipo === "promedio";

              let promGrupo;
              let aporteNotaFinal;
              let pesoTotalGrupo;

              if (esPromedio) {
                pesoTotalGrupo = parseFloat(grupo.peso) || 1;
                const sumaNotas = grupo.items.reduce((acc, it) => acc + (it.nota !== null ? it.nota : 0), 0);
                promGrupo = sumaNotas / (grupo.items.length || 1);
                const puntosGrupo = promGrupo * pesoTotalGrupo;
                aporteNotaFinal = puntosGrupo / divisorCurso;
              } else {
                pesoTotalGrupo = grupo.items.reduce((acc, it) => acc + (parseFloat(it.peso) || 0), 0);
                const sumaPonderada = grupo.items.reduce(
                  (acc, it) => acc + (it.nota !== null ? it.nota * (parseFloat(it.peso) || 1) : 0),
                  0
                );
                promGrupo = pesoTotalGrupo > 0 ? sumaPonderada / pesoTotalGrupo : 0;
                aporteNotaFinal = sumaPonderada / divisorCurso;
              }

              const porcentajeCurso = Math.round((pesoTotalGrupo / divisorCurso) * 100);

              return (
                <div
                  key={grupo.id}
                  style={{
                    background: theme.bgCard,
                    border: `1px solid ${theme.borderCard}`,
                    borderRadius: "10px",
                    padding: "16px 20px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "14px",
                      borderBottom: `1px solid ${theme.borderCard}`,
                      paddingBottom: "10px",
                      flexWrap: "wrap",
                      gap: "8px"
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "16px", color: theme.textMain }}>{grupo.nombre}</strong>{" "}
                      <span style={{ color: theme.textMuted, fontSize: "14px" }}>({grupo.codigo})</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      {/* Promedio del grupo y su aporte con indicación de peso de X */}
                      <div style={{ fontSize: "13px", color: theme.textMuted, display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span>
                          Promedio: <strong style={{ color: theme.textMain }}>{promGrupo.toFixed(2)}</strong>
                        </span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <span>
                          Aporte al curso: <strong style={{ color: darkMode ? "#4ade80" : "#16a34a" }}>+{aporteNotaFinal.toFixed(2)} pts</strong>
                          <span style={{ fontSize: "11px", marginLeft: "4px", opacity: 0.85 }}>
                            (peso {pesoTotalGrupo} de {divisorCurso} • {porcentajeCurso}%)
                          </span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLimpiarNotasGrupo(grupo.id)}
                        title="Limpiar notas de este tablero"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          backgroundColor: darkMode ? "#282a2c" : "#f1f5f9",
                          color: theme.textMain,
                          border: `1px solid ${theme.borderCard}`,
                          borderRadius: "5px",
                          padding: "4px 9px",
                          fontSize: "12px",
                          fontWeight: "500",
                          cursor: "pointer"
                        }}
                      >
                        <EraserIcon size={13} /> Limpiar
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {grupo.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          background: theme.bgSubCard,
                          border: `1px solid ${theme.borderCard}`,
                          borderRadius: "6px",
                          padding: "8px 10px",
                          minWidth: "75px"
                        }}
                      >
                        <span style={{ fontSize: "12px", color: theme.textMuted, marginBottom: "4px", fontWeight: "600" }}>
                          {item.label}
                        </span>

                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="any"
                          placeholder="—"
                          value={item.nota === null ? "" : item.nota}
                          onChange={(e) => handleNotaChange(grupo.id, idx, e.target.value)}
                          style={{
                            width: "60px",
                            height: "36px",
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: "700",
                            border: `1px solid ${theme.inputBorder}`,
                            borderRadius: "4px",
                            outline: "none",
                            backgroundColor: theme.inputBg,
                            color: theme.textMain
                          }}
                        />

                        {/* Muestra el peso efectivo en fracción o entero exacto */}
                        <span
                          title={
                            esPromedio
                              ? `Aporte por casilla: peso del grupo (${pesoTotalGrupo}) ÷ ${grupo.items.length} notas`
                              : `Peso ponderado individual de esta evaluación`
                          }
                          style={{ fontSize: "11px", color: theme.textMuted, marginTop: "4px", fontWeight: "600" }}
                        >
                          {formatearPesoItem(grupo, item)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}


      {/* Modal Crear / Editar Curso */}
      {modalAbierto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: theme.modalBg,
              color: theme.textMain,
              border: `1px solid ${theme.borderCard}`,
              borderRadius: "10px",
              maxWidth: "640px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "24px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: theme.textMain }}>
                {modoEdicion ? "Editar Curso y Tableros" : "Añadir Nuevo Curso"}
              </h2>
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: theme.textMuted,
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <form onSubmit={guardarCurso}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px", color: theme.textMain }}>
                  Nombre del Curso:
                </label>
                <input
                  required
                  type="text"
                  placeholder="Ej: Redes de Computadoras"
                  value={cursoForm.nombre}
                  onChange={(e) => setCursoForm({ ...cursoForm, nombre: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "4px",
                    border: `1px solid ${theme.inputBorder}`,
                    backgroundColor: theme.inputBg,
                    color: theme.textMain
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px", color: theme.textMain }}>
                  Divisor Total de la Fórmula (Denominador):
                </label>
                <input
                  required
                  type="number"
                  step="any"
                  min="0.1"
                  placeholder="Ej: 6, 20 o 100"
                  value={cursoForm.divisorTotal}
                  onChange={(e) => setCursoForm({ ...cursoForm, divisorTotal: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "4px",
                    border: `1px solid ${theme.inputBorder}`,
                    backgroundColor: theme.inputBg,
                    color: theme.textMain
                  }}
                />
                <span style={{ fontSize: "11px", color: theme.textMuted, marginTop: "2px", display: "block" }}>
                  Número entre el cual se divide la suma total de puntos (ej: 6).
                </span>
              </div>

              {/* Live counter de balance de pesos vs divisor en el modal */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  backgroundColor: Math.abs(sumaPesosModal - divisorModal) < 0.01 ? (darkMode ? "#0f2e1b" : "#ecfdf5") : (darkMode ? "#3b2308" : "#fffbeb"),
                  border: `1px solid ${Math.abs(sumaPesosModal - divisorModal) < 0.01 ? (darkMode ? "#1b5e20" : "#10b981") : (darkMode ? "#854d0e" : "#fcd34d")}`,
                  borderRadius: "8px",
                  marginBottom: "16px",
                  fontSize: "13px"
                }}
              >
                <div>
                  <span>Suma de pesos de tableros: </span>
                  <strong>{sumaPesosModal}</strong> de <strong>{divisorModal || 1}</strong>
                </div>
                <div>
                  {Math.abs(sumaPesosModal - divisorModal) < 0.01 ? (
                    <strong style={{ color: darkMode ? "#4ade80" : "#16a34a" }}>✓ Fórmula balanceada (100%)</strong>
                  ) : (
                    <strong style={{ color: darkMode ? "#fef08a" : "#b45309" }}>
                      {sumaPesosModal < divisorModal
                        ? `⚠️ Falta asignar ${(divisorModal - sumaPesosModal).toFixed(1)} de peso`
                        : `⚠️ Los pesos exceden por ${(sumaPesosModal - divisorModal).toFixed(1)}`}
                    </strong>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: "15px", marginBottom: "10px", borderBottom: `1px solid ${theme.borderCard}`, paddingBottom: "4px", color: theme.textMain }}>
                Tableros / Grupos de Evaluación
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "16px" }}>
                {cursoForm.grupos.map((grp, i) => {
                  const pesoNum = parseFloat(grp.peso) || 1;
                  const cantNum = parseInt(grp.cantidadNotas, 10) || 1;
                  const fraccionPreview = simplificarFraccion(pesoNum, cantNum);

                  return (
                    <div
                      key={i}
                      style={{
                        background: theme.bgSubCard,
                        padding: "14px",
                        borderRadius: "8px",
                        border: `1px solid ${theme.borderCard}`
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "12px", fontWeight: "600", color: theme.textMuted }}>Plantilla:</span>
                          <select
                            value={grp.tipoPlantilla || "custom"}
                            onChange={(e) => {
                              const plant = PLANTILLAS_EVALUACION[e.target.value];
                              const arr = [...cursoForm.grupos];
                              if (plant) {
                                arr[i] = {
                                  ...arr[i],
                                  tipoPlantilla: e.target.value,
                                  codigo: plant.codigo,
                                  nombre: plant.nombre,
                                  tipo: plant.tipo,
                                  pesosStr: plant.pesosStr || arr[i].pesosStr,
                                  peso: plant.peso || arr[i].peso,
                                  cantidadNotas: plant.cantidadNotas || arr[i].cantidadNotas
                                };
                              } else {
                                arr[i] = { ...arr[i], tipoPlantilla: "custom" };
                              }
                              setCursoForm({ ...cursoForm, grupos: arr });
                            }}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              border: `1px solid ${theme.inputBorder}`,
                              backgroundColor: theme.inputBg,
                              color: theme.textMain
                            }}
                          >
                            <option value="Pa" style={{ backgroundColor: theme.inputBg, color: theme.textMain }}>Pa (Prácticas Calificadas)</option>
                            <option value="Pb" style={{ backgroundColor: theme.inputBg, color: theme.textMain }}>Pb (Prácticas de Laboratorio)</option>
                            <option value="Ta" style={{ backgroundColor: theme.inputBg, color: theme.textMain }}>Ta (Tareas Académicas)</option>
                            <option value="Ex" style={{ backgroundColor: theme.inputBg, color: theme.textMain }}>Ex (Exámenes)</option>
                            <option value="custom" style={{ backgroundColor: theme.inputBg, color: theme.textMain }}>Personalizado</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setCursoForm({
                              ...cursoForm,
                              grupos: cursoForm.grupos.filter((_, idx) => idx !== i)
                            });
                          }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "600"
                          }}
                        >
                          <TrashIcon size={14} /> Eliminar Tablero
                        </button>
                      </div>

                      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <input
                          placeholder="Nombre del tablero"
                          value={grp.nombre}
                          onChange={(e) => {
                            const arr = [...cursoForm.grupos];
                            arr[i].nombre = e.target.value;
                            setCursoForm({ ...cursoForm, grupos: arr });
                          }}
                          style={{
                            flex: 2,
                            padding: "6px",
                            borderRadius: "4px",
                            border: `1px solid ${theme.inputBorder}`,
                            backgroundColor: theme.inputBg,
                            color: theme.textMain
                          }}
                        />
                        <input
                          placeholder="Cód (Pa)"
                          value={grp.codigo}
                          onChange={(e) => {
                            const arr = [...cursoForm.grupos];
                            arr[i].codigo = e.target.value;
                            setCursoForm({ ...cursoForm, grupos: arr });
                          }}
                          style={{
                            width: "70px",
                            padding: "6px",
                            borderRadius: "4px",
                            border: `1px solid ${theme.inputBorder}`,
                            backgroundColor: theme.inputBg,
                            color: theme.textMain
                          }}
                        />
                        <select
                          value={grp.tipo}
                          onChange={(e) => {
                            const arr = [...cursoForm.grupos];
                            arr[i].tipo = e.target.value;
                            setCursoForm({ ...cursoForm, grupos: arr });
                          }}
                          style={{
                            padding: "6px",
                            borderRadius: "4px",
                            border: `1px solid ${theme.inputBorder}`,
                            backgroundColor: theme.inputBg,
                            color: theme.textMain
                          }}
                        >
                          <option value="ponderado" style={{ backgroundColor: theme.inputBg, color: theme.textMain }}>Ponderado</option>
                          <option value="promedio" style={{ backgroundColor: theme.inputBg, color: theme.textMain }}>Promedio</option>
                        </select>
                      </div>

                      {grp.tipo === "promedio" ? (
                        <div>
                          <div style={{ display: "flex", gap: "8px", fontSize: "13px", alignItems: "center", flexWrap: "wrap", marginBottom: "6px" }}>
                            <span>Peso total del grupo:</span>
                            <input
                              type="number"
                              step="any"
                              value={grp.peso ?? ""}
                              onChange={(e) => {
                                const arr = [...cursoForm.grupos];
                                arr[i].peso = e.target.value;
                                setCursoForm({ ...cursoForm, grupos: arr });
                              }}
                              style={{
                                width: "65px",
                                padding: "4px",
                                borderRadius: "4px",
                                border: `1px solid ${theme.inputBorder}`,
                                backgroundColor: theme.inputBg,
                                color: theme.textMain
                              }}
                            />
                            <span>N° casillas:</span>
                            <input
                              type="number"
                              min="1"
                              value={grp.cantidadNotas ?? ""}
                              onChange={(e) => {
                                const arr = [...cursoForm.grupos];
                                arr[i].cantidadNotas = e.target.value;
                                setCursoForm({ ...cursoForm, grupos: arr });
                              }}
                              style={{
                                width: "65px",
                                padding: "4px",
                                borderRadius: "4px",
                                border: `1px solid ${theme.inputBorder}`,
                                backgroundColor: theme.inputBg,
                                color: theme.textMain
                              }}
                            />
                          </div>
                          <div style={{ fontSize: "12px", color: theme.textMuted }}>
                            Cada casilla aportará al puntaje:{" "}
                            <strong style={{ color: theme.textMain }}>× {fraccionPreview}</strong>{" "}
                            (se promedian las {cantNum} notas y se multiplican por peso {pesoNum})
                          </div>
                        </div>
                      ) : (
                        <div style={{ fontSize: "12px", color: theme.textMuted }}>
                          <label style={{ display: "block", marginBottom: "2px" }}>
                            Pesos individuales por casilla (separados por coma):
                          </label>
                          <input
                            placeholder="Ej: 1, 1, 1, 1 ó 30, 32"
                            value={grp.pesosStr || ""}
                            onChange={(e) => {
                              const arr = [...cursoForm.grupos];
                              arr[i].pesosStr = e.target.value;
                              setCursoForm({ ...cursoForm, grupos: arr });
                            }}
                            style={{
                              width: "100%",
                              padding: "6px",
                              borderRadius: "4px",
                              border: `1px solid ${theme.inputBorder}`,
                              backgroundColor: theme.inputBg,
                              color: theme.textMain
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  setCursoForm({
                    ...cursoForm,
                    grupos: [
                      ...cursoForm.grupos,
                      {
                        tipoPlantilla: "custom",
                        codigo: `G${cursoForm.grupos.length + 1}`,
                        nombre: `Nuevo Tablero`,
                        tipo: "ponderado",
                        pesosStr: "1, 1",
                        peso: 1,
                        cantidadNotas: 2,
                        itemsPrevios: []
                      }
                    ]
                  });
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  padding: "8px",
                  background: darkMode ? "#282a2c" : "#f1f5f9",
                  border: `1px dashed ${theme.borderCard}`,
                  color: theme.textMain,
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginBottom: "16px",
                  fontWeight: "600"
                }}
              >
                <PlusIcon size={15} /> Añadir otro tablero
              </button>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    border: `1px solid ${theme.borderCard}`,
                    background: theme.bgCard,
                    color: theme.textMain,
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  <CloseIcon size={14} /> Cancelar
                </button>

                <button
                  type="submit"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    background: "#16a34a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  <CheckIcon size={15} /> Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
