package org.acme.oauthorizeme;

public class GitHubTokenRequest {
    public String client_id;
    public String client_secret;
    public String code;

    public GitHubTokenRequest() {}

    public GitHubTokenRequest(String clientId, String clientSecret, String code) {
        this.client_id = clientId;
        this.client_secret = clientSecret;
        this.code = code;
    }
    
}
