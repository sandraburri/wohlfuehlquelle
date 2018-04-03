@extends('layouts.app')
@section('title', 'Herzlich Willkommen')
@section('main-title', 'Herzlich Willkommen')
@section('content')
<h3>Fühlen Sie sich wohl!</strong></h3>
<p>Die Wohlfühlquelle ist für Sie da. Sie können hier…</p>
<ul>
    <li>Energie tanken</li>
    <li>Ihr Wohlbefinden verbessern</li>
    <li>den Geist beleben</li>
    <li>einfach die Ruhe geniessen</li>
    <li>Stress abbauen</li>
    <li>Ihren Körper lockern</li>
    <li>die Muskeln nach Unfällen oder Verletzungen aufbauen</li>
    <li>sich von Schmerzen befreien, um ohne Migräne und Verspannungen besser zu leben</li>
</ul>
<p></p>
<div id="mycarousel" class="carousel-component" style="width: 408px; display: block;">
    <div class="carousel-prev"> <img id="prev-arrow" class="left-button-image" src="/images/carousel/left-disabled.png" alt="" title="Zurück">        </div>
    <div class="carousel-next"> <img id="next-arrow" class="right-button-image" src="/images/carousel/right-enabled.png" alt=""
            title="Weiter"> </div>
    <div class="carousel-clip-region" style="width: 400px;">
        <ul class="carousel-list  carousel-horizontal" id="carousel" style="position: relative; left: 0px;">
            <li id="mycarousel-item-1"><a href="/images/home/full/010.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/010.jpg" alt=""></a></li>
            <li id="mycarousel-item-2"><a href="/images/home/full/050.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/050.jpg" alt=""></a></li>
            <li id="mycarousel-item-3"><a href="/images/home/full/110.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/110.jpg" alt=""></a></li>
            <li id="mycarousel-item-4"><a href="/images/home/full/090.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/090.jpg" alt=""></a></li>
            <li id="mycarousel-item-5"><a href="/images/home/full/100.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/100.jpg" alt=""></a></li>
            <li id="mycarousel-item-6"><a href="/images/home/full/080.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/080.jpg" alt=""></a></li>
            <li id="mycarousel-item-7"><a href="/images/home/full/040.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/040.jpg" alt=""></a></li>
            <li id="mycarousel-item-8"><a href="/images/home/full/020.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/020.jpg" alt=""></a></li>
            <li id="mycarousel-item-9"><a href="/images/home/full/060.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/060.jpg" alt=""></a></li>
            <li id="mycarousel-item-10"><a href="/images/home/full/030.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/030.jpg" alt=""></a></li>
            <li id="mycarousel-item-11"><a href="/images/home/full/070.jpg" rel="lyteshow[group]"><img width="88" height="88" src="/images/home/070.jpg" alt=""></a></li>
        </ul>
    </div>
</div>
<p></p>
<p>Ich freue mich, Sie in der Wohlfühlquelle willkommen zu heissen und mit Ihnen zusammen ein Konzept für Ihr Wohlbefinden und
    Ihre Gesundheit zu entwickeln.</p>
<p>Meine seriöse und qualifizierte Beratung geht auf Ihre individuelle Situation ein. Meine Behandlung verbessert Ihr körperliches
    und geistiges Wohlbefinden. Die Wohlfühlquelle lässt Ihre Lebensenergie sprudeln.</p>
<h3>Mir liegt daran, dass Sie sich wohl fühlen!</h3>
<h2>Meine Angebote</h2>
<ul>
    <li><a href="/angebot/massage">Rückenmassage / Ganzkörpermassage</a></li>
    <li><a href="/angebot/reflexzonenmassage">Fuss- und Handreflexzonen-Massage</a></li>
    <li><a href="/angebot/body-stempel-massage">Body-Stempel-Massage</a></li>
    <li><a href="/angebot/jadewell-thermo-massageliege">Jadewell Thermo-Massageliege</a></li>
    <li><a href="/angebot/notfallbehandlung">Notfallbehandlung</a></li>
    <li><a href="/angebot/ohrenkerzentherapie">Ohrenkerzentherapie</a></li>
</ul>

<h2>Öffnungszeiten der Wohlfühlquelle</h2>
<dl>
    <dt>Montag</dt>
    <dd>08:00 - 20:00</dd>

    <dt>Dienstag</dt>
    <dd>08:00 - 11:00</dd>

    <dt>Mittwoch </dt>
    <dd>08:00 - 11:00</dd>

    <dt>Donnerstag</dt>
    <dd>18:00 - 20:00</dd>

    <dt>Freitag </dt>
    <dd>18:00 - 20:00</dd>
</dl>

<ul>
    <li>Termine nach Vereinbarung (siehe <a href="/kontakt">Kontakt</a>)</li>
    <li>Für Notfälle auch ausserhalb der Öffnungszeiten möglich.</li>
</ul>
@endsection
