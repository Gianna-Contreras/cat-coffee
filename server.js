const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Obtener la ruta del archivo solicitado
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Obtener la extensión del archivo
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // Asignar el tipo de contenido según la extensión
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Leer y servir el archivo
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado
                fs.readFile('./404.html', (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end('Error del servidor: ' + error.code);
            }
        } else {
            // Archivo encontrado
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}/`);
    console.log(`Abre tu navegador en: http://localhost:${port}/`);
});