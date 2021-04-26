import {instanceFirestore} from './firebase-initialisation';
import {collUtil, collDossiers} from './config';
import firebase from 'firebase/app';

export async function lireTout(uid) {
  let dossiers = [];
  return instanceFirestore.collection(collUtil).doc(uid).collection(collDossiers).get().then(
                              reponse => {
                                reponse.forEach(doc => dossiers.push({...doc.data(), id: doc.id}));
                              }
                            ).then(
                              () => dossiers
                            );
}

export async function supprimer() {

}

export async function modifier() {

}

/**
 * Crée un nouveau dossier pour l'utilisateur connecté, et retourne les données
 * de ce dossier
 * @param {string} uid Identifiant Firebase Auth de l'utilisateur connecté
 * @param {Object} dossier objet JS à ajouter comme document dans la collection
 * dossier de l'utlisateur
 * @returns {Promise<Object>} Objet contenant les données du dossier créé
 */
export async function creer(uid, dossier) {
  dossier.modification = firebase.firestore.FieldValue.serverTimestamp();
  return instanceFirestore.collection(collUtil).doc(uid).collection(collDossiers)
    .add(dossier).then(
      refDoc => refDoc.get()
    )
}