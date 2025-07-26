function achievments() {

    navigator.geolocation.getCurrentPosition( pos => {

                
                if (pos.coords.altitude > 500) {

                    var hügelgurke = localStorage.getItem("hügelgurke");
                    

                    if (hügelgurke === null) {
                        
                        localStorage.setItem("hügelgurke", "true")
                    } else {
                        
                    }
                    

                }
                


                



                

            }


            )




}

function addPoints(pointsToAdd) {

    let temporärePunkte = parseInt(localStorage.getItem("punkte")) || 0;
    let neuePunkte = temporärePunkte + pointsToAdd;
    localStorage.setItem("punkte", neuePunkte);


}



