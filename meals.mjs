
const mealsData = `
      🇮🇹: Lasagna: ひき肉, mozarella
      🍗: Legendary chicken: chicken, potatoes, さつまいも, carrots
      🥩: Beef stew: potatoes, carrots, red wine
      🥩: Lamb stew: potatoes, carrots, red wine
      🍽: Stuffed zucchini: zucchini, sausage, tomatoes
      🍽: Stuffed peppers: ピーマン, ひき肉
      🍔: Hamburgers: ひき肉, tomatoes, lettuce, avocados, mushrooms
      🍗: Chicken saute chaucer: chicken, mushrooms, tomatoes, white wine
      🥧: Chicken pot pie: potatoes, celery, carrots
      🇲🇽: Quesadillas: cheese, パプリカ, chicken
      🌮: Tacos: ひき肉, tomatoes, avocados, cheese
      🥗: Salad: cheese, avocados, tomatoes, lettuce, cucumbers
      🍲: Lentil soup, bread, and salad: celery, carrots
      🍲: Chicken noodle soup, bread, and salad: celery, carrots
      🍲: Lentil spinach soup, bread, and salad: spinach
      🍲: Potato pepper soup: potatoes, パプリカ, sausage, cream
      🍲: Pumpkin soup: pumpkin
      🫓: Hummus
      🥚: Omelette: mushrooms, cheese, tomatoes, ピーマン
      🍽: Polenta: パプリカ, spinach, tomatoes
      🍕: Pizza: tomatoes, mozarella, ピーマン, salami
      🐟: サバ, rice, and veggies
      🐟: サンマ, rice, and veggies
      🍲: そば: 長ネギ
      🍲: うどん: 長ネギ
      🍜: ラーメン
      🍽: Dipping noodles
      🇯🇵: 肉じゃが: ひき肉, potatoes, carrots
      🥚: オムラース: eggs
      🍗: Roasted chicken: chicken, さつまいも, potatoes
      🇨🇳: チャハン and 餃子
      🍣: 手巻き寿司: cucumbers, avocados
      🇯🇵: みそ dip and veggies: carrots, cucumbers, 大根
      🍛: Curry: chicken, potatoes, carrots, mushrooms
      🇯🇵: ゴマほうれん草: spinach
      🥗: ラーメンサラダ: cucumbers
      🍢: おでん: 大根
      🍲: なべ: 白菜, mushrooms
      🇰🇷: キムチ soup
      🍚: 三色丼 (Avocado Sashimi Mozarella): avocados, mozarella
      🍚: 三色丼 (Spinach egg ひき肉): eggs, spinach, ひき肉
      🍝: Spinach bacon pasta: spinach, bacon, cream
      🍝: Cabbage pasta: cabbage
      🍝: Pasta primavera: asparagus, squash, zucchini, mushrooms, tomatoes, white wine
      🇯🇵: 焼きそば: cabbage, carrots
      🇰🇷: チヂミ Korean pancake thing
      🇫🇷: Galettes: eggs, tomatoes
      🇨🇳: マーボドフ: tofu, ひき肉
      🍆: Eggplant parm: eggplant
      🎃: Pumpkin and つくね stew: pumpkin, ひき肉
      🧆: Falafel
      🇨🇳: マーボーなす: eggplant
      🥧: Sheperd's Pie: potatoes, ひき肉, carrots
      🍽: Casserole: cream, cheese, carrots
      🍽: Gratin
 `;

// Convert plain-text list of meals into Javascript object [ {name: "foo", ingredients: new Set(["a", "b"])}, ... ].
export const meals = mealsData.split("\n").map(line => line.trim()).filter(line => line).map(line => {
  const [icon, name, ingredients] = line.split(/: */);
  return {icon, name, ingredients: new Set(ingredients?.split(/, */) ?? [])};
}).sort((a, b) => {
  return a.name > b.name ? 1 : -1;
});

// Data consistency checking.
// I used to extract the ingredients from meals.mjs, but I made a dedicated ingredients.mjs so I could add icons.
import { ingredients } from "./ingredients.mjs";
const ingredients2 = new Set(meals.flatMap(meal => Array.from(meal.ingredients)));
const missingIngredients = ingredients2.difference(new Set(Array.from(ingredients).map(ingredient => ingredient.name)));
if (missingIngredients.size > 0) {
  console.warn("Ingredients in meals.mjs not in ingredients.mjs:", missingIngredients);
}
