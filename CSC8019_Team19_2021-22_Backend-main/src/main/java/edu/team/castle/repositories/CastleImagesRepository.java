package edu.team.castle.repositories;

import edu.team.castle.entities.CastleImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

/**
 * @author: Joel George Panicker
 * @desc: Interface that extends JPA Repository that is used to extract data for CastleImages class
 */
public interface CastleImagesRepository  extends JpaRepository<CastleImages, Long> {

    /**
     * @author: Joel George Panicker
     * @desc: For fetching list of castleImages by castle id as input parameter
     */
    Collection<CastleImages> findByCastleDetailsCastleId(Long castleId);
}
