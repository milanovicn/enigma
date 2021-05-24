package enigma.dictionary.dto;

import javax.persistence.Column;
import java.util.ArrayList;

public class TagDTO {

    private Long tag_ID;
    private String name;

    public TagDTO() {
    }

    public TagDTO(Long tag_ID, String name) {
        this.tag_ID = tag_ID;
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
