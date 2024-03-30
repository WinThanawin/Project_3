-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 30, 2024 at 09:52 AM
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
-- Table structure for table `Medical_Records_System`
--

CREATE TABLE `Medical_Records_System` (
  `id` int NOT NULL COMMENT 'เลข id',
  `name_surname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'ชื่อ-นามสกุล',
  `age` int NOT NULL COMMENT 'อายุ',
  `chronic_disease` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'โรคประจำตัว',
  `date_of_service` date NOT NULL COMMENT 'วันที่รับบริการ',
  `initial_symptoms` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'อาการเบื้องต้น',
  `diagnosis` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'การวินิจฉัย',
  `treatment_and_prescribed_medication` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'การรักษาและยาที่ให้',
  `appointment_date` date NOT NULL COMMENT 'วันที่นัด',
  `attending_physician` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'แพทย์ที่นัด',
  `appointment_details` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'รายละเอียดการนัด'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Medical_Records_System`
--

INSERT INTO `Medical_Records_System` (`id`, `name_surname`, `age`, `chronic_disease`, `date_of_service`, `initial_symptoms`, `diagnosis`, `treatment_and_prescribed_medication`, `appointment_date`, `attending_physician`, `appointment_details`) VALUES
(1, 'สมชาย ใจดี', 45, 'ไม่มี', '2024-03-10', 'ถ่ายเหลว', 'ท้องเสีย', 'ให้ยาแก้ท้องเสียกับยาผงถ่านไป', '2024-03-13', 'มั่งมี ศรีสุข', 'ดูอาการหลังทานยา');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Medical_Records_System`
--
ALTER TABLE `Medical_Records_System`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Medical_Records_System`
--
ALTER TABLE `Medical_Records_System`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'เลข id', AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
