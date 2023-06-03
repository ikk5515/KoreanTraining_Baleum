package com.startup.startupProject.Errorpage.Controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ErrorPageController implements ErrorController {
    @GetMapping({"/", "/error", "/func"})
    public String index() {
        return "index.html";
    }
}
