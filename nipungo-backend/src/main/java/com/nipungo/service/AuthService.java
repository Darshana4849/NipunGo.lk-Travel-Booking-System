package com.nipungo.service;

import com.nipungo.dto.AuthResponse;
import com.nipungo.dto.LoginRequest;
import com.nipungo.dto.RefreshTokenRequest;
import com.nipungo.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refreshToken(RefreshTokenRequest request);
}
