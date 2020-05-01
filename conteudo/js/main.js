jQuery(document).ready(function($) {
    //Variáveis
    var $elTipo = $("#tipo");
    var $elNome= $("#nome");
    var $elQuantidade= $("#quantidade");
    var $elPreco= $("#preco");
    var $elLitragem= $("#litragem");

    var $quadro = $(".quadro-itens ul");

    this.$btnAdicionar = $("#botao-adicionar");
    this.$btnLimpar = $("#btnLimpar");
    this.$btnCalcular = $("#btnCalcular");

    //Funções
    var adicioneItem = function () {
        var card = obtenhaHtmlDoCard();
        $($quadro).append(card);
    };

    var calcular = function () {
        alert('calcular');
    };

    var limpeTela = function () {
        $elNome.val("");
        $elQuantidade.val("");
        $elPreco.val("");
        $elLitragem.val("");
        $($quadro).html("");
    };

    var obtenhaModelDoCard = function () {
        return {
            tipo: $elTipo.val(),
            nome: $elNome.val(),
            quantidade: $elQuantidade.val(),
            preco: $elPreco.val(),
            litragem: $elLitragem.val()
        }
    };

    var obtenhaHtmlDoCard = function () {
        var model = obtenhaModelDoCard();
        var card = "<li class='cardFiltro'>";
        card += "<div class='cardFiltroItem'>";
        card += "<input type='hidden' data-tipoentidade='3014'/>";
        card += "<div class='divNome'><i class='fa fa-user'></i><p>"+ model.nome +"</p></div>";
        card += "<span style='color: #2678C9;background: #E1F3FF' class='excluirCard' title='Remover bebida'></span>";
        card += "<p class='informacoes'>" + model.quantidade + obtenhaUnidade(model) + model.litragem + " ml</p>";
        card += "<p class='informacoes'>Preço R$ " + model.preco +"</p>";
        card += "</div>";
        card += "</li>";

        return card;
    };

    var obtenhaUnidade = function (model){
        if(model.tipo == "Caixa") {
            return model.quantidade > 1 ? " cxs de " : " cx de ";
        } else {
            return model.quantidade > 1 ? " unds de " : " und de ";
        }
    };

    var excluaCard = function(e){
        $(e.target).closest(".cardFiltro").remove();
        e.stopPropagation();
    }

    //Eventos
    this.$btnAdicionar.on("click", function (e) {
        adicioneItem();
        //retorno para que não atualize a página devido ao submit
        return false;
    });

    this.$btnLimpar.on("click", function () {
        limpeTela();
    });

    this.$btnCalcular.on("click", function () {
        limpeTela();
    });

    $quadro.on("click", ".excluirCard", function (e) {
        excluaCard(e);
    });
});