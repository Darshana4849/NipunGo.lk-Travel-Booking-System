package com.nipungo.constant;

public final class AppConstants {

    private AppConstants() {}

    public static final int DEFAULT_PAGE_NUMBER = 0;
    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final String DEFAULT_SORT_BY = "id";
    public static final String DEFAULT_SORT_DIR = "asc";

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";

    public static final String USER_NOT_FOUND = "User not found with id: ";
    public static final String DESTINATION_NOT_FOUND = "Destination not found with id: ";
    public static final String HOTEL_NOT_FOUND = "Hotel not found with id: ";
    public static final String PACKAGE_NOT_FOUND = "Package not found with id: ";
    public static final String BOOKING_NOT_FOUND = "Booking not found with id: ";
    public static final String REVIEW_NOT_FOUND = "Review not found with id: ";
    public static final String EMAIL_ALREADY_EXISTS = "Email is already registered: ";
}
