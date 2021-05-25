package enigma.dictionary.service;

import enigma.dictionary.model.Link;
import enigma.dictionary.model.Term;

import java.util.List;

public interface LinkService {

    public List<Link> getByTermId(Long termId);
    public Link transformToModel(String link, Term term);
    public boolean deleteLinkByTermId(Integer termId);

}
