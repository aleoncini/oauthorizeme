package org.acme.oauthorizeme;

public class GitHubTokenResponse {
    public String access_token;
    public String scope;
    public String token_type;

    @Override
    public String toString(){
        return "{\"Access_token\":\"" + access_token + "\",\"scope\":\"" + scope + "\",\"token_type\":\"" + token_type + "\"}";
    }
}