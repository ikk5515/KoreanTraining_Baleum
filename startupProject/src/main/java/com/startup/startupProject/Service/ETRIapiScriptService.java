package com.startup.startupProject.Service;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import com.google.gson.Gson;
import org.springframework.stereotype.Service;

@Service
public class ETRIapiScriptService {     // ETRI api를 이용하여 음성파일을 텍스트로 변환하는 서비스

    public static String etriScriptService(String audioName) {
        String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition";
        String accessKey = "b85ea7eb-7a41-4e66-b0cc-8a703d6ce2cb";    // 발급받은 API Key
        String languageCode = "korean";     // 언어 코드
        String audioContents = null;

        Gson gson = new Gson();

        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        try {
            Path path = Paths.get(audioName);
            byte[] audioBytes = Files.readAllBytes(path);
            audioContents = Base64.getEncoder().encodeToString(audioBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return "Speech recognition failed.";
        }

        argument.put("language_code", languageCode);
        argument.put("audio", audioContents);

        request.put("argument", argument);

        URL url;
        Integer responseCode = null;
        String responBody = null;
        try {
            url = new URL(openApiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setRequestProperty("Authorization", accessKey);

            con.setConnectTimeout(3000);
            con.setReadTimeout(3000);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(gson.toJson(request).getBytes("UTF-8"));
            wr.flush();
            wr.close();

            responseCode = con.getResponseCode();
            InputStream is = con.getInputStream();
            byte[] buffer = new byte[is.available()];
            int byteRead = is.read(buffer);
            responBody = new String(buffer);

            System.out.println("ETRIapiScriptService [responseCode] = " + responseCode);

        } catch (IOException e) {
            e.printStackTrace();
            return "Speech recognition failed.";
        }
        return responBody.substring(98, responBody.length()-3);
    }
}
