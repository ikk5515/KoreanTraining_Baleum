package com.startup.startupProject.upload.domain.Controller;

import com.startup.startupProject.Service.WavToRaw;
import com.startup.startupProject.upload.domain.dto.FileUploadResponse;
import com.startup.startupProject.upload.service.FileDeleteService;
import com.startup.startupProject.upload.service.FileUploadDownloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;


@RestController
public class UploadFileController {
    private final FileUploadDownloadService fileUploadDownloadService;
    private final FileDeleteService fileDeleteService;
    private final WavToRaw wavToRaw;

    @Autowired
    public UploadFileController(FileUploadDownloadService fileUploadDownloadService, FileDeleteService fileDeleteService, WavToRaw wavToRaw) {
        this.fileUploadDownloadService = fileUploadDownloadService;
        this.fileDeleteService = fileDeleteService;
        this.wavToRaw = wavToRaw;
    }

    @PostMapping("/upload")
    public FileUploadResponse uploadFile(@RequestParam("audio") MultipartFile file) throws IOException, UnsupportedAudioFileException {
        String fileName = fileUploadDownloadService.storeFile(file);
        File audioFile = new File("src/main/resources/audio/"+fileName);
        wavToRaw.SaveRaw(fileName, audioFile);
        fileDeleteService.deleteFile(fileName);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/audio")
                .path(fileName)
                .toUriString();

        return new FileUploadResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
    }
}