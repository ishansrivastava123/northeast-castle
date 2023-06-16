package edu.team.castle.entities;
import javax.persistence.*;

import lombok.Data;

/**
 * @author: Joel George Panicker
 * @desc: Entity Class that maps the table 'customer_details' in MySQL database
 */
@Entity
@Table(name = "customer_details", schema = "c1044979")
@Data
public class CustomerDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "sur_name")
    private String surName;

    @Column(name = "phone_no")
    private String mobileNo;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Transient
    private String idEncrypted;

    @Transient
    private String errorFlag;
}
