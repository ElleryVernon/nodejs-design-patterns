function debounce(fn, delay, inDebounce) {
  return () => {
    if (inDebounce) {
      clearTimeout(inDebounce)
    }
    inDebounce = setTimeout(() => fn(...args), delay)
  }
}

const run = debounce((val) => console.log(val), 100)
run("a")
run("b")
run(2)
// 100ms 이후
// 2
