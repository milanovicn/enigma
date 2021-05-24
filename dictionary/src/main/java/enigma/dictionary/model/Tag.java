package enigma.dictionary.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tag_ID;

    @Column(name = "name", nullable = false)
    private String name;


    public Tag() {
    }

    public Tag(String name) {
        this.name = name;
    }

    public Long getTag_ID() {
        return tag_ID;
    }

    public void setTag_ID(Long tag_ID) {
        this.tag_ID = tag_ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



}
