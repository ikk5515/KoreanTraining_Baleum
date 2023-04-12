package com.startup.startupProject.upload.service;


import com.startup.startupProject.upload.exception.FileUploadException;
import com.startup.startupProject.upload.property.FileUploadProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class FileUploadDownloadService {
    private final Path fileLocation;

    @Autowired
    public FileUploadDownloadService(FileUploadProperties fileUploadProperties) {
        this.fileLocation = Paths.get(fileUploadProperties.getUploadDir())
                .toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileLocation);
        } catch (Exception ex) {
            throw new FileUploadException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        // Normalize file name
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String fileName = dateFormat.format(new Date()) + ".wav";
//        String fileName = "recording-" + new Date().getTime() + ".wav";

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileUploadException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileUploadException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new FileUploadException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException(ex);
        }
    }
}
