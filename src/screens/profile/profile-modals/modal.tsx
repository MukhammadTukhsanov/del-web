import { Image } from 'antd';
import { useState } from 'react';
import './profile-modal.css';

interface LanguageModalProps {
  show: boolean;
  hide: () => void;
  type: 'edit' | 'help' | 'language' | 'privacy' | 'agreement';
}

const LanguageModal = ({ show, hide, type }: LanguageModalProps) => {
  const languages = [{ code: 'uz', name: "O'zbekcha", flag: '🇺🇿' }];
  const [selectedLanguage, setSelectedLanguage] = useState('uz');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    hide();
    console.log('Language selected:', languageCode);
  };
  return (
    show && (
      <div className='modal-overlay' onClick={hide}>
        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
          <div className='modal-header'>
            <h3 className='modal-title'>
              {type === 'privacy' && 'FOYDALANUVCHI SHARTNOMASI'}
              {type === 'privacy' && '# MAXFIYLIK SIYOSATI'}
              {type === 'help' && 'Yordam'}
              {type === 'language' && 'Tilni tanlang'}
            </h3>
            <button className='close-button' onClick={hide}>
              <i className='bi bi-x'></i>
            </button>
          </div>
          <div className='modal-body'>
            {type === 'agreement' && (
              <div className='px-16 privacy'>
                <h4 className='mt-0'>## 1. UMUMIY QOIDALAR</h4>
                <p className='mt-0'>
                  Ushbu Maxfiylik siyosati Wing Corporation MCHJ tomonidan boshqariladigan yetkazib
                  berish ilovasida shaxsiy ma'lumotlaringizning to'planishi, ishlatilishi va
                  himoyalanishini tartibga soladi. Ilovamizdan foydalanish orqali siz ushbu
                  siyosatning shartlariga rozilik bildirasiz.
                </p>
                <h4 className='mt-0'>## 2. TO'PLANADIGAN MA'LUMOTLAR</h4>
                <h5 className='mt-0'>### 2.1 Shaxsiy ma'lumotlar:</h5>
                <ul>
                  <li>To'liq ism va familiya</li>
                  <li>Telefon raqami</li>
                  <li>Yetkazib berish manzillari</li>
                </ul>
                <h5 className='mt-0'>### 2.2 Texnik ma'lumotlar:</h5>
                <ul>
                  <li> Qurilma identifikatori (IMEI, MAC manzil)</li>
                  <li> IP manzil </li>
                  <li> Joylashuv ma'lumotlari (GPS koordinatalari)</li>
                  <li> Ilova foydalanish statistikasi</li>
                  <li> Brauzer va operatsion tizim ma'lumotlari</li>
                </ul>
                <h5 className='mt-0'>### 2.3 To'lov ma'lumotlari:</h5>
                <ul>
                  <li> Karta raqamining oxirgi 4 raqami</li>
                  <li> To'lov usuli</li>
                  <li> Tranzaksiya tarixi</li>
                </ul>
                <h4 className='mt-0'>## 3. MA'LUMOTLARDAN FOYDALANISH MAQSADLARI</h4>
                <p className='mt-0'>Sizning ma'lumotlaringiz quyidagi maqsadlarda ishlatiladi:</p>
                <ul>
                  <li> Buyurtmalarni qayta ishlash va yetkazib berish</li>
                  <li> Mijozlar bilan aloqa o'rnatish</li>
                  <li> Xizmat sifatini yaxshilash</li>
                  <li> Texnik yordam ko'rsatish</li>
                  <li> Marketing va reklama (rozilik asosida)</li>
                  <li> Qonun talablarini bajarish</li>
                </ul>
                <h4 className='mt-0'>## 4. MA'LUMOTLARNI BAHAM KO'RISH</h4>
                <p className='mt-0'>
                  Sizning shaxsiy ma'lumotlaringiz quyidagi hollarda uchinchi shaxslarga uzatilishi
                  mumkin:
                </p>
                <h5 className='mt-0'>### 4.1 Xizmat ko'rsatuvchi hamkorlar:</h5>
                <ul>
                  <li> Yetkazib berish kuryerlari</li>
                  <li> To'lov tizimi provayderlari</li>
                  <li> Restoran va do'konlar</li>
                </ul>
                <h5 className='mt-0'>### 4.2 Qonuniy talablar:</h5>
                <ul>
                  <li> Davlat organlari so'rovi asosida</li>
                  <li> Sud qarorlari bo'yicha</li>
                  <li> Jinoyat tergovi doirasida</li>
                </ul>
                <h4 className='mt-0'>## 5. MA'LUMOTLARNI SAQLASH MUDDATI</h4>
                <ul>
                  <li> Aktiv hisoblar: cheksiz muddat</li>
                  <li> Faol bo'lmagan hisoblar: 3 yil</li>
                  <li> To'lov ma'lumotlari: 5 yil</li>
                  <li> Texnik loglar: 1 yil</li>
                </ul>
                <h4 className='mt-0'>## 6. MA'LUMOTLAR XAVFSIZLIGI</h4>
                <p className='mt-0'>
                  Biz sizning ma'lumotlaringizni himoya qilish uchun quyidagi choralarni ko'ramiz:
                </p>
                <ul>
                  <li> SSL sertifikatlar orqali ma'lumotlarni shifrlash</li>
                  <li> Xavfsiz serverlar va ma'lumotlar bazalari</li>
                  <li> Kirish huquqlarini cheklash</li>
                  <li> Muntazam xavfsizlik auditi</li>
                  <li> Xodimlarning maxfiylik to'g'risidagi majburiyatlari</li>
                </ul>
                <h4 className='mt-0'>## 7. SIZNING HUQUQLARINGIZ</h4>
                <p className='mt-0'>Siz quyidagi huquqlarga egasiz:</p>
                <h5 className='mt-0'>### 7.1 Ma'lumotlarga kirish huquqi:</h5>
                <ul>
                  <li> O'zingiz haqingizdagi ma'lumotlarni ko'rish</li>
                  <li> Ma'lumotlar nusxasini olish</li>
                </ul>
                <h5 className='mt-0'>### 7.2 Tuzatish huquqi:</h5>
                <ul>
                  <li> Noto'g'ri ma'lumotlarni tuzatish</li>
                  <li> To'liq bo'lmagan ma'lumotlarni to'ldirish</li>
                </ul>
                <h5 className='mt-0'>### 7.3 O'chirish huquqi:</h5>
                <ul>
                  <li> Hisobni o'chirish</li>
                  <li> Ma'lum ma'lumotlarni o'chirish (qonun ruxsat bergan hollarda)</li>
                </ul>
                <h5 className='mt-0'>### 7.4 Qayta ishlashni cheklash:</h5>
                <ul>
                  <li> Marketing xabarlaridan voz kechish</li>
                  <li> Ma'lumotlar qayta ishlashini to'xtatish</li>
                </ul>
                <h4 className='mt-0'>## 8. COOKIE VA KUZATUV TEXNOLOGIYALARI</h4>
                <p className='mt-0'>Ilovamiz quyidagi texnologiyalardan foydalanadi:</p>
                <ul>
                  <li> Session cookie'lar (foydalanuvchi sessiyasini saqlash)</li>
                  <li> Analytics cookie'lar (foydalanish statistikasi)</li>
                  <li> Reklama cookie'lari (maqsadli reklama)</li>
                  <li> Push bildirishnomalar</li>
                </ul>
                <p className='mt-0'>
                  Siz brauzer sozlamalarida cookie'larni o'chirib qo'yishingiz mumkin.
                </p>
                <h4 className='mt-0'>## 9. BOLALAR MAXFIYLIGI</h4>
                <p className='mt-0'>
                  13 yoshdan kichik bolalardan ma'lumot to'plamayimiz. Agar bunday holat aniqlansa,
                  darhol ma'lumotlar o'chiriladi va ota-onalar xabardor qilinadi.
                </p>
                <h4 className='mt-0'>## 10. O'ZGARISHLAR</h4>
                <p className='mt-0'>Ushbu siyosatga kiritilgan o'zgarishlar:</p>
                <ul>
                  <li> Ilovada bildirishnoma orqali e'lon qilinadi</li>
                  <li> Saytda nashr etiladi</li>
                  <li> Muhim o'zgarishlar uchun alohida rozilik olinadi</li>
                </ul>
                <h4 className='mt-0'>## 11. ALOQA MA'LUMOTLARI</h4>
                <p className='mt-0'>Maxfiylik bilan bog'liq savollar uchun:</p>
                <ul>
                  <li>
                    <strong>Elektron pochta:</strong> privacy@[kompaniya].uz{' '}
                  </li>
                  <li>
                    <strong>Telefon:</strong> +998 [telefon raqami]{' '}
                  </li>
                  <li>
                    <strong>Manzil:</strong> [Kompaniya manzili]
                  </li>
                </ul>
                <h4 className='mt-0'>## 12. QONUNIY ASOS</h4>
                <p className='mt-0'>
                  Ushbu siyosat quyidagi qonun hujjatlari asosida ishlab chiqilgan:
                </p>
                <ul>
                  <li> O'zbekiston Respublikasining "Shaxsiy ma'lumotlar to'g'risida"gi Qonuni</li>
                  <li> "Axborotlashtirish to'g'risida"gi Qonun</li>
                  <li> "Elektron tijorat to'g'risida"gi Qonun</li>
                  <li> Davlat xizmatlarini raqamlashtirish bo'yicha normativ hujjatlar</li>
                </ul>
                <h4 className='mt-0'>## 13. NIZOLAR HAL QILISH</h4>
                <p className='mt-0'>Maxfiylik bilan bog'liq nizolar:</p>
                <ol>
                  <li>
                    Birinchi navbatda kompaniya bilan bevosita muzokaralar orqali hal qilinadi
                  </li>
                  <li>
                    Kelishuv bo'lmagan taqdirda O'zbekiston Respublikasi sudlariga murojaat qilish
                    mumkin
                  </li>
                  <li>
                    Shaxsiy ma'lumotlar bo'yicha Davlat inspeksiyasiga shikoyat qilish huquqi mavjud
                  </li>
                </ol>
                <p>-------------------------------</p>
                <p className='mt-0'>
                  <strong>Eslatma:</strong> Ushbu siyosat [Sana] dan boshlab amal qiladi. Ilova
                  foydalanishni davom ettirish orqali siz yangi shartlarni qabul qilgan
                  hisoblanasiz.
                </p>
              </div>
            )}
            {type === 'privacy' && (
              <div className='px-16 privacy'>
                <h4 className='mt-0'>## 1. UMUMIY QOIDALAR</h4>
                <p className='mt-0'>
                  Ushbu Maxfiylik siyosati Wing Corporation MCHJ tomonidan boshqariladigan yetkazib
                  berish ilovasida shaxsiy ma'lumotlaringizning to'planishi, ishlatilishi va
                  himoyalanishini tartibga soladi. Ilovamizdan foydalanish orqali siz ushbu
                  siyosatning shartlariga rozilik bildirasiz.
                </p>
                <h4 className='mt-0'>## 2. TO'PLANADIGAN MA'LUMOTLAR</h4>
                <h5 className='mt-0'>### 2.1 Shaxsiy ma'lumotlar:</h5>
                <ul>
                  <li>To'liq ism va familiya</li>
                  <li>Telefon raqami</li>
                  <li>Yetkazib berish manzillari</li>
                </ul>
                <h5 className='mt-0'>### 2.2 Texnik ma'lumotlar:</h5>
                <ul>
                  <li> Qurilma identifikatori (IMEI, MAC manzil)</li>
                  <li> IP manzil </li>
                  <li> Joylashuv ma'lumotlari (GPS koordinatalari)</li>
                  <li> Ilova foydalanish statistikasi</li>
                  <li> Brauzer va operatsion tizim ma'lumotlari</li>
                </ul>
                <h5 className='mt-0'>### 2.3 To'lov ma'lumotlari:</h5>
                <ul>
                  <li> Karta raqamining oxirgi 4 raqami</li>
                  <li> To'lov usuli</li>
                  <li> Tranzaksiya tarixi</li>
                </ul>
                <h4 className='mt-0'>## 3. MA'LUMOTLARDAN FOYDALANISH MAQSADLARI</h4>
                <p className='mt-0'>Sizning ma'lumotlaringiz quyidagi maqsadlarda ishlatiladi:</p>
                <ul>
                  <li> Buyurtmalarni qayta ishlash va yetkazib berish</li>
                  <li> Mijozlar bilan aloqa o'rnatish</li>
                  <li> Xizmat sifatini yaxshilash</li>
                  <li> Texnik yordam ko'rsatish</li>
                  <li> Marketing va reklama (rozilik asosida)</li>
                  <li> Qonun talablarini bajarish</li>
                </ul>
                <h4 className='mt-0'>## 4. MA'LUMOTLARNI BAHAM KO'RISH</h4>
                <p className='mt-0'>
                  Sizning shaxsiy ma'lumotlaringiz quyidagi hollarda uchinchi shaxslarga uzatilishi
                  mumkin:
                </p>
                <h5 className='mt-0'>### 4.1 Xizmat ko'rsatuvchi hamkorlar:</h5>
                <ul>
                  <li> Yetkazib berish kuryerlari</li>
                  <li> To'lov tizimi provayderlari</li>
                  <li> Restoran va do'konlar</li>
                </ul>
                <h5 className='mt-0'>### 4.2 Qonuniy talablar:</h5>
                <ul>
                  <li> Davlat organlari so'rovi asosida</li>
                  <li> Sud qarorlari bo'yicha</li>
                  <li> Jinoyat tergovi doirasida</li>
                </ul>
                <h4 className='mt-0'>## 5. MA'LUMOTLARNI SAQLASH MUDDATI</h4>
                <ul>
                  <li> Aktiv hisoblar: cheksiz muddat</li>
                  <li> Faol bo'lmagan hisoblar: 3 yil</li>
                  <li> To'lov ma'lumotlari: 5 yil</li>
                  <li> Texnik loglar: 1 yil</li>
                </ul>
                <h4 className='mt-0'>## 6. MA'LUMOTLAR XAVFSIZLIGI</h4>
                <p className='mt-0'>
                  Biz sizning ma'lumotlaringizni himoya qilish uchun quyidagi choralarni ko'ramiz:
                </p>
                <ul>
                  <li> SSL sertifikatlar orqali ma'lumotlarni shifrlash</li>
                  <li> Xavfsiz serverlar va ma'lumotlar bazalari</li>
                  <li> Kirish huquqlarini cheklash</li>
                  <li> Muntazam xavfsizlik auditi</li>
                  <li> Xodimlarning maxfiylik to'g'risidagi majburiyatlari</li>
                </ul>
                <h4 className='mt-0'>## 7. SIZNING HUQUQLARINGIZ</h4>
                <p className='mt-0'>Siz quyidagi huquqlarga egasiz:</p>
                <h5 className='mt-0'>### 7.1 Ma'lumotlarga kirish huquqi:</h5>
                <ul>
                  <li> O'zingiz haqingizdagi ma'lumotlarni ko'rish</li>
                  <li> Ma'lumotlar nusxasini olish</li>
                </ul>
                <h5 className='mt-0'>### 7.2 Tuzatish huquqi:</h5>
                <ul>
                  <li> Noto'g'ri ma'lumotlarni tuzatish</li>
                  <li> To'liq bo'lmagan ma'lumotlarni to'ldirish</li>
                </ul>
                <h5 className='mt-0'>### 7.3 O'chirish huquqi:</h5>
                <ul>
                  <li> Hisobni o'chirish</li>
                  <li> Ma'lum ma'lumotlarni o'chirish (qonun ruxsat bergan hollarda)</li>
                </ul>
                <h5 className='mt-0'>### 7.4 Qayta ishlashni cheklash:</h5>
                <ul>
                  <li> Marketing xabarlaridan voz kechish</li>
                  <li> Ma'lumotlar qayta ishlashini to'xtatish</li>
                </ul>
                <h4 className='mt-0'>## 8. COOKIE VA KUZATUV TEXNOLOGIYALARI</h4>
                <p className='mt-0'>Ilovamiz quyidagi texnologiyalardan foydalanadi:</p>
                <ul>
                  <li> Session cookie'lar (foydalanuvchi sessiyasini saqlash)</li>
                  <li> Analytics cookie'lar (foydalanish statistikasi)</li>
                  <li> Reklama cookie'lari (maqsadli reklama)</li>
                  <li> Push bildirishnomalar</li>
                </ul>
                <p className='mt-0'>
                  Siz brauzer sozlamalarida cookie'larni o'chirib qo'yishingiz mumkin.
                </p>
                <h4 className='mt-0'>## 9. BOLALAR MAXFIYLIGI</h4>
                <p className='mt-0'>
                  13 yoshdan kichik bolalardan ma'lumot to'plamayimiz. Agar bunday holat aniqlansa,
                  darhol ma'lumotlar o'chiriladi va ota-onalar xabardor qilinadi.
                </p>
                <h4 className='mt-0'>## 10. O'ZGARISHLAR</h4>
                <p className='mt-0'>Ushbu siyosatga kiritilgan o'zgarishlar:</p>
                <ul>
                  <li> Ilovada bildirishnoma orqali e'lon qilinadi</li>
                  <li> Saytda nashr etiladi</li>
                  <li> Muhim o'zgarishlar uchun alohida rozilik olinadi</li>
                </ul>
                <h4 className='mt-0'>## 11. ALOQA MA'LUMOTLARI</h4>
                <p className='mt-0'>Maxfiylik bilan bog'liq savollar uchun:</p>
                <ul>
                  <li>**Elektron pochta:** privacy@[kompaniya].uz </li>
                  <li>**Telefon:** +998 [telefon raqami] </li>
                  <li>**Manzil:** [Kompaniya manzili]</li>
                </ul>
                <h4 className='mt-0'>## 12. QONUNIY ASOS</h4>
                <p className='mt-0'>
                  Ushbu siyosat quyidagi qonun hujjatlari asosida ishlab chiqilgan:
                </p>
                <ul>
                  <li> O'zbekiston Respublikasining "Shaxsiy ma'lumotlar to'g'risida"gi Qonuni</li>
                  <li> "Axborotlashtirish to'g'risida"gi Qonun</li>
                  <li> "Elektron tijorat to'g'risida"gi Qonun</li>
                  <li> Davlat xizmatlarini raqamlashtirish bo'yicha normativ hujjatlar</li>
                </ul>
                <h4 className='mt-0'>## 13. NIZOLAR HAL QILISH</h4>
                <p className='mt-0'>Maxfiylik bilan bog'liq nizolar:</p>
                <ol>
                  <li>
                    Birinchi navbatda kompaniya bilan bevosita muzokaralar orqali hal qilinadi
                  </li>
                  <li>
                    Kelishuv bo'lmagan taqdirda O'zbekiston Respublikasi sudlariga murojaat qilish
                    mumkin
                  </li>
                  <li>
                    Shaxsiy ma'lumotlar bo'yicha Davlat inspeksiyasiga shikoyat qilish huquqi mavjud
                  </li>
                </ol>
                <p>-------------------------------</p>
                <p className='mt-0'>
                  **Eslatma:** Ushbu siyosat [Sana] dan boshlab amal qiladi. Ilova foydalanishni
                  davom ettirish orqali siz yangi shartlarni qabul qilgan hisoblanasiz.
                </p>
              </div>
            )}
            {type === 'help' && (
              <div className='d-flex px-16'>
                <button className='help-button w-100'>
                  <Image className='help-button-img' src={require('@/assets/icons/telegram.svg')} />
                  Telegram orqali yordam
                </button>
              </div>
            )}
            {type === 'language' &&
              languages.map((language) => (
                <button
                  key={language.code}
                  className='language-item'
                  onClick={() => handleLanguageSelect(language.code)}
                >
                  <div className='language-item-left'>
                    <span className='language-flag'>{language.flag}</span>
                    <span className='language-name'>{language.name}</span>
                  </div>
                  {selectedLanguage === language.code && <i className='bi bi-check check-icon'></i>}
                </button>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default LanguageModal;
