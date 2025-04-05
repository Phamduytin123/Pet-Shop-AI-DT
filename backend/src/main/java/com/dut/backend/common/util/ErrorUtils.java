package com.dut.backend.common.util;
import com.dut.backend.common.exception.InvalidDataException;
import com.dut.backend.common.model.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.Objects;
import java.util.Set;

@Slf4j
public final class ErrorUtils {

    private static final String ERROR_FILE = "errors.yml";
    private static final String VALIDATION_FILE = "validations.yml";

    public static String convertToJSONString(Object ob) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(ob);
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    /**
     * Extract exception error
     *
     * @param error String error
     * @return ErrorResponse
     */
    @SuppressWarnings("unchecked")
    public static ErrorResponse getExceptionError(String error) {
        Map<String, Object> errors = CommonUtils.getValueFromYAMLFile(ERROR_FILE);
        Map<String, Object> objError = (Map<String, Object>) errors.get(error);
        String code = (String) objError.get("code");
        String message = (String) objError.get("message");
        return new ErrorResponse(code, message);
    }

    /**
     * Extract validation error
     *
     * @param resource  file error
     * @param fieldName field error
     * @param error     String error
     * @return ErrorResponse
     */
    @SuppressWarnings("unchecked")
    public static ErrorResponse getValidationError(String resource, String fieldName, String error) {
        if (fieldName.contains("[")) {
            fieldName = handleFieldName(fieldName);
        }
        Map<String, Object> errors = CommonUtils.getValueFromYAMLFile(VALIDATION_FILE);
        Map<String, Object> fields = (Map<String, Object>) errors.get(resource);
        if (fields == null)
            return null;
        Map<String, Object> objErrors = (Map<String, Object>) Objects.requireNonNull(fields).get(fieldName);
        Map<String, Object> objError = (Map<String, Object>) objErrors.get(error);
        if (objError == null)
            return null;
        String code = (String) Objects.requireNonNull(objError).get("code");
        String message = (String) objError.get("message");
        return new ErrorResponse(code, message);
    }

    public static void checkConstraintViolation(Set<ConstraintViolation<Object>> violations) {
        if (violations != null && !violations.isEmpty()) {
            throw Objects.requireNonNull(getInvalidDataException(violations));
        }
    }

    public static InvalidDataException getInvalidDataException(Set<ConstraintViolation<Object>> violations) {
        if (violations.isEmpty()) return null;
        ConstraintViolation<Object> violation = violations.iterator().next();
        String fieldName = CommonUtils.Naming.convertToSnakeCase(violation.getPropertyPath().toString());
        String resource = CommonUtils.Naming.convertToSnakeCase(violation.getRootBeanClass().getSimpleName());
        String[] arr = violation.getMessageTemplate().split("\\.");
        String error = CommonUtils.Naming.convertToSnakeCase(arr[arr.length - 2]);
        return new InvalidDataException(resource, fieldName, error);
    }

    private static String handleFieldName(String fieldName) {
        String index = fieldName.substring(fieldName.indexOf("[") + 1, fieldName.indexOf("]"));
        return fieldName.replaceAll(index, "");
    }

    private ErrorUtils() {
    }
}
