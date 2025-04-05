package com.dut.backend.common.constant;

public final class ErrorMessageConstants {

    public static final String INTERNAL_SERVER_ERROR_CODE = "ERR_SER0101";
    public static final String BAD_REQUEST_ERROR_CODE = "ERR_SER0102";

    /**
     * Common
     */
    public static final String INTERNAL_SERVER_ERROR = "internal_server_error";
    public static final String PAGE_NOT_FOUND = "page_not_found";
    public static final String FORBIDDEN = "forbidden";
    public static final String UNAUTHORIZED = "unauthorized";
    public static final String ACTION_IS_NOT_ALLOWED = "action_is_not_allowed";


    /**
     * File
     */
    public static final String UPLOAD_FILE_FAILED = "upload_file_failed";
    public static final String FILE_NOT_FOUND = "file_not_found";
    public static final String DELETE_FILE_FAILED = "delete_file_failed";
    public static final String FILE_SIZE_LIMIT_EXCEEDED = "file_size_limit_exceeded";
    public static final String SAVE_FILE_FAILED = "save_file_failed";

    /**
     * Authentication
     */
    public static final String API_KEY_IS_REQUIRED = "api_key_is_required";
    public static final String API_KEY_NOT_MATCH = "api_key_not_match";
    public static final String INVALID_TOKEN = "invalid_token";
    public static final String EXPIRED_TOKEN = "expired_token";
    public static final String REVOKED_TOKEN = "revoked_token";
    public static final String INVALID_REFRESH_TOKEN = "invalid_refresh_token";
    public static final String EXPIRED_REFRESH_TOKEN = "expired_refresh_token";
    public static final String REVOKED_REFRESH_TOKEN = "revoked_refresh_token";
    public static final String REFRESH_TOKEN_NOT_FOUND = "refresh_token_not_found";
    public static final String ACCOUNT_IS_ACTIVE = "account_is_active";
    public static final String ACCOUNT_IS_NOT_ACTIVE = "account_is_not_active";
    public static final String USERNAME_ALREADY_EXISTS = "username_already_exists";
    public static final String EMAIL_ALREADY_EXISTS = "email_already_exists";
    public static final String CONFIRM_PASSWORD_NOT_MATCHING = "confirm_password_not_matching";

    /**
     * Account
     */
    public static final String ACCOUNT_NOT_FOUND = "account_not_found";
    public static final String INCORRECT_EMAIL_OR_PASSWORD = "incorrect_email_or_password";
    public static final String ACCOUNT_IS_DISABLED = "account_is_disabled";
    public static final String ACCOUNT_ID_IS_REQUIRED = "account_id_is_required";
    public static final String ACCOUNT_IS_NOT_AVAILABLE = "account_is_not_available";
    public static final String ACCOUNT_SAVE_FAILED = "account_save_failed";
    public static final String ACCOUNT_WAITING_FOR_APPROVAL = "account_waiting_for_approval";
    public static final String ACCOUNT_APPROVAL_FAILED = "account_approval_failed";

    /**
     * Shopping Cart
     */
    public static final String CART_NOT_FOUND = "shopping_cart_not_found";
    public static final String ITEM_NOT_FOUND = "item_not_found";

    /**
     * Restaurant
     */
    public static final String RESTAURANT_NOT_FOUND = "restaurant_not_found";

    /**
     * Payment
     */
    public static final String ADDRESS_INVALID = "address_invalid";

    /**
     * Item
     */
    public static final String ITEM_NAME_EXISTED = "item_name_existed";
    public static final String iTEM_SAVE_FAILED = "item_save_failed";

    private ErrorMessageConstants() {
    }
}
