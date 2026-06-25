package com.nipungo.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String SECURITY_SCHEME_NAME = "bearerAuth";

    @Bean
    public OpenAPI nipungoOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("NIPUNGO Travel Booking API")
                        .description("NIPUNGO - Sri Lanka AI-Powered Travel Booking Platform\n\n" +
                                "**Plan. Book. Explore.**\n\n" +
                                "Complete REST API for the NIPUNGO travel booking system.\n\n" +
                                "**Authentication:** Use `/api/auth/login` to get a JWT token, " +
                                "then click **Authorize** and enter: `Bearer <your_token>`")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("NIPUNGO Team")
                                .email("hello@nipungo.lk")
                                .url("http://localhost:3000"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .addSecurityItem(new SecurityRequirement()
                        .addList(SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                new SecurityScheme()
                                        .name(SECURITY_SCHEME_NAME)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Enter JWT Bearer token")));
    }
}
