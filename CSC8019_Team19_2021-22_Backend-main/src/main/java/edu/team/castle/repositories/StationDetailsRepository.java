package edu.team.castle.repositories;

import edu.team.castle.entities.StationDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

/**
 * @author: Joel George Panicker
 * @desc: Interface that extends JPA Repository that is used to extract data for StationDetails class
 */
public interface StationDetailsRepository  extends JpaRepository<StationDetails, Long> {

    /**
     * @author: Joel George Panicker
     * @desc: Hibernate Query for fetching ordered collection of stations by name that has activeStatus set as 'Y'
     */
    @Query("FROM StationDetails as s where s.activeStatus='Y' and (s.type='ST' OR s.type='SB') ORDER BY s.stationName")
    Collection<StationDetails> getStationList();

    /**
     * @author: Joel George Panicker
     * @desc: For fetching details of station by station id as input parameter
     */
    @Query("FROM StationDetails as s where s.id=:stationId")
    StationDetails findByStationId(@Param("stationId") Long stationId);
}
