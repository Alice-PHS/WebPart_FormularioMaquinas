package com.phsbrasil.formulariomaquinas.Configurations;

import com.azure.identity.ClientSecretCredentialBuilder;
import com.microsoft.graph.serviceclient.GraphServiceClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MicrosoftGraphConfig {
    @Value("${azure.client-id}") private String clientId;
    @Value("${azure.client-secret}") private String clientSecret;
    @Value("${azure.tenant-id}") private String tenantId;

    @Bean
    public GraphServiceClient graphServiceClient() {
        return new GraphServiceClient(new ClientSecretCredentialBuilder()
                .clientId(clientId).clientSecret(clientSecret).tenantId(tenantId).build());
    }
}
