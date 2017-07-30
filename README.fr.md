# kinect2-with-socket-sample-project
> **v1.0**

Ceci est un projet fonctionnel, permettant l'envoi via socket des coordonnées des différents points associés à un corps capté par la Kinect V2, vers un projet web.

Ce projet est destiné à être utilisé comme base pour votre application. Il se compose de trois sous-applications :
* Le serveur node (Javascript ES6)
* L'application Kinect sous Visual Studio (WinJS)
* L'application web (Javascript ES6)

Une telle structure présente des avantages comparé à l'utilisation d'une librairie dédiée, tel que la facilité de personnalisation du projet et le support des éventuelles futures mises à jour du SDK Kinect. 

La librairie [sockjs](https://github.com/sockjs) a été utilisée pour réaliser les connexions socket.


## Installation

1. Branchez la Kinect V2 sur un port USB3
2. Modifiez le fichier "config.yml" présent à la racine du projet, et adapter les différents paramètres en conséquence
3. *(Étape optionnelle)* Si vous ne souhaitez pas compiler le projet web, modifiez également le fichier "config.yml" présent dans le dossier **"3. Web Project/web"**
4. *(Étape optionnelle)* Si vous souhaitez compiler le projet web, lancez la commande `gulp build` depuis le dossier **"3. Web Project"**
5. Exécutez la commande `npm install` depuis les dossiers **"1. Node Server"** et **"3. Web Project"**
6. Lancez le serveur Node en exécutant la commande `node server.js` depuis le dossier **"1. Node Server"**
7. Lancer l'application Visual Studio *kinect2-with-socket-sample-project.sln* présente dans le dossier **"2. Kinect VS"**
8. Montez le répertoire **"3. Web Project/web/** afin qu'il soit accessible depuis un navigateur web via une url locale ou distante


### Quel est l'intérêt de ce projet ?

Via l'utilisation du SDK officiel, l'utilisation de la Kinect ne peut se faire que via Visual Studio. Cet IDE peut ne pas convenir à certains développeurs par rapport à leurs habitudes (choix de l'IDE, debugging au niveau de l'aspect visuel, ...) ou ne pas correspondre à l'utilisation qu'ils souhaitent faire de la Kinect (application utilisable depuis un navigateur web, ...).

Ce projet permet de remédier à cela, en plus d'offrir une base pour faire communiquer plusieurs applications Kinect et web entre elles.


### Quels sont les prérequis pour faire fonctionner ce projet ?

* Vous devez avoir les dépendances [npm](https://www.npmjs.com/) et [node](https://nodejs.org/en/download/) installées sur votre poste de travail ou votre serveur web.
* Vous devez également avoir la possibilité de lancer une application web sous une url de votre choix, en local ou depuis un hébergement.
* Enfin, vous devez pouvoir utilisé la Kinect V2 depuis votre poste de travail. Je vous invite à [lire ce tutoriel](https://developer.microsoft.com/fr-fr/windows/kinect/hardware-setup), et également de vérifier que le projet **Body Basics-HTML** téléchargeable depuis le programme Windows [SDK Browser (Kinect for Windows 2.0)](https://www.microsoft.com/en-us/download/details.aspx?id=44561) est bien fonctionnel sur votre poste.


### Comment puis-je mettre à jour mon application par rapport à ce projet ?

Comme dit précedemment, ce projet est destiné à être utilisé comme base pour votre application, et non comme dépendance. Si ce projet est modifié et que vous souhaitez mettre à jour le vôtre par rapport à celui-ci, je vous invite à consulter les modifications réalisées lors des merges sur la branche __master__ et de mettre à jour les fichiers de votre application au cas par cas.


### Puis-je envoyer le stream vidéo de la Kinect via socket ?

Le poids de chaque image étant relativement important, l'envoi du stream vidéo via socket offre un très mauvais rendu. Il est donc très peu recommendé de procéder comme cela par soucis de performance.

Il existe cependant d'autres solutions pour remédier à cette problématique.
* Si vous souhaitez simplement récupérer le stream vidéo de la Kinect depuis votre navigateur web, il vous suffit de récupérer le stream vidéo de votre webcam dans une balise `canvas` ou `video` via Javascript, **la Kinect étant considéré comme une webcam depuis une mise à jour récente du driver associé**.
* Pour un envoi du stream vers une application distante, vous pouvez utiliser la technologie peer-to-peer via différentes librairies tels que [simple-peer](https://github.com/feross/simple-peer) ou [PeerJs](http://peerjs.com/), et l'installer sur votre application web (testé) ou Kinect (non-testé avec simple-peer, ne fonctionne par avec PeerJS). Je vous invite également à jeter un oeil à mon autre projet **[p2p-with-socket-sample-project](https://github.com/Striffly/p2p-with-socket-sample-project)** qui pourra très sûrement vous aider pour cela !




**Si vous aimez ce projet, n'hésitez pas à ajouter une star à celui-ci, merci :)**
