package edu.team.castle.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * @author: Joel George Panicker
 * @desc: Entity Class that maps the table 'castle_details' in MySQL database
 */
@Entity
@Table(name = "castle_details", schema = "c1044979")
@Data
public class CastleDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "castle_id")
    private Long castleId;

    @Column(name = "castle_name")
    private String castleName;

    @Column(name = "opening_time")
    private Date openingTime;

    @Column(name = "closing_time")
    private Date closingTime;

    @Column(name = "ticket_prices")
    private Double ticketPrices;

    @Column(name = "castle_description")
    private String castleDescription;

    @Column(name = "active_status")
    private String activeStatus;

    @Column(name = "large_description")
    private String largeDescription;

    @Column(name = "things_to_do")
    private String thingsToDo;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "wheelchair_access")
    private String wheelchairAccess;

    @Column(name = "disabled_parking")
    private String disabledParking;

    @Transient
    private String idEncrypted;
}
