import React, {useState, useEffect} from "react";
import {json, useParams } from "react-router-dom";
import { format } from "date-fns";

export const CreateJourney = () =>{
    const {userID, trajetID, dayID} = useParams()

    const [trajet, settrajet] = useState()
    const [car, setCar] = useState([])
    const [seats, setSeats] = useState();
    const [price, setPrice] = useState(10);
    const [status, setStatus] = useState("Immediate confirmation"); // Default status
    const [isActive, setIsActive] = useState(true); // Par défaut

    const today = new Date();
    
    

    useEffect(() =>{  
    fetch(`http://localhost:8083/trajets/findByTrajetId/${trajetID}`)
    .then(response => response.json())
    .then(json => settrajet(json))
    .catch(error => console.error(error))
    })


    useEffect(() => {
    fetch(`http://localhost:8083/cars/carByDriverID/${userID}`)
    .then(response => response.json())
    .then(json => {
        setCar(json);
        if(json.length > 0) {
            setSeats(json[0].numberOfSeats);
        }
    })
    .catch(error => console.error(error))
    }, [userID]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedDate = format(today, "yyyy-MM-dd'T'HH:mm:ss");
        fetch('http://localhost:8083/journeys/addJourney', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                driver:{
                    userID: parseInt(userID)
                },
                trajet:{
                    trajetID: parseInt(trajetID)
                },
                dayOfWeek:{
                    dayID: parseInt(dayID)
                },
                availableSeats: seats,
                price: price,
                journeyCreationDate: formattedDate,
                isActive: isActive
            })
        })
    // Soumettre les modifications du voyage
    // Vous pouvez ajouter ici une fonction pour envoyer les données modifiées au backend
  };

  return (
    <div>
      <h2>Journey Proposal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Departure Address:</label>
          <p>{trajet ? trajet.departureAddress : 'Loading...'}</p>
        </div>
        <div>
          <label>Destination Address:</label>
          <p>{trajet ? trajet.destinationAddress : 'Loading...'}</p>
        </div>
        <div>
          <label>Desired Departure Time:</label>
          <p>{trajet ? trajet.desiredDepartureTime : 'Loading...'}</p>
        </div>
        <div>
            <label>Desired Arrival Time:</label>
            <p>{trajet ? trajet.desiredArrivalTime : 'Loading...'}</p>
        </div>
        <div>
          <label>Available Seats:</label>
          <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} />
        </div>
        <div>
          <label>Suggested Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Immediate Confirmation">Immediate Confirmation</option>
            <option value="Reservation">Reservation</option>
          </select>
        </div>
        <div>
          <label>Is Active:</label>
          <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
