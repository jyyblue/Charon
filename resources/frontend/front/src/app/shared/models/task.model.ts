const now = new Date();
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Task {
    public id: number;
    public customer_id: number;
    public docket: string;
    public job_date: NgbDateStruct;
    public vehicle_type: string;
    public c_price: number;
    public c_vat: number;
    public c_price_total: number;
    public c_extra: number;
    public c_extra_vat: number;
    public c_extra_total: number;
    public c_extra_0: number;
    public c_extra_vat_0: number;
    public c_extra_total_0: number;
    public c_net: number;
    public c_vat_total: number;
    public c_tprice: number;
    public has_pod: boolean;
    public driver_id: number;
    public job_ref: string;
    public call_sign: string;
    public driver_type: number;
    public cx_number: string;
    public driver_vehicle: string;
    public d_price: number;
    public d_vat: number;
    public d_price_total: number;
    public d_extra: number;
    public d_extra_vat: number;
    public d_extra_total: number;
    public d_extra_0: number;
    public d_extra_vat_0: number;
    public d_extra_total_0: number;
    public d_net: number;
    public d_vat_total: number;
    public d_tprice: number;
    public source: string;
    public mileage: number;
    public stop_number: number;
    public invoice_date: NgbDateStruct;
    public invoice_received_date: NgbDateStruct;
    public target_payment_date: string;
    public invoice_number: string;
    public pod_file: string;
    public check_price: number;
    public check_docket_off: number;
    public check_bank: number;
    public payment_date: NgbDateStruct;
    public payment_reference: string;
    public total_payment: number;
    public status: number;
    public profit: number;
    public profitpercent: number;
    public created_at: string;
    public driver: any;
    public _status: any;
    public customer: any;
    public distances : any[];
    public query_history: any[];
    private model = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
    }
    constructor() {
        this.id = 0;
        this.customer_id = 0;
        this.docket = '';
        this.job_date = this.model;
        this.vehicle_type = '';
        this.c_price = 0;
        this.c_vat = 2;
        this.c_price_total = 0;
        this.c_extra = 0;
        this.c_extra_vat = 0;
        this.c_extra_total = 0;
        this.c_extra_0 = 0;
        this.c_extra_vat_0 = 0;
        this.c_extra_total_0 = 0;
        this.c_net = 0;
        this.c_vat_total = 0;
        this.c_tprice = 0;
        this.has_pod = false;
        this.driver_id = 0;
        this.job_ref = '';
        this.call_sign = '';
        this.driver_type = 0;
        this.cx_number = '';
        this.driver_vehicle = '';
        this.d_price = 0;
        this.d_vat = 0;
        this.d_price_total = 0;
        this.d_extra = 0;
        this.d_extra_vat = 0;
        this.d_extra_total = 0;
        this.d_extra_0 = 0;
        this.d_extra_vat_0 = 0;
        this.d_extra_total_0 = 0;
        this.d_net = 0;
        this.d_vat_total = 0;
        this.d_tprice = 0;
        this.source = null;
        this.mileage = 0;
        this.stop_number = 0;
        this.invoice_date = null;
        this.invoice_received_date = null;
        this.target_payment_date = '';
        this.invoice_number = '';
        this.pod_file = '';
        this.check_price = 0;
        this.check_docket_off = 0;
        this.check_bank = 0;
        this.payment_date = null;
        this.payment_reference = '';
        this.total_payment = 0;
        this.status = 0;
        this.profit = 0;
        this.profitpercent = 0;
        this._status = {
            id: 0
        }
        this.driver = {
            bank_name: '',
            bank_sort_code: '',
            bank_account_number: '',
            payee_name: ''
        };
        this.customer = null;
        this.distances = [];
        this.query_history = [];
        this.created_at = '';
    }
}