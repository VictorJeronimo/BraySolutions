/// GET


$(document).ready(function () {
    // Fazer GET para buscar todos os produtos
    $.ajax({
        url: '/api/produtos', // Rota para buscar os produtos
        type: 'GET',
        success: function (produtos) {
            let tabelaProdutos = $('#tabelaProdutos tbody');
            tabelaProdutos.empty(); // Limpa a tabela antes de preencher

            // Itera sobre os produtos e preenche a tabela
            produtos.forEach(function (produto) {
                tabelaProdutos.append(`
                    <tr>
                        <td>${produto.nome}</td>
                        <td>${produto.dataEntrada}</td>
                        <td>${produto.tipo}</td>
                        <td>
                            <button class="btn btn-warning editarProduto" data-id="${produto.id}">Editar</button>
                            <button class="btn btn-danger excluirProduto" data-id="${produto.id}">Excluir</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function () {
            alert("Erro ao carregar produtos.");
        }
    });
});

$(document).ready(function () {
    // Fazer GET para buscar todas as vendas
    $.ajax({
        url: '/api/vendas', // Rota para buscar as vendas
        type: 'GET',
        success: function (vendas) {
            let tabelaVendas = $('#tabelaVendas tbody');
            tabelaVendas.empty(); // Limpa a tabela antes de preencher

            // Itera sobre as vendas e preenche a tabela
            vendas.forEach(function (venda) {
                tabelaVendas.append(`
                    <tr>
                        <td>${venda.nomeCliente}</td>
                        <td>${venda.dataVenda}</td>
                        <td>${venda.nomeProduto}</td>
                        <td>
                            <button class="btn btn-warning editarVenda" data-id="${venda.id}">Editar</button>
                            <button class="btn btn-danger excluirVenda" data-id="${venda.id}">Excluir</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function () {
            alert("Erro ao carregar vendas.");
        }
    });
});

// Validação para o campo 'nomeCliente' - Permitir apenas letras e espaços
    $('#nomeCliente').on('keydown', function(event) {
        const regex = /^[A-Za-zÁáÉéÍíÓóÚúÂâÊêÔôÃãÕõÇç\s]*$/;
        if (!regex.test(event.key) && event.key !== "Backspace" && event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
            event.preventDefault(); // Bloqueia a tecla pressionada
        }
    });


/// POST


$('#formCadastrarProduto').submit(function (e) {
    e.preventDefault(); // Previne o envio tradicional do formulário

    let novoProduto = {
        nome: $('#nomeProduto').val(),
        dataEntrada: $('#dataEntrada').val(),
        tipo: $('#tipoProduto').val()
    };

    // Envia o produto para o backend via POST
    $.ajax({
        url: '/api/produtos',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(novoProduto),
        success: function (response) {
            alert("Produto cadastrado com sucesso!");
            $('#formCadastrarProduto')[0].reset(); // Limpa o formulário
            // Recarrega a tabela de produtos
            location.reload();
        },
        error: function () {
            alert("Erro ao cadastrar produto.");
        }
    });
});

$('#formCadastrarVenda').submit(function (e) {
    e.preventDefault(); // Previne o envio tradicional do formulário

    let novaVenda = {
        nomeCliente: $('#nomeCliente').val(),
        dataVenda: $('#dataVenda').val(),
        nomeProduto: $('#nomeProdutoVenda').val()
    };

    // Envia a venda para o backend via POST
    $.ajax({
        url: '/api/vendas',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(novaVenda),
        success: function (response) {
            alert("Venda cadastrada com sucesso!");
            $('#formCadastrarVenda')[0].reset(); // Limpa o formulário
            // Recarrega a tabela de vendas
            location.reload();
        },
        error: function () {
            alert("Erro ao cadastrar venda.");
        }
    });
});


/// PUT


$(document).on('click', '.editarProduto', function () {
    let produtoId = $(this).data('id');

    // Obter os dados do produto (pode ser feito via GET antes, mas aqui fazemos o PUT diretamente)
    $.ajax({
        url: `/api/produtos/${produtoId}`,
        type: 'GET',
        success: function (produto) {
            $('#nomeProduto').val(produto.nome);
            $('#dataEntrada').val(produto.dataEntrada);
            $('#tipoProduto').val(produto.tipo);
            $('#formCadastrarProduto').submit(function (e) {
                e.preventDefault();

                let produtoAtualizado = {
                    nome: $('#nomeProduto').val(),
                    dataEntrada: $('#dataEntrada').val(),
                    tipo: $('#tipoProduto').val()
                };

                $.ajax({
                    url: `/api/produtos/${produtoId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(produtoAtualizado),
                    success: function () {
                        alert("Produto atualizado com sucesso!");
                        location.reload(); // Recarrega a página para atualizar a tabela
                    },
                    error: function () {
                        alert("Erro ao atualizar produto.");
                    }
                });
            });
        },
        error: function () {
            alert("Erro ao carregar dados do produto.");
        }
    });
});

$(document).on('click', '.editarVenda', function () {
    let vendaId = $(this).data('id');

    $.ajax({
        url: `/api/vendas/${vendaId}`,
        type: 'GET',
        success: function (venda) {
            $('#nomeCliente').val(venda.nomeCliente);
            $('#dataVenda').val(venda.dataVenda);
            $('#nomeProdutoVenda').val(venda.nomeProduto);
            $('#formCadastrarVenda').submit(function (e) {
                e.preventDefault();

                let vendaAtualizada = {
                    nomeCliente: $('#nomeCliente').val(),
                    dataVenda: $('#dataVenda').val(),
                    nomeProduto: $('#nomeProdutoVenda').val()
                };

                $.ajax({
                    url: `/api/vendas/${vendaId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(vendaAtualizada),
                    success: function () {
                        alert("Venda atualizada com sucesso!");
                        location.reload();
                    },
                    error: function () {
                        alert("Erro ao atualizar venda.");
                    }
                });
            });
        },
        error: function () {
            alert("Erro ao carregar dados da venda.");
        }
    });
});


/// DELETE


$(document).on('click', '.excluirProduto', function () {
    let produtoId = $(this).data('id');

    if (confirm("Tem certeza que deseja excluir este produto?")) {
        $.ajax({
            url: `/api/produtos/${produtoId}`,
            type: 'DELETE',
            success: function () {
                alert("Produto excluído com sucesso!");
                location.reload(); // Recarrega a tabela
            },
            error: function () {
                alert("Erro ao excluir produto.");
            }
        });
    }
});

$(document).on('click', '.excluirVenda', function () {
    let vendaId = $(this).data('id');

    if (confirm("Tem certeza que deseja excluir esta venda?")) {
        $.ajax({
            url: `/api/vendas/${vendaId}`,
            type: 'DELETE',
            success: function () {
                alert("Venda excluída com sucesso!");
                location.reload(); // Recarrega a tabela
            },
            error: function () {
                alert("Erro ao excluir venda.");
            }
        });
    }
});

// Função de validação de data (não permite data futura)
function validarData(data) {
    const dataAtual = new Date();
    const dataSelecionada = new Date(data);

    // Ajuste a hora da data atual para o final do dia (23:59:59) para comparar apenas a data
    dataAtual.setHours(23, 59, 59, 999);

    return dataSelecionada <= dataAtual;
}

// Validação do formulário de Produto
document.getElementById('formProduto').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nomeProduto = document.getElementById('nomeProduto').value;
    const dataEntrada = document.getElementById('dataEntrada').value;
    const tipoProduto = document.getElementById('tipoProduto').value;

    // Verificar campos obrigatórios
    if (!nomeProduto || !dataEntrada || !tipoProduto) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    // Verificar se a data de entrada não é futura
    if (!validarData(dataEntrada)) {
        alert('A data de entrada não pode ser no futuro!');
        return;
    }

    // Se todas as validações passarem, envia os dados para o back-end
    const produto = {
        nome: nomeProduto,
        dataEntrada: dataEntrada,
        tipo: tipoProduto
    };

    // Enviar para o back-end usando AJAX
    $.ajax({
        url: '/api/produtos',
        method: 'POST',
        data: produto,
        success: function(response) {
            alert('Produto cadastrado com sucesso!');
            // Redirecionar ou limpar o formulário, se necessário
            document.getElementById('formProduto').reset(); // Limpa o formulário
        },
        error: function(error) {
            alert('Erro ao cadastrar produto!');
        }
    });
});

// Função de validação para aceitar apenas letras no nome do cliente
function validarNomeCliente(nome) {
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÂâÊêÔôÃãÕõÇç]+(?:[\s][A-Za-zÁáÉéÍíÓóÚúÂâÊêÔôÃãÕõÇç]+)*$/;
    return regex.test(nome); // Retorna true se o nome for válido, falso caso contrário
}

// Validação do formulário de Venda
document.getElementById('formVenda').addEventListener('submit', function (event) {
    event.preventDefault();

    const nomeCliente = document.getElementById('nomeCliente').value;
    const dataVenda = document.getElementById('dataVenda').value;
    const nomeProduto = document.getElementById('nomeProduto').value;

    // Verificar campos obrigatórios
    if (!nomeCliente || !dataVenda || !nomeProduto) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    // Verificar se o nome do cliente contém apenas letras e espaços
    if (!validarNomeCliente(nomeCliente)) {
        alert('O nome do cliente deve conter apenas letras e espaços.');
        return;
    }

    // Verificar se a data da venda não é futura
    if (!validarData(dataVenda)) {
        alert('A data da venda não pode ser no futuro!');
        return;
    }

    // Se todas as validações passarem, envia os dados para o back-end
    const venda = {
        nomeCliente: nomeCliente,
        dataVenda: dataVenda,
        nomeProduto: nomeProduto
    };

    // Enviar para o back-end usando AJAX (exemplo)
    $.ajax({
        url: '/api/vendas',
        method: 'POST',
        data: venda,
        success: function(response) {
            alert('Venda cadastrada com sucesso!');
            // Redirecionar ou limpar o formulário, se necessário
        },
        error: function(error) {
            alert('Erro ao cadastrar venda!');
        }
    });
});
