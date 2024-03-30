-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 30, 2024 at 04:54 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `MRS`
--

CREATE TABLE `MRS` (
  `id` int NOT NULL COMMENT 'เลข id',
  `name_surname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'ชื่อ-นามสกุล',
  `age` int NOT NULL COMMENT 'อายุ',
  `chronic_disease` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'โรคประจำตัว',
  `date_of_service` datetime NOT NULL COMMENT 'วันที่รับบริการ',
  `initial_symptoms` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'อาการเบื้องต้น',
  `diagnosis` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'การวินิจฉัย',
  `treatment_and_prescribed_medication` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'การรักษาและยาที่ให้',
  `appointment_date` datetime NOT NULL COMMENT 'วันที่นัด',
  `attending_physician` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'แพทย์ที่นัด',
  `appointment_details` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'รายละเอียดการนัด'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `MRS`
--

INSERT INTO `MRS` (`id`, `name_surname`, `age`, `chronic_disease`, `date_of_service`, `initial_symptoms`, `diagnosis`, `treatment_and_prescribed_medication`, `appointment_date`, `attending_physician`, `appointment_details`) VALUES
(3, 'asdasd1', 133, 'asdasda', '2024-03-20 00:00:00', 'asdasd', 'asdzxc', 'asdasdads', '2024-03-21 00:00:00', 'asdasd', 'asdadsads'),
(4, 'sdaasd', 2323, 'asdasd', '2024-03-05 00:00:00', 'asdasd', 'asdasd', 'asdasd', '2024-03-20 00:00:00', 'asdasd', 'asdasd'),
(5, 'asdasd', 32, 'asdasd', '2024-03-30 00:00:00', 'asdasdad', 'asdasd', 'adsasdad', '2024-03-30 00:00:00', 'asdasd', 'asdasd'),
(6, 'dsdfsdf', 232, 'sdadas', '2024-03-30 00:00:00', 'ghfgh', 'bnvb', 'vbnvbn', '2024-03-28 00:00:00', 'jghjgh', '6hgj7ghj');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `MRS`
--
ALTER TABLE `MRS`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `MRS`
--
ALTER TABLE `MRS`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'เลข id', AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
