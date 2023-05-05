package com.startup.startupProject.data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("daily")
public class daily {
    private Long DAILYNO;
    private String DSCRIPT;
}
