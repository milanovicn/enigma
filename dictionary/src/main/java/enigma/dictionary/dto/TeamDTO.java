package enigma.dictionary.dto;

import enigma.dictionary.model.Team;

import javax.persistence.Column;
import java.util.ArrayList;

public class TeamDTO {

    private Long team_ID;
    private String name;

    public TeamDTO() {
    }

    public TeamDTO(Long team_ID, String name) {
        this.team_ID = team_ID;
        this.name = name;
    }

    public Long getTeam_ID() {
        return team_ID;
    }

    public void setTeam_ID(Long team_ID) {
        this.team_ID = team_ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
