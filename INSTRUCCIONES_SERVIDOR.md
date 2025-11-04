# 🚀 CÓMO VER TU APP EN PC Y MÓVIL

## 📋 OPCIONES DISPONIBLES

### 🐍 **OPCIÓN A: Python (Más fácil)**
1. **Abre CMD/Terminal** en la carpeta de tu proyecto
2. **Ejecuta:** `servidor.bat` (doble clic)
3. **O manualmente:** `python -m http.server 8080`

### 🟢 **OPCIÓN B: Node.js**
1. **Instala Node.js** desde https://nodejs.org
2. **Abre CMD/Terminal** en la carpeta
3. **Ejecuta:** `node servidor.js`

### 💻 **OPCIÓN C: VS Code Live Server**
1. **Instala extensión** "Live Server" en VS Code
2. **Clic derecho** en `index.html`
3. **"Open with Live Server"**

### 🌐 **OPCIÓN D: Servidor web cualquiera**
- XAMPP, WAMP, MAMP, etc.
- Copia archivos a la carpeta `htdocs` o `www`

---

## 🖥️ **ACCESO DESDE PC**

Una vez iniciado el servidor:

✅ **Abre Chrome/Edge**
✅ **Ve a:** `http://localhost:8080`
✅ **Deberías ver tu portal**
✅ **Para instalar PWA:** Menú → "Instalar Terrazas de Bel Air"

---

## 📱 **ACCESO DESDE MÓVIL**

### **PASO 1: Encontrar tu IP local**

**Windows:**
```cmd
ipconfig
```
Busca "Dirección IPv4" (ej: 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
```
Busca tu IP local

### **PASO 2: Conectar desde móvil**

✅ **Asegúrate** que PC y móvil están en la **misma WiFi**
✅ **Abre navegador** en el móvil
✅ **Ve a:** `http://TU_IP:8080` (ej: http://192.168.1.100:8080)
✅ **¡Deberías ver tu portal!**

### **PASO 3: Instalar como app**

📱 **Android (Chrome):**
- Aparecerá banner "Añadir a pantalla de inicio"
- O botón "📱 Instalar App" en la página

📱 **iPhone (Safari):**
- Botón "Compartir" → "Añadir a pantalla de inicio"

---

## 🔧 **SOLUCIÓN DE PROBLEMAS**

### ❌ **"No se puede conectar"**
- Verifica que estés en la misma WiFi
- Desactiva firewall temporalmente
- Prueba con otra IP si tienes varias

### ❌ **"PWA no se instala"**
- Usa HTTPS (necesario para PWA completa)
- O usa ngrok para túnel HTTPS

### ❌ **"Python no encontrado"**
- Instala Python desde python.org
- Marca "Add to PATH" durante instalación

---

## 🎯 **RESULTADO ESPERADO**

✅ **En PC:** Portal web normal + opción de instalar
✅ **En móvil:** Portal responsive + botón instalar app
✅ **Después de instalar:** Icono en pantalla de inicio
✅ **Al abrir app:** Se abre como app nativa (sin barra navegador)

---

## 🚀 **SIGUIENTE NIVEL: HTTPS**

Para PWA completa con notificaciones:

```bash
# Con ngrok (túnel HTTPS gratuito)
npm install -g ngrok
ngrok http 8080
```

Esto te dará una URL HTTPS temporal para probar todas las funciones PWA.