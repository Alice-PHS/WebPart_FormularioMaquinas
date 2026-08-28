package com.phsbrasil.formulariomaquinas.MicrosoftGraph;

import com.microsoft.graph.models.BodyType;
import com.microsoft.graph.models.EmailAddress;
import com.microsoft.graph.models.ItemBody;
import com.microsoft.graph.models.Message;
import com.microsoft.graph.models.Recipient;
import com.microsoft.graph.serviceclient.GraphServiceClient;
import com.microsoft.graph.users.item.sendmail.SendMailPostRequestBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Envio de e-mail via Microsoft Graph (POST /users/{from}/sendMail).
 * Substitui a acao "Enviar_um_email_(V2)" (Office 365 Outlook) do flow.
 * Requer permissao de aplicacao Mail.Send na caixa `phs.mail.from`.
 */
@Service
public class GraphMailService {

    private static final Logger log = LoggerFactory.getLogger(GraphMailService.class);

    private final GraphServiceClient graphClient;

    @Value("${phs.mail.from:}")
    private String from;

    public GraphMailService(GraphServiceClient graphClient) {
        this.graphClient = graphClient;
    }

    /** Envia HTML. Falha de e-mail e apenas logada (o flow ja respondeu ao front antes de enviar). */
    public void enviarHtml(String destinatario, String assunto, String html) {
        if (from == null || from.isBlank() || destinatario == null || destinatario.isBlank()) {
            log.warn("E-mail nao enviado: phs.mail.from ou destinatario ausente (assunto: {})", assunto);
            return;
        }

        try {
            Message message = new Message();
            message.setSubject(assunto);

            ItemBody body = new ItemBody();
            body.setContentType(BodyType.Html);
            body.setContent(html);
            message.setBody(body);

            Recipient recipient = new Recipient();
            EmailAddress endereco = new EmailAddress();
            endereco.setAddress(destinatario);
            recipient.setEmailAddress(endereco);
            message.setToRecipients(List.of(recipient));

            SendMailPostRequestBody req = new SendMailPostRequestBody();
            req.setMessage(message);
            req.setSaveToSentItems(false);

            graphClient.users().byUserId(from).sendMail().post(req);
        } catch (Exception e) {
            log.error("Falha ao enviar e-mail via Graph (assunto: {}): {}", assunto, e.getMessage());
        }
    }
}
