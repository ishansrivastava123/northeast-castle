package edu.team.castle.repositories;

import edu.team.castle.entities.CastleDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

/**
 * @author: Joel George Panicker
 * @desc: Interface that extends JPA Repository that is used to extract data for CastleDetails class
 */
@Repository
public interface CastleDetailsRepository  extends JpaRepository<CastleDetails, Long> {

    /**
     * @author: Joel George Panicker
     * @desc: Hibernate Query for fetching ordered collection of castles by name that has activeStatus set as 'Y'
     */
    @Query("FROM CastleDetails as c where c.activeStatus='Y' ORDER BY c.castleName")
    Collection<CastleDetails> getCastleList();

    /**
     * @author: Joel George Panicker
     * @desc: For fetching details of castle by castle id as input parameter
     */
    CastleDetails findByCastleId(Long castleId);
}