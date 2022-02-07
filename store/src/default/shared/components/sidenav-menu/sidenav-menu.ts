/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { SidenavMenu } from './sidenav-menu.model';

export const sidenavMenuItems = [
    new SidenavMenu (1, 'Home', '/', null, null, false, 0),
    new SidenavMenu (2, 'Fashion', null, null, null, true, 0),
    new SidenavMenu (10, 'Women', null, null, null, true, 2),
    new SidenavMenu (11, 'Dresses & Skirts', '/products/dresses & skirts', null, null, false, 10),
    new SidenavMenu (12, 'Jackets', '/products/jackets', null, null, false, 10),
    new SidenavMenu (13, 'Tops & Blouses', '/products/tops & blouses', null, null, false, 10),
    new SidenavMenu (14, 'Shoes & Boots', '/products/shoes & boots', null, null, false, 10),
    new SidenavMenu (15, 'Knitwear', '/products/knitwear', null, null, false, 10),
    new SidenavMenu (20, 'Men', null, null, null, true, 2),
    new SidenavMenu (21, 'T-shirts & Polos', '/products/t-shirts & polos', null, null, false, 20),
    new SidenavMenu (22, 'Shoe & Boots', '/products/shoe & boots', null, null, false, 20),
    new SidenavMenu (23, 'Jeans', '/products/jeans', null, null, false, 20),
    new SidenavMenu (24, 'Coats', '/products/coats', null, null, false, 20),
    new SidenavMenu (30, 'Kids', null, null, null, true, 2),
    new SidenavMenu (31, 'Top', '/products/top', null, null, false, 30),
    new SidenavMenu (32, 'Pants & Shorts', '/products/pants & shorts', null, null, false, 30),
    new SidenavMenu (33, 'Dresses', '/products/dresses', null, null, false, 30),
    new SidenavMenu (34, 'Skirts', '/products/skirts', null, null, false, 30),
    new SidenavMenu (35, 'Set & Body', '/products/set & body', null, null, false, 30),
    new SidenavMenu (40, 'Accessories', null, null, null, true, 2),
    new SidenavMenu (41, 'Watches', '/products/watches', null, null, false, 40),
    new SidenavMenu (42, 'Bags & Wallet', '/products/bags & wallet', null, null, false, 40),
    new SidenavMenu (43, 'Sunglasses', '/products/sunglasses', null, null, false, 40),
    new SidenavMenu (44, 'Belts & Hats', '/products/belts & hats', null, null, false, 40),
    new SidenavMenu (50, 'Jewellery', '/products/jewellery', null, null, false, 0),
    new SidenavMenu (51, 'Electronics', '/products/electronics', null, null, false, 0),
    new SidenavMenu (52, 'Sports', '/products/sports', null, null, false, 0),
    new SidenavMenu (52, 'Motors', '/products/motors', null, null, false, 0),
    new SidenavMenu (60, 'Pages', null, null, null, true, 0),
    new SidenavMenu (61, 'All products', '/products', null, null, false, 60),
    new SidenavMenu (62, 'Product detail', '/products/2/PC All-in-One', null, null, false, 60),
    new SidenavMenu (63, 'Sign in', '/sign-in', null, null, false, 60),
    new SidenavMenu (64, '404 Error', '/404', null, null, false, 60),
    new SidenavMenu (80, 'Contact', '/contact', null, null, false, 0),
    new SidenavMenu (140, 'Level 1', null, null, null, true, 0),
    new SidenavMenu (141, 'Level 2', null, null, null, true, 140),
    new SidenavMenu (142, 'Level 3', null, null, null, true, 141),
    new SidenavMenu (143, 'Level 4', null, null, null, true, 142),
    new SidenavMenu (144, 'Level 5', null, 'http://themeseason.com', null, false, 143),
    new SidenavMenu (200, 'External Link', null, 'http://themeseason.com', '_blank', false, 0)
];
