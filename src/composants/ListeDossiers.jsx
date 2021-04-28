import './ListeDossiers.scss';
import Dossier from './Dossier';
import { useEffect, useState } from 'react';
import * as crudDossiers  from '../services/crud-dossiers';

export default function ListeDossiers(props) {
  const utilisateur = props.utilisateur;
  const dossiers = props.dossiers;
  const setDossiers = props.setDossiers;

  // Étape C : Exécuter une requête sur la collection 'dossiers-temp' pour lire l'info des dossiers disponibles
  // Comme le code suivant fait appel à une ressource externe, il est ASYNCHRONE
  // donc, il n'y a pas de garantie que le tableau dossiers soit remplit avant l'affichage du composant
  useEffect(
    () => crudDossiers.lireTout(utilisateur.uid).then(
      lesDossiers => setDossiers(lesDossiers)
    )
    , []
  );

  function supprimerDossier(idDossier) {
    crudDossiers.supprimer(utilisateur.uid, idDossier).then(
      () => {
        setDossiers(dossiers.filter(d => d.id !== idDossier))
      }
    )
  }

  return (
    <ul className="ListeDossiers">
      {
        dossiers.map( 
          dossier =>  <li key={dossier.id}>
                        <Dossier 
                          {...dossier} 
                          uid={utilisateur.uid} 
                          supprimerDossier={supprimerDossier} 
                        />
                      </li>
        )
      }
    </ul>
  );
}