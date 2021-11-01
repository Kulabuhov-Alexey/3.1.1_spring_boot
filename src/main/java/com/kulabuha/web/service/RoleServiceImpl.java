package com.kulabuha.web.service;

import com.kulabuha.web.dao.RoleDAO;
import com.kulabuha.web.entity.Role;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    private RoleDAO roleDAO;

    public RoleServiceImpl(RoleDAO roleDAO) {
        this.roleDAO = roleDAO;
    }

    @Override
    public Set<Role> getAllRoles() {
        return roleDAO.getAllRoles();
    }

    @Override
    public Set<Role> getRolesFromForm(Set<Role> allRoles, Map<String, String> form) {
        return allRoles.stream().filter(x -> form.containsKey(x.toString())).collect(Collectors.toSet());
    }
}
