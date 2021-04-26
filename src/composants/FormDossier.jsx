import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { TwitterPicker } from 'react-color';


export default function FormDossier({ouvert, setOuvert, gererAjoutDossier}) {
  const [titre, setTitre] = useState('');
  const [couverture, setCouverture] = useState('');
  const [couleur, setCouleur] = useState('#f00');


  const gererFermer = () => {
    setOuvert(false);
    // Réinitialiser les états
    reinitialiserEtats();
  };

  function reinitialiserEtats() {
    setTitre('');
    setCouverture('');
    setCouleur('#f00');
  }

  function gererEnvoiFormulaire() {
    // 1) Appeler une fonction qui permet d'intégrer le backend (firebase)
    gererAjoutDossier(titre, couverture, couleur)

    // 2) Fermer la boîte de dialogue
    gererFermer();
  }

  return (
    <Dialog open={ouvert} onClose={gererFermer} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Ajouter dossier</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="titre"
          label="Titre du dossier"
          type="text"
          fullWidth
          onChange={(e)=>setTitre(e.target.value)}
        />
        <TextField
          margin="dense"
          id="couverture"
          label="Image de couverture"
          type="url"
          fullWidth
          onChange={(e)=>setCouverture(e.target.value)}
        />
        <TwitterPicker
          triangle="hide"
          colors={['#f00', '#0f0', '#00f']}
          onChangeComplete={(couleur, e) => setCouleur(couleur.hex)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={gererFermer} color="primary">
          Annuler
        </Button>
        <Button onClick={gererEnvoiFormulaire} color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
