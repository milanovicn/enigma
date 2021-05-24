package enigma.dictionary.dto;

import java.util.ArrayList;
import java.util.List;
public class TermDTO {
    private Long term_ID;
    private String title;
    private String description;
    private String details;
    private TeamDTO team;
    private List<TagDTO> tags = new ArrayList<TagDTO>();


    public TermDTO(Long term_ID, String title, String description, String details, TeamDTO team) {
        this.term_ID = term_ID;
        this.title = title;
        this.description = description;
        this.details = details;
        this.team = team;
    }


    public Long getTerm_ID() {
        return term_ID;
    }
    public void setTerm_ID(Long term_ID) {
        this.term_ID = term_ID;
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

    public TeamDTO getTeam() {
        return team;
    }
    public void setTeam(TeamDTO team) {
        this.team = team;
    }

    public List<TagDTO> getTags() {
        return tags;
    }
    public void setTags(List<TagDTO> tags) {
        this.tags = tags;
    }

}