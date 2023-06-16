package edu.team.castle.repositories;

import edu.team.castle.entities.TransportDetails;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author: Joel George Panicker
 * @desc: Interface that extends JPA Repository that is used to extract data for TransportDetails class
 */
public interface TransportDetailsRepository  extends JpaRepository<TransportDetails, Long> {

}
