import './Appli.scss';
import Entete from './Entete';
import Accueil from './Accueil';
import ListeDossiers from './ListeDossiers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app'; 
import { instanceFirestore, instanceFirebaseAuth } from '../services/firebase-initialisation';
import { collUtil } from '../services/config';
import FormDossier from './FormDossier';
import * as crudDossiers from '../services/crud-dossiers';

export default function Appli() {
  // État de l'utilisateur
  const [utilisateur, setUtilisateur] = useState(null);
  // État des dossiers de signets
  const [dossiers, setDossiers] = useState([]);
  // État du formulaire de dossiers
  const [ouvert, setOuvert] = useState(false);

  function gererAjoutDossier(titre, couverture, couleur) {
    crudDossiers.creer(utilisateur.uid, {
      titre: titre,
      couverture: couverture,
      couleur: couleur
    }).then(
      docDossier => setDossiers([...dossiers, {id: docDossier.id, ...docDossier.data()}])
    )
  }


  useEffect(
    () => {
      instanceFirebaseAuth.onAuthStateChanged(
        util => {
          // Changer l'état de la variable 'utilisateur'
          setUtilisateur(util);
          // Si l'utilisteur vient de se loguer, créer son profil dans Firestore
          // si c'est un nouvel utilisateur (ou rien faire s'il existe déjà)
          if(util !== null) {
            instanceFirestore.collection(collUtil).doc(util.uid).set(
              {nom: util.displayName, courriel: util.email},
              {merge: true}
            );
          }
        }
      )
    }
  , []);

  return (
    <div className="Appli">
      {
        utilisateur ?
          <>
            <Entete utilisateur={utilisateur} />
            <section className="contenu-principal">
              <ListeDossiers utilisateur={utilisateur} dossiers={dossiers} setDossiers={setDossiers} />
              <FormDossier ouvert={ouvert} setOuvert={setOuvert} gererAjoutDossier={gererAjoutDossier} />
              <Fab onClick={() => setOuvert(true)} className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
                <AddIcon />
              </Fab>
            </section>
          </>
        :
          <Accueil />
      }
    </div>
  );
}