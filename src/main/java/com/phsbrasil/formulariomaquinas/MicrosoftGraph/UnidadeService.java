package com.phsbrasil.formulariomaquinas.MicrosoftGraph;

import tools.jackson.databind.json.JsonMapper;
import com.phsbrasil.formulariomaquinas.MicrosoftGraph.DTOs.UnidadeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UnidadeService {

    @Autowired
    private GraphRepository graphRepository;

    @Autowired
    private JsonMapper objectMapper;

    private final String siteId = "forschercombr.sharepoint.com,6d613445-64e2-4086-91e9-84f38675dc89,3f3bd98f-9a9e-4adf-81d5-0b572f109166";
    private final String listId = "b32f9c6e-1de4-468b-bbbd-9882af8c09fd";

    // O C# usava "$select=*", então passamos "*" aqui para buscar tudo
    private final String SELECT_FIELDS = "*";

    // ==========================================
    // READ (Todas as Unidades)
    // ==========================================
    public List<UnidadeDTO> getAllUnidades() {
        List<Map<String, Object>> rawUnidades = graphRepository.getListItems(siteId, listId, SELECT_FIELDS);

        return rawUnidades.stream()
                .map(map -> objectMapper.convertValue(map, UnidadeDTO.class))
                .collect(Collectors.toList());
    }
}