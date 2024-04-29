console.log("Popup script working")
let freqCutoff;

// What values do I actually need to pass?

// 

document.addEventListener("DOMContentLoaded", function() {
    console.log("Event listener working.")
    var slider = document.getElementById("rangeSlider")
    var typer = document.getElementById("rangeTyper")
    freqCutoff = slider.value

    slider.addEventListener("input", function(event) {
        typer.value = slider.value
        freqCutoff = slider.value
        emitFreqChange()
    });

    typer.addEventListener("input", function(event) {
        slider.value = typer.value
        freqCutoff = typer.value
        emitFreqChange()
    })
});


function emitFreqChange() {
    /* const freqChange = new CustomEvent('freqChange', {
        detail: {freqCutoff : freqCutoff}
    })
    window.dispatchEvent(freqChange) */
    chrome.runtime.sendMessage({data : freqCutoff})

}

