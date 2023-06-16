package edu.team.castle.entities;

import lombok.Data;

import javax.persistence.*;

/**
 * @author: Joel George Panicker
 * @desc: Entity Class that maps the table 'castle_images' in MySQL database
 */
@Entity
@Table(name = "castle_images", schema = "c1044979")
@Data
public class CastleImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "castle_image_id")
    private Long castleImageId;

    @ManyToOne(targetEntity = CastleDetails.class, fetch = FetchType.EAGER)
    @JoinColumn(columnDefinition = "bigint", name = "castle_id")
    private CastleDetails castleDetails;

    @Column(name = "image_url")
    private String imageUrl;
}
