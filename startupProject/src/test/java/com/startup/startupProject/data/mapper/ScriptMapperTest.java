package com.startup.startupProject.data.mapper;

import com.startup.startupProject.data.dto.daily;
import com.startup.startupProject.data.service.ScriptService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class) // JUnit에 내장된 Runner 대신 이 클래스를 실행한다.
public class ScriptMapperTest {

    @Autowired
    private ScriptService scriptService;

    @Test
    public void getAllScriptTest() {
        List<daily> dailyList = scriptService.selectDailyScript();
        for (daily daily : dailyList) {
            System.out.println(daily);
        }
    }
}
