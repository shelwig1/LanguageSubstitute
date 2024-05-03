let frequency;
let onOff;
let toggleValue;
let slider;
let typer;
let toggle;
let form

document.addEventListener("DOMContentLoaded", function() {
    console.log("Event listener working.")
    slider = document.getElementById("rangeSlider")
    typer = document.getElementById("rangeTyper")
    toggle = document.getElementById("toggle")
    form = document.getElementById("optionsForm") 

   chrome.storage.local.get().then(( result) =>{
        console.log("Storage results: ", result)
        toggle.checked = result.onOff
        frequency = result.freqValue
        slider.value = frequency
        typer.value = frequency
   }
)

// Potential later refactor, in the meantime get it working.
    /* form.addEventListener("input" ,function (event) {
        console.log("Form event: ", event.target.id)
    }) */

    slider.addEventListener("input", function(event) {
        typer.value = slider.value
        frequency = slider.value
        chrome.storage.local.set({ freqValue : frequency})
    });

    typer.addEventListener("input", function(event) {
        slider.value = typer.value
        frequency = typer.value
        chrome.storage.local.set({ freqValue : frequency})

    })

    toggle.addEventListener("input", function(event) {
        toggleValue = toggle.checked
        chrome.storage.local.set({ onOff : toggle.checked}).then((result) => {
            console.log("Toggle saved")
        })
    })
});



/* window.onload = function () {
    console.log("Popup loaded")
    slider = document.getElementById("rangeSlider")
    typer = document.getElementById("rangeTyper")
    toggle = document.getElementById("toggle")
    form = document.getElementById("optionsForm")

} */