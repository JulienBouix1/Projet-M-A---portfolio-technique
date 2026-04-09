# Deployer jbouix.com sur Vercel — Guide pas a pas

Cout : **0 euros/mois** (plan Hobby, suffisant pour un portfolio).

## Etape 1 : Connecter le repo GitHub a Vercel

1. Aller sur **vercel.com** → **Sign Up** avec ton compte GitHub
2. Cliquer **Add New...** → **Project**
3. Selectionner le repo **JulienBouix1/Projet-M-A---portfolio-technique**
4. Vercel detecte Next.js automatiquement → cliquer **Deploy**
5. Attendre 1-2 minutes. Le site est live sur une URL temporaire (genre `projet-xxx.vercel.app`)

## Etape 2 : Ajouter le domaine jbouix.com

1. Dans le dashboard Vercel → ton projet → **Settings** → **Domains**
2. Taper `jbouix.com` → **Add**
3. Vercel te donne les DNS a configurer

## Etape 3 : Configurer les DNS chez ton registrar

Chez ton registrar (OVH, Gandi, Namecheap, Google Domains...) :

```
Type    Nom     Valeur
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

Attendre 5-30 minutes que les DNS se propagent. Vercel gere le HTTPS automatiquement.

## Etape 4 : Deployer les mises a jour

A chaque `git push origin main`, Vercel redploie automatiquement en 30-60 secondes.

```bash
git add -A
git commit -m "Update site"
git push origin main
```

C'est tout. Pas de config supplementaire.

## En resume

| Action | Comment |
|--------|---------|
| Premier deploiement | Connecter repo GitHub sur vercel.com |
| Domaine personnalise | Ajouter dans Settings → Domains |
| Mise a jour du site | `git push origin main` |
| Cout | 0 euros |
| HTTPS | Automatique |
| CDN mondial | Inclus |
