const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Rota principal (HTML)
    if (req.url === '/' || req.url === '/index.html') {
      fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    }
    // Arquivo JS
    else if (req.url === '/public/script.js') {
      fs.readFile(path.join(__dirname, 'public', 'script.js'), (err, data) => {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      });
    }
    else {
      res.writeHead(404);
      res.end('404 Não encontrado');
    }
  }

  // Rota POST
  else if (req.method === 'POST' && req.url === '/enviar') {
    let corpo = '';
    req.on('data', chunk => {
      corpo += chunk.toString();
    });
    req.on('end', () => {
      const dados = JSON.parse(corpo);
      const nome = dados.nome || 'desconhecido';
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Olá, ${nome}! Bem-vindo ao meu site.`);
    });
  }

  else {
    res.writeHead(405);
    res.end('Método não suportado');
  }
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
