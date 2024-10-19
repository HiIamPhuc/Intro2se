package com.suika.englishlearning.model.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDto {
    private String userName;
    private String email;
    private String role;
    private String tokenType = "Bearer ";

    public AuthResponseDto(String userName, String email, String role) {
        this.userName = userName;
        this.email = email;
        this.role = role;
    }
}
