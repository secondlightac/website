---
title: "Was für Software entwickelt IT4Kids?"
date: 2018-06-22T19:08:40+02:00
draft: false
---

<div class="row">
    <div class="col-12">
        <p>
            Wir entwickeln derzeit eine eigene Software, da wir mit den bestehenden Alternativen nicht zufrieden waren. Gerade im Bereich grafischer Programmierung gibt es sehr gute Angebote <a href="https://scratch.mit.edu/" class="link">Scratch</a>, wir haben aber drei Punkte, mit denen wir unsere Software auf unsere Bedürfnisse im Unterricht anpassen wollen:
        </p>
    </div>
</div>
<div class="row">
    <div class="d-lg-none jumbotron" style="background-image:url({{< relURL "/img/software_one.jpg" >}});width:100%;height:350px;background-size: cover; background-position: center bottom"></div>
    <div id="softwareDemoContainer" class="d-none d-lg-block" style="background: #1961ac;width: 100%;max-height:600px">
    <button id="loadDemoButton" type="button" class="btn btn-primary" style="position: relative;margin: 20px; left: 42%;width: 16%;height: 40px;color: white;border: white 1px solid;">Jetzt Demo laden!</button>
    </div>
</div>
<div class="row pb-5 pt-5">
    <div class="col-md-6 col-12 mb-4 text-center">
        <h3 class="center">Integration von Lerninhalten</h3>
        <img src="{{< relURL "/img/icon-puzzle.svg" >}}" alt="" class="img img-fluid center mt-4" style="max-height:200px;">
    </div>
    <div class="col-md-6 col-12">
        <p>
            Wir planen die Lerninhalte der Stunden so eng wie möglich mit der Software zu verzahnen. So können die Aufgabenstellungen direkt in der Programmieroberfläche eingebettet werden und Hilfestellungen sind auch immer nur einen Klick entfernt. Des Weiteren planen wir eine fähigkeitsbasierte Progression (mehr dazu auf der Seite <a href="{{< relref "lehrmaterial.md" >}}" class="link">Lehrmaterial</a>), welche es erfordert, dass Inhalte automatisch in einer spezifischen Sequenz aufeinander folgen.
        </p>
    </div>
</div>
<div class="row pb-5 pt-5">
    <div class="col-md-6 col-12 order-md-2 mb-4 text-center">
        <h3 class="center">Cloudlösung und zentrale Inhaltssteuerung</h3>
        <img src="{{< relURL "/img/icon-server.svg" >}}" alt="" class="img img-fluid center mt-4" style="max-height:200px;">
    </div>
    <div class="col-md-6 order-md-1 col-12">
        <p>
            Um die Lerninhalte gezielt und für alle Schulen anpassen zu können planen wir eine zentrale Speicherung. Auf diese Weise kann einerseits das Curriculum jederzeit angepasst werden, und andererseits für jedes Kind ein individueller Speicherstand angelegt werden. Dieser ist dann auch unabhängig von der Schulinfrastruktur und kann von überall angerufen werden.
        </p>
    </div>
</div>
<div class="row pb-5 pt-5">
    <div class="col-md-6 col-12 mb-4 text-center">
        <h3 class="center">Learning analytics</h3>
        <img src="{{< relURL "/img/icon-analyse.svg" >}}" alt="" class="img img-fluid center mt-4" style="max-height:200px;">
    </div>
    <div class="col-md-6 col-12">
        <p>
            Sobald alle der obigen Funktionen implementiert sind planen wir ein umfangreiches Logging einzurichten. Das erlaubt es uns einerseits der Lehrperson individuelles Feedback zu geben, welcher Schüler derzeit Hilfe bei der vorliegenden Lektion benötigt, sowie größere (und anonymisierte) Datenanalyse, um einerseits unser Material zu verbessern und andererseits auf lange Sicht auch eine Empfehlung für die Leistungsbewertung abgeben zu können.
        </p>
    </div>
</div>
<div>
<script>
window.addEventListener('load', function() {
    var softwareDemoContainer = $('#softwareDemoContainer');
    var softwareDemoButton = $('#loadDemoButton');
    softwareDemoButton.click(function() {
        softwareDemoButton.remove()
        softwareDemoContainer.append('<iframe id="softwareDemo" src="https://it4kids.github.io/blockster/" style="background: white; width: 100%;height: 600px;border: none;"></iframe>');
    });
})
</script>
</div>
