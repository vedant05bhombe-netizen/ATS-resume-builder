package com.example.hollowpurple;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class HollowpurpleApplication {

    public static void main(String[] args) {
        SpringApplication.run(HollowpurpleApplication.class, args);
    }

    // Required for calling Groq API
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    // Global CORS configuration
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                                "http://localhost:5175",    // your local React app
                                "http://localhost:3000",    // optional
                                "https://hollowpurplex.netlify.app" // optional
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // include OPTIONS!
                        .allowedHeaders("*");
            }
        };
    }

};
