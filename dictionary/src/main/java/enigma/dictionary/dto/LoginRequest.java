package enigma.dictionary.dto;

public class LoginRequest {
    private  String credentials;
    private  String password;

    public String getCredentials() {
        return credentials;
    }

    public void setCredentials(String email) {
        this.credentials = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LoginRequest(String credentials, String password) {
        this.credentials = credentials;
        this.password = password;
    }

    public LoginRequest() {
    }
}
