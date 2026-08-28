package com.phsbrasil.formulariomaquinas;

import com.microsoft.graph.serviceclient.GraphServiceClient;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
@ActiveProfiles("test")
class FormularioMaquinasApplicationTests {

	// Sem chamadas reais ao Azure/Graph durante o teste de contexto.
	@MockitoBean
	GraphServiceClient graphServiceClient;

	@Test
	void contextLoads() {
	}

}
