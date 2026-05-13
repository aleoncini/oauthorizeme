package org.acme.oauthorizeme;

import jakarta.inject.Singleton;

public class Settings {

    public String grant_type;
    public String client_id;
    public String client_secret;
    public String code;
    public String redirect_uri;

    public Settings(){
    }

}
