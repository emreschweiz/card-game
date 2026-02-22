# Card Game (Redux)

Redux Toolkit kullanilarak gelistirilmis bir hafiza oyunu.

## Ozellikler

- Kartlar 5x5 matris uzerine karisik sekilde dagitilir.
- Arka arkaya acilan iki kart:
- Eslesmiyorsa tekrar kapanir ve `-10` puan yazilir.
- Eslesiyorsa acik kalir ve `+50` puan yazilir.
- Anlik puan ekranda gosterilir.
- Tum kartlar acildiginda `Yeniden Oyna` butonu gorunur.
- `Yeniden Oyna` ile kartlar tekrar kapanir, karistirilir ve puan sifirlanir.

Not: 5x5 tahta tek sayi (25) oldugu icin 24 kart cift + 1 adet notr kart kullanilmistir.

## Kurulum

```bash
npm install
```

## Gelistirme Ortami

```bash
npm run dev
```

## Build

```bash
npm run build
```
