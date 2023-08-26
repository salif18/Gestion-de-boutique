import { createContext, useState, useEffect } from "react";
import axios from "axios";

//creation de mon context
export const MyStore = createContext();

//la fonction provider
export const MyStoreProvider = (props) => {

  //etats de mes donnees
  const [produits, setProduits] = useState([]);
  const [vendues, setVendues] = useState([]);
  const [panier, setPanier] = useState([]);
  const [opperations,setOpperations] = useState([])
  const [errorStock, setErrorStock] = useState("");
  

  //ajout de de nouveau produits
  const handleSave = (item) => {
    axios
      .post("http://localhost:3004/produits", {
        id: item.id,
        nom: item.nom,
        categories: item.categories,
        prixAchat: item.prixAchat,
        prixVente: item.prixVente,
        stocks: item.stocks,
        fournisseur: item.fournisseur,
        contacts: item.contacts,
        dateAchat: item.dateAchat,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  //incrementation du nombre de produits
  const increment = (item) => {
    const toSale = panier.map((d) =>
      d.id === item.id ? { ...d, qty: d.qty + 1 } : d
    );
    setPanier(toSale);
  };
  //decrementation du nombre de produits
  const decrement = (item) => {
    const toSale = panier.map((d) =>
      d.id === item.id ? { ...d, qty: d.qty - 1 } : d
    );
    setPanier(toSale);
  };

  //ajout des produit dans le panier pour la vente
  const handleAddPanier = (item) => {
    setPanier([...panier, { ...item, qty: 1 }]);
  };

  //enregistrer ou effectuer une vente
  const handleVendre = () => {
    panier.map((item) => {
      axios
        .post("http://localhost:3004/ventes", {
          id: item.id,
          nom: item.nom,
          categories: item.categories,
          prixAchat: item.prixAchat,
          prixVente: item.prixVente,
          stocks: item.stocks,
          qty: item.qty,
          dateVente: item.dateVente,
          dateAchat: item.dateAchat,
          fournisseur: item.fournisseur,
          contacts: item.contacts,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      return configStock(item);
      
    });
  };

  //envoyer les depenses
  const sendDepensesToDataBase = (item)=> {
    axios.post('http://localhost:3004/depenses',{
       montants:item.montants,
       motifs:item.motifs
    })
    .then((res) => res.data)
    .catch((err)=> console.log(err))
  }

  
  //charger les produits
  useEffect(() => {
    const getProduits =()=>{
    axios
      .get("http://localhost:3004/produits")
      .then((res) => {
        setProduits(res.data);
      })
      .catch((err) => console.log(err));
    };
    getProduits()
  }, []);

  //charger les ventes
  useEffect(() => {
    const getVente =()=>{
    axios
      .get("http://localhost:3004/ventes")
      .then((res) => {
        setVendues(res.data);
      })
      .catch((err) => console.log(err));
    };
    getVente()
  }, []);


  //charger les depenses
  useEffect(()=>{
      const getDepenses =()=>{
       axios.get('http://localhost:3004/depenses')
       .then((res) =>{
        setOpperations(res.data)
       }).catch(err => console.log(err))
      };
      getDepenses()
  },[])

  //calcule de stock
  const configStock = async (item) => {
    const product = produits.find((x) => x.id === item.id);
    if (item.qty > 0 && item.qty <= product.stocks) {
      product.stocks -= item.qty;
      try {
        await axios.put(
          `http://localhost:3004/produits/newStock/${product.id}`,
          { stocks: product.stocks }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorStock(`Stock insuffisant pour le produit ${item.nom}`);
    }
  };

  

  //calcule vente total
  const calVenteTotal = () => {
    const prix = vendues.map((x) => x.prixVente * x.qty);
    const sum = prix.reduce((a, b) => a + b, 0);
    return sum;
  };
  let venteTotal = calVenteTotal();

  //calcule benefice totale
  const calculBenefice = (data) => {
    let beneficeTotal = 0;
    for (let x of data) {
      const bene = ((x?.prixVente * x?.qty) / x?.qty - x?.prixAchat) * x?.qty;
      beneficeTotal += bene;
    }
    return beneficeTotal;
  };
  let beneficeGeneral = calculBenefice(vendues);

  //calcule achat total de stock
  const achat = ()=>{
     const prixAchat = produits.map((x) => x.prixAchat * x.stocks);
     const sum = prixAchat.reduce((a, b) => a + b, 0);
     return sum
  }
  const sumAchat = achat()
 
  //calcul achat total de vente
  const vente =()=>{
     const forvendue = vendues?.map((x) => x?.prixAchat * x?.qty);
     const sum = forvendue.reduce((a, b) => a + b, 0);
     return sum
  }
  const sumVente = vente()
 
  //calcule achat total de produit
  const calculAchatTotal = (a,b) => {
    const total = a + b;
    return total;
  };
  const achatTotal = calculAchatTotal(sumVente,sumAchat);

  //calcule des depenses
  const calculeDepenses =()=>{
    const somme = opperations.map((a)=> a.montants );
    const result = somme.reduce((a,b) => a+b,0)
    return result
  }
  const depensesTotal = calculeDepenses()
  

  const contextValue = {
    produits: produits,
    setProduits: setProduits,
    handleSave: handleSave,
    panier: panier,
    setPanier: setPanier,
    vendues: vendues,
    setVendues: setVendues,
    handleAddPanier: handleAddPanier,
    handleVendre: handleVendre,
    increment: increment,
    decrement: decrement,
    beneficeGeneral: beneficeGeneral,
    venteTotal: venteTotal,
    achatTotal: achatTotal,
    errorStock: errorStock,
    configStock: configStock,
    opperations:opperations,
    sendDepensesToDataBase:sendDepensesToDataBase,
    depensesTotal:depensesTotal
  };

  return (
    <MyStore.Provider value={contextValue}>{props.children}</MyStore.Provider>
  );
};
