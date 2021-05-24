package enigma.dictionary.controller;

import enigma.dictionary.dto.TermDTO;
import enigma.dictionary.model.Term;
import enigma.dictionary.service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/dictionary/term")
public class TermController {
    @Autowired
    private TermService termService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAllCollections(@Context HttpServletRequest request) {
        ArrayList<Term> terms = (ArrayList<Term>) termService.getAll();
        ArrayList<TermDTO> termsDTO = new ArrayList<TermDTO>();
        for(Term term : terms){
            termsDTO.add(termService.transformToDTO(term));
        }
        return new ResponseEntity< ArrayList<TermDTO>>(termsDTO, HttpStatus.OK);
    }

    @PostMapping(value = "")
    public ResponseEntity<?> createTerm(@RequestBody TermDTO termDTO, @Context HttpServletRequest request) {
        boolean created = termService.createTerm(termDTO);
        if(created) {
            return new ResponseEntity<>("{\"response\":\"Term saved successfully\", \"status\":\"true\"}", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("{\"response\":\"Error! Term with this name already exists\" ,\"status\":\"false\"}", HttpStatus.OK);
        }

    }

    @DeleteMapping(value = "")
    public ResponseEntity<?> deleteTerm(@RequestBody Integer teamId, @Context HttpServletRequest request) {
        boolean deleted = termService.deleteTerm(teamId);
        if(deleted) {
            return new ResponseEntity<>("{\"response\":\"Term removed\", \"status\":\"true\"}", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("{\"response\":\"Term wasn't removed\" ,\"status\":\"false\"}", HttpStatus.OK);
        }

    }

    @PutMapping(value = "")
    public ResponseEntity<?> updateTerm(@RequestBody TermDTO termDTO, @Context HttpServletRequest request) {
        boolean created = termService.updateTerm(termDTO);
        if(created) {
            return new ResponseEntity<>("{\"response\":\"Term updated successfully\", \"status\":\"true\"}", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("{\"response\":\"Error! Term with this name already exists\" ,\"status\":\"false\"}", HttpStatus.OK);
        }

    }
}
