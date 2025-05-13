package com.dut.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pets")
public class Pet extends EntityBase {
    private String name;
    private String breed;
    private String image;
    private Integer difficulty;
    private String behavior;
    private Integer ferocious;
    private Integer space;
    private Integer group;
    private String description;
    @OneToMany(mappedBy = "pet", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<PetDetail> petDetails;

}
