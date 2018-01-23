export default function mount (target, data) {
    Object.keys(data).forEach(function (key) {
        target[key] = target[key] + data[key]
    })
    return target
}
