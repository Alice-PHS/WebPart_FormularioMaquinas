package com.phsbrasil.formulariomaquinas.MicrosoftGraph;

import com.microsoft.graph.serviceclient.GraphServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class GraphApiWarmup {

    @Autowired
    private GraphServiceClient graphClient;

    // Executa automaticamente assim que a aplicação Spring Boot ficar "Ready"
    @Scheduled(fixedRate = 45 * 60 * 1000)
    public void warmUpGraphClient() {
        System.out.println("Aquecendo o Microsoft Graph Client e buscando Token inicial...");
        try {
            long start = System.currentTimeMillis();

            // Fazemos uma requisição extremamente leve só para forçar o handshake e o token.
            // Ex: Buscar apenas o ID do Tenant ou o Root do SharePoint
            graphClient.sites().bySiteId("root").get(requestConfig -> {
                requestConfig.queryParameters.select = new String[]{"id"};
            });

            long duration = System.currentTimeMillis() - start;
            System.out.println("Graph Client aquecido com sucesso em " + duration + "ms.");

        } catch (Exception e) {
            System.err.println("Falha ao aquecer Graph Client: " + e.getMessage());
        }
    }
}