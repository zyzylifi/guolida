/*
Navicat MySQL Data Transfer

Source Server         : guolida
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : guolida

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2019-06-30 14:35:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for addr_info
-- ----------------------------
DROP TABLE IF EXISTS `addr_info`;
CREATE TABLE `addr_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `consignee` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `u_addr` varchar(255) NOT NULL,
  `isDefault` varchar(10) DEFAULT '0',
  `u_id` varchar(50) NOT NULL,
  `isDel` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `uid1` FOREIGN KEY (`u_id`) REFERENCES `user_info` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of addr_info
-- ----------------------------
INSERT INTO `addr_info` VALUES ('11', '小翔', '13458565486', '湖北省武汉市江夏区', '1', '123', '\0');
INSERT INTO `addr_info` VALUES ('12', '123', '123', '123', '1', 'zhouyang', '');

-- ----------------------------
-- Table structure for admin_info
-- ----------------------------
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info` (
  `a_id` varchar(100) NOT NULL,
  `a_password` varchar(50) NOT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  `power` varchar(50) NOT NULL,
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_info
-- ----------------------------
INSERT INTO `admin_info` VALUES ('admin', 'admin', '\0', '1');
INSERT INTO `admin_info` VALUES ('zhouyang', '1234', '\0', '2');

-- ----------------------------
-- Table structure for foodtype_info
-- ----------------------------
DROP TABLE IF EXISTS `foodtype_info`;
CREATE TABLE `foodtype_info` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_type` varchar(255) NOT NULL,
  `s_id` int(11) NOT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`t_id`),
  KEY `s_id` (`s_id`),
  CONSTRAINT `foodtype_info_ibfk_1` FOREIGN KEY (`s_id`) REFERENCES `shop_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of foodtype_info
-- ----------------------------
INSERT INTO `foodtype_info` VALUES ('8', '热销', '4', '\0');
INSERT INTO `foodtype_info` VALUES ('9', '特价专区  ', '4', '\0');
INSERT INTO `foodtype_info` VALUES ('10', '好吃推荐', '4', '\0');
INSERT INTO `foodtype_info` VALUES ('11', '热销', '5', '\0');
INSERT INTO `foodtype_info` VALUES ('12', '优惠特卖', '5', '\0');
INSERT INTO `foodtype_info` VALUES ('13', '榴莲山竹', '5', '\0');
INSERT INTO `foodtype_info` VALUES ('14', '国产优选', '5', '\0');
INSERT INTO `foodtype_info` VALUES ('15', '夏季水果', '5', '\0');

-- ----------------------------
-- Table structure for food_info
-- ----------------------------
DROP TABLE IF EXISTS `food_info`;
CREATE TABLE `food_info` (
  `f_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) NOT NULL,
  `f_type` varchar(255) NOT NULL,
  `f_price` decimal(10,0) NOT NULL,
  `f_photo` varchar(255) NOT NULL,
  `t_id` int(11) NOT NULL,
  `s_id` int(11) NOT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`f_id`),
  KEY `t_id` (`t_id`),
  KEY `s_id` (`s_id`),
  CONSTRAINT `food_info_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `foodtype_info` (`t_id`),
  CONSTRAINT `food_info_ibfk_2` FOREIGN KEY (`s_id`) REFERENCES `shop_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of food_info
-- ----------------------------
INSERT INTO `food_info` VALUES ('5', '台湾大青芒', '芒果味甜汁多，口感及佳！巨好吃！', '12', '/public/menuImg/mg.jpg', '8', '4', '\0');
INSERT INTO `food_info` VALUES ('6', 'A级-进口香蕉', '月售74份      好评率100%', '15', '/public/menuImg/xj.jpg', '8', '4', '\0');
INSERT INTO `food_info` VALUES ('9', 'A级_青尼榴莲', '1个/不少于2kg', '22', '/public/menuImg/ll.jpg', '9', '4', '\0');
INSERT INTO `food_info` VALUES ('10', 'B级-进口金火龙果', '月售27份      好评率100%', '12', '/public/menuImg/hlg.jpg', '10', '4', '\0');
INSERT INTO `food_info` VALUES ('11', 'A级-泰国椰青', '月售133份      好评率95%', '20', '/public/menuImg/yq.jpg', '11', '5', '\0');
INSERT INTO `food_info` VALUES ('12', 'A级-国产蓝莓', '月售12份      好评率100%', '20', '/public/menuImg/lm.jpg', '11', '5', '\0');
INSERT INTO `food_info` VALUES ('13', 'A级-妃子笑荔枝', '1份/不少于250g', '15', '/public/menuImg/lz.jpg', '12', '5', '\0');
INSERT INTO `food_info` VALUES ('14', 'A级_青尼榴莲', '1个/不少于2kg', '22', '/public/menuImg/ll.jpg', '13', '5', '\0');
INSERT INTO `food_info` VALUES ('15', 'A级_山竹', '1个/不少于2kg', '22', '/public/menuImg/sz.jpg', '13', '5', '\0');

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_photo` varchar(255) NOT NULL,
  `s_name` varchar(200) NOT NULL,
  `f_name` varchar(255) DEFAULT NULL,
  `o_price` decimal(10,0) NOT NULL,
  `o_date` datetime NOT NULL,
  `o_flag` int(1) NOT NULL DEFAULT '0' COMMENT '订单是否已完成',
  `s_id` int(11) NOT NULL,
  `u_id` varchar(200) NOT NULL,
  `o_nm` varchar(50) NOT NULL DEFAULT '0',
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `sid1` (`s_id`),
  KEY `uid2` (`u_id`),
  CONSTRAINT `sid1` FOREIGN KEY (`s_id`) REFERENCES `shop_info` (`id`),
  CONSTRAINT `uid2` FOREIGN KEY (`u_id`) REFERENCES `user_info` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES ('10', '/public/shopImg/slsg.jpg', '时令水果', null, '12', '2019-04-18 00:00:00', '0', '4', '123', '1', '\0');
INSERT INTO `order_info` VALUES ('15', '/public/shopImg/slsg.jpg', '时令水果', null, '24', '2019-05-11 00:00:00', '0', '4', '123', '2', '\0');
INSERT INTO `order_info` VALUES ('16', '/public/shopImg/qg.jpg', '切果NOW！', null, '60', '2019-05-11 00:00:00', '0', '5', '123', '3', '\0');
INSERT INTO `order_info` VALUES ('17', '/public/shopImg/slsg.jpg', '时令水果', null, '27', '2019-06-18 00:00:00', '0', '4', 'zhouyang', '2', '\0');
INSERT INTO `order_info` VALUES ('18', '/public/shopImg/qg.jpg', '切果NOW！', null, '40', '2019-06-18 00:00:00', '0', '5', 'zhouyang', '2', '\0');

-- ----------------------------
-- Table structure for shop_info
-- ----------------------------
DROP TABLE IF EXISTS `shop_info`;
CREATE TABLE `shop_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(255) NOT NULL,
  `s_photo` varchar(255) NOT NULL,
  `s_stars` int(10) NOT NULL DEFAULT '0',
  `s_sale` varchar(100) NOT NULL DEFAULT '0',
  `s_sendTime` int(100) NOT NULL DEFAULT '0',
  `s_distance` varchar(100) NOT NULL DEFAULT '0',
  `s_shortPrice` decimal(10,0) NOT NULL,
  `s_sendPrice` decimal(10,0) NOT NULL,
  `s_special` varchar(50) NOT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  `adminid` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adminid` (`adminid`),
  CONSTRAINT `123` FOREIGN KEY (`adminid`) REFERENCES `admin_info` (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_info
-- ----------------------------
INSERT INTO `shop_info` VALUES ('4', '时令水果', '/public/shopImg/slsg.jpg', '2', '0', '23', '1', '32', '12', '0', '\0', 'zhouyang');
INSERT INTO `shop_info` VALUES ('5', '切果NOW！', '/public/shopImg/qg.jpg', '3', '213', '23', '0', '0', '0', '10', '\0', 'admin');
INSERT INTO `shop_info` VALUES ('6', '每日优鲜', '/public/shopImg/mryx.jpg', '4', '0', '1', '1', '1', '1', '1', '\0', 'admin');
INSERT INTO `shop_info` VALUES ('7', '鲜果多', '/public/shopImg/xgd.jpg', '2', '22', '1', '1', '1', '1', '1', '\0', 'admin');
INSERT INTO `shop_info` VALUES ('8', '鲜丰水果', '/public/shopImg/xfsg.jpg', '3', '0', '3', '3', '3', '3', '3', '\0', 'admin');
INSERT INTO `shop_info` VALUES ('9', '百果园', '/public/shopImg/bgy.jpg', '2', '02', '2', '2', '2', '2', '2', '\0', 'admin');
INSERT INTO `shop_info` VALUES ('12', 'zysshu', '/public/storeimg/924d5058c5991ec70a2a46fb1e3cee52.jpg', '0', '0', '0', '0', '20', '4', '40', '', 'admin');
INSERT INTO `shop_info` VALUES ('13', 'zy', '/public/storeimg/15f10fde53a12bfa3a09feb40ceb541d.jpg', '0', '0', '0', '0', '1', '1', '1', '\0', 'zhouyang');
INSERT INTO `shop_info` VALUES ('14', '烤鸭', '/public/storeimg/7ab4fc0b1dc45103e63560293365a555.PNG', '0', '0', '0', '0', '1', '1', '1', '\0', 'zhouyang');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `u_id` varchar(50) NOT NULL,
  `u_password` varchar(50) NOT NULL,
  `u_name` varchar(50) DEFAULT NULL,
  `u_sex` varchar(10) DEFAULT NULL,
  `u_sign` varchar(255) DEFAULT NULL,
  `u_icon` varchar(150) DEFAULT NULL,
  `u_money` varchar(50) DEFAULT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  `u_age` int(11) DEFAULT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '123', '', '女', '', null, null, '\0', '0');
INSERT INTO `user_info` VALUES ('111', '111', '', '女', '', '/public/userImgs/c546a05ac95154a020ba330e52780756.jpeg', null, '\0', '0');
INSERT INTO `user_info` VALUES ('123', '123', 'fanciNate', '男', '敲代码敲代码', '/public/userImgs/882c2e92cba23ad7280f12655cb06000.jpg', null, '\0', '22');
INSERT INTO `user_info` VALUES ('1234', '1234', null, null, null, null, null, '\0', null);
INSERT INTO `user_info` VALUES ('12345', '12345', null, null, null, null, null, '\0', null);
INSERT INTO `user_info` VALUES ('zhouyang', '123', 'yy', '女', '', '/public/userImgs/47f9239d3e2ef8abd1f6b757657799c1.PNG', null, '\0', '18');
