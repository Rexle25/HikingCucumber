function showAchievments() {


    function createAchievment(titeltext, descriptiontext, bool) {

        const oben = document.createElement("p");
        oben.innerHTML = "______________________________";
        document.body.appendChild(oben);

        const title = document.createElement("h2");
        title.innerHTML = titeltext;
        document.body.appendChild(title);

        const description = document.createElement("p");
        description.innerHTML = descriptiontext;
        document.body.appendChild(description);


        const bestanden = document.createElement("h3");
        bestanden.innerHTML = "Bereits gemacht:";
        document.body.appendChild(bestanden);


        const finished = document.createElement("p");

        if (bool === null) {
            finished.innerHTML = "Nein";
        } else {
            finished.innerHTML = "Ja";

        }

        
        document.body.appendChild(finished);

        const unten = document.createElement("p");
        unten.innerHTML = "______________________________";
        document.body.appendChild(unten);

        
        
    }

    createAchievment("Hügelgurke", "Sei mindestens 500 Meter über dem Meer", localStorage.getItem("hügelgurke"));
    createAchievment("Berggurke", "Sei mindestens 1000 Meter über dem Meer", localStorage.getItem("berggurke"));
}