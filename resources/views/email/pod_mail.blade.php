<p>Dear {{ $data['company_name']}}</p>
<p>As requested, you may download your proof of delivery paperwork for the below mentioned job by clicking on this 
    <a href="{{ $data['pod_file'] }}">link</a>.</p>
<p style="margin-top: 20px;">
        <strong>Our Docket Number:</strong>&nbsp;
        <span>{{ $data['docket'] }}</span>
</p>
<p>
        <strong>Your Reference:</strong>&nbsp;
        <span>{{ $data['c_ref_1'] }}&nbsp;{{ $data['c_ref_2'] }}</span>
</p>
<p>
        <strong>Job Date:</strong>&nbsp;
        <span>{{ $data['job_date'] }}</span>
</p>
<p>
        <strong>Vehicle Size:</strong>&nbsp;
        <span>{{ $data['vehicle_size'] }}</span>
</p>
<p style="margin-bottom: 20px;">
        <strong>Journey:</strong>&nbsp;
        <span>{{ $data['journey'] }}</span>
</p>
<p>If you have any questions about this please email operations@gjsservices.com </p>
<p>Best wishes</p>
<p>GJS</p>
