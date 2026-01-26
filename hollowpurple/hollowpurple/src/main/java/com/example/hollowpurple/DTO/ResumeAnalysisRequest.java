package com.example.hollowpurple.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

// Request DTO
@Data
public class ResumeAnalysisRequest {
    private MultipartFile file;
    private String jobDescription;
}

// Groq API DTOs
@Data
class GroqRequest {
    private String model;
    private List<GroqMessage> messages;
    private Double temperature;
    private Integer maxTokens;
}

@Data
class GroqMessage {
    private String role;
    private String content;
}

@Data
class GroqResponse {
    private List<GroqChoice> choices;
}

@Data
class GroqChoice {
    private GroqMessage message;
}