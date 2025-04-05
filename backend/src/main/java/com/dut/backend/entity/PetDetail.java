package com.dut.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pet_details")
public class PetDetail  extends ItemBase{
    private String color;
    private Integer age;
    private boolean gender;
    private LocalDate dateTime;
    private String heathStatus;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id", referencedColumnName = "id")
//    @JsonBackReference
    private Pet pet;

}
