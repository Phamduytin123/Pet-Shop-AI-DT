package com.dut.backend.service.Impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dut.backend.common.constant.ErrorMessageConstants;
import com.dut.backend.common.util.CommonUtils;
import com.dut.backend.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) throws BadRequestException {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return (String) uploadResult.get("url");
        } catch (Exception e) {
            throw new BadRequestException(ErrorMessageConstants.UPLOAD_FILE_FAILED);
        }
    }

    @Override
    public List<String> uploadFiles(List<MultipartFile> files) throws BadRequestException {
        try {
            if (CommonUtils.List.isEmptyOrNull(files)) return List.of();
            List<String> tmp = new ArrayList<>();
            for (MultipartFile file : files) {
                Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                tmp.add((String) uploadResult.get("url"));
            }
            return tmp;
        } catch (Exception e) {
            throw new BadRequestException(ErrorMessageConstants.UPLOAD_FILE_FAILED);
        }
    }

    @Override
    public void deleteFileByUrl(String url) throws BadRequestException {
        try {
            String publicId = extractPublicIdFromUrl(url);
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new BadRequestException(ErrorMessageConstants.DELETE_FILE_FAILED);
        }
    }

    private String extractPublicIdFromUrl(String url) {
        String[] parts = url.split("/");
        String publicIdWithFormat = parts[parts.length - 1];
        return publicIdWithFormat.substring(0, publicIdWithFormat.lastIndexOf('.'));
    }
}
