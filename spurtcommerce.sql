-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 12, 2026 at 03:39 PM
-- Server version: 8.0.44-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `b2b_server_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_token`
--

CREATE TABLE `access_token` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activity_id` int NOT NULL,
  `activity_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `first_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_1` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_2` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `zone_id` int DEFAULT NULL,
  `city` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_type` int DEFAULT NULL,
  `email_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_no` bigint DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `landmark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `answer_abuse_reason`
--

CREATE TABLE `answer_abuse_reason` (
  `id` int NOT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `answer_report_abuse`
--

CREATE TABLE `answer_report_abuse` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `question_id` int NOT NULL,
  `answer_id` int NOT NULL,
  `reason_id` int NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `audit_log`
--

CREATE TABLE `audit_log` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `request_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `object` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `log_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `params` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `browser_info` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `module` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `banner_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `banner_group_id` int DEFAULT NULL,
  `container_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `view_page_count` int DEFAULT '0',
  `banner_group_banner_group_id` int DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `position` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `link_type` int DEFAULT '0',
  `tenant_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner_group`
--

CREATE TABLE `banner_group` (
  `banner_group_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner_image`
--

CREATE TABLE `banner_image` (
  `banner_image_id` int NOT NULL,
  `banner_id` int NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner_images`
--

