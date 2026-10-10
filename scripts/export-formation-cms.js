import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  formationPages,
  whatsIncludedDefault,
  optionalFreeServices,
  bankPartners,
  checkoutExtras,
  formationAddons,
  formationNavItems,
} from '../src/data/formationPages.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.resolve(__dirname, '../../server/src/data/formationCmsDefaults.json')

const out = {
  nav: formationNavItems,
  shared: {
    orderIntroText:
      'Select our additional services to help your company get off to the right start and get discounts with 3 or more services.',
    banksTitle: 'Business bank account',
    banksLead: 'You can select a business bank account during the order process.',
    banks: bankPartners,
    includesTitle: "What's Included",
    includes: whatsIncludedDefault,
    optionalTitle: 'Optional Free Services',
    optional: optionalFreeServices,
    extrasTitle: 'Additional items available at checkout',
    extrasLead: 'You can add these items during the order process.',
    extras: checkoutExtras,
    addons: formationAddons.map((a) => ({
      id: a.id,
      title: a.title,
      priceDisplay: a.priceDisplay,
      description: a.description,
    })),
    ctaTitle: 'Ready to form your company?',
    ctaText:
      'Start your order today - transparent pricing, no hidden charges, and free lifetime support.',
  },
  pages: formationPages.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    priceDisplay: p.priceDisplay,
    description: p.description,
    contentSections: p.contentSections,
  })),
}

fs.writeFileSync(outPath, JSON.stringify(out, null, 2))
console.log('wrote', outPath, 'pages=', out.pages.length)
