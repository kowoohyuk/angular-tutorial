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

___ 

## 2. [Angular 네비게이션](https://angular.kr/start/start-routing)

```html
<script>
// app.module.ts
// @NgModule 내부에 라우팅 규칙을 추가한다.
RouterModule.forRoot([
  { path: "", component: ProductListComponent },
  // /products 경로 면서 다음 값은 id가 됨. 익스프레스 경로 라우팅과 같은 문법
  { path: "products/:productId", component: ProductDetailsComponent }
])
</script>

product-list.html

ngFor에서 index의 명칭을 productId로 변경
<div *ngFor="let product of products; index as productId">
routerLink 디렉티브는 배열형태로 값을 추가할 수 있다.
프토퍼티를 넣는 문법인 대괄호를 사용
<a [title]="product.name + ' details'" [routerLink]="['/products', productId]"></a>
</div>

<script>
//product-details.ts

// ActivatedRoute는 앵귤러 라우터가 동작할 때 사용되는 특정 라우팅 규칙을 의미한다.
// private는 타입스크립트 키워드. 자바의 private와 같겠지?
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  // 파라미터에서 productId라고 되어 있는 값을 가져오고 숫자로 형변환한다.
  // express에서 가져오는 것보다 간단하면서도 불편해보인다, 익숙해져야할듯.
  this.route.paramMap.subscribe(params => {
    this.product = products[+params.get('productId')];
  });
}

</script>


product-details.html

<h2>Product Details</h2>

<div *ngIf="product">
  <h3>{{ product.name }}</h3>
  currency라는 파이프를 통해 699라는 숫자를 $699.00 로 달러 단위로 표기한다.
  기본 값이 dollar.
  currency:'EUR'로 하면 유로도 가능! 멋지다..
  <h4>{{ product.price | currency }}</h4>
  <h4>{{ product.price | currency:'EUR' }}</h4>
  <h4>{{ product.price | currency:'USD':'dollar ' }}</h4>
  <p>{{ product.description }}</p>
</div>
```

[결과 코드](https://stackblitz.com/edit/angular-y9kqxe-toaec2?file=src%2Fapp%2Fapp.module.ts)

**참고**
> 데이터 다루기 : https://angular.kr/start/start-data

> 파이프 : https://angular.kr/guide/pipes

___ 

## 3. [Angular 데이터 다루기 - 1](https://angular.kr/start/start-data)

서비스는 애플리케이션의 구성 요소를 통합하는 역할을 한다.  
컴포넌트는 뷰와 직접적인 연관이 있으므로 부가적인 영역(로깅, 통신) 등을 서비스에 위임하면 복잡성이 낮아진다.  
또한, 서비스는 이러한 영역을 공통으로 관리할 수 있어 재사용성이 높아지게 된다.

```html
<script>
// cart.service.ts
@Injectable({
  // 의존성 주입, 루트에 등록하면 이 인스턴스는 전역에 단 하나만 생성된다.
  // 그리고 동일한 의존성을 주입하는 컴포넌트는 모두 같은 인스턴스를 공유한다.
  providedIn: 'root' 
})
export class CartService {
  // 장바구니 상품 배열
  items = [];

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}

</script>

<script>
// cart.ts
export class CartComponent implements OnInit {
  items;

  // 전역 인스턴스 cartService를 의존성 주입.
  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
  }
}

</script>

cart.html
<h3>Cart</h3>

<div class="cart-item" *ngFor="let item of items">
  <span>{{ item.name }}</span>
  <span>{{ item.price | currency }}</span>
</div>
```

HttpClient를 활용하면 외부 서버에서 제공하는 데이터를 스트림 형태로 가져올 수 있다.  
Angular HTTP 클라이언트를 사용하려면 앱에 HttpClientModule를 로드해야 한다.

먼저 모듈 파일에 HttpClientModule을 로드한 이후, service에 의존성을 주입한다.  
이후 get 메서드를 정의한다.

```javascript

// app.module.ts
// @angular/common/http에 있음!
import { HttpClientModule } from '@angular/common/http';

// cart.ts
import { HttpClient } from "@angular/common/http";

constructor(private http: HttpClient) {}

getShippingPrices() {
  // get, post, update, delete, request 등.. http와 관련된 많은 기능이 지원
  return this.http.get("/assets/shipping.json");
}
```

이제 shipping 관련 컴포넌트를 정의한다.

```html

// shipping.ts
export class ShippingComponent implements OnInit {
  shippingCosts;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.shippingCosts = this.cartService.getShippingPrices();
  }
}

<h3>Shipping Prices</h3>

async 파이프는 옵저버 패턴을 사용했으며, 변경된 사항을 표시하는 역할을 한다.  
대상이 되는 요소가 삭제되면 자동으로 unsubscribe처리된다. 
<div class="shipping-item" *ngFor="let shipping of shippingCosts | async">
  <span>{{ shipping.type }}</span>
  <span>{{ shipping.price | currency }}</span>
</div>
```

[결과 코드](https://stackblitz.com/edit/angular-y9kqxe-9weh5s?file=src%2Fapp%2Fapp.module.ts)

**참고**
> 서비스, 의존성 주입 : https://angular.kr/guide/architecture-services
> HttpClient : https://angular.kr/api/common/http/HttpClient
> async 파이프 : https://angular.kr/api/common/AsyncPipe
___ 




