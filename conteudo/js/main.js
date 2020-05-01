jQuery(document).ready(function($) {
    //Variáveis
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
        var contador = parseInt($("#contador").html(),10);
        $("#contador").html(contador+1);
    };

    var calcular = function () {
        var listaDeCards = $($quadro).find("li");
        var arrValores = [];

        jQuery.each($(listaDeCards), function(index, el){
            $(el).removeClass("melhor-opcao");
            var valor = $(el).find("input#item-valores").data("preco-por-litro");
            arrValores.push(valor);
        });

        var menorValor = Math.min.apply(null, arrValores);

        if(!isNaN(menorValor)) {
            jQuery.each($(listaDeCards), function(index, el){
                var valor = $(el).find("input#item-valores").data("preco-por-litro");
                
                if(valor == menorValor){
                $(el).addClass("melhor-opcao");
                }
            });
        }
    };

    var limpeTela = function () {
        $elNome.val("");
        $elQuantidade.val("");
        $elPreco.val("");
        $elLitragem.val("");
    };

    var crieModelDoCard = function () {
        return {
            id: $("#contador").html(),
            nome: $elNome.val(),
            quantidade: $elQuantidade.val(),
            preco: $elPreco.val(),
            litragem: $elLitragem.val()
        }
    };

    var calculePrecoPorLitro = function(model) {
        var totalml = model.quantidade * model.litragem;
        return model.preco / totalml;
    };

    var obtenhaHtmlDoCard = function () {
        var model = crieModelDoCard();
        var precoPorLitro = calculePrecoPorLitro(model);
        var card = "<li class='cardFiltro'>";
        card += "<div class='cardFiltroItem'>";
        card += "<input id='item-valores' type='hidden' data-preco-por-litro='" + precoPorLitro + "' data-id='ITEM" + model.id + "' data-nome='" + model.nome + "' data-quantidade='" + model.quantidade + "' data-preco='" + model.preco + "' data-litragem='" + model.litragem + "'/>";        
        card += "<div class='divNome'><i class='fa fa-user'></i><p>"+ model.nome +"</p></div>";
        card += "<span style='color: #2678C9;background: #E1F3FF' class='excluirCard' title='Remover bebida'></span>";
        card += "<p class='informacoes'>" + model.quantidade + obtenhaUnidade(model) + model.litragem + " ml</p>";
        card += "<p class='informacoes'>Preço R$ " + model.preco +"</p>";
        card += "</div>";
        card += "</li>";

        return card;
    };

    var obtenhaUnidade = function (model){
        return model.quantidade > 1 ? " unds de " : " und de ";
    };

    var excluaCard = function(e){
        $(e.target).closest(".cardFiltro").remove();
        var contador = parseInt($("#contador").html(),10);
        $("#contador").html(contador-1);
        e.stopPropagation();
    };

    var valido = function (e) {
        var retorno = true;
        if($elNome.val().trim() == "") {
            retorno = false;
        }
        if($elQuantidade.val().trim() == "") {
            retorno = false;
        }
        if($elPreco.val().trim() == "") {
            retorno = false;
        }
        if($elLitragem.val().trim() == "") {
            retorno = false;
        }

        return retorno;
    };

    //Eventos
    this.$btnAdicionar.on("click", function (e) {
        if(valido()) {
            adicioneItem();
            limpeTela();
            //retorno para que não atualize a página devido ao submit
            return false;
        }
    });

    this.$btnLimpar.on("click", function () {
        limpeTela();
        $($quadro).html("");
        $("#contador").val(0);
    });

    this.$btnCalcular.on("click", function () {
        calcular();
    });

    $quadro.on("click", ".excluirCard", function (e) {
        excluaCard(e);
    });

    $elPreco.on("input", function(e) {
        var valorTratado = e.target.value.replace(',', '.');
        $elPreco.val(valorTratado);
    });

    $elQuantidade.on("input", function(e) {
        var valorTratado = e.target.value.replace(/[^0-9]/g, '');
        $elQuantidade.val(valorTratado);
    });
});