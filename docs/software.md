# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних

```sql

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema OpenDataModel
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `OpenDataModel` ;

-- -----------------------------------------------------
-- Schema OpenDataModel
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `OpenDataModel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci ;
USE `OpenDataModel` ;

-- -----------------------------------------------------
-- Table `OpenDataModel`.`Categoty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Categoty` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Categoty` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `parent_category_id` INT NULL,
  PRIMARY KEY (`category_id`),
  INDEX `parent_category_idx` (`parent_category_id` ASC) INVISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `parent_category`
    FOREIGN KEY (`parent_category_id`)
    REFERENCES `OpenDataModel`.`Categoty` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Tag` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Tag` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Data` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Data` (
  `data_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NULL,
  `format` VARCHAR(45) NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`data_id`, `category_id`),
  INDEX `fk_Data_Categoty_idx` (`category_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `fk_Data_Categoty`
    FOREIGN KEY (`category_id`)
    REFERENCES `OpenDataModel`.`Categoty` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Link`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Link` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Link` (
  `link_id` INT NOT NULL AUTO_INCREMENT,
  `data_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`link_id`, `data_id`, `tag_id`),
  INDEX `fk_Link_Data_idx` (`data_id` ASC) VISIBLE,
  INDEX `fk_Link_Tag_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_Link_Data`
    FOREIGN KEY (`data_id`)
    REFERENCES `OpenDataModel`.`Data` (`data_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Link_Tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `OpenDataModel`.`Tag` (`tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Role` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`User` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`User` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `login` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Access` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Access` (
  `access_id` INT NOT NULL AUTO_INCREMENT,
  `data_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`access_id`, `data_id`, `user_id`, `role_id`),
  INDEX `fk_Access_Data_idx` (`data_id` ASC) VISIBLE,
  INDEX `fk_Access_Role_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_Access_User_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Access_Data`
    FOREIGN KEY (`data_id`)
    REFERENCES `OpenDataModel`.`Data` (`data_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Access_Role`
    FOREIGN KEY (`role_id`)
    REFERENCES `OpenDataModel`.`Role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Access_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `OpenDataModel`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Categoty`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Categoty` (`category_id`, `name`, `parent_category_id`) VALUES (DEFAULT, 'Географія', NULL);
INSERT INTO `OpenDataModel`.`Categoty` (`category_id`, `name`, `parent_category_id`) VALUES (DEFAULT, 'Статистика', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Tag`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Tag` (`tag_id`, `name`) VALUES (DEFAULT, 'Тег: статистика');
INSERT INTO `OpenDataModel`.`Tag` (`tag_id`, `name`) VALUES (DEFAULT, 'Тег: географія');

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Data`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Data` (`data_id`, `name`, `description`, `format`, `content`, `createdAt`, `updatedAt`, `category_id`) VALUES (DEFAULT, 'Статистика', 'Важлива статистика', 'txt', 'txt', '2038-01-19 03:14:07', '2039-01-19 03:14:07', 1);
INSERT INTO `OpenDataModel`.`Data` (`data_id`, `name`, `description`, `format`, `content`, `createdAt`, `updatedAt`, `category_id`) VALUES (DEFAULT, 'Географія', 'Важливі дані', 'png', 'png', '2027-01-19 03:14:07', '2030-01-19 03:14:07', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Link`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Link` (`link_id`, `data_id`, `tag_id`) VALUES (DEFAULT, 1, 1);
INSERT INTO `OpenDataModel`.`Link` (`link_id`, `data_id`, `tag_id`) VALUES (DEFAULT, 2, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Role`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Role` (`role_id`, `name`) VALUES (DEFAULT, 'Користувач');
INSERT INTO `OpenDataModel`.`Role` (`role_id`, `name`) VALUES (DEFAULT, 'Адміністратор');

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`User` (`user_id`, `firstname`, `lastname`, `email`, `login`, `password`) VALUES (DEFAULT, 'Іван', 'Рєзник', 'rieznyk@gmail.com', 'ivan', '1234');
INSERT INTO `OpenDataModel`.`User` (`user_id`, `firstname`, `lastname`, `email`, `login`, `password`) VALUES (DEFAULT, 'Нікіта', 'Пляко', 'plyako@gmail.com', 'nikito4ka', '5678');

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Access`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Access` (`access_id`, `data_id`, `role_id`, `user_id`) VALUES (DEFAULT, 1, 1, 1);
INSERT INTO `OpenDataModel`.`Access` (`access_id`, `data_id`, `role_id`, `user_id`) VALUES (DEFAULT, 2, 2, 2);

COMMIT;

```

## RESTfull сервіс для управління даними

### Підключення до бази даних

```javascript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'opendatamodel',
    waitForConnections: true,
});

export default pool;
```

### Налаштування сервера

```javascript
import router from './router/router.js';
import express from 'express';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Маршрути для User

```javascript
import { Router } from 'express';
import UserController from '../controllers/UserController.js';
const router = Router();

router.get('/all', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
```

### Маршрути для Role

```javascript
import { Router } from 'express';
import RoleController from '../controllers/RoleController.js';
const router = Router();

router.get('/all', RoleController.getRoles);
router.get('/:id', RoleController.getRoleById);
router.post('/', RoleController.createRole);
router.patch('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

export default router;
```

### Головний роутер

```javascript
import { Router } from 'express';
import userRouter from './userRouter.js';
import roleRouter from './roleRouter.js';
const router = Router();

router.use('/user', userRouter);
router.use('/role', roleRouter);

export default router;
```

### SQL запити

```javascript
export const userSQL = {
    findUsers: `SELECT * FROM user`,
    findUserById: `SELECT * FROM user WHERE user_id = ?`,
    createUser: `INSERT INTO user (firstname, lastname, email, login, password) VALUES (?, ?, ?, ?, ?)`,
    updateUserById: `UPDATE user SET firstname = ?, lastname = ?, email = ?, login = ?, password = ? WHERE user_id = ?`,
    deleteUserById: `DELETE FROM user WHERE user_id = ?`,
};

export const roleSQL = {
    findRoles: `SELECT * FROM role`,
    findRoleById: `SELECT * FROM role WHERE role_id = ?`,
    createRole: `INSERT INTO role (name) VALUES (?)`,
    updateRoleById: `UPDATE role SET name = ? WHERE role_id = ?`,
    deleteRoleById: `DELETE FROM role WHERE role_id = ?`,
};
```

### Контролери для User

```javascript
import pool from '../connection.js';
import { userSQL } from '../SQL/SQL.js';
import { validateUserFields } from '../validation/userValidation.js';

class UserController {
    async getUsers(req, res) {
        try {
            const [response] = await pool.execute(userSQL.findUsers);
            res.json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const [response] = await pool.execute(userSQL.findUserById, [id]);

            if (response.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(response[0]);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async createUser(req, res) {
        const { firstname, lastname, email, login, password } = req.body;

        try {
            validateUserFields(req.body);
            const [response] = await pool.execute(userSQL.createUser, [
                firstname,
                lastname,
                email,
                login,
                password,
            ]);

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: response.insertId,
                    firstname,
                    lastname,
                    email,
                    login,
                },
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { firstname, lastname, email, login, password } = req.body;

        try {
            validateUserFields(req.body);
            const [response] = await pool.execute(userSQL.updateUserById, [
                firstname,
                lastname,
                email,
                login,
                password,
                id,
            ]);
            if (response.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json('User updated successfully');
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(userSQL.deleteUserById, [id]);

            if (response.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json('User deleted successfully');
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}
export default new UserController();
```

### Контролери для Role

```javascript
import pool from '../connection.js';
import { validateRoleFields } from '../validation/roleValidation.js';
import { roleSQL } from '../SQL/SQL.js';

class RoleController {
    async getRoles(req, res) {
        try {
            const [response] = await pool.execute(roleSQL.findRoles);
            res.json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getRoleById(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(roleSQL.findRoleById, [id]);

            if (response.length === 0) {
                return res.status(404).json({ error: 'Role not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async createRole(req, res) {
        const { name } = req.body;

        try {
            validateRoleFields({ name });
            const [response] = await pool.execute(roleSQL.createRole, [name]);
            res.status(201).json({
                message: 'Role created successfully',
                role: { id: response.insertId, name },
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async updateRole(req, res) {
        const { id } = req.params;
        const { name } = req.body;

        try {
            validateRoleFields({ name });
            const [response] = await pool.execute(roleSQL.updateRoleById, [
                name,
                id,
            ]);

            if (response.affectedRows === 0) {
                return res.status(404).json({ error: 'Role not found' });
            }

            res.json('Role updated successfully');
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async deleteRole(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(roleSQL.deleteRoleById, [id]);

            if (response.affectedRows === 0) {
                return res.status(404).json({ error: 'Role not found' });
            }

            res.json('Role deleted successfully');
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new RoleController();
```

### Валідатори

```javascript
export const validateUserFields = (data) => {
    const requiredFields = [
        'firstname',
        'lastname',
        'email',
        'login',
        'password',
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
            throw new Error(`${field} is required`);
        }
    }
};
```

```javascript
export const validateRoleFields = (data) => {
    const { name } = data;

    if (!name) {
        throw new Error('Role name is required');
    }
};
```
