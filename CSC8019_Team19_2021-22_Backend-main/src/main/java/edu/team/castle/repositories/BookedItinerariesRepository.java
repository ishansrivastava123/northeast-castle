package edu.team.castle.repositories;

import edu.team.castle.entities.BookedItineraries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

/**
 * @author: Joel George Panicker
 * @desc: Interface that extends JPA Repository that is used to extract data for BookedItineraries class
 */
public interface BookedItinerariesRepository extends JpaRepository<BookedItineraries, Long> {

    /**
     * @author: Joel George Panicker
     * @desc: Hibernate Query for fetching booked itineraries from customer id as input param
     */
    @Query("FROM BookedItineraries as b where b.customerId.id=:customerId ORDER BY b.dateOfTravel DESC")
    Collection<BookedItineraries> findByCustomerId(@Param("customerId") long customerId);
}
