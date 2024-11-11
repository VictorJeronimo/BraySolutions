// Função para validar o formulário de cadastro de produto
function validarFormularioProduto() {
    const nomeProduto = document.getElementById("nomeProduto").value;
    const dataEntrada = document.getElementById("dataEntrada").value;
    const tipoProduto = document.getElementById("tipoProduto").value;

    // Validação do nome do produto
    if (nomeProduto.trim() === "") {
        alert("Por favor, insira o nome do produto.");
        return false;
    }

    // Validação da data de entrada
    if (dataEntrada === "") {
        alert("Por favor, insira a data de entrada.");
        return false;
    }

    // Validação do tipo de produto
    if (tipoProduto === "") {
        alert("Por favor, selecione o tipo de produto.");
        return false;
    }

    // Exibe mensagem de sucesso e redireciona para a página inicial
    alert("Cadastro de produto realizado com sucesso!");
    window.location.href = "/"; // Redireciona para a página inicial
    return false; // Impede o envio do formulário
}

function validarFormularioVenda() {
    const nomeCliente = document.getElementById("nomeCliente").value;
    const dataVenda = document.getElementById("dataVenda").value;
    const nomeProdutoVenda = document.getElementById("nomeProdutoVenda").value;

    // Permite letras, espaços e caracteres especiais (acentos e cedilhas)
    const regexNome = /^[A-Za-zà-úÀ-Ú\s]+$/;
    if (!regexNome.test(nomeCliente)) {
        alert("O nome do cliente não pode conter números ou caracteres especiais não permitidos.");
        return false; // Impede o envio do formulário
    }

    // Validação da data da venda
    if (dataVenda === "") {
        alert("Por favor, insira a data da venda.");
        return false;
    }

    // Validação do nome do produto
    if (nomeProdutoVenda.trim() === "") {
        alert("Por favor, insira o nome do produto vendido.");
        return false;
    }

    // Exibe mensagem de sucesso e redireciona para a página inicial
    alert("Cadastro de venda realizado com sucesso!");
    window.location.href = "/"; // Redireciona para a página inicial
    return false; // Impede o envio do formulário
}

