package com.dut.backend.entity;

import com.dut.backend.entity.Enum.AccountRole;
import com.dut.backend.entity.Enum.ProductType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("PRODUCT")
@Table(name = "pet_products")
public class PetProduct extends ItemBase{
    private String name;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductType type;
    private String image;
    private String description;
}
