function loadModule(filename, module, require) {
    // 모듈의 내용을 읽어들이기 위해서 readFileSync를 사용했습니다.
    // 파일시스템의 동기식 버전을 사용하는 것은 일반적으로 권장되지 않지만
    // 여기서 사용한 이유는 CommonJS에서 모듈을 로드하는 것이 의도적인 동기 방식이기 때문입니다.
    // 이러한 방식에서는 여러 모듈을 임포트할 때 올바른 순서를 지키는 것이 중요합니다.
    // 단지 예제일 뿐이며 실제로 eval()함수나 vm 모듈의 함수들은 잘못된 방식이나 잘못된 인자를 가지고 쉽게 사용될 수 있어,
    // 코드인젝션 공격에 취약합니다.
    const wrappedSrc =
        `(function (module, exports, require) {
            ${fs.readFileSync(filename, 'utf8')}
        })(module, module.exports, require)`
    eval(wrappedSrc)
}