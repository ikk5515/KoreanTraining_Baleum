package com.startup.startupProject.data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("movie")
public class movie {
    private Long MovieNo;
    private String MoScript;
}
