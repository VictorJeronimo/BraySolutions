package com.api.bray.controller;

import com.api.bray.model.Venda;
import com.api.bray.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vendas")
public class VendaRestController {

    @Autowired
    private VendaService vendaService;

    // Endpoint para listar as vendas
    @GetMapping
    public ResponseEntity<?> listarVendas() {
        return ResponseEntity.ok(vendaService.listarVendas());
    }

    // Endpoint para buscar uma venda por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarVendaPorId(@PathVariable Long id) {
        Venda venda = vendaService.buscarVendaPorId(id);
        if (venda != null) {
            return ResponseEntity.ok(venda);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Venda não encontrada");
    }

    // Endpoint para editar (atualizar) uma venda
    @PutMapping("/{id}")
    public ResponseEntity<?> editarVenda(@PathVariable Long id, @RequestBody Venda venda) {
        Venda vendaExistente = vendaService.buscarVendaPorId(id);
        if (vendaExistente != null) {
            venda.setId(id); // Garante que o ID da venda seja mantido
            vendaService.atualizarVenda(venda);
            return ResponseEntity.ok(venda);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Venda não encontrada para atualização");
    }

    // Endpoint para deletar uma venda
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarVenda(@PathVariable Long id) {
        Venda venda = vendaService.buscarVendaPorId(id);
        if (venda != null) {
            vendaService.deletarVenda(id);
            return ResponseEntity.ok("Venda deletada com sucesso");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Venda não encontrada para deleção");
    }

    // Endpoint para salvar uma nova venda (POST)
    @PostMapping
    public ResponseEntity<?> salvarVenda(@RequestBody Venda venda) {
        Venda vendaSalva = vendaService.salvarVenda(venda); // Chama o método da service para salvar a venda
        return ResponseEntity.status(HttpStatus.CREATED).body(vendaSalva); // Retorna a venda salva com o status 201
    }
}
