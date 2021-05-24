package enigma.dictionary.service;

import enigma.dictionary.dto.TagDTO;
import enigma.dictionary.dto.TermDTO;
import enigma.dictionary.model.Tag;

import java.util.ArrayList;

public interface TagService {

    public TagDTO getById(long tagID);
    public ArrayList<Tag> getAll();
    public TagDTO transformToDTO(Tag tag);
    public Tag transformToModel(TagDTO tagDTO);
    public boolean createTag(TagDTO tagDTO);
}
