import { CampaignState } from '../types/map';

export const INITIAL_CAMPAIGN: CampaignState = {
  "version": 2,
  "name": "Fallout: Equestria - Tactical War Map",
  "themeAccent": "#22c55e",
  "gridSettings": {
    "cellSize": 19,
    "opacity": 0.22,
    "color": "#22c55e",
    "showGrid": true,
    "showCoordinates": false,
    "showTerritoryOnly": false
  },
  "lastUpdated": "2026-11-04T01:33:54.327Z",
  "octagons": {
    "47_45": {
      "id": "47_45",
      "col": 47,
      "row": 45,
      "cx": 902.5,
      "cy": 864.5,
      "type": "solid",
      "fillColor": "#10b981",
      "isKeyLocation": true,
      "keyLocationData": {
        "title": "Новый Кантерлот (Столица NCR)",
        "description": "Главный политический и индустриальный центр республики. Мощный гарнизон, развитая энергетическая сеть и штаб командования.",
        "faction": "New Canterlot Republic (NCR)",
        "dangerLevel": "safe",
        "tradeResource": "Энергоблоки, Медикаменты, Провизия",
        "imageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80"
      }
    },
    "48_45": {
      "id": "48_45",
      "col": 48,
      "row": 45,
      "cx": 921.5,
      "cy": 864.5,
      "type": "solid",
      "fillColor": "#10b981"
    },
    "47_46": {
      "id": "47_46",
      "col": 47,
      "row": 46,
      "cx": 902.5,
      "cy": 883.5,
      "type": "solid",
      "fillColor": "#10b981"
    },
    "46_45": {
      "id": "46_45",
      "col": 46,
      "row": 45,
      "cx": 883.5,
      "cy": 864.5,
      "type": "solid",
      "fillColor": "#10b981"
    },
    "46_46": {
      "id": "46_46",
      "col": 46,
      "row": 46,
      "cx": 883.5,
      "cy": 883.5,
      "type": "solid",
      "fillColor": "#10b981"
    },
    "45_41": {
      "id": "45_41",
      "col": 45,
      "row": 41,
      "cx": 864.5,
      "cy": 788.5,
      "type": "trade_arrow",
      "arrowDirection": 315,
      "fillColor": "#f59e0b",
      "isKeyLocation": true,
      "keyLocationData": {
        "title": "Северный Караванный Тракт",
        "description": "Главная торговая артерия между Кантерлотом и Долиной. Охраняется наемниками Aqua Fria от рейдеров.",
        "faction": "Aqua Fria Merc. C",
        "dangerLevel": "medium",
        "tradeResource": "Караваны с рудой и зерном",
        "imageUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80"
      }
    },
    "43_39": {
      "id": "43_39",
      "col": 43,
      "row": 39,
      "cx": 826.5,
      "cy": 750.5,
      "type": "trade_arrow",
      "arrowDirection": 315,
      "fillColor": "#f59e0b"
    },
    "41_37": {
      "id": "41_37",
      "col": 41,
      "row": 37,
      "cx": 788.5,
      "cy": 712.5,
      "type": "trade_arrow",
      "arrowDirection": 270,
      "fillColor": "#f59e0b"
    },
    "55_35": {
      "id": "55_35",
      "col": 55,
      "row": 35,
      "cx": 1054.5,
      "cy": 674.5,
      "type": "alert_red",
      "fillColor": "#ef4444",
      "isKeyLocation": true,
      "keyLocationData": {
        "title": "Укрепрайон Нова Гриффия (Тревога!)",
        "description": "Зона активных артиллерийских обстрелов и столкновения разведрот. Проезд гражданских лиц категорически запрещен.",
        "faction": "Спорная буферная зона",
        "dangerLevel": "critical",
        "imageUrl": "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&auto=format&fit=crop&q=80"
      }
    },
    "56_35": {
      "id": "56_35",
      "col": 56,
      "row": 35,
      "cx": 1073.5,
      "cy": 674.5,
      "type": "alert_red",
      "fillColor": "#ef4444"
    },
    "31_25": {
      "id": "31_25",
      "col": 31,
      "row": 25,
      "cx": 598.5,
      "cy": 484.5,
      "type": "mystery_white",
      "fillColor": "#f8fafc",
      "isKeyLocation": true,
      "keyLocationData": {
        "title": "Аномалия в Белом Заливе (Сектор X)",
        "description": "Неопознанные радиосигналы древнего бункера. По слухам, здесь скрыт довоенный исследовательский комплекс Министерства Магии.",
        "faction": "Неизвестно",
        "dangerLevel": "high",
        "tradeResource": "Древние артефакты, Чертежи",
        "imageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80"
      }
    },
    "25_33": {
      "id": "25_33",
      "col": 25,
      "row": 33,
      "cx": 484.5,
      "cy": 636.5,
      "type": "striped",
      "fillColor": "#8b5cf6",
      "isKeyLocation": true,
      "keyLocationData": {
        "title": "Передовые Ульи Чейнджлингов",
        "description": "Скрытные патрули и шпионские сети. Территория покрыта густым органическим хитином и подземными ходами.",
        "faction": "Changeling Infiltration Corps",
        "dangerLevel": "high",
        "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80"
      }
    },
    "26_33": {
      "id": "26_33",
      "col": 26,
      "row": 33,
      "cx": 503.5,
      "cy": 636.5,
      "type": "striped",
      "fillColor": "#8b5cf6"
    },
    "25_34": {
      "id": "25_34",
      "col": 25,
      "row": 34,
      "cx": 484.5,
      "cy": 655.5,
      "type": "striped",
      "fillColor": "#8b5cf6"
    },
    "67_41": {
      "id": "67_41",
      "col": 67,
      "row": 41,
      "cx": 1282.5,
      "cy": 788.5,
      "type": "transparent",
      "opacity": 0.55,
      "fillColor": "#0ea5e9",
      "isGradient": true,
      "gradientStart": "#0284c7",
      "gradientEnd": "#38bdf8",
      "gradientAngle": 45,
      "isKeyLocation": true,
      "keyLocationData": {
        "title": "Форпост Стальных Рейнджеров (Steel Rangers)",
        "description": "Цитадель в силовой броне. Охраняют высокотехнологичные реликвии и технологическую монополию региона.",
        "faction": "SRV - Neighsada Steel R.",
        "dangerLevel": "medium",
        "tradeResource": "Микросхемы, Патроны, Ремонт брони",
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80"
      }
    }
  },
  "labels": [
    {
      "id": "label-1",
      "text": "NEW CANTERLOT REPUBLIC",
      "x": 760,
      "y": 920,
      "width": 320,
      "fontSize": 20,
      "fontFamily": "Orbitron",
      "color": "#34d399",
      "isBold": true,
      "letterSpacing": 3,
      "backgroundColor": "rgba(6, 78, 59, 0.65)",
      "borderColor": "#059669",
      "borderWidth": 1.5,
      "borderRadius": 4,
      "rotation": 0
    },
    {
      "id": "label-2",
      "text": "БАЗА СТАЛЬНЫХ РЕЙНДЖЕРОВ",
      "x": 1200,
      "y": 840,
      "width": 260,
      "fontSize": 16,
      "fontFamily": "Share Tech Mono",
      "color": "#38bdf8",
      "isBold": true,
      "letterSpacing": 2,
      "backgroundColor": "rgba(12, 74, 110, 0.75)",
      "borderColor": "#0284c7",
      "borderWidth": 1.5,
      "borderRadius": 4,
      "rotation": 0
    },
    {
      "id": "label-3",
      "text": "ВНИМАНИЕ: ЗОНА БОЕВЫХ ДЕЙСТВИЙ",
      "x": 960,
      "y": 630,
      "width": 290,
      "fontSize": 14,
      "fontFamily": "Rajdhani",
      "color": "#f87171",
      "isBold": true,
      "letterSpacing": 2,
      "backgroundColor": "rgba(127, 29, 29, 0.8)",
      "borderColor": "#dc2626",
      "borderWidth": 2,
      "borderRadius": 4,
      "rotation": -5
    }
  ]
};
