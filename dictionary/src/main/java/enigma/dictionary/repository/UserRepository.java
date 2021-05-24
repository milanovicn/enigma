package enigma.dictionary.repository;

import enigma.dictionary.model.Term;
import enigma.dictionary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByeNumber(String eNumber);
}
