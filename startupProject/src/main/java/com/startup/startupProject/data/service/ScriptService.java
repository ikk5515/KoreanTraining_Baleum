package com.startup.startupProject.data.service;

import com.startup.startupProject.data.dto.daily;
import com.startup.startupProject.data.mapper.ScriptMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ScriptService implements ScriptMapper {

    private final ScriptMapper scriptMapper;

    @Override
    public List<daily> selectAllScript() {
        return scriptMapper.selectAllScript();
    }
}
