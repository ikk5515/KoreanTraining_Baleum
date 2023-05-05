package com.startup.startupProject;

import com.startup.startupProject.upload.property.FileUploadProperties;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@MapperScan(value = {"com.startup.startupProject.data.mapper"})
@SpringBootApplication
@EnableConfigurationProperties({
        FileUploadProperties.class
})
public class StartupProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(StartupProjectApplication.class, args);
    }

}
