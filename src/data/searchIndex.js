import { mockArticles } from './mockArticles';

const mockResourcesData = [
  { id: 'r1', type: 'resource', title: "Guide Liturgique Congolais", category: "Liturgie", content: "Manuel complet pour la messe Zairoise, inculturation, rite romain approuvé", url: "/ressources" },
  { id: 'r2', type: 'resource', title: "Cartographie Biblique de l'Afrique", category: "Histoire", content: "Carte interactive et PDF des lieux saints en Afrique du Nord de Carthage à Alexandrie", url: "/ressources" },
  { id: 'r3', type: 'resource', title: "Frise Chronologique 2000 ans", category: "Histoire", content: "Infographie haute résolution depuis l'Eunuque Ethiopien jusqu'au Jubilé 2033", url: "/ressources" }
];

const mockPeopleData = [
  { id: 'p1', type: 'person', title: "Saint Augustin d'Hippone", category: "Pères de l'Église", content: "Théologien majeur, Evêque d'Hippone en Algérie, auteur des Confessions et La Cité de Dieu", url: "/heritage" },
  { id: 'p2', type: 'person', title: "Jean-Marc Ela", category: "Théologien Contemporain", content: "Prêtre et sociologue camerounais, initiateur de la théologie sous l'arbre et du cri de l'homme africain", url: "/heritage" },
  { id: 'p3', type: 'person', title: "Reine de Saba", category: "Personnage Biblique", content: "Souveraine de la corne de l'Afrique (Éthiopie). Rencontre avec le Roi Salomon", url: "/bible" }
];

// Combine all searchable items
export const searchIndex = [
  ...mockArticles.map(a => ({
    id: `art-${a.id}`,
    type: 'article',
    title: a.title,
    category: a.category,
    content: a.excerpt + ' ' + (a.content || '').replace(/<[^>]+>/g, ' '), // strip HTML for rough search
    url: `/articles/${a.slug}`,
    image: a.image
  })),
  ...mockResourcesData.map(r => ({ ...r, image: null })),
  ...mockPeopleData.map(p => ({ ...p, image: null })),
  { id: 'page-history', type: 'article', title: "Notre Histoire", category: "À Propos", content: "L'origine d'Impronte Africane, la redécouverte des racines africaines du christianisme, Moïse et Augustin.", url: "/histoire", image: null },
  { id: 'page-vision', type: 'article', title: "Vision 2033", category: "À Propos", content: "Le bimillénaire de la Rédemption, Unité, Éducation, Avenir de l'Afrique chrétienne.", url: "/vision", image: null }
];

