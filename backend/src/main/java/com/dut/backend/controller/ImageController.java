package com.dut.backend.controller;

import com.dut.backend.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/images")
public class ImageController {

    private final CloudinaryService cloudinaryService;
    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        try {
            String url = cloudinaryService.uploadFile(file);
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }
    @PostMapping("/uploads")
    public ResponseEntity<List<String>> uploads(@RequestParam("file") List<MultipartFile> files) {
        try {
            List<String> url = cloudinaryService.uploadFiles(files);
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonList("Upload failed"));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam("url") String url) {
        try {
            cloudinaryService.deleteFileByUrl(url);
            return ResponseEntity.ok("Deleted: oke");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Delete failed");
        }
    }
}
