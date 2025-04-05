package com.dut.backend.annotation.validation;

import com.dut.backend.common.constant.CommonConstants;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.ReportAsSingleViolation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {})
@NotBlank
@NotNull
@Length(min = 8, max = 32)
@Pattern(regexp = CommonConstants.PASSWORD_REGEXP_PATTERN)
@ReportAsSingleViolation
@NotNull
public @interface PasswordValidation {
    String message() default "Mật khẩu là bắt buộc. Mật khẩu phải từ 8 đến 32 ký tự, chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 ký tự số.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
