document.getElementById('form-avaliacao').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome-jogo').value;
    const genero = document.getElementById('genero-jogo').value;
    const valor = document.getElementById('valor-jogo').value;
    const avaliacao = document.getElementById('avaliacao-jogo').value;
    const comentario = document.getElementById('comentario-jogo').value;
    
    const tabela = document.getElementById('historico-corpo');
    const novaLinha = tabela.insertRow();
    
    const celulaNome = novaLinha.insertCell(0);
    celulaNome.textContent = nome;
    
    const celulaGenero = novaLinha.insertCell(1);
    celulaGenero.textContent = genero;
    
    const celulaValor = novaLinha.insertCell(2);
    celulaValor.textContent = valor;
    
    const celulaComentario = novaLinha.insertCell(3);
    celulaComentario.textContent = comentario;
    
    const celulaAvaliacao = novaLinha.insertCell(4);
    celulaAvaliacao.textContent = avaliacao;

    document.getElementById('form-avaliacao').reset();
});

document.getElementById('carregar').addEventListener('click', function() {
    // Função para carregar avaliações armazenadas, se aplicável.
    alert('Função de carregar avaliações não implementada.');
});
