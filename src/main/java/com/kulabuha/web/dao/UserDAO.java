package com.kulabuha.web.dao;

import com.kulabuha.web.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserDAO {
    List<User> getAllUsers();

    void saveUser(User user);

    User getUser(Long id);

    void deleteUser(Long id);

    UserDetails getUserByName(String s);
}
