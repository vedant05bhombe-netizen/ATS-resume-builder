package com.example.hollowpurple.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

// Response DTO
@Data
public class ResumeAnalysisResponse {
    @JsonProperty("overallScore")
    private Integer overallScore;

    @JsonProperty("scores")
    private Map<String, Integer> scores;

    @JsonProperty("strengths")
    private List<String> strengths;

    @JsonProperty("weaknesses")
    private List<String> weaknesses;

    @JsonProperty("suggestions")
    private List<String> suggestions;

    @JsonProperty("missingKeywords")
    private List<String> missingKeywords;

    @JsonProperty("summary")
    private String summary;
}
