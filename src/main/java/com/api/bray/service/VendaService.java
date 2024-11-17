package com.api.bray.service;

import com.api.bray.model.Venda;
import com.api.bray.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    public Venda salvarVenda(Venda venda) {
        return vendaRepository.save(venda); // Certifique-se de que o repositório está configurado corretamente
    }

    // Listar todas as vendas
    public List<Venda> listarVendas() {
        return vendaRepository.findAll();
    }

    // Buscar venda por ID
    public Venda buscarVendaPorId(Long id) {
        Optional<Venda> venda = vendaRepository.findById(id);
        return venda.orElse(null); // Retorna null se não encontrar a venda
    }

    // Atualizar venda
    public void atualizarVenda(Venda venda) {
        vendaRepository.save(venda); // Salva ou atualiza a venda
    }

    // Deletar venda
    public void deletarVenda(Long id) {
        vendaRepository.deleteById(id); // Deleta a venda pelo ID
    }

}
