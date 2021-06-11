function loadModule(filename, module, require) {
    // 모듈의 내용을 읽어들이기 위해서 readFileSync를 사용했습니다.
    // 파일시스템의 동기식 버전을 사용하는 것은 일반적으로 권장되지 않지만
    // 여기서 사용한 이유는 CommonJS에서 모듈을 로드하는 것이 의도적인 동기 방식이기 때문입니다.
    // 이러한 방식에서는 여러 모듈을 임포트할 때 올바른 순서를 지키는 것이 중요합니다.
    // 단지 예제일 뿐이며 실제로 eval()함수나 vm 모듈의 함수들은 
    // 잘못된 방식이나 잘못된 인자를 가지고 쉽게 사용될 수 있어, 코드인젝션 공격에 취약합니다.
    const wrappedSrc =
        `(function (module, exports, require) {
            ${fs.readFileSync(filename, 'utf8')}
        })(module, module.exports, require)`
    eval(wrappedSrc)
}

function require(moduleName) {
    console.log(`Require invoked fot module: ${moduleName}`)
    // 모듈의 이름을 입력으로 받아 수행하는 첫 번째 일은 우리가 id라고 부르는 모듈의 전체경로를 알아내는(resolve) 것입니다. 이 작업은 이를 해결하기 위해 관련 알고리즘을 구현하고 있는 require.resolve()에 위임 됩니다.
    const id = require.resolve(moduleName)
    // 모듈이 이미 로드된 경우 캐시된 모듈을 사용합니다. 이 경우 즉시 반환합니다.
    if (require.cache[id]) {
        return require.cache[id].exports
    }

    // 모듈 메타데이터
    // 모듈이 아직 로드되지 않은 경우 최초 로드를 위해서 환경을 설정합니다. 특히 빈 객체 리터럴을 통해 초기화된 exports 속성을 가지는 module 객체를 만듭니다. 이 객체는 불러온 모듈의 코드에서의 public API를 익스포트하는데 사용됩니다.
    const module = {
        exports: {},
        id
    }

    // 캐시 업데이트
    // 최초 로드 후에 module 객체가 캐시됩니다.
    require.cache[id] = module

    // 모듈 로드
    // 모듈 소스코드는 해당 파일에서 읽어오며, 코드는 앞에서 살펴본 방식으로 평가합니다. 방금 생성한 module 객체와 require() 함수의 참조를 모듈에 전달합니다. 모듈은 module.exports 객체를 조작하거나 대체하여 public API를 내보냅니다.
    loadModule(id, module, require)
    // 익스포트되는 변수 반환
    // 마지막으로, 모듈의 public API를 나타내는 module.exports의 내용이 호출자에게 반환됩니다.
    return module.exports
}

require.cache = {}
require.resolve = (modlueName) => {
    /** 모듈이름으로 id로 불리게 되는 모듈의 전체경로를 알아냄(resolve) */
}
