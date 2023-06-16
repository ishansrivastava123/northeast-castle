package edu.team.castle.entities;

import lombok.Data;

import javax.persistence.*;

/**
 * @author: Joel George Panicker
 * @desc: Entity Class that maps the table 'transport_details' in MySQL database
 */
@Entity
@Table(name = "transport_details", schema = "c1044979")
@Data
public class TransportDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transport_id")
    private Long id;

    @Column(name = "transport_name")
    private String transportName;

    @Column(name = "operator")
    private String operator;

    @Column(name = "type")
    private String type;
}
