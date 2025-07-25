function achievments() {

    navigator.geolocation.getCurrentPosition( pos => {

                alert(pos.coords.altitude);
                if (pos.coords.altitude > 500) {

                    var hügelgurke = localStorage.getItem("hügelgurke");
                    alert(hügelgurke);

                    if (hügelgurke === null) {
                        alert("nullgurke");
                        localStorage.setItem("hügelgurke", "true")
                    } else {
                        alert("truegurke");
                    }
                    

                }
                


                



                

            }


            )




}



