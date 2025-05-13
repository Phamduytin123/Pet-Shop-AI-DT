package com.dut.backend.entity;

import com.dut.backend.entity.Enum.ItemType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
//@MappedSuperclass
//@EntityListeners(AuditingEntityListener.class)
@Inheritance(strategy = InheritanceType.JOINED) // hoặc SINGLE_TABLE, TABLE_PER_CLASS
@DiscriminatorColumn(name = "item_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "items")
public abstract class ItemBase extends EntityBase {
    private Integer price;
    private Integer quantity;
//    private ItemType typeValue;
}
