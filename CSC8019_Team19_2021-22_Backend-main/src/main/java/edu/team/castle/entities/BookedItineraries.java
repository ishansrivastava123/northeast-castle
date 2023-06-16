package edu.team.castle.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import javax.persistence.*;
import java.util.Date;

/**
 * @author: Joel George Panicker
 * @desc: Entity Class that maps the table 'booked_itineraries' in MySQL database
 */
@Entity
@Table(name = "booked_itineraries", schema = "c1044979")
@Data
public class BookedItineraries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(targetEntity = Itineraries.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "itinerary_id")
    @JsonBackReference
    private Itineraries itineraryId;

    @ManyToOne(targetEntity = CustomerDetails.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    @JsonBackReference
    private CustomerDetails customerId;

    @Column(name = "date_of_travel")
    private Date dateOfTravel;

    @Transient
    private String idEncrypted;

    @Transient
    private String castleName;

    @Transient
    private String startingStation;

    @Transient
    private String dateOfTravelStr;
}
