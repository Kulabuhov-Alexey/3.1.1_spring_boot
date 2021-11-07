package com.kulabuha.web.service;


import com.kulabuha.web.entity.Role;

import java.util.Map;
import java.util.Set;

public interface RoleService {
    Set<Role> getAllRoles();

    Role getRole(Long id);
}
