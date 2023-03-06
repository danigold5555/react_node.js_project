CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followed_vacations`
--

DROP TABLE IF EXISTS `followed_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed_vacations` (
  `vacation_id` int DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  KEY `FK_followed_id` (`vacation_id`),
  CONSTRAINT `FK_followed_id` FOREIGN KEY (`vacation_id`) REFERENCES `vacations_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed_vacations`
--

LOCK TABLES `followed_vacations` WRITE;
/*!40000 ALTER TABLE `followed_vacations` DISABLE KEYS */;
/*!40000 ALTER TABLE `followed_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL DEFAULT '"',
  `is_logged_in` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations_table`
--

DROP TABLE IF EXISTS `vacations_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `amount_of_followers` int NOT NULL,
  `is_followed` int NOT NULL,
  `img_url` varchar(300) NOT NULL,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `destination_UNIQUE` (`destination`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations_table`
--

LOCK TABLES `vacations_table` WRITE;
/*!40000 ALTER TABLE `vacations_table` DISABLE KEYS */;
INSERT INTO `vacations_table` VALUES (1,'Paris',680,0,0,'https://www.toureiffel.paris/sites/default/files/actualite/image_principale/vue_depuisjardins_webbanner_3.jpg','2022-01-05','2022-08-05'),(2,'Rome',200,0,0,'https://cdn.britannica.com/02/179502-138-AE3BE74C/effects-construction-Rome-Colosseum.jpg','2022-05-06','2022-10-06'),(3,'London',200,0,0,'https://media.ticmate.com//resources/ticmate_live/upload_go/9e062c852a50939e-LondonEyeMobile4.jpg','2022-06-06','2022-12-06'),(4,'Tel-Aviv',800,0,0,'https://i0.wp.com/www.touristisrael.com/wp-content/uploads/2020/06/Best-areas-to-stay-in-Tel-Aviv-scaled-e1593008399620.jpg?fit=1506%2C1000&ssl=','2022-07-12','2022-12-12'),(5,'New-York',980,0,0,'https://static5.depositphotos.com/1030296/395/i/950/depositphotos_3958211-stock-photo-new-york-cityscape-tourism-concept.jpg','2022-01-11','2022-10-11'),(6,'Athens',700,0,0,'https://schoolworkhelper.net/wp-content/uploads/2011/06/The-Parthenon.jpg','2022-05-10','2022-10-10'),(7,'Madrid',555,0,0,'https://www.tripsavvy.com/thmb/vLOWxjCoy7EO8RGxOifrMLCQrPY=/1500x1004/filters:fill(auto,1)/thingstodoinmadridskyline-d05bf06ef9144f04973d5bfc50fbcee6.jpg','2022-08-27','2022-09-01'),(8,'Dublin',600,0,0,'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR2eXgqV-_bRbmLjpxpCKI7OhjtblDF8WOL4_g7mK2-tOlGHLGRTlUN7JOkkJtf','2022-09-24','2022-09-30'),(9,'Monaco',700,0,0,'https://www.visitmonaco.com/ImageRepository/PageListe/ebfef823-815b-45ad-b3c0-2339c85e8b0e/Slider/3-shutterstock-427693039.jpg?Width=2500&Height=1250','2022-06-08','2022-06-15');
/*!40000 ALTER TABLE `vacations_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-09 14:31:45
