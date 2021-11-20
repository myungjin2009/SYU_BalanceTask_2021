-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aram`
--

DROP TABLE IF EXISTS `aram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aram` (
  `aram_no` int NOT NULL,
  `senduser` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `receiveuser` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sendtime` datetime DEFAULT NULL,
  `group` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` tinyint DEFAULT NULL,
  PRIMARY KEY (`aram_no`),
  KEY `FK__groups_2` (`group`),
  KEY `FK_aram_groups` (`receiveuser`),
  KEY `FK_aram_user` (`senduser`),
  CONSTRAINT `FK__groups_2` FOREIGN KEY (`group`) REFERENCES `groups` (`group_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_aram_groups` FOREIGN KEY (`receiveuser`) REFERENCES `groups` (`user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_aram_user` FOREIGN KEY (`senduser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aram`
--

LOCK TABLES `aram` WRITE;
/*!40000 ALTER TABLE `aram` DISABLE KEYS */;
/*!40000 ALTER TABLE `aram` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `chat_date` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `chat_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `group_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `msg` varchar(750) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`chat_date`,`chat_id`),
  KEY `FK_chat_user` (`chat_id`),
  KEY `FK_chat_groups` (`group_name`),
  CONSTRAINT `FK_chat_groups` FOREIGN KEY (`group_name`) REFERENCES `groups` (`group_name`),
  CONSTRAINT `FK_chat_user` FOREIGN KEY (`chat_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `user` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `friends` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  PRIMARY KEY (`user`,`friends`),
  KEY `FK_friends_user_2` (`friends`),
  CONSTRAINT `FK_friends_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_friends_user_2` FOREIGN KEY (`friends`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES ('myungjin2009@naver.com','aj9807@naver.comsdf'),('myungjin2009@naver.com','bjh9807'),('bjh9807','myungjin2009@naver.com'),('myungjin2009@naver.com','one0374@naver.com');
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupboard`
--

DROP TABLE IF EXISTS `groupboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupboard` (
  `board_number` int NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `image` varchar(8192) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `file` varchar(8192) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `text` varchar(3000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `info_user` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `info_groupname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`board_number`,`info_groupname`) USING BTREE,
  KEY `FK_groupboard_user` (`info_user`),
  KEY `FK_groupboard_groups` (`info_groupname`),
  CONSTRAINT `FK_groupboard_groups` FOREIGN KEY (`info_groupname`) REFERENCES `groups` (`group_name`),
  CONSTRAINT `FK_groupboard_user` FOREIGN KEY (`info_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupboard`
--

LOCK TABLES `groupboard` WRITE;
/*!40000 ALTER TABLE `groupboard` DISABLE KEYS */;
INSERT INTO `groupboard` VALUES (1,'테스트','/image/8001d6313ac13976c7d4430fc7f96e85',NULL,'이것은 테스트 입니다.','myungjin2009@naver.com','띵진이의 그룹','2021-11-18 12:15:43');
/*!40000 ALTER TABLE `groupboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupcalendar`
--

DROP TABLE IF EXISTS `groupcalendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupcalendar` (
  `process` int NOT NULL DEFAULT '1',
  `group_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `start` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `do_text` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `writer` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `end` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`process`,`group_name`) USING BTREE,
  KEY `FK_groupcalendar_groups` (`group_name`),
  KEY `FK_groupcalendar_user` (`writer`),
  CONSTRAINT `FK_groupcalendar_groups` FOREIGN KEY (`group_name`) REFERENCES `groups` (`group_name`),
  CONSTRAINT `FK_groupcalendar_user` FOREIGN KEY (`writer`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupcalendar`
--

LOCK TABLES `groupcalendar` WRITE;
/*!40000 ALTER TABLE `groupcalendar` DISABLE KEYS */;
INSERT INTO `groupcalendar` VALUES (2,'한양대 프로젝트','2021-09-09','222','bjh9807@naver.com','2021-09-17','444'),(3,'한양대 프로젝트','2021-08-30T16:06','33','bjh9807@naver.com','2021-09-30T16:06','33');
/*!40000 ALTER TABLE `groupcalendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupnotice`
--

DROP TABLE IF EXISTS `groupnotice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupnotice` (
  `board_number` int NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `image` varchar(8192) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `file` varchar(8192) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `text` varchar(3000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `info_user` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `info_groupname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`board_number`,`info_groupname`) USING BTREE,
  KEY `FK_groupboard_user` (`info_user`) USING BTREE,
  KEY `FK_groupboard_groups` (`info_groupname`) USING BTREE,
  CONSTRAINT `groupnotice_ibfk_1` FOREIGN KEY (`info_groupname`) REFERENCES `groups` (`group_name`),
  CONSTRAINT `groupnotice_ibfk_2` FOREIGN KEY (`info_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupnotice`
--

LOCK TABLES `groupnotice` WRITE;
/*!40000 ALTER TABLE `groupnotice` DISABLE KEYS */;
INSERT INTO `groupnotice` VALUES (1,'게시물',NULL,NULL,'ssss','bjh9807@naver.com','111111','2021-09-23 15:11:28'),(1,'게시물','/image/774df31542da46fd734d88e58ef93a4a',NULL,'이번 중요 공지','bjh9807@naver.com','415','2021-09-28 16:18:14'),(1,'게시물','/image/8001d6313ac13976c7d4430fc7f96e85',NULL,'마인크래프트 프로젝트에 오신 여러분 환영합니다~','myungjin2009@naver.com','띵진이의 그룹','2021-11-17 16:57:49'),(1,'공',NULL,NULL,'제발!!!!!!!!','ds@naver.com','토익 스터디','2021-08-12 23:07:42'),(1,'1',NULL,NULL,'1','bjh9807@naver.com','한양대 프로젝트','2021-09-09 14:46:09'),(2,'게시물','[object File],[object File]',NULL,'22222','bjh9807@naver.com','111111','2021-09-23 16:11:49'),(2,'부',NULL,NULL,'ssssssssss','aj9807@naver.comsdf','삼육대 프로젝트','2021-08-12 23:07:42'),(2,'2',NULL,NULL,'2','bjh9807@naver.com','한양대 프로젝트','2021-09-09 14:46:09'),(3,'게시물','[object File],[object File]',NULL,'2222222','bjh9807@naver.com','111111','2021-09-23 16:14:50'),(3,'용',NULL,NULL,'dsdfasd','dds@gami.com','상명대 프로젝트','2021-08-12 23:07:42'),(3,'3',NULL,NULL,'3','bjh9807@naver.com','한양대 프로젝트','2021-09-09 14:46:09'),(4,'게시물','[object File],[object File]',NULL,'2323232','bjh9807@naver.com','111111','2021-09-23 16:16:21'),(5,'게시물','[object File],[object File]',NULL,'lk','bjh9807@naver.com','111111','2021-09-23 17:11:06'),(6,'게시물','/image/KakaoTalk_20210604_140618490.jpg,/image/KakaoTalk_20201227_133453885.jpg',NULL,'asdas','bjh9807@naver.com','111111','2021-09-23 17:29:38'),(7,'게시물','/image/KakaoTalk_20201227_142000907.jpg,/image/KakaoTalk_20210604_140618833.jpg',NULL,'ss','bjh9807@naver.com','111111','2021-09-23 18:00:35');
/*!40000 ALTER TABLE `groupnotice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `group_no` int NOT NULL,
  `user` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `group_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `group_images` varchar(8192) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `startdate` datetime DEFAULT NULL,
  `percentage` float(4,3) DEFAULT NULL,
  `group_chatting` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `group_calendar` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `host` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `manager` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `complete` blob,
  `category` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `host_images` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `deadline` datetime DEFAULT NULL,
  `makedate` datetime DEFAULT NULL,
  `highlight` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`user`,`group_no`) USING BTREE,
  UNIQUE KEY `group_name` (`group_name`),
  UNIQUE KEY `group_no` (`group_no`),
  CONSTRAINT `FK_groups_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (8,'aj9807@naver.comsdf','한국사 스터디',NULL,'2021-08-12 00:00:00',NULL,NULL,NULL,'스터디',NULL,NULL,'스터디','ㄹ오556ㄱ쇼ㅛㅕㅑㅕㅅㄱㄷㅅㄴㅇ료ㅕㅑ675ㅕㄷㄳㅇㄹ효ㅕㅏㅕ7ㅑ67ㅕ5ㄷㄳㅇㄽ겨',NULL,'2021-08-17 00:00:00','2021-08-13 13:37:21',NULL,NULL),(9,'aj9807@naver.comsdf','한양대 프로젝트',NULL,'2021-08-12 00:00:00',NULL,NULL,NULL,'학교',NULL,NULL,'팀 프로젝트','ㄹ오556ㄱ쇼ㅛㅕㅑㅕㅅㄱㄷㅅㄴㅇ료ㅕㅑ675ㅕㄷㄳㅇㄹ효ㅕㅏㅕ7ㅑ67ㅕ5ㄷㄳㅇㄽ겨',NULL,'2021-08-17 00:00:00','2021-08-13 13:37:30',NULL,NULL),(10,'bjh9807@naver.com','dsdafasdfafa','/image/KakaoTalk_20201227_142000907.jpg,/image/KakaoTalk_20210604_140618833.jpg','2021-08-01 00:00:00',NULL,NULL,NULL,'sadf33ssdfc','sdasdds',NULL,'학교 조별 과제','dfqwe1321231',NULL,'2021-09-10 00:00:00','2021-08-29 21:38:31','sdfsadfasdfa',NULL),(11,'bjh9807@naver.com','3456765456','/image/KakaoTalk_20201227_142000907.jpg,/image/KakaoTalk_20210604_140618833.jpg','2021-08-01 00:00:00',NULL,NULL,NULL,'55678987','tyjjhge',NULL,'팀 프로젝트','3456utergh',NULL,'2021-09-11 00:00:00','2021-08-29 22:04:46','645678',NULL),(12,'bjh9807@naver.com','m카페','/image/KakaoTalk_20201227_142000907.jpg,/image/KakaoTalk_20210604_140618833.jpg','2021-08-31 00:00:00',NULL,NULL,NULL,'111','2222',NULL,'학교 조별 과제','ㄴㅁㅇㅁㄴㅇㅁ',NULL,'2021-09-25 00:00:00','2021-09-07 09:58:03','2222',NULL),(13,'bjh9807@naver.com','111111','/image/05cca3d33f925dbb576548ee6b1f93c0,/image/9611ce697042995fd88aa2cc036260da','2021-08-30 00:00:00',NULL,NULL,NULL,'1111111111','11111111111',NULL,'학교 조별 과제','11111111111111',NULL,'2021-09-30 00:00:00','2021-09-09 12:29:54','11111111',NULL),(14,'bjh9807@naver.com','2222','/image/KakaoTalk_20201227_142000907.jpg,/image/KakaoTalk_20210604_140618833.jpg','2021-09-07 00:00:00',NULL,NULL,NULL,'2','2',NULL,'학교 조별 과제','2',NULL,'2021-09-30 00:00:00','2021-09-09 12:41:26','2',NULL),(16,'bjh9807@naver.com','99999999','/image/KakaoTalk_20201227_142000907.jpg,/image/KakaoTalk_20210604_140618833.jpg','2021-08-31 00:00:00',NULL,NULL,NULL,'999999','9999',NULL,'학교 조별 과제','99999999',NULL,'2021-09-27 00:00:00','2021-09-23 16:43:32','9999999',NULL),(17,'bjh9807@naver.com','999999','/image/KakaoTalk_20201227_142000907.jpg,/image/KakaoTalk_20210604_140618833.jpg','2021-09-20 00:00:00',NULL,NULL,NULL,'99','9',NULL,'학교 조별 과제','9',NULL,'2021-10-01 00:00:00','2021-09-23 16:45:05','999999999',NULL),(18,'bjh9807@naver.com','161616','/image/KakaoTalk_20201227_142000907.jpg,/image/KakaoTalk_20210604_140618833.jpg','2021-08-31 00:00:00',NULL,NULL,NULL,'141','41515',NULL,'학교 조별 과제','151',NULL,'2021-10-02 00:00:00','2021-09-23 16:50:25','1414',NULL),(19,'bjh9807@naver.com','415','/image/KakaoTalk_20201227_142000907.jpg,/image/KakaoTalk_20210604_140618833.jpg','2021-09-01 00:00:00',NULL,NULL,NULL,'12','12',NULL,'학교 조별 과제','12',NULL,'2021-10-09 00:00:00','2021-09-28 16:15:36','12',NULL),(20,'bjh9807@naver.com','ㅈㅈ12','/image/KakaoTalk_20201222_220051679.jpg,/image/KakaoTalk_20201227_142000907.jpg','2021-09-01 00:00:00',NULL,NULL,NULL,'ㅈㄷ','ㅈㄷ',NULL,'학교 조별 과제','ㅈㄷㅈㄷ',NULL,'2021-10-01 00:00:00','2021-09-30 11:10:36','ㅈㄷㅈㄷ',NULL),(21,'bjh9807@naver.com','9월30','/image/KakaoTalk_20210604_140618833.jpg,/image/KakaoTalk_20201227_142000907.jpg','2021-09-07 00:00:00',NULL,NULL,NULL,'2','2',NULL,'학교 조별 과제','2',NULL,'2021-10-09 00:00:00','2021-09-30 14:04:23','2',NULL),(5,'cxc@naver.codddddd','기능사 스터디',NULL,'2021-08-12 00:00:00',NULL,NULL,NULL,'시험',NULL,NULL,'스터디','ㄹ오556ㄱ쇼ㅛㅕㅑㅕㅅㄱㄷㅅㄴㅇ료ㅕㅑ675ㅕㄷㄳㅇㄹ효ㅕㅏㅕ7ㅑ67ㅕ5ㄷㄳㅇㄽ겨',NULL,'2021-08-17 00:00:00','2021-08-13 13:37:16',NULL,NULL),(6,'cxc@naver.codddddd','삼육대 프로젝트',NULL,'2021-08-12 00:00:00',NULL,NULL,NULL,'학교',NULL,NULL,'팀 프로젝트','ㄹ오556ㄱ쇼ㅛㅕㅑㅕㅅㄱㄷㅅㄴㅇ료ㅕㅑ675ㅕㄷㄳㅇㄹ효ㅕㅏㅕ7ㅑ67ㅕ5ㄷㄳㅇㄽ겨',NULL,'2021-08-17 00:00:00','2021-08-13 13:37:17',NULL,NULL),(7,'cxc@naver.codddddd','토익 스터디',NULL,'2021-08-12 00:00:00',NULL,NULL,NULL,'시험',NULL,NULL,'스터디','ㄹ오556ㄱ쇼ㅛㅕㅑㅕㅅㄱㄷㅅㄴㅇ료ㅕㅑ675ㅕㄷㄳㅇㄹ효ㅕㅏㅕ7ㅑ67ㅕ5ㄷㄳㅇㄽ겨',NULL,'2021-08-17 00:00:00','2021-08-13 13:37:18',NULL,NULL),(3,'dds@gami.com','코딩 스터디',NULL,'2021-08-12 00:00:00',NULL,NULL,NULL,'스터디',NULL,NULL,'스터디','ㄹ오556ㄱ쇼ㅛㅕㅑㅕㅅㄱㄷㅅㄴㅇ료ㅕㅑ675ㅕㄷㄳㅇㄹ효ㅕㅏㅕ7ㅑ67ㅕ5ㄷㄳㅇㄽ겨',NULL,'2021-08-17 00:00:00','2021-08-13 13:37:19',NULL,NULL),(4,'dds@gami.com','한이음 코딩',NULL,'2021-08-12 00:00:00',NULL,NULL,NULL,'한이음',NULL,NULL,'팀 프로젝트','ㄹ오556ㄱ쇼ㅛㅕㅑㅕㅅㄱㄷㅅㄴㅇ료ㅕㅑ675ㅕㄷㄳㅇㄹ효ㅕㅏㅕ7ㅑ67ㅕ5ㄷㄳㅇㄽ겨',NULL,'2021-08-17 00:00:00','2021-08-13 13:37:20',NULL,NULL),(2,'ds@naver.com','서울대 프로젝트',NULL,'2021-08-12 00:00:00',NULL,NULL,NULL,'학교',NULL,NULL,'팀 프로젝트','ㄹ오556ㄱ쇼ㅛㅕㅑㅕㅅㄱㄷㅅㄴㅇ료ㅕㅑ675ㅕㄷㄳㅇㄹ효ㅕㅏㅕ7ㅑ67ㅕ5ㄷㄳㅇㄽ겨',NULL,'2021-08-17 00:00:00','2021-08-13 13:37:15',NULL,NULL),(24,'myungjin2009@naver.com','띵진이의 그룹','/image/Aperture science.jpg,/image/포토스케이프.png','2021-11-17 00:00:00',NULL,NULL,NULL,'김띵진','띵진김',NULL,'학교 조별 과제','들어오시오 휴먼',NULL,'2021-12-31 00:00:00','2021-11-17 16:56:55','없음',NULL),(25,'myungjin2009@naver.com','미친거 아늬니','/image/Aperture science.jpg,/image/challenger1_trevis68.jpg','2011-11-19 00:00:00',NULL,NULL,NULL,'김띵진','김띵진',NULL,'학교 조별 과제','띙즨의의 릐웩트',NULL,'2021-12-31 00:00:00','2021-11-19 00:23:17','없어 싀바라',NULL),(26,'myungjin2009@naver.com','히오스 그룹','/image/challenger1_trevis68.jpg,/image/heroes.jpg','2021-11-19 00:00:00',NULL,NULL,NULL,'불리자드','김띵진',NULL,'팀 프로젝트','어서오세요 시공 속으로',NULL,'2021-12-31 00:00:00','2021-11-19 15:11:51','시공',NULL),(1,'one0374@naver.com','상명대 프로젝트',NULL,'2021-08-12 00:00:00',NULL,NULL,NULL,'학교',NULL,NULL,'팀 프로젝트','ㄹ오556ㄱ쇼ㅛㅕㅑㅕㅅㄱㄷㅅㄴㅇ료ㅕㅑ675ㅕㄷㄳㅇㄹ효ㅕㅏㅕ7ㅑ67ㅕ5ㄷㄳㅇㄽ겨',NULL,'2021-08-17 00:00:00','2021-08-13 13:37:11',NULL,NULL),(15,'one0374@naver.com','666',NULL,'2021-09-16 14:19:47',NULL,NULL,NULL,'sss',NULL,NULL,'팀 프로젝트','33333',NULL,'2021-09-30 14:08:44','2021-09-30 14:08:53',NULL,NULL),(22,'one0374@naver.com','2022','/image/문제답안 (1).jpg,/image/KakaoTalk_20200820_231255648.jpg','2021-11-07 00:00:00',NULL,NULL,NULL,'2022','2022',NULL,'학교 조별 과제','2022',NULL,'2021-12-03 00:00:00','2021-11-09 13:56:18','2022',NULL),(23,'one0374@naver.com','1109','/image/KakaoTalk_20210604_140618085.jpg,/image/KakaoTalk_20201227_142000907.jpg','2021-11-02 00:00:00',NULL,NULL,NULL,'1109','1109',NULL,'학교 조별 과제','1109',NULL,'2021-12-10 00:00:00','2021-11-09 14:22:21','1109',NULL);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupusers`
--

DROP TABLE IF EXISTS `groupusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupusers` (
  `group_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `user` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `enjoy` blob,
  `leader` blob,
  `group_no` int NOT NULL,
  PRIMARY KEY (`group_name`,`user`,`group_no`) USING BTREE,
  KEY `FK_groupusers_user` (`user`),
  KEY `FK_groupusers_groups_2` (`group_no`),
  CONSTRAINT `FK_groupusers_groups` FOREIGN KEY (`group_name`) REFERENCES `groups` (`group_name`),
  CONSTRAINT `FK_groupusers_groups_2` FOREIGN KEY (`group_no`) REFERENCES `groups` (`group_no`),
  CONSTRAINT `FK_groupusers_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupusers`
--

LOCK TABLES `groupusers` WRITE;
/*!40000 ALTER TABLE `groupusers` DISABLE KEYS */;
INSERT INTO `groupusers` VALUES ('1109','bjh9807@naver.com',NULL,_binary '0',23),('1109','one0374@naver.com',NULL,_binary '1',23),('111111','bjh9807@naver.com',NULL,_binary '1',13),('111111','one0374@naver.com',NULL,_binary '0',13),('161616','bjh9807@naver.com',NULL,_binary '1',18),('2022','one0374@naver.com',NULL,_binary '1',22),('2222','bjh9807@naver.com',NULL,_binary '1',14),('3456765456','bjh9807@naver.com',NULL,_binary '1',11),('415','bjh9807@naver.com',NULL,_binary '1',19),('666','bjh9807@naver.com',NULL,_binary '0',15),('999999','bjh9807@naver.com',NULL,_binary '1',17),('9월30','bjh9807@naver.com',NULL,_binary '1',21),('dsdafasdfafa','bjh9807@naver.com',NULL,_binary '1',10),('m카페','bjh9807@naver.com',NULL,_binary '1',12),('ㅈㅈ12','bjh9807@naver.com',NULL,_binary '1',20),('띵진이의 그룹','myungjin2009@naver.com',NULL,_binary '1',24),('미친거 아늬니','myungjin2009@naver.com',NULL,_binary '1',25),('한양대 프로젝트','bjh9807@naver.com',NULL,_binary '0',9),('한양대 프로젝트','bjhbjhbjh99999@naver.com',NULL,_binary '0',9),('한양대 프로젝트','one0374@naver.com',NULL,_binary '0',9),('히오스 그룹','myungjin2009@naver.com',NULL,_binary '1',26);
/*!40000 ALTER TABLE `groupusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `evaluation_score` int DEFAULT NULL,
  `agreement` blob NOT NULL,
  `evaluation_text` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `clear_group` int DEFAULT NULL,
  `user_image` varchar(750) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `introduce` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_category` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `jwt` varchar(750) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('121a23123123@naver.com','sdfsdf','$2b$10$QDwi0irJkrCJIW4rTf2E1uA2vqLFck0jbxeY6skx.u14HcRMKjd2.',NULL,4,_binary '1',NULL,NULL,NULL,NULL,NULL,NULL),('123123123@naver.com','34567890-','$2b$10$MtxUXjwzW0veQdPjeHXYQeIGE9Jxe0JJ79z2yO2Rort9uzyUXkrbu',NULL,3,_binary '1',NULL,NULL,NULL,NULL,NULL,NULL),('123@naver.com','asdyte','$2b$10$nj4wZ3MzXy8TsF1UVokhIO.aOoBco2wSP10oYMAMW8YE0cKQTgzvS',NULL,4,_binary '1',NULL,NULL,NULL,NULL,NULL,NULL),('aj9807@naver.com','qweert','$2b$10$nw1AbWh5ASxGPk3KxFuPW.YOhioRHmZlfhRZos1kONAN5uGhar0hG',NULL,7,_binary '1',NULL,NULL,NULL,NULL,NULL,NULL),('aj9807@naver.comsdf','12@','$2b$10$DmU.hJ0rqtp/k4V2SOeFse2BxIsGRDufr/XD14U5/wQiOoGN4Ti/6',NULL,44,_binary '1',NULL,NULL,NULL,NULL,NULL,NULL),('bjh9807','sdfghjklkjresasdfghjkjhgf','$2b$10$5YfxMN71GRduWrThY0eTN.dPLik7eOoP5HNsw69xYGbXXfYcWa0NC',NULL,33,_binary '1',NULL,NULL,NULL,NULL,NULL,NULL),('bjh9807@naver.com','백정훈','$2b$10$rPKSfXmj6p81cxkyh9pUS.hk9vZQf2/pBlb8/mqkrBm8TVkTz8zmq',NULL,90,_binary '1',NULL,NULL,'DEFAULT','이것은 테스트 입니다 동해물과 백두산이 마르고',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJqaDk4MDdAbmF2ZXIuY29tIiwiaWF0IjoxNjM3MzA0NDIxLCJleHAiOjE2MzczMDgwMjF9.DCAiSPsmJ8LdbH0szoKCqpHAF-qRsGqGn-te76ssrsk'),('bjhbjhbjh99999@naver.com','바바바','$2b$10$Tqc5W4F.Il/VulOyksCgnuuPG9G6LpUyspAxcALnrRkMXxHwGtL/e',NULL,55,_binary '1',NULL,NULL,NULL,NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJqaGJqaGJqaDk5OTk5QG5hdmVyLmNvbSIsImlhdCI6MTYzMTE2NzM1MSwiZXhwIjoxNjMxMTcwOTUxfQ.8C4uKHMzopPMyueP9247gJEagVZisgsoBx4bAFwA6v8'),('cdsd@dd.com','익명67','$2b$10$S3dmLM8/qiHknGtULIt31uxWQpGy11qDQq88RrGXHmAGSren8KDIO',NULL,5,_binary '1',NULL,NULL,NULL,'쪽지할사람 여자만^^',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkc2RAZGQuY29tIiwiaWF0IjoxNjI4NjczNzYzLCJleHAiOjE2Mjg2NzczNjN9.9J4Ecz1Zmq4Z_dWuJuUavkg_j38NpYg6qgLQiPPpBUM'),('cxc@naver.codddddd','21584','$2b$10$DlRqZDZmPTKZSBmXFiMSyO/WUeXgdgPThOdE1cVPaJEePLoF3rhZO',NULL,44,_binary '1',NULL,NULL,NULL,NULL,NULL,NULL),('dds@gami.com','Cindy','$2b$10$Hd8uvRkVYSkrTSUErYLXZellLVgFYTAKSS8wXumV3RNx9hm6PAe/.',NULL,55,_binary '1',NULL,NULL,'/image/662bbe35400abf1cedc67e1cf9ec087e','모두들 잘해주셔서 제가 할 게 없군요',NULL,NULL),('ds@naver.com','1q1','$2b$10$kXoBmd7HI5xAFW.CUts3Q.Tuegf3PM397M5bunKbI7NgtC5A3bmbi',NULL,22,_binary '1',NULL,NULL,NULL,NULL,NULL,NULL),('myungjin2009@naver.com','띵진이얌','$2b$10$n6VISwLkG1FZ9MTkJjE62OLBVeeRsVgdF8ZCcPATbBEOcN3QTxM.y',NULL,999,_binary '1',NULL,NULL,'/image/8260a38cb7438f4b56a5a30cc90ccc40','나 진짜 아무것도 할 줄 몰라요 버스탈거임 ㅋ',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im15dW5namluMjAwOUBuYXZlci5jb20iLCJpYXQiOjE2MzczMzA4MDEsImV4cCI6MTYzNzMzNDQwMX0.SaSnEfFCrptz2V8VSNqohz2nAXjzQ9SImi2kbxDCYQo'),('one0374@naver.com','박건형','$2b$10$pLr3dxVV8vhpDaxRSWnrMuymV0OwcOyXJdvu0uy6v1m/Z/YukhWC6',NULL,99,_binary '1',NULL,NULL,'/image/e5255fa578a4e2b72b082d218c637754','나는 박건형',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im9uZTAzNzRAbmF2ZXIuY29tIiwiaWF0IjoxNjMxNzgyMTU4LCJleHAiOjE2MzE3ODU3NTh9.QIwSorBDMJ7yBMeIQqdKa8mmIANOOXtA2ocdg_SZh7Q'),('saadsda@naver.com','4fs`','$2b$10$HKnExSVWnmR33.b77J9E4eLPPEBOmAB1v8IJ7OXvWdmp/.iG3oiPm',NULL,11,_binary '1',NULL,NULL,NULL,NULL,NULL,NULL),('_12312312@naver.codddddd','@21584','$2b$10$9Fl0IrYgInEH1JU2kRd77ewmfxn45VkyVaOK4RDOnjQNq390/GdDu',NULL,44,_binary '1',NULL,NULL,NULL,NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Il8xMjMxMjMxMkBuYXZlci5jb2RkZGRkZCIsImlhdCI6MTYyODY2OTM5NSwiZXhwIjoxNjI4NjcyOTk1fQ.A_hdNdY9HDOTJ5blntmB70bBq1zCWqBvhnyc607aWAM');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote` (
  `board_number` int NOT NULL,
  `discuss` int DEFAULT NULL,
  `user` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `group` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  PRIMARY KEY (`board_number`,`user`,`group`) USING BTREE,
  KEY `FK_vote_user` (`user`),
  KEY `FK__groupboard_2` (`group`),
  CONSTRAINT `FK__groupboard` FOREIGN KEY (`board_number`) REFERENCES `groupboard` (`board_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__groupboard_2` FOREIGN KEY (`group`) REFERENCES `groupboard` (`info_groupname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_vote_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (1,2,'123@naver.com','기능사 스터디'),(1,1,'aj9807@naver.comsdf','코딩 스터디'),(1,1,'bjh9807@naver.com','삼육대 프로젝트'),(1,1,'bjh9807@naver.com','한양대 프로젝트'),(1,1,'ds@naver.com','기능사 스터디'),(1,1,'myungjin2009@naver.com','띵진이의 그룹'),(1,2,'one0374@naver.com','한양대 프로젝트'),(2,1,'aj9807@naver.comsdf','기능사 스터디'),(2,1,'bjh9807@naver.com','한양대 프로젝트'),(2,2,'bjhbjhbjh99999@naver.com','한양대 프로젝트'),(2,1,'one0374@naver.com','한양대 프로젝트'),(3,2,'123@naver.com','기능사 스터디');
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote2`
--

DROP TABLE IF EXISTS `vote2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote2` (
  `board_number` int NOT NULL,
  `discuss` int DEFAULT NULL,
  `user` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  `group` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '11',
  PRIMARY KEY (`board_number`,`user`),
  KEY `FK__user` (`user`),
  KEY `FK__groupnotice_2` (`group`),
  CONSTRAINT `FK__groupnotice` FOREIGN KEY (`board_number`) REFERENCES `groupnotice` (`board_number`),
  CONSTRAINT `FK__groupnotice_2` FOREIGN KEY (`group`) REFERENCES `groupnotice` (`info_groupname`),
  CONSTRAINT `FK__user` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote2`
--

LOCK TABLES `vote2` WRITE;
/*!40000 ALTER TABLE `vote2` DISABLE KEYS */;
INSERT INTO `vote2` VALUES (1,2,'bjh9807@naver.com','한양대 프로젝트'),(1,2,'cxc@naver.codddddd','토익 스터디'),(1,1,'ds@naver.com','토익 스터디'),(2,1,'cdsd@dd.com','삼육대 프로젝트'),(3,1,'cdsd@dd.com','상명대 프로젝트');
/*!40000 ALTER TABLE `vote2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-20 12:20:25
