/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : koa_test

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-10-28 15:39:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
`id`  bigint(20) NOT NULL AUTO_INCREMENT ,
`role_name`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
AUTO_INCREMENT=5

;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES ('1', '管理员'), ('2', '一般用户'), ('3', '老师'), ('4', '学生');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`user_name`  varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL ,
`password`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL ,
`user_id`  int(11) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
AUTO_INCREMENT=4

;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', '张三', '123456', '1001'), ('2', '李四', '123456', '1002'), ('3', '王五', '123456', '1003');
COMMIT;

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
`id`  bigint(20) NOT NULL AUTO_INCREMENT ,
`user_id`  bigint(20) NULL DEFAULT NULL ,
`role_id`  bigint(20) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
AUTO_INCREMENT=7

;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
BEGIN;
INSERT INTO `user_roles` VALUES ('1', '1001', '1'), ('2', '1001', '2'), ('3', '1002', '2'), ('4', '1002', '3'), ('5', '1003', '3'), ('6', '1003', '4');
COMMIT;

-- ----------------------------
-- Auto increment value for role
-- ----------------------------
ALTER TABLE `role` AUTO_INCREMENT=5;

-- ----------------------------
-- Auto increment value for user
-- ----------------------------
ALTER TABLE `user` AUTO_INCREMENT=4;

-- ----------------------------
-- Auto increment value for user_roles
-- ----------------------------
ALTER TABLE `user_roles` AUTO_INCREMENT=7;
