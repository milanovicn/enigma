package enigma.dictionary.model;

import javax.persistence.*;

@Entity
public class Link {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long link_ID;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Term term;

    public Link() {
    }

    public Link(String name, Term term) {
        this.name = name;
        this.term = term;
    }

    public Long getLink_ID() {
        return link_ID;
    }

    public void setLink_ID(Long link_ID) {
        this.link_ID = link_ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Term getTerm() {
        return term;
    }

    public void setTerm(Term term) {
        this.term = term;
    }


}
