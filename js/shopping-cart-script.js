function pesquisacep(cep) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep.length === 8) {
        
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        // Faz a requisição para a API
        fetch(url)
            .then(answer => answer.json())
            .then(data => {
                if (!("erro" in data)) {
                    // Preenche os campos com os valores retornados pela API
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('uf').value = data.uf;
                } else {
                    // CEP não encontrado
                    alert("Your CEP could'nt be found.");
                }
            })

    } else {
        // CEP inválido
        alert("Your CEP is invalid. CEPs are 8 numbers.");
    }
}