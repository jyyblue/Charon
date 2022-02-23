<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ConstOption;
use App\Models\EmailLog;
use Illuminate\Http\Request;
use App\Models\MailTemplate;
use App\Models\TaskStatus;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MailManagementController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * 2022-02-25 blue
     * get status and select2 of calendar
     */
    public function getTemplate(Request $request)
    {
        $template_id = $request->get('id');
        $templates = MailTemplate::select('type_slug')->get();
        $usedType = array();
        foreach ($templates as $key => $value) {
            $type = $value->type_slug;
            array_push($usedType, $type);
        }
        $type = ConstOption::where('type', constants('constType.mailtype'));
        if (empty($template_id)) {
            $type = $type->whereNotIn('key', $usedType);
        }
        $type = $type->get();
        $template = MailTemplate::find($template_id);
        $suggestItems = getVariableForMailTemplate();
        $ret = array();
        $ret['code'] = 200;
        $ret['type'] = $type;
        $ret['suggestItems'] = $suggestItems;
        $ret['template'] = $template;
        return $ret;
    }

    public function checkMailTeamplte(Request $request)
    {
        $type = $request->get('type');
        $template = MailTemplate::where('type_slug', $type);
        $template = $template->first();

        $ret['code'] = 200;
        if (empty($template)) {
            $ret['available'] = true;
        } else {
            $ret['available'] = false;
            $ret['message'] = 'Mail Template already exist!';
        }
        return $ret;
    }
    /**
     * Store a newly created template
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'subject'                  => 'required',
                'content'           => 'required',
            ]
        );

        if ($validator->fails()) {
            $error = $validator->errors()->first();
            $ret['code'] = 201;
            $ret['message'] = $error;
            return $ret;
        }

        $template =  MailTemplate::create([
            'type_slug'        => $request->input('type'),
            'subject'        => $request->input('subject'),
            'content'        => $request->input('content'),
            'active'        => strip_tags($request->input('active')),
        ]);

        $template->save();
        $ret['code'] = 200;
        return $ret;
    }

    /**
     * Update the specified template
     *
     * @param \Illuminate\Http\Request $request
     * @param id                     $id
     *
     * @return json
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject'     => 'required',
            'content'     => 'required',
        ]);

        if ($validator->fails()) {
            $error = $validator->errors()->first();
            $ret['code'] = 201;
            $ret['message'] = $error;
            return $ret;
        }

        $id = $request->get('id');
        $template = MailTemplate::find($id);
        $template->type_slug = strip_tags($request->input('type'));
        $template->subject = $request->input('subject');
        $template->content = $request->input('content');
        $template->active = strip_tags($request->input('active'));
        $template->save();

        $ret['code'] = 200;
        return $ret;
    }

    /**
     * Remove the specified template.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        try {
            $id = $request->get('id');
            DB::beginTransaction();
            $cpform = MailTemplate::find($id);
            $cpform->delete();
            DB::commit();
            $ret['code'] = 200;
            return $ret;
        } catch (\Exception $e) {
            $ret['code'] = 400;
            return $ret;
        }
    }

    /**
     * Method to search template data.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function getList(Request $request)
    {
        $pageSize = $request->get('pagesize', 10);
        $page = $request->get('page', 1);
        $skip = ($page - 1) * $pageSize;

        $results = MailTemplate::with(['type']);
        $count = $results->count();
        $results = $results->skip($skip)->take($pageSize)->get();
        $ret['code'] = 200;
        $ret['data'] = $results;
        $ret['total'] = $count;
        return $ret;
    }

    /**
     * Method to search Email log data.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function getLogs(Request $request)
    {
        $ret = array();
        $pageSize = $request->get('pagesize', 10);
        $page = $request->get('page', 1);
        $skip = ($page - 1) * $pageSize;
        $search = $request->get('search', '');

        $all = EmailLog::leftjoin('task', function($join){
            $join->on('email_log.task_id', '=', 'task.id');
        });
        if ($search != '') {
            $all = $all
                ->whereRaw('LOWER(`email_log`.`subject`) LIKE ? ', ['%' . trim(strtolower($search)) . '%'])
                ->orWhereRaw(' LOWER(`email_log`.`to`) LIKE ? ', ['%' . trim(strtolower($search)) . '%'])
                ->orWhereRaw(' LOWER(`task`.`docket`) LIKE ? ', ['%' . trim(strtolower($search)) . '%'])
                ;
        }
        $count = $all->count();
        $all = $all->select(['email_log.*', 'task.docket'])->skip($skip)->take($pageSize)->get();
        $ret['code'] = 200;
        $ret['total'] = $count;
        $ret['data'] = $all;
        return response()->json($ret, 200);
    }
}
