import { Countries } from 'src/app/shared/models/country.model';

export const common = {
    USER: 'CURRENT_USER',
    ROLE: 'USER_ROLE',
    IS_ADMIN: 'IS_ADMIN',
    TOKEN: 'TOKEN',
    ROLE_TYPE: {
        ADMIN: '1',
        CUSTOMER: '2',
        DRIVER: '3',
    },
    TIMEOUT: 5000,
    PREV_PAGE: {
        ALL: 'ALL',
        PENDING: 'PENDING',
        PAYMENT_PENDING: 'PAYMENTPENDING',
        COMPLRETED_PAYMENT_PENDING: 'CP_PAYMENT',
        COMPLETED: 'COMPLETED',
        QUERY: 'QUERY'
    },
    PAGE_SIZE: 50
};
