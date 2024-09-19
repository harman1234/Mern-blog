-- MySQL dump 10.13  Distrib 8.3.0, for macos12.7 (arm64)
--
-- Host: localhost    Database: ZBLOG
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `Authors`
--

DROP TABLE IF EXISTS `Authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Authors` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Author_id` int NOT NULL,
  `Follower` int NOT NULL,
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Author_id_idx` (`Author_id`),
  CONSTRAINT `user` FOREIGN KEY (`Author_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authors`
--

LOCK TABLES `Authors` WRITE;
/*!40000 ALTER TABLE `Authors` DISABLE KEYS */;
INSERT INTO `Authors` VALUES (11,11,0);
/*!40000 ALTER TABLE `Authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Blog`
--

DROP TABLE IF EXISTS `Blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Blog` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Author_id` int NOT NULL,
  `Category_id` int NOT NULL,
  `Content` text NOT NULL,
  `date` datetime DEFAULT NULL,
  `Title` text,
  `Like_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Author_idx` (`Author_id`),
  KEY `id_idx` (`Category_id`),
  CONSTRAINT `author` FOREIGN KEY (`Author_id`) REFERENCES `Authors` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Category` FOREIGN KEY (`Category_id`) REFERENCES `Categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Blog`
--

LOCK TABLES `Blog` WRITE;
/*!40000 ALTER TABLE `Blog` DISABLE KEYS */;
INSERT INTO `Blog` VALUES (38,11,4,'<p>Change is an inevitable part of life. Whether it’s a new job, moving to a different city, or even shifts in personal relationships, we all face transitions that can be both exciting and daunting. Embracing change can be a challenge, but cultivating adaptability can turn these moments of uncertainty into opportunities for growth.</p><h4>Understanding Change</h4><p><br></p><p>At its core, change is a transformation that alters our circumstances. It can happen gradually or suddenly, and while it often comes with discomfort, it can also lead to personal development. The key to navigating change lies in our mindset. Rather than viewing change as a threat, we can reframe it as a chance to learn and evolve.</p><h4>The Benefits of Adaptability</h4><p><br></p><p>Adaptability is the ability to adjust to new conditions. This skill is crucial in today’s fast-paced world, where technology and societal norms are constantly evolving. Here are some benefits of being adaptable:</p><ol><li><strong>Resilience</strong>: Adaptable individuals tend to bounce back from setbacks more quickly. This resilience allows us to handle stress and recover from challenges with greater ease.</li><li><strong>Openness to Opportunities</strong>: When we are flexible, we are more likely to seize unexpected opportunities. This openness can lead to new experiences, friendships, and career advancements that we might not have pursued otherwise.</li><li><strong>Improved Problem-Solving Skills</strong>: Adapting to change often requires us to think critically and creatively. This enhanced problem-solving ability can be beneficial in both personal and professional settings.</li></ol><h4>Strategies for Cultivating Adaptability</h4><ol><li><strong>Shift Your Perspective</strong>: Practice viewing change as an opportunity rather than a setback. When faced with a challenge, ask yourself what you can learn from the experience.</li><li><strong>Stay Informed</strong>: Keeping up with trends and developments in your field or interests can help you anticipate changes and adapt more easily. Continuous learning is essential for staying relevant.</li><li><strong>Develop a Support Network</strong>: Surround yourself with adaptable people. A supportive network can provide guidance, share experiences, and offer new perspectives, making it easier to embrace change.</li><li><strong>Practice Mindfulness</strong>: Mindfulness techniques, such as meditation and deep breathing, can help you remain calm and centered during times of change. This clarity allows for better decision-making.</li><li><strong>Set Goals</strong>: When faced with a significant change, break it down into smaller, manageable goals. This approach makes the transition less overwhelming and provides a clear path forward.</li></ol><h4>Real-Life Examples</h4><p><br></p><p>Consider the story of a woman who lost her job during an economic downturn. Instead of succumbing to despair, she took the opportunity to explore her passions. She enrolled in a course on digital marketing, learned new skills, and eventually launched her own successful freelance business. Her ability to adapt turned a challenging situation into a fulfilling career path.</p><p>Similarly, think about a recent graduate entering a competitive job market. By remaining open to various roles and industries, they may discover opportunities in unexpected places, leading to a diverse and enriching career.</p><h4>Conclusion</h4><p><br></p><p>Change is a natural part of life, and while it can be unsettling, it also brings the potential for growth and discovery. By embracing adaptability, we can navigate life’s transitions with confidence and resilience. Remember, every change is an opportunity in disguise—so welcome it with open arms and an open mind. As we learn to adapt, we not only improve our own lives but also inspire those around us to do the same.</p>','2024-09-19 00:00:00','Importance of life: Find the meaning of real life and how to live it',2);
/*!40000 ALTER TABLE `Blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `category_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (5,'entertaiment'),(6,'ENTERTAINMENT'),(3,'history'),(4,'polititcs'),(1,'science'),(2,'technology');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Blog_id` int NOT NULL,
  `user_id` int NOT NULL,
  `Comment` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `Blog_idx` (`Blog_id`),
  KEY `Commenter_idx` (`user_id`),
  CONSTRAINT `CBlog` FOREIGN KEY (`Blog_id`) REFERENCES `Blog` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Commenter` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (13,38,12,'aprreciate it realyy good blog');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FOLLOWERS`
--

DROP TABLE IF EXISTS `FOLLOWERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FOLLOWERS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` int NOT NULL,
  `follower` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_follower_author` (`author`,`follower`),
  KEY `followers_ibfk_2` (`follower`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`author`) REFERENCES `Authors` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`follower`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FOLLOWERS`
--

LOCK TABLES `FOLLOWERS` WRITE;
/*!40000 ALTER TABLE `FOLLOWERS` DISABLE KEYS */;
/*!40000 ALTER TABLE `FOLLOWERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Follower_Increase` AFTER INSERT ON `followers` FOR EACH ROW BEGIN 
	UPDATE AUTHORS SET FOLLOWER = FOLLOWER + 1 WHERE Id = NEW.author;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Follower_decrease` BEFORE DELETE ON `followers` FOR EACH ROW BEGIN 
	UPDATE AUTHORS SET FOLLOWER = FOLLOWER - 1 WHERE Id = OLD.author;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Likes`
--

DROP TABLE IF EXISTS `Likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Blog_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `unique_blog_author` (`Blog_id`,`user_id`),
  KEY `Blog_idx` (`Blog_id`),
  KEY `Liker_idx` (`user_id`),
  CONSTRAINT `Blog` FOREIGN KEY (`Blog_id`) REFERENCES `Blog` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Liker` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Likes`
--

LOCK TABLES `Likes` WRITE;
/*!40000 ALTER TABLE `Likes` DISABLE KEYS */;
INSERT INTO `Likes` VALUES (54,38,12),(55,38,13);
/*!40000 ALTER TABLE `Likes` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Likes_increase` AFTER INSERT ON `likes` FOR EACH ROW BEGIN
    UPDATE Blog 
    SET Like_count = Like_count + 1 
    WHERE Id = NEW.Blog_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Likes_decrease` BEFORE DELETE ON `likes` FOR EACH ROW BEGIN
    UPDATE Blog 
    SET Like_count = Like_count - 1 
    WHERE Id = OLD.Blog_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` text NOT NULL,
  `Verified` tinyint NOT NULL DEFAULT '0',
  `Author_status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (11,'Deepnakshi','Thakur','deepankshi123@gmail.com','452c8d52c5ed097f288422d812ae4d4d659e66e7b66aac6bc05d341d90aff43a',0,1),(12,'harman','sidhu','98harman13@gmail.com','452c8d52c5ed097f288422d812ae4d4d659e66e7b66aac6bc05d341d90aff43a',0,0),(13,'harman','sidhu','hs@gmail.com','452c8d52c5ed097f288422d812ae4d4d659e66e7b66aac6bc05d341d90aff43a',0,0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Author_update` AFTER UPDATE ON `users` FOR EACH ROW BEGIN 
    IF NEW.Author_status <> OLD.Author_status THEN 
        IF NEW.Author_status = TRUE THEN 
            INSERT INTO Authors(Author_id, Follower) VALUES (NEW.id, 0); 
        ELSE 
            DELETE FROM Authors WHERE Author_id = NEW.id; 
        END IF; 
    END IF; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-20  4:25:20
