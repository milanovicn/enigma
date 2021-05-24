package enigma.dictionary.repository;

import enigma.dictionary.model.Tag;
import enigma.dictionary.model.Team;
import enigma.dictionary.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Tag findTagByName(String name);
}
