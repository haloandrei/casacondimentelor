import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'
import { categories, products, type Category, type Product } from './catalog'

type Selection = Record<string, number>

const STORAGE_KEY = 'casacondimentelor-selection-v1'
const base = import.meta.env.BASE_URL

function loadSelection(): Selection {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Selection
    return Object.fromEntries(
      Object.entries(saved).filter(([id, count]) =>
        products.some((product) => product.id === id) && Number.isInteger(count) && count > 0 && count <= 99,
      ),
    )
  } catch {
    return {}
  }
}

function App() {
  const [category, setCategory] = useState<Category>('Toate')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [selection, setSelection] = useState<Selection>(loadSelection)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection))
  }, [selection])

  useEffect(() => {
    if (!cartOpen && !activeProduct) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCartOpen(false)
        setActiveProduct(null)
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [cartOpen, activeProduct])

  const visibleProducts = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('ro')
    return products.filter((product) => {
      const categoryMatch = category === 'Toate' || product.category === category
      const searchMatch = !term || `${product.brand} ${product.name} ${product.subtitle} ${product.category}`.toLocaleLowerCase('ro').includes(term)
      return categoryMatch && searchMatch
    })
  }, [category, query])

  const selectedProducts = products.filter((product) => selection[product.id])
  const selectedCount = Object.values(selection).reduce((total, count) => total + count, 0)

  const scrollToCatalog = () => {
    setMenuOpen(false)
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  const addProduct = (product: Product) => {
    setSelection((previous) => ({ ...previous, [product.id]: Math.min((previous[product.id] || 0) + 1, 99) }))
    setCartOpen(true)
    setActiveProduct(null)
  }

  const changeCount = (id: string, delta: number) => {
    setSelection((previous) => {
      const next = { ...previous }
      const count = Math.min(Math.max((next[id] || 0) + delta, 0), 99)
      if (count) next[id] = count
      else delete next[id]
      return next
    })
  }

  const copyList = async () => {
    const text = [
      'Lista mea · Casa Condimentelor',
      ...selectedProducts.map((product) => `${selection[product.id]} × ${product.brand} ${product.name} (${product.size})`),
      '',
      'Catalog demonstrativ. Prețurile și disponibilitatea se confirmă înainte de comandă.',
    ].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      window.alert('Copierea nu este disponibilă în acest browser.')
    }
  }

  return (
    <>
      <div className="announcement">
        <Sparkles size={13} aria-hidden="true" />
        <span>O lume de arome, chiar la tine acasă</span>
        <Sparkles size={13} aria-hidden="true" />
      </div>

      <header className="site-header">
        <div className="header-inner page-width">
          <button className="mobile-menu icon-button" type="button" aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="Casa Condimentelor, prima pagină">
            <span className="brand-mark" aria-hidden="true">✦</span>
            <span className="brand-wordmark"><strong>CASA</strong><span>CONDIMENTELOR</span></span>
          </a>
          <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Navigare principală">
            <a href="#catalog" onClick={() => setMenuOpen(false)}>Produse</a>
            <a href="#colectii" onClick={() => setMenuOpen(false)}>Colecții</a>
            <a href="#poveste" onClick={() => setMenuOpen(false)}>Povestea noastră</a>
          </nav>
          <div className="header-actions">
            <button className="icon-button search-trigger" type="button" aria-label="Caută produse" aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); scrollToCatalog() }}><Search size={22} strokeWidth={1.7} /></button>
            <button className="selection-trigger" type="button" aria-label={`Deschide lista mea, ${selectedCount} produse`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={21} strokeWidth={1.7} />
              <span className="selection-label">Lista mea</span>
              <span className="count-badge">{selectedCount}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-image" role="img" aria-label="Boluri cu condimente indiene, lampă din alamă și o pană de păun" style={{ backgroundImage: `url(${base}images/spice-hero.webp)` }} />
          <div className="hero-overlay" />
          <div className="hero-content page-width">
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> DESCOPERĂ GUSTUL INDIEI</span>
              <h1 id="hero-title">Arome care aduc <em>India</em> mai aproape.</h1>
              <p>Condimente, mixuri și ingrediente care transformă fiecare masă într-o poveste. Inspiră-te și pregătește ceva nou.</p>
              <div className="hero-buttons">
                <button className="button button-primary" type="button" onClick={scrollToCatalog}>Explorează produsele <ArrowRight size={17} /></button>
                <a className="text-link" href="#poveste">Descoperă povestea <ArrowUpRight size={17} /></a>
              </div>
            </div>
            <a href="#colectii" className="hero-scroll" aria-label="Mergi la colecții"><span>MAI JOS</span><ArrowDown size={16} /></a>
          </div>
        </section>

        <div className="preview-note"><span className="note-star">✦</span> Catalog demonstrativ · Prețurile și disponibilitatea se confirmă înainte de vânzare <span className="note-star">✦</span></div>

        <section className="collections section page-width" id="colectii" aria-labelledby="collections-title">
          <div className="section-heading">
            <div><span className="eyebrow">PENTRU FIECARE POFTĂ</span><h2 id="collections-title">Explorează după <em>inspirație.</em></h2></div>
            <p>De la un mic dejun sățios la desertul cu care închei o zi bună.</p>
          </div>
          <div className="collection-grid">
            <button className="collection-card collection-desserts" type="button" onClick={() => { setCategory('Deserturi'); scrollToCatalog() }}>
              <span className="collection-number">01 / 03</span>
              <span className="collection-art" aria-hidden="true">✺</span>
              <span className="collection-bottom"><span><small>DULCE ȘI AROMAT</small><strong>Deserturi indiene</strong></span><span className="round-arrow"><ArrowUpRight size={20} /></span></span>
            </button>
            <button className="collection-card collection-breakfast" type="button" onClick={() => { setCategory('Mic dejun'); scrollToCatalog() }}>
              <span className="collection-number">02 / 03</span>
              <span className="collection-art" aria-hidden="true">✳</span>
              <span className="collection-bottom"><span><small>UN ÎNCEPUT BUN</small><strong>Mic dejun</strong></span><span className="round-arrow"><ArrowUpRight size={20} /></span></span>
            </button>
            <button className="collection-card collection-essentials" type="button" onClick={() => { setCategory('Ingrediente'); scrollToCatalog() }}>
              <span className="collection-number">03 / 03</span>
              <span className="collection-art" aria-hidden="true">✦</span>
              <span className="collection-bottom"><span><small>DIN CĂMARA INDIANĂ</small><strong>Ingrediente</strong></span><span className="round-arrow"><ArrowUpRight size={20} /></span></span>
            </button>
          </div>
        </section>

        <section className="catalog-section" id="catalog" aria-labelledby="catalog-title">
          <div className="page-width section">
            <div className="section-heading catalog-heading">
              <div><span className="eyebrow">ALESE PENTRU TINE</span><h2 id="catalog-title">Descoperă <em>produsele.</em></h2></div>
              <p>O primă selecție de arome și ingrediente. Catalogul crește odată cu noi.</p>
            </div>
            <div className="catalog-toolbar">
              <div className="category-tabs" role="group" aria-label="Filtrează produse după categorie">
                {categories.map((item) => <button key={item} type="button" className={category === item ? 'category-tab active' : 'category-tab'} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
              </div>
              <button className="search-toggle" type="button" onClick={() => setSearchOpen(!searchOpen)} aria-expanded={searchOpen}><Search size={17} /> Caută <ChevronRight size={15} /></button>
            </div>
            {searchOpen && <label className="search-field"><Search size={19} /><span className="sr-only">Caută produse</span><input autoFocus type="search" value={query} placeholder="Caută după nume, marcă sau categorie..." onChange={(event) => setQuery(event.target.value)} /><button type="button" aria-label="Șterge căutarea" onClick={() => setQuery('')}><X size={17} /></button></label>}
            <div className="product-grid">
              {visibleProducts.map((product) => <article className="product-card" key={product.id}>
                <button className="product-image-button" type="button" onClick={() => setActiveProduct(product)} aria-label={`Vezi detalii pentru ${product.brand} ${product.name}`}>
                  {product.tag && <span className="product-tag">{product.tag}</span>}
                  <img src={product.image} alt={`Ambalaj ${product.brand} ${product.name}`} loading="lazy" />
                  <span className="image-arrow"><ArrowUpRight size={20} /></span>
                </button>
                <div className="product-meta"><span>{product.brand}</span><span>{product.size}</span></div>
                <div className="product-row"><div><h3>{product.name}</h3><p>{product.subtitle}</p></div><button className="product-add" type="button" onClick={() => addProduct(product)} aria-label={`Adaugă ${product.brand} ${product.name} în lista mea`}><Plus size={21} /></button></div>
              </article>)}
            </div>
            {visibleProducts.length === 0 && <div className="empty-results"><Search size={28} /><h3>Niciun produs găsit</h3><p>Încearcă alt cuvânt sau alege o altă categorie.</p><button className="text-link" type="button" onClick={() => { setQuery(''); setCategory('Toate') }}>Arată toate produsele <ArrowRight size={17} /></button></div>}
            <p className="catalog-footnote">Imaginile arată ambalajele producătorilor. Detaliile de pe etichetă pot varia. Consultă eticheta produsului înainte de consum.</p>
          </div>
        </section>

        <section className="story-section page-width section" id="poveste" aria-labelledby="story-title">
          <div className="story-visual"><div className="story-frame"><img src={`${base}images/brand-poster.png`} alt="Afiș Casa Condimentelor India cu urare de Krishna Janmashtami" loading="lazy" /></div><span className="story-decoration" aria-hidden="true">✦</span></div>
          <div className="story-copy"><span className="eyebrow">BINE AI VENIT LA CASA CONDIMENTELOR</span><h2 id="story-title">Fiecare aromă spune <em>o poveste.</em></h2><div className="ornament" aria-hidden="true">✦ ───── ✦</div><p>Ne inspiră culorile, aromele și bucuria de a găti împreună. Casa Condimentelor adună idei pentru mese care ies din rutina de zi cu zi.</p><p>Acesta este începutul: o selecție de produse și un loc în care să descoperi ce ai vrea să gătești mai departe.</p><button className="button button-outline" type="button" onClick={scrollToCatalog}>Vezi selecția <ArrowRight size={17} /></button></div>
        </section>

        <section className="closing-band"><div className="page-width closing-content"><Heart size={28} strokeWidth={1.5} /><p>Mai mult gust. Mai multe povești. <em>Mai multă bucurie la masă.</em></p><button type="button" onClick={scrollToCatalog}>Descoperă produsele <ArrowRight size={17} /></button></div></section>
      </main>

      <footer className="footer"><div className="page-width footer-main"><div><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true">✦</span><span className="brand-wordmark"><strong>CASA</strong><span>CONDIMENTELOR</span></span></a><p>Un colț de inspirație pentru bucătăria ta.</p></div><div className="footer-links"><div><strong>Explorează</strong><a href="#catalog">Produse</a><a href="#colectii">Colecții</a><a href="#poveste">Povestea noastră</a></div><div><strong>Informații</strong><button type="button" onClick={() => setCartOpen(true)}>Lista mea</button><a href="https://github.com/haloandrei/casacondimentelor" target="_blank" rel="noreferrer">Despre acest preview <ArrowUpRight size={13} /></a></div></div></div><div className="page-width footer-bottom"><span>© {new Date().getFullYear()} Casa Condimentelor. Preview de catalog.</span><span>Lista se salvează doar în acest browser. Nu preluăm comenzi sau date personale.</span></div></footer>

      {activeProduct && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProduct(null) }}><div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-dialog-title"><button className="close-button" type="button" aria-label="Închide detaliile" onClick={() => setActiveProduct(null)}><X size={22} /></button><div className="modal-image"><img src={activeProduct.image} alt={`Ambalaj ${activeProduct.brand} ${activeProduct.name}`} /></div><div className="modal-copy"><span className="eyebrow">{activeProduct.category.toUpperCase()} · {activeProduct.brand.toUpperCase()}</span><h2 id="product-dialog-title">{activeProduct.name}</h2><span className="modal-size">{activeProduct.size}</span><p>{activeProduct.subtitle}</p><div className="product-notice"><strong>Înainte să alegi</strong><span>{activeProduct.note}</span></div><p className="availability">Prețul și stocul vor fi afișate după confirmarea catalogului.</p><button className="button button-primary" type="button" onClick={() => addProduct(activeProduct)}>Adaugă în lista mea <Plus size={17} /></button><a className="source-link" href={activeProduct.source} target="_blank" rel="noreferrer">Vezi produsul la producător <ArrowUpRight size={15} /></a></div></div></div>}

      {cartOpen && <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}><aside className="selection-drawer" role="dialog" aria-modal="true" aria-labelledby="selection-title"><div className="drawer-top"><div><span className="eyebrow">ALEGERILE TALE</span><h2 id="selection-title">Lista mea <span>({selectedCount})</span></h2></div><button className="close-button" type="button" aria-label="Închide lista" onClick={() => setCartOpen(false)}><X size={22} /></button></div><div className="drawer-items">{selectedProducts.length ? selectedProducts.map((product) => <div className="drawer-item" key={product.id}><img src={product.image} alt="" /><div className="drawer-item-info"><span>{product.brand}</span><strong>{product.name}</strong><small>{product.size}</small><div className="quantity-control"><button type="button" aria-label={`Scade cantitatea pentru ${product.name}`} onClick={() => changeCount(product.id, -1)}><Minus size={15} /></button><span>{selection[product.id]}</span><button type="button" aria-label={`Crește cantitatea pentru ${product.name}`} onClick={() => changeCount(product.id, 1)}><Plus size={15} /></button></div></div></div>) : <div className="empty-list"><ShoppingBag size={37} strokeWidth={1.4} /><h3>Lista ta este goală</h3><p>Salvează produsele care îți plac și revino la ele oricând.</p><button className="button button-outline" type="button" onClick={() => { setCartOpen(false); scrollToCatalog() }}>Explorează produsele <ArrowRight size={16} /></button></div>}</div><div className="drawer-bottom"><p>Aceasta este o listă locală de interes, nu o comandă. Nu se transmit date.</p>{selectedProducts.length > 0 && <button className="button button-primary copy-button" type="button" onClick={copyList}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Lista a fost copiată' : 'Copiază lista'}</button>}</div></aside></div>}
    </>
  )
}

export default App
