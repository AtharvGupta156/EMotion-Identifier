p1 = "";
p2 = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 95
});

camera = document.getElementById("camera");
Webcam.attach('#camera') // In this we are refering to the variable and it ia the syntax to put the variable in ""quotes
    
function take_snapshot() {
Webcam.snap(function(data_uri) {
document.getElementById("result").innerHTML = '<img id = "captured_img" src="'+data_uri+'"/>';

});
}
console.log(("ml5 version : ",ml5.version ));

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/pt3mqcyKM/model.json', modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak1 = "The first prediction is"+p1;
    speak2 = "The second prediction is"+p2;
    var utterthis = new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterthis);
}
 
function check() {
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
if (error){
    console.error(error);
}
else {
console.log(result);
document.getElementById("result_emotion_name").innerHTML = result[0].label;
document.getElementById("result_emotion_name2").innerHTML = result[1].label;
p1 = result[0].label;
p2 =  result[1].label;
speak();

if (result[0].label == "Happy") {
    document.getElementById("update_emoji").innerHTML = "&#128522;";
}
if (result[0].label == "Sad") {
    document.getElementById("update_emoji").innerHTML = "&#128532;";
}
if (result[0].label == "Fear") {
    document.getElementById("update_emoji").innerHTML = "&#128561;";
}
if (result[0].label == "Angry") {
    document.getElementById("update_emoji").innerHTML = "&#128545;";
}

if (result[1].label == "Happy") {
    document.getElementById("update_emoji2").innerHTML = "&#128522;";
}
if (result[1].label == "Sad") {
    document.getElementById("update_emoji2").innerHTML = "&#128532;";
}
if (result[1].label == "Fear") {
    document.getElementById("update_emoji2").innerHTML = "&#128561;";
}
if (result[1].label == "Angry") {
    document.getElementById("update_emoji2").innerHTML = "&#128545;";
}
}
}