package enigma.dictionary.service;

import enigma.dictionary.model.Link;
import enigma.dictionary.model.Term;
import enigma.dictionary.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LinkServiceImpl implements LinkService {

    @Autowired
    private LinkRepository linkRepository;

    @Override
    public List<Link> getByTermId(Long termId) {

        ArrayList<Link> ret = new ArrayList<>();
        for (Link link : linkRepository.findAll() ) {
            if(link.getTerm().getTermID() == termId){
                ret.add(link);
            }
        }

        return ret;
    }


    @Override
    public Link transformToModel(String link, Term term) {
        Link newLink = new Link();
        newLink.setName(link);
        newLink.setTerm(term);
        linkRepository.save(newLink);
        return null;
    }

    @Override
    public boolean deleteLinkByTermId(Integer termId) {

        linkRepository.deleteLinkByTermId(termId.longValue());
        return true;
    }
}
