package com.example.hollowpurple.Controller;


import com.example.hollowpurple.DTO.ResumeAnalysisRequest;
import com.example.hollowpurple.DTO.ResumeAnalysisResponse;
import com.example.hollowpurple.Service.ResumeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeAnalysisService resumeAnalysisService;

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "jobDescription", required = false) String jobDescription) {

        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "File is empty"));
            }

            // Check file type
            String contentType = file.getContentType();
            if (!isValidFileType(contentType)) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Invalid file type. Only PDF and DOCX are supported."));
            }

            // Check file size (max 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "File size exceeds 5MB limit"));
            }

            ResumeAnalysisRequest request = new ResumeAnalysisRequest();
            request.setFile(file);
            request.setJobDescription(jobDescription);

            ResumeAnalysisResponse response = resumeAnalysisService.analyzeResume(request);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to analyze resume: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "healthy", "service", "ATS Resume Checker"));
    }

    private boolean isValidFileType(String contentType) {
        return contentType != null && (
                contentType.equals("application/pdf") ||
                        contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
                        contentType.equals("application/msword")
        );
    }
}