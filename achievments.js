function achievments() {

    navigator.geolocation.getCurrentPosition( pos => {


                alert(pos.coords.altitude);

                localStorage.setItem("sus", "sus");
                alert(localStorage.getItem("sus"));


                



                

            }


            )




}



