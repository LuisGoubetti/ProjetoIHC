class Jogo {
    constructor(nome, genero, valor, nota, comentario) {
        this.nome = nome;
        this.genero = genero;
        this.valor = valor;
        this.nota = nota;
        this.comentario = comentario;
    }
}

var listaJogos = [];
var posicao = '';

function cadastrar(objeto, lista) {
    lista.push(objeto);
}

function alterar(objeto, lista, pos) {
    lista[pos] = objeto;
}

function excluir(lista, pos) {
    lista.splice(pos, 1);
}

function validacao() {
    return $('#nome').val() !== '' && 
           $('#genero').val() !== '' && 
           $('#valor').val() !== '' && 
           $('#avaliacao-jogo').val() !== '' && 
           $('#avaliacao-jogo').val() >= 1 && 
           $('#avaliacao-jogo').val() <= 5;
}

function listarJogo(lista) {
    let auxHtml = '';
    const maxChars = 25; 

    for (let i = 0; i < lista.length; i++) {
        auxHtml += '<tr id="trHistorico">';
        auxHtml += '<td>' + (lista[i].nome.length > maxChars ? '<button class="modal-btn" data-title="Nome do Jogo" data-content="' + lista[i].nome + '">...</button>' : lista[i].nome) + '</td>';
        auxHtml += '<td>' + lista[i].genero + '</td>';
        auxHtml += '<td>' + lista[i].valor + '</td>';
        auxHtml += '<td>' + (lista[i].comentario.length > maxChars ? '<button class="modal-btn" data-title="Comentário" data-content="' + lista[i].comentario + '">...</button>' : lista[i].comentario) + '</td>';
        auxHtml += '<td>' + lista[i].nota + '</td>';
        auxHtml += '<td><a href="#" class="btAlterar" rel="' + i + '"></a></td>';
        auxHtml += '<td><a href="#" class="btExcluir" rel="' + i + '"></a></td>';
        auxHtml += '</tr>';
    }

    return auxHtml;
}

$(document).ready(() => { 
    
    $('#btSalvar').click((e) => {
        e.preventDefault();

        let jogo = new Jogo(
            $('#nome').val(),
            $('#genero').val(),
            $('#valor').val(),
            $('#avaliacao-jogo').val(),
            $('#comentario-jogo').val()
        );

        if (validacao()) {
            if (posicao === '') {
                cadastrar(jogo, listaJogos);
            } else {
                alterar(jogo, listaJogos, posicao);
                posicao = '';
            }

            $('#historico-corpo').html(listarJogo(listaJogos));
            $('input, textarea').val('');
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    });

    const modal = document.getElementById("modal");
    const span = document.getElementsByClassName("close")[0];

    $(document).on('click', '.modal-btn', function () {
        const title = $(this).data('title');
        const content = $(this).data('content');
        $('#modal-title').text(title);
        $('#modal-content').text(content);
        modal.style.display = "block";
    });

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $('#historico-corpo').on('click', '.btAlterar', (evento) => {
        evento.preventDefault();

        posicao = evento.target.getAttribute('rel');
        $('#nome').val(listaJogos[posicao].nome);
        $('#genero').val(listaJogos[posicao].genero);
        $('#valor').val(listaJogos[posicao].valor);
        $('#avaliacao-jogo').val(listaJogos[posicao].nota);
        $('#comentario-jogo').val(listaJogos[posicao].comentario);
    });

    $('#historico-corpo').on('click', '.btExcluir', (evento) => {
        evento.preventDefault();
        if (confirm('Tem certeza que deseja excluir essa avaliação?')) {
            let pos = evento.target.getAttribute('rel');
            excluir(listaJogos, pos);
            $('#historico-corpo').html(listarJogo(listaJogos));
        }
    });


    $('#btBaixar').click(() => {
        const dataStr = JSON.stringify(listaJogos, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'historico_avaliacoes.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    $('#btCarregar').click(() => {
        $('#fileInput').click();
    });

    $('#fileInput').change((event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);
                listaJogos = data;
                $('#historico-corpo').html(listarJogo(listaJogos));
            };
            reader.readAsText(file);
        }
    });
});
