// Função para iniciar o documento apenas após todo o documento ser carregado
document.addEventListener('DOMContentLoaded', function () {
    // Variável para o tamanho
    const sizeSelect = document.getElementById('size');
    // Variável para os extras
    const extras = document.querySelectorAll('input[name="extras"]');
    // Variável para o preço total
    const totalPriceElement = document.getElementById('totalPrice');
    // Variável para as notas
    const notes = document.getElementById('notes');

    // Constante de preços e tamanhos chave/valor
    const prices = {
        sizes: {
            small: 5.00,
            medium: 7.00,
            large: 9.00
        },
        extras: {
            granola: 1.00,
            banana: 0.50,
            honey: 0.75,
            chocolate: 1.50,
            candy: 0.75,
            peanuts: 0.50,
            pacoca: 1.00
        }
    };

    // funcao para calcular o preço
    function calculateTotalPrice() {
        // let para variavel ser reutilizada depois
        let totalPrice = 0;
        // constante para o tamamnho escolhido
        const selectedSize = sizeSelect.value;

        // funcao para concatenar preço total com o preço do tamanho
        totalPrice += prices.sizes[selectedSize];

        // Somar o valor do tamanho aos extras
        extras.forEach(extra => {
            if (extra.checked) {
                totalPrice += prices.extras[extra.value];
            }
        });

        //faz com que o resultado seja em 2 casas decimais
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    //função para calcular o preço inicial
    calculateTotalPrice();

    // adiciona evento de troca caso extra seja marcado
    sizeSelect.addEventListener('change', calculateTotalPrice);
    extras.forEach(extra => {
        extra.addEventListener('change', calculateTotalPrice);
    });

    document.querySelector('button[type="submit"]').addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário
        saveOrder(); // Chama a função para salvar o pedido
    });

    // funcao que salva o pedido
    function saveOrder() {
        //constante para buscar as informações do pedido
        const selectedSize = sizeSelect.value;

        // constante para selecionar os extras, com forEach caso mais de uma opçao seja escolhida
        const selectedExtras = [];
        extras.forEach(extra => {
            if (extra.checked) {
                selectedExtras.push(extra.value);
            }
        });

        // constante para buscar o conteudo da variavel finalPrice
        const finalPrice = totalPriceElement.textContent;
        // constante para buscar o conteudo do size e dos extras para adicionar ao localhost
        const orderDetails = {
            size: selectedSize,
            extras: selectedExtras,
            notes: notes.value,
            price: finalPrice
        };

        // jogar as informaçoes para o console
        console.log('Order Details:', orderDetails);
        // Salvar no localStorage
        localStorage.setItem('order', JSON.stringify(orderDetails));

        // Redirecionar para a página do carrinho
        window.location.href = "shopping_cart.html";
    }
});