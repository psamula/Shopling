package ztpai.shopling.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ztpai.shopling.config.auth.AuthenticationRequest;

@RestController
@CrossOrigin

public class LoginController {
    @ApiOperation("Log in and gain access to all your shopping lists")
    @PostMapping("/login")
    public void login (@RequestBody AuthenticationRequest credentials) {}
}