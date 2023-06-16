package edu.team.castle.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

/**
 * @author: Joel George Panicker
 * @desc: Entity Class that maps the table 'route_mapping' in MySQL database
 */
@Entity
@Table(name = "route_mapping", schema = "c1044979")
@Data
public class RouteMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(targetEntity = RouteDetails.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "route_id")
    @JsonBackReference
    private RouteDetails routeId;

    @Column(name = "day_of_week")
    private Integer dayOfWeek;
}
