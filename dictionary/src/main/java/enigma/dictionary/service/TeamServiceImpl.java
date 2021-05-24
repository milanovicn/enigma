package enigma.dictionary.service;

import enigma.dictionary.dto.TeamDTO;
import enigma.dictionary.dto.TermDTO;
import enigma.dictionary.model.Team;
import enigma.dictionary.model.Term;
import enigma.dictionary.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TermService termService;

    @Override
    public List<Team> getAll() {
        return teamRepository.findAll();
    }

    @Override
    public TeamDTO transformToDTO(Team team) {
        TeamDTO teamDTO = new TeamDTO(team.getTeamID(), team.getName());
        return teamDTO;
    }

    @Override
    public Team transformToModel(TeamDTO teamDTO) {
        return teamRepository.findById(teamDTO.getTeam_ID()).orElseGet(null);
    }
}
