# 템플릿 & 프로젝트 구성

## 뷰 템플릿

- HTML, CSS 등의 마크업 속성과 뷰 인스턴스에서 정의한 데이터 및 로직들을 연결하여 사용자가 브라우저에서 볼 수 있는 형태의 HTML 로 반환해 주는 속성입니다 

  

### computed 속성과 methods 속성 차이

methods 속성은 호출할 때만 해당 로직이 수행되고 computed 속성은 대상 데이터의 값이 변경되면 자동적으로 수행된다 



### watch 속성

데이터 변화를 감지하여 자동으로 특정 로직을 수행한다. computed 속성과 비슷해 보이지만 내장 API 를 활용한 연산 정도로 적합하지만 watch 속성은 데이터 호출과 같이 시간이 상대적으로 더 많이 소모되는 비동기 처리에 적합하다.