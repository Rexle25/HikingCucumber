function achievments() {

    navigator.geolocation.getCurrentPosition( pos => {

                alert(pos.coords.altitude);
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



