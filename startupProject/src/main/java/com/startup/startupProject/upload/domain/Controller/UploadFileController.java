package com.startup.startupProject.upload.domain.Controller;

import com.startup.startupProject.Service.ETRIapiScriptService;
import com.startup.startupProject.Service.ETRIapiService;
import com.startup.startupProject.Service.WavToRaw;
import com.startup.startupProject.upload.service.FileDeleteService;
import com.startup.startupProject.upload.service.FileUploadDownloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
public class UploadFileController {
    private final FileUploadDownloadService fileUploadDownloadService;
    private final FileDeleteService fileDeleteService;
    private final WavToRaw wavToRaw;
    private final ETRIapiService etriapiService;

    private final ETRIapiScriptService etriapiScriptService;

    @Autowired
    public UploadFileController(FileUploadDownloadService fileUploadDownloadService, FileDeleteService fileDeleteService, WavToRaw wavToRaw, ETRIapiService etriapiService, ETRIapiScriptService etriapiScriptService) {
        this.fileUploadDownloadService = fileUploadDownloadService;
        this.fileDeleteService = fileDeleteService;
        this.wavToRaw = wavToRaw;
        this.etriapiService = etriapiService;
        this.etriapiScriptService = etriapiScriptService;
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("audio") MultipartFile file, @RequestParam("script") String objName) throws IOException, UnsupportedAudioFileException {
        String fileName = fileUploadDownloadService.storeFile(file);
        File audioFile = new File("src/main/resources/audio/"+fileName);
        String audioFileName = wavToRaw.SaveRaw(fileName, audioFile);


        fileDeleteService.deleteFile(fileName);

        Path path = Paths.get(audioFileName);
        String audioFileFullMame = path.getName(path.getNameCount() - 1).toString();

        String ScriptResult = etriapiScriptService.etriScriptService(audioFileName);
        double score = etriapiService.etriApi(audioFileName, objName);
        score = Math.round(score*100)/100.0;
        String scoreString = Double.toString(score);

        fileDeleteService.deleteFile(audioFileFullMame);
        return scoreString+" "+ScriptResult;
    }
}