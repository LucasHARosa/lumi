import { Butterfly, Sparkle, Bubble, Clouds, Feather, Glow, MiniLogo } from './Decor.jsx'

/*
  SISTEMA DE TIPOGRAFIA (definido em styles.css)
  .eyebrow  → Raleway 600, caixa alta, pequeno: rótulo da seção
  .title    → Cormorant Garamond 600: título de cada slide
  .h3       → Raleway 700: subtítulos de cards/colunas
  .body     → Raleway 500: textos corridos
  .lead     → Cormorant Garamond itálico: frases de destaque
  Pinyon Script (cursiva) só nos momentos de marca: capa e encerramento.
*/

// atraso da animação de entrada de cada elemento
const d = (s) => ({ '--d': `${s}s` })

function Sky({ children }) {
  return <div className="bg-sky">{children}</div>
}

function Heading({ eyebrow, children, x = 84, y = 70, w, delay = 0.2 }) {
  return (
    <div className="heading" style={{ left: x, top: y, width: w }}>
      <div className="eyebrow a up" style={d(delay)}>{eyebrow}</div>
      <h2 className="title a up" style={d(delay + 0.15)}>{children}</h2>
    </div>
  )
}

const Arrow = () => (
  <svg className="arrow" viewBox="0 0 32 32" width="32" height="32">
    <circle cx="16" cy="16" r="16" fill="#7a55c9" />
    <path d="M9 16h13M17 10l6 6-6 6" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* 1 — Capa */
function Capa() {
  return (
    <Sky>
      <div className="cover-shade" />
      <Bubble x={-60} y={-70} size={250} />
      <Bubble x={1080} y={280} size={260} delay={2} />
      <Butterfly x={30} y={80} size={170} rot={-10} blur={4} />
      <Butterfly x={1030} y={95} size={80} rot={12} blur={1} delay={1.5} />
      <Sparkle x={1160} y={45} size={26} color="#fff" />
      <Sparkle x={1200} y={58} size={22} color="#fff" delay={0.8} />
      <Sparkle x={1198} y={135} size={20} color="#fff" delay={1.6} />
      <Sparkle x={20} y={320} size={50} delay={0.4} />
      <Sparkle x={800} y={640} size={36} delay={1.2} />
      <Sparkle x={1030} y={640} size={60} color="#fff" delay={2} />
      <Clouds bottom={-120} />

      <div className="cover-tag a up" style={d(0.2)}>shine your way</div>
      <h1 className="cover-title a zoom" style={d(0.4)}>LUMI</h1>
      <div className="cover-script a write" style={d(0.9)}>bijus fashion</div>
      <div className="pill a up" style={d(1.6)}>by Lumi</div>
    </Sky>
  )
}

/* 2 — A criação da marca */
function Criacao() {
  const rows = [
    { t: 'De onde veio a ideia', p: 'A ideia da Lumi foi pensada para peles sensíveis, com cuidado e conforto, para pessoas que valorizam leveza e bem-estar.' },
    { t: 'Como a Lumi nasceu', p: 'A Lumi nasceu para unir estilo e conforto, com materiais leves e duráveis, pensados para não agredir a pele.' },
    { t: 'Os produtos da Lumi', p: 'Peças delicadas para o dia a dia, com materiais leves e sustentáveis que não machucam a pele de quem usa.' },
  ]
  return (
    <Sky>
      <Feather x={-40} y={420} size={200} rot={-25} />
      <Feather x={1060} y={450} size={240} rot={-160} delay={1} />
      <Sparkle x={250} y={430} size={40} color="#fff" />
      <Sparkle x={40} y={580} size={70} color="#fff" delay={0.8} />
      <Clouds bottom={-200} width={760} />
      <MiniLogo />
      <Heading eyebrow="Nossa história" w={290}>A criação da nossa marca</Heading>
      {rows.map((r, i) => (
        <div className="story-card a right" key={r.t} style={{ ...d(0.6 + i * 0.3), top: 128 + i * 180 }}>
          <Arrow />
          <h3 className="h3">{r.t}</h3>
          <p className="body">{r.p}</p>
        </div>
      ))}
    </Sky>
  )
}

/* 3 — Persona + gráfico */
const chartData = [
  { label: 'Vermelhidão', v: [3, 6, 9] },
  { label: 'Coceira intensa', v: [8, 14, 18] },
  { label: 'Descamação', v: [16, 18, 20] },
]
const series = [
  { name: 'Cobre', color: '#9d9cf0' },
  { name: 'Cromo', color: '#b892ee' },
  { name: 'Níquel', color: '#d9bdf7' },
]

function Persona() {
  const H = 380, top = 190, left = 650, groupW = 180, barW = 42
  return (
    <div className="bg-cream">
      <Butterfly x={390} y={600} size={70} rot={-12} blur={3} delay={0.3} />
      <MiniLogo />
      <Heading eyebrow="Para quem é a Lumi">Nossa persona</Heading>
      <h3 className="h3 a up" style={{ ...d(0.5), position: 'absolute', left: 84, top: 250, width: 440 }}>
        Quem tem pele sensível a metais
      </h3>
      <p className="body a up" style={{ ...d(0.7), position: 'absolute', left: 84, top: 300, width: 440 }}>
        Nossa persona sofre com alergias e acaba deixando de usar acessórios por causa das reações fortes e das
        coceiras que eles causam.
      </p>
      <p className="lead a up" style={{ ...d(0.9), position: 'absolute', left: 84, top: 460, width: 440 }}>
        “Eu adoro bijus, mas minha pele não deixa.”
      </p>

      <div className="eyebrow a fade" style={{ ...d(0.4), position: 'absolute', left: left - 30, top: 92 }}>Reações por tipo de metal</div>
      <div className="legend a fade" style={{ ...d(0.5), left: left - 30, top: 128 }}>
        {series.map((s) => (
          <span key={s.name}><i style={{ background: s.color }} />{s.name}</span>
        ))}
      </div>
      <svg className="chart" width="1280" height="720">
        {[0, 5, 10, 15, 20].map((t) => {
          const y = top + H - (t / 20) * H
          return (
            <g key={t}>
              <line x1={left} x2={left + 3 * groupW} y1={y} y2={y} stroke="#e3dcec" />
              <text x={left - 12} y={y + 5} textAnchor="end" className="tick">{t}</text>
            </g>
          )
        })}
        {chartData.map((g, gi) =>
          g.v.map((v, si) => {
            const h = (v / 20) * H
            const x = left + 18 + gi * groupW + si * (barW + 4)
            return (
              <g key={`${gi}-${si}`}>
                <rect className="bar" style={{ '--d': `${0.6 + gi * 0.25 + si * 0.1}s` }} x={x} y={top + H - h} width={barW} height={h} rx="3" fill={series[si].color} />
                <text className="bar-val" style={{ '--d': `${1.4 + gi * 0.25 + si * 0.1}s` }} x={x + barW / 2} y={top + H - h - 8} textAnchor="middle">{v}</text>
              </g>
            )
          })
        )}
        {chartData.map((g, gi) => (
          <text key={g.label} x={left + 18 + gi * groupW + (3 * barW + 8) / 2} y={top + H + 28} textAnchor="middle" className="xlabel">{g.label}</text>
        ))}
      </svg>
    </div>
  )
}

/* 4 — Tipos comuns de alergia */
function Alergias() {
  const cards = [
    { img: '/img/alergia-dedo.jpg', t: 'Vermelhidão', p: 'Alguns metais, como o níquel, podem causar vermelhidão.' },
    { img: '/img/alergia-pescoco.jpg', t: 'Irritação', p: 'Metais aos quais a pele é sensível podem causar irritação.' },
    { img: '/img/alergia-orelha.jpg', t: 'Coceira', p: 'Brincos de certos materiais podem causar coceira.' },
  ]
  return (
    <Sky>
      <Bubble x={820} y={-300} size={560} />
      <Butterfly x={-30} y={440} size={120} rot={-20} blur={1} delay={0.3} />
      <Clouds bottom={-190} opacity={0.8} />
      <MiniLogo />
      <Heading eyebrow="O problema">Tipos comuns de alergia</Heading>
      {cards.map((c, i) => (
        <div className="allergy-card a up" key={i} style={{ ...d(0.5 + i * 0.25), left: 84 + i * 380 }}>
          <div className="img-wrap"><img src={c.img} alt="" className="kenburns" /></div>
          <div className="allergy-text">
            <h3 className="h3">{c.t}</h3>
            <p className="body">{c.p}</p>
          </div>
        </div>
      ))}
    </Sky>
  )
}

/* 5 — Nossa solução */
function Solucao() {
  return (
    <div className="bg-cream">
      <MiniLogo />
      <Heading eyebrow="A solução" w={340}>Nossa solução</Heading>
      <div className="sol-col a up" style={{ ...d(0.5), left: 470 }}>
        <hr />
        <h3 className="h3">Acessórios com conforto</h3>
        <p className="body">Estilo, conforto, durabilidade e sustentabilidade em peças feitas com carinho para peles sensíveis, para você se vestir do seu jeitinho.</p>
      </div>
      <div className="sol-col a up" style={{ ...d(0.8), left: 880 }}>
        <hr />
        <h3 className="h3">O que nos diferencia</h3>
        <p className="body">Escolhas especiais e cuidado em cada detalhe: estilo que encanta, feito para o seu estilo. Essa é a essência da Lumi.</p>
      </div>
      <div className="sol-photo a left" style={{ ...d(1.0), left: 0, width: 652 }}>
        <img src="/img/pulseiras.jpg" alt="Pulseiras de miçangas Lumi" className="kenburns" />
      </div>
      <div className="sol-photo a right" style={{ ...d(1.2), left: 659, width: 621 }}>
        <img src="/img/colar.jpg" alt="Colar de miçangas com pérolas" className="kenburns rev" />
      </div>
    </div>
  )
}

/* 6 — Produtos */
function Produtos() {
  return (
    <div className="bg-cream">
      <Glow x={820} y={-60} w={560} h={560} colors={['#f8c6e6', '#d9c8fb']} />
      <Bubble x={675} y={560} size={330} delay={1.5} />
      <Butterfly x={700} y={330} size={80} rot={8} blur={3} delay={0.6} />
      <Sparkle x={660} y={470} size={50} />
      <Sparkle x={870} y={565} size={44} delay={1.8} />
      <Heading eyebrow="Nossos produtos" w={640}>Feitos para todos, pensados para quem tem alergia</Heading>
      <ul className="checks">
        {['Produtos de ótima qualidade', 'Para todos os públicos', 'Pensados para peles alérgicas'].map((t, i) => (
          <li key={t} className="a left" style={d(0.7 + i * 0.2)}>
            <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="12" fill="#7a55c9" /><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {t}
          </li>
        ))}
      </ul>
      <p className="lead a up" style={{ ...d(1.5), position: 'absolute', left: 84, top: 470, width: 560 }}>
        Bijus Lumi: para usar no dia a dia de um jeito estiloso e, ao mesmo tempo, delicado.
      </p>
      <div className="slogan a zoom" style={d(1.9)}>Use e arrase.</div>

      <div className="phone a right" style={d(0.4)}>
        <div className="phone-notch" />
        <img src="/img/modelo.jpg" alt="Mulher fotografando com câmera rosa" className="kenburns soft" />
      </div>
    </div>
  )
}

/* 7 — Consumo consciente */
const IconCycle = () => (
  <svg viewBox="0 0 100 100" width="96" height="96" fill="none" stroke="#7a55c9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M28 30 A32 32 0 0 1 78 34" /><path d="M70 22 L80 34 L66 38" />
    <path d="M84 56 A32 32 0 0 1 46 82" /><path d="M56 88 L44 82 L52 70" />
    <path d="M22 70 A32 32 0 0 1 22 40" /><path d="M14 46 L22 36 L30 46" />
  </svg>
)
const IconBeads = () => (
  <svg viewBox="0 0 100 100" width="96" height="96">
    {Array.from({ length: 22 }, (_, i) => {
      const a = (i / 22) * Math.PI * 2
      return <circle key={i} cx={50 + 38 * Math.cos(a)} cy={50 + 38 * Math.sin(a)} r={i % 2 ? 4 : 5.5} fill="#7a55c9" />
    })}
  </svg>
)
const IconRecycle = () => (
  <svg viewBox="0 0 100 100" width="96" height="96" fill="none" stroke="#7a55c9" strokeWidth="4" strokeLinejoin="round">
    <circle cx="50" cy="50" r="44" />
    <path d="M50 18 C64 24 66 40 54 48 C44 42 40 28 50 18Z" /><path d="M52 46 L50 22" />
    <path d="M26 70 C24 54 36 46 48 52 C48 64 38 74 26 70Z" /><path d="M46 54 L28 68" />
    <path d="M76 70 C64 78 52 72 52 58 C64 54 76 58 76 70Z" /><path d="M56 58 L74 69" />
  </svg>
)

function Consciente() {
  const items = [
    { icon: <IconCycle />, t: 'Durabilidade', p: 'Acessórios de alta qualidade, feitos para durar e para o conforto do dia a dia.' },
    { icon: <IconBeads />, t: 'Escolhas conscientes', p: 'Valorizamos qualidade e conforto, evitando compras desnecessárias.' },
    { icon: <IconRecycle />, t: 'Reutilização', p: 'Combine as peças em vários looks e ocasiões e aproveite cada uma ao máximo.' },
  ]
  return (
    <div className="bg-cream">
      <div className="half-sky a fade" style={d(0)}>
        <Sky>
          <Sparkle x={500} y={70} size={60} color="#fff" />
          <Butterfly x={420} y={300} size={50} rot={10} blur={1.5} delay={0.4} />
          <Bubble x={120} y={470} size={420} delay={1} />
          <Clouds bottom={-170} width={640} />
        </Sky>
      </div>
      <Heading eyebrow="Nossos valores" w={400}>Consumo consciente</Heading>
      {items.map((it, i) => (
        <div className="cons-row" key={it.t} style={{ top: 66 + i * 206 }}>
          <div className="icon-circle a zoom" style={d(0.5 + i * 0.35)}>{it.icon}</div>
          <div className="cons-text a right" style={d(0.7 + i * 0.35)}>
            <h3 className="h3">{it.t}</h3>
            <p className="body">{it.p}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* 8 — Por que a Lumi */
function PorQue() {
  const cards = [
    { img: '/img/peca1.jpg', t: 'Por que escolher a Lumi', p: 'Cuidado, conforto e qualidade para peles sensíveis: peças leves e duráveis que acompanham a rotina sem incomodar.' },
    { img: '/img/peca2.jpg', t: 'Nosso propósito', p: 'Oferecer conforto com materiais leves e de qualidade. Acessórios também podem acompanhar o dia a dia com leveza.' },
    { img: '/img/peca3.jpg', t: 'O problema que resolvemos', p: 'Muita gente deixa de usar bijus por causa da alergia. A Lumi oferece peças leves, delicadas e duráveis.' },
  ]
  return (
    <Sky>
      <Bubble x={1010} y={-110} size={240} delay={1.3} />
      <Butterfly x={900} y={40} size={90} rot={10} blur={4} delay={0.6} />
      <Sparkle x={1225} y={300} size={40} color="#fff" delay={0.9} />
      <Clouds bottom={-200} opacity={0.8} />
      <Heading eyebrow="Nossa essência">Por que a Lumi</Heading>
      {cards.map((c, i) => (
        <div className="glass-card a up" key={c.t} style={{ ...d(0.5 + i * 0.3), left: 84 + i * 380 }}>
          <img src={c.img} alt="" />
          <h3 className="h3">{c.t}</h3>
          <p className="body">{c.p}</p>
        </div>
      ))}
    </Sky>
  )
}

/* 9 — Logo */
function Logo() {
  return (
    <div className="bg-cream">
      <Heading eyebrow="Identidade" y={150} w={520}>A logo da nossa marca</Heading>
      <p className="body a up" style={{ ...d(0.8), position: 'absolute', left: 84, top: 290, width: 500 }}>
        Nossa logo tem um círculo com folhas que simbolizam leveza e cuidado, junto com o nome da marca e a
        logomarca.
      </p>
      <p className="lead a up" style={{ ...d(1.1), position: 'absolute', left: 84, top: 400, width: 500 }}>Lumi: ilumine-se.</p>
      <div className="logo-img a zoom" style={d(0.6)}>
        <img src="/img/logo.jpg" alt="Logo Lumi" />
        <div className="shine" />
      </div>
      <div className="logo-strip">
        <Sky />
        <Feather x={840} y={30} size={220} rot={8} delay={0.5} />
      </div>
    </div>
  )
}

/* 10 — Redes sociais */
function Redes() {
  return (
    <div className="bg-cream">
      <div className="glitter a fade" style={d(0.2)} />
      <Clouds bottom={360} left={720} width={620} opacity={0.4} />
      <Feather x={560} y={150} size={150} rot={10} />
      <Butterfly x={150} y={420} size={170} rot={-8} blur={5} delay={0.2} />
      <Sparkle x={20} y={460} size={34} />
      <Sparkle x={45} y={600} size={46} delay={1.4} />
      <Sparkle x={215} y={620} size={36} delay={2} />
      <MiniLogo />
      <Heading eyebrow="Onde nos encontrar">Redes sociais</Heading>
      <div className="insta a up" style={d(0.7)}>
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
        </svg>
        <span className="h3">Instagram</span>
      </div>
      <p className="body a up" style={{ ...d(1.0), position: 'absolute', left: 520, top: 340, width: 620 }}>
        Vamos mostrar e destacar a qualidade e o conforto das nossas peças e interagir com quem acompanha a gente.
      </p>
      <p className="statement a up" style={d(1.4)}>
        Onde a nossa persona está,<br />a nossa marca também está.
      </p>
    </div>
  )
}

/* 11 — Obrigada */
function Obrigada() {
  return (
    <div className="bg-cream">
      <Glow x={960} y={-80} w={520} h={560} colors={['#f6b3c6', '#cdbcf6']} />
      <Glow x={-150} y={-120} w={600} h={360} colors={['#e4d6fa', '#efe6fb']} />
      <Clouds bottom={-170} width={700} opacity={0.85} />
      <Feather x={0} y={110} size={200} rot={-20} />
      <Feather x={1060} y={455} size={170} rot={-10} delay={1} />
      <Butterfly x={890} y={65} size={80} rot={10} blur={1} delay={0.4} />
      <Sparkle x={60} y={50} size={60} />
      <Sparkle x={850} y={40} size={40} delay={0.6} />
      <Sparkle x={620} y={580} size={56} delay={1.6} />
      <h2 className="thanks-script a write" style={d(0.3)}>Lumi</h2>
      <p className="thanks-text a up" style={d(1.0)}>obrigada por<br />nos conhecer</p>
      <div className="thanks-logo a zoom" style={d(1.0)}>
        <img src="/img/logo.jpg" alt="Logo Lumi" />
        <div className="shine" />
      </div>
    </div>
  )
}

// Ordem: apresentação → história → problema → solução → produto → valores → diferenciais → marca → contato → fim
export const slides = [Capa, Criacao, Persona, Alergias, Solucao, Produtos, Consciente, PorQue, Logo, Redes, Obrigada]
