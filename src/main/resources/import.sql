INSERT INTO users (age, email, first_name, last_name, name, password) VALUES (34,'kua@gmail.com','Vasya','Petrov','user','user'),('14','admin@gmail.com','Petya','Ivanov','admin','admin');
INSERT INTO roles (role) VALUES ('ROLE_USER'), ('ROLE_ADMIN');
INSERT INTO `users_roles` (users_id, roles_id) VALUES (1, 1), (2, 1), (2, 2);
