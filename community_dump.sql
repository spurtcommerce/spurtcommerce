-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 02, 2023 at 06:23 PM
-- Server version: 5.7.39-0ubuntu0.18.04.2
-- PHP Version: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `community_new_dump_4_8_2`
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
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activity_id` int(11) NOT NULL,
  `activity_name` varchar(64) DEFAULT NULL,
  `is_active` int(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(32) DEFAULT NULL,
  `last_name` varchar(32) DEFAULT NULL,
  `company` varchar(32) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `address_1` varchar(128) DEFAULT NULL,
  `address_2` varchar(128) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `state` varchar(128) DEFAULT NULL,
  `address_type` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_int` int(11) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `meta_tag_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_description` mediumtext COLLATE utf8mb4_unicode_ci,
  `meta_tag_keyword` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `category_slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_description` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `image`, `image_path`, `parent_int`, `sort_order`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keyword`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`, `category_slug`, `category_description`) VALUES
(1, 'Mens Fashion', 'image', NULL, 0, 2, '', '', '', '1', NULL, NULL, '2019-05-10 02:00:49', '2020-01-28 10:40:55', 'mens-fashion', NULL),
(3, 'Baby & Kids', 'image', NULL, 0, 3, 'BABY & KIDS', 'BABY & KIDS', 'BABY & KIDS', '1', NULL, NULL, '2019-05-10 02:02:04', '2020-01-28 10:40:55', 'baby-kids', NULL),
(4, 'Electronics', 'Img_1565010631560.jpeg', 'category/', 0, 1, 'ELECTRONICS', 'ELECTRONICS', 'ELECTRONICS', '1', NULL, NULL, '2019-05-10 02:02:53', '2020-05-15 08:32:32', 'electronics', NULL),
(5, 'Home & Furniture', 'image', NULL, 0, 4, 'HOME & FURNITURE', 'HOME & FURNITURE', 'HOME & FURNITURE', '1', NULL, NULL, '2019-05-10 02:03:37', '2020-01-28 10:40:55', 'home-furniture', NULL),
(6, 'Sports, Books and More', 'image', NULL, 0, 5, 'SPORTS, BOOK AND MORE', 'SPORTS, BOOK AND MORE', 'SPORTS, BOOK AND MORE', '1', NULL, NULL, '2019-05-10 02:04:13', '2020-01-28 10:40:55', 'sports-book-and-more', NULL);

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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `message` text,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` int(11) NOT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iso_code_2` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iso_code_3` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_format` text COLLATE utf8mb4_unicode_ci,
  `postcode_required` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(99, 'India', 'IN', 'IND', '', 1, 1),
