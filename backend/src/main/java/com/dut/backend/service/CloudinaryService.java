package com.dut.backend.service;

import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CloudinaryService {
    String uploadFile(MultipartFile file) throws BadRequestException;

    List<String> uploadFiles(List<MultipartFile> files) throws BadRequestException;

    void deleteFileByUrl(String url) throws BadRequestException;
}