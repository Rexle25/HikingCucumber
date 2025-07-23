function achievments() {

    navigator.geolocation.getCurrentPosition( pos => {


                alert(pos.coords.altitude);
                alert(pos.coords.altitudeAccuracy);
                alert("sus");
                alert(pos.coords.speed);

                

            }


            )




}



