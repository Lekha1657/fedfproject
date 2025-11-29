import React, { useRef, useState } from 'react'
import ProgramCard from './ProgramCard'

const CATEGORY_RESOURCES = {
  'Mental Health': [
    { title: 'National Institute of Mental Health — Mental Health Information', url: 'https://www.nimh.nih.gov/health' },
    { title: 'Mindful.org — Mindfulness Practices', url: 'https://www.mindful.org/category/practice/' },
    { title: 'Suicide & Crisis Lifeline (US) — 988', url: 'https://988lifeline.org/' },
  ],
  'Fitness Programs': [
    { title: 'NHS Couch to 5K Plan', url: 'https://www.nhs.uk/live-well/exercise/couch-to-5k-week-by-week/' },
    { title: 'Runner’s World — Beginner Plans', url: 'https://www.runnersworld.com/training/' },
    { title: 'Yoga With Adriene — Yoga Videos', url: 'https://yogawithadriene.com/' },
  ],
  'Nutrition Advice': [
    { title: 'EatRight — Meal Planning', url: 'https://www.eatright.org/food/planning-and-prep' },
    { title: 'Budget Bytes — Affordable Recipes', url: 'https://www.budgetbytes.com/' },
    { title: 'Find a Nutrition Expert (AND)', url: 'https://www.eatright.org/find-a-nutrition-expert' },
  ],
}

export default function Home({ programs, user, onJoin, onLeave, query, setQuery }) {
  const sections = ['Mental Health', 'Fitness Programs', 'Nutrition Advice']
  const gridRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('')

  function exploreCategory(cat) {
    setActiveCategory(cat)
    // set the search query so the App filters the program list
    if (setQuery) setQuery(cat)
    // scroll programs into view
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const resources = activeCategory ? CATEGORY_RESOURCES[activeCategory] || [] : []

  return (
    <div className="home">
      <section className="hero">
        <div>
          <h1>Welcome to Student Wellness Hub</h1>
          <p>Access mental health resources, fitness programs, and nutrition advice to support your wellbeing.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <small className="muted">Tip: Use the search or click Explore to filter programs.</small>
        </div>
      </section>

      <section className="categories">
        {sections.map((s) => (
          <div key={s} className={"category-card" + (activeCategory === s ? ' active' : '')}>
            <h3>{s}</h3>
            <p>Explore curated resources and programs related to {s.toLowerCase()}.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={() => exploreCategory(s)}>Explore</button>
            </div>
          </div>
        ))}
      </section>

      {activeCategory && (
        <section className="panel" style={{ marginBottom: 12 }}>
          <h3>Resources for {activeCategory}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {resources.map((r) => (
              <a key={r.title} className="category-card" style={{ padding: 12, textDecoration: 'none' }} href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
            ))}
          </div>
        </section>
      )}

      {activeCategory && (
        <section className="program-grid" ref={gridRef}>
          {programs.map((p) => (
            <ProgramCard key={p.id} program={p} user={user} onJoin={onJoin} onLeave={onLeave} />
          ))}
        </section>
      )}
    </div>
  )
}
