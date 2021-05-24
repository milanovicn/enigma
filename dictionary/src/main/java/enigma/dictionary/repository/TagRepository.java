package enigma.dictionary.repository;

import enigma.dictionary.model.Tag;
import enigma.dictionary.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
