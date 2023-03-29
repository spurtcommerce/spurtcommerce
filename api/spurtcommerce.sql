-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 06, 2022 at 06:37 PM
-- Server version: 5.7.39-0ubuntu0.18.04.2
-- PHP Version: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spurt-pro-client-v48`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_token`
--

CREATE TABLE `access_token` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activity_id` int(11) NOT NULL,
  `activity_name` varchar(64) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `first_name` varchar(32) DEFAULT NULL,
  `last_name` varchar(32) DEFAULT NULL,
  `company` varchar(32) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `address_1` varchar(128) DEFAULT NULL,
  `address_2` varchar(128) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `address_type` int(11) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `phone_no` bigint(20) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `audit_log`
--

CREATE TABLE `audit_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `request_url` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `object` text,
  `log_type` varchar(255) DEFAULT NULL,
  `description` text,
  `params` text,
  `browser_info` text,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `banner_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sort_order` varchar(255) DEFAULT NULL,
  `url` tinytext,
  `banner_group_id` int(11) DEFAULT NULL,
  `container_name` varchar(255) DEFAULT NULL,
  `view_page_count` int(11) DEFAULT '0',
  `banner_group_banner_group_id` int(11) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `content` text,
  `position` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`banner_id`, `title`, `sort_order`, `url`, `banner_group_id`, `container_name`, `view_page_count`, `banner_group_banner_group_id`, `link`, `image`, `image_path`, `content`, `position`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(84, 'Watch', NULL, NULL, NULL, NULL, 0, 0, 'www.piccosoft', 'Img_1623324513607.png', 'banner/', '', 3, 1, '2019-08-01 13:02:28', '2021-06-10 16:58:33', NULL, NULL),
