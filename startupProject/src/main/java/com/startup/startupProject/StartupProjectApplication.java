package com.startup.startupProject;

import com.startup.startupProject.upload.property.FileUploadProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileUploadProperties.class
})
public class StartupProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(StartupProjectApplication.class, args);
	}

}
