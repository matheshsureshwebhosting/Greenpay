-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2021 at 02:23 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `greenpay`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(100) NOT NULL,
  `email` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `wallet` int(255) NOT NULL DEFAULT 0,
  `role` varchar(256) NOT NULL DEFAULT 'admin',
  `userid` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `name`, `number`, `wallet`, `role`, `userid`, `date`) VALUES
(1, 's.kalidas120799@gmail.com', 'Kalidas', '9080711080', 0, 'admin', 's.kalidas120799@gmail.com', '2021-07-29 04:56:23');

-- --------------------------------------------------------

--
-- Table structure for table `all_certificates`
--

CREATE TABLE `all_certificates` (
  `id` int(255) NOT NULL,
  `certificateid` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `appliedname` varchar(256) NOT NULL,
  `appliedemail` varchar(256) NOT NULL,
  `appliedeno` varchar(256) NOT NULL,
  `certificatename` varchar(256) NOT NULL,
  `certificates` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `slip` varchar(256) NOT NULL DEFAULT 'null',
  `iscomplete` varchar(256) NOT NULL DEFAULT 'false',
  `userid` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_certificates`
--

INSERT INTO `all_certificates` (`id`, `certificateid`, `name`, `email`, `number`, `appliedname`, `appliedemail`, `appliedeno`, `certificatename`, `certificates`, `slip`, `iscomplete`, `userid`, `date`) VALUES
(7, '1627622295107', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Widow Certificate', '[{\"photo\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FWidowcertificate%2Fphoto%2F\'%20%2B%201627622262169.jpeg?alt=media&token=bc46d56e-2212-41d2-8bdf-3c3be6f2faf8\"},{\"death\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FWidowcertificate%2Fdeath%2F\'%20%2B%201627622274542.jpeg?alt=media&token=a38ef818-53d7-41e2-9b23-102b82f595ca\"},{\"address\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FWidowcertificate%2Faddress%2F\'%20%2B%201627622268959.jpeg?alt=media&token=55fe3842-35aa-4b8e-81a1-4c64099f76aa\"},{\"marrage\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FWidowcertificate%2Fmarrage%2F\'%20%2B%201627622281426.jpeg?alt=media&token=4e7e15e5-6a29-45de-8081-a565a26e064c\"},{\"self\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FWidowcertificate%2Fself%2F\'%20%2B%201627622288427.jpeg?alt=media&token=a39c35b6-a576-4b74-a25d-f26a9e8a3cdb\"},{\"others\":\"none\"}]', 'null', 'false', '1627534633601', '2021-07-30 05:18:15'),
(8, '1627622487667', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Widow Pension', '[{\"photo\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FResidential%2Fphoto%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=248f1c0f-0ff5-473a-885f-31786f5f1190\"},{\"smart\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FResidential%2Fsmart%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=876b572f-ac49-478c-b909-fe15dd29bfca\"},{\"aadhar\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FResidential%2Faadhar%2F\'%20%2B%20111434468_gettyimages-1143489763.jpg?alt=media&token=b13cdf1a-2524-41c9-8379-0a90b364afc6\"},{\"sign\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FResidential%2Fsign%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=2d4e4d44-3726-426d-8d23-139e80291e57\"},{\"others\":\"none\"}]', 'null', 'false', '77818rgy', '2021-07-30 05:21:27'),
(9, '1627622694293', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Widow Pension', '[{\"photo\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FResidential%2Fphoto%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=3e058543-adb7-41c7-9c75-18dc0618e7b5\"},{\"smart\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FResidential%2Fsmart%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=2cf2db98-71cf-4633-9352-e7442f6e9916\"},{\"aadhar\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FResidential%2Faadhar%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=18c851ac-6811-4dff-a4e3-c1dc322a9e9a\"},{\"sign\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FResidential%2Fsign%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=53c62dc7-cf20-4ec7-a26b-6869ce21941d\"},{\"others\":\"none\"}]', 'null', 'false', '1627534633601', '2021-07-30 05:24:54'),
(10, '1627622822545', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Voterid Certificate', '[{\"photo\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FVoteridcertificate%2Fphoto%2F\'%20%2B%20111434468_gettyimages-1143489763.jpg?alt=media&token=6a5cc59f-4971-4efa-ae91-480dacd25af7\"},{\"smart\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FVoteridcertificate%2Fsmart%2F\'%20%2B%20105597048_snakes8.jpg?alt=media&token=38cb83a4-f592-4bbf-892c-af52dfee3133\"},{\"aadhar\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FVoteridcertificate%2Faadhar%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=8953e0ca-4da8-441e-be8c-0f5c44dff399\"},{\"others\":\"none\"}]', 'null', 'false', '1627534633601', '2021-07-30 05:27:02'),
(11, '1627623109300', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Unmarriedcertificate', '[{\"photo\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FUnmarriedcertificate%2Fphoto%2F\'%20%2B%201627623082496.jpeg?alt=media&token=b244bfa7-8f1f-4743-8f26-cacaf73d3b4c\"},{\"age\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FUnmarriedcertificate%2Fage%2F\'%20%2B%201627623096298.jpeg?alt=media&token=4db84c88-a1a1-46ed-8742-bb512ab5a4fb\"},{\"address\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FUnmarriedcertificate%2Faddress%2F\'%20%2B%201627623088915.jpeg?alt=media&token=6fb3e388-78b9-4a01-abd0-ed33b11a5f7c\"},{\"self\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FUnmarriedcertificate%2Fself%2F\'%20%2B%201627623103307.jpeg?alt=media&token=13a0deb9-2244-47a1-a603-b2ba17e63e95\"},{\"others\":\"none\"}]', 'null', 'false', '1627534633601', '2021-07-30 05:31:49');

-- --------------------------------------------------------

--
-- Table structure for table `distributorreg`
--

CREATE TABLE `distributorreg` (
  `id` int(255) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `location` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `distributors`
--

CREATE TABLE `distributors` (
  `id` int(255) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `location` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `userid` varchar(256) NOT NULL,
  `referralcode` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `marquee`
--

CREATE TABLE `marquee` (
  `id` int(255) NOT NULL,
  `userid` varchar(256) NOT NULL,
  `message` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `marquee`
--

INSERT INTO `marquee` (`id`, `userid`, `message`, `date`) VALUES
(1, '1627534633601', '3 நாட்கள் green pay  எந்த ஒரு சேவை செயல்படாது . pancard மட்டும் செயல்படும் . website இல் அல்லது mail இல் அனுப்ப வேண்டாம் ', '2021-07-30 12:22:37');

-- --------------------------------------------------------

--
-- Table structure for table `other_certificates`
--

CREATE TABLE `other_certificates` (
  `id` int(255) NOT NULL,
  `certificateid` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `appliedname` varchar(256) NOT NULL,
  `appliedemail` varchar(256) NOT NULL,
  `appliedeno` varchar(256) NOT NULL,
  `certificatename` varchar(256) NOT NULL,
  `certificates` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `slip` varchar(256) NOT NULL DEFAULT 'null',
  `iscomplete` varchar(256) NOT NULL DEFAULT 'false',
  `userid` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `other_certificates`
--

INSERT INTO `other_certificates` (`id`, `certificateid`, `name`, `email`, `number`, `appliedname`, `appliedemail`, `appliedeno`, `certificatename`, `certificates`, `slip`, `iscomplete`, `userid`, `date`) VALUES
(2, '1627554988440', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'test', 'test@gmail.com', '123456', 'Flight Ticket', '[{\"passport\":\"111\"},{\"trip\":\"111\"},{\"aadhar\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FFlightticket%2Fauther%2F\'%20%2B%20happy.gif?alt=media&token=6d0b8ac5-0a8c-4c3a-978a-8975c00cd42d\"},{\"others\":\"none\"}]', 'null', 'false', '1627534633601', '2021-07-29 12:35:43'),
(4, '1627555561907', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Flight Ticket', '[{\"passport\":\"111\"},{\"trip\":\"111\"},{\"aadhar\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FFlightticket%2Fauther%2F\'%20%2B%20happy.gif?alt=media&token=45c48cfc-1cb9-4736-97ab-3074c7c2078e\"},{\"others\":\"none\"}]', 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg', 'false', '1627534633601', '2021-07-29 12:31:43'),
(5, '1627562411640', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Flight Ticket', '[{\"passport\":\"11\"},{\"trip\":\"11\"},{\"aadhar\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2FFlightticket%2Fauther%2F\'%20%2B%20happy.gif?alt=media&token=02bbd5c4-f444-4e13-96fe-1206f44414d2\"},{\"others\":\"none\"}]', 'null', 'false', '1627534633601', '2021-07-29 12:40:11');

-- --------------------------------------------------------

--
-- Table structure for table `pan_certificates`
--

CREATE TABLE `pan_certificates` (
  `id` int(255) NOT NULL,
  `certificateid` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `appliedname` varchar(256) NOT NULL,
  `appliedemail` varchar(256) NOT NULL,
  `appliedeno` varchar(256) NOT NULL,
  `certificatename` varchar(256) NOT NULL,
  `certificates` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `slip` varchar(256) NOT NULL DEFAULT 'null',
  `iscomplete` varchar(256) NOT NULL DEFAULT 'false',
  `userid` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pan_certificates`
--

INSERT INTO `pan_certificates` (`id`, `certificateid`, `name`, `email`, `number`, `appliedname`, `appliedemail`, `appliedeno`, `certificatename`, `certificates`, `slip`, `iscomplete`, `userid`, `date`) VALUES
(1, '1627623643854', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Pan Certificate', '[{\"photo\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2Fpan%2Fphoto%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=cdc4e0eb-e380-4b39-bb98-84b6121086bf\"},{\"sign\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2Fpan%2Fsign%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=a9cd15be-88fd-4579-8b72-5e1b5bb4e44b\"},{\"card\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2Fpan%2Fcard%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=bda5fc28-cc65-4f8b-a67c-8d817dbc235e\"},{\"others\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2Fpan%2Fother%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=dd003ee8-be10-4d3d-ba0d-b97d4bff71d2\"}]', 'null', 'false', '1627534633601', '2021-07-30 05:40:43'),
(2, '1627623691157', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Pan Certificate', '[{\"photo\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2Fpan%2Fphoto%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=99bc10b2-7a65-4bf0-ba41-c061d322fe14\"},{\"sign\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2Fpan%2Fsign%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=43deaeba-1751-4674-b93c-431dea8a5612\"},{\"card\":\"https://firebasestorage.googleapis.com/v0/b/test-35516.appspot.com/o/userid%2FKalidas%2Fpan%2Fcard%2F\'%20%2B%20105828578-1554223245858gettyimages-149052633.jpeg?alt=media&token=702e8b39-5e7a-434b-a33b-d9d7f67ad2be\"},{\"others\":\"none\"}]', 'null', 'false', '1627534633601', '2021-07-30 05:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `paymenthistory`
--

CREATE TABLE `paymenthistory` (
  `id` int(255) NOT NULL,
  `name` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `amount` int(255) NOT NULL,
  `razorpay_payment_id` varchar(256) NOT NULL,
  `razorpay_order_id` varchar(256) NOT NULL,
  `paymentdate` varchar(256) NOT NULL,
  `userid` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paymenthistory`
--

INSERT INTO `paymenthistory` (`id`, `name`, `number`, `amount`, `razorpay_payment_id`, `razorpay_order_id`, `paymentdate`, `userid`, `date`) VALUES
(1, 'Kalidas', '+919080711080', 100, 'pay_Heeg06d6ZrpuoE', 'order_HeefsSiBxYu1t8', '27-07-2021', '1627534633601', '2021-07-27 06:55:30'),
(2, 'Kalidas', '+919080711080', 100, 'pay_HeeiK8t0GVctCT', 'order_HeeiCfwRcm6Wrv', '28-07-2021', '1627534633601', '2021-07-29 07:03:59');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(255) NOT NULL,
  `ticketid` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `message` varchar(256) NOT NULL,
  `subject` varchar(256) NOT NULL,
  `ticketdate` varchar(256) NOT NULL,
  `userid` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `ticketid`, `name`, `email`, `number`, `message`, `subject`, `ticketdate`, `userid`, `date`) VALUES
(2, '1627626659047', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'Test', 'Payment Issue', '30-07-2021', '1627534633601', '2021-07-30 06:30:59'),
(4, '1627627787940', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'test', 'Uploading Issue', '30-07-2021', '1627534633601', '2021-07-30 06:49:47'),
(5, '1627627798218', 'Kalidas', 's.kalidas120799@gmail.com', '+919080711080', 'test', 'Acknowledgement Issue', '30-07-2021', '1627534633601', '2021-07-30 06:49:58');

-- --------------------------------------------------------

--
-- Table structure for table `userreg`
--

CREATE TABLE `userreg` (
  `id` int(100) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `location` varchar(256) NOT NULL,
  `role` varchar(256) NOT NULL,
  `referral` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `location` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `referral` varchar(256) NOT NULL,
  `wallet` int(255) NOT NULL DEFAULT 0,
  `userid` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `location`, `password`, `number`, `referral`, `wallet`, `userid`, `date`) VALUES
(1, 'Kalidas', 's.kalidas120799@gmail.com', 'Coimbatore', '$2a$10$cBxZu/vLito7TniLQkx3y.uVTH8lesrYrWv8AEyS7yaIW.gO4a8Lu', '+919080711080', '', 199186, '1627534633601', '2021-07-30 05:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `wallethistory`
--

CREATE TABLE `wallethistory` (
  `id` int(255) NOT NULL,
  `amount` varchar(256) NOT NULL,
  `certificatename` varchar(256) NOT NULL,
  `userid` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wallethistory`
--

INSERT INTO `wallethistory` (`id`, `amount`, `certificatename`, `userid`, `date`) VALUES
(1, '60', 'Flight Ticket', '1627534633601', '2021-07-29 10:36:28'),
(2, '60', 'Flight Ticket', '1627534633601', '2021-07-29 10:39:03'),
(3, '60', 'Flight Ticket', '1627534633601', '2021-07-29 10:51:36'),
(4, '60', 'Flight Ticket', '1627534633601', '2021-07-29 12:40:11'),
(5, '60', 'Widow Certificate', '1627534633601', '2021-07-30 04:50:30'),
(6, '60', 'Widow Certificate', '1627534633601', '2021-07-30 04:55:30'),
(7, '60', 'Widow Certificate', '1627534633601', '2021-07-30 05:08:12'),
(8, '60', 'Widow Certificate', '1627534633601', '2021-07-30 05:15:17'),
(9, '60', 'Widow Certificate', '1627534633601', '2021-07-30 05:18:15'),
(10, '60', 'Widow Pension', '1627534633601', '2021-07-30 05:21:27'),
(11, '60', 'Widow Pension', '1627534633601', '2021-07-30 05:24:54'),
(12, '60', 'Voterid Certificate', '1627534633601', '2021-07-30 05:27:02'),
(13, '60', 'Unmarriedcertificate', '1627534633601', '2021-07-30 05:31:49'),
(14, '107', 'Pancertificate', '1627534633601', '2021-07-30 05:40:43'),
(15, '107', 'Pancertificate', '1627534633601', '2021-07-30 05:41:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `all_certificates`
--
ALTER TABLE `all_certificates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `distributorreg`
--
ALTER TABLE `distributorreg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `distributors`
--
ALTER TABLE `distributors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marquee`
--
ALTER TABLE `marquee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `other_certificates`
--
ALTER TABLE `other_certificates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pan_certificates`
--
ALTER TABLE `pan_certificates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paymenthistory`
--
ALTER TABLE `paymenthistory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userreg`
--
ALTER TABLE `userreg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallethistory`
--
ALTER TABLE `wallethistory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `all_certificates`
--
ALTER TABLE `all_certificates`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `distributorreg`
--
ALTER TABLE `distributorreg`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `distributors`
--
ALTER TABLE `distributors`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `marquee`
--
ALTER TABLE `marquee`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `other_certificates`
--
ALTER TABLE `other_certificates`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pan_certificates`
--
ALTER TABLE `pan_certificates`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `paymenthistory`
--
ALTER TABLE `paymenthistory`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userreg`
--
ALTER TABLE `userreg`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wallethistory`
--
ALTER TABLE `wallethistory`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
