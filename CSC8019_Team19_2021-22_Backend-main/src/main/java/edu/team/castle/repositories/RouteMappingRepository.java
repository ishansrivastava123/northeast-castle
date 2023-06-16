package edu.team.castle.repositories;

import edu.team.castle.entities.RouteMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

/**
 * @author: Joel George Panicker
 * @desc: Interface that extends JPA Repository that is used to extract data for RouteMapping class
 */
public interface RouteMappingRepository extends JpaRepository<RouteMapping, Long> {

    /**
     * @author: Joel George Panicker
     * @desc: Hibernate query for fetching list of route Ids which has dayOfWeek and stationId as input parameters
     */
    @Query("SELECT r.routeId.id FROM RouteMapping as r where r.dayOfWeek=:dayOfWeek and r.routeId.stationId.id=:stationId ORDER BY r.id")
    Collection<Long> getRouteListByDayOfWeekAndStationId(@Param("dayOfWeek") int dayOfWeek, @Param("stationId") long stationId);
}
