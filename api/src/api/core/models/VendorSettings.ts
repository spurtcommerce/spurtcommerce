import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import { Vendor } from './Vendor'; // Assuming you have a Vendor entity
import moment from 'moment';
// import { VendorTheme } from '../../../../add-ons/Theme/models/VendorThemes';
@Entity('vendor_settings')
export class VendorSettings {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'vendor_id' })
    public vendorId: number;

    @Column({ name: 'plugins' })
    public plugins: string;

    @Column({ name: 'invoice_prefix' })
    public invoicePrefix: string;

    @Column({ name: 'invoice_logo_name' })
    public invoiceLogoName: string;

    @Column({ name: 'invoice_logo_path' })
    public invoiceLogoPath: string;

    @Column({ name: 'is_maintenance' })
    public isMaintenance: number;

    @Column({ name: 'store_name' })
    public storeName: string;

    @Column({ name: 'store_logo_name' })
    public storeLogoName: string;

    @Column({ name: 'store_logo_path' })
    public storeLogoPath: string;

    @Column({ name: 'store_email' })
    public storeEmail: string;

    @Column({ name: 'store_mobile_no' })
    public storeMobileNo: string;

    @Column({ name: 'store_url' })
    public storeUrl: string;

    @Column({ name: 'store_address_line_1' })
    public storeAddressLine1: string;

    @Column({ name: 'store_address_line_2' })
    public storeAddressLine2: string;

    @Column({ name: 'store_country_id' })
    public storeCountryId: number;

    @Column({ name: 'store_state_id' })
    public storeStateId: number;

    @Column({ name: 'store_city' })
    public storeCity: string;

    @Column({ name: 'store_zipcode' })
    public storeZipcode: string;

    @Column({ name: 'store_currency_id' })
    public storeCurrencyId: number;

    @Column({ name: 'store_language_id' })
    public storeLanguageId: number;

    @Column({ name: 'store_time_zone' })
    public storeTimeZone: string;

    @Column({ name: 'seller_logo_name' })
    public sellerLogoName: string;

    @Column({ name: 'seller_logo_path' })
    public sellerLogoPath: string;

    @Column({ name: 'seller_logo2' })
    public sellerLogo2: string;

    @Column({ name: 'seller_logo2_path' })
    public sellerLogo2Path: string;

    @Column({ name: 'mail_driver' })
    public mailDriver: string;

    @Column({ name: 'mail_host' })
    public mailHost: string;

    @Column({ name: 'mail_username' })
    public mailUsername: string;

    @Column({ name: 'mail_password' })
    public mailPassword: string;

    @Column({ name: 'mail_port' })
    public mailPort: number;

    @Column({ name: 'mail_secure' })
    public mailSecure: number;

    @Column({ name: 'mail_encryption' })
    public mailEncryption: string;

    @Column({ name: 'mail_from' })
    public mailFrom: string;

    @Column({ name: 'site_name' })
    public siteName: string;

    @Column({ name: 'business_name' })
    public businessName: string;

    @Column({ name: 'store_owner' })
    public storeOwner: string;

    @Column({ name: 'default_country' })
    public defaultCountry: number;

    @Column({ name: 'store_language_name' })
    public storeLanguageName: string;

    @Column({ name: 'store_secondary_language_name' })
    public storeSecondaryLanguageName: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'items_per_page' })
    public itemsPerPage: number;

    @Column({ name: 'currency_symbol' })
    public currencySymbol: string;

    @Column({ name: 'zone_id' })
    public zoneId: number;

    @Column({ name: 'created_date' })
    public createdDate: string;

    @Column({ name: 'modified_date' })
    public modifiedDate: string;

    @Column({ name: 'order_status' })
    public orderStatus: number;

    @Column({ name: 'country' })
    public country: string;

    @Column({ name: 'copyrights' })
    public copyrights: string;

    @Column({ name: 'product_create_count', type: 'int', default: 0 })
    public productCreateCount: number;

    @Column({ name: 'feature_access', type: 'json', nullable: true })
    public featureAccess: any;

    @Column({ name: 'show_badge', type: 'boolean', default: false })
    public showBadge: boolean;

    @Column({ name: 'store_title', nullable: true })
    public storeTitle: string;

    @Column({ name: 'customer_service_hours' })
    public customerServiceHours: string;

    @Column({ name: 'default_palette', type: 'varchar', length: 50, nullable: true })
    public defaultPalette: string;

    @Column({ name: 'primary_color', type: 'varchar', length: 10, nullable: true })
    public primaryColor: string;

    @Column({ name: 'secondary_color', type: 'varchar', length: 10, nullable: true })
    public secondaryColor: string;

    @Column({ name: 'enable_advanced_sku_search', type: 'boolean', default: false })
    public enableAdvancedSkuSearch: boolean;

    @Column({ name: 'allow_bulk_csv_ordering', type: 'boolean', default: false })
    public allowBulkCsvOrdering: boolean;

    @Column({ name: 'show_request_for_quote', type: 'boolean', default: false })
    public showRequestForQuote: boolean;

    @Column({ name: 'theme_id' })
    public themeId: number;

    @Column({ name: 'hero_image_name', nullable: true })
    public heroImageName: string;

    @Column({ name: 'hero_image_path', nullable: true })
    public heroImagePath: string;

    @Column({ name: 'hero_headline', type: 'varchar', length: 255, nullable: true })
    public heroHeadline: string;

    @Column({ name: 'hero_sub_headline', type: 'varchar', length: 255, nullable: true })
    public heroSubHeadline: string;

    @Column({ name: 'hero_cta_text', type: 'varchar', length: 100, nullable: true })
    public heroCtaText: string;

    @Column({ name: 'hero_cta_link', type: 'varchar', length: 255, nullable: true })
    public heroCtaLink: string;

    @OneToOne(() => Vendor)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor;

    // @OneToOne(() => VendorTheme)
    // @JoinColumn({ name: 'theme_id' })
    // public vendorTheme: VendorTheme;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
