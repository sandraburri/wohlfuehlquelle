<html>

<head>
    <title>@yield('title') | Wohlfühlquelle</title>
    @stack('scripts') @stack('styles')

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('/js/app.js') }}"></script>


</head>

<body>
    <div id="page-wrapper">
        <div id="page">
            <div id="header">
                <div class="section clearfix">
                    <div id="name-and-slogan">
                        <div id="site-name">
                            <strong>
                            <a href="/" title="Startseite" rel="home"><span>Wohlfühlquelle</span></a>
                            </strong>
                        </div>
                    </div>
                    <a href="/kontakt" id="kontakt"></a>
                    <a href="/konditionen" id="konditionen"></a>
                </div>
            </div>
            <div id="navigation">
                <nav className="navbar navbar-expand-lg navbar-light navbar-expand">
                    <div id="navbar" class="navbar-expand">

                        <ul class="navbar-nav mr-auto">

                            <li class="nav-item">
                                <a href="/"">Startseite</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle{{Request::segment(1) === 'angebot' ? ' active' : null}}" href="/angebot"
                                    id="offerDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Angebot
                                </a>
                                <div class="dropdown-menu" aria-labelledby="offerDropdown">
                                    <a class="dropdown-item" href="/angebot">Angebot</a>
                                    <a class="dropdown-item indent" href="/angebot/massage">Massage</a>
                                    <a class="dropdown-item indent" href="/angebot/reflexzonenmassage">Reflexzonen-Massage</a>
                                    <a class="dropdown-item indent" href="/angebot/body-stempel-massage">Body-Stempel-Massage</a>
                                    <a class="dropdown-item indent" href="/angebot/jadewell-thermo-massageliege">Jade Liege</a>
                                    <a class="dropdown-item indent" href="/angebot/notfallbehandlung">Notfallbehandlung</a>
                                    <a class="dropdown-item indent" href="/angebot/ohrenkerzentherapie">Ohrenkerzen</a>
                                    <a class="dropdown-item indent" href="/angebot/tiermassage">Tiermassage</a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="/profil" class="{{Request::segment(1) === 'profil' ? ' active' : null}}">Über mich</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div id="after-navigation"></div>

            <div id="main-wrapper">
                <div id="main" class="main with-navigation clearfix">

                    <div id="post-it">&nbsp;</div>

                    @if(View::hasSection('main-title'))
                        <h1>@yield('main-title')</h1>
                    @endif

                    <div id="content" class="content">
                        @yield('content')
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="footer">
        <div class="texts">
            <div class="address">
                <dl>
                    <dt>Wohlfühlquelle</dt>
                    <dd>
                        Sandra Burri
                        <span>•</span> Wabersackerstrasse 107
                        <span>•</span> 3098 Köniz
                        <span>•</span> +41 79 706 81 84
                        <span>•</span>
                        <a href="/kontakt">Kontakt</a>
                    </dd>
                </dl>
            </div>
            <div class="author">
                <a href="/impressum">impressum</a> |
                <a href="http://validator.w3.org/check/referer">xhtml</a> |
                <a href="http://jigsaw.w3.org/css-validator/check/referer">css</a> <br>
                <a class="laravel" href="http://laravel.com/" target="_blank">built with laravel</a>
            </div>
            <div class="times">
                <dl>
                    {{--
                        <dt>Öffnungszeiten</dt>
                        <dd>Montag-Donnerstag 17:30 – 20:00 <span>•</span> Freitag 13:00 – 20:00</dd>
                    --}}
                    <dd>Termine nach Vereinbarung <span>•</span> Für Notfälle auch ausserhalb der Öffnungszeiten möglich</dd>
                </dl>
            </div>
        </div>
    </div>

</body>

</html>
