<p>Dear {{ $data['company_name']}}</p>
<p>As requested, you may download your proof of delivery paperwork for the below mentioned job by clicking on this 
    <a href="{{ $data['pod_file'] }}">link</a>.</p>
<table style="margin-top: 10px; margin-bottom: 10px;">
    <tr>
        <td>Our Docket Number:</td>
        <td>{{ $data['docket'] }}</td>
    </tr>
    <tr>
        <td>Your Reference:</td>
        <td>{{ $data['c_ref_1'] }}&nbsp;{{ $data['c_ref_2'] }}</td>
    </tr>
    <tr>
        <td>Job Date:</td>
        <td>{{ $data['job_date'] }} </td>
    </tr>
    <tr>
        <td>Vehicle Size:</td>
        <td>{{ $data['vehicle_size'] }}</td>
    </tr>
    <tr>
        <td>Journey:</td>
        <td>{{ $data['journey'] }}</td>
    </tr>
</table>
<p>If you have any questions about this please email operations@gjsservices.com </p>
<p>Best wishes</p>
<p>GJS</p>

