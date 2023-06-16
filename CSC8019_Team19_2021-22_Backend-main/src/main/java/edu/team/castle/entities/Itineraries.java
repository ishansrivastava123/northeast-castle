package edu.team.castle.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * @author: Joel George Panicker
 * @desc: Entity Class that maps the table 'itineraries' in MySQL database
 */
@Entity
@Table(name = "itineraries", schema = "c1044979")
@Data
public class Itineraries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "itinerary_Id")
    private Long id;

    @ManyToOne(targetEntity = RouteDetails.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "route_id")
    @JsonBackReference
    private RouteDetails routeId;

    @ManyToOne(targetEntity = CastleDetails.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "castle_id")
    @JsonBackReference
    private CastleDetails castleId;

    @Column(name = "itinerary_details")
    private String itineraryDetails;

    @Column(name = "max_people")
    private Integer maxPeople;

    @Column(name = "additional_price")
    private Double additionalPrice;

    @ManyToOne(targetEntity = RouteDetails.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "return_id")
    @JsonBackReference
    private RouteDetails returnId;

    @Column(name = "start_time")
    private Date startTime;

    @Transient
    private double totalPrice;

    @Transient
    private String duration;

    @Transient
    private String idEncrypted;
}
