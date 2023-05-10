package com.startup.startupProject.data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("business")
public class business {
    private Long BusinessNo;
    private String BuScript;
}
