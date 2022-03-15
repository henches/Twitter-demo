Projet Démo Twitter Timeline

Contenu :
- trois timelines "home", "utilisateur" et "notifications"
- très simplifiées : affiche une vingtaine de tweets, sans toutes les features associées à chaque tweet.

Mode d'emploi :
1. renseigner le fichier src/config.json avec les clés Twitter, selon le format ci-dessous :
{
    "consumer_key":         "...",
    "consumer_secret":      "...",
    "access_token_key":     "...",
    "access_token_secret":  "..."
}
2. > npm start
3. url : http://localhost:3000 depuis un browser
   
IMPORTANT : le browser doit ignorer le mécanisme CORS !!! 
	perso : 
	- j'utilise Chrome avec le paramètre --disable-web-security
	- je lance chrome de la manière suivante :
		> [PATH]/chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp


