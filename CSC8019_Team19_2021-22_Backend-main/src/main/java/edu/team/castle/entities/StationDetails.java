package edu.team.castle.entities;

import lombok.Data;

import javax.persistence.*;

/**
 * @author: Joel George Panicker
 * @desc: Entity Class that maps the table 'station_details' in MySQL database
 */
@Entity
@Table(name = "station_details", schema = "c1044979")
@Data
public class StationDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "station_id")
    private Long id;

    @Column(name = "station_name")
    private String stationName;

    @Column(name = "station_description")
    private String stationDescription;

    @Column(name = "address")
    private String address;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "type")
    private String type;

    @Column(name = "active_status")
    private Character activeStatus;

    @Transient
    private String idEncrypted;
}
