package org.acme.oauthorizeme;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Path("/oauth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class OAuthResource {

    @ConfigProperty(name = "github.client-id")
    String clientId;

    @ConfigProperty(name = "github.client-secret")
    String clientSecret;

    @Inject
    GitHubClient gitHubClient;

    @POST
    @Path("/github")
    public GitHubTokenResponse exchangeCode(String code) {

        GitHubTokenRequest request =
            new GitHubTokenRequest(clientId, clientSecret, code);

        return gitHubClient.getAccessToken(request);
    }
}