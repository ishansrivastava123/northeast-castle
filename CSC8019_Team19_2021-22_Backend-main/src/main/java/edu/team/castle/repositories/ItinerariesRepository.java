package edu.team.castle.repositories;

import edu.team.castle.entities.Itineraries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

/**
 * @author: Joel George Panicker
 * @desc: Interface that extends JPA Repository that is used to extract data for Itineraries class
 */
public interface ItinerariesRepository extends JpaRepository<Itineraries, Long> {

    /**
     * @author: Joel George Panicker
     * @desc: Hibernate query for fetching list of itineraries according to the input parameters
     */
    @Query("FROM Itineraries as i where i.maxPeople=:maxPeople and i.castleId.castleId=:castleId and i.routeId.id IN (:routeIds) ORDER BY i.id")
    Collection<Itineraries> getItinerariesByParameters(@Param("maxPeople") int maxPeople, @Param("castleId") long castleId, @Param("routeIds") Collection<Long> routeIds);

    /**
     * @author: Joel George Panicker
     * @desc: Hibernate query for fetching list of itineraries which has a list of itinerary Ids as input parameter
     */
    @Query("FROM Itineraries as i where i.id IN (:itinerariesIds) ORDER BY i.id")
    Collection<Itineraries> getItinerariesByIds(@Param("itinerariesIds") List<Long> itinerariesIdList);
}