(100, 'Indonesia', 'ID', 'IDN', '', 0, 1),
(101, 'Iran (Islamic Republic of)', 'IR', 'IRN', '', 1, 1),
(102, 'Iraq', 'IQ', 'IRQ', '', 0, 1),
(103, 'Ireland', 'IE', 'IRL', '', 0, 1),
(104, 'Israel', 'IL', 'ISR', '', 1, 1),
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
(275, 'Afghanistan', 'fg', 'tgh', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `currency_id` int(11) NOT NULL,
  `title` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `symbol_left` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `symbol_Right` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `decimal_place` decimal(5,0) DEFAULT NULL,
  `value` float(15,2) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`currency_id`, `title`, `code`, `symbol_left`, `symbol_Right`, `decimal_place`, `value`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(46, 'Dollar', 'USD', '$', NULL, NULL, 73.00, 1, '2019-02-17 22:18:16', '2019-08-10 09:55:28', NULL, NULL),
(57, 'Rupees', 'INR', '₹', NULL, NULL, 1.00, 1, '2019-03-20 01:57:14', '2019-08-21 10:34:07', NULL, NULL);

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
  `mobile` varchar(10) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `zone_id` varchar(255) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `avatar_path` tinytext,
  `newsletter` int(11) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT '0',
  `mail_status` int(11) DEFAULT NULL,
  `customer_group_id` int(11) DEFAULT NULL,
  `safe` int(11) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `local` varchar(255) DEFAULT NULL,
  `oauth_data` varchar(255) DEFAULT NULL,
  `forget_password_key` varchar(255) DEFAULT NULL,
  `locked_on` varchar(255) DEFAULT NULL,
  `forget_password_link_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
  `product_varient_option_id` int(11) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL
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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `color_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_wishlist`
--

CREATE TABLE `customer_wishlist` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `email_template`
--

CREATE TABLE `email_template` (
  `id` int(11) NOT NULL,
  `shortname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` mediumtext COLLATE utf8mb4_unicode_ci,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(11, 'vendor Registration', ' You just signed-up as a Vendor with Spurt Cart ', '<p>Dear {name},<br />\n&nbsp;</p>\n\n<p>Thank you for expressing your interest and signing up as a Vendor with Spurt Cart..</p>\n\n<p>Your Vendor registration is with the Admin for approval. Once approved by the Admin, you will be able to login to the Vendor Panel.</p>\n\n<p>Meanwhile, for any other information, visit www.spurtcommerce.com</p>\n', 1, '2019-10-23 16:51:58', '2020-04-23 17:02:35', NULL, NULL),
(12, 'admin notification for vendor registration', 'admin notification for vendor registration', 'Dear Admin,<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> {vendorName} registered with Spurtcommerce for selling their products, please approve that vendor in admin portal for allowing their further activity in spurtcommerce vendor portal.   </p>', 1, '2019-10-23 16:51:58', '2019-10-23 16:51:58', NULL, NULL),
(13, 'vendor creation', 'vendor creation', 'Dear {name},<br/><br/>    We are glad to inform you that Spurtcommerce  has added you as Vendor.Here are your User Credentials for logging into the Application <br>     <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;\'>  User ID : {username}</p>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;\'>  Password : {password}</p> <br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> You may login using the above Email Id and Password. </p>', 1, '2019-10-29 15:54:55', '2019-10-29 15:54:55', NULL, NULL),
(15, 'vendor login Request', 'Spurt Cart Admin has approved your registration.  ', '<p>Dear {name},</p>\n\n<p>Congratulations, your registration has been approved by the Admin.You can now login to the Vendor Panel and start adding products. Click on keep browsing</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n', 1, '2019-11-21 12:10:48', '2020-04-23 17:21:50', NULL, NULL),
(16, 'product approval mail', 'Product approved by the Spurt Cart Admin', '<p>Dear {name},</p>\n\n<p>Congratulations, Admin has approved your product - {productname}, and it is now live on the storefront, for the Customers to see.</p>\n\n<p>To see the list of your products that are live on the store front, clock on the &#39;Products&#39; section in your Vendor panel.You may always deactivate a product, if you do not want to show the product to the Customers on the Store front.Wishing you the best journey as a Vendor in Spurtcommerce</p>\n', 1, '2019-11-29 07:06:02', '2020-04-23 17:27:31', NULL, NULL),
(17, 'Email posting question', 'Product Question Alert', '<p>Dear {name},<br />&nbsp;</p><p>A Customer has just posted a question for the product - {title}.</p><p><em>Question</em> : {question}</p><p><strong><em>User Name:</em></strong><br />Name: {username}</p><p>&nbsp;</p>', 1, '2023-07-21 06:37:50', '2023-07-21 06:37:50', NULL, NULL),
(18, 'Email posting answer', 'Product Answer notification', '<p>Dear {name},<br />&nbsp;</p><p>One of your Customers, who purchased the Product - {title}, just answered a question posted on the product.</p><p><em>Question</em> : {question}</p><p><em>Answer</em> : {answer}</p><p><br /><strong><em>User Name:</em></strong><br />Name: {username}</p><p>&nbsp;</p><p>&nbsp;</p>', 1, '2023-07-21 06:37:50', '2023-07-21 06:37:50', NULL, NULL),
(19, 'Report Abuse', 'Report Abuse', '<p>Dear {name},<br />&nbsp;</p><p>{username} posted Report Abuse for your product <u>{title}</u>,<br></p><p><i>Question</i> : {question}</p></p><p><i>Answer</i> : {answer}</p><br>', 1, '2023-07-21 06:37:50', '2023-07-21 06:37:50', NULL, NULL),
(20, 'updated cancel request status', 'Updation mail for your cancel order request', 'Dear {name},<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Your request for cancelling ordered product: {productname} is {status} by admin.   </p>', 1, '2020-05-08 12:25:57', '2020-05-08 12:25:57', NULL, NULL),
(21, 'order status change update', ' Order Status change update', 'Hello {name},<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Here is a new update on your recent order on \'Spurt Cart\'.\r\nThe status of the product {title} in the order number {order} is -  \'{status}\' \r\nYou can view the complete details of your Order status, in the \'My Order History\' section of your Customer Account at Spurt Cart. </p>', 1, '2020-05-19 16:15:58', '2020-05-19 16:15:58', NULL, NULL),
(22, 'Quotation Request Mail', 'Product Quotation Request', '<p> Dear {name}, </p> <br/><br/><p style= margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px> Here is a new Quotation for your product {title} from customer -{customername}. </p>', 1, '2023-07-21 06:37:50', '2023-07-21 06:37:50', NULL, NULL),
(23, 'Forgot password link', 'Forgot password link', 'Dear {name}, \n\n<p>click the below link.</p>\n\n<p>{link}.</p>\n\n<p> for reset your password </p>          \n<p>Regards,</p> \n  \n<p>The Spurt Commerce Team</p>', 1, '2021-04-08 16:02:03', '2021-04-08 16:02:03', NULL, NULL),
(24, 'Invoice mail', 'Invoice mail', '<p>Dear {name},<br />\n&nbsp;</p>\n\n<p>Here is an invoice attachment for this purchased order - {orderPrefixId}.</p>\n', 1, '2021-05-25 08:01:47', '2021-06-04 11:18:50', NULL, NULL),
(25, 'Otp Verification', 'otp send successsfully', '<p>Dear {name},<br />&nbsp;</p><p>{message}</p>', 1, '2022-11-07 19:38:17', '2022-11-07 19:38:17', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `geo_zone`
--

CREATE TABLE `geo_zone` (
  `geo_zone_id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
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

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `language_id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` mediumtext COLLATE utf8mb4_unicode_ci,
  `image_path` mediumtext COLLATE utf8mb4_unicode_ci,
  `locale` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`language_id`, `name`, `code`, `image`, `image_path`, `locale`, `sort_order`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(57, 'English', 'eng', 'Img_1622893818038.png', 'language/', NULL, 1, 1, '2019-05-06 03:58:01', '2021-06-05 11:50:18', NULL, NULL),
(59, 'French', 'fr', 'Img_1557569207176.png', 'language/', NULL, 1, 1, '2019-05-11 05:06:47', '2020-05-15 10:05:17', NULL, NULL);

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
  `customer_id` int(11) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `ip_address` varchar(15) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
(9, 1546524333028, 'CreateCurrencyTable1546524333028'),
(10, 1546524561001, 'CreateCustomerTable1546524561001'),
(11, 1546525248338, 'CreateAddessTable1546525248338'),
(12, 1546527306595, 'CreateCustomerTransactionTable1546527306595'),
(13, 1546528787878, 'CreateProductTable1546528787878'),
(14, 1546530096773, 'CreateProductTagTable1546530096773'),
(15, 1546578299514, 'CreateLanguageTable1546578299514'),
(16, 1546578790576, 'CreateCategoryDescriptionTable1546578790576'),
(17, 1546579410193, 'CreateProductImageTable1546579410193'),
(18, 1546579597970, 'CreateEmailTemplateTable1546579597970'),
(19, 1546579614441, 'CreateProductDescriptionTable1546579614441'),
(20, 1546579884423, 'CreateProductToCategoryTable1546579884423'),
(21, 1546580085881, 'CreateCountryTable1546580085881'),
(22, 1546580179314, 'CreateProductDiscountTable1546580179314'),
(23, 1546580612161, 'CreateZoneTable1546580612161'),
(24, 1546580872313, 'CreateOrderProductTable1546580872313'),
(25, 1546580970382, 'CreateSettingsTable1546580970382'),
(26, 1546581429998, 'CreateOrderTotalTable1546581429998'),
(27, 1546581683040, 'CreatePageGroupTable1546581683040'),
(28, 1546581933917, 'CreateOrderHistoryTable1546581933917'),
(29, 1546582132870, 'CreateOrderStatusTable1546582132870'),
(30, 1546582513520, 'CreatePageTable1546582513520'),
(31, 1546585163896, 'AddProductImageRelationToProductTable1546585163896'),
(32, 1546585326281, 'AddProductDiscountRelationToProductTable1546585326281'),
(33, 1546585572765, 'AddPageRelationToPageGroupTable1546585572765'),
(34, 1546586351105, 'CreateZoneCountryRelationToZoneGeoTable1546586351105'),
(35, 1546587376381, 'CreateOrderTable1546587376381'),
(36, 1546590433005, 'AddPoductToCategoryRelationToProductTable1546590433005'),
(37, 1546590872444, 'AddPoductToCategoryRelationToCategoryTable1546590872444'),
(38, 1546592870823, 'AddCustomerTransactionRelationToOrderTable1546592870823'),
(39, 1546593012207, 'AddCustomerTransactionRelationToCustomerTable1546593012207'),
(40, 1546593289549, 'AddOrderProductRelationToProductTable1546593289549'),
(41, 1546593359310, 'AddOrderProductRelationToOrderTable1546593359310'),
(42, 1546593427323, 'CreateCategoryRelationToCategoryDescriptionTable1546593427323'),
(43, 1546594184432, 'AddOrderHistoryRelationToOrderTable1546594184432'),
(44, 1546594262644, 'AddOrderHistoryRelationToOrderStatusTable1546594262644'),
(45, 1546594752832, 'AddOrderRelationToCustomerTable1546594752832'),
(46, 1546594852304, 'AddOrderRelationToCurrencyTable1546594852304'),
(47, 1549968165253, 'CreateOrderLogTable1549968165253'),
(48, 1549975268085, 'CreateLoginLogTable1549975268085'),
(49, 1549977253184, 'CreateCustomerWishlistTable1549977253184'),
(50, 1549978070935, 'CreateAccessTokenTable1549978070935'),
(51, 1549978269406, 'CreateContactTable1549978269406'),
(52, 1552371397992, 'AddCustomerWishlistRelationToCustomerTable1552371397992'),
(53, 1552371852472, 'AddCustomerWishlistRelationToProductTable1552371852472'),
(54, 1552376547486, 'CreateProductViewLogTable1552376547486'),
(55, 1552886376079, 'CreateCategoryPathTable1552886376079'),
(56, 1554980920462, 'CreateProductSpecialTable1554980920462'),
(57, 1555504622184, 'AddColumnInCustomer1555504622184'),
(58, 1555507207067, 'AddColumnInOrder1555507207067'),
(59, 1558003725620, 'AddColumnInOrderLog1558003725620'),
(60, 1558005767816, 'AddColumnInOrderProduct1558005767816'),
(61, 1561786420039, 'AddRelationWishlistToProductTable1561786420039'),
(62, 1561967809283, 'AlterColumnTable1561967809283'),
(63, 1562831060364, 'AlterCurrencyTable1562831060364'),
(64, 1563174105812, 'CreateBlogTable1563174105812'),
(65, 1563347331461, 'CreateJobsTable1563347331461'),
(66, 1565087039728, 'DropFKforOrderCustomer1565087039728'),
(67, 1565606134069, 'AddColumnInOrderTable1565606134069'),
(68, 1565682493625, 'AddColumnInUser1565682493625'),
(69, 1565781113424, 'AltercolumnInUser1565781113424'),
(70, 1565852482174, 'AlterLoginLogTable1565852482174'),
(71, 1565856125812, 'AlterProductColumn1565856125812'),
(72, 1566206489111, 'CreateIndexProductRelatedTable1566206489111'),
(73, 1569577082237, 'AddColumnInProductTable1569577082237'),
(74, 1569838152744, 'AddColumnInOrderLog1569838152744'),
(75, 1571735617882, 'AddColumnInCustomerGroup1571735617882'),
(76, 1571736071528, 'CreateCustomerActivityTable1571736071528'),
(77, 1571736086250, 'CreateActivityTable1571736086250'),
(78, 1574401863885, 'AddColumnInOrderStatus1574401863885'),
(79, 1578990577479, 'AddTrackingColumnInOrderTable1578990577479'),
(80, 1581399473295, 'CreateTaxTable1581399473295'),
(81, 1581419924612, 'CreatePaymentTable1581419924612'),
(82, 1581420780474, 'CreatePaymentItemsTable1581420780474'),
(83, 1581674795492, 'AddColumnInOrder1581674795492'),
(84, 1581679252934, 'AddServiceChargesColumnInProduct1581679252934'),
(85, 1581680192125, 'AddColumnInCategory1581680192125'),
(86, 1582177223557, 'AddColumnInOrderProductTable1582177223557'),
(87, 1582183277124, 'CreateOrderProductLogTable1582183277124'),
(88, 1582207388417, 'AddColumnInTaxColumnInProduct1582207388417'),
(89, 1582207440112, 'AddColumnInOrderProductTable1582207440112'),
(90, 1582265041245, 'CreateCustomerCartTable1582265041245'),
(91, 1582355542896, 'AlterColumnModelInOrderProductLog1582355542896'),
(92, 1582355584324, 'AlterColumnOrderProductPreIdInOrderProduct1582355584324'),
(93, 1582551346241, 'AlterCustomerCartTable1582551346241'),
(94, 1582898256691, 'AddColumnInOrderProduct1582898256691'),
(95, 1583411982211, 'CreateBlogRelatedTable1583411982211'),
(96, 1584004496240, 'AddColumnInOrderTable1584004496240'),
(97, 1584011252176, 'AddColumnInOrderProductTable1584011252176'),
(98, 1584083106363, 'CreatePermissionModuleGroup1584083106363'),
(99, 1584083115669, 'CreatePermissionModule1584083115669'),
(100, 1584098038843, 'AddColumnInRoleAndUser1584098038843'),
(101, 1586159957544, 'AddPaymentProcessInOrder1586159957544'),
(102, 1586347085190, 'AddColumnInProductTable1586347085190'),
(103, 1586945695954, 'AddContraintInBlogRelated1586945695954'),
(104, 1588072269668, 'CreateOrderCancelReason1588072269668'),
(105, 1588072397466, 'AddColumnInOrderProduct1588072397466'),
(106, 1588751152380, 'CreatePaymentArchive1588751152380'),
(107, 1588751245983, 'CreatePaymentItemArchive1588751245983'),
(108, 1589003393774, 'AddColumnInProductTable1589003393774'),
(109, 1589193302717, 'CreateStockLogtable1589193302717'),
(110, 1589193432006, 'CreateProductStockAlertTable1589193432006'),
(111, 1589623032875, 'AddColumnInOrderTable1589623032875'),
(112, 1589891907380, 'AddConstraintInProductViewLog1589891907380'),
(113, 1590588151010, 'AddColumnInCustomerCart1590588151010'),
(114, 1597042164207, 'AddColumnInSettingsTable1597042164207'),
(115, 1597908778448, 'AddColumnInSettingTable1597908778448'),
(116, 1597918254147, 'AddColumnInProduct1597918254147'),
(117, 1600520069506, 'AddColumnInCustomerCart1600520069506'),
(118, 1601270366765, 'CreateWidgetTable1601270366765'),
(119, 1601270946009, 'CreateWidgetItemTable1601270946009'),
(120, 1601702954997, 'CreateSkuTable1601702954997'),
(121, 1601872052590, 'AddColumnForSkuIdInProduct1601872052590'),
(122, 1602398285818, 'CreatePageGroupTable1602398285818'),
(123, 1602405483061, 'CreateContraintForPageGroup1602405483061'),
(124, 1603107735535, 'AddColumnInProduct1603107735535'),
(125, 1603687495819, 'AddColumnInOrderProduct1603687495819'),
(126, 1603690775002, 'AddColumnInSkuTable1603690775002'),
(127, 1603705858963, 'AddColumnInOrderProduct1603705858963'),
(128, 1603707976533, 'AddColumnInProductStockAlert1603707976533'),
(129, 1603708000934, 'AddColumnStockLog1603708000934'),
(130, 1603710224439, 'AddColumnInCustomerCart1603710224439'),
(131, 1605506261235, 'AddColumnInOrderTable1605506261235'),
(132, 1605507026632, 'AddColumnInProductTable1605507026632'),
(133, 1605683473618, 'AddColumnInPageTable1605683473618'),
(134, 1606204705980, 'AlterColumnInPageGroup1606204705980'),
(135, 1606228347336, 'CreatePageGroupTable1606228347336'),
(136, 1620823474374, 'CreateAuditLogTable1620823474374'),
(137, 1620828858835, 'AddColumnInAuditLog1620828858835'),
(138, 1620978737265, 'AddColumnInCustomerTable1620978737265'),
(139, 1620989353652, 'CreateTableLoginAttempts1620989353652'),
(140, 1620989942663, 'AddColumnInCustomerTable1620989942663'),
(141, 1621056856672, 'AddColumnInLoginAttempts1621056856672'),
(142, 1627051145596, 'CreatePluginTable1627051145596'),
(143, 1630918993171, 'AddColumnInProduct1630918993171'),
(144, 1631700202332, 'CreateProductVideo1631700202332'),
(145, 1641188700351, 'CreatePluginMenus1641188700351'),
(146, 1642745785011, 'AddColumnInCategory1642745785011'),
(147, 1643700945763, 'AddingColumnsInOrderStatus1643700945763'),
(148, 1644045460638, 'AddColumnInAccessToken1644045460638'),
(149, 1644063579528, 'AddColumnInUser1644063579528'),
(150, 1644390622396, 'AddingColumnInCustomer1644390622396'),
(151, 1647263878759, 'AddBlogsPermissionGroupData1647263878759'),
(152, 1647264994076, 'AddBlogsMenu1647264994076'),
(153, 1647401862825, 'AddWidgetMenu1647401862825'),
(154, 1647402175581, 'AddWidgetPermission1647402175581'),
(155, 1648191952576, 'AddOwnerColumnInProduct1648191952576'),
(156, 1648193000936, 'AddCommonColumnInProduct1648193000936'),
(157, 1650361956965, 'AlterColumnKeywordInProductTable1650361956965'),
(158, 1651294960594, 'CreateBlogCategory1651294960594'),
(159, 1651295328465, 'CreateBlogCategoryPath1651295328465'),
(160, 1651310850012, 'AddConstraintInBlogCategoryPath1651310850012'),
(161, 1651473763023, 'AddingColumnInBlogCategory1651473763023'),
(162, 1651491997947, 'AddConstraintInBlogTable1651491997947'),
(163, 1654338253531, 'AddingColumnInProductTable1654338253531'),
(164, 1655465438730, 'AddColumnInOrderStatus1655465438730'),
(165, 1656753952109, 'AlterColumnPaymentInformationInPaymentArchiveTable1656753952109'),
(166, 1657012239912, 'AlterColumnsInSkuTable1657012239912'),
(167, 1657012922452, 'AlterColumnInProductTable1657012922452'),
(168, 1664960579010, 'CreateSeoTable1664960579010'),
(169, 1665120872278, 'AddSeoMenu1665120872278'),
(170, 1665122641263, 'AddColumnInPluginTable1665122641263'),
(171, 1665123762673, 'AddSeoDataPlugin1665123762673'),
(172, 1665133624567, 'AddBlogDataPlugin1665133624567'),
(173, 1665135644841, 'AddPluginColumns1665135644841'),
(174, 1665135644842, 'AddWidgetPlugin1665135644842'),
(175, 1666440763235, 'AddColumnInSettings1666440763235'),
(176, 1674449652221, 'AddIpColumntoCustomerCart1674449652221'),
(177, 1674815408760, 'AddColumnShowHomePageWidgetInWidgetTable1674815408760'),
(178, 1676697134335, 'GmapUpdateSettingColumn1676697134335'),
(179, 1678774917380, 'CreateSiteMap1678774917380'),
(180, 1679295983234, 'AddColumnShowHomePageWidget1679295983234'),
(181, 1679895949882, 'AddPluginTimestampInBlogs1679895949882'),
(182, 1679898902620, 'AddPluginTimestampInSeo1679898902620'),
(183, 1679900284517, 'AddPluginTimestampInWidget1679900284517');

-- --------------------------------------------------------

--
-- Table structure for table `m_seo_meta`
--

CREATE TABLE `m_seo_meta` (
  `seo_id` int(11) NOT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` varchar(255) DEFAULT NULL,
  `meta_tag_keyword` varchar(255) DEFAULT NULL,
  `seo_type` varchar(255) DEFAULT NULL,
  `ref_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `shipping_zone_id` int(11) DEFAULT NULL,
  `payment_zone_id` int(11) DEFAULT NULL,
  `shipping_country_id` int(11) DEFAULT NULL,
  `payment_country_id` int(11) DEFAULT NULL,
  `invoice_no` varchar(45) DEFAULT NULL,
  `invoice_prefix` varchar(26) DEFAULT NULL,
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
  `reward` int(8) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `affiliate_id` int(11) DEFAULT NULL,
  `commision` decimal(10,0) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `currency_value` decimal(11,0) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `payment_flag` int(3) DEFAULT NULL,
  `order_name` varchar(32) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `order_prefix_id` varchar(45) DEFAULT NULL,
  `currency_symbol_left` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_symbol_right` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_url` varchar(255) DEFAULT NULL,
  `tracking_no` varchar(255) DEFAULT NULL,
  `payment_status` int(11) DEFAULT '0',
  `payment_type` varchar(45) DEFAULT NULL,
  `payment_details` varchar(255) DEFAULT NULL,
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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
  `reward` int(8) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `affiliate_id` int(11) DEFAULT NULL,
  `commision` decimal(10,0) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `currency_value` decimal(11,0) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `payment_flag` int(3) DEFAULT NULL,
  `order_name` varchar(32) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `order_prefix_id` varchar(255) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `order_product_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `model` varchar(24) NOT NULL,
  `quantity` int(4) NOT NULL,
  `trace` decimal(15,4) DEFAULT NULL,
  `total` decimal(15,2) DEFAULT NULL,
  `tax` decimal(15,4) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `product_price` decimal(15,2) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `tracking_url` varchar(255) DEFAULT NULL,
  `tracking_no` varchar(255) DEFAULT NULL,
  `order_product_prefix_id` varchar(255) DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `tax_type` int(11) DEFAULT NULL,
  `tax_value` int(11) DEFAULT NULL,
  `cancel_request` int(11) DEFAULT '0',
  `cancel_request_status` int(11) DEFAULT '0',
  `cancel_reason` text,
  `cancel_reason_description` text,
  `varient_name` varchar(255) DEFAULT NULL,
  `product_varient_option_id` int(11) DEFAULT NULL,
  `sku_name` varchar(255) DEFAULT NULL
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
  `quantity` int(4) NOT NULL,
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
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `is_admin` int(11) NOT NULL DEFAULT '1',
  `is_vendor` int(11) NOT NULL DEFAULT '1',
  `is_buyer` int(11) NOT NULL DEFAULT '1',
  `is_api` int(11) NOT NULL DEFAULT '1',
  `default_status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`order_status_id`, `name`, `color_code`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`, `priority`, `parent_id`, `is_admin`, `is_vendor`, `is_buyer`, `is_api`, `default_status`) VALUES
(1, 'Order Placed', '#6798e3', 1, NULL, NULL, '2019-02-19 04:04:03', '2020-02-22 10:37:09', 1, 7, 1, 1, 1, 1, 1),
(2, 'order accepted', '#25a006', 1, NULL, NULL, '2019-02-19 04:04:21', '2020-02-22 10:40:26', 2, 7, 1, 1, 1, 1, 0),
(3, 'packing in progress', '#f71d1d', 1, NULL, NULL, '2019-02-19 04:04:58', '2020-02-22 10:42:10', 3, 7, 1, 1, 1, 1, 0),
(4, 'Shipped', '#4c7499', 1, NULL, NULL, '2019-07-30 13:25:44', '2020-02-22 10:43:07', 4, 7, 1, 0, 1, 1, 0),
(5, 'Order Delivered', '#501332', 1, NULL, NULL, '2020-02-22 10:48:03', NULL, 5, 7, 1, 1, 0, 1, 1),
(7, 'Default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 1, 1, 1, 1),
(8, 'order cancelled', '#f40337', 1, NULL, NULL, NULL, NULL, 6, 7, 0, 0, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_total`
--

CREATE TABLE `order_total` (
  `order_total_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `code` varchar(32) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `sort_order` int(3) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
  `sort_order` int(3) DEFAULT NULL,
  `view_page_count` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `slug_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `paid_date` datetime DEFAULT NULL,
  `payment_number` varchar(255) DEFAULT NULL,
  `payment_information` varchar(255) DEFAULT NULL,
  `payment_amount` decimal(10,2) DEFAULT NULL,
  `payment_commission_amount` decimal(10,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
-- Table structure for table `plugins`
--

CREATE TABLE `plugins` (
  `id` int(11) NOT NULL,
  `plugin_name` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plugin_avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plugin_avatar_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plugin_type` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plugin_additional_info` mediumtext COLLATE utf8mb4_unicode_ci,
  `plugin_status` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `plugin_form_info` text COLLATE utf8mb4_unicode_ci,
  `slug_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_editable` int(11) DEFAULT '0',
  `routes` text COLLATE utf8mb4_unicode_ci,
  `plugin_timestamp` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `plugins`
--

INSERT INTO `plugins` (`id`, `plugin_name`, `plugin_avatar`, `plugin_avatar_path`, `plugin_type`, `plugin_additional_info`, `plugin_status`, `created_date`, `created_by`, `modified_date`, `modified_by`, `plugin_form_info`, `slug_name`, `is_editable`, `routes`, `plugin_timestamp`) VALUES
(1, 'CashOnDelivery', 'Img_1564659191615.jpeg', 'logo/', 'Payment', NULL, 1, '2022-11-01 14:54:56', NULL, NULL, NULL, NULL, 'cash-on-delivery', 0, NULL, NULL),
(2, 'Widget', '', '', 'CMS', NULL, 1, '2022-11-01 14:57:54', NULL, '2023-08-02 17:47:25', NULL, NULL, 'widget', 0, '~/api/widget~,~/api/widget/~,~/api/widget/widget-count~,~/api/widget/widget-detail~,~/api/widget/productlist~,~/api/list/widget-list~,~/api/list/widget-detail/~', 1665135644842),
(3, 'Seo', '', '', 'CMS', NULL, 1, '2022-12-06 11:10:07', NULL, '2023-08-02 17:47:25', NULL, NULL, 'seo', 0, '~/api/blog-seo~,~/api/blog-seo/~,~/api/category-seo~,~/api/category-seo/~,~/api/page-seo~,~/api/page-seo/~,~/api/product-seo~,~/api/product-seo/~,~/api/seo/product/~,~/api/seo/category/~,~/api/seo/page/~,~/api/seo/blog/~', 1665123762673),
(4, 'Blogs', '', '', 'CMS', NULL, 1, '2022-12-06 11:10:07', NULL, '2023-08-02 17:47:25', NULL, NULL, 'blog', 0, '~/api/blog~,~/api/blog/~,~/api/blog-category~,~/api/blog/delete-multiple-blog~,~/api/blog/blog-detail~,~/api/blog/blog-count~,~/api/blog-category/~,~/api/blog-category/blog-category-detail~,~/api/blog-category/category-count~,~/api/blog-category/update-blog-category-status/~,~/api/list/related-blog-list~,~/api/list/blog/blog-detail/~,~/api/list/blog/blog-list~', 1665133624567),
(19, 'gmap', 'Img_1564575414973.png', '/logo', 'Gmap', '{\"clientId\":\"\",\"clientSecret\":\"\",\"defaultRoute\":\"/CustomerAddress/add-address\",\"isTest\":\"\"}', 1, '2023-07-21 06:37:50', NULL, NULL, NULL, '{\"controls\":[{\"name\":\"clientId\",\"label\":\"Client Id:\",\"value\":\"\",\"type\":\"text\",\"validators\":{\"required\":true}},{\"name\":\"clientSecret\",\"label\":\"Client Secret:\",\"value\":\"\",\"type\":\"text\",\"validators\":{\"required\":true}},{\"name\":\"isTest\",\"label\":\"Is Test:\",\"value\":\"\",\"type\":\"checkbox\"}],\"postRoute\":\"/admin-gmap/update-setting\"}', NULL, 1, NULL, 1676697134335),
(23, 'Seo', '', '', 'CMS', NULL, 1, '2023-08-02 17:47:22', NULL, NULL, NULL, NULL, 'seo', 0, '~/api/blog-seo~,~/api/blog-seo/~,~/api/category-seo~,~/api/category-seo/~,~/api/page-seo~,~/api/page-seo/~,~/api/product-seo~,~/api/product-seo/~,~/api/seo/product/~,~/api/seo/category/~,~/api/seo/page/~,~/api/seo/blog/~', 1665123762673),
(24, 'Blogs', '', '', 'CMS', NULL, 1, '2023-08-02 17:47:22', NULL, NULL, NULL, NULL, 'blog', 0, '~/api/blog~,~/api/blog/~,~/api/blog-category~,~/api/blog/delete-multiple-blog~,~/api/blog/blog-detail~,~/api/blog/blog-count~,~/api/blog-category/~,~/api/blog-category/blog-category-detail~,~/api/blog-category/category-count~,~/api/blog-category/update-blog-category-status/~,~/api/list/related-blog-list~,~/api/list/blog/blog-detail/~,~/api/list/blog/blog-list~', 1665133624567),
(25, 'Widget', '', '', 'CMS', NULL, 1, '2023-08-02 17:47:22', NULL, NULL, NULL, NULL, 'widget', 0, '~/api/widget~,~/api/widget/~,~/api/widget/widget-count~,~/api/widget/widget-detail~,~/api/widget/productlist~,~/api/list/widget-list~,~/api/list/widget-detail/~', 1665135644842),
(26, 'gmap', 'Img_1564575414973.png', '/logo', 'Gmap', '{\"clientId\":\"\",\"clientSecret\":\"\",\"defaultRoute\":\"/CustomerAddress/add-address\",\"isTest\":\"\"}', 1, '2023-08-02 17:47:25', NULL, NULL, NULL, '{\"controls\":[{\"name\":\"clientId\",\"label\":\"Client Id:\",\"value\":\"\",\"type\":\"text\",\"validators\":{\"required\":true}},{\"name\":\"clientSecret\",\"label\":\"Client Secret:\",\"value\":\"\",\"type\":\"text\",\"validators\":{\"required\":true}},{\"name\":\"isTest\",\"label\":\"Is Test:\",\"value\":\"\",\"type\":\"checkbox\"}],\"postRoute\":\"/admin-gmap/update-setting\"}', NULL, 1, '', NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `plugin_menu`
--

INSERT INTO `plugin_menu` (`id`, `menu_name`, `menu_module`, `path`, `icon`, `parent_id`, `status`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(1, 'widgets', 'CMS', '#/cms/widgets', 'banner-ico-on.svg', 0, 1, '2022-11-07 19:07:54', '2022-11-07 19:07:54', NULL, NULL),
(2, 'Blogs', 'CMS', '#/cms/blogs', 'cms/cms-blog-on.svg', 0, 1, '2022-12-06 10:34:03', '2022-12-06 10:34:03', NULL, NULL),
(3, 'Seo', 'CMS', '#/cms/manage-seo/seo', '', 0, 1, '2022-12-06 11:10:07', '2022-12-06 11:10:07', NULL, NULL),
(12, 'Blogs', 'CMS', '#/cms/blogs', 'cms/cms-blog-on.svg', 0, 1, '2023-08-02 17:47:17', '2023-08-02 17:47:17', NULL, NULL),
(13, 'widgets', 'CMS', '#/cms/widgets', 'banner-ico-on.svg', 0, 1, '2023-08-02 17:47:17', '2023-08-02 17:47:17', NULL, NULL),
(14, 'Seo', 'CMS', '#/cms/manage-seo/seo', '', 0, 1, '2023-08-02 17:47:22', '2023-08-02 17:47:22', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `sku` varchar(64) DEFAULT NULL,
  `upc` varchar(12) DEFAULT NULL,
  `quantity` int(4) DEFAULT NULL,
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
  `discount` int(11) DEFAULT NULL,
  `subtract_stock` int(11) DEFAULT NULL,
  `minimum_quantity` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_featured` int(11) DEFAULT NULL,
  `today_deals` int(11) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT '0',
  `wishlist_status` int(11) DEFAULT '0',
  `condition` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `keywords` text,
  `service_charges` varchar(255) DEFAULT NULL,
  `product_slug` varchar(255) DEFAULT NULL,
  `tax_type` int(11) DEFAULT NULL,
  `tax_value` int(11) DEFAULT NULL,
  `order_product_prefix_id` varchar(255) DEFAULT NULL,
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
  `attribute_keyword` varchar(255) DEFAULT NULL,
  `hsn` varchar(255) DEFAULT NULL,
  `quotation_available` int(11) NOT NULL DEFAULT '0',
  `owner` int(11) DEFAULT '0',
  `is_common` int(11) DEFAULT '0',
  `setted_as_common_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
  `sort_order` int(3) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
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
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `mobile` bigint(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `settings_id` int(11) NOT NULL,
  `url` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_title` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tag_description` mediumtext COLLATE utf8mb4_unicode_ci,
  `meta_tag_keywords` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_name` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_owner` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_address` mediumtext COLLATE utf8mb4_unicode_ci,
  `country_id` int(11) DEFAULT NULL,
  `zone_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_email` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_telephone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_fax` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_logo` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_logo_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maintenance_mode` int(11) DEFAULT NULL,
  `store_language_name` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_currency_id` int(11) DEFAULT NULL,
  `store_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_image_path` mediumtext COLLATE utf8mb4_unicode_ci,
  `google` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_status` int(11) NOT NULL DEFAULT '1',
  `invoice_prefix` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `items_per_page` int(11) DEFAULT NULL,
  `category_product_count` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `email_logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_logo_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_logo_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addons` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`settings_id`, `url`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keywords`, `store_name`, `store_owner`, `store_address`, `country_id`, `zone_id`, `store_email`, `store_telephone`, `store_fax`, `store_logo`, `store_logo_path`, `maintenance_mode`, `store_language_name`, `store_currency_id`, `store_image`, `store_image_path`, `google`, `facebook`, `twitter`, `instagram`, `order_status`, `invoice_prefix`, `items_per_page`, `category_product_count`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`, `email_logo`, `email_logo_path`, `invoice_logo`, `invoice_logo_path`, `addons`) VALUES
(2, 'https://marketplace48-admin.spurtcart.com/', 'Spurtcommerce', 'description', 'keyword', 'Spurtcommerce Multi Vendor Platform ', 'Admin', 'Chennai, Tamil Nadu, India ', 99, '59', 'support@spurtcommerce.com', '04429535453', '1221', 'Img_1690005686399.png', 'storeLogo/', 0, 'English', 46, 'storeImage', NULL, 'https://plus.google.com/106505712715559114904', 'https://www.facebook.com/spurtcommerce/', 'https://twitter.com/Spurtcommerce', 'https://www.instagram.com/spurt_commerce/', 1, 'SPU', 20, 1, 1, '2019-02-13 06:00:00', '2023-07-22 06:01:26', NULL, NULL, 'EmailLogo_1650452241563.png', 'storeLogo/', 'InvoiceLogo_1650452241639.png', 'storeLogo/', '{\"product-attribute\":true,\"coupon\":true,\"chat\":true,\"common-catalog\":true,\"abandoned-cart\":true,\"seo\":true,\"rating-review\":true}');

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

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_group_id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` bigint(20) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT '0',
  `permission` mediumtext COLLATE utf8mb4_unicode_ci,
  `forget_password_link_expires` datetime DEFAULT NULL,
  `forget_password_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_group_id`, `username`, `password`, `first_name`, `last_name`, `email`, `avatar`, `avatar_path`, `code`, `ip`, `address`, `phone_number`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`, `delete_flag`, `permission`, `forget_password_link_expires`, `forget_password_key`) VALUES
(49, 1, 'admin@spurtcart.com', '$2b$10$ZKGftFShM48LtgF6XRAu7u1l7zpdYxjF8QlDU/je9Uh0g5YQjvaxS', 'Admin', ' ', 'admin@spurtcart.com', 'Img_1567002487693.jpg', 'user/', NULL, NULL, 'India', 1234567890, 1, '2019-02-15 04:13:22', '2021-03-10 12:31:27', NULL, NULL, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `group_id` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `permission` mediumtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`group_id`, `name`, `slug`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`, `permission`) VALUES
(1, 'Admin', 'admin', 1, '2019-01-21 10:38:14', '2022-08-18 15:12:18', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `zone_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `code` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`zone_id`, `country_id`, `code`, `name`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(59, 99, 'MUM', 'Mumbai', 1, '2019-02-17 22:17:49', '2022-09-20 06:58:16', NULL, NULL);

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
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_audit_log_user` (`user_id`);

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
  ADD KEY `fk_Category_CategoryDescription` (`category_id`);

--
-- Indexes for table `category_path`
--
ALTER TABLE `category_path`
  ADD PRIMARY KEY (`category_path_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_ip`
--
ALTER TABLE `customer_ip`
  ADD PRIMARY KEY (`customer_ip_id`);

--
-- Indexes for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  ADD PRIMARY KEY (`customer_transaction_id`),
  ADD KEY `fk_customer_transaction_order1` (`order_id`),
  ADD KEY `fk_customer_transaction_customer1` (`customer_id`);

--
-- Indexes for table `customer_wishlist`
--
ALTER TABLE `customer_wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_wishlist_customer` (`customer_id`),
  ADD KEY `fk_wishlist_product` (`product_id`);

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
  ADD PRIMARY KEY (`geo_zone_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`job_id`);

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
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `fk_order_customer1` (`customer_id`),
  ADD KEY `fk_order_currency1` (`currency_id`);

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
  ADD KEY `fk_order_history_order_status1` (`order_status_id`);

--
-- Indexes for table `order_log`
--
ALTER TABLE `order_log`
  ADD PRIMARY KEY (`order_log_id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_product_id`),
  ADD KEY `fk_order_product_product1` (`product_id`),
  ADD KEY `fk_order_product_order1` (`order_id`),
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
  ADD KEY `fk_tbl_page_related_tbl_page_group_foreignKey` (`page_group_id`);

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
  ADD KEY `fk_tbl_payment_tbl_order_foreignKey` (`order_id`);

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
  ADD KEY `fk_tbl_paymentItems_tbl_payment_foreignKey` (`payment_id`),
  ADD KEY `fk_tbl_paymentItems_tbl_orderProduct_foreignKey` (`order_product_id`);

--
-- Indexes for table `payment_items_archive`
--
ALTER TABLE `payment_items_archive`
  ADD PRIMARY KEY (`payment_item_archive_id`),
  ADD KEY `fk_tbl_paymentItemsArchive_tbl_payment_foreignKey` (`payment_archive_id`),
  ADD KEY `fk_tbl_paymentItemsArchive_tbl_orderProduct_foreignKey` (`order_product_id`);

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
  ADD PRIMARY KEY (`product_description_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`product_image_id`),
  ADD KEY `fk_product_image_product1` (`product_id`),
  ADD KEY `default_image` (`default_image`);

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
  ADD PRIMARY KEY (`product_tag_id`);

--
-- Indexes for table `product_to_category`
--
ALTER TABLE `product_to_category`
  ADD PRIMARY KEY (`product_to_category_id`),
  ADD KEY `fk_product_to_category_product1` (`product_id`),
  ADD KEY `fk_product_to_category_category1` (`category_id`);

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
  ADD KEY `fk_tbl_product_view_log_tbl_product_foreignKey` (`product_id`);

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
  ADD KEY `fk_Zone_ZoneGeo` (`zone_id`);

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
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=520;
--
-- AUTO_INCREMENT for table `category_description`
--
ALTER TABLE `category_description`
  MODIFY `category_description_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category_path`
--
ALTER TABLE `category_path`
  MODIFY `category_path_id` int(11) NOT NULL AUTO_INCREMENT;
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
  MODIFY `currency_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `geo_zone`
--
ALTER TABLE `geo_zone`
  MODIFY `geo_zone_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `language_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
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
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;
--
-- AUTO_INCREMENT for table `m_seo_meta`
--
ALTER TABLE `m_seo_meta`
  MODIFY `seo_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_cancel_reason`
--
ALTER TABLE `order_cancel_reason`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
  MODIFY `order_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `order_total`
--
ALTER TABLE `order_total`
  MODIFY `order_total_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `page_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `page_group`
--
ALTER TABLE `page_group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT;
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
-- AUTO_INCREMENT for table `plugins`
--
ALTER TABLE `plugins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `plugin_menu`
--
ALTER TABLE `plugin_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_description`
--
ALTER TABLE `product_description`
  MODIFY `product_description_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `product_image_id` int(11) NOT NULL AUTO_INCREMENT;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tax`
--
ALTER TABLE `tax`
  MODIFY `tax_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `zone_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT for table `zone_to_geo_zone`
--
ALTER TABLE `zone_to_geo_zone`
  MODIFY `zone_to_geo_zone_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD CONSTRAINT `fk_audit_log_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `fk_tbl_paymentItems_tbl_payment_foreignKey` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE;

--
-- Constraints for table `payment_items_archive`
--
ALTER TABLE `payment_items_archive`
  ADD CONSTRAINT `fk_tbl_paymentItemsArchive_tbl_orderProduct_foreignKey` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tbl_paymentItemsArchive_tbl_payment_foreignKey` FOREIGN KEY (`payment_archive_id`) REFERENCES `payment_archive` (`payment_archive_id`) ON DELETE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_tbl_sku_tbl_product_foreignKey` FOREIGN KEY (`sku_id`) REFERENCES `sku` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `fk_product_image_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_stock_alert`
--
ALTER TABLE `product_stock_alert`
  ADD CONSTRAINT `fk_tbl_product_tbl_product_stock_alert_foreign_key` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

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
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_usergroup` FOREIGN KEY (`user_group_id`) REFERENCES `user_group` (`group_id`) ON DELETE CASCADE;

--
-- Constraints for table `zone_to_geo_zone`
--
ALTER TABLE `zone_to_geo_zone`
  ADD CONSTRAINT `fk_Zone_ZoneGeo` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
