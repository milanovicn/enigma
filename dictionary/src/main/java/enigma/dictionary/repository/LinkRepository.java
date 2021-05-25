package enigma.dictionary.repository;

import enigma.dictionary.model.Link;
import enigma.dictionary.model.Tag;
import enigma.dictionary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LinkRepository extends JpaRepository<Link, Long> {

}
