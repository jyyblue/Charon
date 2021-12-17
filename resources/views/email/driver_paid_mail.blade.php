<div style="text-align: center; margin: 10%;">
    <h4>We sent payment!</h4>
    <p>Payment Reference: {{ $data['payment_reference'] }}</p>
    <p> Payment Date: {{ $data['payment_date'] }}</p>
    <p> Total Payment: {{ $data['total_payment'] }}</p>
    <p> Sent payment for below invoice(s)</p>
    @foreach($data['task_data'] as $task )
    <p> Docket: {{ $task['docket'] }}</p>
    <p> Company Name: {{ $task['company_name'] }}</p>
    <p> Job Date: {{ $task['job_date'] }}</p>
    <p> Payment: &pound; {{ $task['tprice'] }}</p>
    @endforeach
</div>