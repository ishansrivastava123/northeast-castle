package edu.team.castle.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * @author: Joel George Panicker
 * @desc: Entity Class that maps the table 'route_details' in MySQL database
 */
@Entity
@Table(name = "route_details", schema = "c1044979")
@Data
public class RouteDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "route_id")
    private Long id;

    @ManyToOne(targetEntity = StationDetails.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "station_id")
    @JsonBackReference
    private StationDetails stationId;

    @ManyToOne(targetEntity = TransportDetails.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "transport_id")
    @JsonBackReference
    private TransportDetails transportId;

    @ManyToOne(targetEntity = StationDetails.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "destination")
    @JsonBackReference
    private StationDetails destination;

    @Column(name = "departure_time")
    private Date departureTime;

    @Column(name = "arrival_Time")
    private Date arrivalTime;

    @Column(name = "price")
    private Double price;
}
