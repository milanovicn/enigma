package enigma.dictionary.service;

import enigma.dictionary.dto.TagDTO;
import enigma.dictionary.dto.TermDTO;
import enigma.dictionary.model.Tag;
import enigma.dictionary.model.Term;
import enigma.dictionary.repository.TagRepository;
import enigma.dictionary.repository.TermRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TermService termService;


    @Override
    public TagDTO getById(long tagID) {
        return null;
    }

    @Override
    public ArrayList<Tag> getAll() {
        return (ArrayList<Tag>) tagRepository.findAll();
    }

    @Override
    public TagDTO transformToDTO(Tag tag) {
        TagDTO tagDTO = new TagDTO(tag.getTag_ID(), tag.getName());

        return tagDTO;
    }

    @Override
    public Tag transformToModel(TagDTO tagDTO) {

        return tagRepository.findById(tagDTO.getTag_ID()).orElseGet(null);
    }

    @Override
    public boolean createTag(TagDTO tagDTO) {
        Tag t = new Tag();
        t.setName(tagDTO.getName());
        tagRepository.save(t);
        return tagRepository.findById(t.getTag_ID()).isPresent();
    }


}
