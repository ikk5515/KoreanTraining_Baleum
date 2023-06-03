package com.startup.startupProject.data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("drama")
public class drama {
    private Long DramaNo;
    private String DRScript;
}