(85, 'shoppify', NULL, NULL, NULL, NULL, 0, 0, 'www.piccosoft.com', 'Img_1623324489339.png', 'banner/', '', 2, 1, '2019-08-01 13:03:28', '2021-06-10 16:58:09', NULL, NULL),
(86, 'Summer sale', NULL, NULL, NULL, NULL, 0, 0, 'www.piccosoft.com', 'Img_1623324414655.png', 'banner/', '', 1, 1, '2019-08-01 13:04:26', '2021-06-10 16:56:54', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `banner_group`
--

CREATE TABLE `banner_group` (
  `banner_group_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `banner_image`
--

CREATE TABLE `banner_image` (
  `banner_image_id` int(11) NOT NULL,
  `banner_id` varchar(32) NOT NULL,
  `link` varchar(255) NOT NULL,
  `image` varchar(45) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `banner_image_description`
--

CREATE TABLE `banner_image_description` (
  `banner_image_description_id` int(11) NOT NULL,
  `banner_image_id` int(11) DEFAULT NULL,
  `banner_id` int(11) DEFAULT NULL,
  `title` varchar(4) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `parent_int` int(11) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` text,
  `meta_tag_keyword` varchar(255) DEFAULT NULL,
  `is_active` varchar(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `category_slug` varchar(255) DEFAULT NULL,
  `category_description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `image`, `image_path`, `parent_int`, `sort_order`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keyword`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`, `category_slug`, `category_description`) VALUES
(1, 'MENS FASHION', 'image', NULL, 0, 2, '', '', '', '1', NULL, NULL, '2019-05-10 02:00:49', '2020-01-28 10:40:55', 'mens-fashion', NULL),
(3, 'BABY & KIDS', 'image', NULL, 0, 3, 'BABY & KIDS', 'BABY & KIDS', 'BABY & KIDS', '1', NULL, NULL, '2019-05-10 02:02:04', '2020-01-28 10:40:55', 'baby-kids', NULL),
(4, 'ELECTRONICS', 'Img_1565010631560.jpeg', 'category/', 0, 1, 'ELECTRONICS', 'ELECTRONICS', 'ELECTRONICS', '1', NULL, NULL, '2019-05-10 02:02:53', '2020-01-28 10:40:55', 'electronics', NULL),
(5, 'HOME & FURNITURE', 'image', NULL, 0, 4, 'HOME & FURNITURE', 'HOME & FURNITURE', 'HOME & FURNITURE', '1', NULL, NULL, '2019-05-10 02:03:37', '2020-01-28 10:40:55', 'home-furniture', NULL),
(6, 'SPORTS, BOOK AND MORE', 'image', NULL, 0, 5, 'SPORTS, BOOK AND MORE', 'SPORTS, BOOK AND MORE', 'SPORTS, BOOK AND MORE', '1', NULL, NULL, '2019-05-10 02:04:13', '2020-01-28 10:40:55', 'sports-book-and-more', NULL),
(7, 'Foot Wear', 'image', NULL, 1, 1, 'Foot Wear', '', '', '1', NULL, NULL, '2019-05-10 02:05:37', '2020-01-28 10:40:55', 'foot-wear', NULL),
(9, 'Top Wear', 'image', NULL, 1, 1, 'Top Wear', '', '', '1', NULL, NULL, '2019-05-10 02:06:10', '2020-01-28 10:40:55', 'top-wear', NULL),
(11, 'Watches', 'Img_1565010912983.png', 'category/', 1, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:07:03', '2020-01-28 10:40:55', 'watches', NULL),
(13, 'Mobiles', 'image', NULL, 4, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:09:21', '2020-01-28 10:40:55', 'mobiles', NULL),
(14, 'Laptops', 'image', NULL, 4, 1, 'Laptops', 'Laptops', 'Laptops', '1', NULL, NULL, '2019-05-10 02:10:17', '2020-01-28 10:40:55', 'laptops', NULL),
(16, 'Camera', 'image', NULL, 4, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:11:56', '2020-01-28 10:40:55', 'camera', NULL),
(17, 'Toys', 'image', NULL, 3, 2, 'Toys', 'Toys', 'Toys', '1', NULL, NULL, '2019-05-10 02:12:48', '2020-01-28 10:40:55', 'toys', NULL),
(18, 'Boy\'s clothing', 'image', NULL, 3, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:13:49', '2020-01-28 10:40:55', 'boys-clothing', NULL),
(19, 'Girls Clothing ', 'image', NULL, 3, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:14:20', '2020-01-28 10:40:55', 'girls-clothing-', NULL),
(21, 'Kitchen & Cookware', 'image', NULL, 5, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:15:33', '2020-01-28 10:40:55', 'kitchen-cookware', NULL),
(22, 'Furniture', 'image', NULL, 5, 1, 'Furniture', 'Furniture', 'Furniture', '1', NULL, NULL, '2019-05-10 02:15:53', '2020-01-28 10:40:55', 'furniture', NULL),
(23, 'Home Decor', 'image', NULL, 5, 1, 'Home Decor', 'Home Decor', 'Home Decor', '1', NULL, NULL, '2019-05-10 02:16:18', '2020-01-28 10:40:55', 'home-decor', NULL),
(24, 'Books', 'image', NULL, 6, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:16:58', '2020-01-28 10:40:55', 'books', NULL),
(25, 'Sports', 'image', NULL, 6, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:17:18', '2020-01-28 10:40:55', 'sports', NULL),
(27, 'Health & Nutritions', 'image', NULL, 6, 1, 'Health & Nutritions', 'Health & Nutritions', 'Health & Nutritions', '1', NULL, NULL, '2019-05-10 02:18:14', '2020-01-28 10:40:55', 'health-nutritions', NULL),
(33, 'Samsung', 'image', NULL, 13, 1, 'Samsung', 'Samsung', 'Samsung', '1', NULL, NULL, '2019-05-10 02:21:46', '2020-01-28 10:40:55', 'samsung', NULL),
(35, 'I Phone', 'image', NULL, 13, 1, 'I Phone', 'I Phone', 'I Phone', '1', NULL, NULL, '2019-05-10 02:23:12', '2020-01-28 10:40:55', 'i-phone', NULL),
(36, 'Vivo', 'image', NULL, 13, 3, '', '', '', '1', NULL, NULL, '2019-05-10 02:24:05', '2020-01-28 10:40:55', 'vivo', NULL),
(38, 'Hp', 'image', NULL, 14, 2, 'Hp', 'Hp', 'Hp', '1', NULL, NULL, '2019-05-10 02:28:22', '2020-01-28 10:40:55', 'hp', NULL),
(44, 'DSLR & Mirrorless', 'image', NULL, 16, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:32:10', '2020-01-28 10:40:55', 'dslr-mirrorless', NULL),
(45, 'Compact & Bridge Camera', 'image', NULL, 16, 2, '', '', '', '1', NULL, NULL, '2019-05-10 02:32:58', '2020-01-28 10:40:55', 'compact-bridge-camera', NULL),
(48, 'Remote Control Toys', 'image', NULL, 17, 1, 'Remote Control Toys', 'Remote Control Toys', 'Remote Control Toys', '1', NULL, NULL, '2019-05-10 02:35:13', '2020-01-28 10:40:55', 'remote-control-toys', NULL),
(50, 'Musical Toys', 'image', NULL, 17, 1, 'Musical Toys', 'Musical Toys', 'Musical Toys', '1', NULL, NULL, '2019-05-10 02:35:57', '2020-01-28 10:40:55', 'musical-toys', NULL),
(52, 'Ethnic Wears', 'image', NULL, 18, 2, '', '', '', '1', NULL, NULL, '2019-05-10 02:36:52', '2020-01-28 10:40:55', 'ethnic-wears', NULL),
(53, 'Dresses & skirts', 'image', NULL, 19, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:37:28', '2020-01-28 10:40:55', 'dresses-skirts', NULL),
(54, 'T-shirts & Tops', 'image', NULL, 19, 2, 'T-shirts & Tops', '', '', '1', NULL, NULL, '2019-05-10 02:38:04', '2020-01-28 10:40:55', 't-shirts-tops', NULL),
(60, 'Casual Shoes', 'image', NULL, 7, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:41:42', '2020-01-28 10:40:55', 'casual-shoes', NULL),
(64, 'T-shirt', 'image', NULL, 9, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:43:32', '2020-01-28 10:40:55', 't-shirt', NULL),
(65, 'Shirts', 'image', NULL, 9, 2, '', '', '', '1', NULL, NULL, '2019-05-10 02:43:46', '2020-01-28 10:40:55', 'shirts', NULL),
(68, 'Fastrack', 'image', NULL, 11, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:44:54', '2020-01-28 10:40:55', 'fastrack', NULL),
(69, 'Casio', 'image', NULL, 11, 2, 'Casio', 'Casio', 'Casio', '1', NULL, NULL, '2019-05-10 02:45:13', '2020-01-28 10:40:55', 'casio', NULL),
(73, 'Gas Stove', 'image', NULL, 21, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:47:15', '2020-01-28 10:40:55', 'gas-stove', NULL),
(74, 'Tawas', 'image', NULL, 21, 2, 'Tawas', 'Tawas', 'Tawas', '1', NULL, NULL, '2019-05-10 02:47:42', '2020-01-28 10:40:55', 'tawas', NULL),
(76, 'Sofas', 'image', NULL, 22, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:48:23', '2020-01-28 10:40:55', 'sofas', NULL),
(78, 'Dining Tables & Sets', 'image', NULL, 22, 1, 'Dining Tables & Sets', 'Dining Tables & Sets', 'Dining Tables & Sets', '1', NULL, NULL, '2019-05-10 02:49:41', '2020-01-28 10:40:55', 'dining-tables-sets', NULL),
(79, 'Paintings', 'image', NULL, 23, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:50:03', '2020-01-28 10:40:55', 'paintings', NULL),
(80, 'Clocks', 'image', NULL, 23, 2, '', '', '', '1', NULL, NULL, '2019-05-10 02:50:22', '2020-01-28 10:40:55', 'clocks', NULL),
(83, 'Childrens', 'image', NULL, 24, 2, '', '', '', '1', NULL, NULL, '2019-05-10 02:52:19', '2020-01-28 10:40:55', 'childrens', NULL),
(84, 'Self help & Inspirational', 'image', NULL, 24, 2, '', '', '', '1', NULL, NULL, '2019-05-10 02:52:47', '2020-01-28 10:40:55', 'self-help-inspirational', NULL),
(86, 'Football & badminton ', 'image', NULL, 25, 2, 'Football & badminton ', 'Football & badminton ', 'Football & badminton ', '1', NULL, NULL, '2019-05-10 02:53:54', '2020-01-28 10:40:55', 'football-badminton-', NULL),
(89, 'Health & Energy Drinks', 'image', NULL, 27, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:55:35', '2020-01-28 10:40:55', 'health-energy-drinks', NULL),
(90, 'Protein Supplements', 'image', NULL, 27, 1, '', '', '', '1', NULL, NULL, '2019-05-10 02:56:09', '2020-01-28 10:40:55', 'protein-supplements', NULL),
(92, 'WOMENS FASHION', 'image', NULL, 0, 3, '', '', '', '1', NULL, NULL, '2019-05-13 00:04:02', '2020-01-28 10:40:55', 'womens-fashion', NULL),
(93, 'Ethnic Wear', 'image', NULL, 92, 1, '', '', '', '1', NULL, NULL, '2019-05-13 05:06:00', '2020-01-28 10:40:55', 'ethnic-wear', NULL),
(94, 'kurtas&Kurtis', 'image', NULL, 93, 1, 'kurtas&Kurtis', '', '', '1', NULL, NULL, '2019-05-14 00:20:22', '2020-01-28 10:40:55', 'kurtaskurtis', NULL),
(95, 'Lehenga Choli & Sarees', 'image', NULL, 93, 2, 'Lehenga Choli & Sarees', 'Lehenga Choli & Sarees', 'Lehenga Choli & Sarees', '1', NULL, NULL, '2019-05-14 00:21:35', '2020-01-28 10:40:55', 'lehenga-choli-sarees', NULL),
(96, 'Accessories', 'image', NULL, 92, 1, 'Accessories', 'Accessories', 'Accessories', '1', NULL, NULL, '2019-05-14 00:32:51', '2020-01-28 10:40:55', 'accessories', NULL),
(97, 'Handbags & clutches', 'image', NULL, 96, 1, 'Handbags & clutches', 'Handbags & clutches', 'Handbags & clutches', '1', NULL, NULL, '2019-05-14 00:34:06', '2020-01-28 10:40:55', 'handbags-clutches', NULL),
(99, 'Sandals', 'image', NULL, 92, 1, '', '', '', '1', NULL, NULL, '2019-06-06 00:53:01', '2020-01-28 10:40:55', 'sandals', NULL),
(100, 'Flats', 'image', NULL, 99, 1, 'Flats', 'Flats', 'Flats', '1', NULL, NULL, '2019-06-06 00:54:02', '2020-01-28 10:40:55', 'flats', NULL),
(101, 'Heels', 'image', NULL, 99, 2, '', '', '', '1', NULL, NULL, '2019-06-06 00:54:37', '2020-01-28 10:40:55', 'heels', NULL),
(102, 'Wallets, Sun glass & Belts', 'image', NULL, 96, 2, 'Wallets, Sun glass & Belts', 'Wallets, Sun glass & Belts', 'Wallets, Sun glass & Belts', '1', NULL, NULL, '2019-06-06 01:32:03', '2020-01-28 10:40:55', 'wallets-sun-glass-belts', NULL),
(104, 'Shorts', 'image', NULL, 18, 2, '', '', '', '1', NULL, NULL, '2019-06-06 04:49:39', '2020-01-28 10:40:55', 'shorts', NULL),
(105, 'Dell', 'image', NULL, 14, 2, '', '', '', '1', NULL, NULL, '2019-06-06 05:28:50', '2020-01-28 10:40:55', 'dell', NULL),
(106, 'Cricket & Basketball', 'image', NULL, 25, 2, 'Cricket & Basketball', 'Cricket & Basketball', 'Cricket & Basketball', '1', NULL, NULL, '2019-06-06 06:31:25', '2020-01-28 10:40:55', 'cricket-basketball', NULL),
(107, 'Sandals&Floaters', 'image', NULL, 7, 2, '', '', '', '1', NULL, NULL, '2019-06-06 07:19:53', '2020-01-28 10:40:55', 'sandalsfloaters', NULL),
(134, 'Kurtas', 'image', NULL, 9, 3, '', '', '', '1', NULL, NULL, '2019-06-17 04:18:18', '2020-01-28 10:40:55', 'kurtas', NULL),
(135, 'Men\'s Grooming', 'image', NULL, 1, 1, 'Men\'s Grooming', 'Men\'s Grooming', 'Men\'s Grooming', '1', NULL, NULL, '2019-06-18 00:23:27', '2020-01-28 10:40:55', 'mens-grooming', NULL),
(136, 'Deodorants', 'image', NULL, 135, 1, 'Deodorants', 'Deodorants', 'Deodorants', '1', NULL, NULL, '2019-06-18 00:24:54', '2020-01-28 10:40:55', 'deodorants', NULL),
(137, 'Beard care & Grooming', 'image', NULL, 135, 1, '', '', '', '1', NULL, NULL, '2019-06-18 00:27:29', '2020-01-28 10:40:55', 'beard-care-grooming', NULL),
(138, 'School Supplies', 'image', NULL, 3, 1, '', '', '', '1', NULL, NULL, '2019-06-18 01:41:04', '2020-01-28 10:40:55', 'school-supplies', NULL),
(139, 'School Bags', 'image', NULL, 138, 1, '', '', '', '1', NULL, NULL, '2019-06-18 01:42:05', '2020-01-28 10:40:55', 'school-bags', NULL),
(140, 'School Combo Sets', 'image', NULL, 138, 1, '', '', '', '1', NULL, NULL, '2019-06-18 01:49:07', '2020-01-28 10:40:55', 'school-combo-sets', NULL),
(141, 'Mobile Accessories', 'image', NULL, 4, 1, '', '', '', '1', NULL, NULL, '2019-06-18 02:32:10', '2020-01-28 10:40:55', 'mobile-accessories', NULL),
(142, 'Smart Headphone', 'image', NULL, 141, 1, '', '', '', '1', NULL, NULL, '2019-06-18 02:35:23', '2020-01-28 10:40:55', 'smart-headphone', NULL),
(143, 'Power Banks', 'image', NULL, 141, 2, '', '', '', '1', NULL, NULL, '2019-06-18 02:36:10', '2020-01-28 10:40:55', 'power-banks', NULL),
(144, 'Home Lighting', 'image', NULL, 5, 1, '', '', '', '1', NULL, NULL, '2019-06-18 04:15:21', '2020-01-28 10:40:55', 'home-lighting', NULL),
(145, 'Wall Lamp', 'image', NULL, 144, 1, '', '', '', '1', NULL, NULL, '2019-06-18 04:24:01', '2020-01-28 10:40:55', 'wall-lamp', NULL),
(146, 'Emergency Lamp', 'image', NULL, 144, 1, '', '', '', '1', NULL, NULL, '2019-06-18 04:25:53', '2020-01-28 10:40:55', 'emergency-lamp', NULL),
(147, 'Musical Instruments', 'image', NULL, 6, 1, '', '', '', '1', NULL, NULL, '2019-06-18 05:19:17', '2020-01-28 10:40:55', 'musical-instruments', NULL),
(148, 'String & Wind Instruments', 'image', NULL, 147, 1, '', '', '', '1', NULL, NULL, '2019-06-18 05:28:52', '2020-01-28 10:40:55', 'string-wind-instruments', NULL),
(149, 'Tablas & Keyboard', 'image', NULL, 147, 2, '', '', '', '1', NULL, NULL, '2019-06-18 06:40:34', '2020-01-28 10:40:55', 'tablas-keyboard', NULL),
(151, 'Skin Care', 'image', NULL, 154, 1, '', '', '', '1', NULL, NULL, '2019-06-18 07:18:20', '2020-01-28 10:40:55', 'skin-care', NULL),
(152, 'Hair Care', 'image', NULL, 154, 1, '', '', '', '1', NULL, NULL, '2019-06-18 07:18:46', '2020-01-28 10:40:55', 'hair-care', NULL),
(154, 'Beauty & Grooming', 'image', NULL, 92, 1, 'Beauty & Grooming', 'Beauty & Grooming', 'Beauty & Grooming', '1', NULL, NULL, '2019-06-19 00:37:39', '2020-01-28 10:40:55', 'beauty-grooming', NULL),
(155, 'TVs & Speaker', 'image', NULL, 4, 1, '', '', '', '1', NULL, NULL, '2019-06-20 00:56:29', '2020-01-28 10:40:55', 'tvs-speaker', NULL),
(156, 'Home Theaters', 'image', NULL, 155, 1, 'Home Theaters', 'Home Theaters', 'Home Theaters', '1', NULL, NULL, '2019-06-20 00:57:41', '2020-01-28 10:40:55', 'home-theaters', NULL),
(157, 'Television', 'image', NULL, 155, 2, 'Television', 'Television', 'Television', '1', NULL, NULL, '2019-06-20 01:22:19', '2020-01-28 10:40:55', 'television', NULL),
(158, 'Bottom Wear', 'image', NULL, 1, 1, 'Bottom Wear', 'Bottom Wear', 'Bottom Wear', '1', NULL, NULL, '2019-06-20 02:16:01', '2020-01-28 10:40:55', 'bottom-wear', NULL),
(159, 'Jeans', 'image', NULL, 158, 1, 'Jeans', 'Jeans', 'Jeans', '1', NULL, NULL, '2019-06-20 02:17:19', '2020-02-03 11:50:10', 'jeans', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category_description`
--

CREATE TABLE `category_description` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `meta_description` varchar(65) DEFAULT NULL,
  `meta_keyword` varchar(255) DEFAULT NULL,
  `category_description_id` int(11) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category_path`
--

CREATE TABLE `category_path` (
  `category_path_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `path_id` int(11) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category_path`
--

INSERT INTO `category_path` (`category_path_id`, `category_id`, `path_id`, `level`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(605, 158, 1, 0, NULL, NULL, NULL, NULL),
(606, 158, 158, 1, NULL, NULL, NULL, NULL),
(607, 156, 4, 0, NULL, NULL, NULL, NULL),
(608, 156, 155, 1, NULL, NULL, NULL, NULL),
(609, 156, 156, 2, NULL, NULL, NULL, NULL),
(610, 155, 4, 0, NULL, NULL, NULL, NULL),
(611, 155, 155, 1, NULL, NULL, NULL, NULL),
(612, 154, 92, 0, NULL, NULL, NULL, NULL),
(613, 154, 154, 1, NULL, NULL, NULL, NULL),
(614, 152, 92, 0, NULL, NULL, NULL, NULL),
(615, 152, 154, 1, NULL, NULL, NULL, NULL),
(616, 152, 152, 2, NULL, NULL, NULL, NULL),
(617, 151, 92, 0, NULL, NULL, NULL, NULL),
(618, 151, 154, 1, NULL, NULL, NULL, NULL),
(619, 151, 151, 2, NULL, NULL, NULL, NULL),
(620, 148, 6, 0, NULL, NULL, NULL, NULL),
(621, 148, 147, 1, NULL, NULL, NULL, NULL),
(622, 148, 148, 2, NULL, NULL, NULL, NULL),
(623, 147, 6, 0, NULL, NULL, NULL, NULL),
(624, 147, 147, 1, NULL, NULL, NULL, NULL),
(625, 146, 5, 0, NULL, NULL, NULL, NULL),
(626, 146, 144, 1, NULL, NULL, NULL, NULL),
(627, 146, 146, 2, NULL, NULL, NULL, NULL),
(631, 144, 5, 0, NULL, NULL, NULL, NULL),
(632, 144, 144, 1, NULL, NULL, NULL, NULL),
(633, 145, 5, 0, NULL, NULL, NULL, NULL),
(634, 145, 144, 1, NULL, NULL, NULL, NULL),
(635, 145, 145, 2, NULL, NULL, NULL, NULL),
(636, 142, 4, 0, NULL, NULL, NULL, NULL),
(637, 142, 141, 1, NULL, NULL, NULL, NULL),
(638, 142, 142, 2, NULL, NULL, NULL, NULL),
(639, 141, 4, 0, NULL, NULL, NULL, NULL),
(640, 141, 141, 1, NULL, NULL, NULL, NULL),
(644, 140, 3, 0, NULL, NULL, NULL, NULL),
(645, 140, 138, 1, NULL, NULL, NULL, NULL),
(646, 140, 140, 2, NULL, NULL, NULL, NULL),
(647, 139, 3, 0, NULL, NULL, NULL, NULL),
(648, 139, 138, 1, NULL, NULL, NULL, NULL),
(649, 139, 139, 2, NULL, NULL, NULL, NULL),
(650, 138, 3, 0, NULL, NULL, NULL, NULL),
(651, 138, 138, 1, NULL, NULL, NULL, NULL),
(652, 137, 135, 1, NULL, NULL, NULL, NULL),
(653, 137, 1, 0, NULL, NULL, NULL, NULL),
(654, 137, 137, 2, NULL, NULL, NULL, NULL),
(655, 136, 1, 0, NULL, NULL, NULL, NULL),
(656, 136, 135, 1, NULL, NULL, NULL, NULL),
(657, 136, 136, 2, NULL, NULL, NULL, NULL),
(658, 135, 1, 0, NULL, NULL, NULL, NULL),
(659, 135, 135, 1, NULL, NULL, NULL, NULL),
(660, 100, 92, 0, NULL, NULL, NULL, NULL),
(661, 100, 99, 1, NULL, NULL, NULL, NULL),
(662, 100, 100, 2, NULL, NULL, NULL, NULL),
(663, 99, 92, 0, NULL, NULL, NULL, NULL),
(664, 99, 99, 1, NULL, NULL, NULL, NULL),
(665, 97, 97, 2, NULL, NULL, NULL, NULL),
(666, 97, 96, 1, NULL, NULL, NULL, NULL),
(667, 97, 92, 0, NULL, NULL, NULL, NULL),
(668, 96, 92, 0, NULL, NULL, NULL, NULL),
(669, 96, 96, 1, NULL, NULL, NULL, NULL),
(670, 94, 92, 0, NULL, NULL, NULL, NULL),
(671, 94, 93, 1, NULL, NULL, NULL, NULL),
(672, 94, 94, 2, NULL, NULL, NULL, NULL),
(673, 93, 92, 0, NULL, NULL, NULL, NULL),
(674, 93, 93, 1, NULL, NULL, NULL, NULL),
(675, 90, 6, 0, NULL, NULL, NULL, NULL),
(676, 90, 27, 1, NULL, NULL, NULL, NULL),
(677, 90, 90, 2, NULL, NULL, NULL, NULL),
(678, 89, 6, 0, NULL, NULL, NULL, NULL),
(679, 89, 27, 1, NULL, NULL, NULL, NULL),
(680, 89, 89, 2, NULL, NULL, NULL, NULL),
(681, 79, 5, 0, NULL, NULL, NULL, NULL),
(682, 79, 23, 1, NULL, NULL, NULL, NULL),
(683, 79, 79, 2, NULL, NULL, NULL, NULL),
(684, 78, 5, 0, NULL, NULL, NULL, NULL),
(685, 78, 22, 1, NULL, NULL, NULL, NULL),
(686, 78, 78, 2, NULL, NULL, NULL, NULL),
(687, 76, 76, 2, NULL, NULL, NULL, NULL),
(688, 76, 22, 1, NULL, NULL, NULL, NULL),
(689, 76, 5, 0, NULL, NULL, NULL, NULL),
(690, 73, 5, 0, NULL, NULL, NULL, NULL),
(691, 73, 21, 1, NULL, NULL, NULL, NULL),
(692, 73, 73, 2, NULL, NULL, NULL, NULL),
(693, 68, 1, 0, NULL, NULL, NULL, NULL),
(694, 68, 11, 1, NULL, NULL, NULL, NULL),
(695, 68, 68, 2, NULL, NULL, NULL, NULL),
(696, 64, 1, 0, NULL, NULL, NULL, NULL),
(697, 64, 9, 1, NULL, NULL, NULL, NULL),
(698, 64, 64, 2, NULL, NULL, NULL, NULL),
(699, 60, 1, 0, NULL, NULL, NULL, NULL),
(700, 60, 60, 2, NULL, NULL, NULL, NULL),
(701, 60, 7, 1, NULL, NULL, NULL, NULL),
(702, 53, 3, 0, NULL, NULL, NULL, NULL),
(703, 53, 19, 1, NULL, NULL, NULL, NULL),
(704, 53, 53, 2, NULL, NULL, NULL, NULL),
(705, 50, 3, 0, NULL, NULL, NULL, NULL),
(706, 50, 17, 1, NULL, NULL, NULL, NULL),
(707, 50, 50, 2, NULL, NULL, NULL, NULL),
(708, 48, 3, 0, NULL, NULL, NULL, NULL),
(709, 48, 17, 1, NULL, NULL, NULL, NULL),
(710, 48, 48, 2, NULL, NULL, NULL, NULL),
(711, 44, 44, 2, NULL, NULL, NULL, NULL),
(712, 44, 16, 1, NULL, NULL, NULL, NULL),
(713, 44, 4, 0, NULL, NULL, NULL, NULL),
(714, 35, 4, 0, NULL, NULL, NULL, NULL),
(715, 35, 13, 1, NULL, NULL, NULL, NULL),
(716, 35, 35, 2, NULL, NULL, NULL, NULL),
(717, 33, 4, 0, NULL, NULL, NULL, NULL),
(718, 33, 13, 1, NULL, NULL, NULL, NULL),
(719, 33, 33, 2, NULL, NULL, NULL, NULL),
(720, 27, 6, 0, NULL, NULL, NULL, NULL),
(721, 27, 27, 1, NULL, NULL, NULL, NULL),
(722, 25, 6, 0, NULL, NULL, NULL, NULL),
(723, 25, 25, 1, NULL, NULL, NULL, NULL),
(724, 24, 6, 0, NULL, NULL, NULL, NULL),
(725, 24, 24, 1, NULL, NULL, NULL, NULL),
(726, 23, 5, 0, NULL, NULL, NULL, NULL),
(727, 23, 23, 1, NULL, NULL, NULL, NULL),
(728, 22, 5, 0, NULL, NULL, NULL, NULL),
(729, 22, 22, 1, NULL, NULL, NULL, NULL),
(730, 21, 5, 0, NULL, NULL, NULL, NULL),
(731, 21, 21, 1, NULL, NULL, NULL, NULL),
(732, 19, 3, 0, NULL, NULL, NULL, NULL),
(733, 19, 19, 1, NULL, NULL, NULL, NULL),
(734, 18, 18, 1, NULL, NULL, NULL, NULL),
(735, 18, 3, 0, NULL, NULL, NULL, NULL),
(736, 16, 4, 0, NULL, NULL, NULL, NULL),
(737, 16, 16, 1, NULL, NULL, NULL, NULL),
(738, 14, 4, 0, NULL, NULL, NULL, NULL),
(739, 14, 14, 1, NULL, NULL, NULL, NULL),
(740, 13, 4, 0, NULL, NULL, NULL, NULL),
(741, 13, 13, 1, NULL, NULL, NULL, NULL),
(742, 11, 1, 0, NULL, NULL, NULL, NULL),
(743, 11, 11, 1, NULL, NULL, NULL, NULL),
(744, 9, 1, 0, NULL, NULL, NULL, NULL),
(745, 9, 9, 1, NULL, NULL, NULL, NULL),
(746, 7, 7, 1, NULL, NULL, NULL, NULL),
(747, 7, 1, 0, NULL, NULL, NULL, NULL),
(748, 4, 4, 0, NULL, NULL, NULL, NULL),
(752, 157, 4, 0, NULL, NULL, NULL, NULL),
(753, 157, 155, 1, NULL, NULL, NULL, NULL),
(754, 157, 157, 2, NULL, NULL, NULL, NULL),
(755, 149, 6, 0, NULL, NULL, NULL, NULL),
(756, 149, 147, 1, NULL, NULL, NULL, NULL),
(757, 149, 149, 2, NULL, NULL, NULL, NULL),
(758, 143, 143, 2, NULL, NULL, NULL, NULL),
(759, 143, 141, 1, NULL, NULL, NULL, NULL),
(760, 143, 4, 0, NULL, NULL, NULL, NULL),
(761, 107, 1, 0, NULL, NULL, NULL, NULL),
(762, 107, 7, 1, NULL, NULL, NULL, NULL),
(763, 107, 107, 2, NULL, NULL, NULL, NULL),
(764, 106, 6, 0, NULL, NULL, NULL, NULL),
(765, 106, 25, 1, NULL, NULL, NULL, NULL),
(766, 106, 106, 2, NULL, NULL, NULL, NULL),
(767, 105, 4, 0, NULL, NULL, NULL, NULL),
(768, 105, 14, 1, NULL, NULL, NULL, NULL),
(769, 105, 105, 2, NULL, NULL, NULL, NULL),
(770, 104, 104, 2, NULL, NULL, NULL, NULL),
(771, 104, 18, 1, NULL, NULL, NULL, NULL),
(772, 104, 3, 0, NULL, NULL, NULL, NULL),
(773, 102, 92, 0, NULL, NULL, NULL, NULL),
(774, 102, 96, 1, NULL, NULL, NULL, NULL),
(775, 102, 102, 2, NULL, NULL, NULL, NULL),
(776, 101, 92, 0, NULL, NULL, NULL, NULL),
(777, 101, 99, 1, NULL, NULL, NULL, NULL),
(778, 101, 101, 2, NULL, NULL, NULL, NULL),
(779, 95, 92, 0, NULL, NULL, NULL, NULL),
(780, 95, 93, 1, NULL, NULL, NULL, NULL),
(781, 95, 95, 2, NULL, NULL, NULL, NULL),
(782, 86, 86, 2, NULL, NULL, NULL, NULL),
(783, 86, 25, 1, NULL, NULL, NULL, NULL),
(784, 86, 6, 0, NULL, NULL, NULL, NULL),
(785, 84, 6, 0, NULL, NULL, NULL, NULL),
(786, 84, 24, 1, NULL, NULL, NULL, NULL),
(787, 84, 84, 2, NULL, NULL, NULL, NULL),
(788, 83, 6, 0, NULL, NULL, NULL, NULL),
(789, 83, 24, 1, NULL, NULL, NULL, NULL),
(790, 83, 83, 2, NULL, NULL, NULL, NULL),
(791, 80, 5, 0, NULL, NULL, NULL, NULL),
(792, 80, 23, 1, NULL, NULL, NULL, NULL),
(793, 80, 80, 2, NULL, NULL, NULL, NULL),
(794, 74, 21, 1, NULL, NULL, NULL, NULL),
(795, 74, 74, 2, NULL, NULL, NULL, NULL),
(796, 74, 5, 0, NULL, NULL, NULL, NULL),
(797, 69, 1, 0, NULL, NULL, NULL, NULL),
(798, 69, 11, 1, NULL, NULL, NULL, NULL),
(799, 69, 69, 2, NULL, NULL, NULL, NULL),
(800, 65, 1, 0, NULL, NULL, NULL, NULL),
(801, 65, 9, 1, NULL, NULL, NULL, NULL),
(802, 65, 65, 2, NULL, NULL, NULL, NULL),
(803, 54, 3, 0, NULL, NULL, NULL, NULL),
(804, 54, 19, 1, NULL, NULL, NULL, NULL),
(805, 54, 54, 2, NULL, NULL, NULL, NULL),
(806, 52, 3, 0, NULL, NULL, NULL, NULL),
(807, 52, 52, 2, NULL, NULL, NULL, NULL),
(808, 52, 18, 1, NULL, NULL, NULL, NULL),
(809, 45, 4, 0, NULL, NULL, NULL, NULL),
(810, 45, 16, 1, NULL, NULL, NULL, NULL),
(811, 45, 45, 2, NULL, NULL, NULL, NULL),
(812, 38, 4, 0, NULL, NULL, NULL, NULL),
(813, 38, 14, 1, NULL, NULL, NULL, NULL),
(814, 38, 38, 2, NULL, NULL, NULL, NULL),
(815, 17, 3, 0, NULL, NULL, NULL, NULL),
(816, 17, 17, 1, NULL, NULL, NULL, NULL),
(817, 1, 1, 0, NULL, NULL, NULL, NULL),
(818, 134, 134, 2, NULL, NULL, NULL, NULL),
(819, 134, 9, 1, NULL, NULL, NULL, NULL),
(820, 134, 1, 0, NULL, NULL, NULL, NULL),
(821, 92, 92, 0, NULL, NULL, NULL, NULL),
(822, 36, 4, 0, NULL, NULL, NULL, NULL),
(823, 36, 13, 1, NULL, NULL, NULL, NULL),
(824, 36, 36, 2, NULL, NULL, NULL, NULL),
(825, 3, 3, 0, NULL, NULL, NULL, NULL),
(826, 5, 5, 0, NULL, NULL, NULL, NULL),
(827, 6, 6, 0, NULL, NULL, NULL, NULL),
(834, 159, 1, 0, NULL, NULL, NULL, NULL),
(835, 159, 158, 1, NULL, NULL, NULL, NULL),
(836, 159, 159, 2, NULL, NULL, NULL, NULL),
(837, 161, 6, 0, NULL, NULL, NULL, NULL),
(838, 161, 25, 1, NULL, NULL, NULL, NULL),
(839, 161, 106, 2, NULL, NULL, NULL, NULL),
(840, 161, 161, 3, NULL, NULL, NULL, NULL),
(841, 162, 4, 0, NULL, NULL, NULL, NULL),
(842, 162, 155, 1, NULL, NULL, NULL, NULL),
(843, 162, 162, 2, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `message` text,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `iso_code_2` varchar(2) NOT NULL,
  `iso_code_3` varchar(3) NOT NULL,
  `address_format` text,
  `postcode_required` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`country_id`, `name`, `iso_code_2`, `iso_code_3`, `address_format`, `postcode_required`, `is_active`) VALUES
(2, 'Albania', 'AL', 'ALB', '', 1, 0),
(3, 'Algeria', 'DZ', 'DZA', '', 1, 1),
(4, 'American Samoa', 'AS', 'ASM', '', 1, 1),
(5, 'Andorra', 'AD', 'AND', '', 0, 1),
(6, 'Angola', 'AO', 'AGO', '', 0, 1),
(7, 'Anguilla', 'AI', 'AIA', '', 0, 1),
(8, 'Antarctica', 'AQ', 'ATA', '', 0, 1),
(9, 'Antigua and Barbuda', 'AG', 'ATG', '', 0, 1),
(10, 'Argentina', 'AR', 'ARG', '', 0, 1),
(11, 'Armenia', 'AM', 'ARM', '', 0, 1),
(12, 'Aruba', 'AW', 'ABW', '', 0, 1),
(13, 'Australia', 'AU', 'AUS', '', 1, 1),
(16, 'Bahamas', 'BS', 'BHS', '', 0, 1),
(17, 'Bahrain', 'BH', 'BHR', '', 0, 1),
(18, 'Bangladesh', 'BD', 'BGD', '', 0, 1),
(19, 'Barbados', 'BB', 'BRB', '', 0, 1),
(20, 'Belarus', 'BY', 'BLR', '', 1, 0),
(22, 'Belize', 'BZ', 'BLZ', '', 0, 1),
(23, 'Benin', 'BJ', 'BEN', '', 1, 0),
(24, 'Bermuda', 'BM', 'BMU', '', 0, 1),
(25, 'Bhutan', 'BT', 'BTN', '', 0, 1),
(26, 'Bolivia', 'BO', 'BOL', '', 0, 1),
(27, 'Bosnia and Herzegovina', 'BA', 'BIH', '', 0, 1),
(28, 'Botswana', 'BW', 'BWA', '', 0, 1),
(29, 'Bouvet Island', 'BV', 'BVT', '', 0, 1),
(30, 'Brazil', 'BR', 'BRA', '', 1, 0),
(31, 'British Indian Ocean Territory', 'IO', 'IOT', '', 0, 1),
(32, 'Brunei Darussalam', 'BN', 'BRN', '', 0, 1),
(33, 'Bulgaria', 'BG', 'BGR', '', 0, 1),
(34, 'Burkina Faso', 'BF', 'BFA', '', 0, 1),
(35, 'Burundi', 'BI', 'BDI', '', 0, 1),
(36, 'Cambodia', 'KH', 'KHM', '', 0, 1),
(37, 'Cameroon', 'CM', 'CMR', '', 0, 1),
(38, 'Canada', 'CA', 'CAN', '', 0, 1),
(39, 'Cape Verde', 'CV', 'CPV', '', 0, 1),
(40, 'Cayman Islands', 'KY', 'CYM', '', 0, 1),
(41, 'Central African Republic', 'CF', 'CAF', '', 0, 1),
(42, 'Chad', 'TD', 'TCD', '', 0, 1),
(43, 'Chile', 'CL', 'CHL', '', 0, 1),
(44, 'China', 'CN', 'CHN', '', 0, 1),
(45, 'Christmas Island', 'CX', 'CXR', '', 0, 1),
(46, 'Cocos (Keeling) Islands', 'CC', 'CCK', '', 0, 1),
(47, 'Colombia', 'CO', 'COL', '', 0, 1),
(48, 'Comoros', 'KM', 'COM', '', 0, 1),
(49, 'Congo', 'CG', 'COG', '', 0, 1),
(50, 'Cook Islands', 'CK', 'COK', '', 0, 1),
(51, 'Costa Rica', 'CR', 'CRI', '', 0, 1),
(53, 'Croatia', 'HR', 'HRV', '', 0, 1),
(54, 'Cuba', 'CU', 'CUB', '', 0, 1),
(55, 'Cyprus', 'CY', 'CYP', '', 0, 1),
(56, 'Czech Republic', 'CZ', 'CZE', '', 0, 1),
(57, 'Denmark', 'DK', 'DNK', '', 0, 1),
(58, 'Djibouti', 'DJ', 'DJI', '', 0, 1),
(59, 'Dominica', 'DM', 'DMA', '', 0, 1),
(60, 'Dominican Republic', 'DO', 'DOM', '', 0, 1),
(61, 'East Timor', 'TL', 'TLS', '', 0, 1),
(62, 'Ecuador', 'EC', 'ECU', '', 0, 1),
(63, 'Egypt', 'EG', 'EGY', '', 0, 1),
(64, 'El Salvador', 'SV', 'SLV', '', 0, 1),
(65, 'Equatorial Guinea', 'GQ', 'GNQ', '', 0, 1),
(66, 'Eritrea', 'ER', 'ERI', '', 0, 1),
(67, 'Estonia', 'EE', 'EST', '', 0, 1),
(68, 'Ethiopia', 'ET', 'ETH', '', 0, 1),
(69, 'Falkland Islands (Malvinas)', 'FK', 'FLK', '', 0, 1),
(70, 'Faroe Islands', 'FO', 'FRO', '', 0, 1),
(71, 'Fiji', 'FJ', 'FJI', '', 0, 1),
(72, 'Finland', 'FI', 'FIN', '', 0, 1),
(74, 'France, Metropolitan', 'FR', 'FRA', '{firstname} {lastname}\r\n{company}\r\n{address_1}\r\n{address_2}\r\n{postcode} {city}\r\n{country}', 1, 1),
(75, 'French Guiana', 'GF', 'GUF', '', 0, 1),
(76, 'French Polynesia', 'PF', 'PYF', '', 0, 1),
(77, 'French Southern Territories', 'TF', 'ATF', '', 0, 1),
(78, 'Gabon', 'GA', 'GAB', '', 0, 1),
(79, 'Gambia', 'GM', 'GMB', '', 0, 1),
(80, 'Georgia', 'GE', 'GEO', '', 0, 1),
(81, 'Germany', 'DE', 'DEU', '{company}\r\n{firstname} {lastname}\r\n{address_1}\r\n{address_2}\r\n{postcode} {city}\r\n{country}', 1, 1),
(82, 'Ghana', 'GH', 'GHA', '', 0, 1),
(83, 'Gibraltar', 'GI', 'GIB', '', 0, 1),
(84, 'Greece', 'GR', 'GRC', '', 0, 1),
(85, 'Greenland', 'GL', 'GRL', '', 0, 1),
(86, 'Grenada', 'GD', 'GRD', '', 0, 1),
(87, 'Guadeloupe', 'GP', 'GLP', '', 0, 1),
(88, 'Guam', 'GU', 'GUM', '', 0, 1),
(89, 'Guatemala', 'GT', 'GTM', '', 0, 1),
(90, 'Guinea', 'GN', 'GIN', '', 0, 1),
(91, 'Guinea-Bissau', 'GW', 'GNB', '', 0, 1),
(92, 'Guyana', 'GY', 'GUY', '', 0, 1),
(93, 'Haiti', 'HT', 'HTI', '', 0, 1),
(94, 'Heard and Mc Donald Islands', 'HM', 'HMD', '', 0, 1),
(95, 'Honduras', 'HN', 'HND', '', 0, 1),
(96, 'Hong Kong', 'HK', 'HKG', '', 0, 1),
(97, 'Hungary', 'HU', 'HUN', '', 0, 1),
(98, 'Iceland', 'IS', 'ISL', '', 0, 1),
(99, 'India', 'IN', 'IND', '', 0, 1),
(100, 'Indonesia', 'ID', 'IDN', '', 0, 1),
(101, 'Iran (Islamic Republic of)', 'IR', 'IRN', '', 1, 1),
(102, 'Iraq', 'IQ', 'IRQ', '', 0, 1),
(103, 'Ireland', 'IE', 'IRL', '', 0, 1),
(104, 'Israel', 'IL', 'ISR', '', 0, 1),
(105, 'Italy', 'IT', 'ITA', '', 0, 1),
(106, 'Jamaica', 'JM', 'JAM', '', 0, 1),
(107, 'Japan', 'JP', 'JPN', '', 0, 1),
(108, 'Jordan', 'JO', 'JOR', '', 0, 1),
(109, 'Kazakhstan', 'KZ', 'KAZ', '', 0, 1),
(110, 'Kenya', 'KE', 'KEN', '', 0, 1),
(111, 'Kiribati', 'KI', 'KIR', '', 0, 1),
(112, 'North Korea', 'KP', 'PRK', '', 0, 1),
(113, 'South Korea', 'KR', 'KOR', '', 0, 1),
(114, 'Kuwait', 'KW', 'KWT', '', 0, 1),
(115, 'Kyrgyzstan', 'KG', 'KGZ', '', 0, 1),
(116, 'Lao People\'s Democratic Republic', 'LA', 'LAO', '', 0, 1),
(117, 'Latvia', 'LV', 'LVA', '', 0, 1),
(118, 'Lebanon', 'LB', 'LBN', '', 0, 1),
(119, 'Lesotho', 'LS', 'LSO', '', 0, 1),
(120, 'Liberia', 'LR', 'LBR', '', 0, 1),
(121, 'Libyan Arab Jamahiriya', 'LY', 'LBY', '', 0, 1),
(122, 'Liechtenstein', 'LI', 'LIE', '', 0, 1),
(123, 'Lithuania', 'LT', 'LTU', '', 0, 1),
(124, 'Luxembourg', 'LU', 'LUX', '', 0, 1),
(125, 'Macau', 'MO', 'MAC', '', 0, 1),
(126, 'FYROM', 'MK', 'MKD', '', 0, 1),
(127, 'Madagascar', 'MG', 'MDG', '', 0, 1),
(128, 'Malawi', 'MW', 'MWI', '', 0, 1),
(129, 'Malaysia', 'MY', 'MYS', '', 0, 1),
(130, 'Maldives', 'MV', 'MDV', '', 0, 1),
(131, 'Mali', 'ML', 'MLI', '', 0, 1),
(132, 'Malta', 'MT', 'MLT', '', 0, 1),
(133, 'Marshall Islands', 'MH', 'MHL', '', 0, 1),
(134, 'Martinique', 'MQ', 'MTQ', '', 0, 1),
(135, 'Mauritania', 'MR', 'MRT', '', 0, 1),
(136, 'Mauritius', 'MU', 'MUS', '', 0, 1),
(137, 'Mayotte', 'YT', 'MYT', '', 0, 1),
(138, 'Mexico', 'MX', 'MEX', '', 0, 1),
(139, 'Micronesia, Federated States of', 'FM', 'FSM', '', 0, 1),
(140, 'Moldova, Republic of', 'MD', 'MDA', '', 0, 1),
(141, 'Monaco', 'MC', 'MCO', '', 0, 1),
(142, 'Mongolia', 'MN', 'MNG', '', 0, 1),
(143, 'Montserrat', 'MS', 'MSR', '', 0, 1),
(144, 'Morocco', 'MA', 'MAR', '', 0, 1),
(145, 'Mozambique', 'MZ', 'MOZ', '', 0, 1),
(146, 'Myanmar', 'MM', 'MMR', '', 0, 1),
(147, 'Namibia', 'NA', 'NAM', '', 0, 1),
(148, 'Nauru', 'NR', 'NRU', '', 0, 1),
(149, 'Nepal', 'NP', 'NPL', '', 0, 1),
(150, 'Netherlands', 'NL', 'NLD', '', 0, 1),
(151, 'Netherlands Antilles', 'AN', 'ANT', '', 0, 1),
(152, 'New Caledonia', 'NC', 'NCL', '', 0, 1),
(153, 'New Zealand', 'NZ', 'NZL', '', 0, 1),
(154, 'Nicaragua', 'NI', 'NIC', '', 0, 1),
(155, 'Niger', 'NE', 'NER', '', 0, 1),
(156, 'Nigeria', 'NG', 'NGA', '', 0, 1),
(157, 'Niue', 'NU', 'NIU', '', 0, 1),
(158, 'Norfolk Island', 'NF', 'NFK', '', 0, 1),
(159, 'Northern Mariana Islands', 'MP', 'MNP', '', 0, 1),
(160, 'Norway', 'NO', 'NOR', '', 0, 1),
(161, 'Oman', 'OM', 'OMN', '', 0, 1),
(162, 'Pakistan', 'PK', 'PAK', '', 0, 1),
(163, 'Palau', 'PW', 'PLW', '', 0, 1),
(164, 'Panama', 'PA', 'PAN', '', 0, 1),
(165, 'Papua New Guinea', 'PG', 'PNG', '', 0, 1),
(166, 'Paraguay', 'PY', 'PRY', '', 0, 1),
(167, 'Peru', 'PE', 'PER', '', 0, 1),
(168, 'Philippines', 'PH', 'PHL', '', 0, 1),
(169, 'Pitcairn', 'PN', 'PCN', '', 0, 1),
(170, 'Poland', 'PL', 'POL', '', 0, 1),
(171, 'Portugal', 'PT', 'PRT', '', 0, 1),
(172, 'Puerto Rico', 'PR', 'PRI', '', 0, 1),
(173, 'Qatar', 'QA', 'QAT', '', 0, 1),
(174, 'Reunion', 'RE', 'REU', '', 0, 1),
(175, 'Romania', 'RO', 'ROM', '', 0, 1),
(176, 'Russian Federation', 'RU', 'RUS', '', 0, 1),
(177, 'Rwanda', 'RW', 'RWA', '', 0, 1),
(178, 'Saint Kitts and Nevis', 'KN', 'KNA', '', 0, 1),
(179, 'Saint Lucia', 'LC', 'LCA', '', 0, 1),
(180, 'Saint Vincent and the Grenadines', 'VC', 'VCT', '', 0, 1),
(181, 'Samoa', 'WS', 'WSM', '', 0, 1),
(182, 'San Marino', 'SM', 'SMR', '', 0, 1),
(183, 'Sao Tome and Principe', 'ST', 'STP', '', 0, 1),
(184, 'Saudi Arabia', 'SA', 'SAU', '', 0, 1),
(185, 'Senegal', 'SN', 'SEN', '', 0, 1),
(186, 'Seychelles', 'SC', 'SYC', '', 0, 1),
(187, 'Sierra Leone', 'SL', 'SLE', '', 0, 1),
(188, 'Singapore', 'SG', 'SGP', '', 0, 1),
(189, 'Slovak Republic', 'SK', 'SVK', '{firstname} {lastname}\r\n{company}\r\n{address_1}\r\n{address_2}\r\n{city} {postcode}\r\n{zone}\r\n{country}', 0, 1),
(190, 'Slovenia', 'SI', 'SVN', '', 0, 1),
(191, 'Solomon Islands', 'SB', 'SLB', '', 0, 1),
(192, 'Somalia', 'SO', 'SOM', '', 0, 1),
(193, 'South Africa', 'ZA', 'ZAF', '', 0, 1),
(194, 'South Georgia &amp; South Sandwich Islands', 'GS', 'SGS', '', 0, 1),
(195, 'Spain', 'ES', 'ESP', '', 0, 1),
(196, 'Sri Lanka', 'LK', 'LKA', '', 0, 1),
(197, 'St. Helena', 'SH', 'SHN', '', 0, 1),
(198, 'St. Pierre and Miquelon', 'PM', 'SPM', '', 0, 1),
(199, 'Sudan', 'SD', 'SDN', '', 0, 1),
(200, 'Suriname', 'SR', 'SUR', '', 0, 1),
(201, 'Svalbard and Jan Mayen Islands', 'SJ', 'SJM', '', 0, 1),
(202, 'Swaziland', 'SZ', 'SWZ', '', 0, 1),
(203, 'Sweden', 'SE', 'SWE', '{company}\r\n{firstname} {lastname}\r\n{address_1}\r\n{address_2}\r\n{postcode} {city}\r\n{country}', 1, 1),
(204, 'Switzerland', 'CH', 'CHE', '', 0, 1),
(205, 'Syrian Arab Republic', 'SY', 'SYR', '', 0, 1),
(206, 'Taiwan', 'TW', 'TWN', '', 0, 1),
(207, 'Tajikistan', 'TJ', 'TJK', '', 0, 1),
(208, 'Tanzania, United Republic of', 'TZ', 'TZA', '', 0, 1),
(209, 'Thailand', 'TH', 'THA', '', 0, 1),
(210, 'Togo', 'TG', 'TGO', '', 0, 1),
(211, 'Tokelau', 'TK', 'TKL', '', 0, 1),
(212, 'Tonga', 'TO', 'TON', '', 0, 1),
(213, 'Trinidad and Tobago', 'TT', 'TTO', '', 0, 1),
(214, 'Tunisia', 'TN', 'TUN', '', 0, 1),
(215, 'Turkey', 'TR', 'TUR', '', 0, 1),
(216, 'Turkmenistan', 'TM', 'TKM', '', 0, 1),
(217, 'Turks and Caicos Islands', 'TC', 'TCA', '', 0, 1),
(218, 'Tuvalu', 'TV', 'TUV', '', 0, 1),
(219, 'Uganda', 'UG', 'UGA', '', 0, 1),
(220, 'Ukraine', 'UA', 'UKR', '', 0, 1),
(221, 'United Arab Emirates', 'AE', 'ARE', '', 0, 1),
(222, 'United Kingdom', 'GB', 'GBR', '', 1, 1),
(223, 'United States', 'US', 'USA', '{firstname} {lastname}\r\n{company}\r\n{address_1}\r\n{address_2}\r\n{city}, {zone} {postcode}\r\n{country}', 0, 1),
(224, 'United States Minor Outlying Islands', 'UM', 'UMI', '', 0, 1),
(225, 'Uruguay', 'UY', 'URY', '', 0, 1),
(226, 'Uzbekistan', 'UZ', 'UZB', '', 0, 1),
(227, 'Vanuatu', 'VU', 'VUT', '', 0, 1),
(228, 'Vatican City State (Holy See)', 'VA', 'VAT', '', 0, 1),
(229, 'Venezuela', 'VE', 'VEN', '', 0, 1),
(230, 'Viet Nam', 'VN', 'VNM', '', 0, 1),
(231, 'Virgin Islands (British)', 'VG', 'VGB', '', 0, 1),
(232, 'Virgin Islands (U.S.)', 'VI', 'VIR', '', 0, 1),
(233, 'Wallis and Futuna Islands', 'WF', 'WLF', '', 0, 1),
(234, 'Western Sahara', 'EH', 'ESH', '', 0, 1),
(235, 'Yemen', 'YE', 'YEM', '', 0, 1),
(237, 'Democratic Republic of Congo', 'CD', 'COD', '', 0, 1),
(238, 'Zambia', 'ZM', 'ZMB', '', 0, 1),
(239, 'Zimbabwe', 'ZW', 'ZWE', '', 0, 1),
(242, 'Montenegro', 'ME', 'MNE', '', 0, 1),
(243, 'Serbia', 'RS', 'SRB', '', 0, 1),
(261, 'g', 'AF', 'AGF', NULL, 1, 0),
(245, 'Bonaire, Sint Eustatius and Saba', 'BQ', 'BES', '', 0, 1),
(246, 'Curacao', 'CW', 'CUW', '', 0, 1),
(247, 'Palestinian Territory, Occupied', 'PS', 'PSE', '', 0, 1),
(248, 'South Sudan', 'SS', 'SSD', '', 0, 1),
(249, 'St. Barthelemy', 'BL', 'BLM', '', 0, 1),
(250, 'St. Martin (French part)', 'MF', 'MAF', '', 0, 1),
(251, 'Canary Islands', 'IC', 'ICA', '', 0, 1),
(252, 'Ascension Island (British)', 'AC', 'ASC', '', 0, 1),
(253, 'Kosovo, Republic of', 'XK', 'UNK', '', 0, 1),
(254, 'Isle of Man', 'IM', 'IMN', '', 0, 1),
(255, 'Tristan da Cunha', 'TA', 'SHN', '', 0, 1),
(256, 'Guernsey', 'GG', 'GGY', '', 0, 1),
(257, 'Jersey', 'JE', 'JEY', '', 0, 1),
(258, 'klkl', '45', '55', NULL, 1, 0),
(260, 'Europe', 'EU', 'EU2', NULL, 1, 1),
(264, 'g', 'AS', 'FDG', NULL, 1, 0),
(274, 'Afghanistan', 'AF', 'AFI', NULL, 1, 0),
(277, 'indiai', 'in', 'inr', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `currency_id` int(11) NOT NULL,
  `title` varchar(32) DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL,
  `symbol_left` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `symbol_Right` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `decimal_place` decimal(5,0) DEFAULT NULL,
  `value` float(15,2) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`currency_id`, `title`, `code`, `symbol_left`, `symbol_Right`, `decimal_place`, `value`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(46, 'Dollar', 'USD', '$', NULL, NULL, 73.00, 1, '2019-02-17 22:18:16', '2019-08-10 09:55:28', NULL, NULL),
(57, 'Rupees', 'INR', '₹', NULL, NULL, 1.00, 1, '2019-03-20 01:57:14', '2019-08-21 10:34:07', NULL, NULL),
(65, 'EURO', 'EU', '1', NULL, NULL, 66.00, 1, '2019-08-20 08:56:57', '2019-08-20 08:57:04', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `first_name` varchar(512) DEFAULT NULL,
  `last_name` varchar(512) DEFAULT NULL,
  `username` varchar(512) NOT NULL,
  `email` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `avatar_path` tinytext,
  `mail_status` int(11) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT '0',
  `customer_group_id` int(11) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `newsletter` int(11) DEFAULT NULL,
  `safe` int(11) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `zone_id` varchar(255) DEFAULT NULL,
  `local` varchar(255) DEFAULT NULL,
  `oauth_data` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `forget_password_key` varchar(255) DEFAULT NULL,
  `locked_on` varchar(255) DEFAULT NULL,
  `forget_password_link_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `mobile`, `address`, `country_id`, `city`, `pincode`, `avatar`, `avatar_path`, `mail_status`, `delete_flag`, `customer_group_id`, `last_login`, `newsletter`, `safe`, `ip`, `zone_id`, `local`, `oauth_data`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`, `forget_password_key`, `locked_on`, `forget_password_link_expires`) VALUES
(1, 'demo', NULL, 'demo@gmail.com', 'demo@gmail.com', '$2b$10$/7MmJDnJ7FcYsOOAnIQwPeevZQPlP9TqjMm92ZC/kahsJFrnfMGs2', '9876543870', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2021-10-21 17:13:52', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, '2020-07-15 12:10:43', '2021-10-21 17:13:52', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer_activity`
--

CREATE TABLE `customer_activity` (
  `customer_activity_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_cart`
--

CREATE TABLE `customer_cart` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `option_name` text,
  `option_value_name` varchar(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `tire_price` decimal(10,2) DEFAULT NULL,
  `product_option_value_id` varchar(255) DEFAULT NULL,
  `sku_name` varchar(255) DEFAULT NULL,
  `varient_name` varchar(255) DEFAULT NULL,
  `product_varient_option_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_group`
--

CREATE TABLE `customer_group` (
  `id` int(11) NOT NULL,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `color_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_group`
--

INSERT INTO `customer_group` (`id`, `name`, `description`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`, `color_code`) VALUES
(1, 'default', 'default', 1, NULL, NULL, '2020-02-24 09:09:22', '2020-04-18 07:23:31', '#0000ff');

-- --------------------------------------------------------

--
-- Table structure for table `customer_ip`
--

CREATE TABLE `customer_ip` (
  `customer_ip_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_transaction`
--

CREATE TABLE `customer_transaction` (
  `customer_transaction_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `description` text,
  `amount` decimal(15,4) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_wishlist`
--

CREATE TABLE `customer_wishlist` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_option_value_id` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `email_template`
--

CREATE TABLE `email_template` (
  `id` int(11) NOT NULL,
  `shortname` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `email_template`
--

INSERT INTO `email_template` (`id`, `shortname`, `subject`, `message`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(1, 'Register Content', 'Registration Successfully', 'Dear {name},<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Thank you for expressing your interest and registering with Spurtcommerce, the faster roadway for a smarter eCommerce drive.   </p>', 1, '2019-08-03 12:46:18', '2019-08-03 12:46:18', NULL, NULL),
(2, 'Forgot Password Content', 'Forgot Password', 'Dear {name},<br/><br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Your new Password is :  {xxxxxx}  </p>', 1, '2019-08-03 12:46:18', '2019-08-03 12:46:18', NULL, NULL),
(3, 'Contact Content', 'ContactUs', 'Dear Admin,<br/><br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> You just received an enquiry from {name} and the details are here: <br> Details: <br> Email: {email}, <br> Phone Number : {phoneNumber}, <br> Message : {message}.  </p>', 1, '2019-08-03 12:46:18', '2019-08-03 12:46:18', NULL, NULL),
(4, 'Create Customer Content', 'User Login', 'Dear {name},<br/><br/>    We are glad to inform you that Spurtcommerce  has added you as Customer.Here are your User Credentials for logging into the Application <br>     <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;\'>  User ID : {username}</p>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;\'>  Password : {password}</p> <br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> You may login using the above Email Id and Password. </p>', 1, '2019-08-03 12:46:18', '2019-08-03 12:46:18', NULL, NULL),
(5, 'Customer Order Content', 'Details of your recent Order', 'Dear {name},        </td>    </tr>    <tr>        <td dir=\'ltr\' style=\'padding:0 0px;color:#078e05;font-weight:400;text-align:left;font-size:16px;line-height:1.5rem;padding-top:10px;font-family: \'Roboto\', sans-serif;\' valign=\'top\'> Order successfully placed.        </td>    </tr>    <tr>        <td dir=\'ltr\' style=\'padding:0 0px;color:#000;font-weight:300;text-align:left;font-size:12px;line-height:1.2rem;padding-top:10px;font-family: \'Roboto\', sans-serif;\' valign=\'top\'> You have successfully placed an order for customization services. Kindly find the following details on the placed order.    </tr></tbody></table></td></tr> ', 1, '2019-08-03 12:46:18', '2019-08-03 12:46:18', NULL, NULL),
(6, 'Admin Mail Content', 'Congratulations on your recent order', 'Dear {adminname},        </td>    </tr>    <tr>        <td dir=\'ltr\' style=\'padding:0 0px;color:#078e05;font-weight:400;text-align:left;font-size:16px;line-height:1.5rem;padding-top:10px;font-family: \'Roboto\', sans-serif;\' valign=\'top\'> A new order has been placed.         </td>    </tr>    <tr>        <td dir=\'ltr\' style=\'padding:0 0px;color:#000;font-weight:300;text-align:left;font-size:12px;line-height:1.2rem;padding-top:10px;font-family: \'Roboto\', sans-serif;\' valign=\'top\'> The new order {orderId} from the Customer {name} has been successfully placed. Kindly find the following details on the placed order.    </tr> </tbody></table></td> </tr> ', 1, '2019-08-03 12:46:18', '2019-08-03 12:46:18', NULL, NULL),
(7, 'Create admin user Content', 'Login credential', ' <p>Dear {name}, <br />&nbsp;</p><p>We are glad to inform you that Spurtcommerce has added you as admin User.Here are your User Credentials for logging into the Application</p><p>User ID : {username}</p><p>Password : {password}</p><p>&nbsp;</p><p>You may login using the above Email Id and Password.</p><p>&nbsp;</p>', 1, '2019-08-03 12:46:18', '2019-08-03 12:46:18', NULL, NULL),
(23, 'Forgot password link', 'Forgot password link', 'Dear {name}, \n\n<p>click the below link.</p>\n\n<p>{link}.</p>\n\n<p> for reset your password </p>          \n<p>Regards,</p> \n  \n<p>The Spurt Commerce Team</p>', 1, '2021-04-08 16:02:03', '2021-04-08 16:02:03', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `geo_zone`
--

CREATE TABLE `geo_zone` (
  `geo_zone_id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `job_id` int(11) NOT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `job_description` text,
  `salary_type` varchar(255) DEFAULT NULL,
  `job_location` text,
  `contact_person_name` varchar(255) DEFAULT NULL,
  `contact_person_email` varchar(255) DEFAULT NULL,
  `contact_person_mobile` bigint(20) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`job_id`, `job_title`, `job_description`, `salary_type`, `job_location`, `contact_person_name`, `contact_person_email`, `contact_person_mobile`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(4, 'Node js developer', 'One year experience node js developer ', 'Monthly', 'Chennai', 'Aravindhan', 'aravind.picco@gmail.com', 9500107163, 1, NULL, NULL, '2019-07-29 11:15:23', '2019-07-29 11:15:23');

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `language_id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `code` varchar(5) DEFAULT NULL,
  `image` text,
  `image_path` text,
  `locale` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`language_id`, `name`, `code`, `image`, `image_path`, `locale`, `sort_order`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(57, 'English', 'eng', 'Img_1622893818038.png', 'language/', NULL, 1, 1, '2019-05-06 03:58:01', '2022-04-08 20:48:46', NULL, NULL),
(59, 'French', 'fr', 'Img_1557569207176.png', 'language/', NULL, 1, 1, '2019-05-11 05:06:47', '2022-03-13 19:01:23', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

CREATE TABLE `login_attempts` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login_log`
--

CREATE TABLE `login_log` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturer_id` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1546513939916, 'CreateUserTable1546513939916'),
(2, 1546516990326, 'CreateUserGroupTable1546516990326'),
(3, 1546521833384, 'CreateUserRelationToUserGroupTable1546521833384'),
(4, 1546522725201, 'CreateCategoryTable1546522725201'),
(5, 1546523068121, 'CreateZoneToGeoZoneTable1546523068121'),
(6, 1546523201059, 'CreateCustomerGroupTable1546523201059'),
(7, 1546523577052, 'CreateCustomerIpTable1546523577052'),
(8, 1546523725119, 'CreateGeoZoneTable1546523725119'),
(9, 1546523802480, 'CreateBannerGroupTable1546523802480'),
(10, 1546524333028, 'CreateCurrencyTable1546524333028'),
(11, 1546524561001, 'CreateCustomerTable1546524561001'),
(12, 1546525248338, 'CreateAddessTable1546525248338'),
(13, 1546525786783, 'CreateBannerImageTable1546525786783'),
(14, 1546525833396, 'CreateStockStatusTable1546525833396'),
(15, 1546526076621, 'CreateBannerTable1546526076621'),
(16, 1546526936010, 'CreateBannerImageDescriptionTable1546526936010'),
(17, 1546527306595, 'CreateCustomerTransactionTable1546527306595'),
(18, 1546528787878, 'CreateProductTable1546528787878'),
(19, 1546529746397, 'CreateProductRelatedTable1546529746397'),
(20, 1546529906290, 'CreateManufacturerTable1546529906290'),
(21, 1546530096773, 'CreateProductTagTable1546530096773'),
(22, 1546578299514, 'CreateLanguageTable1546578299514'),
(23, 1546578412979, 'AddProductRelatedRelationToProductTable1546578412979'),
(24, 1546578790576, 'CreateCategoryDescriptionTable1546578790576'),
(25, 1546579410193, 'CreateProductImageTable1546579410193'),
(26, 1546579597970, 'CreateEmailTemplateTable1546579597970'),
(27, 1546579614441, 'CreateProductDescriptionTable1546579614441'),
(28, 1546579884423, 'CreateProductToCategoryTable1546579884423'),
(29, 1546580085881, 'CreateCountryTable1546580085881'),
(30, 1546580179314, 'CreateProductDiscountTable1546580179314'),
(31, 1546580427531, 'CreateProductRatingTable1546580427531'),
(32, 1546580612161, 'CreateZoneTable1546580612161'),
(33, 1546580872313, 'CreateOrderProductTable1546580872313'),
(34, 1546580970382, 'CreateSettingsTable1546580970382'),
(35, 1546581203387, 'CreateOrderOptionTable1546581203387'),
(36, 1546581429998, 'CreateOrderTotalTable1546581429998'),
(37, 1546581683040, 'CreatePageGroupTable1546581683040'),
(38, 1546581933917, 'CreateOrderHistoryTable1546581933917'),
(39, 1546582132870, 'CreateOrderStatusTable1546582132870'),
(40, 1546582513520, 'CreatePageTable1546582513520'),
(41, 1546585163896, 'AddProductImageRelationToProductTable1546585163896'),
(42, 1546585326281, 'AddProductDiscountRelationToProductTable1546585326281'),
(43, 1546585460413, 'AddProductRatingRelationToProductTable1546585460413'),
(44, 1546585572765, 'AddPageRelationToPageGroupTable1546585572765'),
(45, 1546586351105, 'CreateZoneCountryRelationToZoneGeoTable1546586351105'),
(46, 1546587376381, 'CreateOrderTable1546587376381'),
(47, 1546590433005, 'AddPoductToCategoryRelationToProductTable1546590433005'),
(48, 1546590872444, 'AddPoductToCategoryRelationToCategoryTable1546590872444'),
(49, 1546592870823, 'AddCustomerTransactionRelationToOrderTable1546592870823'),
(50, 1546593012207, 'AddCustomerTransactionRelationToCustomerTable1546593012207'),
(51, 1546593289549, 'AddOrderProductRelationToProductTable1546593289549'),
(52, 1546593359310, 'AddOrderProductRelationToOrderTable1546593359310'),
(53, 1546593427323, 'CreateCategoryRelationToCategoryDescriptionTable1546593427323'),
(56, 1546594100673, 'CreatebannerRelationToBannerImageDescriptionTable1546594100673'),
(57, 1546594184432, 'AddOrderHistoryRelationToOrderTable1546594184432'),
(58, 1546594262644, 'AddOrderHistoryRelationToOrderStatusTable1546594262644'),
(59, 1546594411489, 'CreateBannerImageRelationToBannerImageDescriptionTable1546594411489'),
(60, 1546594752832, 'AddOrderRelationToCustomerTable1546594752832'),
(61, 1546594852304, 'AddOrderRelationToCurrencyTable1546594852304'),
(62, 1546602183498, 'CreateBannerGroupRelationToBannerTable1546602183498'),
(63, 1549968165253, 'CreateOrderLogTable1549968165253'),
(64, 1549975268085, 'CreateLoginLogTable1549975268085'),
(65, 1549977253184, 'CreateCustomerWishlistTable1549977253184'),
(66, 1549978070935, 'CreateAccessTokenTable1549978070935'),
(67, 1549978269406, 'CreateContactTable1549978269406'),
(68, 1552371397992, 'AddCustomerWishlistRelationToCustomerTable1552371397992'),
(69, 1552371852472, 'AddCustomerWishlistRelationToProductTable1552371852472'),
(70, 1552376547486, 'CreateProductViewLogTable1552376547486'),
(71, 1552886376079, 'CreateCategoryPathTable1552886376079'),
(78, 1554980920462, 'CreateProductSpecialTable1554980920462'),
(79, 1555504622184, 'AddColumnInCustomer1555504622184'),
(80, 1555507207067, 'AddColumnInOrder1555507207067'),
(82, 1558003725620, 'AddColumnInOrderLog1558003725620'),
(83, 1558005767816, 'AddColumnInOrderProduct1558005767816'),
(94, 1561786420039, 'AddRelationWishlistToProductTable1561786420039'),
(95, 1561967809283, 'AlterColumnTable1561967809283'),
(97, 1562831060364, 'AlterCurrencyTable1562831060364'),
(98, 1563174105812, 'CreateBlogTable1563174105812'),
(99, 1563347331461, 'CreateJobsTable1563347331461'),
(100, 1565087039728, 'DropFKforOrderCustomer1565087039728'),
(101, 1565606134069, 'AddColumnInOrderTable1565606134069'),
(102, 1565682493625, 'AddColumnInUser1565682493625'),
(103, 1565781113424, 'AltercolumnInUser1565781113424'),
(104, 1565852482174, 'AlterLoginLogTable1565852482174'),
(105, 1565856125812, 'AlterProductColumn1565856125812'),
(110, 1569577082237, 'AddColumnInProductTable1569577082237'),
(111, 1569838152744, 'AddColumnInOrderLog1569838152744'),
(112, 1571735617882, 'AddColumnInCustomerGroup1571735617882'),
(113, 1571736071528, 'CreateCustomerActivityTable1571736071528'),
(114, 1571736086250, 'CreateActivityTable1571736086250'),
(120, 1573823878115, 'CreateProductPriceLogTable1573823878115'),
(122, 1574401863885, 'AddColumnInOrderStatus1574401863885'),
(123, 1574661760239, 'PriceUpdateFileLog1574661760239'),
(124, 1574752546404, 'AddColumnInProductPriceLog1574752546404'),
(132, 1578990577479, 'AddTrackingColumnInOrderTable1578990577479'),
(139, 1581419924612, 'CreatePaymentTable1581419924612'),
(140, 1581420780474, 'CreatePaymentItemsTable1581420780474'),
(144, 1581600070078, 'AddColumnInPriceUpdateFileLog1581600070078'),
(147, 1581674795492, 'AddColumnInOrder1581674795492'),
(151, 1581678039045, 'AddColumnInVendorOrderLog1581678039045'),
(154, 1581680192125, 'AddColumnInCategory1581680192125'),
(157, 1581399473295, 'CreateTaxTable1581399473295'),
(158, 1582177223557, 'AddColumnInOrderProductTable1582177223557'),
(159, 1582183277124, 'CreateOrderProductLogTable1582183277124'),
(160, 1582207388417, 'AddColumnInTaxColumnInProduct1582207388417'),
(161, 1582207440112, 'AddColumnInOrderProductTable1582207440112'),
(162, 1582265041245, 'CreateCustomerCartTable1582265041245'),
(163, 1582355542896, 'AlterColumnModelInOrderProductLog1582355542896'),
(164, 1582355584324, 'AlterColumnOrderProductPreIdInOrderProduct1582355584324'),
(165, 1582551346241, 'AlterCustomerCartTable1582551346241'),
(169, 1582806345058, 'AddLastLoginInDeliveryPerson1582806345058'),
(170, 1582888041707, 'AlterColumnInProductPriceLog1582888041707'),
(171, 1582898256691, 'AddColumnInOrderProduct1582898256691'),
(173, 1583905968298, 'AlterColumnInProductPriceLogTable1583905968298'),
(174, 1584004496240, 'AddColumnInOrderTable1584004496240'),
(175, 1584011252176, 'AddColumnInOrderProductTable1584011252176'),
(176, 1584083106363, 'CreatePermissionModuleGroup1584083106363'),
(177, 1584083115669, 'CreatePermissionModule1584083115669'),
(178, 1584098038843, 'AddColumnInRoleAndUser1584098038843'),
(179, 1584619773432, 'CreateTableProductQuestionTable1584619773432'),
(180, 1584619809783, 'CreateTableProductAnswerTable1584619809783'),
(181, 1585290132090, 'AddColumnInProductAnswer1585290132090'),
(182, 1585290188288, 'CreateProductAnswerLikeAndDislike1585290188288'),
(183, 1585563990633, 'AddColumnInAnswerTable1585563990633'),
(185, 1586159957544, 'AddPaymentProcessInOrder1586159957544'),
(186, 1586945695954, 'AddContraintInBlogRelated1586945695954'),
(187, 1587374669032, 'CreateReportReason1587374669032'),
(188, 1587374782552, 'CreateReportAbuseTable1587374782552'),
(190, 1586347085190, 'AddColumnInProductTable1586347085190'),
(191, 1587555771172, 'AddColumnInVendorProduct1587555771172'),
(192, 1587702922576, 'AlterTableNameCoupon1587702922576'),
(197, 1588072269668, 'CreateOrderCancelReason1588072269668'),
(198, 1588072397466, 'AddColumnInOrderProduct1588072397466'),
(199, 1588751152380, 'CreatePaymentArchive1588751152380'),
(200, 1588751245983, 'CreatePaymentItemArchive1588751245983'),
(203, 1589003105075, 'CreateProductTirePrices1589003105075'),
(204, 1589003393774, 'AddColumnInProductTable1589003393774'),
(205, 1589193302717, 'CreateStockLogtable1589193302717'),
(206, 1589193432006, 'CreateProductStockAlertTable1589193432006'),
(207, 1589623032875, 'AddColumnInOrderTable1589623032875'),
(208, 1589891907380, 'AddConstraintInProductViewLog1589891907380'),
(211, 1590588151010, 'AddColumnInCustomerCart1590588151010'),
(215, 1594112639974, 'AddColumnInProduct1594112639974'),
(216, 1597918254147, 'AddColumnInProduct1597918254147'),
(217, 1597042164207, 'AddColumnInSettingsTable1597042164207'),
(218, 1597908778448, 'AddColumnInSettingTable1597908778448'),
(219, 1600520069506, 'AddColumnInCustomerCart1600520069506'),
(224, 1601702954997, 'CreateSkuTable1601702954997'),
(228, 1601872052590, 'AddColumnForSkuIdInProduct1601872052590'),
(231, 1602398285818, 'CreatePageGroupTable1602398285818'),
(232, 1602405483061, 'CreateContraintForPageGroup1602405483061'),
(233, 1603105123172, 'AddSkuColumn1603105123172'),
(234, 1603107735535, 'AddColumnInProduct1603107735535'),
(235, 1603687495819, 'AddColumnInOrderProduct1603687495819'),
(236, 1603690775002, 'AddColumnInSkuTable1603690775002'),
(237, 1603705858963, 'AddColumnInOrderProduct1603705858963'),
(238, 1603707976533, 'AddColumnInProductStockAlert1603707976533'),
(239, 1603708000934, 'AddColumnStockLog1603708000934'),
(240, 1603710224439, 'AddColumnInCustomerCart1603710224439'),
(244, 1605506261235, 'AddColumnInOrderTable1605506261235'),
(245, 1605507026632, 'AddColumnInProductTable1605507026632'),
(246, 1605683473618, 'AddColumnInPageTable1605683473618'),
(248, 1606204705980, 'AlterColumnInPageGroup1606204705980'),
(249, 1606228347336, 'CreatePageGroupTable1606228347336'),
(250, 1601270366765, 'CreateWidgetTable1601270366765'),
(251, 1601270946009, 'CreateWidgetItemTable1601270946009'),
(260, 1620823474374, 'CreateAuditLogTable1620823474374'),
(261, 1620828858835, 'AddColumnInAuditLog1620828858835'),
(262, 1620978737265, 'AddColumnInCustomerTable1620978737265'),
(263, 1620989353652, 'CreateTableLoginAttempts1620989353652'),
(265, 1620989942663, 'AddColumnInCustomerTable1620989942663'),
(266, 1621056856672, 'AddColumnInLoginAttempts1621056856672'),
(267, 1621952242474, 'AlterBannerTable1621952242474'),
(270, 1627038065607, 'AddColumnInOrderProduct1627038065607'),
(271, 1630672892057, 'AlterCouponTable1630672892057'),
(272, 1630918993171, 'AddColumnInProduct1630918993171'),
(273, 1631700202332, 'CreateProductVideo1631700202332'),
(274, 1641188700351, 'CreatePluginMenus1641188700351'),
(275, 1642745785011, 'AddColumnInCategory1642745785011'),
(276, 1643700945763, 'AddingColumnsInOrderStatus1643700945763'),
(277, 1644045460638, 'AddColumnInAccessToken1644045460638'),
(278, 1644063579528, 'AddColumnInUser1644063579528'),
(279, 1644390622396, 'AddingColumnInCustomer1644390622396'),
(280, 1647401862825, 'AddWidgetMenu1647401862825'),
(281, 1647402175581, 'AddWidgetPermission1647402175581'),
(282, 1648191952576, 'AddOwnerColumnInProduct1648191952576'),
(283, 1648193000936, 'AddCommonColumnInProduct1648193000936'),
(284, 1650361956965, 'AlterColumnKeywordInProductTable1650361956965'),
(285, 1654338253531, 'AddingColumnInProductTable1654338253531'),
(286, 1655465438730, 'AddColumnInOrderStatus1655465438730'),
(287, 1656753952109, 'AlterColumnPaymentInformationInPaymentArchiveTable1656753952109'),
(288, 1657012239912, 'AlterColumnsInSkuTable1657012239912'),
(289, 1657012922452, 'AlterColumnInProductTable1657012922452'),
(290, 1665135644842, 'AddWidgetPlugin1665135644842'),
(291, 1666936841928, 'AddPluginColumns1666936841928'),
(292, 1566206489111, 'CreateIndexProductRelatedTable1566206489111'),
(294, 1581679252934, 'AddServiceChargesColumnInProduct1581679252934');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `shipping_zone_id` int(11) DEFAULT NULL,
  `payment_zone_id` int(11) DEFAULT NULL,
  `shipping_country_id` int(11) DEFAULT NULL,
  `payment_country_id` int(11) DEFAULT NULL,
  `invoice_no` varchar(45) DEFAULT NULL,
  `invoice_prefix` varchar(26) DEFAULT NULL,
  `order_prefix_id` varchar(255) DEFAULT NULL,
  `firstname` varchar(32) DEFAULT NULL,
  `lastname` varchar(32) DEFAULT NULL,
  `email` varchar(96) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `fax` varchar(32) DEFAULT NULL,
  `shipping_firstname` varchar(32) DEFAULT NULL,
  `shipping_lastname` varchar(32) DEFAULT NULL,
  `shipping_company` varchar(32) DEFAULT NULL,
  `shipping_address_1` varchar(128) DEFAULT NULL,
  `shipping_address_2` varchar(128) DEFAULT NULL,
  `shipping_city` varchar(128) DEFAULT NULL,
  `shipping_postcode` varchar(10) DEFAULT NULL,
  `shipping_country` varchar(128) DEFAULT NULL,
  `shipping_zone` varchar(128) DEFAULT NULL,
  `shipping_address_format` text,
  `shipping_method` varchar(128) DEFAULT NULL,
  `payment_firstname` varchar(32) DEFAULT NULL,
  `payment_lastname` varchar(32) DEFAULT NULL,
  `payment_company` varchar(32) DEFAULT NULL,
  `payment_address_1` varchar(128) DEFAULT NULL,
  `payment_address_2` varchar(128) DEFAULT NULL,
  `payment_city` varchar(128) DEFAULT NULL,
  `payment_postcode` varchar(10) DEFAULT NULL,
  `payment_country` varchar(128) DEFAULT NULL,
  `payment_zone` varchar(128) DEFAULT NULL,
  `payment_address_format` text,
  `payment_method` varchar(128) DEFAULT NULL,
  `comment` text,
  `total` decimal(10,2) DEFAULT NULL,
  `reward` int(11) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `affiliate_id` int(11) DEFAULT NULL,
  `commision` decimal(10,0) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `currency_value` decimal(11,0) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `payment_flag` int(11) DEFAULT NULL,
  `order_name` varchar(32) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `currency_symbol_left` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_symbol_right` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_url` varchar(255) DEFAULT NULL,
  `tracking_no` varchar(255) DEFAULT NULL,
  `payment_status` int(11) DEFAULT '0',
  `payment_type` varchar(45) DEFAULT NULL,
  `payment_details` varchar(255) DEFAULT NULL,
  `coupon_code` varchar(45) DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_process` int(11) DEFAULT '1',
  `back_orders` int(11) DEFAULT '0',
  `customer_gst_no` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_cancel_reason`
--

CREATE TABLE `order_cancel_reason` (
  `id` int(11) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_cancel_reason`
--

INSERT INTO `order_cancel_reason` (`id`, `reason`, `is_active`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'wrongly ordered', 1, NULL, '2020-04-29 10:21:25', NULL, '2020-04-29 10:21:25'),
(2, 'found better than this product', 1, NULL, '2020-04-29 10:21:25', NULL, '2020-04-29 10:21:25'),
(3, 'not in need', 1, NULL, '2020-04-29 10:22:09', NULL, '2020-04-29 10:22:09');

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `order_history_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `notify` tinytext,
  `comment` text,
  `date_added` datetime DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_log`
--

CREATE TABLE `order_log` (
  `order_log_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `shipping_zone_id` int(11) DEFAULT NULL,
  `payment_zone_id` int(11) DEFAULT NULL,
  `shipping_country_id` int(11) DEFAULT NULL,
  `payment_country_id` int(11) DEFAULT NULL,
  `invoice_no` varchar(45) DEFAULT NULL,
  `invoice_prefix` varchar(26) DEFAULT NULL,
  `order_prefix_id` varchar(255) DEFAULT NULL,
  `firstname` varchar(32) DEFAULT NULL,
  `lastname` varchar(32) DEFAULT NULL,
  `email` varchar(96) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `fax` varchar(32) DEFAULT NULL,
  `shipping_firstname` varchar(32) DEFAULT NULL,
  `shipping_lastname` varchar(32) DEFAULT NULL,
  `shipping_company` varchar(32) DEFAULT NULL,
  `shipping_address_1` varchar(128) DEFAULT NULL,
  `shipping_address_2` varchar(128) DEFAULT NULL,
  `shipping_city` varchar(128) DEFAULT NULL,
  `shipping_postcode` varchar(10) DEFAULT NULL,
  `shipping_country` varchar(128) DEFAULT NULL,
  `shipping_zone` varchar(128) DEFAULT NULL,
  `shipping_address_format` text,
  `shipping_method` varchar(128) DEFAULT NULL,
  `payment_firstname` varchar(32) DEFAULT NULL,
  `payment_lastname` varchar(32) DEFAULT NULL,
  `payment_company` varchar(32) DEFAULT NULL,
  `payment_address_1` varchar(128) DEFAULT NULL,
  `payment_address_2` varchar(128) DEFAULT NULL,
  `payment_city` varchar(128) DEFAULT NULL,
  `payment_postcode` varchar(10) DEFAULT NULL,
  `payment_country` varchar(128) DEFAULT NULL,
  `payment_zone` varchar(128) DEFAULT NULL,
  `payment_address_format` text,
  `payment_method` varchar(128) DEFAULT NULL,
  `comment` text,
  `total` decimal(15,2) DEFAULT NULL,
  `reward` int(11) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `affiliate_id` int(11) DEFAULT NULL,
  `commision` decimal(10,0) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `currency_value` decimal(11,0) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `payment_flag` int(11) DEFAULT NULL,
  `order_name` varchar(32) DEFAULT NULL,
  `is_active` varchar(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_option`
--

CREATE TABLE `order_option` (
  `order_option_id` int(11) NOT NULL,
  `product_option_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `order_product_id` int(11) DEFAULT NULL,
  `product_option_value_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `order_product_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `product_price` decimal(15,2) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `trace` decimal(15,4) DEFAULT NULL,
  `total` decimal(15,2) DEFAULT NULL,
  `tax` decimal(15,4) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `tracking_url` varchar(255) DEFAULT NULL,
  `tracking_no` varchar(255) DEFAULT NULL,
  `order_product_prefix_id` varchar(255) DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `tax_type` int(11) DEFAULT NULL,
  `tax_value` int(11) DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT '0.00',
  `discounted_amount` decimal(10,2) DEFAULT NULL,
  `cancel_request` int(11) DEFAULT '0',
  `cancel_request_status` int(11) DEFAULT '0',
  `cancel_reason` text,
  `cancel_reason_description` text,
  `varient_name` varchar(255) DEFAULT NULL,
  `product_varient_option_id` int(11) DEFAULT NULL,
  `sku_name` varchar(255) DEFAULT NULL,
  `coupon_discount_amount` decimal(16,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_product_log`
--

CREATE TABLE `order_product_log` (
  `order_product_log_id` int(11) NOT NULL,
  `order_product_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `product_price` decimal(15,2) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `trace` decimal(15,4) DEFAULT NULL,
  `total` decimal(15,4) NOT NULL,
  `tax` decimal(15,4) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `tracking_url` varchar(255) DEFAULT NULL,
  `tracking_no` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `color_code` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `is_admin` int(11) NOT NULL DEFAULT '1',
  `is_buyer` int(11) NOT NULL DEFAULT '1',
  `is_api` int(11) NOT NULL DEFAULT '1',
  `default_status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`order_status_id`, `name`, `color_code`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`, `priority`, `parent_id`, `is_admin`, `is_buyer`, `is_api`, `default_status`) VALUES
(1, 'Order Placed', '#6798e3', 1, NULL, NULL, '2019-02-19 04:04:03', '2021-12-21 16:31:16', 1, 7, 1, 1, 1, 1),
(2, 'Order Accepted', '#25a006', 1, NULL, NULL, '2019-02-19 04:04:21', '2021-12-21 16:31:22', 2, 7, 1, 1, 1, 0),
(3, 'packing in progress', NULL, 1, NULL, NULL, NULL, NULL, 1, 7, 1, 1, 1, 0),
(4, 'Shipped', '#4c7499', 1, NULL, NULL, '2019-07-30 13:25:44', '2021-12-21 16:32:02', 6, 7, 1, 1, 1, 0),
(5, 'Delivered', '#501332', 1, NULL, NULL, '2020-02-22 10:48:03', '2021-12-21 16:32:28', 8, 7, 1, 1, 1, 1),
(7, 'default', NULL, 1, NULL, NULL, NULL, NULL, NULL, 0, 1, 1, 1, 1),
(8, 'Order Cancelled', NULL, 1, NULL, NULL, NULL, NULL, NULL, 7, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_total`
--

CREATE TABLE `order_total` (
  `order_total_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `page_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `intro` text,
  `full_text` text,
  `page_group_id` int(11) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` varchar(255) DEFAULT NULL,
  `meta_tag_keywords` varchar(255) DEFAULT NULL,
  `view_page_count` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `slug_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`page_id`, `title`, `intro`, `full_text`, `page_group_id`, `sort_order`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keywords`, `view_page_count`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`, `slug_name`) VALUES
(3, 'who we are', NULL, '<p><strong>piccocart.com&nbsp;is an Indian e-commerce company based in Chennai, India. Founded by Mr&nbsp;</strong><strong>Suresh Sekar, the company initially focused on software Development, before expanding into other product categories such as consumer electronics, fashion, and lifestyle products.</strong></p>\n', 1, NULL, 'About Us', 'About Us', 'The total cost of ownership for software created in this manner is reduced', NULL, 1, NULL, NULL, '2020-12-03 13:09:59', NULL, 'about-us'),
(9, 'newPages', NULL, '<p>new page created&nbsp;</p>\n', 3, NULL, 'newPages', 'newPages', 'newPages', NULL, 0, NULL, NULL, '2021-05-24 04:39:20', '2021-05-24 05:20:35', 'newpages-1'),
(10, 'About us', NULL, '<p>No.4, First Floor, 4, First Street, Kamaraj Colony, Jothi Nagar, Chitlapakkam, Chennai, Tamil Nadu 600064</p>\n', 3, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:18:05', NULL, 'about-us-1'),
(11, 'Careers', NULL, '<p>www.piccosoft.in/careers</p>\n', 3, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:19:32', NULL, 'careers'),
(14, 'Spurtcommerce  Wholesale', NULL, '<p>Spurtcommerce &nbsp;Wholesale</p>\n', 3, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:23:10', NULL, 'spurtcommerce-wholesale'),
(16, 'Cancellation and Returns', NULL, '<p>Cancellation &amp; Returns</p>\n', 2, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:33:32', NULL, 'cancellation-and-returns'),
(17, 'FAQ', NULL, '<p>FAQ</p>\n', 2, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:35:05', NULL, 'faq'),
(18, 'Report', NULL, '<p>Report</p>\n', 2, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:48:51', NULL, 'report'),
(19, 'Return policy', NULL, '<p>Return policy</p>\n', 1, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:50:19', NULL, 'return-policy'),
(20, 'Terms of use', NULL, '<p>Terms of use</p>\n', 1, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:51:04', '2021-05-24 05:58:57', 'terms-of-use'),
(21, 'Security', NULL, '<p>Security</p>\n', 1, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:51:35', NULL, 'security'),
(22, 'Privacy', NULL, '<p>Privacy</p>\n', 1, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:52:01', NULL, 'privacy'),
(23, 'Sitemap', NULL, '<p>Sitemap</p>\n', 1, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:54:35', '2021-05-24 05:58:47', 'sitemap'),
(24, 'EPR Compliance', NULL, '<p>EPR Compliance</p>\n', 1, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-24 05:55:25', '2021-05-24 05:58:39', 'epr-compliance'),
(27, 'Contact Us', NULL, '<p>Phone Number: 9135672390</p>\n', 3, NULL, '', '', '', NULL, 1, NULL, NULL, '2021-05-27 10:33:40', '2021-05-27 10:35:54', 'contact-us');

-- --------------------------------------------------------

--
-- Table structure for table `page_group`
--

CREATE TABLE `page_group` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page_group`
--

INSERT INTO `page_group` (`group_id`, `group_name`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(1, 'Policy', 1, '2020-12-03 13:03:43', '2021-05-24 05:59:09', NULL, NULL),
(2, 'Help', 1, '2020-12-03 13:03:53', '2021-05-22 13:17:58', NULL, NULL),
(3, 'About', 1, '2020-12-03 13:59:44', '2020-12-03 13:59:44', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `paid_date` datetime DEFAULT NULL,
  `payment_number` varchar(255) DEFAULT NULL,
  `payment_information` text,
  `payment_amount` decimal(10,2) DEFAULT NULL,
  `payment_commission_amount` decimal(10,2) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payment_archive`
--

CREATE TABLE `payment_archive` (
  `payment_archive_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `paid_date` datetime DEFAULT NULL,
  `payment_number` varchar(255) DEFAULT NULL,
  `payment_information` text,
  `payment_amount` decimal(10,2) DEFAULT NULL,
  `payment_commission_amount` decimal(10,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payment_items`
--

CREATE TABLE `payment_items` (
  `payment_item_id` int(11) NOT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `order_product_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_quantity` int(11) DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payment_items_archive`
--

CREATE TABLE `payment_items_archive` (
  `payment_item_archive_id` int(11) NOT NULL,
  `payment_archive_id` int(11) DEFAULT NULL,
  `order_product_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_quantity` int(11) DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `permission_module`
--

CREATE TABLE `permission_module` (
  `module_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug_name` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `module_group_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `permission_module`
--

INSERT INTO `permission_module` (`module_id`, `name`, `slug_name`, `sort_order`, `module_group_id`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'List Order', 'list-order', 1, 1, NULL, '2020-03-13 15:05:21', NULL, '2020-03-13 15:05:21'),
(2, 'Delete Order', 'delete-order', 2, 1, NULL, '2020-03-13 15:05:21', NULL, '2020-03-13 15:05:21'),
(3, 'View Order', 'view-order', 3, 1, NULL, '2020-03-13 15:05:21', NULL, '2020-03-13 15:05:21'),
(4, 'Export Order', 'export-order', 4, 1, NULL, '2020-03-13 15:05:21', NULL, '2020-03-13 15:05:21'),
(5, 'Create Product', 'create-product', 5, 2, NULL, '2020-03-13 15:13:05', NULL, '2020-03-13 15:13:05'),
(6, 'Edit Product', 'edit-product', 6, 2, NULL, '2020-03-13 15:13:05', NULL, '2020-03-13 15:13:05'),
(7, 'View Product', 'view-product', 7, 2, NULL, '2020-03-13 15:13:05', NULL, '2020-03-13 15:13:05'),
(8, 'Delete Product', 'delete-product', 8, 2, NULL, '2020-03-13 15:13:05', NULL, '2020-03-13 15:13:05'),
(9, 'Make Feature', 'make-feature', 9, 2, NULL, '2020-03-13 15:13:05', NULL, '2020-03-13 15:13:05'),
(10, 'Make Today Deal', 'make-today-deal', 10, 2, NULL, '2020-03-13 15:13:05', NULL, '2020-03-13 15:13:05'),
(11, 'Export Product', 'export-product', 11, 2, NULL, '2020-03-13 15:13:05', NULL, '2020-03-13 15:13:05'),
(12, 'Create Category', 'create-category', 12, 3, NULL, '2020-03-13 15:18:00', NULL, '2020-03-13 15:18:00'),
(13, 'Edit Category', 'edit-category', 13, 3, NULL, '2020-03-13 15:18:00', NULL, '2020-03-13 15:18:00'),
(14, 'Delete Category', 'delete-category', 14, 3, NULL, '2020-03-13 15:18:00', NULL, '2020-03-13 15:18:00'),
(19, 'Create Customer', 'create-customer', 19, 6, NULL, '2020-03-13 15:40:56', NULL, '2020-03-13 15:40:56'),
(20, 'Edit Customer', 'edit-customer', 20, 6, NULL, '2020-03-13 15:40:56', NULL, '2020-03-13 15:40:56'),
(21, 'Delete Customer', 'delete-customer', 21, 6, NULL, '2020-03-13 15:40:56', NULL, '2020-03-13 15:40:56'),
(22, 'Export Customer', 'export-customer', 22, 6, NULL, '2020-03-13 15:40:56', NULL, '2020-03-13 15:40:56'),
(23, 'Export All Customer', 'export-all-customer', 23, 6, NULL, '2020-03-13 15:40:56', NULL, '2020-03-13 15:40:56'),
(24, 'View Customer', 'view-customer', 24, 6, NULL, '2020-03-13 15:40:56', NULL, '2020-03-13 15:40:56'),
(25, 'Create Customer Group', 'create-customer-group', 25, 7, NULL, '2020-03-13 15:45:45', NULL, '2020-03-13 15:45:45'),
(26, 'Edit Customer Group', 'edit-customer-group', 26, 7, NULL, '2020-03-13 15:45:45', NULL, '2020-03-13 15:45:45'),
(27, 'Delete Customer Group', 'delete-customer-group', 27, 7, NULL, '2020-03-13 15:45:45', NULL, '2020-03-13 15:45:45'),
(28, 'Create Pages', 'create-pages', 28, 8, NULL, '2020-03-13 15:53:46', NULL, '2020-03-13 15:53:46'),
(29, 'Edit Pages', 'edit-pages', 29, 8, NULL, '2020-03-13 15:53:46', NULL, '2020-03-13 15:53:46'),
(30, 'Delete Pages', 'delete-pages', 30, 8, NULL, '2020-03-13 15:53:46', NULL, '2020-03-13 15:53:46'),
(31, 'Create Banners', 'create-banners', 31, 9, NULL, '2020-03-13 15:57:46', NULL, '2020-03-13 15:57:46'),
(32, 'Edit Banners', 'edit-banners', 32, 9, NULL, '2020-03-13 15:57:46', NULL, '2020-03-13 15:57:46'),
(33, 'Delete Banners', 'delete-banners', 33, 9, NULL, '2020-03-13 15:57:46', NULL, '2020-03-13 15:57:46'),
(46, 'Create Role', 'create-role', 46, 14, NULL, '2020-03-13 16:38:07', NULL, '2020-03-13 16:38:07'),
(47, 'Edit Role', 'edit-role', 47, 14, NULL, '2020-03-13 16:38:07', NULL, '2020-03-13 16:38:07'),
(48, 'Delete Role', 'delete-role', 48, 14, NULL, '2020-03-13 16:38:07', NULL, '2020-03-13 16:38:07'),
(49, 'Create User', 'create-user', 49, 15, NULL, '2020-03-13 16:41:12', NULL, '2020-03-13 16:41:12'),
(50, 'Edit User', 'edit-user', 50, 15, NULL, '2020-03-13 16:41:12', NULL, '2020-03-13 16:41:12'),
(51, 'Delete User', 'delete-user', 51, 15, NULL, '2020-03-13 16:41:12', NULL, '2020-03-13 16:41:12'),
(52, 'Edit General Settings', 'edit-general-settings', 52, 16, NULL, '2020-03-13 16:43:38', NULL, '2020-03-13 16:43:38'),
(53, 'Edit Personalize Product', 'edit-personalize-product', 53, 17, NULL, '2020-03-13 16:46:45', NULL, '2020-03-13 16:46:45'),
(54, 'Edit Personalize Order', 'edit-personalize-order', 54, 17, NULL, '2020-03-13 16:46:45', NULL, '2020-03-13 16:46:45'),
(57, 'List Country', 'list-country', 57, 27, NULL, '2020-03-13 16:55:10', NULL, '2020-03-13 16:55:10'),
(58, 'Create Country', 'create-country', 58, 27, NULL, '2020-03-13 16:55:10', NULL, '2020-03-13 16:55:10'),
(59, 'Edit Country', 'edit-country', 59, 27, NULL, '2020-03-13 16:55:10', NULL, '2020-03-13 16:55:10'),
(60, 'Delete Country', 'delete-country', 60, 27, NULL, '2020-03-13 16:55:10', NULL, '2020-03-13 16:55:10'),
(61, 'List Zone', 'list-zone', 61, 19, NULL, '2020-03-13 16:58:13', NULL, '2020-03-13 16:58:13'),
(62, 'Create Zone', 'create-zone', 62, 19, NULL, '2020-03-13 16:58:13', NULL, '2020-03-13 16:58:13'),
(63, 'Edit Zone', 'edit-zone', 63, 19, NULL, '2020-03-13 16:58:13', NULL, '2020-03-13 16:58:13'),
(64, 'Delete Zone', 'delete-zone', 64, 19, NULL, '2020-03-13 16:58:13', NULL, '2020-03-13 16:58:13'),
(65, 'List Language', 'list-language', 65, 28, NULL, '2020-03-13 16:59:35', NULL, '2020-03-13 16:59:35'),
(66, 'Create Language', 'create-language', 66, 28, NULL, '2020-03-13 16:59:35', NULL, '2020-03-13 16:59:35'),
(67, 'Edit Language', 'edit-language', 67, 28, NULL, '2020-03-13 16:59:35', NULL, '2020-03-13 16:59:35'),
(68, 'Delete Language', 'delete-language', 68, 28, NULL, '2020-03-13 16:59:35', NULL, '2020-03-13 16:59:35'),
(69, 'List Currency', 'list-currency', 69, 25, NULL, '2020-03-13 17:01:22', NULL, '2020-03-13 17:01:22'),
(70, 'Create Currency', 'create-currency', 70, 25, NULL, '2020-03-13 17:01:22', NULL, '2020-03-13 17:01:22'),
(71, 'Edit Currency', 'edit-currency', 71, 25, NULL, '2020-03-13 17:01:22', NULL, '2020-03-13 17:01:22'),
(72, 'Delete Currency', 'delete-currency', 72, 25, NULL, '2020-03-13 17:01:22', NULL, '2020-03-13 17:01:22'),
(73, 'List Tax', 'list-tax', 73, 26, NULL, '2020-03-13 17:03:17', NULL, '2020-03-13 17:03:17'),
(74, 'Create Tax', 'create-tax', 74, 26, NULL, '2020-03-13 17:03:17', NULL, '2020-03-13 17:03:17'),
(75, 'Edit Tax', 'edit-tax', 75, 26, NULL, '2020-03-13 17:03:17', NULL, '2020-03-13 17:03:17'),
(76, 'Delete Tax', 'delete-tax', 76, 26, NULL, '2020-03-13 17:03:17', NULL, '2020-03-13 17:03:17'),
(77, 'List Order Status', 'list-order-status', 77, 29, NULL, '2020-03-13 17:05:43', NULL, '2020-03-13 17:05:43'),
(78, 'Create Order Status', 'create-order-status', 78, 29, NULL, '2020-03-13 17:05:43', NULL, '2020-03-13 17:05:43'),
(79, 'Edit Order Status', 'edit-order-status', 79, 29, NULL, '2020-03-13 17:05:43', NULL, '2020-03-13 17:05:43'),
(80, 'Delete Order Status', 'delete-order-status', 80, 29, NULL, '2020-03-13 17:05:43', NULL, '2020-03-13 17:05:43'),
(85, 'List Email Template', 'list-email-template', 85, 31, NULL, '2020-03-13 17:09:12', NULL, '2020-03-13 17:09:12'),
(86, 'Edit Email Template', 'edit-email-template', 86, 31, NULL, '2020-03-13 17:09:12', NULL, '2020-03-13 17:09:12'),
(87, 'Delete Email Template', 'delete-email-template', 87, 31, NULL, '2020-03-13 17:09:12', NULL, '2020-03-13 17:09:12'),
(107, 'List Product', 'list-product', 107, 2, NULL, '2020-03-18 17:33:05', NULL, '2020-03-18 17:33:05'),
(108, 'List Category', 'list-category', 108, 3, NULL, '2020-03-18 17:35:06', NULL, '2020-03-18 17:35:06'),
(111, 'List Customer', 'list-customer', 111, 6, NULL, '2020-03-18 17:42:40', NULL, '2020-03-18 17:42:40'),
(112, 'List Customer Group', 'list-customer-group', 112, 7, NULL, '2020-03-18 17:43:55', NULL, '2020-03-18 17:43:55'),
(113, 'List Pages', 'list-pages', 113, 8, NULL, '2020-03-18 17:45:01', NULL, '2020-03-18 17:45:01'),
(114, 'List Banners', 'list-banners', 114, 9, NULL, '2020-03-18 17:46:10', NULL, '2020-03-18 17:46:10'),
(117, 'List Role', 'list-role', 117, 14, NULL, '2020-03-18 17:50:24', NULL, '2020-03-18 17:50:24'),
(118, 'List User', 'list-user', 118, 15, NULL, '2020-03-18 17:51:27', NULL, '2020-03-18 17:51:27'),
(121, 'Update Order Status', 'update-order-status', 5, 1, NULL, '2020-03-19 11:04:25', NULL, '2020-03-19 11:04:25'),
(122, 'List Sales Payments', 'list-sales-payments', 122, 32, NULL, '2020-03-19 14:58:57', NULL, '2020-03-19 14:58:57'),
(123, 'Export All Sales Payments', 'export-all-sales-payments', 123, 32, NULL, '2020-03-19 15:01:01', NULL, '2020-03-19 15:01:01'),
(137, 'Add Widget', 'add-widget', 208, 36, NULL, '2022-11-06 13:07:28', NULL, '2022-11-06 13:07:28'),
(138, 'Edit Widget', 'edit-widget', 209, 36, NULL, '2022-11-06 13:07:28', NULL, '2022-11-06 13:07:28'),
(139, 'Widget list', 'widget-list', 300, 36, NULL, '2022-11-06 13:07:28', NULL, '2022-11-06 13:07:28'),
(140, 'Widget Delete', 'widget-delete', 301, 36, NULL, '2022-11-06 13:07:28', NULL, '2022-11-06 13:07:28');

-- --------------------------------------------------------

--
-- Table structure for table `permission_module_group`
--

CREATE TABLE `permission_module_group` (
  `module_group_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug_name` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `permission_module_group`
--

INSERT INTO `permission_module_group` (`module_group_id`, `name`, `slug_name`, `sort_order`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'Order', 'order', 1, NULL, '2020-03-13 14:27:44', NULL, '2020-03-13 14:27:44'),
(2, 'Product', 'product', 2, NULL, '2020-03-13 14:27:44', NULL, '2020-03-13 14:27:44'),
(3, 'Categories', 'categories', 3, NULL, '2020-03-13 14:27:44', NULL, '2020-03-13 14:27:44'),
(6, 'Customer', 'customer', 6, NULL, '2020-03-13 14:27:44', NULL, '2020-03-13 14:27:44'),
(7, 'Customer Group', 'customer-group', 7, NULL, '2020-03-13 14:27:44', NULL, '2020-03-13 14:27:44'),
(8, 'Pages', 'pages', 8, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(9, 'Banners', 'banners', 9, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(14, 'Setting Role', 'setting-role', 14, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(15, 'Setting Users', 'setting-users', 15, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(16, 'Setting General Settings', 'setting-general-settings', 16, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(17, 'Setting Personalize', 'setting-personalize', 17, NULL, '2020-03-13 14:46:15', NULL, '2020-03-13 14:46:15'),
(19, 'Setting Zone', 'setting-zone', 19, NULL, '2020-03-13 14:46:15', NULL, '2020-03-13 14:46:15'),
(25, 'Setting Currency', 'setting-currency', 25, NULL, '2020-03-16 16:23:09', NULL, '2020-03-16 16:23:09'),
(26, 'Settings Tax', 'settings-tax', 26, NULL, '2020-03-16 16:23:09', NULL, '2020-03-16 16:23:09'),
(27, 'Settings Country', 'settings-country', 27, NULL, '2020-03-16 16:30:25', NULL, '2020-03-16 16:30:25'),
(28, 'Settings Language', 'settings-language', 28, NULL, '2020-03-16 16:30:25', NULL, '2020-03-16 16:30:25'),
(29, 'Settings Order Status', 'settings-order-status', 29, NULL, '2020-03-16 16:36:38', NULL, '2020-03-16 16:36:38'),
(31, 'Settings Email Template', 'settings-email-template', 31, NULL, '2020-03-16 16:38:10', NULL, '2020-03-16 16:38:10'),
(32, 'Payments', 'payments', 32, NULL, '2020-03-19 14:53:40', NULL, '2020-03-19 14:53:40'),
(36, 'Widgets', 'widgets', 63, NULL, '2022-11-06 13:07:28', NULL, '2022-11-06 13:07:28');

-- --------------------------------------------------------

--
-- Table structure for table `plugins`
--

CREATE TABLE `plugins` (
  `id` int(11) NOT NULL,
  `plugin_name` varchar(60) DEFAULT NULL,
  `plugin_avatar` varchar(255) DEFAULT NULL,
  `plugin_avatar_path` varchar(255) DEFAULT NULL,
  `plugin_type` varchar(60) DEFAULT NULL,
  `plugin_additional_info` text,
  `plugin_status` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `plugin_form_info` text,
  `slug_name` varchar(255) DEFAULT NULL,
  `is_editable` int(11) DEFAULT NULL,
  `routes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `plugins`
--

INSERT INTO `plugins` (`id`, `plugin_name`, `plugin_avatar`, `plugin_avatar_path`, `plugin_type`, `plugin_additional_info`, `plugin_status`, `created_date`, `created_by`, `modified_date`, `modified_by`, `plugin_form_info`, `slug_name`, `is_editable`, `routes`) VALUES
(2, 'CashOnDelivery', 'Img_1564659191615.jpeg', 'logo/', 'payment', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ''),
(7, 'Widget', '', '', 'CMS', NULL, 1, '2022-11-06 13:46:33', NULL, NULL, NULL, NULL, 'widget', 0, '~/api/widget~,~/api/widget/~,~/api/widget/widget-count~,~/api/widget/widget-detail~,~/api/widget/productlist~,~/api/list/widget-list~,~/api/list/widget-detail/~');

-- --------------------------------------------------------

--
-- Table structure for table `plugin_menu`
--

CREATE TABLE `plugin_menu` (
  `id` int(11) NOT NULL,
  `menu_name` varchar(255) NOT NULL,
  `menu_module` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `plugin_menu`
--

INSERT INTO `plugin_menu` (`id`, `menu_name`, `menu_module`, `path`, `icon`, `parent_id`, `status`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(1, 'widgets', 'CMS', '#/cms/widgets', 'banner-ico-on.svg', 0, 1, '2022-11-06 13:07:28', '2022-11-06 13:07:28', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `sku` varchar(64) DEFAULT NULL,
  `upc` varchar(12) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` text,
  `manufacturer_id` int(11) DEFAULT NULL,
  `shipping` tinyint(4) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `date_available` date DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `amount` float DEFAULT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` varchar(255) DEFAULT NULL,
  `meta_tag_keyword` varchar(255) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `subtract_stock` int(11) DEFAULT NULL COMMENT '0->no 1->yes',
  `minimum_quantity` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `wishlist_status` int(11) DEFAULT NULL,
  `delete_flag` int(11) NOT NULL DEFAULT '0',
  `is_featured` int(11) DEFAULT NULL,
  `rating` decimal(10,2) DEFAULT NULL,
  `condition` int(11) DEFAULT NULL COMMENT '1->new 2->used',
  `today_deals` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `keywords` text,
  `product_slug` varchar(255) DEFAULT NULL,
  `service_charges` varchar(255) DEFAULT NULL,
  `tax_type` int(11) DEFAULT NULL,
  `tax_value` int(11) DEFAULT NULL,
  `order_product_prefix_id` int(11) DEFAULT NULL,
  `height` decimal(15,2) DEFAULT NULL,
  `weight` decimal(15,2) DEFAULT NULL,
  `length` decimal(15,2) DEFAULT NULL,
  `width` decimal(15,2) DEFAULT NULL,
  `has_stock` int(11) DEFAULT '1',
  `has_tire_price` int(11) DEFAULT '0',
  `out_of_stock_threshold` int(11) DEFAULT NULL,
  `notify_min_quantity_below` int(11) DEFAULT NULL,
  `min_quantity_allowed_cart` int(11) DEFAULT NULL,
  `max_quantity_allowed_cart` int(11) DEFAULT NULL,
  `enable_back_orders` int(11) DEFAULT NULL,
  `pincode_based_delivery` int(11) DEFAULT '0',
  `sku_id` int(11) DEFAULT NULL,
  `is_simplified` int(11) DEFAULT NULL,
  `hsn` varchar(255) DEFAULT NULL,
  `attribute_keyword` text,
  `quotation_available` int(11) NOT NULL DEFAULT '0',
  `owner` int(11) DEFAULT '0',
  `is_common` int(11) DEFAULT '0',
  `setted_as_common_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `sku`, `upc`, `quantity`, `image`, `image_path`, `manufacturer_id`, `shipping`, `price`, `date_available`, `sort_order`, `name`, `description`, `amount`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keyword`, `discount`, `subtract_stock`, `minimum_quantity`, `location`, `wishlist_status`, `delete_flag`, `is_featured`, `rating`, `condition`, `today_deals`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`, `keywords`, `product_slug`, `service_charges`, `tax_type`, `tax_value`, `order_product_prefix_id`, `height`, `weight`, `length`, `width`, `has_stock`, `has_tire_price`, `out_of_stock_threshold`, `notify_min_quantity_below`, `min_quantity_allowed_cart`, `max_quantity_allowed_cart`, `enable_back_orders`, `pincode_based_delivery`, `sku_id`, `is_simplified`, `hsn`, `attribute_keyword`, `quotation_available`, `owner`, `is_common`, `setted_as_common_on`) VALUES
(538, 'DRM9900U6', '110092238393', 150, NULL, NULL, 81, 1, '5889.00', '2019-06-19', 1, 'Musical Mart MMBG-L-03Two PieceBongo Drum(Brown)', '<h1>Musical Mart MMBG-L-03Two PieceBongo Drum(Brown)</h1>\n\n<ul>\n	<li>A percussion instrument</li>\n	<li>Body Material: Basswood</li>\n	<li>Size: 11inch</li>\n</ul>\n', NULL, 'Musical Mart MMBG-L-03Two PieceBongo Drum(Brown)', NULL, NULL, NULL, 1, 10, 'India', 0, 0, 1, NULL, 1, 0, 1, 49, NULL, '2019-06-19 05:49:51', '2020-12-02 17:17:18', NULL, 'musical-mart-mmbg-l-03two-piecebongo-drumbrown', '{\"productCost\":5000,\"packingCost\":800,\"shippingCost\":89,\"tax\":0,\"others\":0}', 2, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 1, 1, NULL, NULL, 0, 1, 0, NULL),
(540, 'ASS88901Gy', '121099090649', 100, NULL, NULL, 81, 1, '89900.00', '2019-06-19', 1, 'Grand Piano', '<p>Grand Piano is amazing Piano with realistic effects. You will love to Play this Piano again and again.<br />\n<br />\nFeatures<br />\n-Very Easy to Learn and Play like a Real Piano.<br />\n-You can record and save your recordings.<br />\n-You have access to C3 &amp; C4 Octaves in the Free Version.<br />\n-You can navigate to different parts of the Piano by dragging the keys.<br />\n-You Can Upgrade to Full Version to Unlock all the Octaves.<br />\n-Fully Tested on All Android Phones,Fire Phone &amp; Kindle Fire Tablets (All).</p>\n', NULL, 'Grand Piano', NULL, NULL, NULL, 1, 10, 'India', 0, 0, 0, NULL, 1, 0, 1, 49, NULL, '2019-06-19 06:01:40', '2020-12-02 17:17:18', NULL, 'grand-piano', '{\"productCost\":89000,\"packingCost\":900,\"shippingCost\":0,\"tax\":0,\"others\":0}', 2, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 2, 1, NULL, NULL, 0, 1, 0, NULL),
(541, 'AWE00UI6', '121987983748', 100, NULL, NULL, 81, 1, '24000.00', '2019-06-19', 1, 'AMBITION Professional Black Drum Kit - 9 Pcs', '<h1>AMBITION Professional Black Drum Kit - 9 Pcs</h1>\n\n<ul>\n	<li>Good quality body with fantastic finishing &amp; hard gear-chain based pedal, solid long lasting global quality stands with white/milky skins fully professional</li>\n	<li>Very good looking, attractive, glossy or metallic</li>\n	<li>adjustable for beginners</li>\n	<li>Double/more coating good quality Plywooden body.</li>\n	<li>various attarctive colous &amp; Handy by cover bags</li>\n	<li>\n	<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n		<tbody>\n			<tr>\n				<td>Brand</td>\n				<td>AMBITION</td>\n			</tr>\n			<tr>\n				<td>Model</td>\n				<td>AD-Professional-9pcs Drumset-Black</td>\n			</tr>\n			<tr>\n				<td>Item model number</td>\n				<td>AD-Professional-9pcs Drumset-Black</td>\n			</tr>\n			<tr>\n				<td>Batteries Included</td>\n				<td>No</td>\n			</tr>\n			<tr>\n				<td>Batteries Required</td>\n				<td>No</td>\n			</tr>\n		</tbody>\n	</table>\n	</li>\n</ul>\n', NULL, 'AMBITION Professional Black Drum Kit - 9 Pcs', NULL, NULL, NULL, 1, 10, 'India', 0, 0, 0, NULL, 1, 0, 1, 49, NULL, '2019-06-19 06:15:12', '2020-12-02 17:17:18', NULL, 'ambition-professional-black-drum-kit--9-pcs', '{\"productCost\":24000,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}', 2, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 3, 1, NULL, NULL, 0, 1, 0, NULL),
(542, 'BB002013', '10822710021', 100, NULL, NULL, 70, 1, '360.00', '2019-06-19', 1, 'DZert Soft Plush Fabric Multicolour Micky Printed School Bag for Baby Boys and Girls', '<ul>\n	<li>Non-toxic and soft fabric good quality and washable</li>\n	<li>Soft and cuddly filling printed work</li>\n	<li>Soft toy school bag for kids, travelling bag, carry bag, picnic bag, teddy bag</li>\n	<li>Very attractive to make you have a good feeling all the time, gift this soft, smooth and cuddly teddy as a great gift to your loved one</li>\n	<li>Colour: Multicolour</li>\n</ul>\n', NULL, 'DZert Soft Plush Fabric Multicolour Micky Printed School Bag for Baby Boys and Girls', NULL, NULL, 230, 1, 10, 'India', 0, 0, 1, NULL, 1, 0, 1, 49, NULL, '2019-06-19 06:16:09', '2020-12-02 17:17:19', NULL, 'dzert-soft-plush-fabric-multicolour-micky-printed-school-bag-for-baby-boys-and-girls', '{\"productCost\":360,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}', 2, 2, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 4, 1, NULL, NULL, 0, 1, 0, NULL),
(547, 'WL002017', '12009387111', 100, NULL, NULL, 81, 1, '850.00', '2019-06-19', 1, 'Gojeeva Uplight Wall Lamp#JustHere', '<ul>\n	<li>Proffered by Gojeeva, this white and golden colored sconce wall lamp can easily be used to lighten up your favorite room. Crafted from high quality aluminum, glass and brass material, this wall lamp is long lasting and energy efficient. This wall lamp produces the same amount of light as normal ones and features a look that is similar to traditional incandescent lights, but it also has a lightweight design and is more energy efficient. Use your choice of wall lamps to design a well lit residential or commercial space. Furthermore, it is available at a very low price. Additionally, this wall lamp comes with one cable connector and two screws.</li>\n</ul>\n', NULL, 'Gojeeva Uplight Wall Lamp#JustHere', NULL, NULL, NULL, 1, 10, 'India', 0, 0, 0, NULL, 1, 0, 1, 49, NULL, '2019-06-19 08:13:25', '2020-12-02 17:17:19', NULL, 'gojeeva-uplight-wall-lampjusthere', '{\"productCost\":850,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}', 2, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 5, 1, NULL, NULL, 0, 1, 0, NULL),
(550, 'EH002021', '19899922244', 100, NULL, NULL, 70, 1, '2100.00', '2019-06-20', 1, 'KRISONS 2.1 Nexon 2.1 Home Cinema  (BLUETOOTH)', '<ul>\n	<li>Home Cinema System</li>\n	<li>2 Speakers</li>\n	<li>1 Subwoofers</li>\n	<li>MP3</li>\n</ul>\n', NULL, 'KRISONS 2.1 Nexon 2.1 Home Cinema  (BLUETOOTH)', NULL, NULL, 1870, 1, 10, '', 0, 0, 0, NULL, 1, 0, 1, 49, NULL, '2019-06-20 01:43:55', '2020-12-02 17:17:28', '~ELECTRONICS~,~TVs & Speaker~,~Home Theaters~,~KRISONS 2.1 Nexon 2.1 Home Cinema  (BLUETOOTH)~', 'krisons-21-nexon-21-home-cinema-bluetooth', '{\"productCost\":2100,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}', 2, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 6, 1, NULL, NULL, 0, 1, 0, NULL),
(552, 'ET002023', '', 100, NULL, NULL, 70, 1, '14000.00', '2019-06-20', 1, 'Mi LED TV 4C PRO 80 cm (32) HD Ready Android TV (Black)', '<ul>\n	<li>Resolution : HD Ready (1366x768p) | Refresh Rate: 60 hertz</li>\n	<li>Connectivity: 3 HDMI ports to connect set top box, Blu Ray players, gaming console, 2 USB ports to connect hard drives and other USB devices</li>\n	<li>Sound: 20 W output | DTS-HD sound</li>\n	<li>Smart TV features : | PatchWall with Android TV and Set-Top Box Integration | Chromecast built-in | 700,000+ hrs of Content | Mi Remote with Google voice search | Content across 15 languages | Play Store, YouTube, Play Movies, Play Music | Hotstar, Voot, Sony LIV, Hungama, Zee5, Eros Now, Alt Balaji, Sun NXT, Hooq, TVF, Epic ON, Flickstree| Prime Video coming soon | Mi Remote controls TV, set-top box and smart home devices eg. Mi Air Purifier</li>\n	<li>Warranty Information: 1 year warranty on product and 1 year extra on Panel</li>\n	<li>For any Warranty related issues/clarifications, please directly call Xiaomi support on 18001036286 and provide product&#39;s model name as well as seller&#39;s details mentioned on the invoice</li>\n	<li>Easy returns: This product is eligible for replacement/refund within 10 days of delivery in case of any product defects, damage or features not matching the description provided</li>\n	<li>Additional Information : 14+ Content Partners ( Amazon Prime Video Coming soon)</li>\n</ul>\n', NULL, 'Mi LED TV 4C PRO 80 cm (32) HD Ready Android TV (Black)', NULL, NULL, 12200, 1, 10, 'India', 0, 0, 0, NULL, 1, 0, 1, 49, NULL, '2019-06-20 02:01:17', '2020-12-02 17:17:28', '~ELECTRONICS~,~TVs & Speaker~,~Television~,~Mi LED TV 4C PRO 80 cm (32) HD Ready Android TV (Black)~', 'mi-led-tv-4c-pro-80-cm-32-hd-ready-android-tv-black', '{\"productCost\":14000,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}', 2, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 7, 1, NULL, NULL, 0, 1, 0, NULL),
(554, 'MC002031', '176665558921', 100, NULL, NULL, 94, 1, '760.00', '2019-06-20', 1, 'Men Cargos', '<ul>\n	<li>Care Instructions: Hand wash cold water, dry naturally, do not iron imprint directly, do not bleach.</li>\n	<li>Fit Type: Regular Fit</li>\n	<li>Material: 100% cotton</li>\n	<li>Fit type: regular fit</li>\n	<li>Care instructions: hand wash cold water, dry naturally, do not iron imprint directly, do not bleach</li>\n	<li>Closure type: belt</li>\n	<li>Solid cargo pant</li>\n</ul>\n', NULL, 'Men Cargos', NULL, NULL, 679, 1, 10, 'U.K', 0, 0, 0, NULL, 1, 0, 1, 49, NULL, '2019-06-20 02:28:45', '2020-12-02 17:17:28', '~MENS FASHION~,~Bottom Wear~,~Cargos~,~Men Cargos~', 'men-cargos', '{\"productCost\":760,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}', 2, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 8, 1, NULL, NULL, 0, 1, 0, NULL),
(555, 'MC002034', '109882765222', 100, NULL, NULL, 72, 1, '780.00', '2019-06-20', 1, 'BEEVEE Men\'s 100% Cotton Solid Khaki Fixed Waist Turn Ups and Detachable Cargo with Belt', '<ul>\n	<li>Care Instructions: Normal Wash</li>\n	<li>Slim FIT. These premium Men&#39;s Casual Cotton Cargo Pants sit at the natural waist with a relaxed seat and thigh. These Stylish, Fashionable and Hi-quality cargo pants will keep you comfortable all day</li>\n	<li>MAXIMUM STORAGE. Equipped with (6) pockets for maximum storage capacity. (2) cargo flap pockets, (2) slash pockets, and (2) back pockets with flaps - great for storing cell phones, wallets, tools, and other items</li>\n	<li>PREMIUM CARGO STYLE. Made with premium materials for comfort, this classic cargo pant takes you from work and the outdoors, to everyday casual wear and are a perfect combination of trendy and comfort.</li>\n	<li>DURABLE MATERIALS. These Mens Cargo Pants are Constructed from 100% cotton Twill, these pants are built to last while maintaining breath-ability and comfort. Comes with Brass Zippers for Classy Look.</li>\n	<li>This is an Unique Design form the Amazon Bestselling Brand VERSATYL which is known for its Unique and Innovative products.</li>\n</ul>\n', NULL, '', NULL, NULL, 560, 1, 10, 'India', 0, 0, 0, '3.00', 1, 1, 1, 49, NULL, '2019-06-20 02:37:42', '2020-12-02 17:17:28', '~MENS FASHION~,~Bottom Wear~,~Cargos~,~BEEVEE Men\'s 100% Cotton Solid Khaki Fixed Waist Turn Ups and Detachable Cargo with Belt~', 'beevee-mens-100-cotton-solid-khaki-fixed-waist-turn-ups-and-detachable-cargo-with-belt', '{\"productCost\":780,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}', 2, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 9, 1, NULL, NULL, 0, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_description`
--

CREATE TABLE `product_description` (
  `product_description_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `meta_description` text,
  `meta_keyword` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_discount`
--

CREATE TABLE `product_discount` (
  `product_discount_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `priority` int(11) NOT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `sku_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `product_image_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `container_name` varchar(255) DEFAULT NULL,
  `default_image` int(11) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`product_image_id`, `product_id`, `image`, `container_name`, `default_image`, `sort_order`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(3483, 538, 'Img_1560941359959.jpeg', 'Product/SportsBooksAndMore/MusicalInstruments/', 1, NULL, NULL, NULL, NULL, '2019-06-19 05:49:51', NULL),
(3487, 540, 'Img_1560942077645.png', 'Product/SportsBooksAndMore/MusicalInstruments/', 1, NULL, NULL, NULL, NULL, '2019-06-19 06:01:40', NULL),
(3488, 540, 'Img_1560942068218.png', 'Product/SportsBooksAndMore/MusicalInstruments/', 0, NULL, NULL, NULL, NULL, '2019-06-19 06:01:40', NULL),
(3491, 542, 'Img_1560942778648.jpeg', 'Product/BabyandKids/SchoolSupplies/', 1, NULL, NULL, NULL, NULL, '2019-06-19 06:16:09', NULL),
(3492, 542, 'Img_1560942923395.jpeg', 'Product/BabyandKids/SchoolSupplies/', 0, NULL, NULL, NULL, NULL, '2019-06-19 06:16:09', NULL),
(3493, 542, 'Img_1560942958770.jpeg', 'Product/BabyandKids/SchoolSupplies/', 0, NULL, NULL, NULL, NULL, '2019-06-19 06:16:09', NULL),
(3494, 541, 'Img_1560942881447.jpeg', 'Product/SportsBooksAndMore/MusicalInstruments/', 1, NULL, NULL, NULL, NULL, '2019-06-19 06:16:12', NULL),
(3495, 541, 'Img_1560942872336.jpeg', 'Product/SportsBooksAndMore/MusicalInstruments/', 0, NULL, NULL, NULL, NULL, '2019-06-19 06:16:12', NULL),
(3509, 547, 'Img_1560949940862.jpeg', 'Product/HomesAndFurniture/HomeLighting/', 1, NULL, NULL, NULL, NULL, '2019-06-19 08:13:25', NULL),
(3510, 547, 'Img_1560949967618.jpeg', 'Product/HomesAndFurniture/HomeLighting/', 0, NULL, NULL, NULL, NULL, '2019-06-19 08:13:25', NULL),
(3511, 547, 'Img_1560949998311.jpeg', 'Product/HomesAndFurniture/HomeLighting/', 0, NULL, NULL, NULL, NULL, '2019-06-19 08:13:25', NULL),
(3519, 550, 'Img_1561012885687.jpeg', 'Product/Electronics/TVsAndSpeaker/', 0, NULL, NULL, NULL, NULL, '2019-06-20 01:43:55', NULL),
(3520, 550, 'Img_1561012928975.jpeg', 'Product/Electronics/TVsAndSpeaker/', 0, NULL, NULL, NULL, NULL, '2019-06-20 01:43:55', NULL),
(3521, 550, 'Img_1561013011775.jpeg', 'Product/Electronics/TVsAndSpeaker/', 1, NULL, NULL, NULL, NULL, '2019-06-20 01:43:55', NULL),
(3525, 552, 'Img_1561013979887.jpeg', 'Product/Electronics/TVsAndSpeaker/', 1, NULL, NULL, NULL, NULL, '2019-06-20 02:01:17', NULL),
(3526, 552, 'Img_1561014035550.jpeg', 'Product/Electronics/TVsAndSpeaker/', 0, NULL, NULL, NULL, NULL, '2019-06-20 02:01:17', NULL),
(3527, 552, 'Img_1561014069848.jpeg', 'Product/Electronics/TVsAndSpeaker/', 0, NULL, NULL, NULL, NULL, '2019-06-20 02:01:17', NULL),
(3531, 554, 'Img_1561015626179.jpeg', 'Product/MensFashion/BottomWear/', 1, NULL, NULL, NULL, NULL, '2019-06-20 02:28:45', NULL),
(3532, 554, 'Img_1561015663360.jpeg', 'Product/MensFashion/BottomWear/', 0, NULL, NULL, NULL, NULL, '2019-06-20 02:28:45', NULL),
(3533, 554, 'Img_1561015719324.jpeg', 'Product/MensFashion/BottomWear/', 0, NULL, NULL, NULL, NULL, '2019-06-20 02:28:45', NULL),
(3534, 555, 'Img_1561016083454.jpeg', 'Product/MensFashion/BottomWear/', 1, NULL, NULL, NULL, NULL, '2019-06-20 02:37:42', NULL),
(3535, 555, 'Img_1561016190944.jpeg', 'Product/MensFashion/BottomWear/', 0, NULL, NULL, NULL, NULL, '2019-06-20 02:37:42', NULL),
(3536, 555, 'Img_1561016253369.jpeg', 'Product/MensFashion/BottomWear/', 0, NULL, NULL, NULL, NULL, '2019-06-20 02:37:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_related`
--

CREATE TABLE `product_related` (
  `related_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `related_product_id` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_related`
--

INSERT INTO `product_related` (`related_id`, `product_id`, `related_product_id`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(1356, 538, 540, NULL, NULL, NULL, '2019-06-19 05:49:51', NULL),
(1361, 540, 538, NULL, NULL, NULL, '2019-06-19 06:01:40', NULL),
(1366, 542, 541, NULL, NULL, NULL, '2019-06-19 06:16:09', NULL),
(1397, 555, 547, NULL, NULL, NULL, '2019-06-20 02:37:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_special`
--

CREATE TABLE `product_special` (
  `product_special_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_group_id` int(11) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `sku_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_stock_alert`
--

CREATE TABLE `product_stock_alert` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `mail_flag` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `sku_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_tag`
--

CREATE TABLE `product_tag` (
  `product_tag_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_tagname` text,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_tire_price`
--

CREATE TABLE `product_tire_price` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `sku_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_to_category`
--

CREATE TABLE `product_to_category` (
  `product_to_category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_video`
--

CREATE TABLE `product_video` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '1 -> video 2 -> embedded',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_view_log`
--

CREATE TABLE `product_view_log` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `mobile` bigint(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(10) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `settings_id` int(11) NOT NULL,
  `url` varchar(250) DEFAULT NULL,
  `meta_tag_title` varchar(250) DEFAULT NULL,
  `meta_tag_description` text,
  `meta_tag_keywords` varchar(250) DEFAULT NULL,
  `store_name` varchar(250) DEFAULT NULL,
  `store_owner` varchar(250) DEFAULT NULL,
  `store_address` text,
  `country_id` int(11) DEFAULT NULL,
  `zone_id` varchar(255) DEFAULT NULL,
  `store_email` varchar(250) DEFAULT NULL,
  `store_telephone` varchar(50) DEFAULT NULL,
  `store_fax` varchar(30) DEFAULT NULL,
  `store_logo` varchar(250) DEFAULT NULL,
  `store_logo_path` varchar(255) DEFAULT NULL,
  `maintenance_mode` int(11) DEFAULT NULL,
  `store_language_name` varchar(250) DEFAULT NULL,
  `store_currency_id` int(11) DEFAULT NULL,
  `store_image` varchar(255) DEFAULT NULL,
  `store_image_path` text,
  `google` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `order_status` int(11) NOT NULL DEFAULT '1',
  `invoice_prefix` varchar(255) DEFAULT NULL,
  `items_per_page` int(11) DEFAULT NULL,
  `category_product_count` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `email_logo` varchar(255) DEFAULT NULL,
  `email_logo_path` varchar(255) DEFAULT NULL,
  `invoice_logo` varchar(255) DEFAULT NULL,
  `invoice_logo_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`settings_id`, `url`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keywords`, `store_name`, `store_owner`, `store_address`, `country_id`, `zone_id`, `store_email`, `store_telephone`, `store_fax`, `store_logo`, `store_logo_path`, `maintenance_mode`, `store_language_name`, `store_currency_id`, `store_image`, `store_image_path`, `google`, `facebook`, `twitter`, `instagram`, `order_status`, `invoice_prefix`, `items_per_page`, `category_product_count`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`, `email_logo`, `email_logo_path`, `invoice_logo`, `invoice_logo_path`) VALUES
(2, 'www.spurt.com', 'Spurtcommerce', 'description', 'keyword', 'online shopping sites in india ', 'Admin', 'Chennai, India', 9, '59', 'support@spurtcommerce.com', '9840322505', '1221', 'Img_1623253623483.png', 'storeLogo/', 0, 'English', 46, 'storeImage', NULL, 'https://plus.google.com/106505712715559114904', 'https://www.facebook.com/spurtcommerce/', 'https://twitter.com/Spurtcommerce', 'https://www.instagram.com/spurt_commerce/', 1, 'SPU', 20, 1, 1, '2019-02-13 06:00:00', '2021-06-11 14:49:08', NULL, NULL, 'EmailLogo_1623253623527.png', 'storeLogo/', 'InvoiceLogo_1607003182965.jpeg', 'storeLogo/');

-- --------------------------------------------------------

--
-- Table structure for table `sku`
--

CREATE TABLE `sku` (
  `id` int(11) NOT NULL,
  `sku_name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `out_of_stock_threshold` int(11) DEFAULT NULL,
  `notify_min_quantity_below` int(11) DEFAULT NULL,
  `min_quantity_allowed_cart` int(11) DEFAULT '1',
  `max_quantity_allowed_cart` int(11) DEFAULT '5',
  `enable_back_orders` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sku`
--

INSERT INTO `sku` (`id`, `sku_name`, `price`, `quantity`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`, `out_of_stock_threshold`, `notify_min_quantity_below`, `min_quantity_allowed_cart`, `max_quantity_allowed_cart`, `enable_back_orders`) VALUES
(1, 'DRM9900U6', '5889.00', 150, 1, '2020-12-02 17:17:18', '2020-12-02 17:17:18', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'ASS88901Gy', '89900.00', 100, 1, '2020-12-02 17:17:18', '2020-12-02 17:17:18', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'AWE00UI6', '24000.00', 100, 1, '2020-12-02 17:17:18', '2020-12-02 17:17:18', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'BB002013', '360.00', 100, 1, '2020-12-02 17:17:18', '2020-12-02 17:17:18', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'WL002017', '850.00', 100, 1, '2020-12-02 17:17:19', '2020-12-02 17:17:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'EH002021', '2100.00', 100, 1, '2020-12-02 17:17:28', '2020-12-02 17:17:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'ET002023', '14000.00', 100, 1, '2020-12-02 17:17:28', '2020-12-02 17:17:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'MC002031', '760.00', 100, 1, '2020-12-02 17:17:28', '2020-12-02 17:17:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'MC002034', '780.00', 100, 1, '2020-12-02 17:17:28', '2020-12-02 17:17:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stock_log`
--

CREATE TABLE `stock_log` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `sku_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tax`
--

CREATE TABLE `tax` (
  `tax_id` int(11) NOT NULL,
  `tax_name` varchar(255) DEFAULT NULL,
  `tax_percentage` int(11) DEFAULT NULL,
  `tax_status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tax`
--

INSERT INTO `tax` (`tax_id`, `tax_name`, `tax_percentage`, `tax_status`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'GST', 5, 1, NULL, '2020-02-20 13:42:39', NULL, '2020-02-20 13:42:49'),
(2, 'Tax', 10, 1, NULL, '2020-04-20 09:34:44', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_group_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `avatar_path` varchar(255) DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` bigint(20) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT '0',
  `permission` text,
  `forget_password_link_expires` datetime DEFAULT NULL,
  `forget_password_key` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_group_id`, `username`, `password`, `first_name`, `last_name`, `email`, `avatar`, `avatar_path`, `code`, `ip`, `address`, `phone_number`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`, `delete_flag`, `permission`, `forget_password_link_expires`, `forget_password_key`) VALUES
(49, 1, 'admin@spurtcart.com', '$2b$10$/7MmJDnJ7FcYsOOAnIQwPeevZQPlP9TqjMm92ZC/kahsJFrnfMGs2', 'Admin', ' ', 'admin@spurtcart.com', 'Img_1567002487693.jpg', 'user/', NULL, NULL, 'India', 1234567890, 1, '2019-02-15 04:13:22', '2021-03-10 12:31:27', 49, NULL, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `group_id` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `slug` varchar(64) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `permission` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`group_id`, `name`, `slug`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`, `permission`) VALUES
(1, 'Admin', 'admin', 1, '2019-01-21 10:38:14', '2022-10-05 05:00:03', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `widget`
--

CREATE TABLE `widget` (
  `widget_id` int(11) NOT NULL,
  `widget_title` varchar(255) DEFAULT NULL,
  `widget_link_type` int(11) DEFAULT NULL COMMENT '1-> category 2 -> product',
  `widget_description` text,
  `position` int(11) DEFAULT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` text,
  `meta_tag_keyword` varchar(255) DEFAULT NULL,
  `widget_slug_name` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `widget_item`
--

CREATE TABLE `widget_item` (
  `id` int(11) NOT NULL,
  `widget_id` int(11) DEFAULT NULL,
  `ref_id` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `zone_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `code` varchar(32) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`zone_id`, `country_id`, `code`, `name`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(58, 45, 'JAF', 'Jaffna', 0, '2019-02-17 22:17:27', '2019-05-13 04:02:06', NULL, NULL),
(59, 22, 'MUM', 'Mumbai', 1, '2019-02-17 22:17:49', '2019-06-14 01:35:42', NULL, NULL),
(63, 22, 'KL', 'kerala', 1, '2019-02-18 23:46:22', '2019-05-10 04:05:34', NULL, NULL),
(66, 22, 'GOA', 'Goa', 1, '2019-02-19 07:19:48', '2019-03-12 09:11:16', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zone_to_geo_zone`
--

CREATE TABLE `zone_to_geo_zone` (
  `zone_to_geo_zone_id` int(11) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `geo_zone_id` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_token`
--
ALTER TABLE `access_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `fk_customer_id_tbl_customer_customer_id` (`customer_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_audit_log_user` (`user_id`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`banner_id`),
  ADD KEY `fk_BannerGroup_Banner` (`banner_group_id`),
  ADD KEY `banner_id` (`banner_id`);

--
-- Indexes for table `banner_group`
--
ALTER TABLE `banner_group`
  ADD PRIMARY KEY (`banner_group_id`),
  ADD KEY `banner_group_id` (`banner_group_id`);

--
-- Indexes for table `banner_image`
--
ALTER TABLE `banner_image`
  ADD PRIMARY KEY (`banner_image_id`),
  ADD KEY `banner_image_id` (`banner_image_id`);

--
-- Indexes for table `banner_image_description`
--
ALTER TABLE `banner_image_description`
  ADD PRIMARY KEY (`banner_image_description_id`),
  ADD KEY `fk_Banner_BannerImageDescription` (`banner_id`),
  ADD KEY `fk_BannerImage_BannerImageDescription` (`banner_image_id`),
  ADD KEY `banner_image_description_id` (`banner_image_description_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `category_description`
--
ALTER TABLE `category_description`
  ADD PRIMARY KEY (`category_description_id`),
  ADD KEY `fk_Category_CategoryDescription` (`category_id`),
  ADD KEY `category_description_id` (`category_description_id`);

--
-- Indexes for table `category_path`
--
ALTER TABLE `category_path`
  ADD PRIMARY KEY (`category_path_id`),
  ADD KEY `category_path_id` (`category_path_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`currency_id`),
  ADD KEY `currency_id` (`currency_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `customer_activity`
--
ALTER TABLE `customer_activity`
  ADD PRIMARY KEY (`customer_activity_id`),
  ADD KEY `fk_tbl_customer_activity_tbl_customer` (`customer_id`);

--
-- Indexes for table `customer_cart`
--
ALTER TABLE `customer_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_customer_cart_tbl_product_foreignKey` (`product_id`);

--
-- Indexes for table `customer_group`
--
ALTER TABLE `customer_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `customer_ip`
--
ALTER TABLE `customer_ip`
  ADD PRIMARY KEY (`customer_ip_id`),
  ADD KEY `customer_ip_id` (`customer_ip_id`);

--
-- Indexes for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  ADD PRIMARY KEY (`customer_transaction_id`),
  ADD KEY `fk_customer_transaction_order1` (`order_id`),
  ADD KEY `fk_customer_transaction_customer1` (`customer_id`),
  ADD KEY `customer_transaction_id` (`customer_transaction_id`);

--
-- Indexes for table `customer_wishlist`
--
ALTER TABLE `customer_wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `email_template`
--
ALTER TABLE `email_template`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `geo_zone`
--
ALTER TABLE `geo_zone`
  ADD PRIMARY KEY (`geo_zone_id`),
  ADD KEY `geo_zone_id` (`geo_zone_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `job_id` (`job_id`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`language_id`),
  ADD KEY `language_id` (`language_id`);

--
-- Indexes for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_log`
--
ALTER TABLE `login_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturer_id`),
  ADD KEY `manufacturer_id` (`manufacturer_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_order_customer1` (`customer_id`),
  ADD KEY `fk_order_currency1` (`currency_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `order_cancel_reason`
--
ALTER TABLE `order_cancel_reason`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`order_history_id`),
  ADD KEY `fk_order_history_order1` (`order_id`),
  ADD KEY `fk_order_history_order_status1` (`order_status_id`),
  ADD KEY `order_history_id` (`order_history_id`);

--
-- Indexes for table `order_log`
--
ALTER TABLE `order_log`
  ADD PRIMARY KEY (`order_log_id`),
  ADD KEY `fk_order_customer1` (`customer_id`),
  ADD KEY `fk_order_currency1` (`currency_id`),
  ADD KEY `order_log_id` (`order_log_id`);

--
-- Indexes for table `order_option`
--
ALTER TABLE `order_option`
  ADD PRIMARY KEY (`order_option_id`),
  ADD KEY `fk_order_option_order1` (`order_id`),
  ADD KEY `fk_order_option_order_product1` (`order_product_id`),
  ADD KEY `order_option_id` (`order_option_id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_product_id`),
  ADD KEY `fk_order_product_product1` (`product_id`),
  ADD KEY `fk_order_product_order1` (`order_id`),
  ADD KEY `order_product_id` (`order_product_id`),
  ADD KEY `fk_tbl_order_status_tbl_order_product_foreignKey` (`order_status_id`);

--
-- Indexes for table `order_product_log`
--
ALTER TABLE `order_product_log`
  ADD PRIMARY KEY (`order_product_log_id`),
  ADD KEY `fk_tbl_orderProductLog_tbl_orderProduct_foreignKey` (`order_product_id`),
  ADD KEY `fk_tbl_orderProductLog_tbl_product_foreignKey` (`product_id`),
  ADD KEY `fk_tbl_orderProductLog_tbl_order_foreignKey` (`order_id`),
  ADD KEY `fk_tbl_orderProductLog_tbl_orderStatus_foreignKey` (`order_status_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`order_status_id`);

--
-- Indexes for table `order_total`
--
ALTER TABLE `order_total`
  ADD PRIMARY KEY (`order_total_id`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`page_id`),
  ADD KEY `fk_page_page_group1` (`page_group_id`),
  ADD KEY `page_id` (`page_id`);

--
-- Indexes for table `page_group`
--
ALTER TABLE `page_group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `payment_archive`
--
ALTER TABLE `payment_archive`
  ADD PRIMARY KEY (`payment_archive_id`),
  ADD KEY `fk_tbl_payment_archive_tbl_order_foreignKey` (`order_id`);

--
-- Indexes for table `payment_items`
--
ALTER TABLE `payment_items`
  ADD PRIMARY KEY (`payment_item_id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `order_product_id` (`order_product_id`);

--
-- Indexes for table `payment_items_archive`
--
ALTER TABLE `payment_items_archive`
  ADD PRIMARY KEY (`payment_item_archive_id`),
  ADD KEY `fk_tbl_paymentItemsArchive_tbl_payment_foreignKey` (`payment_archive_id`),
  ADD KEY `fk_tbl_paymentItemsArchive_tbl_orderProduct_foreignKey` (`order_product_id`);

--
-- Indexes for table `permission_module`
--
ALTER TABLE `permission_module`
  ADD PRIMARY KEY (`module_id`),
  ADD KEY `fk_tbl_permissionModule_tbl_permissionModuleGroup_foreignKey` (`module_group_id`);

--
-- Indexes for table `permission_module_group`
--
ALTER TABLE `permission_module_group`
  ADD PRIMARY KEY (`module_group_id`);

--
-- Indexes for table `plugins`
--
ALTER TABLE `plugins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `plugin_menu`
--
ALTER TABLE `plugin_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `manufacturer_id` (`manufacturer_id`),
  ADD KEY `condition` (`condition`),
  ADD KEY `today_deals` (`today_deals`),
  ADD KEY `is_featured` (`is_featured`),
  ADD KEY `is_active` (`is_active`),
  ADD KEY `fk_tbl_sku_tbl_product_foreignKey` (`sku_id`);

--
-- Indexes for table `product_description`
--
ALTER TABLE `product_description`
  ADD PRIMARY KEY (`product_description_id`),
  ADD KEY `product_description_id` (`product_description_id`);

--
-- Indexes for table `product_discount`
--
ALTER TABLE `product_discount`
  ADD PRIMARY KEY (`product_discount_id`),
  ADD KEY `fk_product_discount_product1` (`product_id`),
  ADD KEY `product_discount_id` (`product_discount_id`),
  ADD KEY `priority` (`priority`),
  ADD KEY `date_start` (`date_start`),
  ADD KEY `date_end` (`date_end`),
  ADD KEY `price` (`price`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`product_image_id`),
  ADD KEY `fk_product_image_product1` (`product_id`),
  ADD KEY `product_image_id` (`product_image_id`),
  ADD KEY `default_image` (`default_image`);

--
-- Indexes for table `product_related`
--
ALTER TABLE `product_related`
  ADD PRIMARY KEY (`related_id`),
  ADD KEY `fk_product_related_product1` (`product_id`),
  ADD KEY `related_id` (`related_id`),
  ADD KEY `fk_tbl_product_related_tbl_product_foreignKey` (`related_product_id`);

--
-- Indexes for table `product_special`
--
ALTER TABLE `product_special`
  ADD PRIMARY KEY (`product_special_id`),
  ADD KEY `product_special_ibfk_1` (`product_id`),
  ADD KEY `product_special_id` (`product_special_id`),
  ADD KEY `date_end` (`date_end`),
  ADD KEY `start_end` (`date_end`),
  ADD KEY `priority` (`priority`),
  ADD KEY `price` (`price`);

--
-- Indexes for table `product_stock_alert`
--
ALTER TABLE `product_stock_alert`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_product_tbl_product_stock_alert_foreign_key` (`product_id`);

--
-- Indexes for table `product_tag`
--
ALTER TABLE `product_tag`
  ADD PRIMARY KEY (`product_tag_id`),
  ADD KEY `product_tag_id` (`product_tag_id`);

--
-- Indexes for table `product_tire_price`
--
ALTER TABLE `product_tire_price`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_product_tire_price_tbl_product_foreignKey` (`product_id`);

--
-- Indexes for table `product_to_category`
--
ALTER TABLE `product_to_category`
  ADD PRIMARY KEY (`product_to_category_id`),
  ADD KEY `fk_product_to_category_product1` (`product_id`),
  ADD KEY `fk_product_to_category_category1` (`category_id`),
  ADD KEY `product_to_category_id` (`product_to_category_id`);

--
-- Indexes for table `product_video`
--
ALTER TABLE `product_video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_product_tbl_product_video_foreignKey` (`product_id`);

--
-- Indexes for table `product_view_log`
--
ALTER TABLE `product_view_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_view_log_Cons_product` (`product_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`settings_id`),
  ADD KEY `fk_Country_Settings` (`country_id`),
  ADD KEY `settings_id` (`settings_id`);

--
-- Indexes for table `sku`
--
ALTER TABLE `sku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_log`
--
ALTER TABLE `stock_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_product_tbl_stock_log_foreign` (`product_id`),
  ADD KEY `fk_tbl_order_tbl_stock_log_foreign` (`order_id`);

--
-- Indexes for table `tax`
--
ALTER TABLE `tax`
  ADD PRIMARY KEY (`tax_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_users_usergroup` (`user_group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `widget`
--
ALTER TABLE `widget`
  ADD PRIMARY KEY (`widget_id`);

--
-- Indexes for table `widget_item`
--
ALTER TABLE `widget_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_widget_item_Related_tbl_widget` (`widget_id`);

--
-- Indexes for table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`zone_id`),
  ADD KEY `fk_Zone_Country` (`country_id`),
  ADD KEY `user_id` (`zone_id`);

--
-- Indexes for table `zone_to_geo_zone`
--
ALTER TABLE `zone_to_geo_zone`
  ADD PRIMARY KEY (`zone_to_geo_zone_id`),
  ADD KEY `fk_Zone_ZoneGeo` (`zone_id`),
  ADD KEY `fk_Country_ZoneGeo` (`country_id`),
  ADD KEY `zone_to_geo_zone_id` (`zone_to_geo_zone_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_token`
--
ALTER TABLE `access_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `audit_log`
--
ALTER TABLE `audit_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
--
-- AUTO_INCREMENT for table `banner_group`
--
ALTER TABLE `banner_group`
  MODIFY `banner_group_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `banner_image`
--
ALTER TABLE `banner_image`
  MODIFY `banner_image_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `banner_image_description`
--
ALTER TABLE `banner_image_description`
  MODIFY `banner_image_description_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;
--
-- AUTO_INCREMENT for table `category_description`
--
ALTER TABLE `category_description`
  MODIFY `category_description_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category_path`
--
ALTER TABLE `category_path`
  MODIFY `category_path_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=844;
--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=278;
--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `currency_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `customer_activity`
--
ALTER TABLE `customer_activity`
  MODIFY `customer_activity_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer_cart`
--
ALTER TABLE `customer_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer_group`
--
ALTER TABLE `customer_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `customer_ip`
--
ALTER TABLE `customer_ip`
  MODIFY `customer_ip_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  MODIFY `customer_transaction_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer_wishlist`
--
ALTER TABLE `customer_wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `email_template`
--
ALTER TABLE `email_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `geo_zone`
--
ALTER TABLE `geo_zone`
  MODIFY `geo_zone_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `language_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `login_log`
--
ALTER TABLE `login_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturer_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=297;
--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_cancel_reason`
--
ALTER TABLE `order_cancel_reason`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `order_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_log`
--
ALTER TABLE `order_log`
  MODIFY `order_log_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_option`
--
ALTER TABLE `order_option`
  MODIFY `order_option_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_product`
--
ALTER TABLE `order_product`
  MODIFY `order_product_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_product_log`
--
ALTER TABLE `order_product_log`
  MODIFY `order_product_log_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `order_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `order_total`
--
ALTER TABLE `order_total`
  MODIFY `order_total_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `page_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `page_group`
--
ALTER TABLE `page_group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `payment_archive`
--
ALTER TABLE `payment_archive`
  MODIFY `payment_archive_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `payment_items`
--
ALTER TABLE `payment_items`
  MODIFY `payment_item_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `payment_items_archive`
--
ALTER TABLE `payment_items_archive`
  MODIFY `payment_item_archive_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `permission_module`
--
ALTER TABLE `permission_module`
  MODIFY `module_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;
--
-- AUTO_INCREMENT for table `permission_module_group`
--
ALTER TABLE `permission_module_group`
  MODIFY `module_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `plugins`
--
ALTER TABLE `plugins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `plugin_menu`
--
ALTER TABLE `plugin_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=556;
--
-- AUTO_INCREMENT for table `product_description`
--
ALTER TABLE `product_description`
  MODIFY `product_description_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_discount`
--
ALTER TABLE `product_discount`
  MODIFY `product_discount_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `product_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3537;
--
-- AUTO_INCREMENT for table `product_related`
--
ALTER TABLE `product_related`
  MODIFY `related_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1398;
--
-- AUTO_INCREMENT for table `product_special`
--
ALTER TABLE `product_special`
  MODIFY `product_special_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_stock_alert`
--
ALTER TABLE `product_stock_alert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_tag`
--
ALTER TABLE `product_tag`
  MODIFY `product_tag_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_tire_price`
--
ALTER TABLE `product_tire_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_to_category`
--
ALTER TABLE `product_to_category`
  MODIFY `product_to_category_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_video`
--
ALTER TABLE `product_video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_view_log`
--
ALTER TABLE `product_view_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `settings_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sku`
--
ALTER TABLE `sku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `stock_log`
--
ALTER TABLE `stock_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tax`
--
ALTER TABLE `tax`
  MODIFY `tax_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;
--
-- AUTO_INCREMENT for table `widget`
--
ALTER TABLE `widget`
  MODIFY `widget_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `widget_item`
--
ALTER TABLE `widget_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `zone_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT for table `zone_to_geo_zone`
--
ALTER TABLE `zone_to_geo_zone`
  MODIFY `zone_to_geo_zone_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_customer_id_tbl_customer_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Constraints for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD CONSTRAINT `fk_audit_log_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `banner`
--
ALTER TABLE `banner`
  ADD CONSTRAINT `fk_BannerGroup_Banner` FOREIGN KEY (`banner_group_id`) REFERENCES `banner_group` (`banner_group_id`) ON DELETE CASCADE;

--
-- Constraints for table `banner_image_description`
--
ALTER TABLE `banner_image_description`
  ADD CONSTRAINT `fk_BannerImage_BannerImageDescription` FOREIGN KEY (`banner_image_id`) REFERENCES `banner_image` (`banner_image_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Banner_BannerImageDescription` FOREIGN KEY (`banner_id`) REFERENCES `banner` (`banner_id`) ON DELETE CASCADE;

--
-- Constraints for table `category_description`
--
ALTER TABLE `category_description`
  ADD CONSTRAINT `fk_Category_CategoryDescription` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_activity`
--
ALTER TABLE `customer_activity`
  ADD CONSTRAINT `fk_tbl_customer_activity_tbl_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_cart`
--
ALTER TABLE `customer_cart`
  ADD CONSTRAINT `fk_tbl_customer_cart_tbl_product_foreignKey` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  ADD CONSTRAINT `fk_customer_transaction_customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_customer_transaction_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_wishlist`
--
ALTER TABLE `customer_wishlist`
  ADD CONSTRAINT `fk_wishlist_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_wishlist_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `fk_order_currency1` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`currency_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_history`
--
ALTER TABLE `order_history`
  ADD CONSTRAINT `fk_order_history_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_history_order_status1` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_option`
--
ALTER TABLE `order_option`
  ADD CONSTRAINT `fk_order_option_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_option_order_product1` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `fk_order_product_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_product_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tbl_order_status_tbl_order_product_foreignKey` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_product_log`
--
ALTER TABLE `order_product_log`
  ADD CONSTRAINT `fk_tbl_orderProductLog_tbl_orderProduct_foreignKey` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tbl_orderProductLog_tbl_orderStatus_foreignKey` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tbl_orderProductLog_tbl_order_foreignKey` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tbl_orderProductLog_tbl_product_foreignKey` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `fk_tbl_page_related_tbl_page_group_foreignKey` FOREIGN KEY (`page_group_id`) REFERENCES `page_group` (`group_id`) ON DELETE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_tbl_payment_tbl_order_foreignKey` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `payment_archive`
--
ALTER TABLE `payment_archive`
  ADD CONSTRAINT `fk_tbl_payment_archive_tbl_order_foreignKey` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `payment_items`
--
ALTER TABLE `payment_items`
  ADD CONSTRAINT `fk_tbl_paymentItems_tbl_orderProduct_foreignKey` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tbl_paymentItems_tbl_payment_foreignKey` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payment_items_ibfk_1` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payment_items_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE;

--
-- Constraints for table `payment_items_archive`
--
ALTER TABLE `payment_items_archive`
  ADD CONSTRAINT `fk_tbl_paymentItemsArchive_tbl_orderProduct_foreignKey` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tbl_paymentItemsArchive_tbl_payment_foreignKey` FOREIGN KEY (`payment_archive_id`) REFERENCES `payment_archive` (`payment_archive_id`) ON DELETE CASCADE;

--
-- Constraints for table `permission_module`
--
ALTER TABLE `permission_module`
  ADD CONSTRAINT `fk_tbl_permissionModule_tbl_permissionModuleGroup_foreignKey` FOREIGN KEY (`module_group_id`) REFERENCES `permission_module_group` (`module_group_id`) ON DELETE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_tbl_sku_tbl_product_foreignKey` FOREIGN KEY (`sku_id`) REFERENCES `sku` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_discount`
--
ALTER TABLE `product_discount`
  ADD CONSTRAINT `fk_product_discount_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `fk_product_image_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_related`
--
ALTER TABLE `product_related`
  ADD CONSTRAINT `fk_product_related_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tbl_product_related_tbl_product_foreignKey` FOREIGN KEY (`related_product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_stock_alert`
--
ALTER TABLE `product_stock_alert`
  ADD CONSTRAINT `fk_tbl_product_tbl_product_stock_alert_foreign_key` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_tire_price`
--
ALTER TABLE `product_tire_price`
  ADD CONSTRAINT `fk_tbl_product_tire_price_tbl_product_foreignKey` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_to_category`
--
ALTER TABLE `product_to_category`
  ADD CONSTRAINT `fk_product_to_category_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_product_to_category_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_video`
--
ALTER TABLE `product_video`
  ADD CONSTRAINT `fk_tbl_product_tbl_product_video_foreignKey` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_view_log`
--
ALTER TABLE `product_view_log`
  ADD CONSTRAINT `fk_tbl_product_view_log_tbl_product_foreignKey` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_log`
--
ALTER TABLE `stock_log`
  ADD CONSTRAINT `fk_tbl_order_tbl_stock_log_foreign` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tbl_product_tbl_stock_log_foreign` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_usergroup` FOREIGN KEY (`user_group_id`) REFERENCES `user_group` (`group_id`) ON DELETE CASCADE;

--
-- Constraints for table `widget_item`
--
ALTER TABLE `widget_item`
  ADD CONSTRAINT `fk_tbl_widget_item_Related_tbl_widget` FOREIGN KEY (`widget_id`) REFERENCES `widget` (`widget_id`) ON DELETE CASCADE;

--
-- Constraints for table `zone_to_geo_zone`
--
ALTER TABLE `zone_to_geo_zone`
  ADD CONSTRAINT `fk_Zone_ZoneGeo` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
