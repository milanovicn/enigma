package enigma.dictionary.repository;

import enigma.dictionary.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Optional;

public interface TermRepository extends JpaRepository<Term, Long> {

    Term findTermByTitle(String title);

    @Transactional
    @Modifying
    @Query("DELETE FROM Term t WHERE t.term_ID = :termId")
    void deleteTermById(@Param("termId") Long termId);

    @Query("SELECT t FROM Term t WHERE t.term_ID = :termId")
    Term findTermById(@Param("termId") Long termId);

}
