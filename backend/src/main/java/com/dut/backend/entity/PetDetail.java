package com.dut.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("PET")
@Table(name = "pet_details")
//@SQLDelete(sql = "UPDATE items SET deleted_at = NOW() WHERE id = ?")
//@Where(clause = "id IN (SELECT id FROM items WHERE deleted_at IS NULL)")
public class PetDetail  extends ItemBase{
    private String name;
    private String color;
    private Integer age;
    private boolean gender;
    private String image;
    private String heathStatus;
    private LocalDate dateIn;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id", referencedColumnName = "id")
    @JsonBackReference
    private Pet pet;
    @Override
    public String getName() {
        return this.name+" "+this.color;
    }
    @Override
    public String getImage() {
        return this.image;
    }
}
