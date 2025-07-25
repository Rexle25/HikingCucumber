function showAchievments() {


    function createAchievment(titeltext, descriptiontext, bool) {

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

        finished.innerHTML = bool;
        document.body.appendChild(finished);

        
        
    }

    createAchievment("gurkensus", "eine suse gurke", localStorage.getItem("gurkensus"));
}