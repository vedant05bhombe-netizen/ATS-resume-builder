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

    // ADD THIS BEAN - Required for calling Groq API
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    // ADD THIS BEAN - For CORS (allows frontend to call your API)
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000", "http://localhost:5173", "*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false);
            }
        };
    }
}