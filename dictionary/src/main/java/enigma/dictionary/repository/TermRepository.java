package enigma.dictionary.repository;

import enigma.dictionary.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TermRepository extends JpaRepository<Term, Long> {

    boolean findTermByTitle(String title);


}
