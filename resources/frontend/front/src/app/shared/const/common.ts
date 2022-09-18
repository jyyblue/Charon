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

export const DEFAULT_DOCUMENT_LIST = {
    CX: 
        [
            {
            'idx': 'driver_cpc',
            'name': 'Driver CPC',
            },
            {
            'idx': 'eye_sight_test',
            'name': 'Eye Sight Test',
            },
            {
            'idx': 'uniform_issue_form',
            'name': 'Uniform Issue Form',
            }
        ],
    PAYE: 
        [
            {
            'idx': 'operators_licence',
            'name': 'Operators Licence',
            },
            {
            'idx': 'fleet_vehicle_insurance',
            'name': 'Fleet / Vehicle Insurance',
            },
            {
            'idx': 'vat_certificate',
            'name': 'VAT Certificate',
            },
            {
            'idx': 'work_permit',
            'name': 'Work Permit',
            },
            {
            'idx': 'driving_licence',
            'name': 'Driving Licence',
            },
            {
            'idx': 'driver_cpc',
            'name': 'Driver CPC',
            },
            {
            'idx': 'eye_sight_test',
            'name': 'Eye Sight Test',
            }
        ],
    SE: 
        [
            {
            'idx': 'operators_licence',
            'name': 'Operators Licence',
            },
            {
            'idx': 'fleet_vehicle_insurance',
            'name': 'Fleet / Vehicle Insurance',
            },
            {
            'idx': 'vat_certificate',
            'name': 'VAT Certificate',
            },
            {
            'idx': 'work_permit',
            'name': 'Work Permit',
            },
            {
            'idx': 'driving_licence',
            'name': 'Driving Licence',
            },
            {
            'idx': 'driver_cpc',
            'name': 'Driver CPC',
            },
            {
            'idx': 'uniform_issue_form',
            'name': 'Uniform Issue Form',
            }
        ],
    COMPANY: 
        [
            {
            'idx': 'operators_licence',
            'name': 'Operators Licence',
            },
            {
            'idx': 'fleet_vehicle_insurance',
            'name': 'Fleet / Vehicle Insurance',
            },
            {
            'idx': 'vat_certificate',
            'name': 'VAT Certificate',
            },
            {
            'idx': 'work_permit',
            'name': 'Work Permit',
            },
            {
            'idx': 'driving_licence',
            'name': 'Driving Licence',
            },
            {
            'idx': 'eye_sight_test',
            'name': 'Eye Sight Test',
            },
            {
            'idx': 'uniform_issue_form',
            'name': 'Uniform Issue Form',
            }
        ], 
}

export const DRIVER_TYPE= {
    1: 'CX',
    2: 'PAYE',
    3: 'SE',
    4: 'COMPANY'
}