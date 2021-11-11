package com.kulabuha.web.controller;

import com.kulabuha.web.entity.Role;
import com.kulabuha.web.entity.User;
import com.kulabuha.web.service.RoleService;
import com.kulabuha.web.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@Controller
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @RequestMapping(value = {"/user"})
    public String getUserPanel(Model model, Authentication authentication) {
        Long id = ((User) authentication.getPrincipal()).getId();
        User user = userService.getUser(id);
        model.addAttribute("user", user);
        return "user";
    }

    @RequestMapping(value = "/login")
    public String login(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "logout", required = false) String logout,
                        Model model) {
        model.addAttribute("error", error != null);
        model.addAttribute("logout", logout != null);
        return "login";
    }

    @RequestMapping(value = {"/", "/admin"})
    public String getAdminPanel(Model model, Authentication authentication) {
        List<User> allUsers = userService.getAllUsers();
        User user = new User();
        Set<Role> roleSet = roleService.getAllRoles();
        model.addAttribute("allRoles", roleSet);
        model.addAttribute("currentUserEmail", ((User) authentication.getPrincipal()).getEmail());
        model.addAttribute("currentUserRoles", ((User) authentication.getPrincipal()).getRolesToStr());
        model.addAttribute("currentUserId", ((User) authentication.getPrincipal()).getId());
        model.addAttribute("user", user);
        return "admin";
    }

}