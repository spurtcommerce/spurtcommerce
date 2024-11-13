export const itemsPerPage = ['', null, undefined, 0, '0'].includes(localStorage.getItem('itemsPerPage')) ? 10 : Number(localStorage.getItem('itemsPerPage'));

export const itemsPerPageList = [
    { id: 10, name: '10' },
    { id: 20, name: '20' },
    { id: 30, name: '30' },
    { id: 40, name: '40' },
];