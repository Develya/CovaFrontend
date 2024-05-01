import React, { useState } from "react";
import './trajet.css'
import { DeleteTrajet } from "./trajetDAO";
import {useNavigate, useParams } from "react-router-dom";

const Habitualtrajets = () =>{
  const {userID} = useParams();
  const [trajets, settrajets] = useState([])
  const navigate = useNavigate()
    fetch('http://localhost:8083/trajets/all')
    .then(response => response.json())
    .then(json => settrajets(json))
    .catch(error => console.error(error))

    const handleModify = (trajetID) => {
      navigate(`/updateTrajet/${trajetID}`)
    }

    const handleCreate = (userID) =>{
      navigate(`/createTrajet/${userID}`)
    }

    const handleCreateJourney = (trajetID,dayID) =>{
      navigate(`/createJourney/${userID}/${trajetID}/${dayID}`)
    }
    const handlePropositionTrajet = (departureAddress, destinationAddress) =>{
      navigate(`/propositiontrajet/${departureAddress}/${destinationAddress}`)
    }

    return (
        <div className="container">
          <button onClick={() => handleCreate(parseInt(userID))}>Create</button>
          {trajets.map((trajet) => {
            if (parseInt(trajet.user.userID) === parseInt(userID)) {
              return (
                <div key={trajet.id} >
                  <div className="address">
                    <p>Departure address: {trajet.departureAddress}</p>
                    <p>Destionation address: {trajet.destinationAddress}</p>
                  </div>
                  <div className="time">
                    <p>Desired Departure time: {trajet.desiredDepartureTime}</p>
                    <p>Desired Arrival Time: {trajet.desiredArrivalTime}</p>
                  </div>
                  <p> Day: {JSON.stringify(trajet.dayOfWeek.dayName)}</p>
                  <p>{JSON.stringify(trajet.trajetID)}</p>
                  <div className="buttons">
                    <button onClick={() => handleModify(trajet.trajetID)} >Modify</button>
                    <button onClick={() => DeleteTrajet(trajet.trajetID)}>Delete</button>
                    {trajet.user.role === "Driver"?(
                      <button onClick={() => handleCreateJourney(trajet.trajetID,trajet.dayOfWeek.dayID)}>Add to a journey</button>
                    ):(
                      <button onClick={() => handlePropositionTrajet(trajet.departureAddress, trajet.destinationAddress)}>Recherche trajet</button>
                    )}
                    
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      );
}

export default Habitualtrajets;