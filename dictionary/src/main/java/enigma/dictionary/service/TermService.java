package enigma.dictionary.service;

import enigma.dictionary.dto.TeamDTO;
import enigma.dictionary.dto.TermDTO;
import enigma.dictionary.model.Tag;
import enigma.dictionary.model.Team;
import enigma.dictionary.model.Term;

import java.util.List;

public interface TermService {

    public List<Term> getAll();
    public List<Term> getByTag(Tag tag);
    public TermDTO transformToDTO(Term term);
    public Term transformToModel(TermDTO termDTO);
    public List<Term> getByTeam(Team team);
    public boolean createTerm(TermDTO termDTO);

}
