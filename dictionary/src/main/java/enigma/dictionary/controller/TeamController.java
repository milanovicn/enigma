package enigma.dictionary.controller;

import enigma.dictionary.dto.TeamDTO;
import enigma.dictionary.model.Team;
import enigma.dictionary.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/dictionary/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAllTeams(@Context HttpServletRequest request) {
        ArrayList<Team> teams = (ArrayList<Team>) teamService.getAll();
        ArrayList<TeamDTO> teamsDTO = new ArrayList<TeamDTO>();
        for(Team team : teams){
            teamsDTO.add(teamService.transformToDTO(team));
        }

        return new ResponseEntity< ArrayList<TeamDTO>>(teamsDTO, HttpStatus.OK);
    }

}
