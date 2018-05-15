export default function () {
    return {
        run: true,
        effect: 'linear',
        onRun: function (){},
        onStop: function (){},
        onDone: function () {}
        // onBegin: function () {}
    }
}
function getAnimateSettings () {
    return {
        run: true
    }
}
export { getAnimateSettings }
