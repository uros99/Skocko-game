$(document).ready(function(){
    arrPlayerOne = [];
    arrPlayerTwo = [];
    var counterPlayerOne;
    var counterPlayerTwo;
    var cnt;
    var talonPlayerOne; 
    var talonPlayerTwo;
    var resultsPlayerOne;
    var resultsPlayerTwo;
    var talon;
    var results;
    var currArrInput;
    var playerOneTurn = true;
    var winner;
    var start = false;

    onLoad();
    function onLoad(){
        let arr1 = localStorage.getItem("playerOneArr");
        let arr2 = localStorage.getItem("playerTwoArr");
        if(arr1!=null && arr2!=null){
            arrPlayerOne = JSON.parse(localStorage.getItem("playerOneArr"));
            arrPlayerTwo = JSON.parse(localStorage.getItem("playerTwoArr"));
        }
        winner=0;
        counterPlayerOne = 60;
        counterPlayerTwo = 60;
        cnt = 60;
        talon = new Array();
        results = new Array();
        talonPlayerOne = new Array();
        talonPlayerTwo = new Array();
        resultsPlayerOne = new Array();
        resultsPlayerTwo = new Array();
        currArrInput = arrPlayerTwo;
    }

    function clearTalon(){
        for(let i = 0; i < 7;i++){
            for(let j = 0; j < 4;j++){
                let key = "#talonGame .Row"+(i+1)+" .Col"+(j+1);
                $(key).html("");
            }
        }
        for(let i = 0; i < 7;i++){
            for(let j = 0; j < 4;j++){
                let key = "#resultGame .Row"+(i+1)+" .Col"+(j+1);
                $(key).css({
                    "background-color" : "rgb(100, 173, 197)"
                });
            }
        }
    }

    function reloadTalon(){
        if(talon.length == 0) return;
        for(let i = 0; i < talon.length;i++){
            for(let j = 0; j < 4;j++){
                let key = "#talonGame .Row"+(i+1)+" .Col"+(j+1);
                let icon = talon[i][j];
                let src = "skocko-dodatno/"+icon+".png";
                $(key).html("<img id='"+icon+"' src='"+src+"' alt=''>");
            }
        }

        if(results.length == 0) return;
        for(let i = 0; i < results.length;i++){
            for(let j = 0; j < 4;j++){
                let key = "#resultGame .Row"+(i+1)+" .Col"+(j+1);
                let color = results[i][j];
                $(key).css({
                    "background-color" : color
                });
            }
        }
    }

    function swapTalon(){
        if(playerOneTurn){
            talonPlayerTwo = talon; // save talon
            talon = talonPlayerOne;
            resultsPlayerTwo = results; // save result
            results = resultsPlayerOne;
            counterPlayerTwo = cnt; // save counter
            cnt = counterPlayerOne;
            $("#turn").html("Player One Turn");
            currArrInput = arrPlayerTwo; // save player input
        }else if(!playerOneTurn){
            talonPlayerOne = talon; // save talon
            talon = talonPlayerTwo;
            resultsPlayerOne = results; // save result
            results = resultsPlayerTwo;
            counterPlayerOne = cnt; // save counter
            cnt = counterPlayerTwo;
            $("#turn").html("Player Two Turn");
            currArrInput = arrPlayerOne; // save player input
        }
    }

    function insertImage(){
        let row = talon[talon.length-1];
        let lastIcon = row[row.length - 1];
        let key = "#talonGame .Row"+talon.length + " .Col" + row.length;
        let src = "skocko-dodatno/"+lastIcon+".png";
        $(key).html("<img id='"+lastIcon+"' src='"+src+"' alt=''>");
    }

    function insertResults(currResult){
        results.push(currResult);
        for(let i = 0; i < currResult.length;i++){
            let color = currResult[i];
            let key = "#resultGame .Row"+results.length+" .Col"+(i+1);
            $(key).css({
                "background-color" : color
            });
        }
    }

    function checkInput(){
        let lastRow = talon[talon.length - 1].slice();
        let rightCombination = currArrInput.slice();
        let numOfRed = 0;
        let currResult = [];
        for(let i = 0; i < lastRow.length;i++){
            if(rightCombination[i]==lastRow[i]){
                currResult.push("red");
                lastRow.splice(i,1);
                rightCombination.splice(i,1);
                numOfRed++;
                i--;
            }
        }
        for(let i = 0; i < lastRow.length;i++){
            for(let j = 0; j < rightCombination.length;j++){
                if(rightCombination[j]==lastRow[i]){
                    currResult.push("yellow");
                    lastRow.splice(i,1);
                    rightCombination.splice(j,1);
                    i--;
                    j--;
                    break;
                }
            }
        }
        insertResults(currResult);
        if(numOfRed==4){
            if(!playerOneTurn)
                winner=1;
            else 
                winner=2;
            printWinnersArray();
        }
    }

    function printWinnersArray(){
        if(winner==1){
            for(let i = 0; i < arrPlayerOne.length;i++){
                let src = "skocko-dodatno/"+arrPlayerOne[i]+".png";
                let key = "#finalResult .Row1"+" .Col"+(i+1);
                $(key).html("<img id='"+arrPlayerOne[i]+"' src='"+src+"' alt=''>");
            }
            $("#turn").html("PLAYER ONE IS WINNER");
            $("#turn").css({
                "font-color" : "red"
            });
        }else if(winner==2){
            for(let i = 0; i < arrPlayerTwo.length;i++){
                let src = "skocko-dodatno/"+arrPlayerTwo[i]+".png";
                let key = "#finalResult .Row1"+" .Col"+(i+1);
                $(key).html("<img id='"+arrPlayerTwo[i]+"' src='"+src+"' alt=''>")
            }
            $("#turn").html("PLAYER TWO IS WINNER");
            $("#turn").css({
                "font-color" : "red"
            });
        }
        start=false;
    }

    $("#start").click(function(){
        if(start==true) return;
        else
            start=true;
        let interval = setInterval(function() {
            cnt--;
            $(".time").html("<p class='countDown'>"+cnt+"</p>");
            if(start==false) {
                clearInterval(interval);
                return;
            }
            if (cnt <= 0) {
                if(playerOneTurn){
                    winner=2;
                }
                else{ 
                    winner=1;
                }
                printWinnersArray();
                clearInterval(interval);
                return;
            }
        }, 1000);
    });

    $("#newGame").click(function(){
        window.location.href="skocko-podesavanja.html";
    })

    $(".image").click(function(){
        if(start==false) return;
        let icon = $(this).attr("id");
        if(talon.length > 0 && talon[talon.length - 1].length < 4 ){
            talon[talon.length - 1].push(icon);
            insertImage();
            if(talon[talon.length-1].length == 4){
                playerOneTurn = !playerOneTurn;
                checkInput();
                if(winner!=0)
                    return;
                swapTalon();
                clearTalon();
                reloadTalon();
            }         
        }else {
            let newRow = new Array();
            talon.push(newRow);
            talon[talon.length - 1].push(icon);
            insertImage();
        }
    })
})