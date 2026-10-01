import type { Locale } from "@/i18n";

/**
 * Per-locale text for every item in lib/equipment.ts, keyed by the exact `name` there.
 * `name` is the model as the manufacturer writes it (Cyrillic in ru only where the maker uses it:
 * УРБ, УКС, БА, КАМАЗ, МТЗ); `type` is the machine class; `spec` translates the existing spec only —
 * no figure was added. Sources: lib/equipment.ts, presentation pp. 7–12, info/Form Equip.docx,
 * info/Equipment (2).docx, design/imagery/equipment-manifest.md.
 * Display-name corrections proven from sources (lib/equipment.ts itself is unchanged):
 *   RW140 → Robex 140W-9S, H940 → H940S (Form Equip.docx); ADP 25A → APD 25A (manifest + AKSA's
 *   APD naming in Form Equip.docx); SHAANXI CHACMAN → Shacman (Form Equip/Equipment docx: Shaanxi
 *   Automobile Group; fleet.ts). Photos marked "closest variant" in the manifest keep the owner's model name.
 * Items added 2026-10-01 from the tender forms (info/Form Equip.docx, info/Equipment (2).docx — only those ticked
 * "Owned"): text-only plates, no photo. `spec` repeats the form's own figure; nothing was added.
 */
export interface EquipmentText {
  name: string;
  type: string;
  spec?: string;
  category: string;
}

