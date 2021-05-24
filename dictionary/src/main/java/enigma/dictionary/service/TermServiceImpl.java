package enigma.dictionary.service;

import enigma.dictionary.dto.TagDTO;
import enigma.dictionary.dto.TeamDTO;
import enigma.dictionary.dto.TermDTO;
import enigma.dictionary.model.Tag;
import enigma.dictionary.model.Team;
import enigma.dictionary.model.Term;
import enigma.dictionary.repository.TermRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TermServiceImpl implements TermService {

    @Autowired
    private TermRepository termRepository;
    @Autowired
    private TeamService teamService;
    @Autowired
    private TagService tagService;

    @Autowired
    private EntityManager em;

    @Override
    public List<Term> getAll() {
        return termRepository.findAll();
    }

    @Override
    public List<Term> getByTag(Tag tag){
        List<Term> ret= new ArrayList<Term>();
        for (Term term: termRepository.findAll()
        ) {
            if(term.getTags().contains(tag)) ret.add(term);
        }
        return ret;
    }

    @Override
    public List<Term> getByTeam(Team team){
        List<Term> ret = new ArrayList<Term>();
        for (Term term: termRepository.findAll()) {
            if(term.getTeam().equals(team)) ret.add(term);
        }
        return ret;
    }

    @Override
    public boolean createTerm(TermDTO termDTO) {
        Term t = new Term();
        //t.setTermID(termDTO.getTerm_ID());
        t.setDescription(termDTO.getDescription());
        t.setDetails(termDTO.getDetails());
        List<Tag> tags = new ArrayList<Tag>();
        for(TagDTO tag : termDTO.getTags()) {
            Tag a = tagService.transformToModel(tag);
            tags.add(a);
        }
        t.setTags(tags);
        t.setTeam(teamService.transformToModel(termDTO.getTeam()));
        t.setTitle(termDTO.getTitle());
        if (termRepository.findTermByTitle(t.getTitle())==null){

            termRepository.save(t);
            return true;
        }
        else return false;

    }

    @Override
    public boolean deleteTerm(Integer termId) {
        if(termRepository.findTermById(termId.longValue()) != null)
            termRepository.deleteTermById(termId.longValue());
        else
            return false;
        if(termRepository.findTermById(termId.longValue()) == null){
            return true;
        } else {
            return false;
        }
    }

    @Override
    public TermDTO transformToDTO(Term term) {
        TeamDTO teamDTO = teamService.transformToDTO(term.getTeam());
        TermDTO termDTO = new TermDTO(term.getTermID(),term.getTitle(), term.getDescription(), term.getDetails(), teamDTO);

        for (Tag t:term.getTags()) {
            termDTO.getTags().add(tagService.transformToDTO(t));
        }
        return termDTO;
    }

    @Override
    public Term transformToModel(TermDTO termDTO) {
        return termRepository.findById(termDTO.getTerm_ID()).orElseGet(null);
    }
}
