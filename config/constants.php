<?php

return [
    'status' => [
        'pending' => 1,
        'query' => 2,
        'pending_payment' => 3,
        'cp_payment' => 4,
        'completed' => 5
    ],
    'constType' => [
        'mailtype' => 'mail_type',
    ],
    'mailType' => [
        'pending' => 'mt_pending',
        'pending_payment' => 'mt_pending_payment',
        'cp_payment' => 'mt_cp_payment',
        'completed' => 'mt_completed',
        'pod_mail' => 'mt_pod_mail',
        'no_invoice' => 'mt_no_invoice',
        'wrong_invoice' => 'mt_wrong_invoice',
        'other' => 'mt_other',
        'resolve' => 'mt_resolve',
    ],
    'mailTemplate' =>[
        'resolveTitle' => 'Resolved Job',
        'podTitle' => 'POD Mail'
    ]
];