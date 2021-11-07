package com.kulabuha.web.service;

import com.kulabuha.web.entity.Role;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class RoleConverter implements Converter<String, Role> {

    private final RoleService roleService;

    public RoleConverter(RoleService roleService) {
        this.roleService = roleService;
    }

    @Override
    public Role convert(String id) {
        Role role = roleService.getRole(Long.parseLong(id));
        return role;
    }
}
