package enigma.dictionary.repository;

import org.springframework.beans.factory.annotation.Autowired;
import javax.persistence.EntityManager;
import javax.persistence.Query;

public abstract class TermRepositoryImpl implements TermRepository{

    @Autowired
    private EntityManager em;

    @Override
    public boolean findTermByTitle(String title) {

        Query query = em.createNativeQuery("SELECT * FROM term WHERE title= :title");
        query.setParameter("title", title);
        System.out.println(query.getFirstResult());
        return query.getFirstResult()>0;

    }
}
