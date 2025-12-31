# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Авторизація" [level=1] [ref=e5]
  - navigation [ref=e6]:
    - generic [ref=e7]:
      - img "GameStore" [ref=e8]
      - generic [ref=e9]: GameStore
    - generic [ref=e10]:
      - link "Головна" [ref=e11] [cursor=pointer]:
        - /url: /
      - link "Каталог" [ref=e12] [cursor=pointer]:
        - /url: /catalog
      - link "Про нас" [ref=e13] [cursor=pointer]:
        - /url: /about
      - link "Контакти" [ref=e14] [cursor=pointer]:
        - /url: /contact
      - link "Вхід" [ref=e15] [cursor=pointer]:
        - /url: /login
  - main [ref=e16]:
    - generic [ref=e18]:
      - generic [ref=e19]:
        - button "Вхід" [ref=e20] [cursor=pointer]
        - button "Реєстрація" [ref=e21] [cursor=pointer]
      - heading "Вхід" [level=2] [ref=e22]
      - generic [ref=e23]:
        - generic [ref=e24]:
          - text: Email
          - textbox "Email" [ref=e25]: user_1767164670224@test.com
        - generic [ref=e26]:
          - text: Пароль
          - textbox "Пароль" [ref=e27]: "12345678"
        - button "Увійти" [ref=e28] [cursor=pointer]
        - generic [ref=e29]: Невірний email або пароль
        - paragraph
```