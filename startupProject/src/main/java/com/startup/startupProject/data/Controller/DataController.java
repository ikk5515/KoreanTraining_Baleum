package com.startup.startupProject.data.Controller;

import com.startup.startupProject.data.service.ScriptService;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataController {

    private final ScriptService scriptService;

    public DataController(ScriptService scriptService) {
        this.scriptService = scriptService;
    }

    @GetMapping("/func")
    @ResponseBody
    public JSONArray dataTrans() throws JSONException {
        JSONArray jsonArray = new JSONArray();
//        JSONObject jsonObject = new JSONObject();
        for (int i = 0; i < scriptService.selectAllScript().size(); i++) {
            jsonArray.put(scriptService.selectAllScript().get(i));
        }
        System.out.println("jsonArray = " + jsonArray);
        return jsonArray;
    }
}
