function showAchievments() {


    function createAchievment(titeltext, descriptiontext, bool) {

        const title = document.createElement("h2");
        title.innerHTML = titeltext;
        document.body.appendChild(title);

        const description = document.createElement("p");
        description.innerHTML = descriptiontext;
        document.body.appendChild(description);

        const finished = document.createElement("p");

        if (bool = null) {
            finished.innerHTML = "false";
        } else {
            finished.innerHTML = "true";

        }

        finished.innerHTML = bool;
        document.body.appendChild(finished);

        
        
    }

    createAchievment("gurkensus", "eine suse gurke", localStorage.getItem("gurkensus"));
}