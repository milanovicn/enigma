package enigma.dictionary.model;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_ID;

    @Column(name = "eNumber", nullable = false)
    private String eNumber;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "isAdmin", nullable = false)
    private boolean isAdmin;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Team team;

    public User() {
    }

    public User(String eNumber, String password, String email, String name, String surname, boolean isAdmin, Team team) {
        this.eNumber = eNumber;
        this.password = password;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.isAdmin = isAdmin;
        this.team = team;
    }

    public Long getUserID() {
        return user_ID;
    }

    public void setUserID(Long userID) {
        this.user_ID = userID;
    }

    public String geteNumber() {
        return eNumber;
    }

    public void seteNumber(String eNumber) {
        this.eNumber = eNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}
