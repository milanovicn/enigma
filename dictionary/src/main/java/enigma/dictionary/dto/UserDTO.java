package enigma.dictionary.dto;

public class UserDTO {
    private Long user_ID;
    private String eNumber;
    private String email;
    private String name;
    private String surname;
    private boolean isAdmin;
    private TeamDTO team;


    public UserDTO(Long user_ID, String eNumber, String email, String name, String surname, boolean isAdmin, TeamDTO team) {
        this.user_ID = user_ID;
        this.eNumber = eNumber;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.isAdmin = isAdmin;
        this.team = team;
    }


    public Long getUser_ID() {
        return user_ID;
    }
    public void setUser_ID(Long user_ID) {
        this.user_ID = user_ID;
    }

    public String geteNumber() {
        return eNumber;
    }
    public void seteNumber(String eNumber) {
        this.eNumber = eNumber;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getSurname() {
        return surname;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }
    public boolean isAdmin() {
        return isAdmin;
    }
    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
    public TeamDTO getTeam() {
        return team;
    }
    public void setTeam(TeamDTO team) {
        this.team = team;
    }


}