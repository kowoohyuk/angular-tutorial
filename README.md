# angular-tutorial

참고 사이트

[앵귤러.kr](https://angular.kr/)

[카카오커머스를 지탱하는 Angular](https://tech.kakao.com/2019/11/27/kakao-commerce-frontend-angular/)

[w3school angularJS tutorial](https://www.w3schools.com/angular/default.asp)


___ 

## 1. [Angular 앱 개발 시작하기](https://angular.kr/start)

앵귤러 한국 사이트의 start 페이지에서 간단한 샘플 프로젝트를 만들어 볼 수 있다.  

angular는 *ngFor, *ngIf 등 의 구조 디렉티브를 사용해 엘리먼트를 추가, 제거, 조작할 수 있다.  
구조 디렉티브는 *로 시작한다.

```html
쌍 따옴표 내부에 자연스럽게 for of 문을 사용할 수 있다.  
문자열을 추가해야한다면 홑 따옴표를 사용!
<div *ngFor="let product of products">
  <h3>
    []는 프로퍼티를 넣는 문법.  
    위의 구조 디렉티브와 마찬가지로 쌍 따옴표 내부에 자바스크립트의 코드를 작성할 수 있다.
    <a [title]="product.name + ' details'">
      문자열 삽입 시에는 중괄호 두개로 감싸주어야한다.
      {{ product.name }}
    </a>
  </h3>

  이벤트는 ()로 바인딩한다.
  <app-product-alerts [product]="product" (notify)="onNotify()">
  </app-product-alerts>
</div>

product-alerts.html
<p *ngIf="product.price > 700">
  클릭했을 때, notify.emit이 실행된다.
  <button (click)="notify.emit()">Notify Me</button>
</p>

<script>
// app-product-alerts.ts
export class ProductAlertsComponent implements OnInit {
  // 앞에 @가 붙은건 데코레이터라고 부른다.
  @Input() product;
  // 이제 버튼을 클릭하게 되면 바인드된 onNotify()가 실행된다.
  @Output() notify = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
</script>

```

[결과 코드](https://stackblitz.com/edit/angular-y9kqxe?file=src/app/product-list/product-list.component.html)

**참고**  
> 템플릿 문법 : https://angular.kr/guide/architecture-components#template-syntax

> 컴포넌트 통신 : https://angular.kr/guide/component-interaction