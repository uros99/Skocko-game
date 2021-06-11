$(document).ready(function(){
    arrPlayerOne = [];
    arrPlayerTwo = [];
    function insertImage(){
        if(arrPlayerOne.length < 4){
            let lastIcon = arrPlayerOne[arrPlayerOne.length-1];
            let key = "#playerOne ."+arrPlayerOne.length;
            let src = "skocko-dodatno/"+lastIcon+".png";
            $(key).html("<img class='image' id='"+lastIcon+"' src='"+src+"' alt=''>");
            return;
        }else if(arrPlayerTwo.length < 4){
            let lastIcon = arrPlayerTwo[arrPlayerTwo.length-1];
            let key = "#playerTwo ."+arrPlayerTwo.length;
            let src = "skocko-dodatno/"+lastIcon+".png";
            $(key).html("<img class='image' id='"+lastIcon+"' src='"+src+"' alt=''>");
        }
    }

    function saveArrays(){
        localStorage.setItem("playerOneArr",JSON.stringify(arrPlayerOne));
        localStorage.setItem("playerTwoArr",JSON.stringify(arrPlayerTwo));
    }

    $(".image").click(function(){
        let icon = $(this).attr("id");
        if(arrPlayerOne.length < 4){
            arrPlayerOne.push(icon);
            insertImage();
            if(arrPlayerOne.length==4){
                $(".playerOneInput").hide();
                $(".playerTwoInput").show();
            }
        }else if(arrPlayerTwo.length < 4){
            arrPlayerTwo.push(icon);
            insertImage();
            if(arrPlayerTwo.length==4){
                saveArrays();
                window.location.href="skocko-igra.html";
            }
        }
    });
})