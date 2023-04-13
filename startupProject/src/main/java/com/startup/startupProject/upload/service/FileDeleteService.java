package com.startup.startupProject.upload.service;

import com.startup.startupProject.upload.exception.FileUploadException;
import com.startup.startupProject.upload.property.FileUploadProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileDeleteService {

    private final Path fileLocation;

    @Autowired
    public FileDeleteService(FileUploadProperties fileUploadProperties) {
        this.fileLocation = Paths.get(fileUploadProperties.getUploadDir())
                .toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileLocation);
        } catch (Exception ex) {
            throw new FileUploadException("The saved file was not found..", ex);
        }
    }
    public void deleteFile(String fileName) {
        try {
            Path filePath = this.fileLocation.resolve(fileName).normalize();
            Files.delete(filePath);
        } catch (IOException ex) {
            throw new FileUploadException("Could not delete file " + fileName + ". Please try again!", ex);
        }
    }
}
