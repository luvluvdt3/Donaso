<div class="sidebar-wrapper" data-simplebar="true">
    <div class="sidebar-header">
        <!-- <div>
            <img src="{{ asset('backend/assets/images/logo-icon.png') }}" class="logo-icon" alt="logo icon"
                width="200px">
        </div> -->
        <div>
            <h4 class=" logo-text">Donaso</h4>
        </div>
        <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
        </div>
    </div>

    <ul class="metismenu" id="menu">

        <li>
            <a href="{{ url('/dashboard') }}">
                <div class="parent-icon"><i class='bx bx-home-circle'></i>
                </div>
                <div class="menu-title">Dashboard</div>
            </a>
        </li>



        <li class="menu-label">Manage Site </li>

        <li>
            <a href="javascript:;" class="has-arrow">
                <div class="parent-icon"><i class='bx bx-cart'></i>
                </div>
                <div class="menu-title">Category</div>
            </a>
            <ul>
                <li> <a href="{{ route('all.category') }}"><i class="bx bx-right-arrow-alt"></i>Categories List</a>
                </li>
                <li> <a href="{{ route('add.category') }}"><i class="bx bx-right-arrow-alt"></i>Add New Category </a>
                </li>

            </ul>
        </li>


        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-repeat"></i>
                </div>
                <div class="menu-title">Slider</div>
            </a>
            <ul>
                <li> <a href="{{ route('all.slider') }}"><i class="bx bx-right-arrow-alt"></i>Sliders List</a>
                </li>
                <li> <a href="{{ route('add.slider') }}"><i class="bx bx-right-arrow-alt"></i>Add New Slider</a>
                </li>

            </ul>
        </li>


        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class='bx bx-bookmark-heart'></i>
                </div>
                <div class="menu-title">Recycling Company</div>
            </a>
            <ul>
                <li> <a href="{{ route('all.company') }}"><i class="bx bx-right-arrow-alt"></i>Recycling
                        Companies List</a>
                </li>
                <!-- <li> <a href="{{ route('add.subcategory') }}"><i class="bx bx-right-arrow-alt"></i>Add New Recycling
                        Company</a>
                </li>
                <li> <a href="{{ route('add.subcategory') }}"><i class="bx bx-right-arrow-alt"></i>Confirm Alerted
                        Recycling
                        Companies</a>
                </li> -->
            </ul>
        </li>

        <li>
            <a href="{{ route('contact.message') }}">
                <div class="parent-icon"><i class="bx bx-donate-blood"></i>
                </div>
                <div class="menu-title">Contact Message</div>
            </a>
        </li>

        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"> <i class="bx bx-donate-blood"></i>
                </div>
                <div class="menu-title">Site Info </div>
            </a>
            <ul>
                <li> <a href="{{ route('getsite.info') }}"><i class="bx bx-right-arrow-alt"></i>Update Site Info</a>
                </li>

            </ul>
        </li>
        <li class="menu-label">Products</li>
        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-repeat"></i>
                </div>
                <div class="menu-title">Product</div>
            </a>
            <ul>
                <li> <a href="{{ route('all.product') }}"><i class="bx bx-right-arrow-alt"></i>Products List</a>
                </li>
                <!-- <li> <a href="{{ route('add.product') }}"><i class="bx bx-right-arrow-alt"></i>Add New Product</a>
                </li> -->
            </ul>
        </li>
    </ul>
</div>