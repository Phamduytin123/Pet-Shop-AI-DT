package com.dut.backend.common.model;

import com.dut.backend.annotation.json.JsonDateFormat;
import com.dut.backend.annotation.json.JsonSnakeCaseNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@JsonSnakeCaseNaming
public abstract class AbstractDTO<T> {
    private Long id;
    @JsonDateFormat
    private Timestamp createdAt;
    @JsonDateFormat
    private Timestamp updatedAt;
    @JsonDateFormat
    private Timestamp deletedAt;

    public abstract AbstractDTO<T> fromEntity(T entity);
}
