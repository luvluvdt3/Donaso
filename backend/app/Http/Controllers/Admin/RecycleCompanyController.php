<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AlertRecycleCompany;
use App\Models\RecycleCompany;
use Illuminate\Http\Request;

class RecycleCompanyController extends Controller
{
    public function GetAllCompany()
    {
        $companies = RecycleCompany::latest()->get();
        return $companies;
    }

    public function PostCompany(Request $request)
    {
        $lat = $request->input('lat');
        $lng = $request->input('lng');
        $adress_name = $request->input('adress_name');
        if ($request->company_name) {
            $company_name = $request->input('company_name');
        } else {
            $company_name = "No Name";
        }
        $result = RecycleCompany::insert([
            'company_name' => $company_name,
            'lat' => $lat,
            'lng' => $lng,
            'adress_name' => $adress_name,
        ]);
        return $result;
    }

    public function AlertCompany(Request $request)
    {
        $company_name = $request->input('company_name');
        $idCreator = $request->input('idCreator');
        $lat = $request->input('lat');
        $lng = $request->input('lng');
        if ($request->adress_name) {
            $adress_name = $request->input('adress_name');
        } else {
            $adress_name = "Unknown Name";
        }
        if ($request->details) {
            $details = $request->input('details');
        } else {
            $details= "No Details";
        }
        $result = AlertRecycleCompany::insert([
            'company_name' => $company_name,
            'lat' => $lat,
            'lng' => $lng,
            'adress_name' => $adress_name,
            'idCreator' =>$idCreator,
            'details' => $details
        ]);
        return $result;
    }

    public function GetAllAlerts(){
        $alerts = AlertRecycleCompany::latest()->get();
        return view('backend.recycling_companies.company_view',compact('alerts'));

    }
}