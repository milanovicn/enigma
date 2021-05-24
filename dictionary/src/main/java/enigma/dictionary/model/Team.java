package enigma.dictionary.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long team_ID;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<User> user = new ArrayList<User>();

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Term> term = new ArrayList<Term>();

    public Team() {

    }

    public Team(String name) {
        this.name = name;
    }

    public Long getTeamID() {
        return team_ID;
    }

    public void setTeamID(Long teamID) {
        this.team_ID = teamID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }

    public List<Term> getTerm() {
        return term;
    }

    public void setTerm(List<Term> term) {
        this.term = term;
    }
}
