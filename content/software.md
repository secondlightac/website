---
title: "Was für Software entwickelt IT4Kids?"
date: 2018-06-22T19:08:40+02:00
draft: false
---

<div class="row">
    <div class="col-12">
        <p>
            Weil bestehende Alternativen nicht auf das Lernen im Klassenverband ausgelegt sind, haben wir uns entschlossen, eine eigene Lernsoftware zu entwickeln und anzubieten!
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
            Wir planen, die Lerninhalte der Kursstunden so eng wie möglich mit der Software zu verzahnen. Dies ermöglicht das direkte Einbetten der Aufgabenstellung in der Programmieroberfläche und eine Integration von Hilfestellungen, die zum jeweiligen Thema passgenau abgerufen werden können. Zusätzlich orientiert sich die Software auf einer fähigkeitsbasierte Progression (mehr dazu auf der Seite <a href="{{< relref "lehrmaterial.md" >}}" class="link">Lehrmaterial</a>), wodurch die Inhalte automatisch in einer spezifischen Sequenz aufeinanderfolgen.
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
            Um die Lerninhalte gezielt und für alle Schulen gleichzeitig anpassen zu können, planen wir eine zentrale Speicherung der Daten. Diese ermöglicht jederzeit eine einfache und schnelle Anpassung des Curriculms. Des Weiteren kann für jedes Kind ein individueller Speicherstand angelegt werden. Die Cloudspeicherung ermöglicht zudem eine von der Schulinfrastruktur unabhängige Nutzung unserer Lernsoftware, die standortunabhängig aufgerufen werden kann.
        </p>
    </div>
</div>
<div class="row pb-5 pt-5">
    <div class="col-md-6 col-12 mb-4 text-center">
        <h3 class="center">Learning Analytics</h3>
        <img src="{{< relURL "/img/icon-analyse.svg" >}}" alt="" class="img img-fluid center mt-4" style="max-height:200px;">
    </div>
    <div class="col-md-6 col-12">
        <p>
            Die dritte zentrale Komponente unserer Software bildet die Learning Analytics. Hierdurch wird der Lehrperson ermöglicht, den individuellen Lernerfolgsstand jeden Kursteilnehmers zu verfolgen und gegebenenfalls bei der Bearbeitung der vorliegenenden Lektion Hilfestellung zu geben. Des Weiteren erlaubt uns die anonymisierte Datenanalyse, unser Lehrmaterial zielgenau zu verbessern und langfristig eine Empfehlung der Leistungsbewertung abzugeben.
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
