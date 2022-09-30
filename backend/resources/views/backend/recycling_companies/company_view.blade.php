@extends('admin.admin_master')
@section('admin')


<div class="page-wrapper">
    <div class="page-content">
        <div class="card radius-10">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0">All Recycling Companies's Alerts </h5>
                    </div>
                    <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                    </div>
                </div>
                <hr>
                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>SL</th>
                                <th>Company Name </th>
                                <th>Adress Name </th>
                                <th>Address</th>
                                <th>Details </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php($i = 1)
                            @foreach($alerts as $item)
                            <tr>
                                <td>{{ $i++ }}</td>
                                <td>{{ $item->company_name }}</td>
                                <td>{{ $item->adress_name }}</td>
                                <td><a href=" https://maps.google.com/?q={{$item->lat}},{{$item->lng}}">Link Google
                                        Map</a>
                                <td class="text-truncate">{{ $item->details }}</td>
                                <td>
                                    <a href="" class=" btn btn-info">Accept </a>
                                    <a href="" class="btn btn-danger">Refuse </a>

                                </td>
                            </tr>
                            @endforeach

                        </tbody>
                    </table>
                </div>
            </div>
        </div>




    </div>
</div>

@endsection