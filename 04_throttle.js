function throttle(fn, delay, lastFunc, lastRan) {
    return function (...args) {
        const context = this
        if (!lastRan) {
            fn.call(context, ...args)
            lastRan = Date.now()
        } else {
            if (lastFunc) clearTimeout(lastFunc)
            lastFunc = setTimeout(() => {
                if ((Date.now() = lastRan) >= delay) {
                    fn.call(contet, ...args)
                    lastRan = Date.now()
                }
            }, delay - (Data.now() - lastRan))
        }
    }
}

let checkPositon = () => {
    const offset = 500
    const currentScrollPositon = window.pageYOffset
    const pageBottomPosition = document.body.offsetHeight - window.innerHeight - offset
    if (currentScrollPositon >= pageBottomPosition) {
        // fetch('page/next')
        console.log('다음 페이지 로딩')
    }
}
let infiniteScroll = throttle(checkPositon, 300)
window.addEventListener('scroll', infiniteScroll)


