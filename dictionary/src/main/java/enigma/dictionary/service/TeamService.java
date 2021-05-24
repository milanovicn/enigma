package enigma.dictionary.service;

import enigma.dictionary.dto.TagDTO;
import enigma.dictionary.dto.TeamDTO;
import enigma.dictionary.model.Tag;
import enigma.dictionary.model.Team;

import java.util.List;

public interface TeamService {

    public List<Team> getAll();
    public TeamDTO transformToDTO(Team team);
    public Team transformToModel(TeamDTO teamDTO);

}
