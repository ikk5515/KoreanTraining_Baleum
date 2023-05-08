package com.startup.startupProject.data.Controller;

import com.startup.startupProject.data.service.ScriptService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class DataController {

    private final ScriptService scriptService;


    @GetMapping("/api/articles")
    @ResponseBody
    public String dataTrans() throws JSONException {
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < scriptService.selectAllScript().size(); i++) {
            jsonArray.put(scriptService.selectAllScript().get(i));
        }
        System.out.println("jsonArray = " + jsonArray);
        return jsonArray.toString();
    }
}
