export default function vibrate(){
    if (Boolean(window.navigator.vibrate)) {
        // It Supports
        console.log("Vrooom")
        window.navigator.vibrate(1000);
    }
}