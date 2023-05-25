package ztpai.shopling.config.registration.dto;

import ztpai.shopling.model.UserEntity;


public record RegistrationResponse(Long id, String username) {
    public static RegistrationResponse ofUserEntity(UserEntity userEntity) {
        return new RegistrationResponse(userEntity.getId(), userEntity.getUsername());
    }
}
