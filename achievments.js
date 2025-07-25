function achievments() {

    navigator.geolocation.getCurrentPosition( pos => {


                if (pos.coords.altitude > 500) {

                    var hügelgurke = localStorage.getItem("hügelgurke");
                    alert(hügelgurke);
                    

                }
                


                



                

            }


            )




}



