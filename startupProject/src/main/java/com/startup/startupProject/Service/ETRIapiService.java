package com.startup.startupProject.Service;

import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class ETRIapiService {
    public static double etriApi(String audioName, String objString) {
//		SpringApplication.run(EtriApiTestApplication.class, args);
        String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor";   //한국어
        String accessKey = "b85ea7eb-7a41-4e66-b0cc-8a703d6ce2cb";    // 발급받은 API Key
        String languageCode = "korean";     // 언어 코드
        String script = objString;    // 평가 대본
        String audioContents = null;
        Double responseScore = 0.0;
        File audioFile = new File(audioName);

        Gson gson = new Gson();

        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        try {
            Path path = Paths.get(audioName);
            System.out.println("path = " + path);
            byte[] audioBytes = Files.readAllBytes(path);
            audioContents = Base64.getEncoder().encodeToString(audioBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return 0.0;
        }

        argument.put("language_code", languageCode);
        argument.put("script", script);
        argument.put("audio", audioContents);

        request.put("argument", argument);

        URL url;
        Integer responseCode = null;
        String responBody = null;
        try {
            url = new URL(openApiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setRequestProperty("Authorization", accessKey);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(gson.toJson(request).getBytes(StandardCharsets.UTF_8));
            wr.flush();
            wr.close();


            responseCode = con.getResponseCode();
            InputStream is = con.getInputStream();
            byte[] buffer = new byte[is.available()];
            int byteRead = is.read(buffer);
            responBody = new String(buffer);

            System.out.println("[responseCode] " + responseCode);
            System.out.println("[responBody]");
            System.out.println(responBody);

            String[] list = responBody.split("score\":");
            for (int i = 0; i < list.length; i++) {
                System.out.println(list[i]);
            }

            String scoreString = list[1].substring(1, list[1].length() - 3);
            System.out.println("scoreString = " + scoreString);

            try {
                responseScore = Double.parseDouble(scoreString);
            } catch (NumberFormatException e) {
                e.printStackTrace();
                return 0.0;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return 0.0;
        }
        return responseScore;
    }
}

