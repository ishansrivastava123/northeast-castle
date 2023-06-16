package edu.team.castle.repositories;

import edu.team.castle.entities.CustomerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author: Joel George Panicker
 * @desc: Interface that extends JPA Repository that is used to extract data for CustomerDetails class
 */
@Repository
public interface CustomerDetailsRepository  extends JpaRepository<CustomerDetails, Long> {

    /**
     * @author: Joel George Panicker
     * @desc: For fetching details of a customer by email and password as input parameters
     */
    CustomerDetails findByEmailAndPassword(String email, String password);

    /**
     * @author: Joel George Panicker
     * @desc: For fetching details of a customer by email as input parameter
     */
    CustomerDetails findByEmail(String email);
}
