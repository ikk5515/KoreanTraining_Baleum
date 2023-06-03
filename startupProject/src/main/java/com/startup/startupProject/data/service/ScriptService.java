package com.startup.startupProject.data.service;

import com.startup.startupProject.data.dto.business;
import com.startup.startupProject.data.dto.daily;
import com.startup.startupProject.data.dto.drama;
import com.startup.startupProject.data.dto.movie;
import com.startup.startupProject.data.mapper.ScriptMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScriptService implements ScriptMapper {

    private final ScriptMapper scriptMapper;

    @Override
    public List<daily> selectDailyScript() {
        return scriptMapper.selectDailyScript();
    }

    @Override
    public List<business> selectBusinessScript() {
        return scriptMapper.selectBusinessScript();
    }

    @Override
    public List<movie> selectMovieScript() {
        return scriptMapper.selectMovieScript();
    }

    @Override
    public List<drama> selectDramaScript() {
        return scriptMapper.selectDramaScript();
    }
}
