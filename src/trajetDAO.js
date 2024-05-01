import React, {useState} from "react";
import { useParams } from "react-router-dom";
import './createTrajet.css'

export const CreateTrajet = () =>{
    const {userID} = useParams()
    const [departureAddress, setdepartureAddress] = useState('');
    const [destinationAddress, setdestinationAddress] = useState('');
    const [desiredDepartureTime, setdesiredDepartureTime] = useState('');
    const [desiredArrivalTime, setdesiredArrivalTime] = useState('');
    const [dayOfWeek, setdayOfWeek] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            departureAddress,
            destinationAddress,
            desiredDepartureTime,
            desiredArrivalTime,
            userID,
            dayOfWeek
        });

        const formatLocalDateTime = (timeString) => {
            const date = new Date();
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month because it starts from 0
            const day = ('0' + date.getDate()).slice(-2); // Current day
            const formattedTime = timeString + ":00"; // Adding seconds
            return `${year}-${month}-${day}T${formattedTime}`;
        };
    
        const formattedDepartureTime = formatLocalDateTime(desiredDepartureTime);
        const formattedArrivalTime = formatLocalDateTime(desiredArrivalTime);

        fetch("http://localhost:8083/trajets/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                departureAddress: departureAddress,
                destinationAddress: destinationAddress,
                desiredDepartureTime: formattedArrivalTime,
                desiredArrivalTime: formattedDepartureTime,
                user:{
                    userID: parseInt(userID)
                },
                dayOfWeek: {
                    dayID: parseInt(dayOfWeek[0])
                }
            })
        })
        
    };

    return (
        <div className="container">
            <h2>Formulaire de trajet</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="adresse_depart">Adresse de départ</label>
                <input type="text" id="adresse_depart" value={departureAddress} onChange={(e) => setdepartureAddress(e.target.value)} required />

                <label htmlFor="adresse_destination">Adresse de destination</label>
                <input type="text" id="adresse_destination" value={destinationAddress} onChange={(e) => setdestinationAddress(e.target.value)} required />

                <label htmlFor="heure_depart">Heure de départ souhaitée</label>
                <input type="time" id="heure_depart" value={desiredDepartureTime} onChange={(e) => setdesiredDepartureTime(e.target.value)} required />

                <label htmlFor="heure_arrivee">Heure d'arrivée souhaitée</label>
                <input type="time" id="heure_arrivee" value={desiredArrivalTime} onChange={(e) => setdesiredArrivalTime(e.target.value)} required />

                <label htmlFor="jours_semaine">Jours de la semaine habituels pour ce trajet</label>
                <select id="jours_semaine" value={dayOfWeek} onChange={(e) => setdayOfWeek(Array.from(e.target.selectedOptions, option => option.value))} multiple required>
                    <option value="1">Lundi</option>
                    <option value="2">Mardi</option>
                    <option value="3">Mercredi</option>
                    <option value="4">Jeudi</option>
                    <option value="5">Vendredi</option>
                    <option value="6">Samedi</option>
                    <option value="7">Dimanche</option>
                </select>

                <button type="submit">Soumettre</button>
            </form>
        </div>
    );
}

export const DeleteTrajet = (trajetID) => {
    fetch(`http://localhost:8083/trajets/delete/${trajetID}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        console.log(data); // Vous pouvez faire quelque chose avec la réponse ici
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

export const UpdateTrajet = () => {
    const {trajetID} = useParams()
    const [departureAddress, setdepartureAddress] = useState('');
    const [destinationAddress, setdestinationAddress] = useState('');
    const [desiredDepartureTime, setdesiredDepartureTime] = useState('');
    const [desiredArrivalTime, setdesiredArrivalTime] = useState('');
    const [dayOfWeek, setdayOfWeek] = useState([]);
    const user = 1
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            departureAddress,
            destinationAddress,
            desiredDepartureTime,
            desiredArrivalTime,
            user,
            dayOfWeek
        });
        const formatLocalDateTime = (timeString) => {
            const date = new Date();
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month because it starts from 0
            const day = ('0' + date.getDate()).slice(-2); // Current day
            const formattedTime = timeString + ":00"; // Adding seconds
            return `${year}-${month}-${day}T${formattedTime}`;
        };
    
        const formattedDepartureTime = formatLocalDateTime(desiredDepartureTime);
        const formattedArrivalTime = formatLocalDateTime(desiredArrivalTime);

        fetch(`http://localhost:8083/trajets/update/${trajetID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                departureAddress: departureAddress,
                destinationAddress: destinationAddress,
                desiredDepartureTime: formattedArrivalTime,
                desiredArrivalTime: formattedDepartureTime,
                user:{
                    userID: parseInt(1)
                },
                dayOfWeek: {
                    dayID: parseInt(dayOfWeek[0])
                }
            })
        })
        
    };

    return (
        <div className="container">
            <h2>Formulaire de trajet</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="adresse_depart">Adresse de départ</label>
                <input type="text" id="adresse_depart" value={departureAddress} onChange={(e) => setdepartureAddress(e.target.value)} required />

                <label htmlFor="adresse_destination">Adresse de destination</label>
                <input type="text" id="adresse_destination" value={destinationAddress} onChange={(e) => setdestinationAddress(e.target.value)} required />

                <label htmlFor="heure_depart">Heure de départ souhaitée</label>
                <input type="time" id="heure_depart" value={desiredDepartureTime} onChange={(e) => setdesiredDepartureTime(e.target.value)} required />

                <label htmlFor="heure_arrivee">Heure d'arrivée souhaitée</label>
                <input type="time" id="heure_arrivee" value={desiredArrivalTime} onChange={(e) => setdesiredArrivalTime(e.target.value)} required />

                <label htmlFor="jours_semaine">Jours de la semaine habituels pour ce trajet</label>
                <select id="jours_semaine" value={dayOfWeek} onChange={(e) => setdayOfWeek(Array.from(e.target.selectedOptions, option => option.value))} multiple required>
                    <option value="1">Lundi</option>
                    <option value="2">Mardi</option>
                    <option value="3">Mercredi</option>
                    <option value="4">Jeudi</option>
                    <option value="5">Vendredi</option>
                    <option value="6">Samedi</option>
                    <option value="7">Dimanche</option>
                </select>

                <button type="submit">Soumettre</button>
            </form>
        </div>
    );
}

