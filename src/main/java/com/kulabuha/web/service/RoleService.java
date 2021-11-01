package com.kulabuha.web.service;


import com.kulabuha.web.entity.Role;

import java.util.Map;
import java.util.Set;

public interface RoleService {
    Set<Role> getAllRoles();

    Set<Role> getRolesFromForm(Set<Role> allRoles, Map<String, String> form);
}
