package enigma.dictionary.controller;

import enigma.dictionary.dto.TagDTO;
import enigma.dictionary.dto.TeamDTO;
import enigma.dictionary.dto.TermDTO;
import enigma.dictionary.model.Tag;
import enigma.dictionary.model.Team;
import enigma.dictionary.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/dictionary/tag")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAllTags(@Context HttpServletRequest request) {
        ArrayList<Tag> tags = (ArrayList<Tag>) tagService.getAll();
        ArrayList<TagDTO> tagsDTO = new ArrayList<TagDTO>();

        for(Tag tag : tags){
            tagsDTO.add(tagService.transformToDTO(tag));
        }

        return new ResponseEntity<ArrayList<TagDTO>>(tagsDTO, HttpStatus.OK);
    }

    @PostMapping(value = "/createTag")
    public ResponseEntity<?>  createTag(@RequestBody TagDTO tagDTO, @Context HttpServletRequest request) {
        boolean created = tagService.createTag(tagDTO);
        if(created) {
            return new ResponseEntity<>("{\"response\":\"Tag saved successfully\", \"status\":\"true\"}", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("{\"response\":\"Tag wasn't saved\" ,\"status\":\"false\"}", HttpStatus.OK);
        }

    }


}
