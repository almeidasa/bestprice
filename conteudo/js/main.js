jQuery(document).ready(function($) {
    //Variáveis
    this.$btnAdicionar = $("#botao-adicionar");

    //Funções
    var adicioneItem = function () {
        alert('teste');
    };

    this.$btnAdicionar.on("click", function (e) {
        adicioneItem();
        e.stopPropagation();
    });
    //Eventos
});