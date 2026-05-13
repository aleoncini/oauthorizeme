package org.acme.oauthorizeme;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.MultivaluedMap;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Path("/login/oauth/access_token")
@RegisterRestClient(configKey = "github-api")
public interface GitHubClient {
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    GitHubTokenResponse getAccessToken(MultivaluedMap<String, String> form);
}
