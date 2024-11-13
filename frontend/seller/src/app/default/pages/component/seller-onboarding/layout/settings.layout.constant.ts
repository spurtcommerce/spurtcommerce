export const settingsSideMenu = [
    {
        name: 'Company Details',
        slug: 'companyDetails',
        routerPath: '/seller-onboarding/company-details',
        image: verificationStatus('companyDetail'),
        isDisable: false
    },
    {
        name: 'Bank Account Info',
        slug: 'bankAccountInfo',
        routerPath: '/seller-onboarding/bank-account-info',
        image: verificationStatus('bankAccount'),
        isDisable: false
    },


]
function verificationStatus(status: string): string {
    const verificationStatus = JSON.parse(localStorage.getItem('vendorUser')).verification;

    return verificationStatus[status] == 1 ? 'assets/imgs/verify-tick.svg' : 'assets/imgs/Rejected.svg';
}
export function sorting(list,sortValue) {
    return list.sort((a,b) => a[sortValue].localeCompare(b[sortValue]));
}