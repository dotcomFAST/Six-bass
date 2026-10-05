import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Camera, Check, ChevronDown, Drum, Guitar, Menu, Mic2, Music2, Piano, Play, Radio, Send, X } from 'lucide-react'
import { copy } from './i18n.js'
import './site.css'

const icons = { guitar: Guitar, drums: Drum, keys: Piano, vocals: Mic2, bass: Music2, production: Radio }
const photo = (id, width = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function Reveal({ children, className = '', delay = 0 }) {
	return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-45px' }} transition={{ duration: .45, delay }}>{children}</motion.div>
}

function ScrollTop() {
	const { pathname } = useLocation()
	useEffect(() => window.scrollTo(0, 0), [pathname])
	return null
}

function Header({ t, lang, setLang }) {
	const [open, setOpen] = useState(false)
	const links = [['/courses', t.nav.courses], ['/instructors', t.nav.instructors], ['/pricing', t.nav.pricing], ['/contact', t.nav.contact]]
	return <>
		<div className="top-strip"><span>{t.header.strip}</span><b>✳</b><span>{t.header.strip2}</span></div>
		<header className="header"><Link className="wordmark" to="/" aria-label="Six-Bass"><span>six</span><b>-</b><span>bass</span><i>®</i></Link>
			<nav className={`nav ${open ? 'nav--open' : ''}`} aria-label={t.header.menu}>{links.map(([path, label]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}<div className="nav__mobile-cta"><Link className="button button--lime" to="/courses" onClick={() => setOpen(false)}>{t.header.start}<ArrowUpRight size={15}/></Link></div></nav>
			<div className="header__actions"><button className="language-switch" onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')} aria-label={t.header.language}><span className={lang === 'ua' ? 'is-current' : ''}>UA</span><i>/</i><span className={lang === 'en' ? 'is-current' : ''}>EN</span></button><Link className="button button--lime header__cta" to="/courses">{t.header.start}<ArrowUpRight size={15}/></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? t.header.close : t.header.open}>{open ? <X size={21}/> : <Menu size={21}/>}</button></div>
		</header>
	</>
}

function Ticker({ text }) { return <div className="ticker" aria-label={text}><div className="ticker__track"><span>{Array.from({ length: 3 }, (_, i) => <span key={i}>{text} <b>✳</b> </span>)}</span></div></div> }

function Heading({ number, label, title, tone = '' }) { return <div className={`section-heading ${tone}`}><span className="eyebrow"><b>{number}</b>{label}</span><h2>{title}</h2></div> }

function InstrumentTile({ item, index }) {
	const Icon = icons[item.icon] || Music2
	return <Reveal className={`tile tile--${item.color}`} delay={index * .05}><Link className="tile__link" to="/courses"><div className="tile__image"><img src={photo(item.image, 650)} alt={item.alt} loading="lazy"/><span className="tile__num">0{index + 1}</span><span className="tile__icon"><Icon size={22}/></span></div><div className="tile__body"><span>{item.level}</span><h3>{item.name}</h3><div><small>{item.short}</small><ArrowUpRight size={18}/></div></div></Link></Reveal>
}

function Home({ t }) {
	const h = t.home
	return <main><section className="hero"><div className="hero__copy"><span className="eyebrow hero__tag"><i className="live-dot"/>{h.kicker}</span><h1 className="hero__title"><span>{h.h1}</span><span className="hero__middle"><i>{h.hint}</i><b>{h.h2}</b></span><span className="hero__outline">{h.h3}</span></h1><p className="hero__description">{h.intro}</p><div className="hero__actions"><Link className="button button--dark" to="/courses">{h.cta}<ArrowUpRight size={16}/></Link><Link className="hero__play" to="/pricing"><span><Play size={11} fill="currentColor"/></span>{h.secondary}</Link></div><span className="hero__scribble">{h.scribble}<ArrowDownRight size={34}/></span></div><div className="hero__art"><div className="hero__photo"><img src={photo('photo-1510915361894-db8b60106cb1', 1100)} alt={h.photoAlt} fetchPriority="high"/></div><div className="hero__photo-small"><img src={photo('photo-1501386761578-eac5c94b800a', 500)} alt={h.stageAlt} loading="lazy"/></div><div className="hero__sticker">{h.sticker}<b>✳</b></div><div className="hero__record">REPEAT<i>✳</i>REPEAT</div><div className="hero__vertical">{h.vertical}</div></div><div className="hero__foot"><span>{h.foot}</span><span>49°50' N / 24°01' E</span><span>EST. 2024 — PLAY LOUD</span></div></section>
		<Ticker text={t.ticker}/><section className="section"><div className="section-head"><Heading number="01" label={h.categories} title={h.categoryTitle}/><p>{h.categoryText}</p></div><div className="tile-grid">{t.instruments.map((item, i) => <InstrumentTile item={item} index={i} key={item.id}/>)}</div><div className="section-tail"><span>{h.categoryFoot}</span><Link className="arrow-link" to="/courses">{h.allCourses}<ArrowRight size={17}/></Link></div></section>
		<section className="formats"><div className="formats__texture">LIVE LIVE LIVE LIVE</div><Heading number="02" label={h.formatLabel} title={h.formatTitle} tone="heading--lime"/><div className="format-grid"><FormatCard tone="video" label={h.recordedLabel} title={h.recordedTitle} text={h.recordedText} link={h.recordedLink} href="/courses" image="photo-1524368535928-5b5e00ddc76b" alt={h.recordedAlt}/><FormatCard tone="live" label={h.liveLabel} title={h.liveTitle} text={h.liveText} link={h.liveLink} href="/instructors" image="photo-1520523839897-bd0b52f945a0" alt={h.liveAlt} stamp={h.stamp}/></div></section>
		<section className="manifesto"><span className="eyebrow"><b>03</b>{h.manifestoLabel}</span><h2>{h.manifesto1}<i>{h.manifestoAccent}</i>{h.manifesto2}</h2><div><p>{h.manifestoText}</p><span className="manifesto__star">✳</span><Link className="button button--dark" to="/pricing">{h.manifestoCta}<ArrowUpRight size={16}/></Link></div></section>
		<section className="section voices"><div className="section-head"><Heading number="04" label={h.voicesLabel} title={h.voicesTitle} tone="heading--violet"/><span className="sticker-note">{h.voicesNote}</span></div><div className="voices-grid">{t.reviews.map((review, i) => <Reveal className={`voice-card voice-card--${i + 1}`} key={review.name} delay={i * .06}><div>★★★★★</div><p>“{review.text}”</p><span className="voice-person"><img src={photo(review.image, 100)} alt="" loading="lazy"/><span><b>{review.name}</b><i>{review.detail}</i></span></span><b className="voice-mark">✳</b></Reveal>)}</div><div className="voices-tail"><span>{h.voicesFoot}</span><Link className="button button--pink" to="/courses">{h.cta}<ArrowUpRight size={16}/></Link></div></section><FooterCta t={t}/></main>
}

function FormatCard({ tone, label, title, text, link, href, image, alt, stamp }) {
	return <article className={`format-card format-card--${tone}`}><div className="format-card__top"><span>{tone === 'live' ? <i className="live-dot"/> : <Play size={12} fill="currentColor"/>}{label}</span><i>0{tone === 'live' ? 2 : 1} / 02</i></div><div className="format-card__copy"><h3>{title}</h3><p>{text}</p><Link className="arrow-link" to={href}>{link}<ArrowRight size={16}/></Link></div><div className="format-card__image"><img src={photo(image, 750)} alt={alt} loading="lazy"/>{stamp ? <span className="format-stamp">{stamp}</span> : <span><Play size={23} fill="currentColor"/></span>}</div></article>
}

function PageBanner({ kind, number, data }) { return <div className={`page-banner page-banner--${kind}`}><span className="eyebrow"><b>{number}</b>{data.eyebrow}</span><h1>{data.title}<i>{data.accent}</i></h1><p>{data.intro}</p><span className="banner-deco">{data.deco}</span></div> }

function CourseCard({ course, t }) {
	const Icon = icons[course.icon] || Music2
	return <article className={`catalog-card catalog-card--${course.color}`}><div className="catalog-card__image"><img src={photo(course.image, 700)} alt={course.alt} loading="lazy"/><span>{course.format}</span><b><Icon size={20}/></b></div><div className="catalog-card__body"><div className="catalog-card__meta"><span>{course.instrument}</span><span>{course.duration}</span></div><h2>{course.title}</h2><p>{course.description}</p><div className="levels">{course.levels.map(level => <span key={level}>{t.levels[level]}</span>)}</div><div className="catalog-card__bottom"><span><b>{course.price}</b> {t.courses.once}</span><Link to="/contact" aria-label={`${t.courses.ask} ${course.title}`}><ArrowUpRight size={18}/></Link></div></div></article>
}

function Courses({ t }) {
	const [instrument, setInstrument] = useState('all')
	const [level, setLevel] = useState('all')
	const filters = [['all', t.courses.all], ...t.instruments.map(item => [item.id, item.name])]
	const levels = [['all', t.courses.anyLevel], ...Object.entries(t.levels)]
	const filtered = t.courses.items.filter(course => (instrument === 'all' || course.icon === instrument) && (level === 'all' || course.levels.includes(level)))
	return <main><PageBanner kind="courses" number="01" data={t.courses}/><div className="catalog-toolbar"><div><span className="eyebrow">{t.courses.instrument}</span><div className="filter-row">{filters.map(([value, label]) => <button key={value} className={instrument === value ? 'filter-chip is-active' : 'filter-chip'} onClick={() => setInstrument(value)}>{label}</button>)}</div></div><div><label className="eyebrow" htmlFor="level-filter">{t.courses.level}</label><div className="select-wrap"><select id="level-filter" value={level} onChange={event => setLevel(event.target.value)}>{levels.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><ChevronDown size={15}/></div></div></div><div className="catalog-grid">{filtered.map((course, i) => <Reveal key={course.title} delay={i % 3 * .05}><CourseCard course={course} t={t}/></Reveal>)}</div>{!filtered.length && <p className="empty-state">{t.courses.empty}</p>}<div className="catalog-tail"><span>{t.courses.bottom}</span><Link className="button button--dark" to="/contact">{t.courses.help}<ArrowUpRight size={16}/></Link></div></main>
}

function Instructors({ t }) {
	return <main><PageBanner kind="teachers" number="02" data={t.instructors}/><section className="section teachers"><div className="teacher-grid">{t.instructors.people.map((person, i) => <Reveal className={`teacher-card teacher-card--${i + 1}`} key={person.name} delay={i * .05}><div className="teacher-card__photo"><img src={photo(person.image, 750)} alt={person.name} loading="lazy"/><span>0{i + 1}</span><b>{person.sticker}</b></div><div className="teacher-card__copy"><span className="eyebrow">{person.instrument} / {person.years}</span><h2>{person.name}</h2><p>{person.bio}</p><div><span>{person.tag}</span><Link to="/contact" aria-label={`${t.instructors.book} ${person.name}`}><ArrowUpRight size={18}/></Link></div></div></Reveal>)}</div><div className="teachers-note"><b>✳</b><p>{t.instructors.note}</p><Link className="arrow-link" to="/contact">{t.instructors.cta}<ArrowRight size={17}/></Link></div></section><FooterCta t={t}/></main>
}

function Pricing({ t }) {
	const p = t.pricing
	const plans = [['single', '01', p.singleTag, p.singleSticker, p.singleTitle, p.singleText, p.singlePrice, p.once, p.singleFeatures, p.singleCta], ['sub', '02', p.subTag, p.popular, p.subTitle, p.subText, p.subPrice, p.month, p.subFeatures, p.subCta]]
	return <main><PageBanner kind="pricing" number="03" data={p}/><section className="price-grid">{plans.map((plan, i) => <article className={`price-poster price-poster--${plan[0]}`} key={plan[0]}><div className="price-poster__top"><span className="eyebrow"><b>{plan[1]}</b>{plan[2]}</span><i>{plan[3]}</i></div><div className="price-poster__body"><h2>{plan[4]}</h2><p>{plan[5]}</p><div className="price-value"><span>{p.currency}</span>{plan[6]}<i>{plan[7]}</i></div><ul>{plan[8].map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul><Link className={`button ${i ? 'button--lime' : 'button--dark'}`} to={i ? '/contact' : '/courses'}>{plan[9]}<ArrowUpRight size={16}/></Link>{i === 1 && <small>{p.cancel}</small>}</div><span className="price-deco">{i ? 'ALL\nIN.' : 'PLAY IT.'}</span></article>)}</section><div className="pricing-note"><b>✳</b><p>{p.note}</p><Link className="arrow-link" to="/contact">{p.ask}<ArrowRight size={17}/></Link></div><FooterCta t={t}/></main>
}

function Contact({ t }) {
	const [sent, setSent] = useState(false)
	const c = t.contact
	return <main><PageBanner kind="contact" number="04" data={c}/><section className="contact-layout"><div className="contact-details"><span className="eyebrow"><b>✳</b>{c.direct}</span><a className="contact-email" href="mailto:hello@six-bass.com">hello@<br/>six-bass.com <ArrowUpRight size={22}/></a><p>{c.directText}</p><div className="contact-social"><a href="https://instagram.com" target="_blank" rel="noreferrer"><Camera size={17}/> Instagram <ArrowUpRight size={14}/></a><a href="https://youtube.com" target="_blank" rel="noreferrer"><Play size={17}/> YouTube <ArrowUpRight size={14}/></a></div><span className="contact-response"><i className="live-dot"/>{c.response}</span></div><form className="contact-form" onSubmit={event => { event.preventDefault(); setSent(true) }}><div className="form-title"><span className="eyebrow">{c.formTitle}</span><b>✳</b></div><label>{c.name}<input name="name" placeholder={c.nameHint} required/></label><label>{c.email}<input name="email" type="email" placeholder="name@email.com" required/></label><label>{c.topic}<select name="topic" defaultValue=""><option value="" disabled>{c.topicHint}</option>{c.topics.map(topic => <option key={topic}>{topic}</option>)}</select></label><label>{c.message}<textarea name="message" rows="3" placeholder={c.messageHint} required/></label><button type="submit" className="button button--dark">{sent ? c.sent : c.send}{sent ? <Check size={17}/> : <Send size={16}/>}</button>{sent && <span className="form-success" role="status">{c.success}</span>}</form></section><section className="faq"><div><Heading number="05" label={c.faqLabel} title={c.faqTitle}/><span className="faq-sticker">{c.faqSticker}</span></div><div className="faq-list">{c.faqs.map((faq, i) => <details key={faq.q} open={i === 0}><summary><span>0{i + 1}</span><b>{faq.q}</b><ChevronDown size={19}/></summary><p>{faq.a}</p></details>)}</div></section><FooterCta t={t}/></main>
}

function FooterCta({ t }) { return <section className="footer-cta"><span className="footer-cta__texture">{t.footer.scribble}</span><span className="eyebrow"><i className="live-dot"/>{t.footer.ctaLabel}</span><h2>{t.footer.ctaTitle}<i>{t.footer.ctaAccent}</i></h2><Link className="button button--lime" to="/courses">{t.header.start}<ArrowUpRight size={16}/></Link><b>✳</b></section> }

function Footer({ t, lang, setLang }) {
	const [subscribed, setSubscribed] = useState(false)
	return <footer className="footer"><div className="footer__main"><div className="footer__brand"><Link className="wordmark wordmark--footer" to="/"><span>six</span><b>-</b><span>bass</span><i>®</i></Link><p>{t.footer.blurb}</p><div className="social-icons"><a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer"><Camera size={18}/></a><a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer"><Play size={18}/></a></div></div><div className="footer__links"><span className="eyebrow">{t.footer.explore}</span><Link to="/courses">{t.nav.courses}</Link><Link to="/instructors">{t.nav.instructors}</Link><Link to="/pricing">{t.nav.pricing}</Link><Link to="/contact">{t.nav.contact}</Link></div><div className="newsletter"><span className="eyebrow">{t.footer.newsTitle}</span><p>{t.footer.newsText}</p><form onSubmit={event => { event.preventDefault(); setSubscribed(true) }}><label className="sr-only" htmlFor="news-email">{t.contact.email}</label><input id="news-email" type="email" placeholder={t.footer.newsHint} required/><button aria-label={t.footer.subscribe}>{subscribed ? <Check size={18}/> : <ArrowUpRight size={19}/>}</button></form>{subscribed && <span className="newsletter-done" role="status">{t.footer.thanks}</span>}</div></div><div className="footer__bottom"><span>© SIX-BASS 2025</span><span>{t.footer.bottom}</span><button className="language-switch" onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')}><span className={lang === 'ua' ? 'is-current' : ''}>UA</span><i>/</i><span className={lang === 'en' ? 'is-current' : ''}>EN</span></button></div></footer>
}

function Site() {
	const [lang, setLang] = useState('ua')
	const t = copy[lang]
	useEffect(() => { document.documentElement.lang = lang === 'ua' ? 'uk' : 'en' }, [lang])
	return <BrowserRouter basename={import.meta.env.BASE_URL}><ScrollTop/><Header t={t} lang={lang} setLang={setLang}/><Routes><Route path="/" element={<Home t={t}/>}/><Route path="/courses" element={<Courses t={t}/>}/><Route path="/instructors" element={<Instructors t={t}/>}/><Route path="/pricing" element={<Pricing t={t}/>}/><Route path="/contact" element={<Contact t={t}/>}/><Route path="*" element={<Home t={t}/>}/></Routes><Footer t={t} lang={lang} setLang={setLang}/></BrowserRouter>
}

export default Site
