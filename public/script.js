function enviar() {
    const nome = document.getElementById("nome").value;
  
    fetch('/enviar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome })
    })
    .then(res => res.text())
    .then(texto => {
      document.getElementById("resposta").innerText = texto;
    })
    .catch(err => {
      document.getElementById("resposta").innerText = "Erro: " + err;
    });
  }
  