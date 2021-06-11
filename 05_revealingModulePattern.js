const myModule = (() => {
    const privateFoo = () => { }
    const privateBar = []

    const exported = {
        publicFoo: () => { },
        publicBar: () => { },
    }

    return exported
})() // 여기서 괄호가 파싱되면, 함수는 호출됩니다.
// 이 패턴은 자기 호출 함수를 사용합니다. 이러한 종류의 함수를 즉시 실행 함수 표현(IIFE: Immediately Invoked Function Expression)
// private 범위를 만들고 공개될 부분만 내보내게 됩니다.

console.log(myModule)
console.log(myModule.privateFoo, myModule.privateBar)