CREATE TABLE `banner_images` (
  `id` int NOT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_primary` int DEFAULT NULL,
  `banner_id` int DEFAULT NULL,
  `is_active` int DEFAULT '1',
  `is_delete` int DEFAULT '0',
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner_image_description`
--

CREATE TABLE `banner_image_description` (
  `banner_image_description_id` int NOT NULL,
  `banner_image_id` int NOT NULL,
  `banner_id` int NOT NULL,
  `title` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `meta_tag_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_tag_keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blog_slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `tenant_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_category`
--

CREATE TABLE `blog_category` (
  `blog_category_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `parent_int` int DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` text,
  `meta_tag_keyword` varchar(255) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `category_slug` varchar(255) DEFAULT NULL,
  `category_description` text,
  `tenant_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blog_category_path`
--

CREATE TABLE `blog_category_path` (
  `blog_category_path_id` int NOT NULL,
  `blog_category_id` int DEFAULT NULL,
  `path_id` int DEFAULT NULL,
  `level` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blog_category_translation`
--

CREATE TABLE `blog_category_translation` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `language_id` int DEFAULT NULL,
  `blog_category_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_related`
--

CREATE TABLE `blog_related` (
  `related_id` int NOT NULL,
  `blog_id` int NOT NULL,
  `related_blog_id` int NOT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blog_translation`
--

CREATE TABLE `blog_translation` (
  `id` int NOT NULL,
  `blog_id` int DEFAULT NULL,
  `language_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_int` int DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `meta_tag_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_tag_keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `category_slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `industry_id` int DEFAULT '0',
  `tenant_id` int NOT NULL,
  `family_id` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category_commission`
--

CREATE TABLE `category_commission` (
  `category_commission_id` int NOT NULL,
  `category_id` int NOT NULL,
  `category_commission_value` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category_description`
--

CREATE TABLE `category_description` (
  `category_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_description` varchar(65) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_description_id` int NOT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category_path`
--

CREATE TABLE `category_path` (
  `category_path_id` int NOT NULL,
  `category_id` int NOT NULL,
  `path_id` int NOT NULL,
  `level` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category_translation`
--

CREATE TABLE `category_translation` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `language_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_log`
--

CREATE TABLE `chat_log` (
  `id` int NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_read` int NOT NULL,
  `message_id` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` int NOT NULL,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `iso_code_2` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `iso_code_3` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_format` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `postcode_required` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`country_id`, `name`, `iso_code_2`, `iso_code_3`, `address_format`, `postcode_required`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(2, 'Albania', 'AL', 'ALB', '', 1, 1, NULL, NULL, NULL, NULL),
(3, 'Algeria', 'DZ', 'DZA', '', 1, 1, NULL, NULL, NULL, NULL),
(4, 'American Samoa', 'AS', 'ASM', '', 1, 1, NULL, NULL, NULL, NULL),
(5, 'Andorra', 'AD', 'AND', '', 0, 1, NULL, NULL, NULL, NULL),
(6, 'Angola', 'AO', 'AGO', '', 0, 1, NULL, NULL, NULL, NULL),
(7, 'Anguilla', 'AI', 'AIA', '', 0, 1, NULL, NULL, NULL, NULL),
(8, 'Antarctica', 'AQ', 'ATA', '', 0, 1, NULL, NULL, NULL, NULL),
(9, 'Antigua and Barbuda', 'AG', 'ATG', '', 0, 1, NULL, NULL, NULL, NULL),
(10, 'Argentina', 'AR', 'ARG', '', 0, 1, NULL, NULL, NULL, NULL),
(11, 'Armenia', 'AM', 'ARM', '', 0, 1, NULL, NULL, NULL, NULL),
(12, 'Aruba', 'AW', 'ABW', '', 0, 1, NULL, NULL, NULL, NULL),
(13, 'Australia', 'AU', 'AUS', '', 1, 1, NULL, NULL, NULL, NULL),
(16, 'Bahamas', 'BS', 'BHS', '', 0, 1, NULL, NULL, NULL, NULL),
(17, 'Bahrain', 'BH', 'BHR', '', 0, 1, NULL, NULL, NULL, NULL),
(18, 'Bangladesh', 'BD', 'BGD', '', 0, 1, NULL, NULL, NULL, NULL),
(19, 'Barbados', 'BB', 'BRB', '', 0, 1, NULL, NULL, NULL, NULL),
(20, 'Belarus', 'BY', 'BLR', '', 1, 0, NULL, NULL, NULL, NULL),
(23, 'Benin', 'BJ', 'BEN', '', 1, 0, NULL, NULL, NULL, NULL),
(24, 'Bermuda', 'BM', 'BMU', '', 0, 1, NULL, NULL, NULL, NULL),
(25, 'Bhutan', 'BT', 'BTN', '', 0, 1, NULL, NULL, NULL, NULL),
(26, 'Bolivia', 'BO', 'BOL', '', 0, 1, NULL, NULL, NULL, NULL),
(27, 'Bosnia and Herzegovina', 'BA', 'BIH', '', 0, 1, NULL, NULL, NULL, NULL),
(28, 'Botswana', 'BW', 'BWA', '', 0, 1, NULL, NULL, NULL, NULL),
(29, 'Bouvet Island', 'BV', 'BVT', '', 0, 1, NULL, NULL, NULL, NULL),
(30, 'Brazil', 'BR', 'BRA', '', 1, 0, NULL, NULL, NULL, NULL),
(31, 'British Indian Ocean Territory', 'IO', 'IOT', '', 0, 1, NULL, NULL, NULL, NULL),
(32, 'Brunei Darussalam', 'BN', 'BRN', '', 0, 1, NULL, NULL, NULL, NULL),
(33, 'Bulgaria', 'BG', 'BGR', '', 0, 1, NULL, NULL, NULL, NULL),
(34, 'Burkina Faso', 'BF', 'BFA', '', 0, 1, NULL, NULL, NULL, NULL),
(35, 'Burundi', 'BI', 'BDI', '', 0, 1, NULL, NULL, NULL, NULL),
(36, 'Cambodia', 'KH', 'KHM', '', 0, 1, NULL, NULL, NULL, NULL),
(37, 'Cameroon', 'CM', 'CMR', '', 0, 1, NULL, NULL, NULL, NULL),
(38, 'Canada', 'CA', 'CAN', '', 0, 1, NULL, NULL, NULL, NULL),
(39, 'Cape Verde', 'CV', 'CPV', '', 0, 1, NULL, NULL, NULL, NULL),
(40, 'Cayman Islands', 'KY', 'CYM', '', 0, 1, NULL, NULL, NULL, NULL),
(41, 'Central African Republic', 'CF', 'CAF', '', 0, 1, NULL, NULL, NULL, NULL),
(42, 'Chad', 'TD', 'TCD', '', 0, 1, NULL, NULL, NULL, NULL),
(43, 'Chile', 'CL', 'CHL', '', 0, 1, NULL, NULL, NULL, NULL),
(44, 'China', 'CN', 'CHN', '', 0, 1, NULL, NULL, NULL, NULL),
(46, 'Cocos (Keeling) Islands', 'CC', 'CCK', '', 0, 1, NULL, NULL, NULL, NULL),
(47, 'Colombia', 'CO', 'COL', '', 0, 1, NULL, NULL, NULL, NULL),
(48, 'Comoros', 'KM', 'COM', '', 0, 1, NULL, NULL, NULL, NULL),
(49, 'Congo', 'CG', 'COG', '', 0, 1, NULL, NULL, NULL, NULL),
(50, 'Cook Islands', 'CK', 'COK', '', 0, 1, NULL, NULL, NULL, NULL),
(51, 'Costa Rica', 'CR', 'CRI', '', 0, 1, NULL, NULL, NULL, NULL),
(53, 'Croatia', 'HR', 'HRV', '', 0, 1, NULL, NULL, NULL, NULL),
(54, 'Cuba', 'CU', 'CUB', '', 0, 1, NULL, NULL, NULL, NULL),
(55, 'Cyprus', 'CY', 'CYP', '', 0, 1, NULL, NULL, NULL, NULL),
(56, 'Czech Republic', 'CZ', 'CZE', '', 0, 1, NULL, NULL, NULL, NULL),
(57, 'Denmark', 'DK', 'DN', '', 0, 1, NULL, NULL, NULL, NULL),
(58, 'Djibouti', 'DJ', 'DJI', '', 0, 1, NULL, NULL, NULL, NULL),
(59, 'Dominica', 'DM', 'DMA', '', 0, 1, NULL, NULL, NULL, NULL),
(60, 'Dominican Republic', 'DO', 'DOM', '', 0, 1, NULL, NULL, NULL, NULL),
(61, 'East Timor', 'TL', 'TLS', '', 0, 1, NULL, NULL, NULL, NULL),
(62, 'Ecuador', 'EC', 'ECU', '', 0, 1, NULL, NULL, NULL, NULL),
(63, 'Egypt', 'EG', 'EGY', '', 0, 1, NULL, NULL, NULL, NULL),
(64, 'El Salvador', 'SV', 'SLV', '', 0, 1, NULL, NULL, NULL, NULL),
(65, 'Equatorial Guinea', 'GQ', 'GNQ', '', 0, 1, NULL, NULL, NULL, NULL),
(66, 'Eritrea', 'ER', 'ERI', '', 0, 1, NULL, NULL, NULL, NULL),
(67, 'Estonia', 'EE', 'EST', '', 0, 1, NULL, NULL, NULL, NULL),
(68, 'Ethiopia', 'ET', 'ETH', '', 0, 1, NULL, NULL, NULL, NULL),
(69, 'Falkland Islands (Malvinas)', 'FK', 'FLK', '', 0, 1, NULL, NULL, NULL, NULL),
(70, 'Faroe Islands', 'FO', 'FRO', '', 0, 1, NULL, NULL, NULL, NULL),
(71, 'Fiji', 'FJ', 'FJI', '', 0, 1, NULL, NULL, NULL, NULL),
(72, 'Finland', 'FI', 'FIN', '', 0, 1, NULL, NULL, NULL, NULL),
(74, 'France, Metropolitan', 'FR', 'FRA', '{firstname} {lastname}\r\n{company}\r\n{address_1}\r\n{address_2}\r\n{postcode} {city}\r\n{country}', 1, 1, NULL, NULL, NULL, NULL),
(75, 'French Guiana', 'GF', 'GUF', '', 0, 1, NULL, NULL, NULL, NULL),
(76, 'French Polynesia', 'PF', 'PYF', '', 0, 1, NULL, NULL, NULL, NULL),
(77, 'French Southern Territories', 'TF', 'ATF', '', 0, 1, NULL, NULL, NULL, NULL),
(78, 'Gabon', 'GA', 'GAB', '', 0, 1, NULL, NULL, NULL, NULL),
(79, 'Gambia', 'GM', 'GMB', '', 0, 1, NULL, NULL, NULL, NULL),
(80, 'Georgia', 'GE', 'GEO', '', 0, 1, NULL, NULL, NULL, NULL),
(81, 'Germany', 'DE', 'DEU', '{company}\r\n{firstname} {lastname}\r\n{address_1}\r\n{address_2}\r\n{postcode} {city}\r\n{country}', 1, 1, NULL, NULL, NULL, NULL),
(82, 'Ghana', 'GH', 'GHA', '', 0, 1, NULL, NULL, NULL, NULL),
(83, 'Gibraltar', 'GI', 'GIB', '', 0, 1, NULL, NULL, NULL, NULL),
(84, 'Greece', 'GR', 'GRC', '', 0, 1, NULL, NULL, NULL, NULL),
(85, 'Greenland', 'GL', 'GRL', '', 0, 1, NULL, NULL, NULL, NULL),
(86, 'Grenada', 'GD', 'GRD', '', 0, 1, NULL, NULL, NULL, NULL),
(87, 'Guadeloupe', 'GP', 'GLP', '', 0, 1, NULL, NULL, NULL, NULL),
(88, 'Guam', 'GU', 'GUM', '', 0, 1, NULL, NULL, NULL, NULL),
(89, 'Guatemala', 'GT', 'GTM', '', 0, 1, NULL, NULL, NULL, NULL),
(90, 'Guinea', 'GN', 'GIN', '', 0, 1, NULL, NULL, NULL, NULL),
(91, 'Guinea-Bissau', 'GW', 'GNB', '', 0, 1, NULL, NULL, NULL, NULL),
(92, 'Guyana', 'GY', 'GUY', '', 0, 1, NULL, NULL, NULL, NULL),
(93, 'Haiti', 'HT', 'HTI', '', 0, 1, NULL, NULL, NULL, NULL),
(94, 'Heard and Mc Donald Islands', 'HM', 'HMD', '', 0, 1, NULL, NULL, NULL, NULL),
(95, 'Honduras', 'HN', 'HND', '', 0, 1, NULL, NULL, NULL, NULL),
(96, 'Hong Kong', 'HK', 'HKG', '', 0, 1, NULL, NULL, NULL, NULL),
(97, 'Hungary', 'HU', 'HUN', '', 0, 1, NULL, NULL, NULL, NULL),
(98, 'Iceland', 'IS', 'ISL', '', 0, 1, NULL, NULL, NULL, NULL),
(99, 'India', 'IN', 'IND', '', 1, 1, NULL, NULL, NULL, NULL),
(100, 'Indonesia', 'ID', 'IDN', '', 0, 1, NULL, NULL, NULL, NULL),
(101, 'Iran (Islamic Republic of)', 'IR', 'IRN', '', 1, 1, NULL, NULL, NULL, NULL),
(102, 'Iraq', 'IQ', 'IRQ', '', 0, 1, NULL, NULL, NULL, NULL),
(103, 'Ireland', 'IE', 'IRL', '', 0, 1, NULL, NULL, NULL, NULL),
(104, 'Israel', 'IL', 'ISR', '', 1, 1, NULL, NULL, NULL, NULL),
(105, 'Italy', 'IT', 'ITA', '', 0, 1, NULL, NULL, NULL, NULL),
(106, 'Jamaica', 'JM', 'JAM', '', 0, 1, NULL, NULL, NULL, NULL),
(107, 'Japan', 'JP', 'JPN', '', 0, 1, NULL, NULL, NULL, NULL),
(108, 'Jordan', 'JO', 'JOR', '', 0, 1, NULL, NULL, NULL, NULL),
(109, 'Kazakhstan', 'KZ', 'KAZ', '', 0, 1, NULL, NULL, NULL, NULL),
(110, 'Kenya', 'KE', 'KEN', '', 0, 1, NULL, NULL, NULL, NULL),
(111, 'Kiribati', 'KI', 'KIR', '', 0, 1, NULL, NULL, NULL, NULL),
(112, 'North Korea', 'KP', 'PRK', '', 0, 1, NULL, NULL, NULL, NULL),
(113, 'South Korea', 'KR', 'KOR', '', 0, 1, NULL, NULL, NULL, NULL),
(114, 'Kuwait', 'KW', 'KWT', '', 0, 1, NULL, NULL, NULL, NULL),
(115, 'Kyrgyzstan', 'KG', 'KGZ', '', 0, 1, NULL, NULL, NULL, NULL),
(116, 'Lao Peoples Democratic Republic', 'LA', 'LAO', '', 0, 1, NULL, NULL, NULL, NULL),
(117, 'Latvia', 'LV', 'LVA', '', 0, 1, NULL, NULL, NULL, NULL),
(118, 'Lebanon', 'LB', 'LBN', '', 0, 1, NULL, NULL, NULL, NULL),
(119, 'Lesotho', 'LS', 'LSO', '', 0, 1, NULL, NULL, NULL, NULL),
(120, 'Liberia', 'LR', 'LBR', '', 0, 1, NULL, NULL, NULL, NULL),
(121, 'Libyan Arab Jamahiriya', 'LY', 'LBY', '', 0, 1, NULL, NULL, NULL, NULL),
(122, 'Liechtenstein', 'LI', 'LIE', '', 0, 1, NULL, NULL, NULL, NULL),
(123, 'Lithuania', 'LT', 'LTU', '', 0, 1, NULL, NULL, NULL, NULL),
(124, 'Luxembourg', 'LU', 'LUX', '', 0, 1, NULL, NULL, NULL, NULL),
(125, 'Macau', 'MO', 'MAC', '', 0, 1, NULL, NULL, NULL, NULL),
(126, 'FYROM', 'MK', 'MKD', '', 0, 1, NULL, NULL, NULL, NULL),
(127, 'Madagascar', 'MG', 'MDG', '', 0, 1, NULL, NULL, NULL, NULL),
(128, 'Malawi', 'MW', 'MWI', '', 0, 1, NULL, NULL, NULL, NULL),
(129, 'Malaysia', 'MY', 'MYS', '', 0, 1, NULL, NULL, NULL, NULL),
(130, 'Maldives', 'MV', 'MDV', '', 0, 1, NULL, NULL, NULL, NULL),
(131, 'Mali', 'ML', 'MLI', '', 0, 1, NULL, NULL, NULL, NULL),
(132, 'Malta', 'MT', 'MLT', '', 0, 1, NULL, NULL, NULL, NULL),
(133, 'Marshall Islands', 'MH', 'MHL', '', 0, 1, NULL, NULL, NULL, NULL),
(134, 'Martinique', 'MQ', 'MTQ', '', 0, 1, NULL, NULL, NULL, NULL),
(135, 'Mauritania', 'MR', 'MRT', '', 0, 1, NULL, NULL, NULL, NULL),
(136, 'Mauritius', 'MU', 'MUS', '', 0, 1, NULL, NULL, NULL, NULL),
(137, 'Mayotte', 'YT', 'MYT', '', 0, 1, NULL, NULL, NULL, NULL),
(138, 'Mexico', 'MX', 'MEX', '', 0, 1, NULL, NULL, NULL, NULL),
(139, 'Micronesia, Federated States of', 'FM', 'FSM', '', 0, 1, NULL, NULL, NULL, NULL),
(140, 'Moldova, Republic of', 'MD', 'MDA', '', 0, 1, NULL, NULL, NULL, NULL),
(141, 'Monaco', 'MC', 'MCO', '', 0, 1, NULL, NULL, NULL, NULL),
(142, 'Mongolia', 'MN', 'MNG', '', 0, 1, NULL, NULL, NULL, NULL),
(143, 'Montserrat', 'MS', 'MSR', '', 0, 1, NULL, NULL, NULL, NULL),
(144, 'Morocco', 'MA', 'MAR', '', 0, 1, NULL, NULL, NULL, NULL),
(145, 'Mozambique', 'MZ', 'MOZ', '', 0, 1, NULL, NULL, NULL, NULL),
(146, 'Myanmar', 'MM', 'MMR', '', 0, 1, NULL, NULL, NULL, NULL),
(147, 'Namibia', 'NA', 'NAM', '', 0, 1, NULL, NULL, NULL, NULL),
(148, 'Nauru', 'NR', 'NRU', '', 0, 1, NULL, NULL, NULL, NULL),
(149, 'Nepal', 'NP', 'NPL', '', 0, 1, NULL, NULL, NULL, NULL),
(150, 'Netherlands', 'NL', 'NLD', '', 0, 1, NULL, NULL, NULL, NULL),
(151, 'Netherlands Antilles', 'AN', 'ANT', '', 0, 1, NULL, NULL, NULL, NULL),
(152, 'New Caledonia', 'NC', 'NCL', '', 0, 1, NULL, NULL, NULL, NULL),
(153, 'New Zealand', 'NZ', 'NZL', '', 0, 1, NULL, NULL, NULL, NULL),
(154, 'Nicaragua', 'NI', 'NIC', '', 0, 1, NULL, NULL, NULL, NULL),
(155, 'Niger', 'NE', 'NER', '', 0, 1, NULL, NULL, NULL, NULL),
(156, 'Nigeria', 'NG', 'NGA', '', 0, 1, NULL, NULL, NULL, NULL),
(157, 'Niue', 'NU', 'NIU', '', 0, 1, NULL, NULL, NULL, NULL),
(158, 'Norfolk Island', 'NF', 'NFK', '', 0, 1, NULL, NULL, NULL, NULL),
(159, 'Northern Mariana Islands', 'MP', 'MNP', '', 0, 1, NULL, NULL, NULL, NULL),
(160, 'Norway', 'NO', 'NOR', '', 0, 1, NULL, NULL, NULL, NULL),
(161, 'Oman', 'OM', 'OMN', '', 0, 1, NULL, NULL, NULL, NULL),
(162, 'Pakistan', 'PK', 'PAK', '', 0, 1, NULL, NULL, NULL, NULL),
(163, 'Palau', 'PW', 'PLW', '', 0, 1, NULL, NULL, NULL, NULL),
(164, 'Panama', 'PA', 'PAN', '', 0, 1, NULL, NULL, NULL, NULL),
(165, 'Papua New Guinea', 'PG', 'PNG', '', 0, 1, NULL, NULL, NULL, NULL),
(166, 'Paraguay', 'PY', 'PRY', '', 0, 1, NULL, NULL, NULL, NULL),
(167, 'Peru', 'PE', 'PER', '', 0, 1, NULL, NULL, NULL, NULL),
(168, 'Philippines', 'PH', 'PHL', '', 0, 1, NULL, NULL, NULL, NULL),
(169, 'Pitcairn', 'PN', 'PCN', '', 0, 1, NULL, NULL, NULL, NULL),
(170, 'Poland', 'PL', 'POL', '', 0, 1, NULL, NULL, NULL, NULL),
(171, 'Portugal', 'PT', 'PRT', '', 0, 1, NULL, NULL, NULL, NULL),
(172, 'Puerto Rico', 'PR', 'PRI', '', 0, 1, NULL, NULL, NULL, NULL),
(173, 'Qatar', 'QA', 'QAT', '', 0, 1, NULL, NULL, NULL, NULL),
(174, 'Reunion', 'RE', 'REU', '', 0, 1, NULL, NULL, NULL, NULL),
(175, 'Romania', 'RO', 'ROM', '', 0, 1, NULL, NULL, NULL, NULL),
(176, 'Russian Federation', 'RU', 'RUS', '', 0, 1, NULL, NULL, NULL, NULL),
(177, 'Rwanda', 'RW', 'RWA', '', 0, 1, NULL, NULL, NULL, NULL),
(178, 'Saint Kitts and Nevis', 'KN', 'KNA', '', 0, 1, NULL, NULL, NULL, NULL),
(179, 'Saint Lucia', 'LC', 'LCA', '', 0, 1, NULL, NULL, NULL, NULL),
(180, 'Saint Vincent and the Grenadines', 'VC', 'VCT', '', 0, 1, NULL, NULL, NULL, NULL),
(181, 'Samoa', 'WS', 'WSM', '', 0, 1, NULL, NULL, NULL, NULL),
(182, 'San Marino', 'SM', 'SMR', '', 0, 1, NULL, NULL, NULL, NULL),
(183, 'Sao Tome and Principe', 'ST', 'STP', '', 0, 1, NULL, NULL, NULL, NULL),
(184, 'Saudi Arabia', 'SA', 'SAU', '', 0, 1, NULL, NULL, NULL, NULL),
(185, 'Senegal', 'SN', 'SEN', '', 0, 1, NULL, NULL, NULL, NULL),
(186, 'Seychelles', 'SC', 'SYC', '', 0, 1, NULL, NULL, NULL, NULL),
(187, 'Sierra Leone', 'SL', 'SLE', '', 0, 1, NULL, NULL, NULL, NULL),
(188, 'Singapore', 'SG', 'SGP', '', 0, 1, NULL, NULL, NULL, NULL),
(189, 'Slovak Republic', 'SK', 'SVK', '{firstname} {lastname}\r\n{company}\r\n{address_1}\r\n{address_2}\r\n{city} {postcode}\r\n{zone}\r\n{country}', 0, 1, NULL, NULL, NULL, NULL),
(190, 'Slovenia', 'SI', 'SVN', '', 0, 1, NULL, NULL, NULL, NULL),
(191, 'Solomon Islands', 'SB', 'SLB', '', 0, 1, NULL, NULL, NULL, NULL),
(192, 'Somalia', 'SO', 'SOM', '', 0, 1, NULL, NULL, NULL, NULL),
(193, 'South Africa', 'ZA', 'ZAF', '', 0, 1, NULL, NULL, NULL, NULL),
(194, 'South Georgia &amp; South Sandwich Islands', 'GS', 'SGS', '', 0, 1, NULL, NULL, NULL, NULL),
(195, 'Spain', 'ES', 'ESP', '', 0, 1, NULL, NULL, NULL, NULL),
(196, 'Sri Lanka', 'LK', 'LKA', '', 0, 1, NULL, NULL, NULL, NULL),
(197, 'St. Helena', 'SH', 'SHN', '', 0, 1, NULL, NULL, NULL, NULL),
(198, 'St. Pierre and Miquelon', 'PM', 'SPM', '', 0, 1, NULL, NULL, NULL, NULL),
(199, 'Sudan', 'SD', 'SDN', '', 0, 1, NULL, NULL, NULL, NULL),
(200, 'Suriname', 'SR', 'SUR', '', 0, 1, NULL, NULL, NULL, NULL),
(201, 'Svalbard and Jan Mayen Islands', 'SJ', 'SJM', '', 0, 1, NULL, NULL, NULL, NULL),
(202, 'Swaziland', 'SZ', 'SWZ', '', 0, 1, NULL, NULL, NULL, NULL),
(203, 'Sweden', 'SE', 'SWE', '{company}\r\n{firstname} {lastname}\r\n{address_1}\r\n{address_2}\r\n{postcode} {city}\r\n{country}', 1, 1, NULL, NULL, NULL, NULL),
(204, 'Switzerland', 'CH', 'CHE', '', 0, 1, NULL, NULL, NULL, NULL),
(205, 'Syrian Arab Republic', 'SY', 'SYR', '', 0, 1, NULL, NULL, NULL, NULL),
(206, 'Taiwan', 'TW', 'TWN', '', 0, 1, NULL, NULL, NULL, NULL),
(207, 'Tajikistan', 'TJ', 'TJK', '', 0, 1, NULL, NULL, NULL, NULL),
(208, 'Tanzania, United Republic of', 'TZ', 'TZA', '', 0, 1, NULL, NULL, NULL, NULL),
(209, 'Thailand', 'TH', 'THA', '', 0, 1, NULL, NULL, NULL, NULL),
(210, 'Togo', 'TG', 'TGO', '', 0, 1, NULL, NULL, NULL, NULL),
(211, 'Tokelau', 'TK', 'TKL', '', 0, 1, NULL, NULL, NULL, NULL),
(212, 'Tonga', 'TO', 'TON', '', 0, 1, NULL, NULL, NULL, NULL),
(213, 'Trinidad and Tobago', 'TT', 'TTO', '', 0, 1, NULL, NULL, NULL, NULL),
(214, 'Tunisia', 'TN', 'TUN', '', 0, 1, NULL, NULL, NULL, NULL),
(215, 'Turkey', 'TR', 'TUR', '', 0, 1, NULL, NULL, NULL, NULL),
(216, 'Turkmenistan', 'TM', 'TKM', '', 0, 1, NULL, NULL, NULL, NULL),
(217, 'Turks and Caicos Islands', 'TC', 'TCA', '', 0, 1, NULL, NULL, NULL, NULL),
(218, 'Tuvalu', 'TV', 'TUV', '', 0, 1, NULL, NULL, NULL, NULL),
(219, 'Uganda', 'UG', 'UGA', '', 0, 1, NULL, NULL, NULL, NULL),
(220, 'Ukraine', 'UA', 'UKR', '', 0, 1, NULL, NULL, NULL, NULL),
(221, 'United Arab Emirates', 'AE', 'ARE', '', 0, 1, NULL, NULL, NULL, NULL),
(222, 'United Kingdom', 'GB', 'GBR', '', 1, 1, NULL, NULL, NULL, NULL),
(223, 'United States', 'US', 'USA', '{firstname} {lastname}\r\n{company}\r\n{address_1}\r\n{address_2}\r\n{city}, {zone} {postcode}\r\n{country}', 0, 1, NULL, NULL, NULL, NULL),
(224, 'United States Minor Outlying Islands', 'UM', 'UMI', '', 0, 1, NULL, NULL, NULL, NULL),
(225, 'Uruguay', 'UY', 'URY', '', 0, 1, NULL, NULL, NULL, NULL),
(226, 'Uzbekistan', 'UZ', 'UZB', '', 0, 1, NULL, NULL, NULL, NULL),
(227, 'Vanuatu', 'VU', 'VUT', '', 0, 1, NULL, NULL, NULL, NULL),
(228, 'Vatican City State (Holy See)', 'VA', 'VAT', '', 0, 1, NULL, NULL, NULL, NULL),
(229, 'Venezuela', 'VE', 'VEN', '', 0, 1, NULL, NULL, NULL, NULL),
(230, 'Viet Nam', 'VN', 'VNM', '', 0, 1, NULL, NULL, NULL, NULL),
(231, 'Virgin Islands (British)', 'VG', 'VGB', '', 0, 1, NULL, NULL, NULL, NULL),
(232, 'Virgin Islands (U.S.)', 'VI', 'VIR', '', 0, 1, NULL, NULL, NULL, NULL),
(233, 'Wallis and Futuna Islands', 'WF', 'WLF', '', 0, 1, NULL, NULL, NULL, NULL),
(234, 'Western Sahara', 'EH', 'ESH', '', 0, 1, NULL, NULL, NULL, NULL),
(235, 'Yemen', 'YE', 'YEM', '', 0, 1, NULL, NULL, NULL, NULL),
(237, 'Democratic Republic of Congo', 'CD', 'COD', '', 0, 1, NULL, NULL, NULL, NULL),
(238, 'Zambia', 'ZM', 'ZMB', '', 0, 1, NULL, NULL, NULL, NULL),
(239, 'Zimbabwe', 'ZW', 'ZWE', '', 0, 1, NULL, NULL, NULL, NULL),
(242, 'Montenegro', 'ME', 'MNE', '', 0, 1, NULL, NULL, NULL, NULL),
(243, 'Serbia', 'RS', 'SRB', '', 0, 1, NULL, NULL, NULL, NULL),
(245, 'Bonaire, Sint Eustatius and Saba', 'BQ', 'BES', '', 0, 1, NULL, NULL, NULL, NULL),
(246, 'Curacao', 'CW', 'CUW', '', 0, 1, NULL, NULL, NULL, NULL),
(247, 'Palestinian Territory, Occupied', 'PS', 'PSE', '', 0, 1, NULL, NULL, NULL, NULL),
(248, 'South Sudan', 'SS', 'SSD', '', 0, 1, NULL, NULL, NULL, NULL),
(249, 'St. Barthelemy', 'BL', 'BLM', '', 0, 1, NULL, NULL, NULL, NULL),
(250, 'St. Martin (French part)', 'MF', 'MAF', '', 0, 1, NULL, NULL, NULL, NULL),
(251, 'Canary Islands', 'IC', 'ICA', '', 0, 1, NULL, NULL, NULL, NULL),
(252, 'Ascension Island (British)', 'AC', 'ASC', '', 0, 1, NULL, NULL, NULL, NULL),
(253, 'Kosovo, Republic of', 'XK', 'UNK', '', 0, 1, NULL, NULL, NULL, NULL),
(254, 'Isle of Man', 'IM', 'IMN', '', 0, 1, NULL, NULL, NULL, NULL),
(255, 'Tristan da Cunha', 'TA', 'SHN', '', 0, 1, NULL, NULL, NULL, NULL),
(256, 'Guernsey', 'GG', 'GGY', '', 0, 1, NULL, NULL, NULL, NULL),
(257, 'Jersey', 'JE', 'JEY', '', 0, 1, NULL, NULL, NULL, NULL),
(258, 'klkl', '45', '55', NULL, 1, 0, NULL, NULL, NULL, NULL),
(260, 'Europe', 'EU', 'EU2', NULL, 1, 1, NULL, NULL, NULL, NULL),
(261, 'g', 'AF', 'AGF', NULL, 1, 0, NULL, NULL, NULL, NULL),
(275, 'Afghanistan', 'fg', 'tgh', NULL, 1, 1, NULL, NULL, NULL, NULL),
(276, 'malasiya', '45', '555', NULL, 1, 1, NULL, NULL, NULL, NULL),
(277, 'Russia', 'RU', 'RUS', NULL, 1, 1, NULL, NULL, NULL, NULL),
(278, 'France', 'FR', 'FRA', NULL, 1, 1, NULL, NULL, NULL, NULL),
(279, 'Country', 'Co', 'Iso', NULL, 1, 0, NULL, NULL, NULL, NULL),
(285, 'albaina', 'tt', '556', NULL, 1, 0, NULL, NULL, NULL, NULL),
(286, 'Haiti aruba', 'HA', 'HAB', NULL, 1, 1, NULL, NULL, NULL, NULL),
(287, 'gre', '41', '14', NULL, 1, 0, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------
--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `currency_id` int NOT NULL,
  `title` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `symbol_left` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `symbol_Right` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `decimal_place` decimal(5,0) DEFAULT NULL,
  `value` float(15,2) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`currency_id`, `title`, `code`, `symbol_left`, `symbol_Right`, `decimal_place`, `value`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(46, 'Dollar', 'USD', '$', NULL, NULL, 73.00, 1, '2019-02-17 22:18:16', '2024-10-19 08:13:41', NULL, NULL),
(57, 'Rupees', 'INR', '₹', NULL, NULL, 1.00, 1, '2019-03-20 01:57:14', '2024-09-18 14:55:34', NULL, NULL),
(65, 'Swiss Franc', 'CHF', '₣', '', NULL, 66.00, 1, '2019-08-20 08:56:57', '2025-11-11 06:17:34', NULL, NULL),
(68, 'British Pound Sterling', 'GBP', '£', '', NULL, NULL, 1, '2021-05-28 05:26:13', '2025-11-11 06:14:01', NULL, NULL),
(71, 'Kuwaiti Dinar', 'KWD', 'دنار', '', NULL, NULL, 1, '2021-06-05 08:45:36', '2025-11-11 06:11:41', NULL, NULL),
(72, 'EURO', 'EUR', '€', '', NULL, NULL, 1, '2021-06-05 08:49:20', '2025-11-11 06:04:49', NULL, NULL),
(73, 'שקל', 'ILS', NULL, '₪', NULL, NULL, 1, '2022-10-04 06:15:48', '2024-08-05 09:12:36', NULL, NULL),
(78, 'Japanese yen ', 'JPY', '!', NULL, NULL, NULL, 1, '2024-08-29 05:00:02', '2024-08-30 12:04:54', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int NOT NULL,
  `first_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `city` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `mail_status` int DEFAULT NULL,
  `delete_flag` int DEFAULT '0',
  `customer_group_id` int DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `newsletter` int DEFAULT NULL,
  `safe` int DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zone_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `local` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `oauth_data` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `forget_password_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locked_on` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forget_password_link_expires` datetime DEFAULT NULL,
  `site_id` int DEFAULT NULL,
  `address2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landmark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mail_otp` int DEFAULT NULL COMMENT 'BUYER MAIL CHANGE OTP',
  `mail_otp_expire_time` datetime DEFAULT NULL COMMENT 'BUYER MAIL CHANGE OTP EXPIRE TIME',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  `is_vendor` tinyint DEFAULT NULL,
  `payment_term_id` int DEFAULT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_activity`
--

CREATE TABLE `customer_activity` (
  `customer_activity_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_cart`
--

CREATE TABLE `customer_cart` (
  `id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `option_name` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `option_value_name` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `tire_price` decimal(10,2) DEFAULT NULL,
  `product_option_value_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `varient_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendor_id` int DEFAULT '0',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_contact`
--

CREATE TABLE `customer_contact` (
  `id` int NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `description` text,
  `customer_id` int DEFAULT NULL,
  `shipping_address_1` varchar(255) DEFAULT NULL,
  `shipping_address_2` varchar(255) DEFAULT NULL,
  `shipping_city` varchar(255) DEFAULT NULL,
  `shipping_postcode` varchar(255) DEFAULT NULL,
  `shipping_country_id` varchar(255) DEFAULT NULL,
  `shipping_zone_id` varchar(255) DEFAULT NULL,
  `shipping_firstname` varchar(255) DEFAULT NULL,
  `shipping_lastname` varchar(255) DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_document`
--

CREATE TABLE `customer_document` (
  `customer_document_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_status` int DEFAULT '0',
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_group`
--

CREATE TABLE `customer_group` (
  `id` int NOT NULL,
  `name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `color_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  `payment_term_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_ip`
--

CREATE TABLE `customer_ip` (
  `customer_ip_id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_permission_module`
--

CREATE TABLE `customer_permission_module` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug_name` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `module_group_id` int DEFAULT NULL,
  `is_listed` tinyint(1) NOT NULL DEFAULT '0',
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customer_permission_module`
--

INSERT INTO `customer_permission_module` (`id`, `name`, `slug_name`, `sort_order`, `module_group_id`, `is_listed`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'View Checkout', 'view-checkout', 1, 1, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(2, 'Create Checkout', 'create-checkout', 2, 1, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(3, 'Edit Checkout', 'edit-checkout', 3, 1, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(4, 'Delete Checkout', 'delete-checkout', 4, 1, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(5, 'View Customer Address', 'view-customer-address', 1, 2, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(6, 'Create Customer Address', 'create-customer-address', 2, 2, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(7, 'Edit Customer Address', 'edit-customer-address', 3, 2, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(8, 'Delete Customer Address', 'delete-customer-address', 4, 2, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(9, 'View Customer Profile', 'view-customer-profile', 1, 3, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(10, 'Create Customer Profile', 'create-customer-profile', 2, 3, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(11, 'Edit Customer Profile', 'edit-customer-profile', 3, 3, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(12, 'Delete Customer Profile', 'delete-customer-profile', 4, 3, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(13, 'View Customer User', 'view-customer-user', 1, 4, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(14, 'Create Customer User', 'create-customer-user', 2, 4, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(15, 'Edit Customer User', 'edit-customer-user', 3, 4, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(16, 'Delete Customer User', 'delete-customer-user', 4, 4, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(17, 'View Customer User Role', 'view-customer-user-role', 1, 5, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(18, 'Create Customer User Role', 'create-customer-user-role', 2, 5, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(19, 'Edit Customer User Role', 'edit-customer-user-role', 3, 5, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(20, 'Delete Customer User Role', 'delete-customer-user-role', 4, 5, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(21, 'View Order History', 'view-order-history', 1, 8, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(22, 'Create Order History', 'create-order-history', 2, 8, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(23, 'Edit Order History', 'edit-order-history', 3, 8, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(24, 'View Quote', 'view-quote', 1, 9, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(25, 'Create Quote', 'create-quote', 2, 9, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(26, 'View Request For Quote', 'view-request-for-quote', 1, 7, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(27, 'Create Request For Quote', 'create-request-for-quote', 2, 7, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(28, 'Edit Request For Quote', 'edit-request-for-quote', 3, 7, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(29, 'View Shopping List', 'view-shopping-list', 1, 6, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(30, 'Create Shopping List', 'create-shopping-list', 2, 6, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(31, 'Edit Shopping List', 'edit-shopping-list', 3, 6, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(32, 'Delete Shopping List', 'delete-shopping-list', 4, 6, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(33, 'View Shopping List Line Item', 'view-shopping-list-line-item', 1, 10, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(34, 'Edit Shopping List Line Item', 'edit-shopping-list-line-item', 2, 10, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48'),
(35, 'Delete Shopping List Line Item', 'delete-shopping-list-line-item', 3, 10, 0, NULL, '2025-09-03 06:46:48', NULL, '2025-09-03 06:46:48');

-- --------------------------------------------------------

--
-- Table structure for table `customer_permission_module_group`
--

CREATE TABLE `customer_permission_module_group` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug_name` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customer_permission_module_group`
--

INSERT INTO `customer_permission_module_group` (`id`, `name`, `slug_name`, `sort_order`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'Checkout', 'checkout', 1, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48'),
(2, 'Customer Address', 'customer-address', 3, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48'),
(3, 'Customer Profile', 'customer-profile', 4, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48'),
(4, 'Customer User', 'customer-user', 5, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48'),
(5, 'Customer User Role', 'customer-user-role', 6, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48'),
(6, 'Shopping List', 'shopping-list', 7, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48'),
(7, 'Request For Quotes', 'request-for-quotes', 8, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48'),
(8, 'Order History', 'order-history', 9, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48'),
(9, 'Quotes', 'quotes', 10, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48'),
(10, 'Shopping List Line Item', 'shopping-list-line-item', 7, NULL, '2025-06-11 00:00:00', NULL, '2025-09-03 06:46:48');

-- --------------------------------------------------------

--
-- Table structure for table `customer_to_group`
--

CREATE TABLE `customer_to_group` (
  `id` int NOT NULL,
  `customer_group_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_transaction`
--

CREATE TABLE `customer_transaction` (
  `customer_transaction_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `order_id` int NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `amount` decimal(15,4) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_users`
--

CREATE TABLE `customer_users` (
  `id` int NOT NULL,
  `customer_user_group_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(55) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `avatar_path` varchar(255) DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(25) DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `delete_flag` tinyint NOT NULL DEFAULT '0',
  `forget_password_link_expires` datetime DEFAULT NULL,
  `forget_password_key` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'LAST MODIFIED DATE',
  `is_super_customer` tinyint DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `locked_on` varchar(255) DEFAULT NULL,
  `mail_otp` int DEFAULT NULL,
  `mail_otp_expire_time` datetime DEFAULT NULL,
  `oauth_data` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_user_group`
--

CREATE TABLE `customer_user_group` (
  `id` int NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `slug` varchar(64) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `permission` text,
  `role_type` enum('predefined','custom') NOT NULL DEFAULT 'custom',
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'LAST MODIFIED DATE',
  `tenant_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_user_group`
--

INSERT INTO `customer_user_group`
(`id`, `name`, `slug`, `is_active`, `role_type`, `tenant_id`, `customer_id`, `description`, `permission`) VALUES
(1, 'Buyer', 'buyer', 1, 1, 1, NULL, 'Handles day-to-day purchasing, negotiates with suppliers, and ensures timely, cost-efficient procurement of goods and services.', '{}');

-- --------------------------------------------------------
--
-- Table structure for table `customer_wishlist`
--

CREATE TABLE `customer_wishlist` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_option_value_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `document_type` varchar(255) DEFAULT NULL,
  `is_mandatory` int DEFAULT NULL,
  `max_upload_size` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `name`, `document_type`, `is_mandatory`, `max_upload_size`, `is_active`, `is_delete`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'Partnership Deed', 'pdf', 1, 2000, 1, 0, NULL, '2024-05-28 05:26:05', NULL, '2024-05-28 05:26:05'),
(2, 'Memorandum of Article of Association', 'pdf', 1, 2000, 1, 0, NULL, '2024-05-28 05:26:05', NULL, '2024-05-28 05:26:05'),
(3, 'Certificate', 'pdf', 0, 4096, 1, 0, NULL, '2024-06-12 15:35:27', NULL, '2024-06-12 15:35:27');

-- --------------------------------------------------------

--
-- Table structure for table `email_template`
--

CREATE TABLE `email_template` (
  `id` int NOT NULL,
  `shortname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `dynamic_fields_ref` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `template_group` enum('buyer','seller','fullfilled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_template`
--

INSERT INTO `email_template`
(
    `id`,
    `shortname`,
    `subject`,
    `message`,
    `is_active`,
    `created_date`,
    `modified_date`,
    `created_by`,
    `modified_by`,
    `dynamic_fields_ref`,
    `template_group`
)
VALUES

(
    1,
    'Register Content',
    'Registration successful – welcome to {storeName}',
    '<h1 style="font-size:20px;line-height:29px;font-weight:600;margin:0 0 12px 0;color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px;line-height:24px;color:#1F2328;font-weight:normal;margin:0 0 24px 0;">
    Thank you for signing up with <b>{storeName}</b> - your gateway to a smarter, more seamless eCommerce experience.<br>
    We’re excited to have you with us and look forward to delivering an exceptional shopping journey every time you visit.<br>
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{storeName}',
    'buyer'
),

(
    2,
    'Forgot Password Content',
    'Reset your {storeName} password',
    'Dear {name},<br/><br/>
    <p style="margin-bottom:.5em;margin:0 0 10px 0;text-indent:50px;">
    Your password has been reset successfully. Your new temporary password is: {xxxxxx}<br/><br/>
    For your security, please sign in and change this password to one of your choice at the earliest.
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{xxxxxx}',
    'seller'
),

(
    4,
    'Create Customer Content',
    'Customer Login created successfully',
    'Dear {name},<br><br>
    <p>Welcome to <b>{storeName}</b>! Your customer account has been created successfully. Here are your login credentials:</p><br>
    <p><b>User ID:</b> {username}<br>
    <b>Temporary password:</b> {password}</p><br>
    <p>You can now log in using these credentials and start shopping. For security, please change your password after your first login. Wishing you a smooth and enjoyable eCommerce experience with <b>{storeName}</b>.</p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{storeName},{username},{password}',
    'buyer'
),

(
    5,
    'Customer Order Content',
    'Details of your recent Order',
    '<h1 style="font-size:24px;line-height:29px;font-weight:600;margin:0 0 12px 0;color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px;line-height:24px;color:#1F2328;font-weight:normal;margin:0 0 40px 0;">
    Thank you for your purchase! Your order has been placed successfully.
    Here are the details of your order below for your reference.
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name}',
    'buyer'
),

(
    6,
    'Admin Mail Content',
    'New order placed – {orderId}',
    '<h1 style="font-size:24px;line-height:29px;font-weight:600;margin:0 0 12px 0;color:#1F2328;">Hi {adminname},</h1>
    <p style="font-size:16px;line-height:24px;color:#1F2328;font-weight:normal;margin:0 0 40px 0;">
    A new order <b>{orderId}</b> has been successfully placed by customer <b>{name}</b>.
    Please review the order details in the admin panel and process it at the earliest.
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{adminname},{orderId},{name}',
    'seller'
),

(
    20,
    'updated cancel request status',
    'Update on your order cancellation request',
    'Dear {name},<br/><br/>
    <p style="margin-bottom:.5em;margin:0 0 10px 0;text-indent:50px;">
    This is to update you about your request to cancel the product: {productname}.<br/><br/>
    Your cancellation request has been {status} by the seller.<br/><br/>
    If you have any questions or need further assistance, please reply to this email or contact our support team.
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{productname},{status}',
    'buyer'
),

(
    21,
    'order status change update',
    'Order status update for your Spurt Cart order',
    'Hello {name},<br/><br/>
    <p style="margin-bottom:.5em;margin:0 0 10px 0;text-indent:50px;">
    Here is a new update on your recent order on Spurt Cart.<br/>
    The status of the product {title} in order number {order} is now "{status}".<br/>
    You can view the complete details of your order status in the My Order History section of your account.<br/><br/>
    Thank you for shopping with us.
    </p>
    <br/>
    <p>Best regards,<br/>Spurt Cart Team</p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{title},{order},{status}',
    'buyer'
),

(
    23,
    'Forgot password link',
    'Reset your password',
    '<h1 style="font-size:20px;line-height:29px;font-weight:600;margin:0 0 12px 0;color:#1F2328;">
    Hi {name},
    </h1>
    <p style="font-size:16px;line-height:24px;color:#1F2328;font-weight:normal;margin:0 0 24px 0;">
    A request was received to change the password for your account. To reset your password securely, please click the link below.<br><br>
    Reset your password:
    <b>
    <a href="{link}" style="display:block;text-decoration:none;padding:16px 40px;background-color:#027600;border-radius:6px;color:#FFFFFF;font-size:16px;line-height:20px;width:fit-content;margin:auto;">
    {reset_link}
    </a>
    </b><br>
    If you did not request this change, you can safely ignore this email and your current password will remain unchanged.<br/><br>
    Best regards,<br/>
    Support Team
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{link},{reset_link}',
    'seller'
),

(
    24,
    'Invoice mail',
    'Invoice for your order {orderPrefixId}',
    '<p>Dear {name},<br />&nbsp;</p>
    <p>Thank you for your purchase. Please find attached the invoice for your order {orderPrefixId}.<br/>
    If you have any questions regarding this invoice or your order, feel free to contact our support team.<br/><br/>
    Best regards,<br/>
    Accounts Team</p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{orderPrefixId}',
    'buyer'
),

(
    32,
    'customer_register',
    'Welcome to {storeName}! Your Registration is successful',
    '<h1 style="font-size:20px;line-height:29px;font-weight:600;margin:0 0 12px 0;color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px;line-height:24px;color:#1F2328;font-weight:normal;margin:0 0 24px 0;">
    Thank you for registering with <b>{storeName}</b>, your gateway to a smarter eCommerce experience.
    We are excited to have you with us and look forward to providing you with an exceptional shopping experience.<br>
    You can now log in to your account, explore our products, and start shopping anytime.<br>
    Best regards,<br/>
    Team {storeName}
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{storeName}',
    'buyer'
),

(
    40,
    'Forgot password link',
    'Reset your password',
    '<h1 style="font-size:20px;line-height:29px;font-weight:600;margin:0 0 12px 0;color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px;line-height:24px;color:#1F2328;font-weight:normal;margin:0 0 24px 0;">
    We have received a request to change the password for your account. To proceed, please click the link below to reset your password:<br><br>
    <b>
    <a href="{link}" style="display:block;text-decoration:none;padding:16px 40px;background-color:#027600;border-radius:6px;color:#FFFFFF;font-size:16px;line-height:20px;width:fit-content;margin:auto;">
    {reset_link}
    </a>
    </b><br>
    If you did not request a password change, you can safely ignore this email and your password will remain unchanged.<br/>
    Best regards,<br/>
    Support Team.
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{link},{reset_link}',
    'buyer'
),

(
    41,
    'change_user_login_email',
    'Change User Login Email',
    '<h1 style="font-size:24px;line-height:29px;font-weight:600;margin:0 0 12px 0;color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px;line-height:24px;color:#1F2328;font-weight:normal;margin:0 0 24px 0;">
    We have received a request to change the login email ID for your account.
    To proceed with this change, please enter the one-time password (OTP) given below:<br><br>
    <b>{xxxxxx}</b>
    </p>
    <p style="font-size:16px;line-height:24px;color:#1F2328;font-weight:normal;margin:0 0 26px 0;">
    If you did not request this change, you can safely ignore this email and no changes will be made to your account.<br/><br>
    Best regards,<br/>
    Support Team.
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{name},{xxxxxx}',
    'buyer'
),

(
    64,
    'Login OTP Verification',
    'Verify your login',
    '<h2 style="font-size:23px;line-height:28px;font-weight:600;margin:0 0 16px 0;color:#1F2328;">
    Hi,
    </h2>

    <p style="font-size:16px;line-height:24px;color:#1F2328;margin:0 0 14px 0;">
    Thank you for logging in to <strong>{appName}</strong> as a <strong>{type}</strong>.
    Please verify your login by entering the One-Time Password (OTP) shown below:
    </p>

    <h3 style="font-size:24px;line-height:30px;font-weight:700;color:#1F2328;margin:16px 0;">
    {3}
    </h3>

    <p style="font-size:16px;line-height:24px;color:#1F2328;margin:0 0 14px 0;">
    This OTP will remain valid for the next <strong>{duration} {durationValue}</strong>.
    Please use it before it expires.
    </p>

    <p style="font-size:16px;line-height:24px;color:#1F2328;margin:0 0 14px 0;">
    If you did not request this OTP, you can safely ignore this email.
    </p>',
    1,
    '2025-12-09 14:14:27',
    '2025-12-09 14:14:27',
    NULL,
    NULL,
    '{3},{appName},{type},{duration},{durationValue}',
    NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `export_log`
--

CREATE TABLE `export_log` (
  `id` int NOT NULL,
  `module` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `record_available` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `tenant_id` int DEFAULT NULL,
  `reference_type` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `record_ids` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_type` int DEFAULT NULL,
  `export_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `family`
--

CREATE TABLE `family` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `is_delete` tinyint NOT NULL DEFAULT '0',
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `tenant_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `geo_zone`
--

CREATE TABLE `geo_zone` (
  `geo_zone_id` int NOT NULL,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `industry`
--

CREATE TABLE `industry` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `industry`
--

INSERT INTO `industry` (`id`, `name`, `slug`, `is_active`, `is_delete`, `created_date`, `modified_date`, `created_by`, `modified_by`, `description`) VALUES
(1, 'Electronics', 'electronics', 1, 0, NULL, NULL, NULL, NULL, 'Discover and purchase electronic components, devices, and solutions from leading manufacturers and wholesalers.'),
(2, 'Pharma', 'pharma', 1, 0, NULL, NULL, NULL, NULL, 'Streamline sourcing of medicines, medical supplies, and healthcare products from compliant pharma suppliers.'),
(3, 'Leather', 'leather', 1, 0, NULL, '2025-09-03 06:46:54', NULL, NULL, 'Buy leather raw materials, finished goods, and accessories from specialized tanneries and manufacturers.'),
(4, 'Furniture', 'furniture', 1, 0, NULL, '2025-09-03 06:46:54', NULL, NULL, 'Source office, home, and commercial furniture directly from manufacturers for projects and bulk orders.'),
(6, 'Agriculture', 'agriculture', 1, 0, NULL, NULL, NULL, NULL, 'Purchase seeds, agri inputs, equipment, and farm supplies from trusted agribusiness partners. '),
(7, 'Fashion', 'fashion', 1, 0, NULL, NULL, NULL, NULL, 'Access apparel, accessories, and fashion manufacturing services from global brands and private label vendors.'),
(8, 'Network', 'network', 1, 0, NULL, NULL, NULL, NULL, 'Procure networking hardware, infrastructure solutions, and connectivity services from certified partners.'),
(9, 'Food', 'food', 1, 0, NULL, NULL, NULL, NULL, 'Source bulk food products, ingredients, and beverages directly from certified manufacturers and distributors.'),
(10, 'Construction', 'construction', 1, 0, '2025-12-15 12:26:17', NULL, NULL, NULL, 'Connect with trusted suppliers for construction materials, machinery, and project services in one unified B2B marketplace.'),
(11, 'Textiles', 'textiles', 1, 0, '2025-12-15 12:26:17', NULL, NULL, NULL, 'Source fabrics, yarns, and garment manufacturing services directly from verified textile producers and mills.'),
(12, 'Books', 'books', 1, 0, '2025-12-15 12:26:17', NULL, NULL, NULL, 'Bulk order books from publishers, distributors, and printers for retail, institutional, and corporate needs.'),
(13, 'Automotive', 'automotive', 1, 0, '2025-12-15 12:26:17', NULL, NULL, NULL, 'Procure automotive parts, accessories, and service solutions from OEMs and certified distributors.');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `job_id` int NOT NULL,
  `job_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `salary_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_location` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `contact_person_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_person_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_person_mobile` bigint DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `language_id` int NOT NULL,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_path` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `locale` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`language_id`, `name`, `code`, `image`, `image_path`, `locale`, `sort_order`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(57, 'English', 'en', 'Img_1622893818038.png', 'language/', NULL, 1, 1, '2019-05-06 03:58:01', '2024-09-13 10:47:26', NULL, NULL),
(59, 'French', 'fr', 'Img_1700893146279.png', 'language/', NULL, 2, 1, '2019-05-11 05:06:47', '2024-09-13 10:47:17', NULL, NULL),
(64, 'Arabic', 'ar', 'Img_1720003083373.jpeg', 'language/', NULL, 3, 1, '2024-06-18 07:41:56', '2024-08-22 10:25:25', NULL, NULL),
(65, 'Hindi', 'hi', 'Img_1721284048200.png', 'language/', NULL, 3, 1, '2024-07-15 12:39:14', '2024-07-31 11:20:57', NULL, NULL),
(66, 'Chinese', 'zh', 'Img_1721284099023.png', 'language/', NULL, 5, 1, '2024-07-17 05:25:48', '2024-07-20 06:01:25', NULL, NULL),
(67, 'German', 'de', 'Img_1721388619019.png', 'language/', NULL, 8, 1, '2024-07-19 11:29:28', '2024-09-13 10:46:54', NULL, NULL),
(68, 'Spanish', 'es', 'Img_1721388687173.png', 'language/', NULL, 9, 1, '2024-07-19 11:31:27', '2024-09-13 10:47:04', NULL, NULL),
(69, 'Italian', 'it', 'Img_1721388723563.png', 'language/', NULL, 10, 1, '2024-07-19 11:32:03', '2024-09-13 10:47:11', NULL, NULL),
(70, 'Japanese', 'ja', 'Img_1721388769810.png', 'language/', NULL, 12, 1, '2024-07-19 11:32:49', '2024-09-20 10:02:16', NULL, NULL);

-- --------------------------------------------------------
--
-- Table structure for table `live_address`
--

CREATE TABLE `live_address` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `first_name` varchar(32) DEFAULT NULL,
  `last_name` varchar(32) DEFAULT NULL,
  `company` varchar(32) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `address_1` varchar(128) DEFAULT NULL,
  `address_2` varchar(128) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `zone_id` int DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `state` varchar(128) DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

CREATE TABLE `login_attempts` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `ip_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `customer_user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_log`
--

CREATE TABLE `login_log` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `email_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(20, 1546529906290, 'CreateManufacturerTable1546529906290'),
(21, 1546530096773, 'CreateProductTagTable1546530096773'),
(22, 1546578299514, 'CreateLanguageTable1546578299514'),
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
(54, 1546593494331, 'AddOrderOptionRelationToOrderTable1546593494331'),
(55, 1546593946185, 'AddOrderOptionRelationToOrderProductTable1546593946185'),
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
(72, 1554286230393, 'CreateProductOptionTable1554286230393'),
(73, 1554286329886, 'CreateProductOptionValueTable1554286329886'),
(74, 1554286410285, 'CreateOptionTable1554286410285'),
(75, 1554286459613, 'CreateOptionDescriptionTable1554286459613'),
(76, 1554286512917, 'CreateOptionValueTable1554286512917'),
(77, 1554286569949, 'CreateOptionValueDescriptionTable1554286569949'),
(78, 1554980920462, 'CreateProductSpecialTable1554980920462'),
(79, 1555504622184, 'AddColumnInCustomer1555504622184'),
(80, 1555507207067, 'AddColumnInOrder1555507207067'),
(82, 1558003725620, 'AddColumnInOrderLog1558003725620'),
(83, 1558005767816, 'AddColumnInOrderProduct1558005767816'),
(84, 1560768471191, 'CreateServiceTable1560768471191'),
(85, 1560768589500, 'CreateServiceEnquiryTable1560768589500'),
(86, 1560768640645, 'CreateServiceImageTable1560768640645'),
(87, 1560768709027, 'CreateServiceCategoryTable1560768709027'),
(88, 1560768753723, 'CreateServiceCategoryPathTable1560768753723'),
(89, 1560768793478, 'CreateServiceToCategoryTable1560768793478'),
(90, 1560773355102, 'AddRelationToServiceTable1560773355102'),
(91, 1560937885319, 'AddRelationEnquiryToServiceTable1560937885319'),
(94, 1561786420039, 'AddRelationWishlistToProductTable1561786420039'),
(95, 1561967809283, 'AlterColumnTable1561967809283'),
(96, 1562234808237, 'AddRelationProductionOptionToProductTable1562234808237'),
(97, 1562831060364, 'AlterCurrencyTable1562831060364'),
(98, 1563174105812, 'CreateBlogTable1563174105812'),
(99, 1563347331461, 'CreateJobsTable1563347331461'),
(100, 1565087039728, 'DropFKforOrderCustomer1565087039728'),
(101, 1565606134069, 'AddColumnInOrderTable1565606134069'),
(102, 1565682493625, 'AddColumnInUser1565682493625'),
(103, 1565781113424, 'AltercolumnInUser1565781113424'),
(104, 1565852482174, 'AlterLoginLogTable1565852482174'),
(105, 1565856125812, 'AlterProductColumn1565856125812'),
(106, 1566206489111, 'CreateIndexProductRelatedTable1566206489111'),
(108, 1566539130608, 'AltercolumnInproductoption1566539130608'),
(109, 1568280714656, 'AlterServiceColumn1568280714656'),
(110, 1569577082237, 'AddColumnInProductTable1569577082237'),
(111, 1569838152744, 'AddColumnInOrderLog1569838152744'),
(112, 1571735617882, 'AddColumnInCustomerGroup1571735617882'),
(113, 1571736071528, 'CreateCustomerActivityTable1571736071528'),
(114, 1571736086250, 'CreateActivityTable1571736086250'),
(115, 1571738395880, 'CreateVendorTable1571738395880'),
(116, 1571738416321, 'CreateVendorProductTable1571738416321'),
(117, 1571738429508, 'CreateVendorCategoryTable1571738429508'),
(118, 1571749863667, 'CreateCategoryCommissionTable1571749863667'),
(119, 1571751199457, 'CreateVendorGlobalSettingTable1571751199457'),
(120, 1573823878115, 'CreateProductPriceLogTable1573823878115'),
(121, 1574085467312, 'CreateDeliveryPersonTable1574085467312'),
(122, 1574401863885, 'AddColumnInOrderStatus1574401863885'),
(123, 1574661760239, 'PriceUpdateFileLog1574661760239'),
(124, 1574752546404, 'AddColumnInProductPriceLog1574752546404'),
(125, 1576760717944, 'CreateVendorOrdersTable1576760717944'),
(126, 1576763624639, 'CreateVendorOrderProductsTable1576763624639'),
(127, 1577096247706, 'CreateVendorOrderStatusTable1577096247706'),
(128, 1577168888697, 'CreateDeliveryAllocationTable1577168888697'),
(129, 1577193139306, 'CreateDeliveryStatusTable1577193139306'),
(130, 1577360407651, 'CreateVendorOrderLogTable1577360407651'),
(131, 1578647288465, 'CreateDeliveryLocationTable1578647288465'),
(132, 1578990577479, 'AddTrackingColumnInOrderTable1578990577479'),
(133, 1578991869543, 'CreateDeliveryPersonToLocationTable1578991869543'),
(134, 1579597454700, 'AddColumnsInVendorOrders1579597454700'),
(135, 1579519310557, 'CreateVendorOrderArchiveTable1579519310557'),
(136, 1580295727829, 'CreateVendorOrderArchiveLogTable1580295727829'),
(137, 1579941746149, 'AddColumnInVendorOrdersTable1579941746149'),
(138, 1580799162301, 'CreateCustomerDocumentTable1580799162301'),
(139, 1581419924612, 'CreatePaymentTable1581419924612'),
(140, 1581420780474, 'CreatePaymentItemsTable1581420780474'),
(141, 1581421977783, 'CreateVendorPaymentTable1581421977783'),
(142, 1581586440986, 'AddColumnInVendorOrderArchive1581586440986'),
(143, 1581586476576, 'AddColumnInVendorOrderArchiveLog1581586476576'),
(144, 1581600070078, 'AddColumnInPriceUpdateFileLog1581600070078'),
(145, 1581672707891, 'AddDeliveryLocationToLocation1581672707891'),
(146, 1581673408519, 'AddColumnInVendorProduct1581673408519'),
(147, 1581674795492, 'AddColumnInOrder1581674795492'),
(148, 1581675647556, 'AddColumnInVendorTable1581675647556'),
(151, 1581678039045, 'AddColumnInVendorOrderLog1581678039045'),
(152, 1581679252934, 'AddServiceChargesColumnInProduct1581679252934'),
(153, 1581679936336, 'AddColumnInDeliveryPerson1581679936336'),
(154, 1581680192125, 'AddColumnInCategory1581680192125'),
(155, 1581948133661, 'CreateVendorCouponTable1581948133661'),
(156, 1581949200628, 'CreateVendorCouponProductCategoryTable1581949200628'),
(157, 1581399473295, 'CreateTaxTable1581399473295'),
(158, 1582177223557, 'AddColumnInOrderProductTable1582177223557'),
(159, 1582183277124, 'CreateOrderProductLogTable1582183277124'),
(160, 1582207388417, 'AddColumnInTaxColumnInProduct1582207388417'),
(161, 1582207440112, 'AddColumnInOrderProductTable1582207440112'),
(162, 1582265041245, 'CreateCustomerCartTable1582265041245'),
(163, 1582355542896, 'AlterColumnModelInOrderProductLog1582355542896'),
(164, 1582355584324, 'AlterColumnOrderProductPreIdInOrderProduct1582355584324'),
(165, 1582551346241, 'AlterCustomerCartTable1582551346241'),
(166, 1582717005161, 'CreateCouponUsageTable1582717005161'),
(167, 1582717076598, 'CreateCouponUsageProduct1582717076598'),
(168, 1582805439146, 'AlterColumnInVendorCoupon1582805439146'),
(169, 1582806345058, 'AddLastLoginInDeliveryPerson1582806345058'),
(170, 1582888041707, 'AlterColumnInProductPriceLog1582888041707'),
(171, 1582898256691, 'AddColumnInOrderProduct1582898256691'),
(172, 1583411982211, 'CreateBlogRelatedTable1583411982211'),
(173, 1583905968298, 'AlterColumnInProductPriceLogTable1583905968298'),
(174, 1584004496240, 'AddColumnInOrderTable1584004496240'),
(175, 1584011252176, 'AddColumnInOrderProductTable1584011252176'),
(176, 1584083106363, 'CreatePermissionModuleGroup1584083106363'),
(177, 1584083115669, 'CreatePermissionModule1584083115669'),
(178, 1584098038843, 'AddColumnInRoleAndUser1584098038843'),
(184, 1585822065789, 'CreateVendorPaymentArchive1585822065789'),
(185, 1586159957544, 'AddPaymentProcessInOrder1586159957544'),
(186, 1586945695954, 'AddContraintInBlogRelated1586945695954'),
(189, 1587392215376, 'DropFKforVendorOrder1587392215376'),
(190, 1586347085190, 'AddColumnInProductTable1586347085190'),
(191, 1587555771172, 'AddColumnInVendorProduct1587555771172'),
(192, 1587702922576, 'AlterTableNameCoupon1587702922576'),
(193, 1587713370717, 'CreateCoupon1587713370717'),
(194, 1587713409764, 'CreateCouponProductCategory1587713409764'),
(195, 1587714569170, 'DropConstraintCouponUsage1587714569170'),
(196, 1587714584471, 'AddConstraintCouponUsage1587714584471'),
(197, 1588072269668, 'CreateOrderCancelReason1588072269668'),
(198, 1588072397466, 'AddColumnInOrderProduct1588072397466'),
(199, 1588751152380, 'CreatePaymentArchive1588751152380'),
(200, 1588751245983, 'CreatePaymentItemArchive1588751245983'),
(201, 1588824849920, 'RemoveConstraintInVendorPayment1588824849920'),
(202, 1588825405897, 'RemoveConstraintInVendorPaymentArchive1588825405897'),
(203, 1589003105075, 'CreateProductTirePrices1589003105075'),
(204, 1589003393774, 'AddColumnInProductTable1589003393774'),
(205, 1589193302717, 'CreateStockLogtable1589193302717'),
(206, 1589193432006, 'CreateProductStockAlertTable1589193432006'),
(207, 1589623032875, 'AddColumnInOrderTable1589623032875'),
(208, 1589891907380, 'AddConstraintInProductViewLog1589891907380'),
(209, 1590393542054, 'AddColumnInVendorTable1590393542054'),
(211, 1590588151010, 'AddColumnInCustomerCart1590588151010'),
(212, 1590740245605, 'AddColumnInVendorPaymentArchive1590740245605'),
(213, 1590744858042, 'RemoveConstraintInVendorPaymentArchive1590744858042'),
(214, 1591679473816, 'AddContraintForRelatedProduct1591679473816'),
(215, 1594112639974, 'AddColumnInProduct1594112639974'),
(216, 1597918254147, 'AddColumnInProduct1597918254147'),
(217, 1597042164207, 'AddColumnInSettingsTable1597042164207'),
(218, 1597908778448, 'AddColumnInSettingTable1597908778448'),
(219, 1600520069506, 'AddColumnInCustomerCart1600520069506'),
(220, 1600785627733, 'CreateVendorInvoice1600785627733'),
(221, 1600785663549, 'CreateVendorInvoiceItem1600785663549'),
(222, 1601550779013, 'CreateVarientTable1601550779013'),
(224, 1601702954997, 'CreateSkuTable1601702954997'),
(225, 1601705360384, 'CreateProductVarientTable1601705360384'),
(228, 1601872052590, 'AddColumnForSkuIdInProduct1601872052590'),
(230, 1602321897451, 'AddColumnInVendorTable1602321897451'),
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
(241, 1604489633939, 'AddColumnInVendorOrder1604489633939'),
(242, 1604489661088, 'CreateSettlementTable1604489661088'),
(243, 1604489717068, 'CreateSettlementItemTable1604489717068'),
(244, 1605506261235, 'AddColumnInOrderTable1605506261235'),
(245, 1605507026632, 'AddColumnInProductTable1605507026632'),
(246, 1605683473618, 'AddColumnInPageTable1605683473618'),
(247, 1605690489407, 'AlterColumnInVendor1605690489407'),
(248, 1606204705980, 'AlterColumnInPageGroup1606204705980'),
(249, 1606228347336, 'CreatePageGroupTable1606228347336'),
(250, 1601270366765, 'CreateWidgetTable1601270366765'),
(251, 1601270946009, 'CreateWidgetItemTable1601270946009'),
(255, 1602071485447, 'CreateSiteFilter1602071485447'),
(256, 1602071536592, 'CreateSiteFilterCategory1602071536592'),
(257, 1602071563034, 'CreateSiteFilterSection1602071563034'),
(258, 1602071583209, 'CreateSiteFilterSectionItem1602071583209'),
(259, 1603262686439, 'AddColumnInSiteFilterSection1603262686439'),
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
(280, 1644837174266, 'AddingColumnInBanner1644837174266'),
(281, 1647401862825, 'AddWidgetMenu1647401862825'),
(282, 1647402175581, 'AddWidgetPermission1647402175581'),
(283, 1648189427635, 'AddingColumnsInVendorProductTable1648189427635'),
(284, 1648191425392, 'AddConstraintForVendorProduct1648191425392'),
(285, 1648191952576, 'AddOwnerColumnInProduct1648191952576'),
(286, 1648193000936, 'AddCommonColumnInProduct1648193000936'),
(287, 1648193185818, 'AddaColumnInSku1648193185818'),
(288, 1649676398134, 'AddColumnInCustomerCart1649676398134'),
(289, 1650361956965, 'AlterColumnKeywordInProductTable1650361956965'),
(290, 1651477208155, 'CreateVendorGroupTable1651477208155'),
(291, 1651483780710, 'AddColumnToVendorTable1651483780710'),
(292, 1651497313763, 'AddColumnToVendorGroupTable1651497313763'),
(293, 1652418662962, 'AddColumntoVendorGroup1652418662962'),
(294, 1652434662581, 'CreateVendorGroupCategoryTable1652434662581'),
(295, 1652791828125, 'AddColumnToVendorTable1652791828125'),
(296, 1653556618413, 'DropColumnInVendorGroupTable1653556618413'),
(297, 1653559095446, 'AddConstraintInVendorCategoryGroupTable1653559095446'),
(298, 1654338253531, 'AddingColumnInProductTable1654338253531'),
(299, 1655465438730, 'AddColumnInOrderStatus1655465438730'),
(300, 1656050135474, 'CreateTableVendorContact1656050135474'),
(301, 1656050689819, 'AddingConstraintInVendorContactTable1656050689819'),
(302, 1656753952109, 'AlterColumnPaymentInformationInPaymentArchiveTable1656753952109'),
(303, 1657012239912, 'AlterColumnsInSkuTable1657012239912'),
(304, 1657012922452, 'AlterColumnInProductTable1657012922452'),
(305, 1657176040087, 'AlterColumnInVendorContactTable1657176040087'),
(306, 1666440763235, 'AddColumnInSettings1666440763235'),
(307, 1667051145596, 'CreatePluginTable1667051145596'),
(308, 1667214458860, 'AddWidgetPlugin1667214458860'),
(309, 1667634072267, 'DropColumnInProductTable1667634072267'),
(310, 1647263878759, 'AddBlogsPermissionGroupData1647263878759'),
(311, 1647264994076, 'AddBlogsMenu1647264994076'),
(312, 1651294960594, 'CreateBlogCategory1651294960594'),
(313, 1651295328465, 'CreateBlogCategoryPath1651295328465'),
(314, 1651310850012, 'AddConstraintInBlogCategoryPath1651310850012'),
(315, 1651473763023, 'AddingColumnInBlogCategory1651473763023'),
(316, 1651491997947, 'AddConstraintInBlogTable1651491997947'),
(317, 1664960579010, 'CreateSeoTable1664960579010'),
(318, 1665120872278, 'AddSeoMenu1665120872278'),
(319, 1665122641263, 'AddColumnInPluginTable1665122641263'),
(320, 1665123762673, 'AddSeoDataPlugin1665123762673'),
(321, 1665133624567, 'AddBlogDataPlugin1665133624567'),
(322, 1665135644842, 'AddWidgetPlugin1665135644842'),
(323, 1666091900094, 'AddColumnInPluginTable1666091900094'),
(324, 1678774917380, 'CreateSiteMap1678774917380'),
(325, 1674449652221, 'AddIpColumntoCustomerCart1674449652221'),
(326, 1674815408760, 'AddColumnShowHomePageWidgetInWidgetTable1674815408760'),
(328, 1679295983234, 'AddColumnShowHomePageWidget1679295983234'),
(329, 1546513939917, 'AddColumnPluginTimestampInPlugin1546513939917'),
(392, 1676697134335, 'GmapUpdateSettingColumn1676697134335'),
(399, 1679895949882, 'AddPluginTimestampInBlogs1679895949882'),
(412, 1679898902620, 'AddPluginTimestampInSeo1679898902620'),
(413, 1679900284517, 'AddPluginTimestampInWidget1679900284517'),
(415, 1680158996121, 'SiteFilterTable1680158996121'),
(416, 1680164844544, 'SiteFilterCategoryTable1680164844544'),
(417, 1680166368790, 'SiteFilterSectionTable1680166368790'),
(418, 1680168497836, 'SiteFilterSectionItemTable1680168497836'),
(421, 1685946242614, 'CreateTableLiveAddress1685946242614'),
(426, 1680166368791, 'AddColumnInSiteFilterSection1680166368791'),
(427, 1546529746397, 'CreateProductRelatedTable1546529746397'),
(428, 1546578412979, 'AddProductRelatedRelationToProductTable1546578412979'),
(429, 1546585460413, 'AddProductRatingRelationToProductTable1546585460413'),
(430, 1557134963328, 'AddColumnInProductRating1557134963328'),
(431, 1561108919611, 'CreatePaypalOrderTable1561108919611'),
(432, 1561109413675, 'CreatePaypalOrderTransactionTable1561109413675'),
(433, 1566470391895, 'AlterColumnInRating1566470391895'),
(434, 1581676736347, 'CreateRazorpayOrderTable1581676736347'),
(435, 1581677738757, 'CreateRazorpayOrderTransactionTable1581677738757'),
(436, 1584619773432, 'CreateTableProductQuestionTable1584619773432'),
(437, 1584619809783, 'CreateTableProductAnswerTable1584619809783'),
(438, 1585290132090, 'AddColumnInProductAnswer1585290132090'),
(439, 1585290188288, 'CreateProductAnswerLikeAndDislike1585290188288'),
(440, 1585563990633, 'AddColumnInAnswerTable1585563990633'),
(441, 1587374669032, 'CreateReportReason1587374669032'),
(442, 1587374782552, 'CreateReportAbuseTable1587374782552'),
(443, 1590492340558, 'CreateQuoteTable1590492340558'),
(444, 1601301669203, 'CreateAttributeGroup1601301669203'),
(445, 1601357631903, 'CreateAttributeTable1601357631903'),
(446, 1601365110925, 'CreateProductAttribute1601365110925'),
(453, 1623221099845, 'CreateStripeOrder1623221099845'),
(454, 1623221600927, 'CreateStripeOrderTranscation1623221600927'),
(455, 1641189682270, 'AddRatingAndReviewMenu1641189682270'),
(456, 1646744547224, 'AddQuestionAndAnswerMenu1646744547224'),
(457, 1646811259929, 'AddRatingPermissionGroupData1646811259929'),
(458, 1646811277751, 'AddQuestionPermissionGroupData1646811277751'),
(459, 1646814059054, 'AddAnswerPermissionModuleData1646814059054'),
(460, 1648018102673, 'AddPaypalData1648018102673'),
(461, 1648122529616, 'AddStripeData1648122529616'),
(462, 1648125221707, 'AddRazorPayData1648125221707'),
(463, 1648273183310, 'AddFacebookData1648273183310'),
(464, 1648273222013, 'AddGmailData1648273222013'),
(465, 1649151404774, 'AddSeedForQuestionAndAnswerEmail1649151404774'),
(466, 1649825602663, 'AddingSeedForAnswerAbuseReason1649825602663'),
(467, 1651493128935, 'AddProductAttributeMenu1651493128935'),
(468, 1652090802906, 'AddProductRelatedMenu1652090802906'),
(469, 1654325712418, 'AddProductAttributePermissionGroupData1654325712418'),
(470, 1654335454803, 'AddAttributePermissionGroupData1654335454803'),
(471, 1654335942719, 'AddAttributePermissionGroupData1654335942719'),
(472, 1654336590012, 'AddAttributeMenu1654336590012'),
(473, 1654580494430, 'AddVariantPermissionGroupData1654580494430'),
(474, 1654583696842, 'AddProductVariantPermissionGroupData1654583696842'),
(475, 1654586178962, 'AddSeedForProductQuotationEmail1654586178962'),
(476, 1654598244859, 'AddProductVariantMenu1654598244859'),
(477, 1654600327989, 'AddCommonProductCatalogPermissionGroupData1654600327989'),
(478, 1654601588342, 'AddCommonProductCatalogMenu1654601588342'),
(479, 1654603871658, 'AddQuotationGroupPermissionData1654603871658'),
(480, 1654604414823, 'AddProductQuotationMenu1654604414823'),
(481, 1654605354974, 'AddRelatedProductsPermissionGroupData1654605354974'),
(483, 1665134310790, 'AddProductAttributePlugin1665134310790'),
(484, 1665134458498, 'AddProductQuotationPlugin1665134458498'),
(485, 1665134575737, 'AddProductRelatedPlugin1665134575737'),
(486, 1665134686072, 'AddProductvariantPlugin1665134686072'),
(487, 1665135279238, 'AddQuestiomAndAnswerPlugin1665135279238'),
(488, 1665135474947, 'AddRatingAndReviewPlugin1665135474947'),
(489, 1678963492425, 'AddAbandonedCartPlugin1678963492425'),
(494, 1679895203900, 'AddPluginTimestampInAbandonedCart1679895203900'),
(496, 1679896672264, 'AddPluginTimestampInFacebook1679896672264'),
(497, 1679896958285, 'AddPluginTimestampInGmail1679896958285'),
(498, 1679897095718, 'AddPluginTimestampInPaypal1679897095718'),
(499, 1679897259836, 'AddPluginTimestampInRazorpay1679897259836'),
(500, 1679897370508, 'AddPluginTimestampInStripe1679897370508'),
(501, 1679897502849, 'AddPluginTimestampInProductAttribute1679897502849'),
(502, 1679897629895, 'AddPluginTimestampInProductQuotation1679897629895'),
(503, 1679898179430, 'AddPluginTimestampInProductRelated1679898179430'),
(504, 1679898444607, 'AddPluginTimestampInProductVariants1679898444607'),
(505, 1679898582528, 'AddPluginTimestampInQuestionAndAnswer1679898582528'),
(506, 1679898788153, 'AddPluginTimestampInRatingAndReview1679898788153'),
(513, 1689683250355, 'AbandonedCartMailTemplate1689683250355'),
(514, 1687862122458, 'AddProductQRcodeTable1687862122458'),
(515, 1691219734490, 'AddColumVendorProduct1691219734490'),
(516, 1692266396976, 'CreateVendorDocumentLog1692266396976'),
(517, 1692960987178, 'VendorProductAdditionalFileTable1692960987178'),
(520, 1694433986443, 'AddProductQrcodePlugin1694433986443'),
(521, 1697697385554, 'AddVendorColumn1697697385554'),
(522, 1700039888469, 'AddColumndynamicRefEmailTemplateTable1700039888469'),
(526, 1601550779014, 'CreateVarientTable1601550779014'),
(527, 1601550886508, 'CreateVarientValueTable1601550886508'),
(528, 1601705360385, 'CreateProductVarientTable1601705360385'),
(529, 1601705423047, 'CreateProductVarientOptionTable1601705423047'),
(530, 1601705435996, 'CreateProductVarientOptionDetailTable1601705435996'),
(531, 1601878661497, 'CreateProductVarientOptionImage1601878661497'),
(532, 1702961616255, 'CreateTableAttribute1702961616255'),
(533, 1703138181638, 'AddSettingsColumn1703138181638'),
(534, 1703654765393, 'AddColumnInAttributeTable1703654765393'),
(535, 1703677054713, 'CreateTableApecTOAttr1703677054713'),
(536, 1703851402775, 'UpdateSeoDataPlugin1703851402775'),
(537, 1703918268729, 'AddCustomerTableColumn1703918268729'),
(538, 1704372342483, 'CreateExportLog1704372342483'),
(539, 1707119575142, 'AddColumnZoneIdState1707119575142'),
(540, 1679032959092, 'CreateCouponTable1679032959092'),
(541, 1679033604526, 'CreateCouponUsageTable1679033604526'),
(542, 1679033767307, 'CreateCouponUsageProductTable1679033767307'),
(543, 1679034454853, 'CreateCouponProductCategoryTable1679034454853'),
(545, 1683613536335, 'CreateTableChatLog1683613536335'),
(546, 1685097767676, 'AddColumnIsReadInChatLogTable1685097767676'),
(548, 1687516115660, 'AddColumnMessageIdInChatLogTabl1687516115660'),
(549, 1688625210118, 'AlterColumnDatatype1688625210118'),
(551, 1679896266608, 'AddPluginTimestampInCommonCatalog1679896266608'),
(552, 1710398543518, 'AddColumnWidgetLongTitle1710398543518'),
(553, 1665133966736, 'AddCommonCatalogDataPlugin1665133966736'),
(554, 1680073626615, 'AddCouponInPluginTable1680073626615'),
(555, 1686824936626, 'AddChatIntoPluginTable1686824936626'),
(556, 1711168757035, 'AdddefaultLanguageInsettingTable1711168757035'),
(557, 1711542154784, 'CreateTblProductTranslation1711542154784'),
(558, 1711609364591, 'CategoryTranslation1711609364591'),
(559, 1711775120959, 'AttributeTranslation1711775120959'),
(560, 1711776174354, 'AttributeValueTranslation1711776174354'),
(561, 1711946846215, 'CreateAttributeGroupTranslationTable1711946846215'),
(562, 1712054539417, 'CreateWidgetTranslationTable1712054539417'),
(563, 1712142488560, 'BlogTranslation1712142488560'),
(564, 1712143562228, 'BlogCategoryTranslation1712143562228'),
(565, 1712382292716, 'CreateVariantTranslationTable1712382292716'),
(566, 1712320905661, 'PageTranslation1712320905661'),
(567, 1712321518092, 'PageGroupTranslation1712321518092'),
(568, 1712563427985, 'SpecificationTranslation1712563427985'),
(569, 1712647310678, 'AddSpecAttrGroupAttrTranslationPlugin1712647310678'),
(570, 1712648379392, 'AddVariantsTranslationPlugin1712648379392'),
(571, 1713940499022, 'UpdateSpecificationPluginRoute1713940499022'),
(572, 1714110125130, 'UpdateVariantsPlugin1714110125130'),
(573, 1714461142630, 'UpdateProductAttributePlugin1714461142630'),
(574, 1715666127193, 'CreateTableCustomerToGroup1715666127193'),
(575, 1715684250379, 'UpdateCustomerGroupTable1715684250379'),
(576, 1715685174910, 'CreateCustomerToGroupTable1715685174910'),
(577, 1715685591512, 'CreateVendorPriceGroupTable1715685591512'),
(578, 1715689275876, 'CreateVendorCustomerPriceTable1715689275876'),
(579, 1715689892997, 'CreateVendorCustomerGroupPriceTable1715689892997'),
(580, 1715693257084, 'CreateVendorPriceGroupDetailTable1715693257084'),
(581, 1715758772087, 'CreateRegistrationOtpTable1715758772087'),
(582, 1715775337231, 'AddOtpMailTemplatrSed1715775337231'),
(583, 1715835790108, 'AddColumnPriceTypeInProduct1715835790108'),
(584, 1715845967098, 'AddCustomerRegisterationTemplate1715845967098'),
(585, 1715853615410, 'AddIsDeleteCustomerGroupTable1715853615410'),
(586, 1715864129249, 'CreateVendorPriceGroupScheduleTable1715864129249'),
(587, 1715925455569, 'AddColumCustomerTable1715925455569'),
(588, 1715921959805, 'AddVendorPriceGroupPLugin1715921959805'),
(589, 1716011566603, 'AddDataEmailTemplate1716011566603'),
(590, 1716011979609, 'AlterProductIdtoSkuPriceGroup1716011979609'),
(591, 1716014617581, 'AddColumnAddressTable1716014617581'),
(592, 1716373866003, 'AddChangeMailTemplateSeed1716373866003'),
(593, 1716375063741, 'AddColumnCustoerTable1716375063741'),
(597, 1716446010493, 'AddColumnProductTable1716446010493'),
(598, 1716458523533, 'AddPluginSeedForQuotation1716458523533'),
(599, 1716633056223, 'AddQuotationDeleteTbl1716633056223'),
(600, 1712926457994, 'CreateTblQuotation1712926457994'),
(601, 1712928203183, 'CreateTblQuotationProduct1712928203183'),
(602, 1712991555525, 'CreateTblVendorQuotation1712991555525'),
(603, 1714024644076, 'AddPluginWebhook1714024644076'),
(604, 1714025757863, 'CreateWebHookTable1714025757863'),
(605, 1716199870151, 'AddColumnVerificationStatusInVendor1716199870151'),
(606, 1716202520406, 'AddColumnVerificationInVendor1716202520406'),
(607, 1716271072668, 'CreateTableDocument1716271072668'),
(608, 1716271269831, 'CreateTableVendorDocument1716271269831'),
(609, 1716353975812, 'AddVendorVerificationJsonValueToAllVendor1716353975812'),
(610, 1716354834569, 'AddDocumentDataMaster1716354834569'),
(611, 1716363600120, 'AddColumnIsDeleteInVendorDocument1716363600120'),
(612, 1716462022415, 'AddSpecificationTypeInPlugin1716462022415'),
(613, 1716801716410, 'RemoveColumnProductSpecToAttrGroup1716801716410'),
(614, 1716809379847, 'AddColumnIsVerifiedInVendorDocument1716809379847'),
(615, 1716880934372, 'AddVendorEmailVerification1716880934372'),
(616, 1716976892696, 'CreateSupplierTable1716976892696'),
(617, 1716978089770, 'CreateSupplierContactTable1716978089770'),
(618, 1716978585547, 'CreateSupplierLinkDocTable1716978585547'),
(619, 1717050025980, 'AddAdminProductReject1717050025980'),
(620, 1717064688092, 'CreateIndustryTable1717064688092'),
(621, 1717065236250, 'AddIndustryIdInVendorTable1717065236250'),
(622, 1717068016458, 'AddGenderDobColumnInCustomer1717068016458'),
(623, 1717069088330, 'AddBankAccountDetailJsonColInVendorTable1717069088330'),
(624, 1717150824531, 'CreateContatcSellerEmailTemplate1717150824531'),
(625, 1717141652075, 'UpdateProductAttributePlugin1717141652075'),
(626, 1717141959627, 'AlterColumnNameVendor1717141959627'),
(627, 1717148588331, 'AddColumnVendorTable1717148588331'),
(628, 1717154751587, 'AddchangeMailTemplate1717154751587'),
(629, 1717158358806, 'AddVendorOnboardRejection1717158358806'),
(630, 1717159772824, 'AddVideoColumnInProductRating1717159772824'),
(631, 1717216280646, 'AddValuesInPermissionModelGroup1717216280646'),
(632, 1717222841092, 'AddPermissionModuleValuesAndFk1717222841092'),
(633, 1717417900981, 'AddColumnVendorTable1717417900981'),
(634, 1717499751366, 'AlterColumnCustomerCartCustomerIdNull1717499751366'),
(635, 1717572990987, 'AddColumnVendorTable1717572990987'),
(636, 1717582654864, 'UpdateBankDetailJsonColumn1717582654864'),
(637, 1717672050965, 'AlterColumnSupplierLinkDoc1717672050965'),
(638, 1717672342264, 'AlterColumnSupplierTable1717672342264'),
(639, 1717756512442, 'AlterColumnSupplierDocTable1717756512442'),
(640, 1717756673947, 'AlterColumnSupplierDocLinkTable1717756673947'),
(641, 1718001958403, 'UpdateAttributeAddonUrl1718001958403'),
(642, 1718002897826, 'AddColumnAddressTable1718002897826'),
(643, 1718003184646, 'AddColumnIsGuestCheckoutInSettings1718003184646'),
(644, 1718004573878, 'AddColumnVendorTable1718004573878'),
(645, 1718013108481, 'AlteCapabilitierColumnVendorTable1718013108481'),
(646, 1718019286973, 'AddColumnVendorTable1718019286973'),
(647, 1718023215056, 'CreateTableVendorMedia1718023215056'),
(648, 1718025379166, 'AlterCascadeOnDeleteOnUpdateProductToSpecification1718025379166'),
(649, 1718082476223, 'RenameColumnVendorMedia1718082476223'),
(650, 1718089044993, 'AddColunmVvendorMediaTable1718089044993'),
(651, 1718187816848, 'AddTriggerFunctionsForProductHighlights1718187816848'),
(652, 1718169436453, 'AddColumnVendorDocument1718169436453'),
(653, 1718169933346, 'AddDataDocumentTable1718169933346'),
(654, 1718170831118, 'RenameColumnVendorMedia1718170831118'),
(655, 1718198178505, 'AlterColumnOrderTable1718198178505'),
(656, 1718254680960, 'DropForignKeyColumnOrderTable1718254680960'),
(657, 1718257060999, 'DropForignKeyColumnOrderLogTable1718257060999'),
(658, 1718368710840, 'AddColumnVendorTable1718368710840'),
(659, 1718606500309, 'UpdateForgotPasswordLinkContant1718606500309'),
(660, 1718687733730, 'AddColumnVendorMediaTable1718687733730'),
(661, 1718713115041, 'AlterIpColumnInorderAndOrderLog1718713115041'),
(662, 1718717463861, 'AlterColumnInorderCurrency1718717463861'),
(663, 1718718044258, 'AlterColumnInorderLogCurrency1718718044258'),
(664, 1719829703716, 'AddOauthEmailTemplate1719829703716'),
(665, 1719997921913, 'AddEmailTemplateLogo1719997921913'),
(666, 1720007309022, 'AddColumnPriceGroupDetail1720007309022'),
(667, 1719636651766, 'UpdateAddonUrlV21719636651766'),
(668, 1720096496973, 'ChangeProductSpecialColumnChanges1720096496973'),
(669, 1720503529178, 'DropForignKeyCustomerCartTable1720503529178'),
(670, 1720699605974, 'VendorContactMailTemplate1720699605974'),
(671, 1720696823268, 'AddEmailNotificationTemplate1720696823268'),
(672, 1721040070252, 'AlterQuotationPluginTable1721040070252'),
(673, 1721284693208, 'VendorVerificationSuccessMailTemplet1721284693208'),
(674, 1721386215732, 'AddCouponPluginSeed1721386215732'),
(675, 1721049011047, 'UpdateVendorCustomerForeignKey1721049011047'),
(676, 1721808738857, 'AlterCustomerTableColumn1721808738857'),
(677, 1721973997475, 'AlterIndustryTable1721973997475'),
(678, 1721977012629, 'AddIndustryTableData1721977012629'),
(679, 1721986539323, 'AddColumnInProductVariantOptionImage1721986539323'),
(680, 1722339677856, 'AddCollumVendorTable1722339677856'),
(681, 1722429342058, 'AlterForgotPasswordLinkEmailTemplate1722429342058'),
(682, 1722491768166, 'UpdateVendorTable1722491768166'),
(683, 1722602389023, 'AlterForgotPasswordLinkEmailTemplateIssue1722602389023'),
(687, 1724489078178, 'TruncateOrderStatusTable1724489078178'),
(688, 1724649879628, 'AddColumnPermissionModule1724649879628'),
(689, 1724654771491, 'UpdateDataIslistPermissionModule1724654771491'),
(690, 1724666603680, 'AddOrderStatusData1724666603680'),
(691, 1724760533135, 'AddRouteRatingReview1724760533135'),
(692, 1725367849558, 'AddColumnPlugin1725367849558'),
(693, 1725368681950, 'AddPluginDisplayData1725368681950'),
(694, 1725963267756, 'AddPriceGroupDetailIdToOrderProduct1725963267756'),
(695, 1726146037222, 'AlterEmailTemplateVendorRegisteration1726146037222'),
(696, 1726149005488, 'AlterEmailTemplateVendorVerifyMail1726149005488'),
(697, 1726206626353, 'AlterEmailTemplateVendorVerification1726206626353'),
(698, 1726307730509, 'AlterCustomerRegistrationTemplate1726307730509'),
(699, 1726309456007, 'AlterSellerRegistrationTemplate1726309456007'),
(700, 1726311123125, 'AlterAdminCustomerCreateTempate1726311123125'),
(701, 1726465462272, 'AlterSellerVerificationTemplate1726465462272'),
(702, 1726466756648, 'AlterAdminOrderTemplate1726466756648'),
(703, 1726467388219, 'AlterAdminCreateUserTemplate1726467388219'),
(704, 1726470749931, 'AlterContactUsTemplate1726470749931'),
(705, 1726893346606, 'AddLogoColumnsSettings1726893346606'),
(706, 1727094229451, 'AddColumnOrderTable1727094229451'),
(707, 1727156005915, 'AddColumnSkuBackOrderStockLimit1727156005915'),
(708, 1727171401500, 'AddColumnVendorProduct1727171401500'),
(709, 1727180128237, 'AddColumnfullfillmentStatusId1727180128237'),
(710, 1727258601223, 'AddColumnOrderProductTag1727258601223'),
(711, 1727501360353, 'AlterColumnRejectReasonLog1727501360353'),
(712, 1727516617880, 'CreateTableOrderFullFillmentStatus1727516617880'),
(713, 1727516708604, 'CreateTableOrderStatustoFullFillmentStatus1727516708604'),
(714, 1728276424858, 'AddIsActiveAndDeleteInVendor1728276424858'),
(715, 1728280823149, 'AlterColumnBannerPositionToString1728280823149'),
(716, 1728880841502, 'AddColumnKycVendor1728880841502'),
(717, 1728369673531, 'CreateBannerImage1728369673531'),
(718, 1729079210120, 'AddColumnCreatedAndModifiedDateCountryTable1729079210120'),
(719, 1729081065564, 'AddColumnCreatedAndModifiedDateIndustryTable1729081065564'),
(720, 1729166794554, 'AddPluginSupplierManagement1729166794554'),
(721, 1729490178800, 'AddSlugNamePermissionModuleTable1729490178800'),
(722, 1729572900240, 'AlterPluginNamePricingGroup1729572900240'),
(723, 1729664742399, 'AddGmapSlugnamePluginsTable1729664742399'),
(728, 1729834906906, 'ChangeDisplayNameBlogAddon1729834906906'),
(729, 1729847672248, 'ChangeOauthPluginName1729847672248'),
(730, 1729849370507, 'AddSiteMapPluginUrl1729849370507'),
(731, 1732273657099, 'UpdateRowCustomerWordToBuyerInPermmisionModules1732273657099'),
(732, 1732520852749, 'AddSeoPermissionModule1732520852749'),
(733, 1732521508422, 'AddSellerGroupPermissionModule1732521508422'),
(734, 1732621428711, 'AddAddonSettingPermission1732621428711'),
(735, 1732687090046, 'UpdateVendorToSellerNamePermission1732687090046'),
(736, 1732687359333, 'RemoveDocumentPermissionModule1732687359333'),
(737, 1732863438138, 'RemoveMarketplacePermission1732863438138'),
(738, 1733402679634, 'AddForeignKeyToPermissionModule1733402679634'),
(739, 1733402809834, 'RemoveUnwantedPermissionModule1733402809834'),
(740, 1733553848401, 'AddIndustryIdToCategory1733553848401'),
(741, 1733808519425, 'SetIndustryIdToNull1733808519425'),
(742, 1733893642906, 'UpdateForeignKeyToZero1733893642906'),
(743, 1734335106062, 'AddProductSkuIdInProductRatingTable1734335106062'),
(744, 1734440509387, 'AddColumnProductQuestion1734440509387'),
(745, 1734505243936, 'AddPermissionModuleGroupMarketPlaceProduct1734505243936'),
(746, 1734593959855, 'AddPluginRoutesInRatingAndReview1734593959855'),
(747, 1734594742783, 'AddPermissionModuleGroupSeller1734594742783'),
(748, 1734676241366, 'AddColumnTimeZoneInSettings1734676241366'),
(749, 1734692907834, 'RemoveUnusedPermissionModule1734692907834'),
(750, 1735801417071, 'RemoveDuplicateRecordsInVedorGroupCategory1735801417071'),
(751, 1735984726862, 'AddPluginRouteSupplierManagement1735984726862'),
(752, 1736404694182, 'ExportLogTableAddColumn1736404694182'),
(753, 1736487481075, 'UpdatePaypalSettings1736487481075'),
(754, 1736762882503, 'AddAppIdInVendorTable1736762882503'),
(755, 1737011368393, 'CreateTableVendorPlugin1737011368393'),
(756, 1737028684787, 'CreateTableVendorSetting1737028684787'),
(757, 1737032578345, 'AddTenantInOrderTable1737032578345'),
(759, 1737174820547, 'AddTenantIdInWidget1737174820547'),
(760, 1737189335105, 'AddColumnTenantIdInCustomer1737189335105'),
(761, 1737190253038, 'AddTenantIdInPages1737190253038'),
(762, 1737435674661, 'AddTenantIdInBanner1737435674661'),
(763, 1737436478509, 'AddTenantIdInPageGroupTable1737436478509'),
(764, 1737527852161, 'AddColumnTenantIdInCategory1737527852161'),
(765, 1737532512774, 'AddTenantIdInOrderStatusAndFullfillment1737532512774'),
(766, 1738133353516, 'AddTenantIdInRegistrationOtpTable1738133353516'),
(767, 1738133683062, 'AddTenantIdColumnsAndForeignKey1738133683062'),
(768, 1738214440975, 'AddTenantIdInSpecificationToAttributeGroup1738214440975'),
(769, 1738217173504, 'AddTenantIdInSpecificationAttributeGroupToAttrTable1738217173504'),
(770, 1738838656742, 'RemoveTenantIdInRegistrationUserOtp1738838656742'),
(771, 1738839644907, 'AddStatusIdInOrderStatus1738839644907'),
(772, 1738909044872, 'CreateVendorUserTable1738909044872'),
(773, 1738910305300, 'CreateVendorUserGroupTable1738910305300'),
(774, 1739193645415, 'AddTenantIdVendorBlogs1739193645415'),
(775, 1739273442493, 'AddTenantIdInRegistrationOtpTable1739273442493'),
(776, 1739278436401, 'AddTenantIdInVariant1739278436401'),
(777, 1739346597187, 'AddTenantIdInVendorSiteMap1739346597187'),
(778, 1739353617609, 'AddRoutesForVendorAddons1739353617609'),
(779, 1739442184090, 'AddColumnTenantIdInLanguageTable1739442184090'),
(780, 1739444374971, 'AddColumnTenantIdInCountryTable1739444374971'),
(781, 1739446544526, 'AddColumnTenantIdInZoneTable1739446544526'),
(782, 1739448850669, 'AddColumnTenantIdInCurrencyTable1739448850669'),
(783, 1739449652972, 'AddColumnTenantIdInTaxTable1739449652972'),
(784, 1739451413040, 'CreateVendorAuditLogTable1739451413040'),
(785, 1739529860051, 'AddEmailLogoNamePathInVendorTable1739529860051'),
(786, 1739532231715, 'AddSeoInVendorTable1739532231715'),
(787, 1739594596613, 'AbondonedCartPluginRouteMigration1739594596613'),
(788, 1739596660114, 'AddColumnVendorAuditLog1739596660114'),
(789, 1740547005447, 'AddSellerSettingForUserFive1740547005447'),
(790, 1740566672371, 'RevertTenantIdForLocalizations1740566672371'),
(791, 1740568957990, 'CreateVendorLanguageTable1740568957990'),
(792, 1740569131322, 'CreateVendorCountryTable1740569131322'),
(793, 1740569356178, 'CreateVendorZoneTable1740569356178'),
(794, 1740569889560, 'CreateVendorCurrencyTable1740569889560'),
(795, 1740570047275, 'CreateVendorTaxTable1740570047275'),
(796, 1740647242935, 'AddColumsEmailConfigForVendorSettingsTable1740647242935'),
(797, 1740744172946, 'AddColumSiteNameForVendorSettingsTable1740744172946'),
(798, 1741350438494, 'CreateVendorPermissionModuleGroupTable1741350438494'),
(799, 1741351003115, 'CreateVendorPermissionModuleTable1741351003115'),
(800, 1741583585138, 'AddVendorPermissionModuleTableValue1741583585138'),
(801, 1741585525570, 'AddPermissionBackOrders1741585525570'),
(802, 1741587028399, 'AddPermissionSalesArchiveOrders1741587028399'),
(803, 1741588094649, 'AddPermissionSalesQuotation1741588094649'),
(804, 1741589502735, 'AddPermissionSalesStockUpdate1741589502735'),
(805, 1741590097354, 'AddPermissionSalesVariantStockUpdate1741590097354'),
(806, 1741590597784, 'AddPermissionFailedOrderUpdate1741590597784'),
(807, 1741592391317, 'AddPermissionOrderUpdate1741592391317'),
(808, 1741593069466, 'AddPermissionCatalogProduct1741593069466'),
(809, 1741597410946, 'AddPermissionCatalogRelatedProduct1741597410946'),
(810, 1741598099404, 'AddPermissionCatalogProductLocalization1741598099404'),
(811, 1741598613901, 'AddPermissionCatalogProductPricing1741598613901'),
(812, 1741599273374, 'AddPermissionCatalogProductVariant1741599273374'),
(813, 1741599800446, 'AddPermissionCatalogBulkProductImport1741599800446'),
(814, 1741601538547, 'AddPermissionCustomer1741601538547'),
(815, 1741602205598, 'AddPermissionCustomerGroup1741602205598'),
(816, 1741603591194, 'AddPermissionSupplier1741603591194'),
(817, 1741604213544, 'AddPermissionContact1741604213544'),
(818, 1741756709576, 'AddMissingParamsVendorSettings1741756709576'),
(819, 1741772407483, 'AddColumnSellerLogo21741772407483'),
(820, 1742378927827, 'AddVendorCountryIdInVendorZone1742378927827'),
(821, 1742463072242, 'AddOrderStatusInVendorSetting1742463072242'),
(822, 1742882236563, 'CreateTableTicketCategories1742882236563'),
(823, 1742883898295, 'CreateTableTicket1742883898295'),
(824, 1742886604988, 'CreateTableTicketMessages1742886604988'),
(825, 1742888987584, 'CreateTableTicketAttachments1742888987584'),
(826, 1742893702544, 'CreateTableSupportTicketLogs1742893702544'),
(827, 1743240294043, 'AddColumnCountryInVendorSettings1743240294043'),
(828, 1743423407281, 'AddAttributePluginRoutes1743423407281'),
(829, 1743492053241, 'VariantPluginRoutes1743492053241'),
(830, 1743501594450, 'AddAttributeRoutes1743501594450'),
(831, 1743501715339, 'AddBlogRoutes1743501715339'),
(832, 1743506845652, 'AddFormInfoForTenant1743506845652'),
(833, 1743656893972, 'AddSupportTicketPlugin1743656893972'),
(834, 1743659595214, 'AddIntergrationForShopifyInPlugins1743659595214'),
(835, 1743659828234, 'AddIntergrationForMagentoInPlugins1743659828234'),
(836, 1743659933893, 'AddIntergrationForWooCommerceInPlugins1743659933893'),
(837, 1743682343674, 'UpdateVariantPluginRoutes1743682343674'),
(838, 1743682544869, 'UpdateAttributePluginRoutes1743682544869'),
(839, 1743751850947, 'UpdateVariantsPluginRoutes1743751850947'),
(840, 1744004569710, 'AddColumnAvatarNamePathForVendorPlugin1744004569710'),
(841, 1744005861148, 'UpdateColumnIsEditingForPlugin1744005861148'),
(842, 1744016301114, 'AddPlatformsImageINPlugin1744016301114'),
(843, 1744174053262, 'CreateSupportTicketNotificationEmailTemplate1744174053262'),
(844, 1744191435661, 'UpdateAttributeRouteForPlugin1744191435661'),
(845, 1744866293714, 'CreateTableFamily1744866293714'),
(846, 1744866533034, 'AddColumnCategoryTable1744866533034'),
(847, 1745297724392, 'AddSupportTicketEmailTemplate1745297724392'),
(848, 1745410755827, 'UpdateAttributeRoutes1745410755827'),
(849, 1745918626008, 'AddColumnTenantIdinFilterSite1745918626008'),
(850, 1747200087804, 'ShoppingCartPluginSeed1747200087804'),
(851, 1747200372449, 'CreateShoppingCartTable1747200372449'),
(852, 1747200938997, 'CreateShoppingCartDetailTable1747200938997'),
(853, 1747222588221, 'VendorPluginSeedForTenantEleven1747222588221'),
(854, 1747309242286, 'AddColumnInOrderTable1747309242286'),
(855, 1747644449171, 'CreateTableQuoteRequest1747644449171'),
(856, 1747644729585, 'CreateTableQuoteRequestDetail1747644729585'),
(857, 1747644921541, 'CreateTableQuoteStatus1747644921541'),
(858, 1747646690673, 'AddForigKeyQuoteToStatus1747646690673'),
(859, 1747651403944, 'AddQuoteStatusSeed1747651403944'),
(860, 1747656295450, 'AlterProductVariantSeed1747656295450'),
(861, 1748253432664, 'AlterIsDeleteInShoppingCartDetail1748253432664'),
(862, 1748259864845, 'AddRouteProductAttributePlugin1748259864845'),
(863, 1748323526197, 'UpdateCollumnQuoteRequestTable1748323526197'),
(864, 1748351093477, 'AddRouteForProductAttribute1748351093477'),
(865, 1748427800447, 'AddRfqAndQuotesSeed1748427800447'),
(866, 1748432902153, 'CreateTableQuote1748432902153'),
(867, 1748433168399, 'CreateTableQuoteDetail1748433168399'),
(868, 1748437668047, 'AddQuoteStatusSeed1748437668047'),
(869, 1748513468189, 'AddVendorPluginQuoteRfqSeed1748513468189'),
(870, 1748514150206, 'AlterShoppingCartPluginSeed1748514150206'),
(871, 1749037822455, 'AddEmailTemplate1749037822455'),
(872, 1749279888714, 'AddCollumnIsOrdered1749279888714'),
(873, 1749451857458, 'UpdateWidgetRoutingUrl1749451857458'),
(874, 1749617929731, 'CreateTableCustomerPermissionModule1749617929731'),
(875, 1749618177430, 'CreateTableCustomerPermissionModuleGroup1749618177430'),
(876, 1749618404230, 'CreateTableCustomerUsers1749618404230'),
(877, 1749618682749, 'CreateTableCustomerUsersGroup1749618682749'),
(878, 1749618846753, 'AddForignKeyCustomerPermissionModueToGroup1749618846753'),
(879, 1749619030736, 'AddForignKeyCustomerUserToGroup1749619030736'),
(880, 1749622600781, 'AddCollumnIsVendor1749622600781'),
(881, 1749640060620, 'AddValuesCustomerPermissionModuleGroup1749640060620'),
(882, 1749642512874, 'AddCollumnCustomerTable1749642512874'),
(883, 1749643605443, 'AddValuesCustomerPermissionModule1749643605443'),
(884, 1749645395283, 'AddCollumnLoginAttemptsModelTable1749645395283'),
(885, 1749720666308, 'InsertValuesCustomerUserGroupTable1749720666308'),
(886, 1749796540326, 'UpdateRouteUrlPlugin1749796540326'),
(887, 1750051962853, 'UpdatePluginRoutingUrl1750051962853'),
(888, 1750055934650, 'CreatePaymentTermTable1750055934650'),
(889, 1750066197446, 'AddCollumnShoppingCart1750066197446'),
(890, 1750068444824, 'AddColumnPaymentMethodIdInOrderTable1750068444824'),
(891, 1750136682949, 'CreateTableQuoteRequestMessages1750136682949'),
(892, 1750136786173, 'CreateTableQuoteRequestAttachments1750136786173'),
(893, 1750138549340, 'CreatePaymentMethodTable1750138549340'),
(894, 1750138557474, 'CreatePaymentRuleTable1750138557474'),
(895, 1750141256684, 'AddValuesInPaymentMethodTable1750141256684'),
(896, 1750143887796, 'AddColumnCustomerTable1750143887796'),
(897, 1750149567285, 'AddColumnCustomerGroupTable1750149567285'),
(898, 1750232339891, 'AddCollumnQuoteTable1750232339891'),
(899, 1750243245868, 'CreateTableVendorEmailTemplate1750243245868'),
(900, 1750249402953, 'AddSeedVendorEmailTemplateValues1750249402953'),
(901, 1750250440954, 'AddForignKeyForVendorEmailTemplate1750250440954'),
(902, 1750314290896, 'AddStausValuesQuoteStatusTable1750314290896'),
(903, 1750334765183, 'AddCollumnQuoteTable1750334765183'),
(904, 1750681938260, 'AddCollumnQuoteTable1750681938260'),
(905, 1750829781467, 'AddCollumnCustomerTable1750829781467'),
(906, 1751107028827, 'AddCollumnQuoteStatusTable1751107028827'),
(907, 1751269405707, 'UpdateWidgetPluginRoutes1751269405707'),
(908, 1751352779017, 'UpdatePluginRouteUrl1751352779017'),
(909, 1751354061776, 'AddVendorPluginSupportSeed1751354061776'),
(910, 1751354996136, 'UpdatePluginRouteUrl1751354996136'),
(911, 1751355324996, 'UpdatePluginRouteUrl1751355324996'),
(912, 1751361507947, 'UpdatePluginRouteUrl1751361507947'),
(913, 1751433314017, 'UpdateConteactUsEmailTemplate1751433314017'),
(914, 1751523565391, 'UpdatePluginProductVariant1751523565391'),
(915, 1751533976964, 'AddCollumnCustomerUser1751533976964'),
(916, 1751967909840, 'AddCollumnOrderTable1751967909840'),
(917, 1751977451551, 'AddCollumnPaymentMehthodTable1751977451551'),
(918, 1752046053120, 'UpdateOrderTableCollumn1752046053120'),
(919, 1752478019204, 'AddCollumnQuotesTable1752478019204'),
(920, 1752492521165, 'TruncateTableVendorPermissionTableModuleAndGroup1752492521165'),
(921, 1752496597716, 'AddValuesVendorPermissionModuleGroup1752496597716'),
(922, 1752496613651, 'AddValuesVendorPermissionModule1752496613651'),
(923, 1752573243442, 'AddVendorPermission1752573243442'),
(924, 1752574536542, 'AddVendorPermission1752574536542'),
(925, 1752576432537, 'AddVendorPermission1752576432537'),
(926, 1752579400301, 'AddVendorPermission1752579400301'),
(927, 1752580068504, 'AddVendorPermission1752580068504'),
(928, 1752581987885, 'AddVendorPermission1752581987885'),
(929, 1752582506302, 'AddVendorPermissionRatingAndReview1752582506302'),
(930, 1752582963625, 'AddVendorPermissionSeo1752582963625'),
(931, 1752583875494, 'AddVendorPermissionWidget1752583875494'),
(932, 1752584129916, 'AddVendorPermissionSupport1752584129916'),
(933, 1752584905864, 'AddVendorPermissionShoppingCart1752584905864'),
(934, 1752642396171, 'AddVendorPermissionRfq1752642396171'),
(935, 1752643018362, 'AddVendorPermissionQupte1752643018362'),
(936, 1752645853180, 'AddCollumnVendorUser1752645853180'),
(937, 1752818872601, 'CreateCustomerContact1752818872601'),
(938, 1753254794262, 'AddCollumnEmailTemplate1753254794262'),
(939, 1753265795713, 'AddNewUserVendorEmailTemplate1753265795713'),
(940, 1753700307830, 'AddCollumnCustomerUsers1753700307830'),
(941, 1754054109545, 'UpdatePluginRoute1754054109545'),
(942, 1754310785180, 'UpdateIndustryTable1754310785180'),
(943, 1754459919091, 'UpdateValueIsSimplified1754459919091'),
(944, 1754463094119, 'AddCollumnVendorTable1754463094119'),
(945, 1755064014102, 'AddVendorPermissionModuleValue1755064014102'),
(946, 1755065751853, 'AddVendorPermissionModuleValue1755065751853'),
(947, 1755067806001, 'AddVendorPermissionModuleValue1755067806001'),
(948, 1755167272485, 'AddColumnOrderTable1755167272485'),
(949, 1756895918747, 'RemoveIndustryValueIndustryTable1756895918747');
INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(950, 1757150344880, 'RemoveForignKeyInPageGroupTranslation1757150344880'),
(951, 1757314741823, 'RemoveForignKeyInWidgetTranslation1757314741823'),
(952, 1757495134782, 'AddColumnCustomerTaxNumber1757495134782'),
(953, 1758196071107, 'ChangeForeignKeyProductTranslation1758196071107'),
(954, 1758349487114, 'ChangeVendorSettingsCurrencyReftoMaster1758349487114'),
(955, 1758544832640, 'RemoveUnwantedDataLanguageTable1758544832640'),
(956, 1758184050380, 'AddCoulumnInVendor1758184050380'),
(957, 1758884772850, 'AlterExportLogTable1758884772850'),
(958, 1759151537321, 'AddColumnsQuoteTable1759151537321'),
(959, 1759212923317, 'UpdateOrderStatusTable1759212923317'),
(960, 1759228225656, 'UpdateOrderStatusTableValue1759228225656'),
(961, 1737091346152, 'CreateProductRatingImagesTable1737091346152'),
(962, 1759473324949, 'UpdateProductHasStockStatus1759473324949'),
(963, 1759475774363, 'UpdateRatingAndReviewRoutingParam1759475774363'),
(964, 1759748022562, 'AddColumnsQuoteTable1759748022562'),
(965, 1759747314937, 'CreateOrderArchive1759747314937'),
(966, 1759747340541, 'CreateOrderArchiveLog1759747340541'),
(967, 1759747354122, 'CreateOrderProductArchive1759747354122'),
(968, 1759749550194, 'CreateColumnOrderIdInVenPayment1759749550194'),
(969, 1759750022992, 'CreateColumnOrderIdInVenPayment1759750022992'),
(970, 1759750988904, 'CreateColumnOrderLogIdInOrderArchiveLog1759750988904'),
(971, 1759838443728, 'DropForignKeyInVendorOrder1759838443728'),
(972, 1759823418124, 'UpdatePluginStatusAbandonedCart1759823418124'),
(973, 1759829231455, 'UpdatePluginStatusChat1759829231455'),
(974, 1759829552472, 'UpdatePluginStatusCommonCatalog1759829552472'),
(975, 1759829955170, 'UpdatePluginStatusCoupon1759829955170'),
(976, 1759830146797, 'UpdatePluginStatusMagento1759830146797'),
(977, 1759830408290, 'UpdatePluginStatusShopify1759830408290'),
(978, 1759830577129, 'UpdatePluginStatusWooCommerce1759830577129'),
(979, 1759830856875, 'UpdatePluginStatusPaypal1759830856875'),
(980, 1759831248027, 'UpdatePluginStatusRazorpay1759831248027'),
(981, 1759831597774, 'UpdatePluginStatusStripe1759831597774'),
(982, 1759832288147, 'UpdatePluginStatusProductQuotation1759832288147'),
(983, 1759832519058, 'UpdatePluginStatusSupplierManagement1759832519058'),
(984, 1759832711956, 'UpdatePluginStatusSupportTicket1759832711956'),
(985, 1759833086818, 'UpdatePluginStatusCashOnDelivery1759833086818'),
(986, 1759842096269, 'UpdatePluginBlogs1759842096269'),
(987, 1759842859236, 'UpdatePluginProductAttribute1759842859236'),
(988, 1759843280496, 'UpdatePluginProductPriceGroup1759843280496'),
(989, 1759843547109, 'UpdatePluginProductRelated1759843547109'),
(990, 1759843746988, 'UpdatePluginProductVariant1759843746988'),
(991, 1759843990253, 'UpdatePluginQuestionAnswer1759843990253'),
(992, 1759844194661, 'UpdatePluginRating1759844194661'),
(993, 1759844422580, 'UpdatePluginSeo1759844422580'),
(994, 1759844904925, 'UpdatePluginWidget1759844904925'),
(995, 1759845145514, 'UpdatePluginproductQr1759845145514'),
(996, 1759845323221, 'UpdatePluginGmailFacebook1759845323221'),
(997, 1758865635953, 'CreateTableVendorSettingsDomain1758865635953'),
(998, 1759907407266, 'AlterTableVendorSettingsAddColumsForSub1759907407266'),
(999, 1759923580884, 'AddSeedForVendorSettings1759923580884'),
(1000, 1760089226898, 'UpdatePluginRelatedProduct1760089226898'),
(1001, 1760424013833, 'UpdatePluginStatusGmap1760424013833'),
(1002, 1760516029103, 'UpdateAttributeRoutes1760516029103'),
(1003, 1760521446869, 'AddRouteForPricingGroup1760521446869'),
(1004, 1760597128822, 'UpdateValueInPaymentRule1760597128822'),
(1005, 1760620102289, 'AddColumnProductTable1760620102289'),
(1006, 1761114894942, 'TruncateVendorSettingsDomainTable1761114894942'),
(1007, 1761121855833, 'AddCoulmHideSpurtLogo1761121855833'),
(1008, 1761286504027, 'ChangeForeignKeyCategoryTranslation1761286504027'),
(1009, 1761287456355, 'ChangeForeignKeyAttributeTranslation1761287456355'),
(1010, 1761309964307, 'AddVendorLanguageLocalization1761309964307'),
(1011, 1761555825252, 'UpdateAttributeGroupTranslation1761555825252'),
(1012, 1761557687867, 'UpdateSpecificationTransaltion1761557687867'),
(1013, 1761558835870, 'UpdateBlogTransalation1761558835870'),
(1014, 1761560478223, 'UpdateWidgetTransalation1761560478223'),
(1015, 1761561885036, 'UpdateProductTransalation1761561885036'),
(1016, 1761563116372, 'UpdateVarientTransalation1761563116372'),
(1017, 1761564920664, 'UpdateVarientValueTransalation1761564920664'),
(1018, 1761731743403, 'AddExtraVendorAttributeRoutes1761731743403'),
(1019, 1761722802264, 'RenameNameForSomePermissionGroups1761722802264'),
(1020, 1761807303731, 'AddVendorAttributesRoutesWithFamilies1761807303731'),
(1021, 1761812944875, 'UpdateAttributeRoutes1761812944875'),
(1022, 1761818446529, 'EnableRelatedProductAddon1761818446529'),
(1023, 1761890167663, 'AddExtraTranslationInTable1761890167663'),
(1024, 1761889605215, 'AddExpiryColumnOtpTable1761889605215'),
(1025, 1761995005852, 'AddWidgetId1761995005852'),
(1026, 1762150585222, 'UpdateExportLogColum1762150585222'),
(1027, 1762170520395, 'UpdateSettingsColumns1762170520395'),
(1028, 1762248965512, 'AddWidgetRoutes1762248965512'),
(1029, 1762404989918, 'AddLoginOTPTemplate1762404989918'),
(1030, 1762497632126, 'AddColumDescriptionInPluginTable1762497632126'),
(1031, 1762931956434, 'AddDescriptionVendorPermissionModuleGroup1762931956434'),
(1032, 1763110190796, 'AddColumnInExportLogTable1763110190796'),
(1033, 1763187280984, 'AddColumnInVendorSettingTable1763187280984'),
(1034, 1763447537123, 'AddFooterColumnsToVendorSettings1763447537123'),
(1035, 1763538965985, 'CreateEmailTemplateForSubscription1763538965985'),
(1036, 1763708599276, 'UpdateSmtpEmptyInVendorSettingsTable1763708599276'),
(1037, 1763187289999, 'AddDescriptionColumnInIndustry1763187289999'),
(1038, 1764844336358, 'AddValuesForDescriptionColumnToIndustryTable1764844336358'),
(1039, 1765000351306, 'AttributePluginUrlUpdate1765000351306'),
(1040, 1765179717295, 'UpdateAttributePuginRoutes1765179717295'),
(1041, 1765201656818, 'UpdateEmailTemplateContent1765201656818'),
(1042, 1765261785461, 'UpdateEMailTemplateWithNewContentRecord1765261785461'),
(1043, 1765269964300, 'UpdateEMailTemplateWithNewContentRemainRecord1765269964300'),
(1044, 1765447292069, 'UpdateEmailtemplateIds1765447292069'),
(1045, 1765544093346, 'AddAgricultureIndustry1765544093346'),
(1046, 1765790650280, 'AddNewIndustiesRemainingData1765790650280'),
(1047, 1765539019489, 'AddNewIndustry1765539019489'),
(1048, 1765807233902, 'UpdateIndustrySlug1765807233902'),
(1049, 1765805341315, 'UpdateSlugAndDescForIndustry1765805341315'),
(1050, 1765951831365, 'UpdateDescriptionForNewIndustry1765951831365'),
(1051, 1765947892922, 'UpdateSettingTableSiteName1765947892922'),
(1052, 1766400376128, 'UpdateSocialMediaUrl1766400376128'),
(1053, 1766401120111, 'SignInEmailTemplate1766401120111'),
(1054, 1766569994788, 'UpdatePluginProductAttributeDescrption1766569994788'),
(1055, 1766573426861, 'RevertPluginAttributeDescription1766573426861'),
(1056, 1766990168820, 'UpdateSocialLinkSettingTable1766990168820'),
(1057, 1767159335466, 'UpdateBlogTanslateForginKeyReference1767159335466');

-- --------------------------------------------------------

--
-- Table structure for table `m_seo_meta`
--

CREATE TABLE `m_seo_meta` (
  `seo_id` int NOT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` varchar(255) DEFAULT NULL,
  `meta_tag_keyword` varchar(255) DEFAULT NULL,
  `seo_type` varchar(255) DEFAULT NULL,
  `ref_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `currency_id` int DEFAULT NULL,
  `shipping_zone_id` int DEFAULT NULL,
  `payment_zone_id` int DEFAULT NULL,
  `shipping_country_id` int DEFAULT NULL,
  `payment_country_id` int DEFAULT NULL,
  `invoice_no` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_prefix` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_prefix_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(96) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_firstname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_lastname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_company` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address_1` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address_2` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_city` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_postcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_country` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_zone` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address_format` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `shipping_method` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_firstname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_lastname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_company` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_address_1` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_address_2` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_city` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_postcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_country` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_zone` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_address_format` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payment_method` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `total` decimal(10,2) DEFAULT NULL,
  `reward` int DEFAULT NULL,
  `order_status_id` int DEFAULT NULL,
  `affiliate_id` int DEFAULT NULL,
  `commision` decimal(10,0) DEFAULT NULL,
  `currency_code` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_value` decimal(11,0) DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_flag` int DEFAULT NULL,
  `order_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `currency_symbol_left` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_symbol_right` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_status` int DEFAULT '0',
  `payment_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coupon_code` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_process` int DEFAULT '1',
  `back_orders` int DEFAULT '0',
  `customer_gst_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_mobile_number` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `tenant_id` int NOT NULL,
    `payment_rule_id` int DEFAULT NULL,
  `po_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `must_ship_before` date NOT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_cost_override` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_by_type` enum('buyer','seller') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_source` enum('quote','rfq','shopping-cart','quick-order') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fullfillment_status_id` int DEFAULT NULL,
  `payment_term_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_fulfillment_status`
--

CREATE TABLE `order_fulfillment_status` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `default_status` int DEFAULT NULL,
  `is_admin` int DEFAULT NULL,
  `is_vendor` int DEFAULT NULL,
  `is_buyer` int DEFAULT NULL,
  `is_api` int DEFAULT NULL,
  `color_code` varchar(7) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `tenant_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `order_history_id` int NOT NULL,
  `order_id` int NOT NULL,
  `order_status_id` int NOT NULL,
  `notify` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `comment` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `date_added` datetime DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_log`
--

CREATE TABLE `order_log` (
  `order_log_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `currency_id` int DEFAULT NULL,
  `shipping_zone_id` int DEFAULT NULL,
  `payment_zone_id` int DEFAULT NULL,
  `shipping_country_id` int NOT NULL,
  `payment_country_id` int DEFAULT NULL,
  `invoice_no` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_prefix` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_prefix_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(96) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_firstname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_lastname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_company` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address_1` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address_2` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_city` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_postcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_country` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_zone` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address_format` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `shipping_method` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_firstname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_lastname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_company` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_address_1` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_address_2` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_city` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_postcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_country` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_zone` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_address_format` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payment_method` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `total` decimal(15,2) DEFAULT NULL,
  `reward` int DEFAULT NULL,
  `order_status_id` int NOT NULL,
  `affiliate_id` int DEFAULT NULL,
  `commision` decimal(10,0) DEFAULT NULL,
  `currency_code` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_value` decimal(11,0) DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_flag` int DEFAULT NULL,
  `order_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `orderId` int DEFAULT NULL,
  `order_id` int NOT NULL,
    `payment_rule_id` int DEFAULT NULL,
  `po_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `must_ship_before` date NOT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_cost_override` decimal(10,2) NOT NULL DEFAULT '0.00',
  `order_source` enum('quote','rfq','shopping-cart','quick-order') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by_type` enum('buyer','seller') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fullfillment_status_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_option`
--

CREATE TABLE `order_option` (
  `order_option_id` int NOT NULL,
  `product_option_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `order_product_id` int DEFAULT NULL,
  `product_option_value_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `order_product_id` int NOT NULL,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_price` decimal(15,2) DEFAULT NULL,
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `trace` decimal(15,4) DEFAULT NULL,
  `total` decimal(15,2) DEFAULT NULL,
  `tax` decimal(15,4) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `order_status_id` int NOT NULL,
  `tracking_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_product_prefix_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `tax_type` int DEFAULT NULL,
  `tax_value` int DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT '0.00',
  `discounted_amount` decimal(10,2) DEFAULT NULL,
  `cancel_request` int DEFAULT '0',
  `cancel_request_status` int DEFAULT '0',
  `cancel_reason` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancel_reason_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `varient_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coupon_discount_amount` decimal(16,2) DEFAULT NULL,
  `price_group_detail_id` int DEFAULT NULL,
  `fullfillment_status_id` int DEFAULT NULL,
  `tags` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_product_archive`
--

CREATE TABLE `order_product_archive` (
  `order_product_archive_id` int NOT NULL,
  `order_archive_id` int DEFAULT NULL,
  `order_product_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `order_product_prefix_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `tax_type` int DEFAULT NULL,
  `tax_value` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `discounted_amount` decimal(10,2) DEFAULT NULL,
  `order_status_id` int DEFAULT NULL,
  `fullfillment_status_id` int DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `tracking_url` varchar(255) DEFAULT NULL,
  `tracking_no` varchar(255) DEFAULT NULL,
  `trace` int DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `cancel_request` int DEFAULT NULL,
  `cancel_request_status` int DEFAULT NULL,
  `cancel_reason` varchar(255) DEFAULT NULL,
  `cancel_reason_description` text,
  `is_active` int DEFAULT NULL,
  `sku_name` varchar(255) DEFAULT NULL,
  `coupon_discount_amount` varchar(255) DEFAULT NULL,
  `price_group_detail_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_product_log`
--

CREATE TABLE `order_product_log` (
  `order_product_log_id` int NOT NULL,
  `order_product_id` int NOT NULL,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_price` decimal(15,2) DEFAULT NULL,
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL,
  `trace` decimal(15,4) DEFAULT NULL,
  `total` decimal(15,4) NOT NULL,
  `tax` decimal(15,4) DEFAULT NULL,
  `order_status_id` int DEFAULT NULL,
  `tracking_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int NOT NULL,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `parent_id` int NOT NULL DEFAULT '0',
  `is_admin` int NOT NULL DEFAULT '1',
  `is_vendor` int NOT NULL DEFAULT '1',
  `is_buyer` int NOT NULL DEFAULT '1',
  `is_api` int NOT NULL DEFAULT '1',
  `default_status` int NOT NULL DEFAULT '0',
  `tenant_id` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_status_to_fulfillment`
--

CREATE TABLE `order_status_to_fulfillment` (
  `id` int NOT NULL,
  `order_status_id` int NOT NULL,
  `order_fulfillment_status_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_total`
--

CREATE TABLE `order_total` (
  `order_total_id` int NOT NULL,
  `order_id` int NOT NULL,
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `page_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `intro` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `full_text` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `page_group_id` int NOT NULL,
  `sort_order` int DEFAULT NULL,
  `meta_tag_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `view_page_count` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `slug_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tenant_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page_group`
--

CREATE TABLE `page_group` (
  `group_id` int NOT NULL,
  `group_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `tenant_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page_group_translation`
--

CREATE TABLE `page_group_translation` (
  `id` int NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `page_group_id` int DEFAULT NULL,
  `language_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int NOT NULL,
  `order_id` int NOT NULL,
  `paid_date` datetime DEFAULT NULL,
  `payment_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_information` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payment_amount` decimal(10,2) DEFAULT NULL,
  `payment_commission_amount` decimal(10,2) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_archive`
--

CREATE TABLE `payment_archive` (
  `payment_archive_id` int NOT NULL,
  `order_id` int NOT NULL,
  `paid_date` datetime DEFAULT NULL,
  `payment_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_information` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payment_amount` decimal(10,2) DEFAULT NULL,
  `payment_commission_amount` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_items`
--

CREATE TABLE `payment_items` (
  `payment_item_id` int NOT NULL,
  `payment_id` int NOT NULL,
  `order_product_id` int NOT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_items_archive`
--

CREATE TABLE `payment_items_archive` (
  `payment_item_archive_id` int NOT NULL,
  `payment_archive_id` int NOT NULL,
  `order_product_id` int NOT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`id`, `name`, `slug`, `sort_order`, `is_active`, `is_delete`, `created_date`, `created_by`, `modified_by`, `modified_date`) VALUES
(1, 'Payment Terms', 'payment-terms', 1, 1, 0, '2025-09-03 06:46:50', NULL, NULL, '2025-09-03 06:46:52'),
(2, 'Check/Money Order', 'check-money-order', 2, 1, 0, '2025-09-03 06:46:50', NULL, NULL, '2025-09-03 06:46:52');

-- --------------------------------------------------------

--
-- Table structure for table `payment_rule`
--

CREATE TABLE `payment_rule` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `instructions` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tenant_id` int DEFAULT NULL,
  `payment_method_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- --------------------------------------------------------

--
-- Table structure for table `payment_term`
--

CREATE TABLE `payment_term` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `term_days` int DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tenant_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_module`
--

CREATE TABLE `permission_module` (
  `module_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `module_group_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_listed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_module`
--

INSERT INTO `permission_module` (`module_id`, `name`, `slug_name`, `sort_order`, `module_group_id`, `created_by`, `created_date`, `modified_by`, `modified_date`, `is_listed`) VALUES
(1, 'List Order', 'list-order', 1, 1, NULL, '2020-03-13 15:05:21', NULL, '2020-03-13 15:05:21', 1),
(3, 'View Order', 'view-order', 3, 1, NULL, '2020-03-13 15:05:21', NULL, '2020-03-13 15:05:21', 0),
(4, 'Export Order', 'export-order', 4, 1, NULL, '2020-03-13 15:05:21', NULL, '2020-03-13 15:05:21', 0),
(12, 'Create Category', 'create-category', 12, 3, NULL, '2020-03-13 15:18:00', NULL, '2020-03-13 15:18:00', 0),
(13, 'Edit Category', 'edit-category', 13, 3, NULL, '2020-03-13 15:18:00', NULL, '2020-03-13 15:18:00', 0),
(14, 'Delete Category', 'delete-category', 14, 3, NULL, '2020-03-13 15:18:00', NULL, '2020-03-13 15:18:00', 0),
(18, 'Edit Rating Review', 'edit-rating-review', 18, 5, NULL, '2020-03-13 15:34:58', NULL, '2020-03-13 15:34:58', 0),
(24, 'View Buyer', 'view-buyer', 24, 77, NULL, '2020-03-13 15:40:56', NULL, '2020-03-13 15:40:56', 0),
(28, 'Create Pages', 'create-pages', 28, 8, NULL, '2020-03-13 15:53:46', NULL, '2020-03-13 15:53:46', 0),
(29, 'Edit Pages', 'edit-pages', 29, 8, NULL, '2020-03-13 15:53:46', NULL, '2020-03-13 15:53:46', 0),
(30, 'Delete Pages', 'delete-pages', 30, 8, NULL, '2020-03-13 15:53:46', NULL, '2020-03-13 15:53:46', 0),
(31, 'Create Banners', 'create-banners', 31, 9, NULL, '2020-03-13 15:57:46', NULL, '2020-03-13 15:57:46', 0),
(32, 'Edit Banners', 'edit-banners', 32, 9, NULL, '2020-03-13 15:57:46', NULL, '2020-03-13 15:57:46', 0),
(33, 'Delete Banners', 'delete-banners', 33, 9, NULL, '2020-03-13 15:57:46', NULL, '2020-03-13 15:57:46', 0),
(46, 'Create Role', 'create-role', 46, 14, NULL, '2020-03-13 16:38:07', NULL, '2020-03-13 16:38:07', 0),
(47, 'Edit Role', 'edit-role', 47, 14, NULL, '2020-03-13 16:38:07', NULL, '2020-03-13 16:38:07', 0),
(48, 'Delete Role', 'delete-role', 48, 14, NULL, '2020-03-13 16:38:07', NULL, '2020-03-13 16:38:07', 0),
(49, 'Create User', 'create-user', 49, 15, NULL, '2020-03-13 16:41:12', NULL, '2020-03-13 16:41:12', 0),
(50, 'Edit User', 'edit-user', 50, 15, NULL, '2020-03-13 16:41:12', NULL, '2020-03-13 16:41:12', 0),
(51, 'Delete User', 'delete-user', 51, 15, NULL, '2020-03-13 16:41:12', NULL, '2020-03-13 16:41:12', 0),
(52, 'Edit General Settings', 'edit-general-settings', 52, 16, NULL, '2020-03-13 16:43:38', NULL, '2020-03-13 16:43:38', 0),
(53, 'Edit Personalize Product', 'edit-personalize-product', 53, 17, NULL, '2020-03-13 16:46:45', NULL, '2020-03-13 16:46:45', 0),
(54, 'Edit Personalize Order', 'edit-personalize-order', 54, 17, NULL, '2020-03-13 16:46:45', NULL, '2020-03-13 16:46:45', 0),
(55, 'Edit SEO Url', 'edit-seo-url', 55, 18, NULL, '2020-03-13 16:49:55', NULL, '2020-03-13 16:49:55', 0),
(56, 'Edit Social Url', 'edit-social-url', 56, 18, NULL, '2020-03-13 16:49:55', NULL, '2020-03-13 16:49:55', 0),
(57, 'List Country', 'list-country', 57, 27, NULL, '2020-03-13 16:55:10', NULL, '2020-03-13 16:55:10', 1),
(58, 'Create Country', 'create-country', 58, 27, NULL, '2020-03-13 16:55:10', NULL, '2020-03-13 16:55:10', 0),
(59, 'Edit Country', 'edit-country', 59, 27, NULL, '2020-03-13 16:55:10', NULL, '2020-03-13 16:55:10', 0),
(60, 'Delete Country', 'delete-country', 60, 27, NULL, '2020-03-13 16:55:10', NULL, '2020-03-13 16:55:10', 0),
(61, 'List Zone', 'list-zone', 61, 19, NULL, '2020-03-13 16:58:13', NULL, '2020-03-13 16:58:13', 1),
(62, 'Create Zone', 'create-zone', 62, 19, NULL, '2020-03-13 16:58:13', NULL, '2020-03-13 16:58:13', 0),
(63, 'Edit Zone', 'edit-zone', 63, 19, NULL, '2020-03-13 16:58:13', NULL, '2020-03-13 16:58:13', 0),
(64, 'Delete Zone', 'delete-zone', 64, 19, NULL, '2020-03-13 16:58:13', NULL, '2020-03-13 16:58:13', 0),
(65, 'List Language', 'list-language', 65, 28, NULL, '2020-03-13 16:59:35', NULL, '2020-03-13 16:59:35', 1),
(66, 'Create Language', 'create-language', 66, 28, NULL, '2020-03-13 16:59:35', NULL, '2020-03-13 16:59:35', 0),
(67, 'Edit Language', 'edit-language', 67, 28, NULL, '2020-03-13 16:59:35', NULL, '2020-03-13 16:59:35', 0),
(68, 'Delete Language', 'delete-language', 68, 28, NULL, '2020-03-13 16:59:35', NULL, '2020-03-13 16:59:35', 0),
(69, 'List Currency', 'list-currency', 69, 25, NULL, '2020-03-13 17:01:22', NULL, '2020-03-13 17:01:22', 1),
(70, 'Create Currency', 'create-currency', 70, 25, NULL, '2020-03-13 17:01:22', NULL, '2020-03-13 17:01:22', 0),
(71, 'Edit Currency', 'edit-currency', 71, 25, NULL, '2020-03-13 17:01:22', NULL, '2020-03-13 17:01:22', 0),
(72, 'Delete Currency', 'delete-currency', 72, 25, NULL, '2020-03-13 17:01:22', NULL, '2020-03-13 17:01:22', 0),
(73, 'List Tax', 'list-tax', 73, 26, NULL, '2020-03-13 17:03:17', NULL, '2020-03-13 17:03:17', 1),
(74, 'Create Tax', 'create-tax', 74, 26, NULL, '2020-03-13 17:03:17', NULL, '2020-03-13 17:03:17', 0),
(75, 'Edit Tax', 'edit-tax', 75, 26, NULL, '2020-03-13 17:03:17', NULL, '2020-03-13 17:03:17', 0),
(76, 'Delete Tax', 'delete-tax', 76, 26, NULL, '2020-03-13 17:03:17', NULL, '2020-03-13 17:03:17', 0),
(77, 'List Order Status', 'list-order-status', 77, 29, NULL, '2020-03-13 17:05:43', NULL, '2020-03-13 17:05:43', 1),
(78, 'Create Order Status', 'create-order-status', 78, 29, NULL, '2020-03-13 17:05:43', NULL, '2020-03-13 17:05:43', 0),
(79, 'Edit Order Status', 'edit-order-status', 79, 29, NULL, '2020-03-13 17:05:43', NULL, '2020-03-13 17:05:43', 0),
(80, 'Delete Order Status', 'delete-order-status', 80, 29, NULL, '2020-03-13 17:05:43', NULL, '2020-03-13 17:05:43', 0),
(85, 'List Email Template', 'list-email-template', 85, 31, NULL, '2020-03-13 17:09:12', NULL, '2020-03-13 17:09:12', 1),
(86, 'Edit Email Template', 'edit-email-template', 86, 31, NULL, '2020-03-13 17:09:12', NULL, '2020-03-13 17:09:12', 0),
(87, 'Delete Email Template', 'delete-email-template', 87, 31, NULL, '2020-03-13 17:09:12', NULL, '2020-03-13 17:09:12', 0),
(88, 'Create Seller', 'create-vendor', 88, 20, NULL, '2020-03-13 17:15:55', NULL, '2020-03-13 17:15:55', 0),
(89, 'Edit Seller', 'edit-vendor', 89, 20, NULL, '2020-03-13 17:15:55', NULL, '2020-03-13 17:15:55', 0),
(90, 'Delete Seller', 'delete-vendor', 90, 20, NULL, '2020-03-13 17:15:55', NULL, '2020-03-13 17:15:55', 0),
(91, 'Approve Seller', 'approve-vendor', 91, 20, NULL, '2020-03-13 17:15:55', NULL, '2020-03-13 17:15:55', 0),
(92, 'View Seller', 'view-vendor', 92, 20, NULL, '2020-03-13 17:15:55', NULL, '2020-03-13 17:15:55', 0),
(93, 'Export Seller', 'export-vendor', 93, 20, NULL, '2020-03-13 17:15:55', NULL, '2020-03-13 17:15:55', 0),
(94, 'Export All Seller', 'export-all-vendor', 94, 20, NULL, '2020-03-13 17:15:55', NULL, '2020-03-13 17:15:55', 0),
(97, 'Approve Market Place Product', 'approve-market-place-product', 97, 21, NULL, '2020-03-13 17:30:24', NULL, '2020-03-13 17:30:24', 0),
(99, 'Export Market Place Product', 'export-market-place-product', 99, 21, NULL, '2020-03-13 17:30:24', NULL, '2020-03-13 17:30:24', 0),
(100, 'Export All Market Place Product', 'export-all-market-place-product', 100, 21, NULL, '2020-03-13 17:30:24', NULL, '2020-03-13 17:30:24', 0),
(101, 'Assign Category', 'assign-category', 101, 22, NULL, '2020-03-13 17:35:27', NULL, '2020-03-13 17:35:27', 0),
(102, 'Set Commission', 'set-commission', 102, 22, NULL, '2020-03-13 17:35:27', NULL, '2020-03-13 17:35:27', 0),
(103, 'Set Seller Commission', 'set-vendor-commission', 103, 22, NULL, '2020-03-13 17:35:27', NULL, '2020-03-13 17:35:27', 0),
(105, 'List Payment', 'list-payment', 105, 24, NULL, '2020-03-13 17:42:25', NULL, '2020-03-13 17:42:25', 1),
(106, 'Export All Payment', 'export-all-payment', 106, 24, NULL, '2020-03-13 17:42:25', NULL, '2020-03-13 17:42:25', 0),
(108, 'List Category', 'list-category', 108, 3, NULL, '2020-03-18 17:35:06', NULL, '2020-03-18 17:35:06', 1),
(110, 'List Rating Review', 'list-rating-review', 110, 5, NULL, '2020-03-18 17:38:59', NULL, '2020-03-18 17:38:59', 1),
(113, 'List Pages', 'list-pages', 113, 8, NULL, '2020-03-18 17:45:01', NULL, '2020-03-18 17:45:01', 1),
(114, 'List Banners', 'list-banners', 114, 9, NULL, '2020-03-18 17:46:10', NULL, '2020-03-18 17:46:10', 1),
(117, 'List Role', 'list-role', 117, 14, NULL, '2020-03-18 17:50:24', NULL, '2020-03-18 17:50:24', 1),
(118, 'List User', 'list-user', 118, 15, NULL, '2020-03-18 17:51:27', NULL, '2020-03-18 17:51:27', 1),
(119, 'List Seller', 'list-vendor', 119, 20, NULL, '2020-03-18 17:56:45', NULL, '2020-03-18 17:56:45', 0),
(120, 'List Market Place Product', 'list-market-place-product', 120, 21, NULL, '2020-03-18 17:58:42', NULL, '2020-03-18 17:58:42', 0),
(121, 'Update Order Status', 'update-order-status', 5, 1, NULL, '2020-03-19 11:04:25', NULL, '2020-03-19 11:04:25', 0),
(129, 'List Coupon', 'list-coupon', 129, 34, NULL, '2020-03-19 15:15:57', NULL, '2020-03-19 15:15:57', 1),
(130, 'Create Coupon', 'create-coupon', 130, 34, NULL, '2020-03-19 15:17:10', NULL, '2020-03-19 15:17:10', 0),
(131, 'Edit Coupon', 'edit-coupon', 131, 34, NULL, '2020-03-19 15:17:58', NULL, '2020-03-19 15:17:58', 0),
(132, 'Delete Coupon', 'delete-coupon', 132, 34, NULL, '2020-03-19 15:19:15', NULL, '2020-03-19 15:19:15', 0),
(133, 'List Blogs', 'list-blogs', 133, 35, NULL, '2020-03-19 15:23:49', NULL, '2020-03-19 15:23:49', 1),
(134, 'Create Blogs', 'create-blogs', 134, 35, NULL, '2020-03-19 15:24:58', NULL, '2020-03-19 15:24:58', 0),
(135, 'Edit Blogs', 'edit-blogs', 135, 35, NULL, '2020-03-19 15:25:34', NULL, '2020-03-19 15:25:34', 0),
(136, 'Delete Blogs', 'delete-blogs', 136, 35, NULL, '2020-03-19 15:26:17', NULL, '2020-03-19 15:26:17', 0),
(137, 'Audit log', 'audit-log', 187, 49, NULL, '2021-05-08 07:42:34', NULL, '2021-05-08 07:42:34', 0),
(139, 'Audit log bulk export', 'Audit-log-bulk-export', 189, 49, NULL, '2021-05-08 07:45:56', NULL, '2021-05-08 07:45:56', 0),
(140, 'Back Order List', 'back-order-list', 190, 50, NULL, '2021-07-06 15:07:17', NULL, '2021-07-06 15:07:17', 0),
(141, 'Failed order list', 'failed-order-list', 191, 51, NULL, '2021-07-06 15:10:55', NULL, '2021-07-06 15:10:55', 0),
(143, 'View Failed Order Detail', 'view-failed-order-detail', 193, 51, NULL, '2021-07-06 15:15:58', NULL, '2021-07-06 15:15:58', 0),
(144, 'Move Failed Order To Main Order', 'move-failed-order-to-main-order', 194, 51, NULL, '2021-07-06 15:15:58', NULL, '2021-07-06 15:15:58', 0),
(154, 'Add Page Group', 'add-page-group', 204, 56, NULL, '2021-07-06 16:17:06', NULL, '2021-07-06 16:17:06', 0),
(155, 'Edit Page Group', 'Edit-page-group', 205, 56, NULL, '2021-07-06 16:17:06', NULL, '2021-07-06 16:17:06', 0),
(156, 'Page Group List', 'page-group-list', 206, 56, NULL, '2021-07-06 16:18:41', NULL, '2021-07-06 16:18:41', 1),
(157, 'Page Group Delete', 'page-group-delete', 207, 56, NULL, '2021-07-06 16:18:41', NULL, '2021-07-06 16:18:41', 0),
(158, 'Add Widget', 'add-widget', 208, 57, NULL, '2021-07-06 16:24:44', NULL, '2021-07-06 16:24:44', 0),
(159, 'Edit Widget', 'edit-widget', 209, 57, NULL, '2021-07-06 16:24:44', NULL, '2021-07-06 16:24:44', 0),
(160, 'Widget list', 'widget-list', 210, 57, NULL, '2021-07-06 16:26:37', NULL, '2021-07-06 16:26:37', 1),
(161, 'Widget Delete', 'widget-delete', 211, 57, NULL, '2021-07-06 16:26:37', NULL, '2021-07-06 16:26:37', 0),
(162, 'Create Product Question', 'create-product-question', 212, 58, NULL, '2021-08-04 11:55:49', NULL, '2021-08-04 11:55:49', 0),
(163, 'Update Product Question', 'update-product-question', 213, 58, NULL, '2021-08-04 11:55:49', NULL, '2021-08-04 11:55:49', 0),
(164, 'Product Question List', 'product-question-list', 214, 58, NULL, '2021-08-04 11:57:49', NULL, '2021-08-04 11:57:49', 1),
(165, 'Delete Product Question', 'delete-product-question', 215, 58, NULL, '2021-08-04 11:57:49', NULL, '2021-08-04 11:57:49', 0),
(166, 'Update Question Status', 'update-question-status', 216, 58, NULL, '2021-08-04 12:01:57', NULL, '2021-08-04 12:01:57', 0),
(167, 'Create Product Answer', 'create-product-answer', 217, 59, NULL, '2021-08-04 12:09:07', NULL, '2021-08-04 12:09:07', 0),
(168, 'Update Product Answer', 'update-product-answer', 218, 59, NULL, '2021-08-04 12:09:07', NULL, '2021-08-04 12:09:07', 0),
(169, 'Update Answer Status', 'update-answer-status', 219, 59, NULL, '2021-08-04 12:11:09', NULL, '2021-08-04 12:11:09', 0),
(170, 'Delete Product Answer', 'delete-product-answer', 220, 59, NULL, '2021-08-04 12:11:09', NULL, '2021-08-04 12:11:09', 0),
(171, 'Product Answer List', 'product-answer-list', 221, 59, NULL, '2021-08-04 12:11:48', NULL, '2021-08-04 12:11:48', 1),
(179, 'Settlement Order List', 'settlement order list', 159, 46, NULL, '2021-03-18 17:13:59', NULL, '2021-03-18 17:13:59', 1),
(180, 'Make Settlement', 'make-settlement', 160, 46, NULL, '2021-03-18 17:13:59', NULL, '2021-03-18 17:13:59', 0),
(181, 'History Settlement', 'history-settlement', 161, 46, NULL, '2021-03-18 17:17:56', NULL, '2021-03-18 17:17:56', 0),
(182, 'Sales By Seller Report', 'sales-by-vendor-report', 162, 47, NULL, '2021-03-18 17:17:56', NULL, '2021-03-18 17:17:56', 0),
(183, 'Total Sales Report', 'total-sales-report', 163, 47, NULL, '2021-03-18 17:19:53', NULL, '2021-03-18 17:19:53', 0),
(184, 'Settlement Report List', 'settlement-report-list', 164, 47, NULL, '2021-03-18 17:19:53', NULL, '2021-03-18 17:19:53', 1),
(197, 'Sales Report List', 'sales-report-list', 175, 49, NULL, '2021-09-07 09:51:03', NULL, '2021-09-07 09:51:03', 1),
(198, 'Sales Report Export', 'sales-report-export', 176, 49, NULL, '2021-09-07 09:51:03', NULL, '2021-09-07 09:51:03', 0),
(203, 'Banner Export', 'banner-export', 181, 9, NULL, '2021-09-07 12:39:52', NULL, '2021-09-07 12:39:52', 0),
(214, 'Edit Role Permission', 'edit-role-permission', 187, 14, NULL, '2021-09-08 19:13:40', NULL, '2021-09-08 19:13:40', 0),
(215, 'Edit User Permission', 'edit-user-permission', 188, 15, NULL, '2021-09-08 19:13:40', NULL, '2021-09-08 19:13:40', 0),
(217, 'Bulk Export Admin Coupon List', 'bulk-export-admin-coupon-list', 190, 34, NULL, '2022-04-04 07:02:28', NULL, '2022-04-04 07:02:28', 1),
(218, 'Product Attribute List', 'product-attribute-list', 235, 62, NULL, '2022-06-09 04:52:12', NULL, '2022-06-09 04:52:12', 1),
(219, 'Add Product Attribute', 'update-product-attribute', 236, NULL, NULL, '2022-06-09 04:52:12', NULL, '2022-06-09 04:52:12', 0),
(220, 'Add Attribute', 'add-attribute', 237, 62, NULL, '2022-06-09 04:52:12', NULL, '2022-06-09 04:52:12', 0),
(232, 'Edit Product Variant', 'product-variant-update', 252, NULL, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 0),
(233, 'Add Product Variant', 'product-variant-update', 253, NULL, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 0),
(234, 'Product Variants Product Detail', 'product-variant-detail', 254, NULL, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 0),
(237, 'Delete Product Variant', 'delete-product-variant', 257, NULL, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 0),
(238, 'Inventory Product List', 'inventory-product-list', 258, NULL, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 1),
(240, 'Set Common Product', 'set-common-product', 260, NULL, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 0),
(247, 'List Related Products', 'list-related-product', 247, NULL, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 1),
(248, 'Add Related Products', 'update-related-product', 248, NULL, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 0),
(249, 'Update Related Products', 'update-related-product', 249, NULL, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 0),
(250, 'Related Product Detail', 'related-product-detail', 65, 65, NULL, '2022-06-09 04:52:14', NULL, '2022-06-09 04:52:14', 0),
(251, 'Product Attribute List', 'product-attribute-list', 235, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 1),
(252, 'Add Product Attribute', 'update-product-attribute', 236, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(253, 'Add Attribute', 'add-attribute', 237, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(254, 'Attribute List', 'attribute-list', 238, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 1),
(255, 'Edit Attribute', 'edit-attribute', 239, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(256, 'Delete Attribute', 'delete-attribute', 240, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(257, 'Add Attribute Group', 'attribute-group-add', 241, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(258, 'Attribute List', 'attribute-list', 242, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 1),
(259, 'Delete Attribute Group', 'attribute-group-delete', 243, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(260, 'Add Variants', 'variant-add', 244, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(261, 'Edit Variant', 'variant-edit', 245, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(262, 'Delete Variant', 'varient-delete', 246, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(263, 'Variant Detail', 'variant-detail', 247, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(265, 'Edit Product Variant', 'product-variant-update', 252, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(266, 'Add Product Variant', 'product-variant-update', 253, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(267, 'Product Variants Product Detail', 'product-variant-detail', 254, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(270, 'Delete Product Variant', 'delete-product-variant', 257, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(271, 'Inventory Product List', 'inventory-product-list', 258, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 1),
(273, 'Set Common Product', 'set-common-product', 260, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(281, 'Add Related Products', 'update-related-product', 248, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(282, 'Update Related Products', 'update-related-product', 249, NULL, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 0),
(283, 'List Related Products', 'list-related-product', 65, 65, NULL, '2023-03-18 07:30:03', NULL, '2023-03-18 07:30:03', 1),
(286, 'List Product QR', 'list-product-qr', 254, 66, NULL, '2023-12-13 05:57:14', NULL, '2023-12-13 05:57:14', 1),
(287, 'Manage Product QR', 'manage-product-qr', 255, 66, NULL, '2023-12-13 05:57:14', NULL, '2023-12-13 05:57:14', 0),
(288, 'List Abandoned Cart', 'list-abandoned-cart', 256, 67, NULL, '2023-12-13 05:57:14', NULL, '2023-12-13 05:57:14', 1),
(289, 'Export Abandoned cart Details', 'export-abandoned-cart-details', 257, 67, NULL, '2023-12-13 05:57:14', NULL, '2023-12-13 05:57:14', 0),
(290, 'List Live Cart', 'list-live-cart', 258, 68, NULL, '2023-12-13 05:57:14', NULL, '2023-12-13 05:57:14', 1),
(291, 'Export Live cart Details', 'export-live-cart-details', 259, 68, NULL, '2023-12-13 05:57:14', NULL, '2023-12-13 05:57:14', 0),
(293, 'Export Category', 'export-category', 268, 3, NULL, '2024-07-08 16:35:43', NULL, '2024-07-08 16:35:43', 0),
(297, 'Bulk Export List', 'bulk-export-list', 302, 72, NULL, '2024-07-08 16:53:28', NULL, '2024-07-08 16:53:28', 1),
(298, 'Export List', 'export-list', 303, 72, NULL, '2024-07-08 16:53:28', NULL, '2024-07-08 16:53:28', 1),
(301, 'Chat List', 'chat-list', 305, 74, NULL, '2024-07-08 17:04:09', NULL, '2024-07-08 17:04:09', 1),
(302, 'Add Page Localization', 'add-page-localization', 306, 8, NULL, '2024-07-19 12:10:32', NULL, '2024-07-19 12:10:32', 0),
(303, 'Add Page Group Localization', 'add-page-group-localization', 307, 56, NULL, '2024-07-19 12:11:32', NULL, '2024-07-19 12:11:32', 0),
(304, 'Add Widget Localization', 'add-widget-localization', 308, 57, 5, '2024-07-19 12:13:40', NULL, '2024-07-19 12:13:40', 0),
(305, 'Add Blog Localization', 'add-blog-localization', 309, 35, NULL, '2024-07-19 12:14:24', NULL, '2024-07-19 12:14:24', 0),
(313, 'List Seller Group', 'list-seller-group', 317, 76, NULL, '2024-07-22 05:09:26', NULL, '2024-07-22 05:09:26', 1),
(314, 'Create Seller Group', 'create-seller-group', 318, 76, NULL, '2024-07-22 05:09:26', NULL, '2024-07-22 05:09:26', 0),
(315, 'Update Seller Group', 'update-seller-group', 319, 76, NULL, '2024-07-22 05:09:26', NULL, '2024-07-22 05:09:26', 0),
(316, 'Delete Seller Group', 'delete-seller-group', 320, 76, NULL, '2024-07-22 05:09:26', NULL, '2024-07-22 05:09:26', 0),
(323, 'List Buyer', 'list-buyer', 321, 77, NULL, '2024-07-22 05:43:02', NULL, '2024-07-22 05:43:02', 1),
(324, 'Create Buyer', 'create-buyer', 322, 77, NULL, '2024-07-22 05:43:02', NULL, '2024-07-22 05:43:02', 0),
(325, 'Update Buyer', 'update-buyer', 323, 77, NULL, '2024-07-22 05:43:02', NULL, '2024-07-22 05:43:02', 0),
(326, 'Delete Buyer', 'delete-buyer', 324, 77, NULL, '2024-07-22 05:43:02', NULL, '2024-07-22 05:43:02', 0),
(327, 'Export Buyer', 'export-buyer', 325, 77, NULL, '2024-07-22 05:43:02', NULL, '2024-07-22 05:43:02', 0),
(337, 'List Approved Products', 'list-approved-products', NULL, 2, NULL, '2024-07-22 07:33:03', NULL, '2024-07-22 07:33:03', 1),
(338, 'List Rejected Products', 'list-rejected-products', NULL, 2, NULL, '2024-07-22 07:33:03', NULL, '2024-07-22 07:33:03', 1),
(339, 'List Waiting For Approval', 'list-waiting-for-approval', NULL, 2, NULL, '2024-07-22 07:33:03', NULL, '2024-07-22 07:33:03', 1),
(340, 'List Common Products', 'list-common-products', NULL, 2, NULL, '2024-07-22 07:33:03', NULL, '2024-07-22 07:33:03', 1),
(341, 'Add Category Localization', 'add-category-localization', NULL, 3, NULL, '2024-07-22 07:35:43', NULL, '2024-07-22 07:35:43', 0),
(342, 'Export Data', 'export-data', NULL, 72, NULL, '2024-07-22 07:40:10', NULL, '2024-07-22 07:40:10', 0),
(352, 'All Products', 'all-products', 5, 2, NULL, '2024-10-16 05:17:41', NULL, '2024-10-16 05:17:41', 1),
(355, 'Product', 'product-seo', 310, 82, NULL, '2025-01-16 17:49:48', NULL, '2025-01-16 17:49:48', 0),
(356, 'Pages', 'pages-seo', 311, 82, NULL, '2025-01-16 17:49:48', NULL, '2025-01-16 17:49:48', 0),
(357, 'Category', 'category-seo', 312, 82, NULL, '2025-01-16 17:49:48', NULL, '2025-01-16 17:49:48', 0),
(358, 'Blog', 'blog-seo', 313, 82, NULL, '2025-01-16 17:49:48', NULL, '2025-01-16 17:49:48', 0),
(359, 'Site Map', 'site-map-seo', 314, 82, NULL, '2025-01-16 17:49:48', NULL, '2025-01-16 17:49:48', 0),
(360, 'Addons', 'edit-addons', 319, 16, NULL, '2025-01-16 17:49:48', NULL, '2025-01-16 17:49:48', 0);

-- --------------------------------------------------------

--
-- Table structure for table `permission_module_group`
--

CREATE TABLE `permission_module_group` (
  `module_group_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_module_group`
--

INSERT INTO `permission_module_group` (`module_group_id`, `name`, `slug_name`, `sort_order`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'Order', 'order', 1, NULL, '2020-03-13 14:27:44', NULL, '2020-03-13 14:27:44'),
(2, 'Product', 'product', 2, NULL, '2020-03-13 14:27:44', NULL, '2020-03-13 14:27:44'),
(3, 'Categories', 'categories', 3, NULL, '2020-03-13 14:27:44', NULL, '2020-03-13 14:27:44'),
(5, 'Rating Review', 'rating-review', 5, NULL, '2020-03-13 14:27:44', NULL, '2020-03-13 14:27:44'),
(8, 'Pages', 'pages', 8, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(9, 'Banners', 'banners', 9, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(14, 'Setting Role', 'setting-role', 14, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(15, 'Setting Users', 'setting-users', 15, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(16, 'Setting General Settings', 'setting-general-settings', 16, NULL, '2020-03-13 14:41:15', NULL, '2020-03-13 14:41:15'),
(17, 'Setting Personalize', 'setting-personalize', 17, NULL, '2020-03-13 14:46:15', NULL, '2020-03-13 14:46:15'),
(18, 'Setting Site Setting', 'setting-site-setting', 18, NULL, '2020-03-13 14:46:15', NULL, '2020-03-13 14:46:15'),
(19, 'Setting Zone', 'setting-zone', 19, NULL, '2020-03-13 14:46:15', NULL, '2020-03-13 14:46:15'),
(20, 'Seller', 'seller', 20, NULL, '2020-03-13 14:58:31', NULL, '2024-11-25 08:26:08'),
(21, 'Market Place Product', 'market-place-product', 21, NULL, '2020-03-13 14:58:31', NULL, '2020-03-13 14:58:31'),
(22, 'Market Place Setting', 'market-place-setting', 22, NULL, '2020-03-13 14:58:31', NULL, '2020-03-13 14:58:31'),
(24, 'Market Place Payment', 'market-place-payment', 24, NULL, '2020-03-13 14:58:31', NULL, '2020-03-13 14:58:31'),
(25, 'Setting Currency', 'setting-currency', 25, NULL, '2020-03-16 16:23:09', NULL, '2020-03-16 16:23:09'),
(26, 'Settings Tax', 'settings-tax', 26, NULL, '2020-03-16 16:23:09', NULL, '2020-03-16 16:23:09'),
(27, 'Settings Country', 'settings-country', 27, NULL, '2020-03-16 16:30:25', NULL, '2020-03-16 16:30:25'),
(28, 'Settings Language', 'settings-language', 28, NULL, '2020-03-16 16:30:25', NULL, '2020-03-16 16:30:25'),
(29, 'Settings Order Status', 'settings-order-status', 29, NULL, '2020-03-16 16:36:38', NULL, '2020-03-16 16:36:38'),
(31, 'Settings Email Template', 'settings-email-template', 31, NULL, '2020-03-16 16:38:10', NULL, '2020-03-16 16:38:10'),
(34, 'Coupon', 'coupon', 34, NULL, '2020-03-19 15:11:48', NULL, '2020-03-19 15:11:48'),
(35, 'Blogs', 'blogs', 35, NULL, '2020-03-19 15:22:04', NULL, '2020-03-19 15:22:04'),
(46, 'Marketplace Settlement', 'marketplace-settlement', 42, NULL, '2021-03-18 15:44:24', NULL, '2021-03-18 15:44:24'),
(47, 'Marketplace Report', 'marketplace-report', 43, NULL, '2021-03-18 15:44:24', NULL, '2021-03-18 15:44:24'),
(49, 'Report', 'report', 45, NULL, '2021-05-08 07:22:57', NULL, '2021-05-08 07:22:57'),
(50, 'Sales Back Orders', 'sales-back-orders', 46, NULL, '2021-07-06 14:58:10', NULL, '2021-07-06 14:58:10'),
(51, 'Sales Failed Order', 'sales-failed-order', 47, NULL, '2021-07-06 14:58:10', NULL, '2021-07-06 14:58:10'),
(56, 'Page Group', 'page-group', 62, NULL, '2021-07-06 16:12:38', NULL, '2021-07-06 16:12:38'),
(57, 'Widgets', 'wigdets', 63, NULL, '2021-07-06 16:12:38', NULL, '2021-07-06 16:12:38'),
(58, 'Product Question', 'product-question', 64, NULL, '2021-08-04 11:50:06', NULL, '2021-08-04 11:50:06'),
(59, 'Product Answer', 'product-answer', 65, NULL, '2021-08-04 11:50:06', NULL, '2021-08-04 11:50:06'),
(62, 'Attribute', 'attribute', 68, NULL, '2022-06-09 04:52:12', NULL, '2022-06-09 04:52:12'),
(65, 'Related Products', 'related-products', 70, NULL, '2023-12-13 05:38:58', NULL, '2023-12-13 05:38:58'),
(66, 'Product QR', 'product-qr', 71, NULL, '2023-12-13 05:38:58', NULL, '2023-12-13 05:38:58'),
(67, 'Abandoned Cart', 'abandoned-cart', 72, NULL, '2023-12-13 05:38:58', NULL, '2023-12-13 05:38:58'),
(68, 'Live Cart', 'live-cart', 73, NULL, '2023-12-13 05:38:58', NULL, '2023-12-13 05:38:58'),
(72, 'Data Export', 'data-export', 77, NULL, '2024-07-08 16:53:28', NULL, '2024-07-08 16:53:28'),
(74, 'Chat', 'chat', 79, NULL, '2024-07-08 17:03:18', NULL, '2024-07-08 17:03:18'),
(76, 'Seller Group', 'seller-group', 81, NULL, '2024-07-22 05:04:30', NULL, '2024-07-22 05:04:30'),
(77, 'Buyer', 'buyer', 82, NULL, '2024-07-22 05:10:48', NULL, '2024-07-22 05:10:48'),
(82, 'SEO', 'seo', 81, NULL, '2025-01-16 17:49:48', NULL, '2025-01-16 17:49:48');

-- --------------------------------------------------------

--
-- Table structure for table `plugins`
--

CREATE TABLE `plugins` (
  `id` int NOT NULL,
  `plugin_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plugin_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plugin_avatar_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plugin_type` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plugin_additional_info` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `plugin_status` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `plugin_form_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `slug_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_editable` int DEFAULT '0',
  `routes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `plugin_timestamp` bigint DEFAULT NULL,
  `display_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plugin_menu`
--

CREATE TABLE `plugin_menu` (
  `id` int NOT NULL,
  `menu_name` varchar(255) NOT NULL,
  `menu_module` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `price_update_file_log`
--

CREATE TABLE `price_update_file_log` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `vendor_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int NOT NULL,
  `sku` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `upc` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `stock_status_id` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `manufacturer_id` int DEFAULT NULL,
  `shipping` tinyint DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `date_available` date DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `amount` float DEFAULT NULL,
  `meta_tag_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `subtract_stock` int DEFAULT NULL COMMENT '0->no 1->yes',
  `minimum_quantity` int DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wishlist_status` int DEFAULT NULL,
  `delete_flag` int NOT NULL DEFAULT '0',
  `is_featured` int DEFAULT NULL,
  `rating` decimal(10,2) DEFAULT NULL,
  `condition` int DEFAULT NULL COMMENT '1->new 2->used',
  `today_deals` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `price_update_file_log_id` int DEFAULT NULL,
  `product_slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service_charges` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_type` int DEFAULT NULL,
  `tax_value` int DEFAULT NULL,
  `order_product_prefix_id` int DEFAULT NULL,
  `height` decimal(15,2) DEFAULT NULL,
  `weight` decimal(15,2) DEFAULT NULL,
  `length` decimal(15,2) DEFAULT NULL,
  `width` decimal(15,2) DEFAULT NULL,
  `has_stock` int DEFAULT '1',
  `has_tire_price` int DEFAULT '0',
  `out_of_stock_threshold` int DEFAULT NULL,
  `notify_min_quantity_below` int DEFAULT NULL,
  `min_quantity_allowed_cart` int DEFAULT NULL,
  `max_quantity_allowed_cart` int DEFAULT NULL,
  `enable_back_orders` int DEFAULT NULL,
  `pincode_based_delivery` int DEFAULT '0',
  `sku_id` int DEFAULT NULL,
  `is_simplified` int DEFAULT NULL,
  `hsn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attribute_keyword` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `quotation_available` int NOT NULL DEFAULT '0',
  `owner` int DEFAULT '0',
  `is_common` int DEFAULT '0',
  `setted_as_common_on` datetime DEFAULT NULL,
  `price_type` int NOT NULL DEFAULT '1',
  `product_highlights` json DEFAULT NULL,
  `is_specification` int DEFAULT NULL,
  `tax_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Triggers `product`
--
DELIMITER $$
CREATE TRIGGER `before_product_insert` BEFORE INSERT ON `product` FOR EACH ROW BEGIN
                IF NEW.product_highlights IS NULL THEN
                    SET NEW.product_highlights = '[]';
                END IF;
            END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `product_description`
--

CREATE TABLE `product_description` (
  `product_description_id` int NOT NULL,
  `product_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_discount`
--

CREATE TABLE `product_discount` (
  `product_discount_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `priority` int NOT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `sku_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `product_image_id` int NOT NULL,
  `product_id` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `container_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default_image` int DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_price_log`
--

CREATE TABLE `product_price_log` (
  `product_price_log_id` int NOT NULL,
  `product_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `sku` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `special_price` decimal(10,2) DEFAULT NULL,
  `special_start_date` date DEFAULT NULL,
  `special_end_date` date DEFAULT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `discount_start_date` date DEFAULT NULL,
  `discount_end_date` date DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `price_update_file_log_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `product_special`
--

CREATE TABLE `product_special` (
  `product_special_id` int NOT NULL,
  `product_id` int NOT NULL,
  `customer_group_id` int DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `sku_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_stock_alert`
--

CREATE TABLE `product_stock_alert` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `mail_flag` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `sku_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_tag`
--

CREATE TABLE `product_tag` (
  `product_tag_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `product_tagname` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_tire_price`
--

CREATE TABLE `product_tire_price` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `sku_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_to_category`
--

CREATE TABLE `product_to_category` (
  `product_to_category_id` int NOT NULL,
  `product_id` int NOT NULL,
  `category_id` int NOT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `product_video`
--

CREATE TABLE `product_video` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL COMMENT '1 -> video 2 -> embedded',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_view_log`
--

CREATE TABLE `product_view_log` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` bigint DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `registration_user_otp`
--

CREATE TABLE `registration_user_otp` (
  `otp_id` int NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `otp` int DEFAULT NULL,
  `user_type` int DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `tenant_id` int DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `settings_id` int NOT NULL,
  `site_url` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_title` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_tag_keywords` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_owner` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_address` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `country_id` int DEFAULT NULL,
  `zone_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_email` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_telephone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_fax` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_logo` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_logo_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maintenance_mode` int DEFAULT NULL,
  `store_language_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_currency_id` int DEFAULT NULL,
  `store_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_image_path` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `google` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_status` int NOT NULL DEFAULT '1',
  `invoice_prefix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `items_per_page` int DEFAULT NULL,
  `category_product_count` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `email_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_logo_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_logo_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addons` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `site_name` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_name` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `store_address1` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_address2` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_city` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_postal_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_secondary_language_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_symbol` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_format` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_format` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_format` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default_country` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `pending_status` int DEFAULT NULL,
  `default_website` int DEFAULT NULL,
  `default_language_id` int DEFAULT NULL,
  `is_guest_allowed` int DEFAULT NULL COMMENT 'IS GUEST OPERATION ALLOWED IN APPLICATION FLAG',
  `instagram_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook_logo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_logo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `x_logo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_logo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin_logo` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `admin_logo_path` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `seller_logo` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `seller_logo_path` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `seller_logo2` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `seller_logo2_path` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `time_zone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`settings_id`, `site_url`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keywords`, `store_name`, `store_owner`, `store_address`, `country_id`, `zone_id`, `store_email`, `store_telephone`, `store_fax`, `store_logo`, `store_logo_path`, `maintenance_mode`, `store_language_name`, `store_currency_id`, `store_image`, `store_image_path`, `google`, `facebook`, `twitter`, `instagram`, `order_status`, `invoice_prefix`, `items_per_page`, `category_product_count`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`, `email_logo`, `email_logo_path`, `invoice_logo`, `invoice_logo_path`, `addons`, `site_name`, `business_name`, `store_description`, `store_address1`, `store_address2`, `store_city`, `store_postal_code`, `store_secondary_language_name`, `currency_symbol`, `currency_format`, `date_format`, `time_format`, `default_country`, `country`, `pending_status`, `default_website`, `default_language_id`, `is_guest_allowed`, `instagram_logo`, `facebook_logo`, `linkedin_logo`, `x_logo`, `youtube_logo`, `social_path`, `linkedin`, `youtube`, `admin_logo`, `admin_logo_path`, `seller_logo`, `seller_logo_path`, `seller_logo2`, `seller_logo2_path`, `time_zone`) VALUES
(2, 'https://spurtcommerce-marketplace-store.vercel.app/', 'Spurtcommercess', 'Spurtcommercess', 'Spurtcommercess', 'Spurtcommerce Multi Vendor Platform ', 'Admin', 'Chennai, Tamil Nadu, India ', 99, '76', 'test@qycle.com', '0442953545', '1221', 'Img_1729586561999.jpeg', 'storeLogo/', 0, 'French', 46, 'storeImage', NULL, 'https://plus.google.com/106505712715559114904', 'https://www.facebook.com/spurtcommerce/', 'https://x.com/Spurtcommerce', 'https://www.instagram.com/spurtcommerce/', 1, 'SPURT', 0, 0, 1, '2019-02-13 06:00:00', '2024-10-22 08:57:32', NULL, NULL, 'logo.jpg', 'storesLogo/', 'InvoiceLogo_1729586615432.jpeg', 'storeLogo/', '{\"product-attribute\":true,\"coupon\":true,\"chat\":false,\"common-catalog\":true,\"abandoned-cart\":true,\"seo\":true,\"rating-review\":true,\"product-related\":true,\"product-qrcode\":true,\"product-variants\":true,\"product-quotation\":true,\"blog\":true,\"question-answer\":true,\"cash-on-delivery\":true,\"widget\":true,\"paypal\":true,\"razorpay\":true,\"stripe\":true,\"facebook\":true,\"gmail\":true,\"null\":true,\"product-price-group\":true,\"webhook\":true,\"supplier-management\":true}', 'Spurt', 'SpurtCart', 'Spurtcommerce website', 'SpurtCart', 'Radcliffe Road ', 'Mumbai ', '600028', 'English', '$', NULL, 'dd/MM/yyyy', '12 hrs', '99', '3,6', NULL, 1, 57, 1, 'instagram_1717241905383.png', 'facebook_1717241584201.png', 'linkdin_1717242258958.png', 'x_1717242027394.png', 'youtube_1717241980138.png', 'social/', 'https://www.linkedin.com/company/spurtcommerce/', 'https://www.youtube.com/channel/UCfq0-RDusnkNE9mjY-s2AmA ', 'AdminLogo1729586808601.jpeg', 'storeLogo/', 'sellerLogo1729587335730.jpeg', 'storeLogo/', 'sellerLogo1729587368365.jpeg', 'storeLogo/', NULL);

-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- Table structure for table `shopping_cart`
--

CREATE TABLE `shopping_cart` (
  `id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `is_default` int DEFAULT '1',
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `tenant_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_ordered` tinyint DEFAULT '0',
  `customer_user_id` int DEFAULT NULL,
  `created_by_type` enum('seller','buyer') NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shopping_cart_detail`
--

CREATE TABLE `shopping_cart_detail` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `shopping_cart_id` int DEFAULT NULL,
  `sku_id` int DEFAULT NULL,
  `variant_option_id` int DEFAULT NULL,
  `variant_option_name` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `notes` text,
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `site_filter`
--

CREATE TABLE `site_filter` (
  `id` int NOT NULL,
  `filter_name` varchar(225) NOT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `tenant_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site_filter_category`
--

CREATE TABLE `site_filter_category` (
  `id` int NOT NULL,
  `site_filter_id` int NOT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site_filter_section`
--

CREATE TABLE `site_filter_section` (
  `id` int NOT NULL,
  `site_filter_id` int NOT NULL,
  `section_id` int DEFAULT NULL,
  `section_name` varchar(225) NOT NULL,
  `section_type` int NOT NULL,
  `section_slug` varchar(225) DEFAULT NULL,
  `sequence` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site_filter_section_item`
--

CREATE TABLE `site_filter_section_item` (
  `id` int NOT NULL,
  `site_filter_section_id` int NOT NULL,
  `item_name` varchar(225) NOT NULL,
  `item_slug` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site_map`
--

CREATE TABLE `site_map` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `user_name` varchar(225) DEFAULT NULL,
  `path_name` varchar(225) DEFAULT NULL,
  `file_name` varchar(225) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `tenant_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sku`
--

CREATE TABLE `sku` (
  `id` int NOT NULL,
  `sku_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `out_of_stock_threshold` int DEFAULT NULL,
  `notify_min_quantity_below` int DEFAULT NULL,
  `min_quantity_allowed_cart` int DEFAULT '1',
  `max_quantity_allowed_cart` int DEFAULT '5',
  `enable_back_orders` int DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  `back_order_stock_limit` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `specification_to_category`
--

CREATE TABLE `specification_to_category` (
  `id` int NOT NULL,
  `specification_id` int NOT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_log`
--

CREATE TABLE `stock_log` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `sku_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_status`
--

CREATE TABLE `stock_status` (
  `stock_status_id` int NOT NULL,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




-- --------------------------------------------------------

--
-- Table structure for table `tax`
--

CREATE TABLE `tax` (
  `tax_id` int NOT NULL,
  `tax_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_percentage` int DEFAULT NULL,
  `tax_status` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tax`
--

INSERT INTO `tax` (`tax_id`, `tax_name`, `tax_percentage`, `tax_status`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'GST', 18, 1, NULL, '2020-02-20 13:42:39', NULL, '2024-08-14 07:00:56'),
(5, 'Income Tax', 10, 1, NULL, '2024-08-23 05:23:57', NULL, '2024-08-29 11:33:46'),
(19, 'iii', 1234567890, 1, NULL, '2024-09-27 11:18:19', NULL, NULL);

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_group_id` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` bigint DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `delete_flag` int DEFAULT '0',
  `permission` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `forget_password_link_expires` datetime DEFAULT NULL,
  `forget_password_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `group_id` int NOT NULL,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `permission` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `vendor_id` int NOT NULL,
  `vendor_prefix_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `commission` int DEFAULT NULL,
  `company_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_logo_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payment_method` int DEFAULT NULL,
  `business_segment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approval_flag` int DEFAULT NULL,
  `approved_by` int DEFAULT NULL,
  `approved_date` date DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `contact_person_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_address1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_address2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_country_id` int DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `company_mobile_number` bigint DEFAULT NULL,
  `company_email_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_gst_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_pan_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_information` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendor_slug_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_cover_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_cover_image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendor_group_id` int DEFAULT NULL,
  `display_name_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ifsc_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zone_id` int DEFAULT NULL,
  `verification` json NOT NULL,
  `verification_comment` json NOT NULL,
  `verification_detail_comment` json NOT NULL,
  `industry_id` int NOT NULL,
  `bank_account` json DEFAULT NULL,
  `mail_otp` int DEFAULT NULL COMMENT 'VENDOR MAIL OTP',
  `login_otp_expire_time` datetime DEFAULT NULL COMMENT 'VENDOR MAIL OTP EXPIRE TIME',
  `business_number` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'GST NUMBER',
  `preferred_shipping_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'CUSTOMER SHIPMENT MODE',
  `capabilities` json DEFAULT NULL,
  `vendor_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_email_verify` tinyint NOT NULL DEFAULT '0',
  `personalized_settings` json DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `is_delete` tinyint NOT NULL DEFAULT '0',
  `kyc_status` enum('verified','rejected','submitted','in-review','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `app_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_logo_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_logo_path` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_tag_keyword` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `linkedin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `selling_types` json DEFAULT NULL,
  `stripe_customer_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_audit_log`
--

CREATE TABLE `vendor_audit_log` (
  `id` int NOT NULL,
  `vendor_user_id` int NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `request_url` text,
  `object` text,
  `log_type` varchar(255) DEFAULT NULL,
  `description` text,
  `params` text,
  `browser_info` text,
  `module` varchar(255) DEFAULT NULL,
  `tenant_id` int NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_category`
--

CREATE TABLE `vendor_category` (
  `vendor_category_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `category_id` int NOT NULL,
  `vendor_category_commission` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_contact`
--

CREATE TABLE `vendor_contact` (
  `id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `requirement` text,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_country`
--

CREATE TABLE `vendor_country` (
  `id` int NOT NULL,
  `tenant_id` int NOT NULL,
  `country_id` int NOT NULL,
  `is_active` tinyint DEFAULT '1' COMMENT '0-IN-ACTIVE, 1-ACTIVE',
  `is_delete` tinyint DEFAULT '0' COMMENT '0-NOT DELETE, 1-DELETED',
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT NULL COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT NULL COMMENT 'LAST MODIFIED DATE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_currency`
--

CREATE TABLE `vendor_currency` (
  `id` int NOT NULL,
  `tenant_id` int NOT NULL,
  `currency_id` int NOT NULL,
  `is_active` tinyint DEFAULT '1' COMMENT '0-IN-ACTIVE, 1-ACTIVE',
  `is_delete` tinyint DEFAULT '0' COMMENT '0-NOT DELETE, 1-DELETED',
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT NULL COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT NULL COMMENT 'LAST MODIFIED DATE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- --------------------------------------------------------

--
-- Table structure for table `vendor_customer_price`
--

CREATE TABLE `vendor_customer_price` (
  `id` int NOT NULL,
  `price_group_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_email_template`
--

CREATE TABLE `vendor_email_template` (
  `id` int NOT NULL,
  `email_template_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_default` tinyint(1) DEFAULT '0',
  `tenant_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_global_setting`
--

CREATE TABLE `vendor_global_setting` (
  `vendor_global_setting_id` int NOT NULL,
  `default_commission` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_group`
--

CREATE TABLE `vendor_group` (
  `id` int NOT NULL,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `vendor_group_commission` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_group_category`
--

CREATE TABLE `vendor_group_category` (
  `id` int NOT NULL,
  `vendor_group_id` int NOT NULL,
  `category_id` int NOT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_invoice`
--

CREATE TABLE `vendor_invoice` (
  `vendor_invoice_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `order_id` int NOT NULL,
  `invoice_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_prefix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` int DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_firstname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_lastname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_invoice_item`
--

CREATE TABLE `vendor_invoice_item` (
  `vendor_invoice_item_id` int NOT NULL,
  `vendor_invoice_id` int NOT NULL,
  `order_product_id` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_language`
--

CREATE TABLE `vendor_language` (
  `id` int NOT NULL,
  `tenant_id` int NOT NULL,
  `language_id` int NOT NULL,
  `is_active` tinyint DEFAULT '1' COMMENT '0-IN-ACTIVE, 1-ACTIVE',
  `is_delete` tinyint DEFAULT '0' COMMENT '0-NOT DELETE, 1-DELETED',
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT NULL COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT NULL COMMENT 'LAST MODIFIED DATE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_media`
--

CREATE TABLE `vendor_media` (
  `id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_Path` varchar(255) DEFAULT NULL,
  `media_type` int NOT NULL COMMENT '1 - IMAGE 2 - VIDEO',
  `default_image` int DEFAULT '0',
  `video_type` int DEFAULT '0' COMMENT '1 - UPLOAD 2 - EMBEDDED URL',
  `sort_order` int DEFAULT '0',
  `show_home_page` int DEFAULT '0',
  `is_active` tinyint DEFAULT '1' COMMENT '0-IN-ACTIVE, 1-ACTIVE',
  `is_delete` tinyint DEFAULT '0' COMMENT '0-NOT DELETE, 1-DELETED',
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT NULL COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT NULL COMMENT 'LAST MODIFIED DATE',
  `url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_orders`
--

CREATE TABLE `vendor_orders` (
  `vendor_order_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `order_id` int NOT NULL,
  `sub_order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_order_status_id` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `tracking_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_product_id` int DEFAULT NULL,
  `commission` int DEFAULT '0',
  `make_settlement` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_orders_log`
--

CREATE TABLE `vendor_orders_log` (
  `vendor_order_log_id` int NOT NULL,
  `vendor_order_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `sub_order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_order_status_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_order_archive`
--

CREATE TABLE `vendor_order_archive` (
  `vendor_order_archive_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `order_id` int NOT NULL,
  `sub_order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_order_status_id` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `commission` int DEFAULT '0',
  `order_product_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_order_archive_log`
--

CREATE TABLE `vendor_order_archive_log` (
  `vendor_order_archive_log_id` int NOT NULL,
  `vendor_order_archive_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `sub_order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_order_status_id` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `commission` int DEFAULT '0',
  `order_product_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_order_products`
--

CREATE TABLE `vendor_order_products` (
  `vendor_order_product_id` int NOT NULL,
  `vendor_order_id` int DEFAULT NULL,
  `order_product_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_order_status`
--

CREATE TABLE `vendor_order_status` (
  `vendor_order_status_id` int NOT NULL,
  `order_status_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_payment`
--

CREATE TABLE `vendor_payment` (
  `vendor_payment_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `vendor_order_id` int NOT NULL,
  `payment_item_id` int NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `commission_amount` decimal(10,2) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `order_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_payment_archive`
--

CREATE TABLE `vendor_payment_archive` (
  `id` int NOT NULL,
  `vendor_id` int DEFAULT NULL,
  `vendor_order_id` int NOT NULL,
  `payment_item_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `commission_amount` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `vendor_order_archive` int DEFAULT '0',
  `order_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_permission_module`
--

CREATE TABLE `vendor_permission_module` (
  `module_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug_name` varchar(255) NOT NULL,
  `sort_order` int DEFAULT NULL,
  `module_group_id` int DEFAULT NULL,
  `is_listed` tinyint NOT NULL DEFAULT '0',
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vendor_permission_module`
--

INSERT INTO `vendor_permission_module` (`module_id`, `name`, `slug_name`, `sort_order`, `module_group_id`, `is_listed`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'List Order', 'list-order', 1, 1, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(2, 'View Order', 'view-order', 2, 1, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(3, 'Create Order', 'create-order', 3, 1, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(4, 'Export Order', 'export-order', 4, 1, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(5, 'Update Order', 'update-order', 5, 1, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(6, 'List Back Order', 'list-back-order', 1, 2, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(7, 'View Back Order', 'view-back-order', 2, 2, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(8, 'Export Back Order', 'export-back-order', 3, 2, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(9, 'Fulfill Now Back Order', 'fulfill-now-back-order', 4, 2, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(10, 'List Archive Orders', 'list-archive-orders', 1, 3, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(11, 'View Archive Orders', 'view-archive-orders', 2, 3, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(12, 'Export Archive Orders', 'export-archive-orders', 3, 3, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(13, 'Revoke Archive Orders', 'revoke-archive-orders', 4, 3, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(14, 'List Product', 'list-product', 1, 4, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(15, 'Create Product', 'create-product', 2, 4, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(16, 'Edit Product', 'edit-product', 3, 4, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(17, 'Delete Product', 'delete-product', 4, 4, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(18, 'Export Product', 'export-product', 5, 4, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(19, 'Stock List', 'stock-list', 1, 5, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(20, 'Update Stock', 'update-stock', 2, 5, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(21, 'List Categories', 'list-categories', 1, 6, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(22, 'Create Categories', 'create-categories', 2, 6, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(23, 'Edit Categories', 'edit-categories', 3, 6, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(24, 'Delete Categories', 'delete-categories', 4, 6, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(25, 'Export Categories', 'export-categories', 5, 6, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(26, 'Localization', 'localization', 6, 6, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(27, 'Standard Import', 'standard-import', 1, 7, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(28, 'Custom Import', 'custom-import', 2, 7, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(29, 'List Localization', 'list-localization', 1, 8, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(30, 'Edit Localization', 'edit-localization', 2, 8, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(31, 'List Customer', 'list-customer', 1, 9, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(32, 'Create Customer', 'create-customer', 2, 9, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(33, 'Edit Customer', 'edit-customer', 3, 9, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(34, 'Delete Customer', 'delete-customer', 4, 9, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(35, 'Export Customer', 'export-customer', 5, 9, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(36, 'List Customer User', 'list-customer-user', 1, 10, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(37, 'Create Customer User', 'create-customer-user', 2, 10, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(38, 'Edit Customer User', 'edit-customer-user', 3, 10, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(39, 'Delete Customer User', 'delete-customer-user', 4, 10, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(40, 'Export Customer User', 'export-customer-user', 5, 10, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(41, 'List Customer User Role', 'list-customer-user-role', 1, 11, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(42, 'Create Customer User Role', 'create-customer-user-role', 2, 11, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(43, 'Edit Customer User Role', 'edit-customer-user-role', 3, 11, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(44, 'Delete Customer User Role', 'delete-customer-user-role', 4, 11, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(45, 'Export Customer User Role', 'export-customer-user-role', 5, 11, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(46, 'Edit Access Control', 'edit-access-control', 6, 11, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(47, 'List Customer Group', 'list-customer-group', 1, 12, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(48, 'Create Customer Group', 'create-customer-group', 2, 12, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(49, 'Edit Customer Group', 'edit-customer-group', 3, 12, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(50, 'Delete Customer Group', 'delete-customer-group', 4, 12, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(51, 'Manage Customer Group', 'manage-customer-group', 5, 12, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(52, 'List Banners', 'list-banners', 1, 13, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(53, 'Create Banners', 'create-banners', 2, 13, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(54, 'Edit Banners', 'edit-banners', 3, 13, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(55, 'Delete Banners', 'delete-banners', 4, 13, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(56, 'Export Banners', 'export-banners', 5, 13, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(57, 'View Website Settings', 'view-website-settings', 1, 14, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(58, 'Edit Website Settings', 'edit-website-settings', 2, 14, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(59, 'List Setting Localization', 'list-setting-localization', 1, 15, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(60, 'List Role', 'list-role', 1, 16, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(61, 'Create Role', 'create-role', 2, 16, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(62, 'Edit Role', 'edit-role', 3, 16, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(63, 'Delete Role', 'delete-role', 4, 16, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(64, 'Edit Permission', 'edit-permission', 5, 16, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(65, 'List User', 'list-user', 6, 16, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(66, 'Create User', 'create-user', 7, 16, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(67, 'Edit User', 'edit-user', 8, 16, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(68, 'Delete User', 'delete-user', 9, 16, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(69, 'Maintenance', 'maintenance', 1, 17, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(70, 'Audit Log', 'audit-log', 2, 17, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(71, 'List Email Template', 'list-email-template', 5, 18, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(72, 'Edit Email Template', 'edit-email-template', 6, 18, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(73, 'Delete Email Template', 'delete-email-template', 7, 18, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(74, 'List Order Status', 'list-order-status', 1, 19, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(75, 'Create Order Status', 'create-order-status', 2, 19, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(76, 'Edit Order Status', 'edit-order-status', 3, 19, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(77, 'Delete Order Status', 'delete-order-status', 4, 19, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(78, 'Add-On', 'add-on', 1, 20, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(79, 'List Blogs', 'list-blogs', 1, 21, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(80, 'Create Blogs', 'create-blogs', 2, 21, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(81, 'Edit Blogs', 'edit-blogs', 3, 21, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(82, 'Delete Blogs', 'delete-blogs', 4, 21, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(83, 'Add Blogs Localization', 'add-blogs-localization', 5, 21, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(84, 'List Product Attribute', 'list-product-attribute', 1, 22, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(85, 'Create Product Attribute', 'create-product-attribute', 2, 22, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(86, 'Edit Product Attribute', 'edit-product-attribute', 3, 22, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(87, 'Delete Product Attribute', 'delete-product-attribute', 4, 22, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(88, 'List Pricing', 'list-pricing', 1, 23, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(89, 'Create Pricing', 'create-pricing', 2, 23, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(90, 'Edit Pricing', 'edit-pricing', 3, 23, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(91, 'Delete Pricing', 'delete-pricing', 4, 23, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(92, 'List Product QR', 'list-product-qr', 1, 24, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(93, 'Generate QR', 'generate-qr', 2, 24, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(94, 'List Product Variant', 'list-product-variant', 1, 25, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(95, 'Create Product Variant', 'create-product-variant', 2, 25, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(96, 'Edit Product Variant', 'edit-product-variant', 3, 25, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(97, 'Delete Product Variant', 'delete-product-variant', 4, 25, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(98, 'Add Variant Localization', 'add-variant-localization', 5, 25, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(99, 'List Variant Stock', 'list-variant-stock', 1, 26, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(100, 'Update Variant Stock', 'update-variant-stock', 2, 26, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(101, 'List Question and Answer', 'list-question-and-answer', 1, 27, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(102, 'Create Question and Answer', 'create-question-and-answer', 2, 27, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(103, 'Update Question and Answer', 'update-question-and-answer', 3, 27, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(104, 'Delete Question and Answer', 'delete-question-and-answer', 4, 27, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(105, 'List Rating and Review', 'list-rating-and-review', 1, 28, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(106, 'Update Rating and Review', 'update-rating-and-review', 2, 28, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(107, 'Product', 'seo-product', 1, 29, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(108, 'Pages', 'seo-pages', 2, 29, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(109, 'Category', 'seo-category', 3, 29, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(110, 'Blog', 'seo-blog', 4, 29, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(111, 'Site Map', 'seo-site-map', 5, 29, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(112, 'List Widget', 'list-widget', 1, 30, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(113, 'Create Widget', 'create-widget', 2, 30, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(114, 'Edit Widget', 'edit-widget', 3, 30, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(115, 'Delete Widget', 'delete-widget', 4, 30, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(116, 'Add Widget Localization', 'add-widget-localization', 5, 30, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(117, 'List Ticket', 'list-ticket', 1, 31, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(118, 'Update and Reply Ticket', 'update-and-reply-ticket', 2, 31, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(119, 'List Ticket Category', 'list-ticket-category', 3, 31, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(120, 'Create Ticket Category', 'create-ticket-category', 4, 31, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(121, 'Edit Ticket Category', 'edit-ticket-category', 5, 31, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(122, 'Delete Category', 'delete-category', 6, 31, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(123, 'List Shopping List', 'list-shopping-list', 1, 32, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(124, 'Edit Shopping List', 'edit-shopping-list', 2, 32, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(125, 'Duplicate Shopping List', 'duplicate-shopping-list', 3, 32, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(126, 'List RFQ', 'list-rfq', 1, 33, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(127, 'Edit RFQ', 'edit-rfq', 2, 33, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(128, 'Reply More Information', 'reply-more-information', 3, 33, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(129, 'List Quote', 'list-quote', 1, 34, 1, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(130, 'Create Quote', 'create-quote', 2, 34, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(131, 'Edit Quote', 'edit-quote', 3, 34, 0, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54'),
(132, 'List Contacts', 'list-contacts', 1, 35, 1, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(133, 'Create Contacts', 'create-contacts', 2, 35, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(134, 'Edit Contacts', 'edit-contacts', 3, 35, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(135, 'Delete Contacts', 'delete-contacts', 4, 35, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(136, 'List Sales Report', 'list-sales-report', 1, 36, 1, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(137, 'List Export Data', 'list-export-data', 1, 37, 1, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(138, 'Create Export Data', 'create-export-data', 1, 37, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(139, 'List Pages', 'list-pages', 1, 38, 1, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(140, 'Create Pages', 'create-pages', 2, 38, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(141, 'Edit Pages', 'edit-pages', 3, 38, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(142, 'Delete Pages', 'delete-pages', 4, 38, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(143, 'Localization Pages', 'localization-pages', 5, 38, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(144, 'List Page Group', 'list-page-group', 1, 39, 1, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(145, 'Create Page Group', 'create-page-group', 2, 39, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(146, 'Edit Page Group', 'edit-page-group', 3, 39, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(147, 'Delete Page Group', 'delete-page-group', 4, 39, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55'),
(148, 'Localization Page Group', 'localization-page-group', 5, 39, 0, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_permission_module_group`
--

CREATE TABLE `vendor_permission_module_group` (
  `module_group_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug_name` varchar(255) NOT NULL,
  `sort_order` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vendor_permission_module_group`
--

INSERT INTO `vendor_permission_module_group` (`module_group_id`, `name`, `slug_name`, `sort_order`, `created_by`, `created_date`, `modified_by`, `modified_date`, `description`) VALUES
(1, 'Orders', 'orders', 1, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Manage and track customer orders.'),
(2, 'Back Orders', 'back-orders', 2, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Handle back-ordered items awaiting stock replenishment.'),
(3, 'Archive Orders', 'archive-orders', 3, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Access and manage archived order history.'),
(4, 'Product List', 'product-list', 4, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'View and manage all products in the catalog.'),
(5, 'Stock Update', 'stock-update', 5, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Update stock levels for individual or bulk products.'),
(6, 'Categories', 'categories', 6, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Manage product categories and hierarchy.'),
(7, 'Bulk Product Import', 'bulk-product-import', 7, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Import multiple products at once using CSV or Excel files.'),
(8, 'Product Localization', 'product-localization', 8, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Manage product translations and localization settings.'),
(9, 'Customer', 'customer', 9, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'View and manage registered customers.'),
(10, 'Customer Users', 'customer-users', 10, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Manage sub-users or contacts for each customer account.'),
(11, 'Customer User Role', 'customer-user-role', 11, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Define roles and permissions for customer users.'),
(12, 'Customer Group', 'customer-group', 12, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Create and manage groups of customers for pricing or promotions.'),
(13, 'Banners', 'banners', 13, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Manage website banners and promotional sliders.'),
(14, 'Website Settings', 'website-settings', 14, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Configure overall website display and functionality settings.'),
(15, 'Localization Setting', 'localization-setting', 15, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Set languages, currencies, and region-based preferences.'),
(16, 'User and Permission', 'user-and-permission', 16, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Control system user accounts and permission access.'),
(17, 'System Settings', 'system-settings', 17, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Adjust global system configurations and parameters.'),
(18, 'Personalize Settings', 'personalize-settings', 18, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Customize store appearance and branding preferences.'),
(19, 'Order Status Settings', 'order-status-settings', 19, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Configure order statuses and workflows.'),
(20, 'Add-Ons Settings', 'add-ons-settings', 20, NULL, '2025-09-03 06:46:53', NULL, '2025-09-03 06:46:53', 'Manage installed add-ons and extensions.'),
(21, 'Blogs', 'blogs', 21, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Create and manage blog articles and posts.'),
(22, 'Product Attribute', 'product-attribute', 22, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Define and manage product attributes like size and color.'),
(23, 'Pricing List', 'pricing-list', 23, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Manage pricing rules and customer-specific price lists.'),
(24, 'Product QR', 'product-qr', 24, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Generate and manage product QR codes.'),
(25, 'Product Variant', 'product-variant', 25, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Manage product variants such as different sizes or colors.'),
(26, 'Variant Stock Update', 'variant-stock-update', 26, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Update stock quantities for specific product variants.'),
(27, 'Question And Answer', 'question-and-answer', 27, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Allow customers to ask and answer product-related questions.'),
(28, 'Rating and Review', 'rating-and-review', 28, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Collect and display customer reviews and ratings.'),
(29, 'Seo', 'seo', 29, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Optimize product and page SEO for better search rankings.'),
(30, 'Widgets', 'widgets', 30, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Manage widgets for website layout and marketing display.'),
(31, 'Support Tickets', 'support-tickets', 31, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Handle customer support requests through a ticket system.'),
(32, 'Shopping List', 'shopping-list', 32, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Enable customers to create and manage shopping lists.'),
(33, 'Request For Quotation', 'request-for-quotation', 33, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Allow customers to submit requests for price quotations.'),
(34, 'Quote', 'quote', 34, NULL, '2025-09-03 06:46:54', NULL, '2025-09-03 06:46:54', 'Manage and send quotations for customer requests.'),
(35, 'Contacts', 'contacts', 35, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55', 'View and manage contact or inquiry messages.'),
(36, 'Sales Report', 'sales-report', 36, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55', 'View and analyze sales reports and performance data.'),
(37, 'Export Data', 'export-data', 37, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55', 'Export reports or data for external analysis.'),
(38, 'Pages', 'pages', 38, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55', 'Manage static pages like About Us, Privacy Policy, etc.'),
(39, 'Page Group', 'page-group', 39, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55', 'Group and organize CMS pages together.'),
(40, 'Integrations', 'integrations', 40, NULL, '2025-09-03 06:46:55', NULL, '2025-09-03 06:46:55', 'Configure integrations with third-party services.');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_plugin`
--

CREATE TABLE `vendor_plugin` (
  `id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `plugin_id` int NOT NULL,
  `plugin_additional_info` json DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `plugin_form_info` text,
  `plugin_avatar` varchar(255) DEFAULT NULL,
  `plugin_avatar_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_price_group`
--

CREATE TABLE `vendor_price_group` (
  `id` int NOT NULL,
  `vendor_id` int DEFAULT NULL,
  `name` varchar(512) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  `is_default` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_price_group_detail`
--

CREATE TABLE `vendor_price_group_detail` (
  `id` int NOT NULL,
  `price_group_id` int DEFAULT NULL,
  `sku_id` int NOT NULL,
  `max_qty` int DEFAULT NULL,
  `price` decimal(15,4) DEFAULT NULL,
  `unit_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  `is_default` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `priority` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_price_group_schedule`
--

CREATE TABLE `vendor_price_group_schedule` (
  `id` int NOT NULL,
  `price_group_detail_id` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_product`
--

CREATE TABLE `vendor_product` (
  `vendor_product_id` int NOT NULL,
  `product_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `approval_flag` int DEFAULT NULL,
  `approved_by` int DEFAULT NULL,
  `approved_date` date DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `vendor_product_commission` int DEFAULT '0',
  `pincode_based_delivery` int DEFAULT '1',
  `quotation_available` int DEFAULT '0',
  `sku_id` int DEFAULT NULL,
  `reuse` int DEFAULT NULL,
  `reuse_status` int DEFAULT '0',
  `common_product_date` timestamp NULL DEFAULT NULL,
  `reject_reason` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_product_additional_file`
--

CREATE TABLE `vendor_product_additional_file` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `file_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `container_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `modified_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_settings`
--

CREATE TABLE `vendor_settings` (
  `id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `plugins` json DEFAULT NULL,
  `invoice_prefix` varchar(255) DEFAULT NULL,
  `invoice_logo_name` varchar(255) DEFAULT NULL,
  `invoice_logo_path` varchar(255) DEFAULT NULL,
  `is_maintenance` tinyint(1) NOT NULL DEFAULT '0',
  `store_name` varchar(255) DEFAULT NULL,
  `store_logo_name` varchar(255) DEFAULT NULL,
  `store_logo_path` varchar(255) DEFAULT NULL,
  `store_email` varchar(255) DEFAULT NULL,
  `store_mobile_no` varchar(20) DEFAULT NULL,
  `store_url` varchar(255) DEFAULT NULL,
  `store_address_line_1` varchar(255) DEFAULT NULL,
  `store_address_line_2` varchar(255) DEFAULT NULL,
  `store_country_id` int DEFAULT NULL,
  `store_state_id` int DEFAULT NULL,
  `store_city` varchar(255) DEFAULT NULL,
  `store_zipcode` varchar(20) DEFAULT NULL,
  `store_currency_id` int DEFAULT NULL,
  `store_language_id` int DEFAULT NULL,
  `store_time_zone` varchar(255) DEFAULT NULL,
  `seller_logo_name` varchar(255) DEFAULT NULL,
  `seller_logo_path` varchar(255) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mail_driver` varchar(255) DEFAULT NULL,
  `mail_host` varchar(255) DEFAULT NULL,
  `mail_username` varchar(255) DEFAULT NULL,
  `mail_password` varchar(255) DEFAULT NULL,
  `mail_port` int DEFAULT NULL,
  `mail_secure` tinyint(1) DEFAULT NULL,
  `mail_encryption` varchar(255) DEFAULT NULL,
  `mail_from` varchar(255) DEFAULT NULL,
  `site_name` varchar(255) DEFAULT NULL,
  `business_name` varchar(255) DEFAULT NULL,
  `store_owner` varchar(255) DEFAULT NULL,
  `default_country` varchar(25) DEFAULT NULL,
  `store_language_name` varchar(255) DEFAULT NULL,
  `store_secondary_language_name` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `items_per_page` int DEFAULT NULL,
  `currency_symbol` varchar(11) DEFAULT NULL,
  `seller_logo2` varchar(255) DEFAULT NULL,
  `seller_logo2_path` varchar(255) DEFAULT NULL,
  `zone_id` int DEFAULT NULL,
  `order_status` int DEFAULT NULL,
  `country` text,
  `copyrights` text,
  `product_create_count` int DEFAULT '0',
  `feature_access` json DEFAULT NULL,
  `show_badge` tinyint(1) NOT NULL DEFAULT '0',
  `customer_service_hours` varchar(255) DEFAULT NULL,
  `store_title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
--
--  Table structure for table `vendor_settings`
--
INSERT INTO vendor_settings (id, vendor_id, store_name, store_email, invoice_logo_name, invoice_logo_path, store_logo_name, store_logo_path, store_time_zone, seller_logo_name, seller_logo_path, created_date, modified_date, mail_driver, mail_host, mail_username, mail_password, mail_port, mail_secure, mail_encryption, mail_from, site_name, business_name, store_owner, default_country, store_language_name, store_secondary_language_name, is_active, items_per_page, currency_symbol, seller_logo2, seller_logo2_path, zone_id, order_status, country, copyrights, product_create_count, feature_access, show_badge, customer_service_hours, store_title, store_address_line_1, store_address_line_2, store_country_id, store_city, store_zipcode, store_currency_id, store_language_id)
  VALUES (1, 1, 'My Store', 'community@spurtcart.com', 'InvoiceLogo_1786700017500.png', 'storeLogo/', 'Img_1787746211628.png', 'storeLogo/', NULL, 'logo.jpg', 'ten0010/', '2025-12-12 13:26:43', '2026-09-17 14:41:21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Spurt', 'iop market vendors', 'SpurtCommerce', 1627, NULL, NULL, 1, 10, '₹', 'spurtlogo2.jpg', 'ten0010/', 76, 31, NULL, '@spurtcommerce', 0, '{"api_access": true, "badges_removal": true, "own_domain_name": true, "custom_email_name": true, "multiple_templates": true, "self_hosted_option": true, "source_code_access": true, "customize_store_templates": true}', 0, 'Monday to Friday: 9:00 AM - 6:00 PM', 'Spurt', '78E/8, 3rd New street', 'KK Nagar', 1627, 'Chennai', 543266, 57, 847);
-- --------------------------------------------------------
--
-- Table structure for table `vendor_settings_domain`
--

CREATE TABLE `vendor_settings_domain` (
  `id` int NOT NULL,
  `domain_name` varchar(255) DEFAULT NULL,
  `vendor_settings_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `is_active` int DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  `is_primary` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_tax`
--

CREATE TABLE `vendor_tax` (
  `id` int NOT NULL,
  `tenant_id` int NOT NULL,
  `tax_id` int NOT NULL,
  `is_active` tinyint DEFAULT '1' COMMENT '0-IN-ACTIVE, 1-ACTIVE',
  `is_delete` tinyint DEFAULT '0' COMMENT '0-NOT DELETE, 1-DELETED',
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT NULL COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT NULL COMMENT 'LAST MODIFIED DATE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_users`
--

CREATE TABLE `vendor_users` (
  `id` int NOT NULL,
  `user_group_id` int DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT '0',
  `email` varchar(55) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT '0',
  `avatar_path` varchar(255) DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` bigint UNSIGNED DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `delete_flag` int DEFAULT NULL,
  `permission` text,
  `forget_password_link_expires` datetime DEFAULT NULL,
  `forget_password_key` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT NULL COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT NULL COMMENT 'LAST MODIFIED DATE',
  `tenant_id` int DEFAULT NULL,
  `is_super_vendor` int DEFAULT NULL,
  `personalized_settings` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_user_group`
--

CREATE TABLE `vendor_user_group` (
  `id` int NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `slug` varchar(64) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `permission` text,
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT NULL COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT NULL COMMENT 'LAST MODIFIED DATE',
  `tenant_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_zone`
--

CREATE TABLE `vendor_zone` (
  `id` int NOT NULL,
  `tenant_id` int NOT NULL,
  `zone_id` int NOT NULL,
  `is_active` tinyint DEFAULT '1' COMMENT '0-IN-ACTIVE, 1-ACTIVE',
  `is_delete` tinyint DEFAULT '0' COMMENT '0-NOT DELETE, 1-DELETED',
  `created_by` int DEFAULT NULL COMMENT 'CREATED USER ID',
  `created_date` datetime DEFAULT NULL COMMENT 'CREATED SYSTEM DATE',
  `modified_by` int DEFAULT NULL COMMENT 'MODIFIED USER ID',
  `modified_date` datetime DEFAULT NULL COMMENT 'LAST MODIFIED DATE',
  `vendor_country_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `webhook`
--

CREATE TABLE `webhook` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `widget`
--

CREATE TABLE `widget` (
  `widget_id` int NOT NULL,
  `widget_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `widget_link_type` int DEFAULT NULL COMMENT '1-> category 2 -> product',
  `widget_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `position` int DEFAULT NULL,
  `meta_tag_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_tag_keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `widget_slug_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `show_home_page_widget` int DEFAULT '0',
  `widget_long_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tenant_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `widget_item`
--

CREATE TABLE `widget_item` (
  `id` int NOT NULL,
  `widget_id` int NOT NULL,
  `ref_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `widget_translation`
--

CREATE TABLE `widget_translation` (
  `id` int NOT NULL,
  `widget_id` int DEFAULT NULL,
  `language_id` int DEFAULT NULL,
  `widget_title` varchar(255) DEFAULT NULL,
  `widget_description` text,
  `widget_long_title` varchar(255) DEFAULT NULL,
  `meta_info` json DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `zone_id` int NOT NULL,
  `country_id` int NOT NULL,
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`zone_id`, `country_id`, `code`, `name`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(59, 99, 'MUM', 'Mumbai', 1, '2019-02-17 22:17:49', '2024-08-23 07:08:24', NULL, NULL),
(63, 99, 'KL', 'kerala', 1, '2019-02-18 23:46:22', '2021-05-22 04:43:11', NULL, NULL),
(67, 99, 'PY', 'Pondy', 1, '2019-02-19 07:24:14', '2021-05-22 04:43:32', NULL, NULL),
(68, 24, 's', 'pondy', 1, '2019-02-19 07:25:57', '2024-08-30 12:53:52', NULL, NULL),
(73, 25, 'Zone', 'Zone1', 0, '2019-02-19 07:46:47', '2024-08-23 11:26:02', NULL, NULL),
(74, 30, 'ZX', 'YUY', 1, '2019-02-20 06:38:52', '2024-08-14 06:59:09', NULL, NULL),
(75, 24, 'Y', 'UIU', 1, '2019-02-20 06:39:04', '2019-04-06 03:32:53', NULL, NULL),
(76, 99, 'TN', 'Tamil Nadu', 1, '2019-06-14 01:35:20', NULL, NULL, NULL),
(77, 3, 'A', 'A', 1, '2021-06-03 14:14:11', NULL, NULL, NULL),
(78, 104, '181086', 'כפר סבא', 1, '2022-09-20 07:01:00', '2022-10-04 06:09:21', NULL, NULL),
(79, 104, '123456', 'תל אביב', 1, '2022-10-04 06:09:45', NULL, NULL, NULL),
(80, 13, '455', 'Sydney', 1, '2024-07-23 05:58:31', NULL, NULL, NULL),
(81, 38, '94949', 'Whitehorse', 1, '2024-07-23 06:27:34', '2024-09-19 20:16:43', NULL, NULL),
(82, 129, '45', 'Kuala Lumpur', 1, '2024-07-23 06:32:43', NULL, NULL, NULL),
(83, 223, 'USA', 'New York', 1, '2024-07-23 08:44:10', NULL, NULL, NULL),
(84, 223, 'AB', 'Alabama', 1, '2024-07-23 08:51:54', NULL, NULL, NULL),
(85, 195, 'MD', 'Madrid', 1, '2024-07-23 08:58:59', NULL, NULL, NULL),
(86, 81, 'BN', 'Berlin', 1, '2024-07-23 09:01:01', NULL, NULL, NULL),
(87, 162, 'PJ', 'Punjab', 1, '2024-07-23 09:03:54', NULL, NULL, NULL),
(88, 277, 'MO', 'Moscow Oblast', 1, '2024-07-23 09:07:53', NULL, NULL, NULL),
(89, 278, 'LDF', 'Île-de-France', 1, '2024-07-23 09:11:16', NULL, NULL, NULL),
(90, 44, 'SHG', 'Shanghai', 1, '2024-07-23 09:13:42', NULL, NULL, NULL),
(91, 204, 'ZH', 'Zurich', 1, '2024-07-23 09:15:55', NULL, NULL, NULL),
(92, 105, 'LZ', 'Lazio', 1, '2024-07-23 09:17:56', NULL, NULL, NULL),
(93, 170, 'MV', 'Masovian Voivodeship', 1, '2024-07-23 09:21:25', NULL, NULL, NULL),
(105, 2, 'qqq', 'qqq', 1, '2024-08-29 07:29:09', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zone_to_geo_zone`
--

CREATE TABLE `zone_to_geo_zone` (
  `zone_to_geo_zone_id` int NOT NULL,
  `country_id` int DEFAULT NULL,
  `zone_id` int DEFAULT NULL,
  `geo_zone_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Indexes for table `answer_abuse_reason`
--
ALTER TABLE `answer_abuse_reason`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `answer_report_abuse`
--
ALTER TABLE `answer_report_abuse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_question_tbl_report_abuse` (`question_id`),
  ADD KEY `fk_tbl_answer_tbl_report_abuse` (`answer_id`),
  ADD KEY `fk_tbl_customer_tbl_report_abuse` (`customer_id`),
  ADD KEY `fk_answer_report_abuse_answer_abuse_reason_reason_id_idx` (`reason_id`);

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
  ADD KEY `banner_image_id` (`banner_image_id`),
  ADD KEY `fk_banner_image_banner_banner_id_idx` (`banner_id`);

--
-- Indexes for table `banner_images`
--
ALTER TABLE `banner_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_banner_images_banner_banner_id` (`banner_id`);

--
-- Indexes for table `banner_image_description`
--
ALTER TABLE `banner_image_description`
  ADD PRIMARY KEY (`banner_image_description_id`),
  ADD KEY `banner_image_description_id` (`banner_image_description_id`),
  ADD KEY `fk_banner_image_description_banner_image_banner_image_id_idx` (`banner_image_id`),
  ADD KEY `fk_banner_image_description_banner_banner_id_idx` (`banner_id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_blog_category` (`category_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `blog_category`
--
ALTER TABLE `blog_category`
  ADD PRIMARY KEY (`blog_category_id`),
  ADD KEY `fk_blog_category_blog_category_parent_id_idx` (`parent_int`);

--
-- Indexes for table `blog_category_path`
--
ALTER TABLE `blog_category_path`
  ADD PRIMARY KEY (`blog_category_path_id`),
  ADD KEY `fk_tbl_blog_path_blog_category` (`blog_category_id`),
  ADD KEY `fk_blog_category_path_blog_category_path_id_idx` (`path_id`);

--
-- Indexes for table `blog_category_translation`
--
ALTER TABLE `blog_category_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_blog_category_translation_language_language_id_idx` (`language_id`),
  ADD KEY `fk_blog_category_translation_blog_category_blog_category_id_idx` (`blog_category_id`);

--
-- Indexes for table `blog_related`
--
ALTER TABLE `blog_related`
  ADD PRIMARY KEY (`related_id`),
  ADD KEY `fk_tbl_blogRelated_tbl_blog_foreignKey` (`blog_id`),
  ADD KEY `fk_tbl_related_blog_id_tbl_blog` (`related_blog_id`);

--
-- Indexes for table `blog_translation`
--
ALTER TABLE `blog_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_blog_translation_language_language_id_idx` (`language_id`),
  ADD KEY `fk_blog_translation_blog_blog_id_idx` (`blog_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `category_commission`
--
ALTER TABLE `category_commission`
  ADD PRIMARY KEY (`category_commission_id`),
  ADD KEY `fk_tbl_category_commission_tbl_category_foreignKey` (`category_id`);

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
  ADD KEY `category_path_id` (`category_path_id`),
  ADD KEY `fk_category_path_category_category_id_idx` (`category_id`),
  ADD KEY `fk_category_path_category_path_id_idx` (`path_id`);

--
-- Indexes for table `category_translation`
--
ALTER TABLE `category_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category_translation_category_category_id_idx` (`category_id`),
  ADD KEY `fk_category_translation_language_language_id_idx` (`language_id`);

--
-- Indexes for table `chat_log`
--
ALTER TABLE `chat_log`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `id` (`id`),
  ADD KEY `fk_customer_vendor_tenant_id` (`tenant_id`);


--
-- Indexes for table `customer_activity`
--
ALTER TABLE `customer_activity`
  ADD PRIMARY KEY (`customer_activity_id`),
  ADD KEY `fk_tbl_customer_activity_tbl_customer` (`customer_id`),
  ADD KEY `FK_customer_user_id_to_customer_users` (`customer_user_id`);

--
-- Indexes for table `customer_cart`
--
ALTER TABLE `customer_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_customer_cart_tbl_product_foreignKey` (`product_id`),
  ADD KEY `fk_customer_cart_customer_customer_id_idx` (`customer_id`);

--
-- Indexes for table `customer_contact`
--
ALTER TABLE `customer_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_document`
--
ALTER TABLE `customer_document`
  ADD PRIMARY KEY (`customer_document_id`),
  ADD KEY `fk_tbl_customerDocument_tbl_customer_foreignKey` (`customer_id`);

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
  ADD KEY `customer_ip_id` (`customer_ip_id`),
  ADD KEY `fk_customer_ip_customer_customer_id_idx` (`customer_id`);

--
-- Indexes for table `customer_permission_module`
--
ALTER TABLE `customer_permission_module`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_module_group_to_permission_module` (`module_group_id`);

--
-- Indexes for table `customer_permission_module_group`
--
ALTER TABLE `customer_permission_module_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_to_group`
--
ALTER TABLE `customer_to_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_customer_to_group_customer__id` (`customer_id`),
  ADD KEY `fk_customer_to_group_customer_group__id` (`customer_group_id`);

--
-- Indexes for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  ADD PRIMARY KEY (`customer_transaction_id`),
  ADD KEY `fk_customer_transaction_order1` (`order_id`),
  ADD KEY `fk_customer_transaction_customer1` (`customer_id`),
  ADD KEY `customer_transaction_id` (`customer_transaction_id`);

--
-- Indexes for table `customer_users`
--
ALTER TABLE `customer_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_customer_user_group_id_to_customer_user_group` (`customer_user_group_id`);

--
-- Indexes for table `customer_user_group`
--
ALTER TABLE `customer_user_group`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `export_log`
--
ALTER TABLE `export_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `family`
--
ALTER TABLE `family`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `geo_zone`
--
ALTER TABLE `geo_zone`
  ADD PRIMARY KEY (`geo_zone_id`),
  ADD KEY `geo_zone_id` (`geo_zone_id`);

--
-- Indexes for table `industry`
--
ALTER TABLE `industry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `job_id` (`job_id`);

--
-- Indexes for table `live_address`
--
ALTER TABLE `live_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_live_address_customer_customer_id_idx` (`customer_id`);

--
-- Indexes for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_login_attempts_customer_customer_id_idx` (`customer_id`),
  ADD KEY `FK_customer_user_id_id_to_customer_users` (`customer_user_id`);

--
-- Indexes for table `login_log`
--
ALTER TABLE `login_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `m_seo_meta`
--
ALTER TABLE `m_seo_meta`
  ADD PRIMARY KEY (`seo_id`),
  ADD UNIQUE KEY `UQ_ba5735c86233117cd90a813370d` (`seo_id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_order_currency1` (`currency_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `order_fulfillment_status`
--
ALTER TABLE `order_fulfillment_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_fulfillment_status_vendor_tenant_id` (`tenant_id`);

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
  ADD KEY `order_log_id` (`order_log_id`),
  ADD KEY `fk_order_log_country_shipping_country_id_idx` (`shipping_country_id`);

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
-- Indexes for table `order_product_archive`
--
ALTER TABLE `order_product_archive`
  ADD PRIMARY KEY (`order_product_archive_id`);

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
  ADD PRIMARY KEY (`order_status_id`),
  ADD KEY `fk_order_status_vendor_tenant_id` (`tenant_id`);

--
-- Indexes for table `order_status_to_fulfillment`
--
ALTER TABLE `order_status_to_fulfillment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_94da37f98b374544970c61620c0` (`order_status_id`),
  ADD KEY `FK_6e4dcfa1f3ed4efcf7e623886f4` (`order_fulfillment_status_id`);

--
-- Indexes for table `order_total`
--
ALTER TABLE `order_total`
  ADD PRIMARY KEY (`order_total_id`),
  ADD KEY `fk_order_total_order_order_id_idx` (`order_id`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`page_id`),
  ADD KEY `fk_page_page_group1` (`page_group_id`),
  ADD KEY `page_id` (`page_id`),
  ADD KEY `fk_pages_vendor_tenant_id` (`tenant_id`);

--
-- Indexes for table `page_group`
--
ALTER TABLE `page_group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `page_group_translation`
--
ALTER TABLE `page_group_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_page_group_translation_page_group_page_group_id_idx` (`page_group_id`),
  ADD KEY `fk_page_group_translation_language_language_id_idx` (`language_id`);

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
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `price_update_file_log`
--
ALTER TABLE `price_update_file_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_vendor_tbl_price_update_file_log_foreignKey` (`vendor_id`);

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
  ADD KEY `product_description_id` (`product_description_id`),
  ADD KEY `fk_product_description_product_product_id_idx` (`product_id`);

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
-- Indexes for table `product_price_log`
--
ALTER TABLE `product_price_log`
  ADD PRIMARY KEY (`product_price_log_id`),
  ADD KEY `fk_tbl_product_price_log_tbl_product_foreignKey` (`product_id`),
  ADD KEY `fk_tbl_product_price_log_tbl_vendor_foreignKey` (`vendor_id`);


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
  ADD KEY `price` (`price`),
  ADD KEY `fk_product_special_customer_group_customer_group_id_idx` (`customer_group_id`);

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
  ADD KEY `id` (`id`),
  ADD KEY `fk_product_view_log_customer_customer_id_idx` (`customer_id`);
--
-- Indexes for table `registration_user_otp`
--
ALTER TABLE `registration_user_otp`
  ADD PRIMARY KEY (`otp_id`);

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
  ADD KEY `settings_id` (`settings_id`),
  ADD KEY `fk_tbl_settings_lanaguge_language_id` (`default_language_id`);


--
-- Indexes for table `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopping_cart_detail`
--
ALTER TABLE `shopping_cart_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_shopping_cart_detail_shopping_cart_id` (`shopping_cart_id`);

--
-- Indexes for table `site_filter`
--
ALTER TABLE `site_filter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_filter_category`
--
ALTER TABLE `site_filter_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_site_filter_category` (`site_filter_id`),
  ADD KEY `fk_site_filter_category_category_category_id_idx` (`category_id`);

--
-- Indexes for table `site_filter_section`
--
ALTER TABLE `site_filter_section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_site_filter_section` (`site_filter_id`);

--
-- Indexes for table `site_filter_section_item`
--
ALTER TABLE `site_filter_section_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_site_filter_section_item` (`site_filter_section_id`);

--
-- Indexes for table `site_map`
--
ALTER TABLE `site_map`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_venodr_site_map_tenant_id` (`tenant_id`);

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
-- Indexes for table `stock_status`
--
ALTER TABLE `stock_status`
  ADD PRIMARY KEY (`stock_status_id`);

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
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`vendor_id`),
  ADD KEY `fk_tbl_vendor_tbl_customer_foreignKey` (`customer_id`),
  ADD KEY `fk_vendor_industry_industry_id` (`industry_id`);

--
-- Indexes for table `vendor_audit_log`
--
ALTER TABLE `vendor_audit_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_audit_log_vendor_user_foreignKey` (`vendor_user_id`);

--
-- Indexes for table `vendor_category`
--
ALTER TABLE `vendor_category`
  ADD PRIMARY KEY (`vendor_category_id`),
  ADD KEY `fk_tbl_vendor_category_tbl_vendor_foreignKey` (`vendor_id`),
  ADD KEY `fk_tbl_vendor_category_tbl_category_foreignKey` (`category_id`);

--
-- Indexes for table `vendor_contact`
--
ALTER TABLE `vendor_contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_vendor_contact_tbl_vendor` (`vendor_id`);

--
-- Indexes for table `vendor_country`
--
ALTER TABLE `vendor_country`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_country_tenant_id` (`tenant_id`),
  ADD KEY `fk_vendor_country_country_id` (`country_id`);

--
-- Indexes for table `vendor_currency`
--
ALTER TABLE `vendor_currency`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_currency_tenant_id` (`tenant_id`),
  ADD KEY `fk_vendor_currency_currency_id` (`currency_id`);

--
-- Indexes for table `vendor_customer_price`
--
ALTER TABLE `vendor_customer_price`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_customer_price_customer_customer_idx` (`customer_id`),
  ADD KEY `fk_vendor_customer_price_vendor_price_group_price_group_idx` (`price_group_id`);

--
-- Indexes for table `vendor_email_template`
--
ALTER TABLE `vendor_email_template`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_email_template_vendor_email_template_id` (`email_template_id`);

--
-- Indexes for table `vendor_global_setting`
--
ALTER TABLE `vendor_global_setting`
  ADD PRIMARY KEY (`vendor_global_setting_id`);

--
-- Indexes for table `vendor_group`
--
ALTER TABLE `vendor_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_group_category`
--
ALTER TABLE `vendor_group_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_group_id` (`vendor_group_id`),
  ADD KEY `fk_vendor_group_category_category_category_id_idx` (`category_id`);

--
-- Indexes for table `vendor_invoice`
--
ALTER TABLE `vendor_invoice`
  ADD PRIMARY KEY (`vendor_invoice_id`),
  ADD KEY `fk_tbl_vendor_tbl_vendor_invoice_foreignKey` (`vendor_id`),
  ADD KEY `fk_tbl_order_tbl_vendor_invoice_foreignKey` (`order_id`);

--
-- Indexes for table `vendor_invoice_item`
--
ALTER TABLE `vendor_invoice_item`
  ADD PRIMARY KEY (`vendor_invoice_item_id`),
  ADD KEY `fk_tbl_order_product_tbl_vendor_invoice_item_foreignKey` (`vendor_invoice_id`),
  ADD KEY `fk_vendor_invoice_item_order_product_order_product_id_idx` (`order_product_id`);

--
-- Indexes for table `vendor_language`
--
ALTER TABLE `vendor_language`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_language_tenant_id` (`tenant_id`),
  ADD KEY `fk_vendor_language_language_id` (`language_id`);

--
-- Indexes for table `vendor_media`
--
ALTER TABLE `vendor_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_media` (`vendor_id`);

--
-- Indexes for table `vendor_orders`
--
ALTER TABLE `vendor_orders`
  ADD PRIMARY KEY (`vendor_order_id`),
  ADD KEY `FK_278a24fad52a1cb864326bf8480` (`vendor_id`),
  ADD KEY `FK_5044c3c237f11946768a05a6a50` (`order_id`),
  ADD KEY `fk_tbl_order_product_tbl_vendor_order_foreignKey` (`order_product_id`);

--
-- Indexes for table `vendor_orders_log`
--
ALTER TABLE `vendor_orders_log`
  ADD PRIMARY KEY (`vendor_order_log_id`),
  ADD KEY `FK_b3b2b536f916fbf32f30d763a8f` (`vendor_id`),
  ADD KEY `FK_94015e6a9502a903b6e63268b56` (`order_id`),
  ADD KEY `fk_vendor_orders_log_vendor_order_vendor_order_id_idx` (`vendor_order_id`);

--
-- Indexes for table `vendor_order_archive`
--
ALTER TABLE `vendor_order_archive`
  ADD PRIMARY KEY (`vendor_order_archive_id`),
  ADD KEY `FK_71cf32310715a162fbe0a1d3ab4` (`vendor_id`),
  ADD KEY `FK_4eb695729b08afef5b7794c176f` (`order_id`),
  ADD KEY `FK_54e8ab35b68535a3f1bca9e0003` (`sub_order_status_id`);

--
-- Indexes for table `vendor_order_archive_log`
--
ALTER TABLE `vendor_order_archive_log`
  ADD PRIMARY KEY (`vendor_order_archive_log_id`),
  ADD KEY `fk_tbl_vendorOrderArchiveLog_tbl_vendor_foreignKey` (`vendor_id`),
  ADD KEY `fk_tbl_vendorOrderArchiveLog_tbl_order_foreignKey` (`order_id`),
  ADD KEY `fk_tbl_vendorOrderArchiveLog_tbl_vendorOrderArchive_foreignKey` (`vendor_order_archive_id`),
  ADD KEY `fk_tbl_vendorOrderArchiveLog_tbl_vendorOrderStatus_foreignKey` (`sub_order_status_id`);

--
-- Indexes for table `vendor_order_products`
--
ALTER TABLE `vendor_order_products`
  ADD PRIMARY KEY (`vendor_order_product_id`),
  ADD KEY `FK_ab5f080eb3449fd728a7eb912a9` (`vendor_order_id`),
  ADD KEY `FK_5280eb05a7353ec3bb43ba6f716` (`order_product_id`);

--
-- Indexes for table `vendor_order_status`
--
ALTER TABLE `vendor_order_status`
  ADD PRIMARY KEY (`vendor_order_status_id`);

--
-- Indexes for table `vendor_payment`
--
ALTER TABLE `vendor_payment`
  ADD PRIMARY KEY (`vendor_payment_id`),
  ADD KEY `payment_items_id` (`payment_item_id`),
  ADD KEY `vendor_id` (`vendor_id`),
  ADD KEY `vendor_order_id` (`vendor_order_id`);

--
-- Indexes for table `vendor_payment_archive`
--
ALTER TABLE `vendor_payment_archive`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_vendorPaymentArchive_tbl_vendor_foreignKey` (`vendor_id`),
  ADD KEY `fk_tbl_vendorPaymentArchive_tbl_vendorOrders_foreignKey` (`vendor_order_id`),
  ADD KEY `fk_tbl_vendorPaymentArchive_tbl_paymentItems_foreignKey` (`payment_item_id`);

--
-- Indexes for table `vendor_permission_module`
--
ALTER TABLE `vendor_permission_module`
  ADD PRIMARY KEY (`module_id`),
  ADD KEY `fk_vendor_permission_module_module_group_id` (`module_group_id`);

--
-- Indexes for table `vendor_permission_module_group`
--
ALTER TABLE `vendor_permission_module_group`
  ADD PRIMARY KEY (`module_group_id`);

--
-- Indexes for table `vendor_plugin`
--
ALTER TABLE `vendor_plugin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_31eed89fefcd05ef259d76afcfc` (`plugin_id`),
  ADD KEY `FK_4cd8cbc11c7ea6991b0d37dbd65` (`vendor_id`);

--
-- Indexes for table `vendor_price_group`
--
ALTER TABLE `vendor_price_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_price_group_detail`
--
ALTER TABLE `vendor_price_group_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_price_group_detail_vendor_price_group_price_group_idx` (`price_group_id`),
  ADD KEY `fk_vendor_price_group_detail_sku_sku_id` (`sku_id`);

--
-- Indexes for table `vendor_price_group_schedule`
--
ALTER TABLE `vendor_price_group_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_pric_grp_sched_vendor_pric_grp_dets_pric_grp_dets_idx` (`price_group_detail_id`);

--
-- Indexes for table `vendor_product`
--
ALTER TABLE `vendor_product`
  ADD PRIMARY KEY (`vendor_product_id`),
  ADD KEY `fk_tbl_vendor_product_tbl_product_foreignKey` (`product_id`),
  ADD KEY `fk_tbl_vendor_product_tbl_vendor_foreignKey` (`vendor_id`),
  ADD KEY `fk_tbl_vendor_product_tbl_sku_foreignKey` (`sku_id`);

--
-- Indexes for table `vendor_product_additional_file`
--
ALTER TABLE `vendor_product_additional_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_product` (`product_id`);

--
-- Indexes for table `vendor_settings`
--
ALTER TABLE `vendor_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_dd4d271c58fcef10e7fca98d2ee` (`vendor_id`);

--
-- Indexes for table `vendor_settings_domain`
--
ALTER TABLE `vendor_settings_domain`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_tax`
--
ALTER TABLE `vendor_tax`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_tax_tenant_id` (`tenant_id`),
  ADD KEY `fk_vendor_tax_tax_id` (`tax_id`);

--
-- Indexes for table `vendor_users`
--
ALTER TABLE `vendor_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_users_vendor` (`tenant_id`);

--
-- Indexes for table `vendor_user_group`
--
ALTER TABLE `vendor_user_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_zone`
--
ALTER TABLE `vendor_zone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendor_zone_tenant_id` (`tenant_id`),
  ADD KEY `fk_vendor_zone_zone_id` (`zone_id`),
  ADD KEY `fk_ven_zone_ven_country_id_vendor_country_id` (`vendor_country_id`);

--
-- Indexes for table `webhook`
--
ALTER TABLE `webhook`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `widget`
--
ALTER TABLE `widget`
  ADD PRIMARY KEY (`widget_id`),
  ADD KEY `fk_widget_vendor_tenant_id` (`tenant_id`);

--
-- Indexes for table `widget_item`
--
ALTER TABLE `widget_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_widget_item_Related_tbl_widget` (`widget_id`);

--
-- Indexes for table `widget_translation`
--
ALTER TABLE `widget_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_widget_widget_translation_widget_id` (`widget_id`),
  ADD KEY `fk_widget_widget_language_language_id` (`language_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `answer_abuse_reason`
--
ALTER TABLE `answer_abuse_reason`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `answer_report_abuse`
--
ALTER TABLE `answer_report_abuse`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `audit_log`
--
ALTER TABLE `audit_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `banner_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banner_group`
--
ALTER TABLE `banner_group`
  MODIFY `banner_group_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banner_image`
--
ALTER TABLE `banner_image`
  MODIFY `banner_image_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banner_images`
--
ALTER TABLE `banner_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banner_image_description`
--
ALTER TABLE `banner_image_description`
  MODIFY `banner_image_description_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_category`
--
ALTER TABLE `blog_category`
  MODIFY `blog_category_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_category_path`
--
ALTER TABLE `blog_category_path`
  MODIFY `blog_category_path_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_category_translation`
--
ALTER TABLE `blog_category_translation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_related`
--
ALTER TABLE `blog_related`
  MODIFY `related_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_translation`
--
ALTER TABLE `blog_translation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category_commission`
--
ALTER TABLE `category_commission`
  MODIFY `category_commission_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category_description`
--
ALTER TABLE `category_description`
  MODIFY `category_description_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category_path`
--
ALTER TABLE `category_path`
  MODIFY `category_path_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category_translation`
--
ALTER TABLE `category_translation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_log`
--
ALTER TABLE `chat_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `country_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=294;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `currency_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_activity`
--
ALTER TABLE `customer_activity`
  MODIFY `customer_activity_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_cart`
--
ALTER TABLE `customer_cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_contact`
--
ALTER TABLE `customer_contact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_document`
--
ALTER TABLE `customer_document`
  MODIFY `customer_document_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_group`
--
ALTER TABLE `customer_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_ip`
--
ALTER TABLE `customer_ip`
  MODIFY `customer_ip_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_permission_module`
--
ALTER TABLE `customer_permission_module`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `customer_permission_module_group`
--
ALTER TABLE `customer_permission_module_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customer_to_group`
--
ALTER TABLE `customer_to_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  MODIFY `customer_transaction_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_users`
--
ALTER TABLE `customer_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_user_group`
--
ALTER TABLE `customer_user_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_wishlist`
--
ALTER TABLE `customer_wishlist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_template`
--
ALTER TABLE `email_template`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `export_log`
--
ALTER TABLE `export_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `family`
--
ALTER TABLE `family`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `geo_zone`
--
ALTER TABLE `geo_zone`
  MODIFY `geo_zone_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `industry`
--
ALTER TABLE `industry`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `live_address`
--
ALTER TABLE `live_address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_log`
--
ALTER TABLE `login_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1058;

--
-- AUTO_INCREMENT for table `m_seo_meta`
--
ALTER TABLE `m_seo_meta`
  MODIFY `seo_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT for table `order_fulfillment_status`
--
ALTER TABLE `order_fulfillment_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `order_history_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_log`
--
ALTER TABLE `order_log`
  MODIFY `order_log_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_option`
--
ALTER TABLE `order_option`
  MODIFY `order_option_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_product`
--
ALTER TABLE `order_product`
  MODIFY `order_product_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_product_archive`
--
ALTER TABLE `order_product_archive`
  MODIFY `order_product_archive_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_product_log`
--
ALTER TABLE `order_product_log`
  MODIFY `order_product_log_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `order_status_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_status_to_fulfillment`
--
ALTER TABLE `order_status_to_fulfillment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_total`
--
ALTER TABLE `order_total`
  MODIFY `order_total_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `page_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page_group`
--
ALTER TABLE `page_group`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page_group_translation`
--
ALTER TABLE `page_group_translation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_archive`
--
ALTER TABLE `payment_archive`
  MODIFY `payment_archive_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_items`
--
ALTER TABLE `payment_items`
  MODIFY `payment_item_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_items_archive`
--
ALTER TABLE `payment_items_archive`
  MODIFY `payment_item_archive_id` int NOT NULL AUTO_INCREMENT;

--
-- Indexes for table `payment_rule`
--
ALTER TABLE `payment_rule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pm_rule_pm_id` (`payment_method_id`);

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permission_module`
--
ALTER TABLE `permission_module`
  MODIFY `module_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=361;

--
-- AUTO_INCREMENT for table `permission_module_group`
--
ALTER TABLE `permission_module_group`
  MODIFY `module_group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `plugins`
--
ALTER TABLE `plugins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `plugin_menu`
--
ALTER TABLE `plugin_menu`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `price_update_file_log`
--
ALTER TABLE `price_update_file_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_description`
--
ALTER TABLE `product_description`
  MODIFY `product_description_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_discount`
--
ALTER TABLE `product_discount`
  MODIFY `product_discount_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `product_image_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_price_log`
--
ALTER TABLE `product_price_log`
  MODIFY `product_price_log_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_special`
--
ALTER TABLE `product_special`
  MODIFY `product_special_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_stock_alert`
--
ALTER TABLE `product_stock_alert`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_tag`
--
ALTER TABLE `product_tag`
  MODIFY `product_tag_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_tire_price`
--
ALTER TABLE `product_tire_price`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_to_category`
--
ALTER TABLE `product_to_category`
  MODIFY `product_to_category_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_video`
--
ALTER TABLE `product_video`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_view_log`
--
ALTER TABLE `product_view_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registration_user_otp`
--
ALTER TABLE `registration_user_otp`
  MODIFY `otp_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `settings_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shopping_cart`
--
ALTER TABLE `shopping_cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopping_cart_detail`
--
ALTER TABLE `shopping_cart_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_filter`
--
ALTER TABLE `site_filter`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_filter_category`
--
ALTER TABLE `site_filter_category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_filter_section`
--
ALTER TABLE `site_filter_section`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_filter_section_item`
--
ALTER TABLE `site_filter_section_item`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_map`
--
ALTER TABLE `site_map`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sku`
--
ALTER TABLE `sku`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_log`
--
ALTER TABLE `stock_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_status`
--
ALTER TABLE `stock_status`
  MODIFY `stock_status_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tax`
--
ALTER TABLE `tax`
  MODIFY `tax_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `vendor_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_audit_log`
--
ALTER TABLE `vendor_audit_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_category`
--
ALTER TABLE `vendor_category`
  MODIFY `vendor_category_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_contact`
--
ALTER TABLE `vendor_contact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_country`
--
ALTER TABLE `vendor_country`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_currency`
--
ALTER TABLE `vendor_currency`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT for table `vendor_customer_price`
--
ALTER TABLE `vendor_customer_price`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_email_template`
--
ALTER TABLE `vendor_email_template`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_global_setting`
--
ALTER TABLE `vendor_global_setting`
  MODIFY `vendor_global_setting_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_group`
--
ALTER TABLE `vendor_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_group_category`
--
ALTER TABLE `vendor_group_category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_invoice`
--
ALTER TABLE `vendor_invoice`
  MODIFY `vendor_invoice_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_invoice_item`
--
ALTER TABLE `vendor_invoice_item`
  MODIFY `vendor_invoice_item_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_language`
--
ALTER TABLE `vendor_language`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_media`
--
ALTER TABLE `vendor_media`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_orders`
--
ALTER TABLE `vendor_orders`
  MODIFY `vendor_order_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_orders_log`
--
ALTER TABLE `vendor_orders_log`
  MODIFY `vendor_order_log_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_order_archive`
--
ALTER TABLE `vendor_order_archive`
  MODIFY `vendor_order_archive_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_order_archive_log`
--
ALTER TABLE `vendor_order_archive_log`
  MODIFY `vendor_order_archive_log_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_order_products`
--
ALTER TABLE `vendor_order_products`
  MODIFY `vendor_order_product_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_order_status`
--
ALTER TABLE `vendor_order_status`
  MODIFY `vendor_order_status_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_payment`
--
ALTER TABLE `vendor_payment`
  MODIFY `vendor_payment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_payment_archive`
--
ALTER TABLE `vendor_payment_archive`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_permission_module`
--
ALTER TABLE `vendor_permission_module`
  MODIFY `module_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `vendor_permission_module_group`
--
ALTER TABLE `vendor_permission_module_group`
  MODIFY `module_group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `vendor_plugin`
--
ALTER TABLE `vendor_plugin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_price_group`
--
ALTER TABLE `vendor_price_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_price_group_detail`
--
ALTER TABLE `vendor_price_group_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_price_group_schedule`
--
ALTER TABLE `vendor_price_group_schedule`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_product`
--
ALTER TABLE `vendor_product`
  MODIFY `vendor_product_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_product_additional_file`
--
ALTER TABLE `vendor_product_additional_file`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_settings`
--
ALTER TABLE `vendor_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_settings_domain`
--
ALTER TABLE `vendor_settings_domain`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_tax`
--
ALTER TABLE `vendor_tax`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_users`
--
ALTER TABLE `vendor_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_user_group`
--
ALTER TABLE `vendor_user_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_zone`
--
ALTER TABLE `vendor_zone`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `webhook`
--
ALTER TABLE `webhook`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widget`
--
ALTER TABLE `widget`
  MODIFY `widget_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widget_item`
--
ALTER TABLE `widget_item`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widget_translation`
--
ALTER TABLE `widget_translation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `zone_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `zone_to_geo_zone`
--
ALTER TABLE `zone_to_geo_zone`
  MODIFY `zone_to_geo_zone_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_customer_id_tbl_customer_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Constraints for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD CONSTRAINT `fk_audit_log_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banner`
--
ALTER TABLE `banner`
  ADD CONSTRAINT `fk_banner_banner_group_banner_group_id` FOREIGN KEY (`banner_group_id`) REFERENCES `banner_group` (`banner_group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banner_image`
--
ALTER TABLE `banner_image`
  ADD CONSTRAINT `fk_banner_image_banner_banner_id` FOREIGN KEY (`banner_id`) REFERENCES `banner` (`banner_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banner_images`
--
ALTER TABLE `banner_images`
  ADD CONSTRAINT `fk_banner_images_banner_banner_id` FOREIGN KEY (`banner_id`) REFERENCES `banner` (`banner_id`) ON DELETE CASCADE;

--
-- Constraints for table `banner_image_description`
--
ALTER TABLE `banner_image_description`
  ADD CONSTRAINT `fk_banner_image_description_banner_banner_id` FOREIGN KEY (`banner_id`) REFERENCES `banner` (`banner_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_banner_image_description_banner_image_banner_image_id` FOREIGN KEY (`banner_image_id`) REFERENCES `banner_image` (`banner_image_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `fk_blog_blog_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `blog_category` (`blog_category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blog_category`
--
ALTER TABLE `blog_category`
  ADD CONSTRAINT `fk_blog_category_blog_category_parent_int` FOREIGN KEY (`parent_int`) REFERENCES `blog_category` (`blog_category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blog_category_path`
--
ALTER TABLE `blog_category_path`
  ADD CONSTRAINT `fk_blog_category_path_blog_category_path_id` FOREIGN KEY (`path_id`) REFERENCES `blog_category` (`blog_category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tbl_blog_path_blog_category` FOREIGN KEY (`blog_category_id`) REFERENCES `blog_category` (`blog_category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blog_category_translation`
--
ALTER TABLE `blog_category_translation`
  ADD CONSTRAINT `fk_blog_category_translation_blog_category_blog_category_id_idx` FOREIGN KEY (`blog_category_id`) REFERENCES `blog_category` (`blog_category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_blog_category_translation_language_language_id_idx` FOREIGN KEY (`language_id`) REFERENCES `vendor_language` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_related`
--
ALTER TABLE `blog_related`
  ADD CONSTRAINT `fk_tbl_blogRelated_tbl_blog_foreignKey` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tbl_related_blog_id_tbl_blog` FOREIGN KEY (`related_blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blog_translation`
--
ALTER TABLE `blog_translation`
  ADD CONSTRAINT `fk_blog_translation_blog_blog_id_idx` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_blog_translation_language_language_id_idx` FOREIGN KEY (`language_id`) REFERENCES `vendor_language` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `category_commission`
--
ALTER TABLE `category_commission`
  ADD CONSTRAINT `fk_tbl_category_commission_tbl_category_foreignKey` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category_description`
--
ALTER TABLE `category_description`
  ADD CONSTRAINT `fk_Category_CategoryDescription` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category_path`
--
ALTER TABLE `category_path`
  ADD CONSTRAINT `fk_category_path_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_category_path_category_path_id` FOREIGN KEY (`path_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category_translation`
--
ALTER TABLE `category_translation`
  ADD CONSTRAINT `fk_category_translation_category_category_id_idx` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_category_translation_vendor_language_language_id` FOREIGN KEY (`language_id`) REFERENCES `vendor_language` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `fk_customer_vendor_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer_activity`
--
ALTER TABLE `customer_activity`
  ADD CONSTRAINT `FK_customer_user_id_to_customer_users` FOREIGN KEY (`customer_user_id`) REFERENCES `customer_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tbl_customer_activity_tbl_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_cart`
--
ALTER TABLE `customer_cart`
  ADD CONSTRAINT `fk_tbl_customer_cart_tbl_product_foreignKey` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_document`
--
ALTER TABLE `customer_document`
  ADD CONSTRAINT `fk_tbl_customerDocument_tbl_customer_foreignKey` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_ip`
--
ALTER TABLE `customer_ip`
  ADD CONSTRAINT `fk_customer_ip_customer_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer_permission_module`
--
ALTER TABLE `customer_permission_module`
  ADD CONSTRAINT `FK_module_group_to_permission_module` FOREIGN KEY (`module_group_id`) REFERENCES `customer_permission_module_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer_to_group`
--
ALTER TABLE `customer_to_group`
  ADD CONSTRAINT `fk_customer_to_group_customer__id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_customer_to_group_customer_group__id` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  ADD CONSTRAINT `fk_customer_transaction_customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_customer_transaction_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer_users`
--
ALTER TABLE `customer_users`
  ADD CONSTRAINT `FK_customer_user_group_id_to_customer_user_group` FOREIGN KEY (`customer_user_group_id`) REFERENCES `customer_user_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer_wishlist`
--
ALTER TABLE `customer_wishlist`
  ADD CONSTRAINT `fk_wishlist_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_wishlist_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `live_address`
--
ALTER TABLE `live_address`
  ADD CONSTRAINT `fk_live_address_customer_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD CONSTRAINT `FK_customer_user_id_id_to_customer_users` FOREIGN KEY (`customer_user_id`) REFERENCES `customer_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_login_attempts_customer_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_fulfillment_status`
--
ALTER TABLE `order_fulfillment_status`
  ADD CONSTRAINT `fk_order_fulfillment_status_vendor_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_history`
--
ALTER TABLE `order_history`
  ADD CONSTRAINT `fk_order_history_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_history_order_status1` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`);

--
-- Constraints for table `order_log`
--
ALTER TABLE `order_log`
  ADD CONSTRAINT `fk_order_log_currency_currency_id` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`currency_id`);

--
-- Constraints for table `order_option`
--
ALTER TABLE `order_option`
  ADD CONSTRAINT `fk_order_option_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_option_order_product1` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `fk_order_product_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_product_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `fk_tbl_order_status_tbl_order_product_foreignKey` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`);

--
-- Constraints for table `order_product_log`
--
ALTER TABLE `order_product_log`
  ADD CONSTRAINT `fk_order_product_log_order_product_order_product_id` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_status`
--
ALTER TABLE `order_status`
  ADD CONSTRAINT `fk_order_status_vendor_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_status_to_fulfillment`
--
ALTER TABLE `order_status_to_fulfillment`
  ADD CONSTRAINT `FK_6e4dcfa1f3ed4efcf7e623886f4` FOREIGN KEY (`order_fulfillment_status_id`) REFERENCES `order_fulfillment_status` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_94da37f98b374544970c61620c0` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_total`
--
ALTER TABLE `order_total`
  ADD CONSTRAINT `fk_order_total_order_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `fk_page_page_group_page_group_id` FOREIGN KEY (`page_group_id`) REFERENCES `page_group` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pages_vendor_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `page_group_translation`
--
ALTER TABLE `page_group_translation`
  ADD CONSTRAINT `fk_page_group_translation_page_group_page_group_id_idx` FOREIGN KEY (`page_group_id`) REFERENCES `page_group` (`group_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_page_group_translation_vendor_language_language_id` FOREIGN KEY (`language_id`) REFERENCES `vendor_language` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;


--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_payment_order_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`);

--
-- Constraints for table `payment_archive`
--
ALTER TABLE `payment_archive`
  ADD CONSTRAINT `fk_payment_archive_order_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment_items`
--
ALTER TABLE `payment_items`
  ADD CONSTRAINT `fk_payment_items_order_product_order_product_id` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payment_items_payment_payment_id` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment_items_archive`
--
ALTER TABLE `payment_items_archive`
  ADD CONSTRAINT `fk_payment_items_archive_order_product_order_product_id` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payment_items_archive_payment_archive_payment_archive_id` FOREIGN KEY (`payment_archive_id`) REFERENCES `payment_archive` (`payment_archive_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- AUTO_INCREMENT for table `payment_rule`
--
ALTER TABLE `payment_rule`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for table `permission_module`
--
ALTER TABLE `permission_module`
  ADD CONSTRAINT `fk_tbl_permissionModule_tbl_permissionModuleGroup_foreignKey` FOREIGN KEY (`module_group_id`) REFERENCES `permission_module_group` (`module_group_id`) ON DELETE CASCADE;

--
-- Constraints for table `payment_rule`
--
ALTER TABLE `payment_rule`
  ADD CONSTRAINT `fk_pm_rule_pm_id` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`) ON DELETE CASCADE;
  
--
-- Constraints for table `product_description`
--
ALTER TABLE `product_description`
  ADD CONSTRAINT `fk_product_description_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_discount`
--
ALTER TABLE `product_discount`
  ADD CONSTRAINT `fk_product_discount_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `fk_product_image_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_special`
--
ALTER TABLE `product_special`
  ADD CONSTRAINT `fk_product_special_customer_group_customer_group_id` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_special_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Constraints for table `product_tire_price`
--
ALTER TABLE `product_tire_price`
  ADD CONSTRAINT `fk_product_tire_price_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_to_category`
--
ALTER TABLE `product_to_category`
  ADD CONSTRAINT `fk_product_to_category_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_to_category_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_video`
--
ALTER TABLE `product_video`
  ADD CONSTRAINT `fk_product_video_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_view_log`
--
ALTER TABLE `product_view_log`
  ADD CONSTRAINT `fk_product_view_log_customer_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_view_log_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shopping_cart_detail`
--
ALTER TABLE `shopping_cart_detail`
  ADD CONSTRAINT `fk_shopping_cart_detail_shopping_cart_id` FOREIGN KEY (`shopping_cart_id`) REFERENCES `shopping_cart` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `site_filter_category`
--
ALTER TABLE `site_filter_category`
  ADD CONSTRAINT `fk_site_filter_category` FOREIGN KEY (`site_filter_id`) REFERENCES `site_filter` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_site_filter_category_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `site_filter_section`
--
ALTER TABLE `site_filter_section`
  ADD CONSTRAINT `fk_site_filter_section` FOREIGN KEY (`site_filter_id`) REFERENCES `site_filter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `site_filter_section_item`
--
ALTER TABLE `site_filter_section_item`
  ADD CONSTRAINT `fk_site_filter_section_item` FOREIGN KEY (`site_filter_section_id`) REFERENCES `site_filter_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `site_map`
--
ALTER TABLE `site_map`
  ADD CONSTRAINT `fk_venodr_site_map_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_user_group_user_group_id` FOREIGN KEY (`user_group_id`) REFERENCES `user_group` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor`
--
ALTER TABLE `vendor`
  ADD CONSTRAINT `fk_vendor_customer_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vendor_industry_industry_id` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_audit_log`
--
ALTER TABLE `vendor_audit_log`
  ADD CONSTRAINT `fk_vendor_audit_log_vendor_user_foreignKey` FOREIGN KEY (`vendor_user_id`) REFERENCES `vendor_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_category`
--
ALTER TABLE `vendor_category`
  ADD CONSTRAINT `fk_vendor_category_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_vendor_category_vendor_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_contact`
--
ALTER TABLE `vendor_contact`
  ADD CONSTRAINT `fk_vendor_contact_vendor_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_country`
--
ALTER TABLE `vendor_country`
  ADD CONSTRAINT `fk_vendor_country_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vendor_country_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_currency`
--
ALTER TABLE `vendor_currency`
  ADD CONSTRAINT `fk_vendor_currency_currency_id` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`currency_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vendor_currency_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_customer_price`
--
ALTER TABLE `vendor_customer_price`
  ADD CONSTRAINT `fk_vendor_customer_price_customer_customer_idx` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vendor_customer_price_vendor_price_group_price_group_idx` FOREIGN KEY (`price_group_id`) REFERENCES `vendor_price_group` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_email_template`
--
ALTER TABLE `vendor_email_template`
  ADD CONSTRAINT `FK_email_template_vendor_email_template_id` FOREIGN KEY (`email_template_id`) REFERENCES `email_template` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_group_category`
--
ALTER TABLE `vendor_group_category`
  ADD CONSTRAINT `fk_vendor_group_category_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_vendor_group_category_vendor_group_vendor_group_id` FOREIGN KEY (`vendor_group_id`) REFERENCES `vendor_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_invoice`
--
ALTER TABLE `vendor_invoice`
  ADD CONSTRAINT `fk_vendor_invoice_order_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_invoice_item`
--
ALTER TABLE `vendor_invoice_item`
  ADD CONSTRAINT `fk_vendor_invoice_item_order_product_order_product_id` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_vendor_invoice_item_vendor_invoice_vendor_invoice_id` FOREIGN KEY (`vendor_invoice_id`) REFERENCES `vendor_invoice` (`vendor_invoice_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_media`
--
ALTER TABLE `vendor_media`
  ADD CONSTRAINT `fk_vendor_media` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_orders`
--
ALTER TABLE `vendor_orders`
  ADD CONSTRAINT `fk_vendor_orders_vendor_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_orders_log`
--
ALTER TABLE `vendor_orders_log`
  ADD CONSTRAINT `fk_vendor_orders_log_vendor_order_vendor_order_id` FOREIGN KEY (`vendor_order_id`) REFERENCES `vendor_orders` (`vendor_order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_order_archive`
--
ALTER TABLE `vendor_order_archive`
  ADD CONSTRAINT `fk_vendor_order_archive_order_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_order_archive_log`
--
ALTER TABLE `vendor_order_archive_log`
  ADD CONSTRAINT `fk_vendor_order_archive_log_vendor_order_archive__id` FOREIGN KEY (`vendor_order_archive_id`) REFERENCES `vendor_order_archive` (`vendor_order_archive_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_payment`
--
ALTER TABLE `vendor_payment`
  ADD CONSTRAINT `fk_vendor_payment_vendor_order_vendor_order_id` FOREIGN KEY (`vendor_order_id`) REFERENCES `vendor_orders` (`vendor_order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_payment_archive`
--
ALTER TABLE `vendor_payment_archive`
  ADD CONSTRAINT `fk_vendor_payment_archive_vendor_order_vendor_order_id` FOREIGN KEY (`vendor_order_id`) REFERENCES `vendor_orders` (`vendor_order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_permission_module`
--
ALTER TABLE `vendor_permission_module`
  ADD CONSTRAINT `fk_vendor_permission_module_module_group_id` FOREIGN KEY (`module_group_id`) REFERENCES `vendor_permission_module_group` (`module_group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_plugin`
--
ALTER TABLE `vendor_plugin`
  ADD CONSTRAINT `FK_31eed89fefcd05ef259d76afcfc` FOREIGN KEY (`plugin_id`) REFERENCES `plugins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_4cd8cbc11c7ea6991b0d37dbd65` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_price_group_detail`
--
ALTER TABLE `vendor_price_group_detail`
  ADD CONSTRAINT `fk_vendor_price_group_detail_sku_sku_id` FOREIGN KEY (`sku_id`) REFERENCES `sku` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vendor_price_group_detail_vendor_price_group_price_group_idx` FOREIGN KEY (`price_group_id`) REFERENCES `vendor_price_group` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_price_group_schedule`
--
ALTER TABLE `vendor_price_group_schedule`
  ADD CONSTRAINT `fk_vendor_pric_grp_sched_vendor_pric_grp_dets_pric_grp_dets_idx` FOREIGN KEY (`price_group_detail_id`) REFERENCES `vendor_price_group_detail` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_product`
--
ALTER TABLE `vendor_product`
  ADD CONSTRAINT `fk_vendor_product_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_vendor_product_vendor_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_product_additional_file`
--
ALTER TABLE `vendor_product_additional_file`
  ADD CONSTRAINT `fk_vendor_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vendor_tax`
--
ALTER TABLE `vendor_tax`
  ADD CONSTRAINT `fk_vendor_tax_tax_id` FOREIGN KEY (`tax_id`) REFERENCES `tax` (`tax_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vendor_tax_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_users`
--
ALTER TABLE `vendor_users`
  ADD CONSTRAINT `fk_vendor_users_vendor` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_zone`
--
ALTER TABLE `vendor_zone`
  ADD CONSTRAINT `fk_ven_zone_ven_country_id_vendor_country_id` FOREIGN KEY (`vendor_country_id`) REFERENCES `vendor_country` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vendor_zone_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vendor_zone_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE CASCADE;

--
-- Constraints for table `widget`
--
ALTER TABLE `widget`
  ADD CONSTRAINT `fk_widget_vendor_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `widget_item`
--
ALTER TABLE `widget_item`
  ADD CONSTRAINT `fk_widget_item_widget_widget_id` FOREIGN KEY (`widget_id`) REFERENCES `widget` (`widget_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `zone`
--
ALTER TABLE `zone`
  ADD CONSTRAINT `fk_zone_country_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;