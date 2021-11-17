<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/fontawesomes.bundle.css') }}" rel="stylesheet">
    <link href="{{ asset('vendors/jquery.dataTables1.10.9.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendors/jquery-ui1.11.3.css') }}" rel="stylesheet">
    <link href="{{ asset('vendors/select2.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendors/toastr.min.css') }}" rel="stylesheet">

    @stack('styles')
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    @if(auth()->check())    
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">
                        <li class="p-3">
                            <a href="{{route('front.url.index')}}">
                            <i class="fa fa-globe"></i>
                                <span class="title">A</span>
                            </a>
                        </li> 
                        <li class="p-3">
                            <a href="{{route('front.contact.index')}}">
                            <i class="fa fa-comments"></i>
                                <span class="title">B</span>
                            </a>
                        </li> 
                    </ul>

                     <!-- Right Side Of Navbar -->
                     <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->                       
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                {{ Auth::user()->name }}
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                                    document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    </ul>
                    @endif
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
    
    <!-- Scripts -->
    <script src="{{ asset('vendors/jquery.min.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('vendors/jquery.dataTables1.10.9.min.js') }}"></script>
    <script src="{{ asset('vendors/jquery-ui1.11.3.min.js') }}"></script>
    <script src="{{ asset('vendors/select2.min.js') }}"></script>
    <script src="{{ asset('vendors/toastr.min.js') }}"></script>
    @stack('scripts')

    <script>
        $(document).keydown(function (event) {
            if (event.keyCode == 123) { 
                return false;
            }
            if (event.ctrlKey && (event.keyCode === 85)) {
                    // alert('not allowed');
                return false;
            }
            if (event.ctrlKey && (event.keyCode === 85)) {
                    // alert('not allowed');
                return false;
            }
            if (event.ctrlKey && (event.keyCode === 83)) {
                    // alert('not allowed');
                return false;
            }
            
            if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
                    // alert('not allowed');
                return false;
            }
        });

        $(document).on("contextmenu", function (e) {        
            e.preventDefault();
        });


    </script>
</body>
</html>
