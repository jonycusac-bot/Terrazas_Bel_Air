// Servidor simple para PWA - Terrazas de Bel Air
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;

// Obtener IP local
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                return interface.address;
            }
        }
    }
    return 'localhost';
}

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(500);
                res.end('Error del servidor: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

const localIP = getLocalIP();

server.listen(PORT, () => {
    console.log('🚀 ========================================');
    console.log('   SERVIDOR LOCAL - TERRAZAS DE BEL AIR');
    console.log('🚀 ========================================');
    console.log('');
    console.log('✅ Servidor iniciado correctamente');
    console.log('');
    console.log('📍 ACCESO DESDE PC:');
    console.log(`   http://localhost:${PORT}`);
    console.log(`   http://127.0.0.1:${PORT}`);
    console.log('');
    console.log('📱 ACCESO DESDE MÓVIL (misma red WiFi):');
    console.log(`   http://${localIP}:${PORT}`);
    console.log('');
    console.log('💡 Para instalar como PWA:');
    console.log('   - Chrome: Menú → Instalar app');
    console.log('   - Móvil: Aparecerá botón "Instalar App"');
    console.log('');
    console.log('🛑 Para parar el servidor: Ctrl+C');
    console.log('========================================');
});