export const equipmentText: Record<string, Record<Locale, EquipmentText>> = {
  "URB 3-AM Drilling Unit": {
    uz: { name: "URB-3AM", type: "Burgʻulash agregati", spec: "Yuqori quvvatli burgʻulash qurilmasi", category: "Burgʻulash uskunalari" },
    ru: { name: "УРБ-3АМ", type: "Буровой агрегат", spec: "Буровая установка для тяжёлых условий работы", category: "Буровое оборудование" },
    en: { name: "URB-3AM", type: "Drilling unit", spec: "Heavy-duty drilling rig", category: "Drilling Equipment" },
    tr: { name: "URB-3AM", type: "Sondaj ünitesi", spec: "Ağır hizmet tipi sondaj makinesi", category: "Sondaj Ekipmanları" },
  },
  "URB 2D3 Drilling Unit": {
    uz: { name: "URB-2D3", type: "Burgʻulash agregati", spec: "Oʻrta chuqurlikdagi quduqlar uchun burgʻulash qurilmasi", category: "Burgʻulash uskunalari" },
    ru: { name: "УРБ-2Д3", type: "Буровой агрегат", spec: "Буровая установка для скважин средней глубины", category: "Буровое оборудование" },
    en: { name: "URB-2D3", type: "Drilling unit", spec: "Medium-depth drilling rig", category: "Drilling Equipment" },
    tr: { name: "URB-2D3", type: "Sondaj ünitesi", spec: "Orta derinlikteki kuyular için sondaj makinesi", category: "Sondaj Ekipmanları" },
  },
  "URB 2.5 Drilling Unit": {
    uz: { name: "URB-2.5", type: "Burgʻulash agregati", spec: "Universal burgʻulash qurilmasi", category: "Burgʻulash uskunalari" },
    ru: { name: "УРБ-2.5", type: "Буровой агрегат", spec: "Универсальная буровая установка", category: "Буровое оборудование" },
    en: { name: "URB-2.5", type: "Drilling unit", spec: "Versatile drilling rig", category: "Drilling Equipment" },
    tr: { name: "URB-2.5", type: "Sondaj ünitesi", spec: "Çok amaçlı sondaj makinesi", category: "Sondaj Ekipmanları" },
  },
  "YDZ1500 Drilling Machine": {
    uz: { name: "YDZ1500", type: "Burgʻulash stanogi", spec: "Chuqur quduqlarni burgʻulash", category: "Burgʻulash uskunalari" },
    ru: { name: "YDZ1500", type: "Буровой станок", spec: "Бурение глубоких скважин", category: "Буровое оборудование" },
    en: { name: "YDZ1500", type: "Drilling machine", spec: "Deep well drilling", category: "Drilling Equipment" },
    tr: { name: "YDZ1500", type: "Sondaj makinesi", spec: "Derin kuyu sondajı", category: "Sondaj Ekipmanları" },
  },
  "UKS 22 Drilling Machine": {
    uz: { name: "UKS-22", type: "Burgʻulash stanogi", spec: "Zarbali-arqonli burgʻulash stanogi", category: "Burgʻulash uskunalari" },
    ru: { name: "УКС-22", type: "Буровой станок", spec: "Станок ударно-канатного бурения", category: "Буровое оборудование" },
    en: { name: "UKS-22", type: "Drilling machine", spec: "Cable-tool percussion drilling machine", category: "Drilling Equipment" },
    tr: { name: "UKS-22", type: "Sondaj makinesi", spec: "Darbeli-halatlı sondaj makinesi", category: "Sondaj Ekipmanları" },
  },
  "BA-15 Drilling Unit": {
    uz: { name: "BA-15", type: "Burgʻulash agregati", spec: "Ixcham burgʻulash agregati", category: "Burgʻulash uskunalari" },
    ru: { name: "БА-15", type: "Буровой агрегат", spec: "Компактный буровой агрегат", category: "Буровое оборудование" },
    en: { name: "BA-15", type: "Drilling unit", spec: "Compact drilling unit", category: "Drilling Equipment" },
    tr: { name: "BA-15", type: "Sondaj ünitesi", spec: "Kompakt sondaj ünitesi", category: "Sondaj Ekipmanları" },
  },
  "Truck Crane Sany STC500": {
    uz: { name: "Sany STC500", type: "Avtokran", spec: "Yuk koʻtarish qobiliyati 50 t", category: "Kranlar va koʻtarish texnikasi" },
    ru: { name: "Sany STC500", type: "Автокран", spec: "Грузоподъёмность 50 т", category: "Краны и подъёмная техника" },
    en: { name: "Sany STC500", type: "Truck crane", spec: "50-ton lifting capacity", category: "Cranes & Lifting" },
    tr: { name: "Sany STC500", type: "Mobil vinç", spec: "50 ton kaldırma kapasitesi", category: "Vinçler ve Kaldırma Ekipmanları" },
  },
  "Truck Crane Shacman XCMG SQ8SK3Q": {
    uz: { name: "Shacman XCMG SQ8SK3Q", type: "Avtokran", spec: "Yuk avtomobiliga oʻrnatilgan 8 t kran", category: "Kranlar va koʻtarish texnikasi" },
    ru: { name: "Shacman XCMG SQ8SK3Q", type: "Автокран", spec: "Кран грузоподъёмностью 8 т на шасси грузового автомобиля", category: "Краны и подъёмная техника" },
    en: { name: "Shacman XCMG SQ8SK3Q", type: "Truck crane", spec: "8-ton truck-mounted crane", category: "Cranes & Lifting" },
    tr: { name: "Shacman XCMG SQ8SK3Q", type: "Mobil vinç", spec: "Kamyona monte 8 tonluk vinç", category: "Vinçler ve Kaldırma Ekipmanları" },
  },
  "Truck Crane Manipulator Kamaz 65117": {
    uz: { name: "KAMAZ 65117", type: "Kran-manipulyatorli avtomobil", spec: "Kran-manipulyatorli bortli avtomobil", category: "Kranlar va koʻtarish texnikasi" },
    ru: { name: "КАМАЗ 65117", type: "Кран-манипулятор", spec: "Бортовой автомобиль с краном-манипулятором", category: "Краны и подъёмная техника" },
    en: { name: "KAMAZ 65117", type: "Truck-mounted crane manipulator", spec: "Crane manipulator truck", category: "Cranes & Lifting" },
    tr: { name: "KAMAZ 65117", type: "Hiyap vinçli kamyon", spec: "Hiyap vinçli kasalı kamyon", category: "Vinçler ve Kaldırma Ekipmanları" },
  },
  "Hyundai Excavator RW140": {
    uz: { name: "Hyundai Robex 140W-9S", type: "Gʻildirakli ekskavator", spec: "14 tonnalik gʻildirakli ekskavator", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "Hyundai Robex 140W-9S", type: "Колёсный экскаватор", spec: "14-тонный колёсный экскаватор", category: "Экскаваторы и погрузчики" },
    en: { name: "Hyundai Robex 140W-9S", type: "Wheeled excavator", spec: "14-ton wheeled excavator", category: "Excavators & Loaders" },
    tr: { name: "Hyundai Robex 140W-9S", type: "Lastik tekerlekli ekskavatör", spec: "14 tonluk lastik tekerlekli ekskavatör", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Hyundai Robex 210W-9S Excavator": {
    uz: { name: "Hyundai Robex 210W-9S", type: "Gʻildirakli ekskavator", spec: "21 tonnalik gʻildirakli ekskavator", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "Hyundai Robex 210W-9S", type: "Колёсный экскаватор", spec: "21-тонный колёсный экскаватор", category: "Экскаваторы и погрузчики" },
    en: { name: "Hyundai Robex 210W-9S", type: "Wheeled excavator", spec: "21-ton wheeled excavator", category: "Excavators & Loaders" },
    tr: { name: "Hyundai Robex 210W-9S", type: "Lastik tekerlekli ekskavatör", spec: "21 tonluk lastik tekerlekli ekskavatör", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Hyundai Robex 60W-9S Excavator": {
    uz: { name: "Hyundai Robex 60W-9S", type: "Gʻildirakli ekskavator", spec: "6 tonnalik gʻildirakli ekskavator", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "Hyundai Robex 60W-9S", type: "Колёсный экскаватор", spec: "6-тонный колёсный экскаватор", category: "Экскаваторы и погрузчики" },
    en: { name: "Hyundai Robex 60W-9S", type: "Wheeled excavator", spec: "6-ton wheeled excavator", category: "Excavators & Loaders" },
    tr: { name: "Hyundai Robex 60W-9S", type: "Lastik tekerlekli ekskavatör", spec: "6 tonluk lastik tekerlekli ekskavatör", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Hyundai Excavator Robex 55W": {
    uz: { name: "Hyundai Robex 55W", type: "Gʻildirakli mini ekskavator", spec: "5,5 tonnalik ixcham ekskavator", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "Hyundai Robex 55W", type: "Колёсный мини-экскаватор", spec: "Компактный экскаватор массой 5,5 т", category: "Экскаваторы и погрузчики" },
    en: { name: "Hyundai Robex 55W", type: "Compact wheeled excavator", spec: "5.5-ton compact excavator", category: "Excavators & Loaders" },
    tr: { name: "Hyundai Robex 55W", type: "Lastik tekerlekli mini ekskavatör", spec: "5,5 tonluk kompakt ekskavatör", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Backhoe Loader Hyundai H940": {
    uz: { name: "Hyundai H940S", type: "Ekskavator-yuklagich", spec: "Ekskavator-yuklagich", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "Hyundai H940S", type: "Экскаватор-погрузчик", spec: "Экскаватор-погрузчик", category: "Экскаваторы и погрузчики" },
    en: { name: "Hyundai H940S", type: "Backhoe loader", spec: "Backhoe loader", category: "Excavators & Loaders" },
    tr: { name: "Hyundai H940S", type: "Kazıcı yükleyici", spec: "Kazıcı yükleyici", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Backhoe Loader JCB 4CX": {
    uz: { name: "JCB 4CX", type: "Ekskavator-yuklagich", spec: "4 tonnalik ekskavator-yuklagich", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "JCB 4CX", type: "Экскаватор-погрузчик", spec: "Экскаватор-погрузчик, 4 т", category: "Экскаваторы и погрузчики" },
    en: { name: "JCB 4CX", type: "Backhoe loader", spec: "4-ton backhoe loader", category: "Excavators & Loaders" },
    tr: { name: "JCB 4CX", type: "Kazıcı yükleyici", spec: "4 tonluk kazıcı yükleyici", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Mini Loader JCB SSL 155": {
    uz: { name: "JCB SSL 155", type: "Mini yuklagich", spec: "Bort burilishli mini yuklagich", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "JCB SSL 155", type: "Мини-погрузчик", spec: "Мини-погрузчик с бортовым поворотом", category: "Экскаваторы и погрузчики" },
    en: { name: "JCB SSL 155", type: "Skid-steer loader", spec: "Skid-steer loader", category: "Excavators & Loaders" },
    tr: { name: "JCB SSL 155", type: "Mini yükleyici", spec: "Kaydırmalı dönüşlü mini yükleyici", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Mini Loader XCMG XT760": {
    uz: { name: "XCMG XT760", type: "Mini yuklagich", spec: "Bort burilishli mini yuklagich", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "XCMG XT760", type: "Мини-погрузчик", spec: "Мини-погрузчик с бортовым поворотом", category: "Экскаваторы и погрузчики" },
    en: { name: "XCMG XT760", type: "Skid-steer loader", spec: "Skid-steer loader", category: "Excavators & Loaders" },
    tr: { name: "XCMG XT760", type: "Mini yükleyici", spec: "Kaydırmalı dönüşlü mini yükleyici", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "LiuGong Loader 835H": {
    uz: { name: "LiuGong 835H", type: "Frontal yuklagich", spec: "Gʻildirakli frontal yuklagich", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "LiuGong 835H", type: "Фронтальный погрузчик", spec: "Фронтальный колёсный погрузчик", category: "Экскаваторы и погрузчики" },
    en: { name: "LiuGong 835H", type: "Wheel loader", spec: "Front-end wheel loader", category: "Excavators & Loaders" },
    tr: { name: "LiuGong 835H", type: "Lastik tekerlekli yükleyici", spec: "Lastik tekerlekli ön yükleyici", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Dump Truck SHAANXI CHACMAN F3000": {
    uz: { name: "Shacman F3000", type: "Samosval", spec: "Katta yuk koʻtaruvchi samosval", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "Shacman F3000", type: "Самосвал", spec: "Самосвал большой грузоподъёмности", category: "Экскаваторы и погрузчики" },
    en: { name: "Shacman F3000", type: "Dump truck", spec: "Heavy-duty dump truck", category: "Excavators & Loaders" },
    tr: { name: "Shacman F3000", type: "Damperli kamyon", spec: "Ağır hizmet tipi damperli kamyon", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Flatbed Truck Kamaz 43118": {
    uz: { name: "KAMAZ 43118", type: "Bortli yuk avtomobili", spec: "6×6 bortli yuk avtomobili", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "КАМАЗ 43118", type: "Бортовой автомобиль", spec: "Бортовой автомобиль 6×6", category: "Экскаваторы и погрузчики" },
    en: { name: "KAMAZ 43118", type: "Flatbed truck", spec: "6×6 flatbed truck", category: "Excavators & Loaders" },
    tr: { name: "KAMAZ 43118", type: "Açık kasa kamyon", spec: "6×6 açık kasa kamyon", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "MTZ Tractor (Minsk Tractor Plant)": {
    uz: { name: "MTZ (Minsk traktor zavodi)", type: "Traktor", spec: "Universal traktor", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "МТЗ (Минский тракторный завод)", type: "Трактор", spec: "Универсальный трактор", category: "Экскаваторы и погрузчики" },
    en: { name: "MTZ (Minsk Tractor Plant)", type: "Tractor", spec: "Utility tractor", category: "Excavators & Loaders" },
    tr: { name: "MTZ (Minsk Traktör Fabrikası)", type: "Traktör", spec: "Çok amaçlı traktör", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Generator Eastern Lion GFS-W24": {
    uz: { name: "Eastern Lion GFS-W24", type: "Generator", spec: "24 kVt quvvatli koʻchma generator", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Eastern Lion GFS-W24", type: "Генератор", spec: "Передвижной генератор мощностью 24 кВт", category: "Инструменты и спецоборудование" },
    en: { name: "Eastern Lion GFS-W24", type: "Generator", spec: "24 kW mobile generator", category: "Tools & Specialized Equipment" },
    tr: { name: "Eastern Lion GFS-W24", type: "Jeneratör", spec: "24 kW mobil jeneratör", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Generator AKSA ADP 25A": {
    uz: { name: "AKSA APD 25A", type: "Dizel generator", spec: "25 kVA quvvatli dizel generator", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "AKSA APD 25A", type: "Дизель-генератор", spec: "Дизель-генератор мощностью 25 кВА", category: "Инструменты и спецоборудование" },
    en: { name: "AKSA APD 25A", type: "Diesel generator", spec: "25 kVA diesel generator", category: "Tools & Specialized Equipment" },
    tr: { name: "AKSA APD 25A", type: "Dizel jeneratör", spec: "25 kVA dizel jeneratör", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Atlas Copco Compressor": {
    uz: { name: "Atlas Copco", type: "Kompressor", spec: "Sanoat havo kompressori", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Atlas Copco", type: "Компрессор", spec: "Промышленный воздушный компрессор", category: "Инструменты и спецоборудование" },
    en: { name: "Atlas Copco", type: "Air compressor", spec: "Industrial air compressor", category: "Tools & Specialized Equipment" },
    tr: { name: "Atlas Copco", type: "Kompresör", spec: "Endüstriyel hava kompresörü", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Mobile Concrete Mixer ADDFORCE LT3500": {
    uz: { name: "ADDFORCE LT3500", type: "Oʻzi yuklanadigan beton qorishtirgich", spec: "Hajmi 3,5 m³, oʻzi yuklanadigan", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "ADDFORCE LT3500", type: "Самозагружающийся бетоносмеситель", spec: "Самозагружающийся, объём 3,5 м³", category: "Инструменты и спецоборудование" },
    en: { name: "ADDFORCE LT3500", type: "Self-loading concrete mixer", spec: "3.5 m³ self-loading mixer", category: "Tools & Specialized Equipment" },
    tr: { name: "ADDFORCE LT3500", type: "Kendinden yüklemeli beton mikseri", spec: "3,5 m³ kendinden yüklemeli mikser", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Pipe Welding Machine Turan Makina AL 800": {
    uz: { name: "Turan Makina AL 800", type: "Quvurlarni uchma-uch payvandlash apparati", spec: "Ø 500–800 mm quvurlarni uchma-uch payvandlash", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Turan Makina AL 800", type: "Аппарат стыковой сварки труб", spec: "Стыковая сварка труб Ø 500–800 мм", category: "Инструменты и спецоборудование" },
    en: { name: "Turan Makina AL 800", type: "Butt fusion welding machine", spec: "Butt fusion, 500–800 mm", category: "Tools & Specialized Equipment" },
    tr: { name: "Turan Makina AL 800", type: "Alın kaynak makinesi", spec: "500–800 mm alın kaynağı", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Pipe Welding Machine Turan Makina AL 500": {
    uz: { name: "Turan Makina AL 500", type: "Quvurlarni uchma-uch payvandlash apparati", spec: "Ø 180–500 mm quvurlarni uchma-uch payvandlash", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Turan Makina AL 500", type: "Аппарат стыковой сварки труб", spec: "Стыковая сварка труб Ø 180–500 мм", category: "Инструменты и спецоборудование" },
    en: { name: "Turan Makina AL 500", type: "Butt fusion welding machine", spec: "Butt fusion, 180–500 mm", category: "Tools & Specialized Equipment" },
    tr: { name: "Turan Makina AL 500", type: "Alın kaynak makinesi", spec: "180–500 mm alın kaynağı", category: "Aletler ve Özel Ekipmanlar" },
  },
  "HDPE Pipe Fusion Machine J.Saouron Pipefuse-630": {
    uz: { name: "J.Saouron Pipefuse-630", type: "PE quvurlarni payvandlash apparati", spec: "Ø 630 mm gacha PE quvurlarni payvandlash", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "J.Saouron Pipefuse-630", type: "Аппарат для сварки ПЭ-труб", spec: "Сварка ПЭ-труб Ø до 630 мм", category: "Инструменты и спецоборудование" },
    en: { name: "J.Saouron Pipefuse-630", type: "HDPE pipe fusion machine", spec: "HDPE fusion up to 630 mm", category: "Tools & Specialized Equipment" },
    tr: { name: "J.Saouron Pipefuse-630", type: "HDPE boru kaynak makinesi", spec: "630 mm’ye kadar HDPE boru kaynağı", category: "Aletler ve Özel Ekipmanlar" },
  },
  "HDPE Pipe Fusion Machine J.Saouron Pipefuse-250": {
    uz: { name: "J.Saouron Pipefuse-250", type: "PE quvurlarni payvandlash apparati", spec: "Ø 250 mm gacha PE quvurlarni payvandlash", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "J.Saouron Pipefuse-250", type: "Аппарат для сварки ПЭ-труб", spec: "Сварка ПЭ-труб Ø до 250 мм", category: "Инструменты и спецоборудование" },
    en: { name: "J.Saouron Pipefuse-250", type: "HDPE pipe fusion machine", spec: "HDPE fusion up to 250 mm", category: "Tools & Specialized Equipment" },
    tr: { name: "J.Saouron Pipefuse-250", type: "HDPE boru kaynak makinesi", spec: "250 mm’ye kadar HDPE boru kaynağı", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Pipeline Inspection Camera": {
    uz: { name: "Quvurlarni tekshirish kamerasi", type: "Teleinspeksiya tizimi", spec: "Kabel uzunligi 300 m", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Камера для телеинспекции трубопроводов", type: "Телеинспекционная система", spec: "Длина кабеля 300 м", category: "Инструменты и спецоборудование" },
    en: { name: "Pipeline inspection camera", type: "Inspection camera system", spec: "300 m cable length", category: "Tools & Specialized Equipment" },
    tr: { name: "Boru hattı inceleme kamerası", type: "Görüntülü inceleme sistemi", spec: "300 m kablo uzunluğu", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Truck Crane Galichanin KS-55713-4 (Kamaz)": {
    uz: { name: "Galichanin KS-55713-4", type: "Avtokran", spec: "Yuk koʻtarish qobiliyati 25 t, KAMAZ shassisida", category: "Kranlar va koʻtarish texnikasi" },
    ru: { name: "Галичанин КС-55713-4", type: "Автокран", spec: "Грузоподъёмность 25 т, шасси КАМАЗ", category: "Краны и подъёмная техника" },
    en: { name: "Galichanin KS-55713-4", type: "Truck crane", spec: "25 t lifting capacity, KAMAZ chassis", category: "Cranes & Lifting" },
    tr: { name: "Galichanin KS-55713-4", type: "Mobil vinç", spec: "25 ton kaldırma kapasitesi, KAMAZ şasi", category: "Vinçler ve Kaldırma Ekipmanları" },
  },
  "Water Tanker ZIL-130": {
    uz: { name: "ZIL-130", type: "Suv tashuvchi avtosisterna", spec: "Sisterna, 5–5,3 t", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "ЗИЛ-130", type: "Автоцистерна для воды", spec: "Цистерна, 5–5,3 т", category: "Экскаваторы и погрузчики" },
    en: { name: "ZIL-130", type: "Water tanker", spec: "5–5.3 t water tanker", category: "Excavators & Loaders" },
    tr: { name: "ZIL-130", type: "Su tankeri", spec: "5–5,3 ton su tankeri", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Truck Shaanxi 60 t (pipe carrier)": {
    uz: { name: "Shacman, 60 t", type: "Quvur tashuvchi yuk avtomobili", spec: "60 t, quvur tashish tirkamasi bilan", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "Shacman, 60 т", type: "Трубовоз", spec: "60 т, с прицепом для перевозки труб", category: "Экскаваторы и погрузчики" },
    en: { name: "Shacman, 60 t", type: "Pipe carrier truck", spec: "60 t, with a pipe trailer", category: "Excavators & Loaders" },
    tr: { name: "Shacman, 60 ton", type: "Boru taşıma kamyonu", spec: "60 ton, boru taşıma römorkuyla", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Trencher KMZ (on MTZ Belarus 80.1)": {
    uz: { name: "KMZ / MTZ Belarus 80.1", type: "Transheya qazish mashinasi", spec: "MTZ Belarus 80.1 traktoriga oʻrnatilgan", category: "Ekskavatorlar va yuklagichlar" },
    ru: { name: "КМЗ / МТЗ «Беларус 80.1»", type: "Траншеекопатель", spec: "Навесной, на тракторе МТЗ «Беларус 80.1»", category: "Экскаваторы и погрузчики" },
    en: { name: "KMZ / MTZ Belarus 80.1", type: "Trencher", spec: "Mounted on an MTZ Belarus 80.1 tractor", category: "Excavators & Loaders" },
    tr: { name: "KMZ / MTZ Belarus 80.1", type: "Hendek kazıcı", spec: "MTZ Belarus 80.1 traktörüne monte", category: "Ekskavatörler ve Yükleyiciler" },
  },
  "Compactor BOMAG BMP8500": {
    uz: { name: "BOMAG BMP 8500", type: "Koʻp maqsadli zichlagich", spec: "72/36 kN", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "BOMAG BMP 8500", type: "Многоцелевой виброкаток", spec: "72/36 кН", category: "Инструменты и спецоборудование" },
    en: { name: "BOMAG BMP 8500", type: "Multi-purpose compactor", spec: "72/36 kN", category: "Tools & Specialized Equipment" },
    tr: { name: "BOMAG BMP 8500", type: "Çok amaçlı sıkıştırma silindiri", spec: "72/36 kN", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Rammer Ishikawa SR80": {
    uz: { name: "Ishikawa SR80", type: "Vibrotrambovka", spec: "12 kN", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Ishikawa SR80", type: "Вибротрамбовка", spec: "12 кН", category: "Инструменты и спецоборудование" },
    en: { name: "Ishikawa SR80", type: "Tamping rammer", spec: "12 kN", category: "Tools & Specialized Equipment" },
    tr: { name: "Ishikawa SR80", type: "Titreşimli tokmak", spec: "12 kN", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Drainage Pump KSB AmaDrainer N 301": {
    uz: { name: "KSB AmaDrainer N 301", type: "Choʻktiriladigan drenaj nasosi", spec: "Ifloslangan suv uchun", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "KSB AmaDrainer N 301", type: "Погружной дренажный насос", spec: "Для загрязнённой воды", category: "Инструменты и спецоборудование" },
    en: { name: "KSB AmaDrainer N 301", type: "Submersible drainage pump", spec: "Dirty-water pump", category: "Tools & Specialized Equipment" },
    tr: { name: "KSB AmaDrainer N 301", type: "Dalgıç drenaj pompası", spec: "Kirli su pompası", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Drainage Pump Wilo-Drain TC 40": {
    uz: { name: "Wilo-Drain TC 40", type: "Choʻktiriladigan drenaj nasosi", spec: "Qmax 19 m³/soat", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Wilo-Drain TC 40", type: "Погружной дренажный насос", spec: "Qmax 19 м³/ч", category: "Инструменты и спецоборудование" },
    en: { name: "Wilo-Drain TC 40", type: "Submersible drainage pump", spec: "Qmax 19 m³/h", category: "Tools & Specialized Equipment" },
    tr: { name: "Wilo-Drain TC 40", type: "Dalgıç drenaj pompası", spec: "Qmax 19 m³/sa", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Drainage Pump Wilo-Drain TM 32/8": {
    uz: { name: "Wilo-Drain TM 32/8", type: "Choʻktiriladigan drenaj nasosi", spec: "Qmax 13 m³/soat", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Wilo-Drain TM 32/8", type: "Погружной дренажный насос", spec: "Qmax 13 м³/ч", category: "Инструменты и спецоборудование" },
    en: { name: "Wilo-Drain TM 32/8", type: "Submersible drainage pump", spec: "Qmax 13 m³/h", category: "Tools & Specialized Equipment" },
    tr: { name: "Wilo-Drain TM 32/8", type: "Dalgıç drenaj pompası", spec: "Qmax 13 m³/sa", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Drainage Pump Grundfos Unilift KP 250": {
    uz: { name: "Grundfos Unilift KP 250", type: "Choʻktiriladigan drenaj nasosi", spec: "Qmax 10,63 m³/soat", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Grundfos Unilift KP 250", type: "Погружной дренажный насос", spec: "Qmax 10,63 м³/ч", category: "Инструменты и спецоборудование" },
    en: { name: "Grundfos Unilift KP 250", type: "Submersible drainage pump", spec: "Qmax 10.63 m³/h", category: "Tools & Specialized Equipment" },
    tr: { name: "Grundfos Unilift KP 250", type: "Dalgıç drenaj pompası", spec: "Qmax 10,63 m³/sa", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Welding Machine Jasic ARC400": {
    uz: { name: "Jasic ARC400", type: "Poʻlat quvurlarni payvandlash apparati", spec: "Ø 110–630 mm", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Jasic ARC400", type: "Сварочный аппарат для стальных труб", spec: "Ø 110–630 мм", category: "Инструменты и спецоборудование" },
    en: { name: "Jasic ARC400", type: "Steel pipe welding machine", spec: "Ø 110–630 mm", category: "Tools & Specialized Equipment" },
    tr: { name: "Jasic ARC400", type: "Çelik boru kaynak makinesi", spec: "Ø 110–630 mm", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Extrusion Welding Machine PE/PP": {
    uz: { name: "PE/PP ekstruderi", type: "Ekstruziyali payvandlash apparati", spec: "PE va PP payvandlash", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Экструдер ПЭ/ПП", type: "Аппарат экструзионной сварки", spec: "Сварка ПЭ и ПП", category: "Инструменты и спецоборудование" },
    en: { name: "PE/PP extruder", type: "Extrusion welding machine", spec: "PE and PP welding", category: "Tools & Specialized Equipment" },
    tr: { name: "PE/PP ekstrüder", type: "Ekstrüzyon kaynak makinesi", spec: "PE ve PP kaynağı", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Welding Unit Set": {
    uz: { name: "Payvandlash agregati", type: "Payvandlash uskunasi (komplekt)", spec: "Komplekt", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "Сварочный агрегат", type: "Сварочное оборудование (комплект)", spec: "Комплект", category: "Инструменты и спецоборудование" },
    en: { name: "Welding unit", type: "Welding equipment (set)", spec: "Set", category: "Tools & Specialized Equipment" },
    tr: { name: "Kaynak ünitesi", type: "Kaynak ekipmanı (set)", spec: "Set", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Compressor Oryol PKS-12,25": {
    uz: { name: "PKS-12,25", type: "Kompressor", spec: "12,25 m³", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "PKS-12,25", type: "Компрессор", spec: "12,25 м³", category: "Инструменты и спецоборудование" },
    en: { name: "PKS-12,25", type: "Air compressor", spec: "12.25 m³", category: "Tools & Specialized Equipment" },
    tr: { name: "PKS-12,25", type: "Kompresör", spec: "12,25 m³", category: "Aletler ve Özel Ekipmanlar" },
  },
  "Rod Vibrator TeXa T-96505": {
    uz: { name: "TeXa T-96505", type: "Pnevmatik chuqurlik vibratori", spec: "50 mm", category: "Asboblar va maxsus uskunalar" },
    ru: { name: "TeXa T-96505", type: "Пневматический глубинный вибратор", spec: "50 мм", category: "Инструменты и спецоборудование" },
    en: { name: "TeXa T-96505", type: "Pneumatic poker vibrator", spec: "50 mm", category: "Tools & Specialized Equipment" },
    tr: { name: "TeXa T-96505", type: "Pnömatik daldırma vibratör", spec: "50 mm", category: "Aletler ve Özel Ekipmanlar" },
  },
};

export function getEquipmentText(name: string, locale: Locale): EquipmentText {
  const entry = equipmentText[name];
  if (!entry) throw new Error(`equipment-i18n: no text for "${name}"`);
  return entry[locale] ?? entry.en;
}

/**
 * name → standardised cutout (1600×1200 transparent WebP) from design/imagery/equipment-map.json.
 * undefined = no acceptable photo yet (see the manifest's "Missing" section). Several images are
 * "closest variant" model photos, so the page must label them as model photos.
 */
export const equipmentImage: Record<string, string | undefined> = {
  "URB 3-AM Drilling Unit": "/images/equipment/urb-3a3.webp",
  "URB 2D3 Drilling Unit": "/images/equipment/urb-2d3.webp",
  "URB 2.5 Drilling Unit": "/images/equipment/urb-2a2.webp",
  "YDZ1500 Drilling Machine": undefined,
  "UKS 22 Drilling Machine": undefined,
  "BA-15 Drilling Unit": undefined,
  "Truck Crane Sany STC500": "/images/equipment/sany-stc500e.webp",
  "Truck Crane Shacman XCMG SQ8SK3Q": "/images/equipment/shacman-xcmg-crane.webp",
  "Truck Crane Manipulator Kamaz 65117": "/images/equipment/kamaz-65117-manipulator.webp",
  "Hyundai Excavator RW140": "/images/equipment/hyundai-r140w-9s.webp",
  "Hyundai Robex 210W-9S Excavator": "/images/equipment/hyundai-r210w-9s.webp",
  "Hyundai Robex 60W-9S Excavator": "/images/equipment/hyundai-r60w-9s.webp",
  "Hyundai Excavator Robex 55W": "/images/equipment/hyundai-r55w-9.webp",
  "Backhoe Loader Hyundai H940": "/images/equipment/hyundai-h940s.webp",
  "Backhoe Loader JCB 4CX": "/images/equipment/jcb-4cx.webp",
  "Mini Loader JCB SSL 155": "/images/equipment/jcb-155.webp",
  "Mini Loader XCMG XT760": undefined,
  "LiuGong Loader 835H": "/images/equipment/liugong-835h.webp",
  "Dump Truck SHAANXI CHACMAN F3000": "/images/equipment/shacman-f3000-dump.webp",
  "Flatbed Truck Kamaz 43118": "/images/equipment/kamaz-43118.webp",
  "MTZ Tractor (Minsk Tractor Plant)": "/images/equipment/mtz-82-1.webp",
  "Generator Eastern Lion GFS-W24": undefined,
  "Generator AKSA ADP 25A": "/images/equipment/aksa-apd25a.webp",
  "Atlas Copco Compressor": "/images/equipment/atlas-copco-xahs408.webp",
  "Mobile Concrete Mixer ADDFORCE LT3500": "/images/equipment/addforce-lt3500.webp",
  "Pipe Welding Machine Turan Makina AL 800": "/images/equipment/turan-al800.webp",
  "Pipe Welding Machine Turan Makina AL 500": "/images/equipment/turan-al630.webp",
  "HDPE Pipe Fusion Machine J.Saouron Pipefuse-630": "/images/equipment/sauron-pipefuse-630.webp",
  "HDPE Pipe Fusion Machine J.Saouron Pipefuse-250": "/images/equipment/sauron-pipefuse-315.webp",
  "Pipeline Inspection Camera": "/images/equipment/vicam-inspection-camera.webp",
  /* added from the tender forms 2026-10-01: text-only plates */
  "Truck Crane Galichanin KS-55713-4 (Kamaz)": undefined,
  "Water Tanker ZIL-130": undefined,
  "Truck Shaanxi 60 t (pipe carrier)": undefined,
  "Trencher KMZ (on MTZ Belarus 80.1)": undefined,
  "Compactor BOMAG BMP8500": undefined,
  "Rammer Ishikawa SR80": undefined,
  "Drainage Pump KSB AmaDrainer N 301": undefined,
  "Drainage Pump Wilo-Drain TC 40": undefined,
  "Drainage Pump Wilo-Drain TM 32/8": undefined,
  "Drainage Pump Grundfos Unilift KP 250": undefined,
  "Welding Machine Jasic ARC400": undefined,
  "Extrusion Welding Machine PE/PP": undefined,
  "Welding Unit Set": undefined,
  "Compressor Oryol PKS-12,25": undefined,
  "Rod Vibrator TeXa T-96505": undefined,
};
