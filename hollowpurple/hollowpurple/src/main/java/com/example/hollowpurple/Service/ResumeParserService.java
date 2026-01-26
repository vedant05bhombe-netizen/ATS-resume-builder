package com.example.hollowpurple.Service;

import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

@Service
@Slf4j
public class ResumeParserService {

    public String extractText(MultipartFile file) throws Exception {
        String contentType = file.getContentType();

        if (contentType == null) {
            throw new Exception("Unable to determine file type");
        }

        if (contentType.equals("application/pdf")) {
            return extractTextFromPdf(file);
        } else if (contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
                contentType.equals("application/msword")) {
            return extractTextFromDocx(file);
        } else {
            throw new Exception("Unsupported file type: " + contentType);
        }
    }

    private String extractTextFromPdf(MultipartFile file) throws Exception {
        try (InputStream inputStream = file.getInputStream();
             PDDocument document = PDDocument.load(inputStream)) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            log.info("Extracted {} characters from PDF", text.length());
            return text;

        } catch (Exception e) {
            log.error("Error extracting text from PDF: {}", e.getMessage());
            throw new Exception("Failed to extract text from PDF: " + e.getMessage());
        }
    }

    private String extractTextFromDocx(MultipartFile file) throws Exception {
        try (InputStream inputStream = file.getInputStream();
             XWPFDocument document = new XWPFDocument(inputStream)) {

            StringBuilder text = new StringBuilder();
            List<XWPFParagraph> paragraphs = document.getParagraphs();

            for (XWPFParagraph paragraph : paragraphs) {
                text.append(paragraph.getText()).append("\n");
            }

            String result = text.toString();
            log.info("Extracted {} characters from DOCX", result.length());
            return result;

        } catch (Exception e) {
            log.error("Error extracting text from DOCX: {}", e.getMessage());
            throw new Exception("Failed to extract text from DOCX: " + e.getMessage());
        }
    }
}