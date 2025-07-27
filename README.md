# 📘 Node.js Blog Sistemi - Node.js Core Modules
Bu proje, Node.js'in core modülleri kullanılarak geliştirilmiş bir blog sistemi uygulamasıdır.`http`, `fs`, `path` ve `events` modülleri ile hiçbir framework (örneğin Express) kullanılmadan saf Node.js ile bir web sunucusu oluşturulmuştur.

## 🚀 Özellikler
- Blog oluşturma (`POST /create`)

- Blogları listeleme (`GET /blogs`)

- Blog detayını görüntüleme (`GET /blog/:id`)

- Olay tabanlı log sistemi (`events`)

- Dosya temelli veri saklama (`fs`)

- Path işlemleri ile platform bağımsız dosya yönetimi (`path`)

- Hata yönetimi ve özel `404` sayfası

## 🧱 Kullanılan Core Modüller
- `http` – Web sunucusu oluşturmak için
- `fs` – Blog içeriklerini dosyalara kaydetmek için
- `path` – Dosya/dizin yollarını yönetmek için
- `events` – Blog işlemleri için olay sistemi

## 📁 Proje Yapısı

```
blog-sistemi/
├── blogs/                          # Blog verilerinin tutulduğu JSON dosyaları
│   ├── blog-1.json
│   └── blog-2.json
│
├── controllers/                   # Uygulama mantığı (controller katmanı)
│   └── blogController.js          # HTTP isteklerini karşılayan iş mantığı
│
├── logs/                          # Olay loglarının tutulduğu dizin
│   └── activity.log               # Event logları (okuma, oluşturma gibi)
│
├── models/                        # Veri erişim ve kaynak yönetimi
│   └── BlogManager.js             # EventEmitter kullanan blog veri yöneticisi
│     ├── createBlog()             # Yeni blog oluşturur, dosyaya yazar
│     ├── readBlog()               # Blogu okur ve okuma sayısını artırır
│     ├── getAllBlogs()            # Tüm blogları listeler
│     └── logActivity()            # Olayları log dosyasına yazar
│
├── public/                        # Statik içerikler
│   └── 404.html                   # Özel 404 hata sayfası
│
├── routes/                        # Route kontrol yapısı
│   └── blogRoutes.js              # HTTP isteklerini uygun controller fonksiyonlarına yönlendirir
│
├── .env                           # Ortam değişkenleri
├── server.js                      # Ana HTTP sunucusunu başlatan dosya
└── README.md                      # Proje dokümantasyonu
```

## ⚙️ Kurulum
```
- git clone https://github.com/MuhammetOkkes/Node.js-Blog-Sistemi
- cd blog-sistemi
- npm install  # Bağımlılık yoksa bu adım opsiyoneldir
- node index.js
```

## 📡 API Endpoint’leri
```
| Yöntem | Route       | Açıklama                          |
| ------ | ----------- | --------------------------------- |
| GET    | `/`         | Ana sayfa                         |
| GET    | `/blogs`    | Tüm blogları listeler             |
| GET    | `/blog/:id` | Belirli ID'ye sahip blogu getirir |
| POST   | `/create`   | Yeni bir blog oluşturur           |

```

## ✅ Örnek curl Kullanımı
- **Blog Listeleme:**
```curl http://localhost:3000/blogs```
<br>

- **Belirli Blogu Görüntüleme:**
```curl http://localhost:3000/blog/1```
<br>

- **Yeni Blog Oluşturma:**
```
curl -X POST http://localhost:3000/create \
 -H "Content-Type: application/json" \
 -d '{"title":"Yeni Blog","content":"Bu bir test blogudur."}' 
 ```

## 📝 Blog Dosya Yapısı
- Her blog blogs/ klasöründe .json formatında saklanır:
```
{
  "id": "1",
  "title": "Blog Başlığı",
  "content": "Blog içeriği...",
  "date": "2025-07-27",
  "readCount": 0
}

```

## 🔥 Event Sistemi
BlogManager sınıfı EventEmitter'dan türetilmiştir ve aşağıdaki olayları destekler:
- `blogCreated` – Yeni blog oluşturulduğunda tetiklenir.
- `blogRead` – Blog okunduğunda tetiklenir. Bu olay iki farklı durumda çalışır:
   - Belirli bir `id`'ye göre bir blog okunduğunda
   - Tüm bloglar listelendiğinde

Her olay, `logs/activity.log` dosyasına zaman damgası ile birlikte kaydedilir.


## 🌟 Bonus Özellikler
- ✅ Okunma Sayısı Takibi: Bloglar her görüntülendiğinde `readCount` artırılır.
- ✅ Durum Kodlarının Sabitlerle Kullanımı:  
HTTP yanıtlarında `200`, `201`, `404` gibi ham sayıların yerine `http.STATUS_CODES` (sabit isimler: `OK`, `CREATED`, `NOT_FOUND` gibi) kullanılmıştır. Bu sayede: 

- Kodun **anlamı daha açık** hale gelir.  
- **Ekip çalışmasında** hata olasılığı azalır.  
- Bir geliştirici **`201`**'in ne anlama geldiğini bilmese bile **`CREATED`** ifadesiyle ne anlatılmak istendiğini kolayca anlayabilir.


## ❗ Hata Yönetimi
- Geçersiz route’lar için özel `404` sayfası oluşturulmuştur.
- Dosya okuma/yazma hataları `try-catch` ve `fs` hataları ile düzgün yönetilir.
- Eksik veya hatalı ID'ler için kullanıcıya bilgilendirici mesajlar gösterilir.

## 👨‍💻 Developer
###### **İsim: Muhammet Müslüm Ökkeş Kazıcı** 

###### **Email:** kaziciokkes34@gmail.com

###### **GitHub:** github.com/MuhammetOkkes

