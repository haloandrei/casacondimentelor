export type Category = 'Toate' | 'Deserturi' | 'Mic dejun' | 'Ingrediente'

export type Product = {
  id: string
  brand: string
  name: string
  subtitle: string
  category: Exclude<Category, 'Toate'>
  size: string
  image: string
  source: string
  note: string
  tag?: string
}

const asset = (file: string) => `${import.meta.env.BASE_URL}images/products/${file}`

export const products: Product[] = [
  {
    id: 'gits-gulab-jamun',
    brand: 'Gits',
    name: 'Gulab Jamun Mix',
    subtitle: 'Un desert indian îndrăgit, pregătit acasă.',
    category: 'Deserturi',
    size: '200 g',
    image: asset('gits-gulab-jamun.jpg'),
    source: 'https://international.gitsfood.com/product/gulab-jamun/',
    note: 'Verifică ingredientele și alergenii de pe ambalaj înainte de consum.',
    tag: 'De descoperit',
  },
  {
    id: 'gits-uttapam',
    brand: 'Gits',
    name: 'Uttapam Mix',
    subtitle: 'Inspirație pentru un mic dejun în stil sud-indian.',
    category: 'Mic dejun',
    size: '200 g',
    image: asset('gits-uttapam.jpg'),
    source: 'https://international.gitsfood.com/product/uttapam/',
    note: 'Verifică ingredientele și alergenii de pe ambalaj înainte de consum.',
  },
  {
    id: 'patanjali-cow-ghee',
    brand: 'Patanjali',
    name: "Cow's Ghee",
    subtitle: 'Un ingredient clasic pentru preparatele indiene.',
    category: 'Ingrediente',
    size: '200 ml',
    image: asset('patanjali-cow-ghee.webp'),
    source: 'https://www.patanjaliayurved.net/product/natural-health-care/ghee/cows-ghee-200-ml/962',
    note: 'Conține lapte. Verifică eticheta produsului înainte de consum.',
  },
]

export const categories: Category[] = ['Toate', 'Deserturi', 'Mic dejun', 'Ingrediente']
