package ztpai.shopling.config.registration;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ztpai.shopling.config.registration.dto.RegistrationRequest;
import ztpai.shopling.config.registration.dto.RegistrationResponse;
import ztpai.shopling.exception.UserAlreadyExistsException;
import ztpai.shopling.model.UserEntity;
import ztpai.shopling.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class RegistrationFacade {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public RegistrationResponse registerNewUser(final RegistrationRequest registrationRequest) {

        if (userRepository.existsByUsername(registrationRequest.getUsername())) {
            throw new UserAlreadyExistsException(String.format("User of username %s already exists",
                    registrationRequest.getUsername()));
        }
        UserEntity user = new UserEntity();
        user.setUsername(registrationRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setEmail(registrationRequest.getEmail());
        UserEntity savedUser = userRepository.save(user);

        return RegistrationResponse.ofUserEntity(savedUser);

    }

}
