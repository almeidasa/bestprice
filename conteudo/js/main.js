jQuery(document).ready(function($) {
    //Variáveis
    var $elTipo = $("#tipo");
    var $elNome= $("#nome");
    var $elQuantidade= $("#quantidade");
    var $elPreco= $("#preco");
    var $elLitragem= $("#litragem");

    this.$btnAdicionar = $("#botao-adicionar");
    this.$btnLimpar = $("#btnLimpar");
    this.$btnCalcular = $("#btnCalcular");

    //Funções
    var adicioneItem = function () {
        alert('adicionar');
    };

    var calcular = function () {
        alert('calcular');
    };

    var limpeTela = function () {
        $elNome.val("");
        $elQuantidade.val("");
        $elPreco.val("");
        $elLitragem.val("");
    };

    //Eventos
    this.$btnAdicionar.on("click", function (e) {
        adicioneItem();
        e.stopPropagation();
    });

    this.$btnLimpar.on("click", function () {
        limpeTela();
    });

    this.$btnCalcular.on("click", function () {
        limpeTela();
        e.stopPropagation();
    });
});