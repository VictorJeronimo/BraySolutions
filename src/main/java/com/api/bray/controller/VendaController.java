package com.api.bray.controller;

import com.api.bray.model.Venda;
import com.api.bray.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/venda")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    // Rota para listar as vendas
    @GetMapping("/listar")
    public String listarVendas(Model model) {
        model.addAttribute("vendas", vendaService.listarVendas());
        return "listaVenda"; // Nome da página HTML (listarVendas.html)
    }

    // Rota para editar a venda
    @GetMapping("/editarVenda/{id}")
    public String editarVenda(@PathVariable Long id, Model model) {
        Venda venda = vendaService.buscarVendaPorId(id);
        if (venda != null) {
            model.addAttribute("venda", venda);
            return "editarVenda"; // Nome da página HTML (editarVenda.html)
        }
        return "redirect:/venda/listar"; // Redireciona se a venda não for encontrada
    }

    // Rota para atualizar a venda
    @PostMapping("/atualizar")
    public String atualizarVenda(@ModelAttribute Venda venda) {
        vendaService.atualizarVenda(venda);
        return "redirect:/venda/listar"; // Redireciona para a lista de vendas
    }

    // Rota para deletar a venda
    @GetMapping("/deletarVenda/{id}")
    public String deletarVenda(@PathVariable Long id) {
        vendaService.deletarVenda(id);
        return "redirect:/venda/listar"; // Redireciona para a lista de vendas
    }

    // Rota para salvar uma nova venda
    @PostMapping("/salvar")
    public String salvarVenda(@ModelAttribute Venda venda) {
        vendaService.salvarVenda(venda);
        return "redirect:/venda/listar"; // Redireciona para a lista de vendas após salvar
    }
}
