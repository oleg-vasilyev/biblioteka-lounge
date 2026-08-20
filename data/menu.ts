export type LocalizedName = { ka: string; en: string; ru: string };
export type MenuItem = { name: LocalizedName; price: number };
export type MenuCategory = { name: LocalizedName; items: MenuItem[] };

export const MENU_CAPTURED_ON = "2026-08-20";
export const MENU_SOURCE_URL = "https://lounge-biblioteka.eat-me.online";

export const MENU: MenuCategory[] = [
  {
    "name": {
      "ka": "ბიბლიოთეკა ლანჩი",
      "en": "Biblioteka Lunch",
      "ru": "Библиотека Ланч"
    },
    "items": [
      {
        "name": {
          "ka": "Biblioteka Lunch",
          "en": "Biblioteka Lunch",
          "ru": "Biblioteka Lunch"
        },
        "price": 70
      }
    ]
  },
  {
    "name": {
      "ka": "ჩილიმი",
      "en": "Hookah",
      "ru": "Кальян"
    },
    "items": [
      {
        "name": {
          "ka": "კლასიკური ჩილიმი",
          "en": "Classic Hookah",
          "ru": "Кальян классический"
        },
        "price": 60
      },
      {
        "name": {
          "ka": "ჩილიმი გრეიფრუტზე",
          "en": "Hookah on grapefruit",
          "ru": "Кальян на грейпфруте"
        },
        "price": 90
      },
      {
        "name": {
          "ka": "ჩილიმი ენერგეტიკზე",
          "en": "Hookah on Energy Drink",
          "ru": "Кальян на энергетике"
        },
        "price": 90
      },
      {
        "name": {
          "ka": "ჩილიმი ღვინოზე",
          "en": "Hookah on wine",
          "ru": "Кальян на вине"
        },
        "price": 90
      },
      {
        "name": {
          "ka": "Hookah on pineapple",
          "en": "Hookah on pineapple",
          "ru": "Кальян на ананасе/гранате/кокосе"
        },
        "price": 110
      },
      {
        "name": {
          "ka": "Hookah on Energy Drink and Grapefruit",
          "en": "Hookah on Energy Drink and Grapefruit",
          "ru": "Кальян на энергетике и грейпе"
        },
        "price": 160
      },
      {
        "name": {
          "ka": "ჩილიმი გრეიფრუტზე და ღვინოზე",
          "en": "Hookah Grapefruit&Wine",
          "ru": "Кальян на грейпе и вине"
        },
        "price": 160
      },
      {
        "name": {
          "ka": "Кальян дабл ананас",
          "en": "Кальян дабл ананас",
          "ru": "Кальян дабл ананас"
        },
        "price": 190
      }
    ]
  },
  {
    "name": {
      "ka": "საუზმე",
      "en": "Breakfast",
      "ru": "Завтрак"
    },
    "items": [
      {
        "name": {
          "ka": "სირნიკები",
          "en": "Cottage cheesecakes with berris",
          "ru": "Сырники с ягодами"
        },
        "price": 17
      },
      {
        "name": {
          "ka": "სქრამბლი ავოკადოთი და ყველით",
          "en": "Scramble with avocado",
          "ru": "Скрэмбел с авокадо"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "ქუსკუსის ბოული ორაგულით",
          "en": "Couscous bowl",
          "ru": "Боул с кускусом и лососем"
        },
        "price": 24
      },
      {
        "name": {
          "ka": "ქათმის ბოული",
          "en": "Chicken Bowl",
          "ru": "Боул с курицей"
        },
        "price": 22
      },
      {
        "name": {
          "ka": "ბელარუსული ბოული",
          "en": "Belarusian bowl",
          "ru": "Беларуский боул с авокадо и пашот"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "ნაღების წიწიბურა",
          "en": "Creamy buckwheat with avocado",
          "ru": "Сливочная греча с авокадо"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "ინგლისური საუზმე",
          "en": "English breakfast",
          "ru": "Английский завтрак"
        },
        "price": 16
      }
    ]
  },
  {
    "name": {
      "ka": "ცხელი კერძები",
      "en": "Hot dishes",
      "ru": "Горячие блюда"
    },
    "items": [
      {
        "name": {
          "ka": "ხბოს ხორცი ბოსტნეულით",
          "en": "Veal with vegetables",
          "ru": "Телятина с овощами"
        },
        "price": 20
      },
      {
        "name": {
          "ka": "ხბოს ხორცი სოკოთი",
          "en": "Veal with mushrooms",
          "ru": "Телятина с грибами"
        },
        "price": 24
      },
      {
        "name": {
          "ka": "ქათმის შნიცელი",
          "en": "Chicken steak",
          "ru": "Куриная отбивная с остро-сладким соусом"
        },
        "price": 20
      },
      {
        "name": {
          "ka": "კატლეტი და პიურე",
          "en": "Cutlets with mashed potatoes",
          "ru": "Котлеты с пюре и соленьями"
        },
        "price": 26
      },
      {
        "name": {
          "ka": "პიურე ჟულიენით",
          "en": "Mashed potatoes with julienne",
          "ru": "Пюре с жульеном"
        },
        "price": 20
      }
    ]
  },
  {
    "name": {
      "ka": "ხორცი / თევზი / ქათამი",
      "en": "Meat / Fish / Chicken",
      "ru": "Мясо / Рыба / Курица"
    },
    "items": [
      {
        "name": {
          "ka": "ღორის ნეკნები",
          "en": "Pork ribs",
          "ru": "Рёбра свиные"
        },
        "price": 34
      },
      {
        "name": {
          "ka": "ღორის სტეიკი",
          "en": "Pork steak",
          "ru": "Стейк с картофелем по-деревенски(свинина)"
        },
        "price": 34
      },
      {
        "name": {
          "ka": "ორაგულის სტეიკი",
          "en": "Salmon steak",
          "ru": "Стейк лосось"
        },
        "price": 50
      },
      {
        "name": {
          "ka": "ორაგულის ტარტარი",
          "en": "Tartar salmon",
          "ru": "Тартар из лосося"
        },
        "price": 36
      }
    ]
  },
  {
    "name": {
      "ka": "დრანიკები",
      "en": "Draniki",
      "ru": "Драники"
    },
    "items": [
      {
        "name": {
          "ka": "დრანიკები",
          "en": "Draniki",
          "ru": "Драники"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "დრანიკები ბეკონით და არაჟნი",
          "en": "Draniki with bacon",
          "ru": "Драники с беконом и сметаной"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "დრანიკები ჟულიენით",
          "en": "Draniki with julienne",
          "ru": "Драники с жульеном"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "დრაინიკი ორაგულით",
          "en": "Draniki with salmon",
          "ru": "Драники с лососем"
        },
        "price": 28
      }
    ]
  },
  {
    "name": {
      "ka": "პასტა",
      "en": "Pasta",
      "ru": "Паста"
    },
    "items": [
      {
        "name": {
          "ka": "პასტა კარბონარა",
          "en": "Pasta carbonara",
          "ru": "Паста карбонара"
        },
        "price": 25
      },
      {
        "name": {
          "ka": "პასტა ზღვის პროდუქტებით",
          "en": "Pasta with seafood",
          "ru": "Паста с морепродуктами"
        },
        "price": 42
      }
    ]
  },
  {
    "name": {
      "ka": "სუპები",
      "en": "Soups",
      "ru": "Супы"
    },
    "items": [
      {
        "name": {
          "ka": "ბორში",
          "en": "Borsch",
          "ru": "Борщ"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "სოლიანკა",
          "en": "Solyanka",
          "ru": "Солянка"
        },
        "price": 21
      },
      {
        "name": {
          "ka": "უხა ორაგულის",
          "en": "Uha with salmon",
          "ru": "Уха из лосося"
        },
        "price": 22
      },
      {
        "name": {
          "ka": "ჭარხლის სუპი",
          "en": "Holodnikცივი",
          "ru": "Холодник"
        },
        "price": 18
      }
    ]
  },
  {
    "name": {
      "ka": "სალათები",
      "en": "Salads",
      "ru": "Салаты"
    },
    "items": [
      {
        "name": {
          "ka": "სალათი კრევეტებით",
          "en": "Mixed salad with shrimps",
          "ru": "Салатный микс с креветками"
        },
        "price": 30
      },
      {
        "name": {
          "ka": "ბერძნული სალათი",
          "en": "Greek salad",
          "ru": "Греческий"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "სალათი ორაგულით",
          "en": "Salmon salad",
          "ru": "Салат с лососем"
        },
        "price": 34
      },
      {
        "name": {
          "ka": "ცეზარი",
          "en": "Caesar salad",
          "ru": "Цезарь"
        },
        "price": 20
      },
      {
        "name": {
          "ka": "ოლივიე",
          "en": "Olivie salad",
          "ru": "Оливье"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "თბილი ბადრიჯნის სალათი",
          "en": "Warm eggplant salad",
          "ru": "Тёплый салат с баклажаном"
        },
        "price": 18
      }
    ]
  },
  {
    "name": {
      "ka": "ბურგერები",
      "en": "Burgers",
      "ru": "Бургеры"
    },
    "items": [
      {
        "name": {
          "ka": "ბელარუსული ბურგერი",
          "en": "Belarusian burger",
          "ru": "Беларуский бургер"
        },
        "price": 28
      },
      {
        "name": {
          "ka": "ჩიზბურგერი",
          "en": "Cheeseburger",
          "ru": "Чизбургер"
        },
        "price": 27
      },
      {
        "name": {
          "ka": "ჩიქენ ბურგერი",
          "en": "Chicken burger",
          "ru": "Чикенбургер"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "ბიბლიოთეკა",
          "en": "Biblioteka",
          "ru": "Библиотека"
        },
        "price": 40
      }
    ]
  },
  {
    "name": {
      "ka": "გარნირები",
      "en": "Side dishes",
      "ru": "Гарниры"
    },
    "items": [
      {
        "name": {
          "ka": "კარტოფილი ფრი",
          "en": "French fries",
          "ru": "Картофель фри"
        },
        "price": 10
      },
      {
        "name": {
          "ka": "კარტოფილი ფრი ყველით",
          "en": "French fries with cheese",
          "ru": "Фри с сыром"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "სოფლური კარტოფილი",
          "en": "Rustic potatoes",
          "ru": "Картофель по-деревенски"
        },
        "price": 13
      },
      {
        "name": {
          "ka": "კარტოფილის პიურე",
          "en": "Mashed potatoes",
          "ru": "Картофельное пюре"
        },
        "price": 8
      },
      {
        "name": {
          "ka": "კარტოფილის პიურე პარმეზან",
          "en": "Mashed potatoes with parmesan",
          "ru": "Пюре с пармезаном"
        },
        "price": 13
      },
      {
        "name": {
          "ka": "პურის კალათა",
          "en": "Bread Basket",
          "ru": "Хлебная корзина"
        },
        "price": 9
      },
      {
        "name": {
          "ka": "ბრინჯი",
          "en": "Rice",
          "ru": "Рис"
        },
        "price": 8
      }
    ]
  },
  {
    "name": {
      "ka": "მანგალი",
      "en": "BBQ",
      "ru": "Мангал"
    },
    "items": [
      {
        "name": {
          "ka": "ვაგიუ ტომაჰავკი",
          "en": "Tomahawk Steak (beef)",
          "ru": "Томагавк стейк (говядина)"
        },
        "price": 54
      },
      {
        "name": {
          "ka": "საქონლის ხორცი მწვადი",
          "en": "Beef BBQ",
          "ru": "Шашлык из говядины"
        },
        "price": 31
      },
      {
        "name": {
          "ka": "ლულა-ქაბაბი (საქონლის ხორცი)",
          "en": "Lyulya Kebab (Beef)",
          "ru": "Люля кебаб(говядина)"
        },
        "price": 29
      },
      {
        "name": {
          "ka": "ღორის მწვადი მაყალზე",
          "en": "Pork neck BBQ",
          "ru": "Шашлык из свинины(шея)"
        },
        "price": 28
      },
      {
        "name": {
          "ka": "ქათმის მწვადი მაყალზე",
          "en": "Chicken BBQ",
          "ru": "Шашлык из куриного филе"
        },
        "price": 26
      },
      {
        "name": {
          "ka": "შამპინიონები გრილზე",
          "en": "Grilled mushrooms",
          "ru": "Шампиньоны на углях"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "შამპინიონები ყველით",
          "en": "Mushrooms&garlic cheese",
          "ru": "Шампиньоны с чесночным сыром"
        },
        "price": 21
      },
      {
        "name": {
          "ka": "გრილზე შემწვარი ბოსტნეული",
          "en": "Grilled vegetables",
          "ru": "Овощи на мангале"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "პატარა მწვადის ასორტი",
          "en": "Small BBQ platter",
          "ru": "Сет мини МАНГАЛ"
        },
        "price": 101
      },
      {
        "name": {
          "ka": "დიდი  მწვადის ასორტი",
          "en": "Large BBQ platter",
          "ru": "Сет МАКСИ МАНГАЛ"
        },
        "price": 130
      }
    ]
  },
  {
    "name": {
      "ka": "აპეტაიზერი",
      "en": "Appetizer",
      "ru": "Закуски"
    },
    "items": [
      {
        "name": {
          "ka": "ლუდის დაფა",
          "en": "Board beer snacks",
          "ru": "Сет пивных закусок"
        },
        "price": 69
      },
      {
        "name": {
          "ka": "პატარა ლუდის დაფა",
          "en": "Board beer snacks mini",
          "ru": "Сет пивных закусок мини"
        },
        "price": 36
      },
      {
        "name": {
          "ka": "ნივრიანი პურები ყველით",
          "en": "Garlic croutons with cheese",
          "ru": "Чесночные гренки с сыром"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "ქათმის სტრიფსები",
          "en": "Chicken strips",
          "ru": "Куриные стрипсы"
        },
        "price": 20
      },
      {
        "name": {
          "ka": "პანკო კრევეტები",
          "en": "Panko shrimp",
          "ru": "Панко креветки"
        },
        "price": 26
      },
      {
        "name": {
          "ka": "ყველის ბურთულები",
          "en": "Cheese balls",
          "ru": "Сырные шарики"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "ჩიქენ კორნი",
          "en": "Chicken Corn",
          "ru": "Чикен корн"
        },
        "price": 22
      },
      {
        "name": {
          "ka": "ხახვის რგოლები",
          "en": "Onion rings",
          "ru": "Луковые кольца"
        },
        "price": 13
      },
      {
        "name": {
          "ka": "ყველის ასორტი",
          "en": "Cheese platter",
          "ru": "Сырное ассорти"
        },
        "price": 35
      },
      {
        "name": {
          "ka": "ზეთისხილის ასორტი",
          "en": "Assorted olive",
          "ru": "Ассорти оливки / маслины"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "მწნილების ასორტი",
          "en": "plate of pickles",
          "ru": "Ассорти солений"
        },
        "price": 22
      }
    ]
  },
  {
    "name": {
      "ka": "დესერტები",
      "en": "Dessert",
      "ru": "Десерты"
    },
    "items": [
      {
        "name": {
          "ka": "Moti",
          "en": "Moti",
          "ru": "Моти"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "ნაყინი სიროფით",
          "en": "Ice cream with topping",
          "ru": "Мороженое с топингом"
        },
        "price": 11
      },
      {
        "name": {
          "ka": "ბრაუნი",
          "en": "Brownie",
          "ru": "Брауни"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "შტრუდელი ალუბლით",
          "en": "Cherry strudel",
          "ru": "Штрудель с вишней"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "ვაშლის შტრუდელი",
          "en": "Apple strudel",
          "ru": "Штрудель с яблоками"
        },
        "price": 15
      }
    ]
  },
  {
    "name": {
      "ka": "წყალი / წვენი",
      "en": "Water / Juice",
      "ru": "Вода / Сок"
    },
    "items": [
      {
        "name": {
          "ka": "წყალი 0.5 ლl",
          "en": "Water 0,5",
          "ru": "Вода 0.5 л"
        },
        "price": 3
      },
      {
        "name": {
          "ka": "წყალი ლიმონით და პიტნით",
          "en": "Вода с лимоном и мятой",
          "ru": "Вода с лимоном и мятой"
        },
        "price": 11
      },
      {
        "name": {
          "ka": "გაზიანი წყალი",
          "en": "Sparkling  water",
          "ru": "Мтис газ"
        },
        "price": 4
      },
      {
        "name": {
          "ka": "კობი",
          "en": "Kobi",
          "ru": "Коби"
        },
        "price": 6
      },
      {
        "name": {
          "ka": "წვენი",
          "en": "Juice",
          "ru": "Соки"
        },
        "price": 6
      }
    ]
  },
  {
    "name": {
      "ka": "ჩაი",
      "en": "Tea",
      "ru": "Чай"
    },
    "items": [
      {
        "name": {
          "ka": "ჩაი",
          "en": "Tea",
          "ru": "Чай"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "ჩაი ბიბლიოთეკა",
          "en": "Tea \"Biblioteka\"",
          "ru": "Чай \"Библиотека\""
        },
        "price": 21
      },
      {
        "name": {
          "ka": "ჟოლოს ჩაი ბიბლიოთეკა",
          "en": "Tea Raspberry \"Biblioteka\"",
          "ru": "Чай малиновая \"Библиотека\""
        },
        "price": 24
      },
      {
        "name": {
          "ka": "იმბირისა და ციტრუსის ჩაი",
          "en": "Ginger & Citrus Tea",
          "ru": "Чай имбирно-цитрусовый"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "ცივი ჩაი",
          "en": "Iced Tea",
          "ru": "Холодный чай"
        },
        "price": 21
      },
      {
        "name": {
          "ka": "ცივი ულუნი",
          "en": "Iced Oolong Tea",
          "ru": "Холодный улун"
        },
        "price": 21
      }
    ]
  },
  {
    "name": {
      "ka": "ყავა",
      "en": "Coffee",
      "ru": "Кофе"
    },
    "items": [
      {
        "name": {
          "ka": "ესპრესო",
          "en": "Espresso",
          "ru": "Эспрессо"
        },
        "price": 7
      },
      {
        "name": {
          "ka": "ორმაგი ესპრესო",
          "en": "Double espresso",
          "ru": "Двойной эспрессо"
        },
        "price": 10
      },
      {
        "name": {
          "ka": "ამერიკანო",
          "en": "Americano",
          "ru": "Американо"
        },
        "price": 7
      },
      {
        "name": {
          "ka": "ლატე",
          "en": "Latte",
          "ru": "Латте"
        },
        "price": 10
      },
      {
        "name": {
          "ka": "კაპუჩინო",
          "en": "Cappuccino",
          "ru": "Капучино"
        },
        "price": 9
      },
      {
        "name": {
          "ka": "Almond milk Сappuccino",
          "en": "Almond milk Сappuccino",
          "ru": "Капучино на миндальном молоке"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "ფლეთ უაითი",
          "en": "Flat white",
          "ru": "Флэт уайт"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "რაფი",
          "en": "Raf",
          "ru": "Раф"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "ირლანდიური ყავა",
          "en": "Irish Coffee",
          "ru": "Ирландский кофе"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "Cappuccino\"\"",
          "en": "Cappuccino\"\"",
          "ru": "БИГ капучино"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "ბამბლ ყავა",
          "en": "Bumble coffee",
          "ru": "Бамбл кофе"
        },
        "price": 13
      },
      {
        "name": {
          "ka": "ესპრესო ტონიკი",
          "en": "Espresso tonic",
          "ru": "Эспрессо тоник"
        },
        "price": 11
      }
    ]
  },
  {
    "name": {
      "ka": "ფრეშები",
      "en": "Freshes",
      "ru": "Фреши"
    },
    "items": [
      {
        "name": {
          "ka": "ფორთოხლის ფრეში",
          "en": "Fresh orange",
          "ru": "Фреш апельсин"
        },
        "price": 13
      },
      {
        "name": {
          "ka": "გრეიფრუტის ფრეში",
          "en": "Fresh grapefruit",
          "ru": "Фреш грейпфрут"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "ფრეში მიქსი",
          "en": "Fresh mix",
          "ru": "Фреш микс"
        },
        "price": 14
      }
    ]
  },
  {
    "name": {
      "ka": "მილქშეიკები",
      "en": "Milkshakes",
      "ru": "Молочные коктейли"
    },
    "items": [
      {
        "name": {
          "ka": "ვანილი",
          "en": "Vanilla",
          "ru": "Ванильный"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "მარწყვი",
          "en": "Strawberry",
          "ru": "Клубничный"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "მაუგლი",
          "en": "Mowgli",
          "ru": "Маугли"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "ჩარლი და შოკოლადის ქარხანა",
          "en": "Charlie and the Chocolate Factory",
          "ru": "Чарли и шоколадная фабрика"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "ქოქოსის კუნძული",
          "en": "Coconut island",
          "ru": "Кокосовый остров"
        },
        "price": 15
      }
    ]
  },
  {
    "name": {
      "ka": "მოქტეილები",
      "en": "Mocktails",
      "ru": "Б/а коктейли"
    },
    "items": [
      {
        "name": {
          "ka": "პინა კოლადა",
          "en": "Non-alco Pina Colada",
          "ru": "б.а Пина колада"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "მოხიტო",
          "en": "Non-alco Mojito",
          "ru": "б.а Мохито"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "ბლადი მერი",
          "en": "Bloody Mary Non-Alco",
          "ru": "б.а Кровавая Мэри"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "გლინტვეინი",
          "en": "Non-alco mulled wine",
          "ru": "б.а Глинтвейн"
        },
        "price": 10
      }
    ]
  },
  {
    "name": {
      "ka": "ლიმონათები",
      "en": "Lemonades",
      "ru": "Лимонады"
    },
    "items": [
      {
        "name": {
          "ka": "ლიმონათი მჟაუნა&ტარხუნა",
          "en": "Lemonade sorrel&tarragon",
          "ru": "Лимонад щавель&тархун"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "ლიმონათი ფორთოხლით&იმბირით",
          "en": "Lemonade Ginger&Orange",
          "ru": "Лимонад апельсин&имбирь"
        },
        "price": 22
      },
      {
        "name": {
          "ka": "ლიმონათი ჟოლო&როზმარინი",
          "en": "Lemonade Rassberry&Rosmary",
          "ru": "Лимонад малина&розмарин"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "ლიმონათი",
          "en": "Lemonade",
          "ru": "Лимонад"
        },
        "price": 9
      },
      {
        "name": {
          "ka": "LAPOCHKA",
          "en": "LAPOCHKA",
          "ru": "LAPOCHKA"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "Sprite",
          "en": "Sprite",
          "ru": "Sprite"
        },
        "price": 5
      },
      {
        "name": {
          "ka": "Fanta",
          "en": "Fanta",
          "ru": "Fanta"
        },
        "price": 5
      },
      {
        "name": {
          "ka": "Coca-Cola",
          "en": "Coca-Cola",
          "ru": "Coca-Cola"
        },
        "price": 5
      },
      {
        "name": {
          "ka": "Burn",
          "en": "Burn",
          "ru": "Burn"
        },
        "price": 5
      },
      {
        "name": {
          "ka": "Schweppes",
          "en": "Schweppes",
          "ru": "Schweppes"
        },
        "price": 6
      },
      {
        "name": {
          "ka": "Britvic Indian Tonic",
          "en": "Britvic Indian Tonic",
          "ru": "Britvic Indian Tonic"
        },
        "price": 9
      }
    ]
  },
  {
    "name": {
      "ka": "ლუდის სნეკები",
      "en": "Beer Snacks",
      "ru": "Закуски к пиву"
    },
    "items": [
      {
        "name": {
          "ka": "არაქისი",
          "en": "Peanut",
          "ru": "Арахис"
        },
        "price": 9
      },
      {
        "name": {
          "ka": "ღორის ჯერქი",
          "en": "Pork snacks",
          "ru": "Снеки свиные"
        },
        "price": 13
      },
      {
        "name": {
          "ka": "ქათმის ჯერქი",
          "en": "Chicken snacks",
          "ru": "Снеки куриные"
        },
        "price": 13
      }
    ]
  },
  {
    "name": {
      "ka": "ლუდი",
      "en": "Beer",
      "ru": "Пиво"
    },
    "items": [
      {
        "name": {
          "ka": "ნატახტარი დრაფტი",
          "en": "Natakhtari Draft",
          "ru": "Натахтари draft"
        },
        "price": 8
      },
      {
        "name": {
          "ka": "Lowenbräu",
          "en": "Lowenbräu",
          "ru": "Lowenbräu"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "Heidegger Hell",
          "en": "Heidegger Hell",
          "ru": "Heidegger Hell"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "Taati draft",
          "en": "Taati draft",
          "ru": "Taati draft"
        },
        "price": 11
      },
      {
        "name": {
          "ka": "Corona",
          "en": "Corona",
          "ru": "Corona"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "B day lager",
          "en": "B day lager",
          "ru": "B day lager"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Easy Pils non alko",
          "en": "Easy Pils non alko",
          "ru": "Easy Pils non alko"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Easy hops IPA non alko",
          "en": "Easy hops IPA non alko",
          "ru": "Easy hops IPA non alko"
        },
        "price": 21
      },
      {
        "name": {
          "ka": "Crystals of love, n.a. sour",
          "en": "Crystals of love, n.a. sour",
          "ru": "Crystals of love, n.a. sour"
        },
        "price": 24
      },
      {
        "name": {
          "ka": "Brainstorm APA n/a",
          "en": "Brainstorm APA n/a",
          "ru": "Brainstorm APA n/a"
        },
        "price": 17
      }
    ]
  },
  {
    "name": {
      "ka": "გაუფილტრავი ხორბლის ლუდი",
      "en": "Unfiltered wheat beer",
      "ru": "Нефильтрованное пшеничное"
    },
    "items": [
      {
        "name": {
          "ka": "Milk of Amnesia (Milkshake IPA)",
          "en": "Milk of Amnesia (Milkshake IPA)",
          "ru": "Milk of Amnesia (Milkshake IPA)"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Voyage Blanche, ostrovica",
          "en": "Voyage Blanche, ostrovica",
          "ru": "Voyage Blanche, ostrovica"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "AUSWEIS",
          "en": "AUSWEIS",
          "ru": "AUSWEIS"
        },
        "price": 15
      }
    ]
  },
  {
    "name": {
      "ka": "IPA/APA",
      "en": "IPA/APA",
      "ru": "ИПА/АПА"
    },
    "items": [
      {
        "name": {
          "ka": "Ostrovica IPA",
          "en": "Ostrovica IPA",
          "ru": "Ostrovica IPA"
        },
        "price": 22
      },
      {
        "name": {
          "ka": "Ostrovica New england IPA",
          "en": "Ostrovica New england IPA",
          "ru": "Ostrovica New england IPA"
        },
        "price": 26
      },
      {
        "name": {
          "ka": "Session IPA",
          "en": "Session IPA",
          "ru": "Session IPA"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "FRIDAY AVENUE APA",
          "en": "FRIDAY AVENUE APA",
          "ru": "FRIDAY AVENUE APA"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "Too cool to fly",
          "en": "Too cool to fly",
          "ru": "Too cool to fly"
        },
        "price": 30
      },
      {
        "name": {
          "ka": "Voyage ESB",
          "en": "Voyage ESB",
          "ru": "Voyage ESB"
        },
        "price": 26
      },
      {
        "name": {
          "ka": "Replica:Talus N.E. IPA",
          "en": "Replica:Talus N.E. IPA",
          "ru": "Replica:Talus N.E. IPA"
        },
        "price": 29
      },
      {
        "name": {
          "ka": "Ostrovica DIPA",
          "en": "Ostrovica DIPA",
          "ru": "Ostrovica DIPA"
        },
        "price": 24
      }
    ]
  },
  {
    "name": {
      "ka": "დარკ სტაუტი",
      "en": "Dark stout beer",
      "ru": "Стаут / Тёмное"
    },
    "items": [
      {
        "name": {
          "ka": "Chocolate stout",
          "en": "Chocolate stout",
          "ru": "Chocolate stout"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "Nightcap barleyywine",
          "en": "Nightcap barleyywine",
          "ru": "Nightcap barleyywine"
        },
        "price": 29
      }
    ]
  },
  {
    "name": {
      "ka": "სიდრი",
      "en": "Cider",
      "ru": "Сидр"
    },
    "items": [
      {
        "name": {
          "ka": "სიდრი",
          "en": "Cider №3(п",
          "ru": "Сидр / сл)"
        },
        "price": 20
      },
      {
        "name": {
          "ka": "სიდრი",
          "en": "Cider №2",
          "ru": "Сидр"
        },
        "price": 21
      },
      {
        "name": {
          "ka": "Неправильный мёд",
          "en": "Неправильный мёд",
          "ru": "Неправильный мёд"
        },
        "price": 15
      }
    ]
  },
  {
    "name": {
      "ka": "ხილის ლუდი",
      "en": "Fruit beer",
      "ru": "Фруктовое"
    },
    "items": [
      {
        "name": {
          "ka": "Кислота Grapefruit",
          "en": "Кислота Grapefruit",
          "ru": "Кислота Grapefruit"
        },
        "price": 28
      },
      {
        "name": {
          "ka": "Giraffe Milk)",
          "en": "Giraffe Milk)",
          "ru": "Giraffe Milk)"
        },
        "price": 30
      },
      {
        "name": {
          "ka": "Ути-Пути",
          "en": "Ути-Пути",
          "ru": "Ути-Пути"
        },
        "price": 29
      },
      {
        "name": {
          "ka": "Ruby Garden",
          "en": "Ruby Garden",
          "ru": "Ruby Garden"
        },
        "price": 24
      },
      {
        "name": {
          "ka": "Ruby Road",
          "en": "Ruby Road",
          "ru": "Ruby Road"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "Cherry Ale",
          "en": "Cherry Ale",
          "ru": "Cherry Ale"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "Banana&Pineapple",
          "en": "Banana&Pineapple",
          "ru": "Banana&Pineapple"
        },
        "price": 29
      },
      {
        "name": {
          "ka": "Banana&Strawberry",
          "en": "Banana&Strawberry",
          "ru": "Banana&Strawberry"
        },
        "price": 29
      },
      {
        "name": {
          "ka": "Banana&Passion",
          "en": "Banana&Passion",
          "ru": "Banana&Passion"
        },
        "price": 29
      },
      {
        "name": {
          "ka": "Mango smoothie",
          "en": "Mango smoothie",
          "ru": "Mango smoothie"
        },
        "price": 29
      }
    ]
  },
  {
    "name": {
      "ka": "გოზე",
      "en": "tomato beer",
      "ru": "Томатное / гозе"
    },
    "items": [
      {
        "name": {
          "ka": "За лисички поясняем в личке",
          "en": "За лисички поясняем в личке",
          "ru": "За лисички поясняем в личке"
        },
        "price": 24
      },
      {
        "name": {
          "ka": "Зависимость Болгарский перец",
          "en": "Зависимость Болгарский перец",
          "ru": "Зависимость Болгарский перец"
        },
        "price": 29
      },
      {
        "name": {
          "ka": "Зависимость Зелёные оливки",
          "en": "Зависимость Зелёные оливки",
          "ru": "Зависимость Зелёные оливки"
        },
        "price": 28
      },
      {
        "name": {
          "ka": "Зависимость Халапеньо",
          "en": "Зависимость Халапеньо",
          "ru": "Зависимость Халапеньо"
        },
        "price": 28
      },
      {
        "name": {
          "ka": "Острая зависимость",
          "en": "Острая зависимость",
          "ru": "Острая зависимость"
        },
        "price": 29
      },
      {
        "name": {
          "ka": "Грибы Судьбы",
          "en": "Грибы Судьбы",
          "ru": "Грибы Судьбы"
        },
        "price": 28
      },
      {
        "name": {
          "ka": "Том Ям мастер драм",
          "en": "Том Ям мастер драм",
          "ru": "Том Ям мастер драм"
        },
        "price": 30
      },
      {
        "name": {
          "ka": "Не кричи на кимчи",
          "en": "Не кричи на кимчи",
          "ru": "Не кричи на кимчи"
        },
        "price": 29
      }
    ]
  },
  {
    "name": {
      "ka": "კოქტეილები",
      "en": "Cocktails",
      "ru": "Коктейли"
    },
    "items": [
      {
        "name": {
          "ka": "Penicilin",
          "en": "Penicilin",
          "ru": "Penicilin"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Manhattan",
          "en": "Manhattan",
          "ru": "Manhattan"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "Boston Tea",
          "en": "Boston Tea",
          "ru": "Boston Tea"
        },
        "price": 31
      },
      {
        "name": {
          "ka": "Screwdriver / Otvertka",
          "en": "Screwdriver / Otvertka",
          "ru": "Screwdriver / Otvertka"
        },
        "price": 11
      },
      {
        "name": {
          "ka": "Vodka martini",
          "en": "Vodka martini",
          "ru": "Vodka martini"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "Gin&Tonic",
          "en": "Gin&Tonic",
          "ru": "Gin&Tonic"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "Michelada",
          "en": "Michelada",
          "ru": "Michelada"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "Old Fashion",
          "en": "Old Fashion",
          "ru": "Old Fashion"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Moscow mule",
          "en": "Moscow mule",
          "ru": "Moscow mule"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Cuba Libre",
          "en": "Cuba Libre",
          "ru": "Cuba Libre"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "Aperol Spritz",
          "en": "Aperol Spritz",
          "ru": "Aperol Spritz"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "White Russian",
          "en": "White Russian",
          "ru": "White Russian"
        },
        "price": 20
      },
      {
        "name": {
          "ka": "Dry martini",
          "en": "Dry martini",
          "ru": "Dry martini"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "Dark&Stormy",
          "en": "Dark&Stormy",
          "ru": "Dark&Stormy"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "Tomi D sour",
          "en": "Tomi D sour",
          "ru": "Tomi D sour"
        },
        "price": 21
      },
      {
        "name": {
          "ka": "Negroni",
          "en": "Negroni",
          "ru": "Negroni"
        },
        "price": 22
      },
      {
        "name": {
          "ka": "Espresso martini",
          "en": "Espresso martini",
          "ru": "Espresso martini"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "Mojito",
          "en": "Mojito",
          "ru": "Mojito"
        },
        "price": 21
      },
      {
        "name": {
          "ka": "White lady",
          "en": "White lady",
          "ru": "White lady"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "Jackie Cola",
          "en": "Jackie Cola",
          "ru": "Jackie Cola"
        },
        "price": 20
      },
      {
        "name": {
          "ka": "Margarita",
          "en": "Margarita",
          "ru": "Margarita"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Old cuban",
          "en": "Old cuban",
          "ru": "Old cuban"
        },
        "price": 22
      },
      {
        "name": {
          "ka": "Apple Gin & Tonic",
          "en": "Apple Gin & Tonic",
          "ru": "Apple Gin & Tonic"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "Boulevider",
          "en": "Boulevider",
          "ru": "Boulevider"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "Martini royal",
          "en": "Martini royal",
          "ru": "Martini royal"
        },
        "price": 24
      },
      {
        "name": {
          "ka": "Aperol Sour",
          "en": "Aperol Sour",
          "ru": "Aperol Sour"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Pina Colada",
          "en": "Pina Colada",
          "ru": "Pina Colada"
        },
        "price": 20
      },
      {
        "name": {
          "ka": "Bloody Mary",
          "en": "Bloody Mary",
          "ru": "Bloody Mary"
        },
        "price": 17
      },
      {
        "name": {
          "ka": "Sorrel sour",
          "en": "Sorrel sour",
          "ru": "Sorrel sour"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "Southside",
          "en": "Southside",
          "ru": "Southside"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "Tequila Sunrise",
          "en": "Tequila Sunrise",
          "ru": "Tequila Sunrise"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Dirty martini",
          "en": "Dirty martini",
          "ru": "Dirty martini"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Brendy Alexsander",
          "en": "Brendy Alexsander",
          "ru": "Brendy Alexsander"
        },
        "price": 21
      },
      {
        "name": {
          "ka": "Daiquiri",
          "en": "Daiquiri",
          "ru": "Daiquiri"
        },
        "price": 17
      },
      {
        "name": {
          "ka": "Whiskey Sour",
          "en": "Whiskey Sour",
          "ru": "Whiskey Sour"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "Clover club",
          "en": "Clover club",
          "ru": "Clover club"
        },
        "price": 19
      },
      {
        "name": {
          "ka": "Porn Star Martini",
          "en": "Porn Star Martini",
          "ru": "Porn Star Martini"
        },
        "price": 22
      },
      {
        "name": {
          "ka": "Vodka with Burn",
          "en": "Vodka with Burn",
          "ru": "Vodka with Burn"
        },
        "price": 11
      },
      {
        "name": {
          "ka": "Gin sour",
          "en": "Gin sour",
          "ru": "Gin sour"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "French 75",
          "en": "French 75",
          "ru": "French 75"
        },
        "price": 18
      },
      {
        "name": {
          "ka": "Long Island",
          "en": "Long Island",
          "ru": "Long Island"
        },
        "price": 25
      },
      {
        "name": {
          "ka": "Dry daiquiri",
          "en": "Dry daiquiri",
          "ru": "Dry daiquiri"
        },
        "price": 19
      }
    ]
  },
  {
    "name": {
      "ka": "ღვინო",
      "en": "Wine",
      "ru": "Вино"
    },
    "items": [
      {
        "name": {
          "ka": "თეთრი გლინტვეინი",
          "en": "White mulled wine",
          "ru": "Глинтвейн белый"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "150ml, 6000 winery Manavi dry white",
          "en": "150ml, 6000 winery Manavi dry white",
          "ru": "150ml, 6000 winery Manavi dry white"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "150ml, Pinot Grigio DOC Venezie, Italia",
          "en": "150ml, Pinot Grigio DOC Venezie, Italia",
          "ru": "150ml, Pinot Grigio DOC Venezie, Italia"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "draft Rkatsiteli, 150ml",
          "en": "draft Rkatsiteli, 150ml",
          "ru": "draft Rkatsiteli, 150ml"
        },
        "price": 7
      },
      {
        "name": {
          "ka": "150ml, Tvishi semi-sweet white, Teliani Valley",
          "en": "150ml, Tvishi semi-sweet white, Teliani Valley",
          "ru": "150ml, Tvishi semi-sweet white, Teliani Valley"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "150ml, 6000 winery Mtsvane semy-sweet",
          "en": "150ml, 6000 winery Mtsvane semy-sweet",
          "ru": "150ml, 6000 winery Mtsvane semy-sweet"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "წითელი გლინტვეინი",
          "en": "Red mulled wines",
          "ru": "Глинтвейн красный"
        },
        "price": 15
      },
      {
        "name": {
          "ka": "150ml, 6000 winery Saperavi dry red",
          "en": "150ml, 6000 winery Saperavi dry red",
          "ru": "150ml, 6000 winery Saperavi dry red"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "draft Saperavi, 150ml",
          "en": "draft Saperavi, 150ml",
          "ru": "draft Saperavi, 150ml"
        },
        "price": 7
      },
      {
        "name": {
          "ka": "150ml, Kindzmarauli semi-sweet,Tеliani Valley",
          "en": "150ml, Kindzmarauli semi-sweet,Tеliani Valley",
          "ru": "150ml, Kindzmarauli semi-sweet,Tеliani Valley"
        },
        "price": 13
      },
      {
        "name": {
          "ka": "draft Kindzmarauli, 150ml",
          "en": "draft Kindzmarauli, 150ml",
          "ru": "draft Kindzmarauli, 150ml"
        },
        "price": 9
      },
      {
        "name": {
          "ka": "150 ml, Red Label Wine",
          "en": "150 ml, Red Label Wine",
          "ru": "150 ml, Red Label Wine"
        },
        "price": 13
      },
      {
        "name": {
          "ka": "150 ml, Pinot Nero DOC Venezial Italia",
          "en": "150 ml, Pinot Nero DOC Venezial Italia",
          "ru": "150 ml, Pinot Nero DOC Venezial Italia"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "150ml, La tordera Alne Prosecco DOC X-Dry, Italia",
          "en": "150ml, La tordera Alne Prosecco DOC X-Dry, Italia",
          "ru": "150ml, La tordera Alne Prosecco DOC X-Dry, Italia"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "150ml, The Deer Prosecco Gran Cuvee, Italia",
          "en": "150ml, The Deer Prosecco Gran Cuvee, Italia",
          "ru": "150ml, The Deer Prosecco Gran Cuvee, Italia"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "Pedro Ximénez Nectar, Spain",
          "en": "Pedro Ximénez Nectar, Spain",
          "ru": "Pedro Ximénez Nectar, Spain"
        },
        "price": 18
      }
    ]
  },
  {
    "name": {
      "ka": "ბოთლები",
      "en": "Bottle",
      "ru": "По бутылкам"
    },
    "items": [
      {
        "name": {
          "ka": "750 ml, Red Label Wine",
          "en": "750 ml, Red Label Wine",
          "ru": "750 ml, Red Label Wine"
        },
        "price": 55
      },
      {
        "name": {
          "ka": "750ml, Kindzmarauli, semi-sweet, Tеliani Valley",
          "en": "750ml, Kindzmarauli, semi-sweet, Tеliani Valley",
          "ru": "750ml, Kindzmarauli, semi-sweet, Tеliani Valley"
        },
        "price": 55
      },
      {
        "name": {
          "ka": "750ml, Pinot Nero DOC Venezia",
          "en": "750ml, Pinot Nero DOC Venezia",
          "ru": "750ml, Pinot Nero DOC Venezia"
        },
        "price": 65
      },
      {
        "name": {
          "ka": "750 ml, Pinot Grigio DOC Venezie",
          "en": "750 ml, Pinot Grigio DOC Venezie",
          "ru": "750 ml, Pinot Grigio DOC Venezie"
        },
        "price": 65
      },
      {
        "name": {
          "ka": "750ml, Tvishi, semi-sweet white, Teliani Valley",
          "en": "750ml, Tvishi, semi-sweet white, Teliani Valley",
          "ru": "750ml, Tvishi, semi-sweet white, Teliani Valley"
        },
        "price": 70
      },
      {
        "name": {
          "ka": "750ml, The Deer Prosecco Gran Cuvee, Italia",
          "en": "750ml, The Deer Prosecco Gran Cuvee, Italia",
          "ru": "750ml, The Deer Prosecco Gran Cuvee, Italia"
        },
        "price": 62
      },
      {
        "name": {
          "ka": "750ml, La tordera Alne Prosecco DOC X-Dry, Italia",
          "en": "750ml, La tordera Alne Prosecco DOC X-Dry, Italia",
          "ru": "750ml, La tordera Alne Prosecco DOC X-Dry, Italia"
        },
        "price": 70
      }
    ]
  },
  {
    "name": {
      "ka": "შოტები",
      "en": "Shots",
      "ru": "Шоты"
    },
    "items": [
      {
        "name": {
          "ka": "Lemon Liqueur",
          "en": "Lemon Liqueur",
          "ru": "Lemon Liqueur"
        },
        "price": 8
      },
      {
        "name": {
          "ka": "Raspberry Liqueur",
          "en": "Raspberry Liqueur",
          "ru": "Raspberry Liqueur"
        },
        "price": 8
      },
      {
        "name": {
          "ka": "В-52",
          "en": "В-52",
          "ru": "В-52"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "ბუქარესტი",
          "en": "Bucharest",
          "ru": "Бухарест"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "ბოიარსკი",
          "en": "Boyarsky",
          "ru": "Боярский"
        },
        "price": 11
      }
    ]
  },
  {
    "name": {
      "ka": "ვისკი",
      "en": "Whiskey",
      "ru": "Виски"
    },
    "items": [
      {
        "name": {
          "ka": "whisky Grant's",
          "en": "whisky Grant's",
          "ru": "whisky Grant's"
        },
        "price": 10
      },
      {
        "name": {
          "ka": "whisky Jameson",
          "en": "whisky Jameson",
          "ru": "whisky Jameson"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "whisky Jack Daniels",
          "en": "whisky Jack Daniels",
          "ru": "whisky Jack Daniels"
        },
        "price": 17
      },
      {
        "name": {
          "ka": "whisky Monkey Shoulder",
          "en": "whisky Monkey Shoulder",
          "ru": "whisky Monkey Shoulder"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "whisky Glenmorangie",
          "en": "whisky Glenmorangie",
          "ru": "whisky Glenmorangie"
        },
        "price": 23
      },
      {
        "name": {
          "ka": "bourbon Jim beam",
          "en": "bourbon Jim beam",
          "ru": "bourbon Jim beam"
        },
        "price": 15
      }
    ]
  },
  {
    "name": {
      "ka": "ლიქიორები",
      "en": "Liqueurs",
      "ru": "Ликёры"
    },
    "items": [
      {
        "name": {
          "ka": "Limoncello",
          "en": "Limoncello",
          "ru": "Limoncello"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "Baileys",
          "en": "Baileys",
          "ru": "Baileys"
        },
        "price": 11
      },
      {
        "name": {
          "ka": "Kahlúa",
          "en": "Kahlúa",
          "ru": "Kahlúa"
        },
        "price": 14
      },
      {
        "name": {
          "ka": "Jagermeister",
          "en": "Jagermeister",
          "ru": "Jagermeister"
        },
        "price": 13
      },
      {
        "name": {
          "ka": "Aperol",
          "en": "Aperol",
          "ru": "Aperol"
        },
        "price": 11
      },
      {
        "name": {
          "ka": "Triple Sec",
          "en": "Triple Sec",
          "ru": "Triple Sec"
        },
        "price": 14
      }
    ]
  },
  {
    "name": {
      "ka": "ალკოჰოლი",
      "en": "Alcohol",
      "ru": "Алкоголь"
    },
    "items": [
      {
        "name": {
          "ka": "Cacha smoked Goldsmith",
          "en": "Cacha smoked Goldsmith",
          "ru": "Cacha smoked Goldsmith"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "Gin Barrister",
          "en": "Gin Barrister",
          "ru": "Gin Barrister"
        },
        "price": 11
      },
      {
        "name": {
          "ka": "tequila Sauza silver",
          "en": "tequila Sauza silver",
          "ru": "tequila Sauza silver"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "Cha cha (Oak Aged)",
          "en": "Cha cha (Oak Aged)",
          "ru": "Cha cha (Oak Aged)"
        },
        "price": 7
      },
      {
        "name": {
          "ka": "St-Rémy",
          "en": "St-Rémy",
          "ru": "St-Rémy"
        },
        "price": 16
      },
      {
        "name": {
          "ka": "vodka Danzka",
          "en": "vodka Danzka",
          "ru": "vodka Danzka"
        },
        "price": 8
      },
      {
        "name": {
          "ka": "vodka Tundra",
          "en": "vodka Tundra",
          "ru": "vodka Tundra"
        },
        "price": 6
      },
      {
        "name": {
          "ka": "Cha cha (classic)",
          "en": "Cha cha (classic)",
          "ru": "Cha cha (classic)"
        },
        "price": 7
      },
      {
        "name": {
          "ka": "gin Barrister wild berry&fruits",
          "en": "gin Barrister wild berry&fruits",
          "ru": "gin Barrister wild berry&fruits"
        },
        "price": 12
      },
      {
        "name": {
          "ka": "rum Spiced",
          "en": "rum Spiced",
          "ru": "rum Spiced"
        },
        "price": 11
      },
      {
        "name": {
          "ka": "tequila Patron",
          "en": "tequila Patron",
          "ru": "tequila Patron"
        },
        "price": 31
      },
      {
        "name": {
          "ka": "rum White",
          "en": "rum White",
          "ru": "rum White"
        },
        "price": 11
      }
    ]
  }
];
