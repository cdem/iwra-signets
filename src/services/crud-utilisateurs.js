import { instanceFirebaseUI, instanceFirestore, instanceFirebaseAuth } from './firebase-initialisation';
import firebase from 'firebase/app';
import 'firebaseui/dist/firebaseui.css';

import {collUtil, collDossiers} from './config';

/**
 * Initialise le widget d'authentification FirebaseUI
 * @param {string} refEltAncrage sélecteur de l'élément qui recevra le widget
 */
export function initUI(refEltAncrage) {
  instanceFirebaseUI.start(refEltAncrage, {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInFlow: 'popup'
  });
}

export function observerConnexion(mutateurUtilisateur) {
  instanceFirebaseAuth.onAuthStateChanged(
    util => {
      // Changer l'état de la variable 'utilisateur'
      mutateurUtilisateur(util);
      // Si l'utilisteur vient de se loguer, créer son profil dans Firestore
      // si c'est un nouvel utilisateur (ou rien faire s'il existe déjà)
      if(util !== null) {
        creerProfil(util.uid, util.displayName, util.email)
      }
    }
  )
}

function creerProfil(idUtilisateur, nomUtilisateur, courrielUtilisateur) {
  instanceFirestore.collection(collUtil).doc(idUtilisateur).set(
    {nom: nomUtilisateur, courriel: courrielUtilisateur},
    {merge: true}
  );
}


export function deconnexion() {
  instanceFirebaseAuth.signOut();
}
