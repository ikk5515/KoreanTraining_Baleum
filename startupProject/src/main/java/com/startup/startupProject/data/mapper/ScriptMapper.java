package com.startup.startupProject.data.mapper;

import com.startup.startupProject.data.dto.daily;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ScriptMapper {
    List<daily> selectAllScript();
}
