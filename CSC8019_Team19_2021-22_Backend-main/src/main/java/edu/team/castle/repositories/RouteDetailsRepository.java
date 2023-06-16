package edu.team.castle.repositories;

import edu.team.castle.entities.RouteDetails;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author: Joel George Panicker
 * @desc: Interface that extends JPA Repository that is used to extract data for RouteDetails class
 */
public interface RouteDetailsRepository  extends JpaRepository<RouteDetails, Long> {
}
