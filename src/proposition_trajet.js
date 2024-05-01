import React, {useState, useEffect} from "react";
import { json, useParams } from "react-router-dom";
import { point, distance, circle } from "@turf/turf";

const PropositionTrajet = () => {
    //doit prendre le point de départ et le point d'arrivé
    //rayon de 10 km mais la distance du trajet ne doit pas être 50% de plus
    //Étape 1: transformer les adresses en latitude et longitude: DONE
    // Étape 2: calculer la distance done mais c'est full ligne droite (les voitures c'Est outdated les hélico c'Est mieux)
    //Étape 3: prendre la latitude et la longitude du point de départ de du points de d'arrivé et faire un rayon de 10 km //done??
    //Étape 4 accèder à tous les journeys et transformer leurs points de départ et point d'arrivée en lat et longitude //done
    //Étape 5: vérifier que les points d'arrivé et de destinations soit tous les deux dans le 10 km
    //Étape 6: vérifier que le trajet ne fait pas plus de 50% dans la distance
    //Étape 7 affiche les choses et les trajets obtenues
    const { departureAddress, destinationAddress } = useParams();
    const [departureCoords, setDepartureCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [departureCircle, setDepartureCircle] = useState(null);
    const [destinationCircle, setDestinationCircle] = useState(null);
    const [distanceBetweenPoints, setDistanceBetweenPoints] = useState(null);
    const [alljourneys, setalljourneys] = useState([])
    const [isInCircle, setisInCircle] = useState([])

    // Fonction pour obtenir les coordonnées géographiques à partir d'une adresse avec Nominatim
    // Modifier la fonction geocodeAddress pour retourner les coordonnées géographiques
    const geocodeAddress = async (address) => {
    try {
        // Appel à Nominatim pour obtenir les coordonnées géographiques
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();

        if (data.length > 0) {
            // Extraire les coordonnées géographiques du premier résultat
            const coords = point([parseFloat(data[0].lon), parseFloat(data[0].lat)]);
            return coords;
        } else {
            console.error("Aucune coordonnée trouvée pour l'adresse:", address);
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la géocodage de l\'adresse:', error);
        return null;
    }
};

    //Étape 1
    useEffect(() => {
        const fetchCoords = async () => {
            const departure = await geocodeAddress(departureAddress);
            const destination = await geocodeAddress(destinationAddress);
            setDepartureCoords(departure);
            setDestinationCoords(destination);
        };
        fetchCoords();
    }, [departureAddress, destinationAddress]);
    

    //Étape 2 et 3
    useEffect(() => {
        // Vérifier si les coordonnées de départ et d'arrivée sont disponibles
        if (departureCoords && destinationCoords) {
            // Créer un cercle de 10 km autour du point de départ
            console.log("departureCoord sont en tabarnak: ", departureCoords)
            const departureCircle = circle(departureCoords.geometry.coordinates, 10, { units: 'kilometers' });
            
            departureCircle.geometry.coordinates[0].push(departureCoords.geometry.coordinates)
            console.log("hdoashdsoahd: ", departureCircle.geometry.coordinates[0])
            setDepartureCircle(departureCircle);

            // Créer un cercle de 10 km autour du point de destination
            const destinationCircle = circle(destinationCoords.geometry.coordinates, 10, { units: 'kilometers' });
            destinationCircle.geometry.coordinates.push(destinationCoords.geometry.coordinates)
            setDestinationCircle(destinationCircle);

            // Calculer la distance entre les deux points
            const distanceInKm = distance(departureCoords, destinationCoords, { units: 'kilometers' });
            setDistanceBetweenPoints(distanceInKm);
        }
    }, [departureCoords, destinationCoords]);

//Étape 4
useEffect(() => {
    fetch('http://localhost:8083/journeys/all')
    .then(response => response.json())
    .then(async (json) => {
        // Filtrer les trajets pour ne conserver que ceux avec des adresses valides
        console.log("tanarmal de vierge",json)
        const validJourneys = await Promise.all(json.map(async (journey) => {
            // Géocoder les adresses de départ et d'arrivée
            const departureCoords = await geocodeAddress(journey.trajet.departureAddress);
            const destinationCoords = await geocodeAddress(journey.trajet.destinationAddress);
            console.log("departureCoord", departureCoords)
            console.log("destinationCoord", destinationCoords)
            // Vérifier si les coordonnées ont été obtenues avec succès
            if (departureCoords && destinationCoords) {
                // Ajouter les coordonnées géographiques au trajet
                return {
                    ...journey,
                    departureCoords,
                    destinationCoords
                };
            } else {
                // Adresse invalide, ne pas inclure ce trajet
                return null;
            }
        }));
        console.log("esti.... ", validJourneys)
        // Filtrer les trajets invalides (ceux avec des adresses non géocodées)
        const filteredJourneys = validJourneys.filter(journey => journey !== null);
        console.log("bon... ", filteredJourneys)
        setalljourneys(filteredJourneys);
        console.log("all journeys: ",alljourneys)

        filteredJourneys.map((journey) => {
            let destination = false
            console.log(journey)
            const cheh = departureCircle.geometry.coordinates
            cheh[0].map((departure) => {
                if(journey.departureCoords.geometry.coordinates[0] == departure[0])
                    if(journey.departureCoords.geometry.coordinates[1] == departure[1])
                        destination = true

            })
            if(destination == true){
                destinationCircle.geometry.coordinates.map((des) => {
                  if(journey.destinationCoords.geometry.coordinates[0] == des[0]){
                    if(journey.destinationCoords.geometry.coordinates[1] == des[1]){
                        setisInCircle((prevJourneys) => [...prevJourneys, journey]);
                    }
                  }
                console.log("isInCirlce: ", isInCircle)
                })
            }
            console.log("the fuck")
        })
    })
    .catch((error) => console.log(error));
}, [])


return(
    <div>
        <h1>Coordonnées de départ:</h1>
        {departureCoords && (
            <div>
                <p>Latitude: {departureCoords.geometry.coordinates[1]}</p>
                <p>Longitude: {departureCoords.geometry.coordinates[0]}</p>
            </div>
        )}

        <h1>Coordonnées de destination:</h1>
        {destinationCoords && (
            <div>
                <p>Latitude: {destinationCoords.geometry.coordinates[1]}</p>
                <p>Longitude: {destinationCoords.geometry.coordinates[0]}</p>
            </div>
        )}
        <h1>Distance entre les deux points:</h1>
        {distanceBetweenPoints && (
            <div>
                <p>{distanceBetweenPoints} kilomètres</p>
            </div>
        )}
        <h1>Cercles de 10 km:</h1>
        {departureCircle && destinationCircle && (
            <div>
                <p>Cercle de départ: {JSON.stringify(departureCircle)}</p>
                <p>Cercle de destination: {JSON.stringify(destinationCircle)}</p>
            </div>
        )}
        <h1>All journeys</h1>
        {console.log("pu trop trop le choix: ",alljourneys)}
        {alljourneys.map((journey, index) => (
            <div key={index}>
                <p>{JSON.stringify(journey.departureCoords.geometry.coordinates)} </p>
                <>{JSON.stringify(journey.destinationCoords.geometry.coordinates)}</>
            </div>
        ))}
        {isInCircle && (
            <div>
                <h1>Is in circle?? (Ce qui doit être affiché)</h1>
                <p>{JSON.stringify(isInCircle)}</p>
            </div>
        )}
    </div>
)
}

export default PropositionTrajet