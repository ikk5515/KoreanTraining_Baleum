package com.startup.startupProject.data.mapper;

import com.startup.startupProject.data.dto.business;
import com.startup.startupProject.data.dto.daily;
import com.startup.startupProject.data.dto.drama;
import com.startup.startupProject.data.dto.movie;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ScriptMapper {
    List<daily> selectDailyScript();

    List<business> selectBusinessScript();

    List<movie> selectMovieScript();

    List<drama> selectDramaScript();
}
