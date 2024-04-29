console.log("Popup script working")

document.addEventListener("DOMContentLoaded", function() {
    console.log("Event listener working.")
    var slider = document.getElementById("rangeSlider")
    var typer = document.getElementById("rangeTyper")

    slider.addEventListener("input", function(event) {
        console.log("Input happened")
        typer.value = slider.value
    });

    typer.addEventListener("input", function(event) {
        console.log("Typer input happened")
        slider.value = typer.value
    })
});
