# angular-tutorial

## 1. Angular 개발 환경 설정

1. npm i -g @angular/cli

2. ng new "앱 이름"

   > ng new todo

3. ng serve --open

   > serve는 watch 옵션, 4200이 기본 포트

4. ng generate component "컴포넌트 이름"

> ng generate component "clear"

```
generate component로 생성되는 기본 프로퍼티
selector: 'app-root', // 컴포넌트의 CSS 엘레먼트 셀렉터
templateUrl: './app.component.html', // 컴포넌트 템플릿 파일 위치
styleUrls: ['./app.component.scss'] // 컴포넌트 CSS 스타일 파일의 위치
```

5. ngModel

NgModel을 제공하는 패키지

> import { FormsModule } from '@angular/forms';

ngModel을 통해 input 값을 수정할 때, 프로퍼티의 값을 전달할 수 있다.

```html
<input [(ngModel)]="hero.name" placeholder="name" />
```

## 기타

1. ngOnInit

   > === init()

ngOnInit은 [라이프싸이클 후킹 함수](https://angular.kr/guide/lifecycle-hooks#oninit) 이다.
앵귤러는 컴포넌트를 생성한 직후 ngOnInit을 호출함.  
컴포넌트 초기화 관련 로직을 해당 메소드에 작성할 것!
