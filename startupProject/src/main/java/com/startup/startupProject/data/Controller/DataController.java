package com.startup.startupProject.data.Controller;

import com.startup.startupProject.data.service.ScriptService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DataController {

    private final ScriptService scriptService;


    @GetMapping("/daily")
    @ResponseBody
    public String dailyDataTrans() throws JSONException {
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < scriptService.selectDailyScript().size(); i++) {
            jsonArray.put(scriptService.selectDailyScript().get(i));
        }
        System.out.println("jsonArray = " + jsonArray);
        return jsonArray.toString();
    }

    @GetMapping("/business")
    @ResponseBody
    public String businessDataTrans() throws JSONException {
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < scriptService.selectBusinessScript().size(); i++) {
            jsonArray.put(scriptService.selectBusinessScript().get(i));
        }
        System.out.println("jsonArray = " + jsonArray);
        return jsonArray.toString();
    }

    @GetMapping("/movie")
    @ResponseBody
    public String movieDataTrans() throws JSONException {
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < scriptService.selectMovieScript().size(); i++) {
            jsonArray.put(scriptService.selectMovieScript().get(i));
        }
        System.out.println("jsonArray = " + jsonArray);
        return jsonArray.toString();
    }

    @GetMapping("/drama")
    @ResponseBody
    public String dramaDataTrans() throws JSONException {
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < scriptService.selectDramaScript().size(); i++) {
            jsonArray.put(scriptService.selectDramaScript().get(i));
        }
        System.out.println("jsonArray = " + jsonArray);
        return jsonArray.toString();
    }
}
