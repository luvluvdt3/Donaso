@extends('admin.admin_master')
@section('admin')

<div class="page-wrapper">
    <div class="page-content">
        <div class="error-404 d-flex align-items-center justify-content-center">
            <div class="container">
                <div class="card py-5">
                    <div class="row g-0">
                        <div class="col col-xl-5">
                            <div class="card-body p-4">
                                <h1 class="display-5"><span class="text-primary">DONASO'S</span><span
                                        class="text-danger">
                                        Admin </span><span class="text-success">Panel</span></h1>
                            </div>
                        </div>
                        <div class="col-xl-7">
                            <img src="{{ asset('backend/assets/images/logo-icon.png') }}" class="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection