-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 03 juin 2025 à 12:50
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_immo`
--

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('ADMIN','AGENT','LOCATAIRE') NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `genre` enum('HOMME','FEMME') DEFAULT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `role`, `telephone`, `genre`, `date_creation`) VALUES
(1, 'Sall', 'Eva', 'evachou792@gmail.com', 'admin123', 'ADMIN', '782141764', 'FEMME', '2025-06-03 12:49:59'),
(2, 'Ndiaye', 'Mamadou', 'mamdou2@gmail.com', 'admin456', 'ADMIN', '770000000', 'HOMME', '2025-06-03 12:49:59'),
(3, 'Ndiaye', 'Mody', 'modyyerondiaye@gmail.com', 'agent123', 'AGENT', '770819648', 'HOMME', '2025-06-03 12:50:00'),
(4, 'Touré', 'Salam', 'toureabdousalam934@gmail.com', 'agent456', 'AGENT', '784864511', 'HOMME', '2025-06-03 12:50:00'),
(5, 'Keita', 'Hawa', '772493760aliciakeita@gmail.com', 'agent789', 'AGENT', '772493760', 'FEMME', '2025-06-03 12:50:00'),
(6, 'Gueye', 'Aly', 'alygueye1406@gmail.com', 'agent101', 'AGENT', '786638879', 'HOMME', '2025-06-03 12:50:00'),
(7, 'Sall', 'Awa', 'evasall648@gmail.com', 'agent102', 'AGENT', '777924891', 'FEMME', '2025-06-03 12:50:00'),
(8, 'Basse', 'Françoise', 'bassefrancoise@gmail.com', 'agent103', 'AGENT', '0689012345', 'FEMME', '2025-06-03 12:50:00'),
(9, 'Dieng', 'Ndeye Awa', 'locataire1@example.com', 'loc123', 'LOCATAIRE', '768393648', 'FEMME', '2025-06-03 12:50:00'),
(10, 'Bakana', 'Danicha', 'danichabakana@gmail.com', 'loc456', 'LOCATAIRE', '785368033', 'HOMME', '2025-06-03 12:50:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
