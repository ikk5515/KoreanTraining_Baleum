package com.startup.startupProject.upload.domain.Controller;

import com.startup.startupProject.upload.domain.dto.FileUploadResponse;
import com.startup.startupProject.upload.service.FileUploadDownloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;


@RestController
public class uploadFile {
    @Autowired
    private FileUploadDownloadService service;

    private static final Logger logger = LoggerFactory.getLogger(uploadFile.class);

    @PostMapping("/upload")
    public FileUploadResponse uploadFile(@RequestParam("audio") MultipartFile file) throws IOException {
//        String fileName = "recording-" + new Date().getTime() + ".wav";
//        service.storeFile(file);
        String fileName = service.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/audio")
                .path(fileName)
                .toUriString();

        return new FileUploadResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
    }
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadFile(@RequestParam("audio") MultipartFile file) {
//        try {
//            String directory = "/path/to/folder"; // replace this with the directory path on your server where you want to save the file
//            File folder = new File(directory);
//            if (!folder.exists()) {
//                folder.mkdirs();
//            }
//            String filename = "recording-" + new Date().getTime() + ".wav"; // generate a unique filename based on the current timestamp
//            File dest = new File(directory + File.separator + filename);
//            file.transferTo(dest);
//            return ResponseEntity.ok("File uploaded successfully!");
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Failed to upload file: " + e.getMessage());
//        }
//    }


}