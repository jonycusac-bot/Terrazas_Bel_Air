# 📝 GUÍA DE EDICIÓN - Portal Comunidad de Vecinos

## 🎯 EDICIÓN RÁPIDA Y FÁCIL

### 📁 **Archivo Principal: `config.js`**
Este es el archivo más importante para personalizar tu comunidad. Aquí puedes cambiar:

---

## 🏠 **1. INFORMACIÓN GENERAL**
```javascript
name: "Mi Comunidad",           // ← Cambia el nombre de tu comunidad
subtitle: "Portal Informativo de Vecinos",  // ← Cambia el subtítulo
```

---

## 📊 **2. ESTADÍSTICAS PRINCIPALES**
```javascript
stats: {
    vecinos: 155,        // ← Número total de vecinos
    viviendas: 156,      // ← Número total de viviendas  
    reunionesAnio: 3    // ← Reuniones realizadas este año
}
```

---

## 🏘️ **3. LISTA DE VIVIENDAS**
```javascript
viviendas: [
    "1A", "1B", "1C",    // ← Añade o quita viviendas según tu edificio
    "2A", "2B", "2C", 
    "3A", "3B", "3C",
    "4A", "4B", "4C"     // ← Ejemplo: si tienes 5 plantas, añade "5A", "5B", etc.
]
```

---

## 📞 **4. CONTACTOS IMPORTANTES**

### Administrador:
```javascript
administrador: {
    telefono: "+34 111 111 111",     // ← Tu número de administrador
    email: "admin@micomunidad.es",   // ← Email del administrador
    horario: "L-V: 9:00-17:00"       // ← Horario de atención
}
```

### Servicios de Mantenimiento:
```javascript
fontanero: "+34 987 654 321",       // ← Número del fontanero
electricista: "+34 555 666 777",    // ← Número del electricista
cerrajero: "+34 444 555 666",       // ← Número del cerrajero
```

### Limpieza:
```javascript
limpieza: {
    empresa: "Limpiezas García",     // ← Nombre de la empresa
    telefono: "+34 333 444 555",     // ← Teléfono de limpieza
    horario: "L-S: 7:00-15:00"       // ← Horario de limpieza
}
```

### Junta Directiva:
```javascript
presidente: "Jonatan cusac (3A)",      // ← Nombre y vivienda del presidente
secretaria: "María López (1B)",      // ← Nombre y vivienda del secretario/a
vocal: "Pedro Martín (2C)"           // ← Nombre y vivienda del vocal
```

---

## 🔧 **5. MEJORAS DE LA COMUNIDAD**

Para añadir una nueva mejora:
```javascript
{
    titulo: "Nueva Mejora",                    // ← Título de la mejora
    estado: "planned",                         // ← completed, in-progress, planned
    descripcion: "Descripción de la mejora",  // ← Descripción detallada
    fecha: "Diciembre 2024",                  // ← Fecha prevista/realizada
    coste: "€5,000"                           // ← Coste estimado/real
}
```

---

## 🛠️ **6. MANTENIMIENTO**

### Próximas Tareas:
```javascript
{
    titulo: "Nueva Tarea",                     // ← Nombre de la tarea
    descripcion: "Descripción de la tarea",   // ← Qué se va a hacer
    fecha: "15 Diciembre 2024",               // ← Fecha programada
    prioridad: "normal"                       // ← urgent o normal
}
```

### Historial:
```javascript
{ fecha: "01 Nov 2024", tarea: "Nueva tarea completada" }  // ← Añadir al historial
```

---

## 💰 **7. ESTADO DE DEUDAS**

### Resumen:
```javascript
alCorriente: 20,    // ← Viviendas al corriente de pago
pendientes: 3,      // ← Viviendas con pagos pendientes
morosos: 1          // ← Viviendas morosas
```

### Detalle de Deudores:
```javascript
{
    vivienda: "2B",                                    // ← Número de vivienda
    descripcion: "Cuota pendiente: Octubre 2024",     // ← Descripción de la deuda
    cantidad: "€120",                                  // ← Cantidad adeudada
    tipo: "warning"                                    // ← warning o danger
}
```

---

## 📋 **8. ACTAS DE REUNIONES**
```javascript
{
    titulo: "Junta Ordinaria - Noviembre 2024",       // ← Título del acta
    fecha: "15 Noviembre 2024",                       // ← Fecha de la reunión
    resumen: "Resumen de los temas tratados..."       // ← Breve resumen
}
```

---

## 🖼️ **9. GALERÍA DE FOTOS**

Para cambiar las imágenes, puedes:

1. **Usar imágenes reales**: Sube tus fotos a un servicio como Imgur, Google Drive, etc. y usa la URL
2. **Mantener placeholders**: Cambia el texto del placeholder

```javascript
{
    titulo: "Nueva Mejora",                           // ← Título de la imagen
    fecha: "Noviembre 2024",                         // ← Fecha de la foto
    categoria: "completed",                          // ← completed o progress
    imagen: "https://tu-url-de-imagen.jpg"          // ← URL de tu imagen real
}
```

---

## 🚀 **CÓMO APLICAR LOS CAMBIOS**

1. **Abre el archivo `config.js`**
2. **Modifica los valores que necesites**
3. **Guarda el archivo**
4. **Recarga la página web**
5. **¡Los cambios se aplicarán automáticamente!**

---

## 💡 **CONSEJOS IMPORTANTES**

- ✅ **Mantén las comillas** en los textos: `"Mi texto"`
- ✅ **Respeta las comas** al final de cada línea
- ✅ **No borres las llaves** `{}` ni corchetes `[]`
- ✅ **Los números van sin comillas**: `48` no `"48"`
- ✅ **Las fechas y textos van con comillas**: `"15 Noviembre 2024"`

---

## 🆘 **SI ALGO NO FUNCIONA**

1. **Revisa la consola del navegador** (F12 → Console)
2. **Verifica que no falten comas o comillas**
3. **Compara con el formato original**
4. **Recarga la página completamente** (Ctrl+F5)

---

## 📱 **EDICIÓN DESDE EL MÓVIL**

Puedes editar el archivo `config.js` desde cualquier editor de texto en tu móvil o tablet. Los cambios se verán reflejados inmediatamente al recargar la página.

---

¡Listo! Con estos cambios tendrás tu portal personalizado para tu comunidad específica. 🎉