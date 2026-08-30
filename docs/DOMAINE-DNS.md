# Domaine ecos-sahel.org — diagnostic DNS du 30 août 2026

## Conclusion

Le domaine ne résout pas parce que **sa zone DNS n'existe sur aucun serveur**.
Ce n'est pas un délai de propagation : attendre ne réglera rien.

Le registre `.org` délègue correctement le domaine aux serveurs de noms
d'Hostinger, mais ces serveurs répondent qu'ils ne connaissent pas le domaine.
Autrement dit : le registre dit « demandez à Hostinger », Hostinger répond
« je ne connais pas ce domaine ». La chaîne est rompue au dernier maillon.

**Ce que ça veut dire concrètement** : le domaine a été enregistré, mais la zone
DNS n'a jamais été provisionnée côté Hostinger — le domaine n'est probablement
pas rattaché à l'hébergement dans hPanel.

## Ce qui a été vérifié

### Le domaine est bien enregistré et sain

Interrogation RDAP du registre (`rdap.publicinterestregistry.org`) :

| | |
| --- | --- |
| Enregistrement | 27 août 2026, 23:02 UTC |
| Expiration | 27 août 2027 |
| Statuts | `client transfer prohibited`, `add period` |

Ces deux statuts sont normaux : verrou registrar standard, et période des 5
premiers jours suivant l'enregistrement. **Aucun `clientHold` ni `serverHold`** —
le domaine n'est donc pas suspendu, notamment pas pour défaut de vérification
ICANN.

### La délégation est correcte

Interrogation directe d'un serveur du TLD `.org` (`a0.org.afilias-nst.info`) :

```
ecos-sahel.org  nameserver = artemis.dns-parking.com
ecos-sahel.org  nameserver = hermes.dns-parking.com
```

Ce sont bien les serveurs de noms d'Hostinger. Rien à corriger de ce côté.

### Mais ces serveurs refusent le domaine

```
$ nslookup -type=A ecos-sahel.org hermes.dns-parking.com
*** ecos-sahel.org : Query refused

$ nslookup -type=A ecos-sahel.org ns1.dns-parking.com
*** ecos-sahel.org : Non-existent domain
```

Le résolveur public de Cloudflare donne le diagnostic le plus explicite :

```
EDE(22): No Reachable Authority at delegation ecos-sahel.org.
EDE(23): Network Error 172.64.52.144:53 returned REFUSED for ecos-sahel.org A
```

Le résolveur de Google renvoie le même verdict (`SERVFAIL`, « lame delegation »).

`REFUSED` est sans ambiguïté : le serveur n'est pas autoritaire pour cette zone,
il n'en détient aucune copie. Ce n'est pas « l'enregistrement A manque » — ce
serait alors `NXDOMAIN` avec une zone existante.

## Ce qu'il faut faire

1. **hPanel → Domaines** : vérifier que `ecos-sahel.org` apparaît et qu'il a une
   zone DNS. S'il est listé sans zone, la créer.
2. **hPanel → Sites web → app Node.js → Domaines** : ajouter `ecos-sahel.org`
   comme domaine de l'application. C'est cette action qui provisionne
   normalement la zone DNS et l'enregistrement `A` vers le serveur.
3. **Vérifier l'email de vérification ICANN** envoyé à l'adresse du contact
   propriétaire. Peu probable vu l'absence de `clientHold`, mais rapide à écarter.
4. Si rien ne débloque, **ouvrir un ticket support Hostinger** avec cette
   formulation, qui évite la réponse automatique « patientez 24 h » :

   > `hermes.dns-parking.com` et `artemis.dns-parking.com` renvoient `REFUSED`
   > pour `ecos-sahel.org`, alors que le registre `.org` y délègue le domaine.
   > La zone DNS n'existe pas sur vos serveurs de noms. Merci de la provisionner.

## Refaire le diagnostic

```bash
# Statut au registre
curl -s https://rdap.publicinterestregistry.org/rdap/domain/ecos-sahel.org

# Délégation vue du TLD .org
nslookup -type=NS ecos-sahel.org a0.org.afilias-nst.info

# Réponse des serveurs autoritaires
nslookup -type=A ecos-sahel.org hermes.dns-parking.com

# Diagnostic détaillé (codes EDE)
curl -s -H "accept: application/dns-json" \
  "https://cloudflare-dns.com/dns-query?name=ecos-sahel.org&type=A"
```

**Le domaine sera opérationnel** quand la dernière commande renverra
`"Status":0` avec une réponse `"data"` contenant l'IP du serveur Hostinger.
