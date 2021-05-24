package enigma.dictionary.repository;

import enigma.dictionary.model.Team;
import enigma.dictionary.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

}
