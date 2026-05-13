package org.acme.oauthorizeme;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.MultivaluedMap;
import jakarta.ws.rs.core.MultivaluedHashMap;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import java.util.logging.Logger;

@Path("/oauth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class OAuthResource {

    private static final Logger log = Logger.getLogger("OAuthorizeMe");

    @Inject
    @RestClient
    GitHubClient gitHubClient;

    @POST
    @Path("/github")
    public GitHubTokenResponse exchangeCode(@QueryParam("id") String id, @QueryParam("secret") String secret, @QueryParam("code") String code) {
        log.info("[OAuthResource] going to exchange the token...");

        MultivaluedMap<String, String> form = new MultivaluedHashMap<>();

        form.add("grant_type", "authorization_code");
        form.add("client_id", id);
        form.add("client_secret", secret);
        form.add("code", code);

        log.info("[OAuthResource] passing: " + form.toString());

        return gitHubClient.getAccessToken(form);
    }
}