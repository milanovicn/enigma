package enigma.dictionary.repository;

import enigma.dictionary.model.Link;
import enigma.dictionary.model.Tag;
import enigma.dictionary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface LinkRepository extends JpaRepository<Link, Long> {

}
