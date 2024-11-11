package com.api.bray.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaginasController {

    @GetMapping("/")  // A página inicial (index)
    public String index() {
        return "index";  // Renderiza o arquivo index.html
    }

    @GetMapping("/cadastroProduto")  // Mapeia a página de cadastro de produto
    public String cadastroProduto() {
        return "cadastroProduto";  // Renderiza o arquivo cadastroProduto.html
    }

    @GetMapping("/cadastroVenda")  // Mapeia a página de cadastro de venda
    public String cadastroVenda() {
        return "cadastroVenda";  // Renderiza o arquivo cadastroVenda.html
    }
}