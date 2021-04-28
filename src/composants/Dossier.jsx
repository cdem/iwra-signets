import './Dossier.scss'; 
import { IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import DeleteIcon from '@material-ui/icons/Delete';
import couvertureDefaut from '../images/couverture-defaut.jpg';
import * as crudDossiers from '../services/crud-dossiers';

export default function Dossier({id, titre, couleur, modification, couverture, supprimerDossier}) {
  return (
    <article className="Dossier" style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
        <img src={couverture || couvertureDefaut} alt={titre}/>
      </div>
      <div className="info">
        <h2>{titre}</h2>
        <p>Modifié : {obtenirDateFormatee(modification)}</p>
      </div>
      <IconButton className="modifier" aria-label="modifier" size="small">
        <DeleteIcon onClick={() => supprimerDossier(id) } />
      </IconButton>
    </article>
  );
}

function obtenirDateFormatee(objetDateFb) {
  let dateJS = (objetDateFb) ? new Date(objetDateFb.seconds*1000) : new Date();
  let nomsDesMois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  let jour = dateJS.getDate();
  let mois = nomsDesMois[dateJS.getMonth()];
  let annee = dateJS.getFullYear();

  return `${jour} ${mois} ${annee}`;
}