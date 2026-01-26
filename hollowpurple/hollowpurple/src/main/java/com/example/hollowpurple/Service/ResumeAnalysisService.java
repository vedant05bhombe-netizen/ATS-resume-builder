package com.example.hollowpurple.Service;

import com.example.hollowpurple.DTO.ResumeAnalysisRequest;
import com.example.hollowpurple.DTO.ResumeAnalysisResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeAnalysisService {

    private final RestTemplate restTemplate;
    private final ResumeParserService resumeParserService;
    private final ObjectMapper objectMapper;

    @Value("${groq.api.key}")
    private String groqApiKey;

    @Value("${groq.api.url:https://api.groq.com/openai/v1/chat/completions}")
    private String groqApiUrl;

    @Value("${groq.model:llama-3.1-70b-versatile}")
    private String groqModel;

    public ResumeAnalysisResponse analyzeResume(ResumeAnalysisRequest request) throws Exception {
        String resumeText = resumeParserService.extractText(request.getFile());
        log.info("Extracted resume text, length: {}", resumeText.length());

        String prompt = buildAnalysisPrompt(resumeText, request.getJobDescription());
        String groqResponse = callGroqApi(prompt);

        return parseGroqResponse(groqResponse);
    }

    private String buildAnalysisPrompt(String resumeText, String jobDescription) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are an ATS (Applicant Tracking System) resume analyzer. ");
        prompt.append("Analyze resumes strictly and objectively based on actual content.\n\n");

        prompt.append("CRITICAL SCORING RULES:\n");
        prompt.append("- If resume is BLANK or has minimal content (< 50 words): Score 5-15\n");
        prompt.append("- Missing contact info (no email/phone): Deduct 20-30 points\n");
        prompt.append("- No work experience: Maximum score 40\n");
        prompt.append("- No education: Maximum score 50\n");
        prompt.append("- Poor formatting/readability: Deduct 10-20 points\n\n");

        prompt.append("SCORING SCALE (be strict and honest):\n");
        prompt.append("- 90-100: Exceptional resume, Fortune 500 ready, perfect formatting, strong metrics\n");
        prompt.append("- 75-89: Strong resume, good experience, clear achievements, minor improvements needed\n");
        prompt.append("- 60-74: Average resume, adequate experience, needs better formatting or metrics\n");
        prompt.append("- 40-59: Below average, missing key sections, poor formatting, vague descriptions\n");
        prompt.append("- 20-39: Poor resume, major sections missing, unprofessional, needs complete rewrite\n");
        prompt.append("- 0-19: Unacceptable, blank or nearly blank, completely unusable\n\n");

        prompt.append("EVALUATION CRITERIA (weight each appropriately):\n");
        prompt.append("1. Contact Info (15%): Email and phone are MANDATORY. Missing = major penalty.\n");
        prompt.append("2. Formatting (15%): Clean structure, consistent fonts, proper spacing, ATS-friendly.\n");
        prompt.append("3. Experience (30%): Relevant jobs, clear responsibilities, quantified achievements.\n");
        prompt.append("4. Skills (15%): Technical skills matching job market, properly categorized.\n");
        prompt.append("5. Education (10%): Degree, institution, graduation year clearly stated.\n");
        prompt.append("6. Achievements (10%): Metrics, numbers, measurable impact (e.g., 'increased by 30%').\n");
        prompt.append("7. Keywords (5%): Relevant industry terms and job-specific keywords.\n\n");

        prompt.append("Resume Content:\n");
        prompt.append("---START RESUME---\n");
        prompt.append(resumeText);
        prompt.append("\n---END RESUME---\n\n");

        if (jobDescription != null && !jobDescription.trim().isEmpty()) {
            prompt.append("Job Description:\n");
            prompt.append("---START JOB DESC---\n");
            prompt.append(jobDescription);
            prompt.append("\n---END JOB DESC---\n\n");
            prompt.append("Analyze keyword match between resume and job description.\n\n");
        }

        prompt.append("IMPORTANT INSTRUCTIONS:\n");
        prompt.append("1. READ THE ACTUAL RESUME CONTENT carefully\n");
        prompt.append("2. If the resume is blank or nearly blank, give it 5-15 score\n");
        prompt.append("3. Score each category independently based on what you SEE\n");
        prompt.append("4. Be HONEST - don't give sympathy points\n");
        prompt.append("5. Provide SPECIFIC feedback based on actual content\n\n");

        prompt.append("Return ONLY valid JSON in this exact format (no markdown, no extra text):\n");
        prompt.append("{\n");
        prompt.append("  \"overallScore\": <number 0-100 based on ACTUAL analysis>,\n");
        prompt.append("  \"scores\": {\n");
        prompt.append("    \"contactInfo\": <0-100>,\n");
        prompt.append("    \"formatting\": <0-100>,\n");
        prompt.append("    \"experience\": <0-100>,\n");
        prompt.append("    \"skills\": <0-100>,\n");
        prompt.append("    \"education\": <0-100>,\n");
        prompt.append("    \"achievements\": <0-100>,\n");
        prompt.append("    \"keywords\": <0-100>\n");
        prompt.append("  },\n");
        prompt.append("  \"strengths\": [\"Actual strengths found in THIS resume\"],\n");
        prompt.append("  \"weaknesses\": [\"Actual problems found in THIS resume\"],\n");
        prompt.append("  \"suggestions\": [\"Specific improvements for THIS resume\"],\n");
        prompt.append("  \"missingKeywords\": [\"Keywords from job description not in resume\"],\n");
        prompt.append("  \"summary\": \"Honest 2-3 sentence assessment of THIS specific resume\"\n");
        prompt.append("}\n\n");
        prompt.append("DO NOT use example scores. Analyze the ACTUAL resume content above.");

        return prompt.toString();
    }

    private String callGroqApi(String prompt) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", groqModel);
        requestBody.put("messages", List.of(message));
        requestBody.put("temperature", 0.2); // Lower temperature for more consistent scoring
        requestBody.put("max_tokens", 2000);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    groqApiUrl,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            log.info("Groq API response status: {}", response.getStatusCode());

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> responseMap = objectMapper.readValue(
                        response.getBody(),
                        Map.class
                );

                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map<String, Object> message1 = (Map<String, Object>) choices.get(0).get("message");
                    String content = (String) message1.get("content");
                    log.info("Groq response content: {}", content);
                    return content;
                }
            }

            throw new Exception("Failed to get valid response from Groq API");

        } catch (Exception e) {
            log.error("Error calling Groq API: {}", e.getMessage());
            throw new Exception("Groq API call failed: " + e.getMessage());
        }
    }

    private ResumeAnalysisResponse parseGroqResponse(String groqResponse) throws Exception {
        try {
            // Clean the response (remove markdown formatting if present)
            String cleanedResponse = groqResponse.trim();
            if (cleanedResponse.startsWith("```json")) {
                cleanedResponse = cleanedResponse.substring(7);
            }
            if (cleanedResponse.startsWith("```")) {
                cleanedResponse = cleanedResponse.substring(3);
            }
            if (cleanedResponse.endsWith("```")) {
                cleanedResponse = cleanedResponse.substring(0, cleanedResponse.length() - 3);
            }
            cleanedResponse = cleanedResponse.trim();

            log.info("Cleaned response for parsing: {}", cleanedResponse);

            return objectMapper.readValue(cleanedResponse, ResumeAnalysisResponse.class);

        } catch (Exception e) {
            log.error("Error parsing Groq response: {}", e.getMessage());
            log.error("Response was: {}", groqResponse);
            throw new Exception("Failed to parse AI response: " + e.getMessage());
        }
    }
}