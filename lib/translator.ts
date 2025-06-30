import { JargonMap } from '@/types/translator';

export const jargonMap: JargonMap = {
  // Common words/phrases to agency speak
  'think': 'ideate',
  'ideas': 'blue-sky thinking',
  'new ideas': 'disruptive ideation',
  'brainstorm': 'thought-shower',
  'meeting': 'alignment session',
  'plan': 'strategic roadmap',
  'strategy': 'holistic paradigm',
  'client': 'key stakeholder',
  'customers': 'target personas',
  'people': 'human-centric touchpoints',
  'budget': 'investment allocation',
  'cheap': 'cost-optimized',
  'expensive': 'premium-tier',
  'problem': 'opportunity space',
  'issue': 'pain point',
  'solution': 'game-changing methodology',
  'work together': 'synergize cross-functionally',
  'discuss': 'deep-dive into',
  'talk about': 'unpack the narrative around',
  'show': 'showcase the value proposition of',
  'sell': 'evangelize',
  'buy': 'onboard',
  'change': 'pivot strategically',
  'improve': 'optimise and iterate',
  'start': 'kickoff the initiative',
  'finish': 'sunset the deliverable',
  'deadline': 'hard stop',
  'urgent': 'mission-critical',
  'important': 'high-impact',
  'easy': 'low-hanging fruit',
  'difficult': 'complex ecosystem challenge',
  'good': 'best-in-class',
  'bad': 'sub-optimal',
  'big': 'enterprise-scale',
  'small': 'boutique-focused',
  'creative': 'disruptive creative expression',
  'design': 'experiential design thinking',
  'website': 'digital ecosystem',
  'app': 'mobile-first platform',
  'social media': 'social amplification strategy',
  'advertising': 'integrated brand storytelling',
  'campaign': 'omnichannel activation',
  'brand': 'brand architecture',
  'logo': 'visual identity system',
  'marketing': 'growth hacking methodology',
  'sales': 'conversion optimisation',
  'data': 'actionable insights',
  'report': 'comprehensive analytics dashboard',
  'presentation': 'stakeholder alignment deck',
  'email': 'personalised touchpoint communication',
  'call': 'strategic dialogue session',
  'lunch': 'working lunch ideation session'
};

export const agencyPrefixes = [
  'Let\'s action on',
  'We need to leverage',
  'Moving forward, we should',
  'From a strategic standpoint,',
  'To circle back,',
  'At the end of the day,',
  'Let\'s take this offline and',
  'We should pivot and',
  'Going forward, let\'s',
  'To maximize synergies, we need to'
];

export const agencySuffixes = [
  'to drive maximum ROI',
  'for scalable growth potential',
  'that moves the needle',
  'to optimise our value proposition',
  'and iterate rapidly',
  'with data-driven insights',
  'leveraging best practices',
  'for next-level optimisation',
  'to maximise stakeholder buy-in',
  'and achieve paradigm disruption'
];

export const buzzwords = [
  'synergistic', 'holistic', 'disruptive', 'innovative', 'cutting-edge',
  'next-generation', 'scalable', 'agile', 'dynamic', 'strategic',
  'mission-critical', 'game-changing', 'revolutionary', 'transformative',
  'best-in-class', 'world-class', 'enterprise-grade', 'future-proof'
];

export function fallbackTranslation(text: string): string {
  let translated = text.toLowerCase();
  
  // Apply jargon replacements
  Object.entries(jargonMap).forEach(([normal, agency]) => {
    const regex = new RegExp(`\\b${normal}\\b`, 'gi');
    translated = translated.replace(regex, agency);
  });

  // Add random buzzwords
  const words = translated.split(' ');
  const enhancedWords = words.map(word => {
    if (Math.random() < 0.3 && word.length > 3) {
      const buzzword = buzzwords[Math.floor(Math.random() * buzzwords.length)];
      return `${buzzword} ${word}`;
    }
    return word;
  });

  translated = enhancedWords.join(' ');

  // Add agency prefix and suffix
  const prefix = agencyPrefixes[Math.floor(Math.random() * agencyPrefixes.length)];
  const suffix = agencySuffixes[Math.floor(Math.random() * agencySuffixes.length)];
  
  // Capitalize first letter
  translated = translated.charAt(0).toUpperCase() + translated.slice(1);
  
  // Construct final translation
  return `${prefix} ${translated} ${suffix}.`;
}

export const examplePhrases = [
  "Let's think of some new ideas",
  "We need to discuss the budget", 
  "This is an important project",
  "The deadline is next week"
];