package enigma.dictionary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import enigma.dictionary.dto.TermDTO;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long term_ID;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "details", nullable = false, length = 5000)
    private String details;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Team team;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Tag> tags = new ArrayList<>();

    public Term() {
    }



    public Term(String title, String description, String details, Team team) {
        this.title = title;
        this.description = description;
        this.details = details;
        this.team = team;
    }

    public Long getTermID() {
        return term_ID;
    }

    public void setTermID(Long termID) {
        this.term_ID = termID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

}
