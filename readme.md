## Pré-requis
- Création d'une application (bot_discord) sur le site [Discord Developer Portal](https://discordapp.com/developers/)
- installation des modules 
    - ouvrez la console (crtl + shift + % )
    - écrire npm i 

# Configuration
- allez dans le fichier ./utils/config.js
- remplir les informations si dessous
```js
    "token": "Token",
    "db_username": "Le nom de votre db",
    "db_password": "Le mots de passe de votre db"
    "db_author": "Auteur de votre db exemple: Cluster0.g5xTf",
    "db_name": "le nom de la db"
```

# Informations
**⚠ Avertissement :** Faites attetion à toutes les modifications que vous ferez au code source.
Il vous faudra alors vérifiez alors les autres modifications à apporter

# Remerciement
- Merci à Valu pour ça participations
- Merci à suprazy pour son tuto sur les boutons discord [chaine youtune](https://www.youtube.com/channel/UCmH1td7f73IEyYNNg5XDT9g)

# Etape 1:
- création de l'handler
- création des fichier 
    - event_handlers.js
    - command_handlers.js

- création du handler 
    - command/test.js
    - events ./client/ready.js
             ./client/message.js
             ./server/

- création du fichier ./config.js/

# Etape 2:
- création du dossier ./utils/
- déplacement du fichier ./config.js dans le dossier ./utils/config.js
- connection et installation de mongodb ( npm i mongoose@5.11.15 )
- rajout du fichier mongodb.js dans le dossier ./handlers/
- ajout des option ["mdp","author"] dans le fichier ./utils/config.js

# Etape 3:
- création d'un schema mongodb et utilisation de celui-ci
- création du premier schema via le fichier ./events/client/message.js
- on à créer un fichier index dans le dossier ./models ou dedans nous allons définir les schema
ensuite appeler ce fichier 

# Etape 4:
- ajout du système de level
- ajout de la commande d'user
- ajout du module canvas
    - npm i canvas
- ajout de la commande 'level'
- ajout ajout des image dans le dossier './image/'
- ajout de dafont dans le dossier './dafont/
# Etape 5:
- ajout du dossier ./admin/
- ajout de la commande ./admin/set-prefix.js/
- ajout du module "bent"
- ajout de la commande ./admin/set-image.js/
