package ztpai.shopling.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ztpai.shopling.config.registration.RegistrationFacade;
import ztpai.shopling.config.registration.dto.RegistrationRequest;
import ztpai.shopling.config.registration.dto.RegistrationResponse;


import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class RegistrationController {
    private final RegistrationFacade registrationFacade;

    @ApiOperation("Register to the Shopling")
    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> registerUser (
            @RequestBody @Valid final RegistrationRequest registrationRequest) {

        RegistrationResponse response = registrationFacade.registerNewUser(registrationRequest);
        return ResponseEntity.ok(response);
    }
}