-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 03 juin 2025 à 17:07
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
-- Structure de la table `agences`
--

DROP TABLE IF EXISTS `agences`;
CREATE TABLE IF NOT EXISTS `agences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `adresse` text NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `appartements`
--

DROP TABLE IF EXISTS `appartements`;
CREATE TABLE IF NOT EXISTS `appartements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_batiment` int NOT NULL,
  `numero` varchar(10) NOT NULL,
  `superficie` float NOT NULL,
  `loyer_mensuel` decimal(10,2) NOT NULL,
  `etat` varchar(50) DEFAULT 'disponible',
  `type` varchar(20) DEFAULT NULL,
  `nombre_pieces` int DEFAULT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_batiment` (`id_batiment`,`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `batiments`
--

DROP TABLE IF EXISTS `batiments`;
CREATE TABLE IF NOT EXISTS `batiments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `adresse` text NOT NULL,
  `nb_appartements` int NOT NULL,
  `proprietaire` varchar(100) DEFAULT NULL,
  `id_agence` int NOT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_agence` (`id_agence`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `documents`
--

DROP TABLE IF EXISTS `documents`;
CREATE TABLE IF NOT EXISTS `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `chemin` varchar(255) NOT NULL,
  `id_utilisateur` int DEFAULT NULL,
  `id_appartement` int DEFAULT NULL,
  `id_location` int DEFAULT NULL,
  `date_upload` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_appartement` (`id_appartement`),
  KEY `id_location` (`id_location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `locataires`
--

DROP TABLE IF EXISTS `locataires`;
CREATE TABLE IF NOT EXISTS `locataires` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `piece_identite` varchar(100) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `profession` varchar(100) DEFAULT NULL,
  `revenu_mensuel` decimal(10,2) DEFAULT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `locations`
--

DROP TABLE IF EXISTS `locations`;
CREATE TABLE IF NOT EXISTS `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_appartement` int NOT NULL,
  `id_locataire` int NOT NULL,
  `id_agent` int NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `loyer_mensuel` decimal(10,2) NOT NULL,
  `caution` decimal(10,2) NOT NULL,
  `jour_paiement` int NOT NULL,
  `conditions` text,
  `statut` enum('en_cours','termine','resilie') DEFAULT 'en_cours',
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_appartement` (`id_appartement`),
  KEY `id_locataire` (`id_locataire`),
  KEY `id_agent` (`id_agent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `logs`
--

DROP TABLE IF EXISTS `logs`;
CREATE TABLE IF NOT EXISTS `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `entite` varchar(50) NOT NULL,
  `id_entite` int NOT NULL,
  `details` text,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `medias`
--

DROP TABLE IF EXISTS `medias`;
CREATE TABLE IF NOT EXISTS `medias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chemin` varchar(255) NOT NULL,
  `nom_fichier` varchar(100) NOT NULL,
  `media_type` enum('PHOTO','VIDEO') NOT NULL,
  `entite_type` enum('UTILISATEUR','BATIMENT','APPARTEMENT') NOT NULL,
  `id_utilisateur` int DEFAULT NULL,
  `id_batiment` int DEFAULT NULL,
  `id_appartement` int DEFAULT NULL,
  `date_upload` datetime DEFAULT CURRENT_TIMESTAMP,
  `est_principal` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_batiment` (`id_batiment`),
  KEY `id_appartement` (`id_appartement`)
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expediteur_id` int NOT NULL,
  `destinataire_id` int NOT NULL,
  `sujet` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `date_envoi` datetime DEFAULT CURRENT_TIMESTAMP,
  `lu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `expediteur_id` (`expediteur_id`),
  KEY `destinataire_id` (`destinataire_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `paiements`
--

DROP TABLE IF EXISTS `paiements`;
CREATE TABLE IF NOT EXISTS `paiements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_location` int NOT NULL,
  `date_paiement` date NOT NULL,
  `montant` decimal(10,2) NOT NULL,
  `mode_paiement` varchar(50) NOT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `statut` enum('recu','en_attente','rejete') DEFAULT 'recu',
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_location` (`id_location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `quittances`
--

DROP TABLE IF EXISTS `quittances`;
CREATE TABLE IF NOT EXISTS `quittances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_paiement` int NOT NULL,
  `numero_quittance` varchar(50) NOT NULL,
  `date_emission` date NOT NULL,
  `periode_debut` date NOT NULL,
  `periode_fin` date NOT NULL,
  `chemin_pdf` varchar(255) DEFAULT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_quittance` (`numero_quittance`),
  KEY `id_paiement` (`id_paiement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `token` varchar(64) DEFAULT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `contrats`
--
DROP TABLE IF EXISTS `contrat`;
CREATE TABLE IF NOT EXISTS `contrat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_location` int NOT NULL,
  `id_locataire` int NOT NULL,
  `id_appartement` int NOT NULL,
  `id_agent` int NOT NULL,
  `numero_contrat` varchar(50) NOT NULL,
  `type_contrat` enum('BAIL','SOUS_LOCATION','COMMERCIAL') NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `loyer_mensuel` decimal(10,2) NOT NULL,
  `caution` decimal(10,2) NOT NULL,
  `avance` decimal(10,2) NOT NULL,
  `frais_agence` decimal(10,2) DEFAULT '0.00',
  `pourcentage_retard` int DEFAULT '0',
  `jour_paiement` int NOT NULL,
  `prochaine_date_paiement` date DEFAULT NULL,
  `etat` enum('actif','en_cours','resilie') DEFAULT 'en_cours',
  `conditions_particulieres` text,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_modification` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_contrat` (`numero_contrat`),
  KEY `id_location` (`id_location`),
  KEY `id_locataire` (`id_locataire`),
  KEY `id_appartement` (`id_appartement`),
  KEY `id_agent` (`id_agent`),
  CONSTRAINT `fk_contrat_location` FOREIGN KEY (`id_location`) REFERENCES `locations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_contrat_locataire` FOREIGN KEY (`id_locataire`) REFERENCES `locataires` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_contrat_appartement` FOREIGN KEY (`id_appartement`) REFERENCES `appartements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_contrat_agent` FOREIGN KEY (`id_agent`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `role`, `telephone`, `genre`, `token`, `date_creation`) VALUES
(1, 'Sall', 'Eva', 'evachou792@gmail.com', '$2y$10$g4dK7a3mKdXY8j3A5X.2HOakR4rv3j6YmzXDSu/ChlqelgNMnvOOO', 'ADMIN', '782141764', 'FEMME', '41974425222b6f234d52cbe0e172d673bc3b5bb55956156176cd4d42a0c718b0', '2025-06-03 12:49:59'),
(2, 'Ndiaye', 'Mamadou', 'mamdou2@gmail.com', '$2y$10$i6GSWx07.8DLQ75Wtceuku.fKpXhCGaCld1Gbr5M/l.H.OzKU3XGG', 'ADMIN', '770000000', 'HOMME', NULL, '2025-06-03 12:49:59'),
(3, 'Ndiaye', 'Mody', 'modyyerondiaye@gmail.com', '$2y$10$eJeaGMzKOgCDZoUfUL6bKO0Ap8lkqm5DW0DQNKtkRxxyBAGNLhx9O', 'AGENT', '770819648', 'HOMME', NULL, '2025-06-03 12:50:00'),
(4, 'Touré', 'Salam', 'toureabdousalam934@gmail.com', '$2y$10$nKSE5IOnJA9wlKlQuNzziO.c95I886zhohakZEwQHRO5ZRiSImEH2', 'AGENT', '784864511', 'HOMME', '3a1ee8db47e0505bcd8b7ec12109d0e57e2cc9e78277e39f67bcc5d5d72b1826', '2025-06-03 12:50:00'),
(5, 'Keita', 'Hawa', '772493760aliciakeita@gmail.com', '$2y$10$bit7nbk78cznZ/rsVA5KVORFiQqbLMJL4d9Ld.xlNPFqkcNzd9iAe', 'AGENT', '772493760', 'FEMME', NULL, '2025-06-03 12:50:00'),
(6, 'Gueye', 'Aly', 'alygueye1406@gmail.com', '$2y$10$fPVOYle1aBvNpkLSRLRY.OStv.8QaN.sp3bZurzwOwFWnVj7TalSy', 'AGENT', '786638879', 'HOMME', NULL, '2025-06-03 12:50:00'),
(7, 'Sall', 'Awa', 'evasall648@gmail.com', '$2y$10$9pQcQ26VI4iwkbW47YX8DuNimkZSyBtcxF5JCGMxJEdt1M9Jl5UZ.', 'AGENT', '777924891', 'FEMME', NULL, '2025-06-03 12:50:00'),
(8, 'Basse', 'Françoise', 'bassefrancoise@gmail.com', '$2y$10$ZF1J9EVbCJHD7eR.G3fDF.E6H1i17B1eQ2uwa65ceqBfxBWJKWmrG', 'AGENT', '0689012345', 'FEMME', '096e27d5a366d99034a36c07a1ea571dfd7e6a4c3357c2d965d8b0734c36a76c', '2025-06-03 12:50:00'),
(9, 'Dieng', 'Ndeye Awa', 'locataire1@example.com', '$2y$10$RFXmx6Flk6IpzACjGSK1vuQiCRd6zHHSUNytq7ivoH3IcJ0ofs1wy', 'LOCATAIRE', '768393648', 'FEMME', NULL, '2025-06-03 12:50:00'),
(10, 'Bakana', 'Danicha', 'danichabakana@gmail.com', '$2y$10$7RIHOVlBZAB8Kqi3u9brlu5EAOnN.ISR9t5G0V1Ha3VtuOjLbaj2u', 'LOCATAIRE', '785368033', 'HOMME', NULL, '2025-06-03 12:50:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
